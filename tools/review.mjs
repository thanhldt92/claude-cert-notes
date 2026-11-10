#!/usr/bin/env node
// Helpers for fact-check reviews of <cert>/data.js.
//
//   node tools/review.mjs show <cert> <domainId>           print one domain (lessons, cheat, quiz, bank) with targets
//   node tools/review.mjs apply <cert> <fixes.json> [--dry] apply a corrections file (dry run: only check it)
//
// A corrections file is a JSON array. Each item:
//   { "target": "l-5-2" | "d5/quiz/3" | "d5/bank/12" | "d5/cheat/4" | "d5/intro" | "intro",
//     "field":  "html" | "title" | "keypoints" | "sources" | "q" | "options" | "answer" | "explain" | "0" | "1" ...,
//     "find": "exact substring of the current text",  "replace": "new text"      // edit inside a string field
//     -- or --
//     "set": <any JSON value>                                                    // replace the whole field
//     -- or --
//     "delete": true                                                             // remove a quiz/bank question or cheat row (no field)
//     "reason": "what was wrong", "source": "https://official.page/that/proves/it" }
// For array fields of strings (keypoints, options) "find"/"replace" edits whichever element contains the substring.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const [, , cmd, cert, arg, flag] = process.argv;
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const dataFile = path.join(root, cert || "", "data.js");

function load() {
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(dataFile, "utf8"), ctx);
  return ctx.window.CERT_DATA;
}

function resolve(D, target) {
  if (target === "intro") return { obj: D, key: "intro" };
  let m = /^l-(\d+)-(\d+)$/.exec(target);
  if (m) {
    const d = D.domains[+m[1] - 1];
    const l = d && d.lessons.find((x) => x.id === target);
    if (!l) throw new Error(`no lesson ${target}`);
    return { obj: l };
  }
  m = /^(d\d+)\/(intro|quiz|bank|cheat)(?:\/(\d+))?$/.exec(target);
  if (!m) throw new Error(`bad target ${target}`);
  const d = D.domains.find((x) => x.id === m[1]);
  if (!d) throw new Error(`no domain ${m[1]}`);
  if (m[2] === "intro") return { obj: d, key: "intro" };
  const arr = d[m[2]] || [];
  const i = +m[3];
  if (!(i >= 0 && i < arr.length)) throw new Error(`${target}: index out of range (0..${arr.length - 1})`);
  return { obj: arr[i], arr, index: i };
}

if (cmd === "show") {
  const D = load();
  const d = D.domains.find((x) => x.id === arg);
  if (!d) { console.error("unknown domain"); process.exit(2); }
  const strip = (h) => h.replace(/<pre>([\s\S]*?)<\/pre>/g, (_, c) => "\n```\n" + c + "\n```\n").replace(/<\/(p|h4|li|tr|div)>/g, "\n").replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/\n{3,}/g, "\n\n");
  console.log(`# ${d.id} ${d.name} (${d.weight}%)\n\n[target ${d.id}/intro]\n${strip(d.intro)}\n`);
  for (const l of d.lessons) {
    console.log(`\n## [target ${l.id}] ${l.title}\n${strip(l.html)}\nKEYPOINTS:\n${l.keypoints.map((k) => "- " + k).join("\n")}\nSOURCES: ${l.sources.map((s) => s.u).join(" | ")}\n`);
  }
  console.log(`\n## CHEAT`);
  d.cheat.forEach((r, i) => console.log(`[target ${d.id}/cheat/${i}] ${r[0]} → ${r[1]}`));
  for (const kind of ["quiz", "bank"]) {
    console.log(`\n## ${kind.toUpperCase()}`);
    (d[kind] || []).forEach((q, i) => {
      const ans = Array.isArray(q.answer) ? q.answer : [q.answer];
      console.log(`\n[target ${d.id}/${kind}/${i}] ${q.q}\n${q.options.map((o, j) => `  ${"ABCDE"[j]}${ans.includes(j) ? "*" : " "} ${o}`).join("\n")}\n  EXPLAIN: ${q.explain}`);
    });
  }
  process.exit(0);
}

if (cmd === "apply") {
  const D = load();
  const fixes = JSON.parse(fs.readFileSync(path.resolve(arg), "utf8"));
  const dry = flag === "--dry";
  const errs = [];
  const deletions = [];
  fixes.forEach((f, n) => {
    const tag = `#${n} ${f.target}${f.field ? "." + f.field : ""}`;
    try {
      if (!f.reason) throw new Error("missing reason");
      const r = resolve(D, f.target);
      if (f.delete) { if (!r.arr) throw new Error("delete only works on quiz/bank/cheat items"); deletions.push(r); return; }
      const obj = r.key ? r.obj : r.obj;
      const key = r.key || f.field;
      if (key == null) throw new Error("missing field");
      if (!(key in obj)) throw new Error(`no field ${key}`);
      if ("set" in f) { obj[key] = f.set; return; }
      if (typeof f.find !== "string" || typeof f.replace !== "string") throw new Error("need find+replace or set");
      const cur = obj[key];
      if (typeof cur === "string") {
        const c = cur.split(f.find).length - 1;
        if (c !== 1) throw new Error(`find text occurs ${c} times (must be exactly once)`);
        obj[key] = cur.replace(f.find, () => f.replace);
      } else if (Array.isArray(cur) && cur.every((x) => typeof x === "string")) {
        const hits = cur.map((x, i) => [x, i]).filter(([x]) => x.includes(f.find));
        if (hits.length !== 1) throw new Error(`find text in ${hits.length} elements (must be exactly one)`);
        const [x, i] = hits[0];
        cur[i] = x.replace(f.find, () => f.replace);
      } else throw new Error(`field ${key} is not text; use "set"`);
    } catch (e) { errs.push(`${tag}: ${e.message}`); }
  });
  // delete from the end so indices stay valid
  deletions.sort((a, b) => b.index - a.index).forEach((r) => r.arr.splice(r.index, 1));
  if (errs.length) { console.log(`${errs.length} problem(s):`); errs.forEach((e) => console.log(" - " + e)); process.exit(1); }
  console.log(`${fixes.length} correction(s) OK${dry ? " (dry run, nothing written)" : ""}`);
  if (!dry) fs.writeFileSync(dataFile, "window.CERT_DATA = " + JSON.stringify(D, null, 1) + ";\n");
  process.exit(0);
}
console.error("usage: node tools/review.mjs show <cert> <domainId> | apply <cert> <fixes.json> [--dry]");
process.exit(2);
