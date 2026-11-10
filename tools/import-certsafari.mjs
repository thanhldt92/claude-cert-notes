#!/usr/bin/env node
// Import the team's certsafari review notebook into a LOCAL-ONLY data file for ccar-f/certsafari.html.
//
//   node tools/import-certsafari.mjs [source-folder]
//
// source-folder defaults to ~/claude-cert/claude architect - foundation (the cloned notebook).
// Output: ccar-f/certsafari/data.js — git-ignored on purpose, so it is never published to the public site.
//
// The source files are JavaScript, but they are only *parsed* here, never executed: a small parser
// accepts `DE[n] = "...";` and `ENTRIES.push({...}, ...);` with object/array/string/number literals,
// `+` string concatenation and bare identifiers (treated as empty strings, e.g. NOTES in hrefs).
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const src = path.resolve(process.argv[2] || path.join(os.homedir(), "claude-cert", "claude architect - foundation"));
const outDir = path.join(root, "ccar-f", "certsafari");

function tokenize(s, file) {
  const t = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/\s/.test(c)) { i++; continue; }
    if (c === "/" && s[i + 1] === "/") { while (i < s.length && s[i] !== "\n") i++; continue; }
    if (c === "/" && s[i + 1] === "*") { const e = s.indexOf("*/", i + 2); if (e < 0) throw new Error(`${file}: unterminated comment`); i = e + 2; continue; }
    if (c === '"' || c === "'") {
      let v = "", j = i + 1;
      for (; j < s.length && s[j] !== c; j++) {
        if (s[j] === "\\") {
          const n = s[++j];
          if (n === "n") v += "\n"; else if (n === "t") v += "\t"; else if (n === "u") { v += String.fromCharCode(parseInt(s.substr(j + 1, 4), 16)); j += 4; }
          else v += n;
        } else v += s[j];
      }
      if (j >= s.length) throw new Error(`${file}: unterminated string`);
      t.push({ k: "str", v }); i = j + 1; continue;
    }
    if (c === "`") throw new Error(`${file}: template literals are not supported`);
    const num = /^-?\d+(\.\d+)?/.exec(s.slice(i, i + 32));
    if (num && (c === "-" || /\d/.test(c))) { t.push({ k: "num", v: +num[0] }); i += num[0].length; continue; }
    const id = /^[A-Za-z_$][\w$]*/.exec(s.slice(i, i + 64));
    if (id) { t.push({ k: "id", v: id[0] }); i += id[0].length; continue; }
    if ("{}[](),:;=+.".includes(c)) { t.push({ k: c }); i++; continue; }
    throw new Error(`${file}: unexpected character ${JSON.stringify(c)} at ${i}`);
  }
  return t;
}

function parseFile(text, file) {
  const t = tokenize(text, file);
  let p = 0;
  const peek = () => t[p] || { k: "eof" };
  const eat = (k) => { const x = t[p]; if (!x || x.k !== k) throw new Error(`${file}: expected ${k}, got ${x ? x.k + " " + (x.v ?? "") : "eof"}`); p++; return x; };
  function value() {
    let v = atom();
    while (peek().k === "+") { p++; const r = atom(); v = String(v) + String(r); }
    return v;
  }
  function atom() {
    const x = peek();
    if (x.k === "str" || x.k === "num") { p++; return x.v; }
    if (x.k === "id") {
      p++;
      if (x.v === "true") return true; if (x.v === "false") return false; if (x.v === "null") return null;
      return ""; // bare identifier such as NOTES
    }
    if (x.k === "{") {
      p++; const o = {};
      while (peek().k !== "}") {
        const key = peek().k === "str" ? eat("str").v : eat("id").v;
        eat(":"); o[key] = value();
        if (peek().k === ",") p++; else break;
      }
      eat("}"); return o;
    }
    if (x.k === "[") {
      p++; const a = [];
      while (peek().k !== "]") { a.push(value()); if (peek().k === ",") p++; else break; }
      eat("]"); return a;
    }
    throw new Error(`${file}: unexpected token ${x.k}`);
  }
  const out = { exams: {}, entries: [] };
  while (peek().k !== "eof") {
    const id = eat("id").v;
    if (id === "DE") { eat("["); const n = eat("num").v; eat("]"); eat("="); out.exams[n] = value(); }
    else if (id === "ENTRIES") {
      eat("."); if (eat("id").v !== "push") throw new Error(`${file}: only ENTRIES.push is supported`);
      eat("(");
      while (peek().k !== ")") { out.entries.push(value()); if (peek().k === ",") p++; else break; }
      eat(")");
    } else throw new Error(`${file}: unexpected statement starting with ${id}`);
    if (peek().k === ";") p++;
  }
  return out;
}

const files = fs.existsSync(src) ? fs.readdirSync(src).filter((f) => /^so-on-certsafari-de-\d+\.js$/.test(f)).sort((a, b) => parseInt(a.match(/\d+/)) - parseInt(b.match(/\d+/))) : [];
if (!files.length) { console.error(`No so-on-certsafari-de-*.js files in ${src}`); process.exit(1); }

const data = { exams: {}, entries: [] };
const keep = ["de", "n", "total", "sub", "subName", "first", "answer", "dispute", "scen", "ask", "scene", "asks", "facts", "trap", "tip"];
for (const f of files) {
  const part = parseFile(fs.readFileSync(path.join(src, f), "utf8"), f);
  Object.assign(data.exams, part.exams);
  for (const e of part.entries) {
    const x = {};
    for (const k of keep) if (e[k] !== undefined && e[k] !== "") x[k] = e[k];
    x.opts = (e.opts || []).map((o) => ({ gist: o.gist, why: o.why }));
    // refs pointed at the original author's notes; the viewer links to this site's lessons by task statement instead
    if (!x.answer || !x.ask || !x.opts.length) throw new Error(`${f}: entry de ${e.de} n ${e.n} is missing answer/ask/opts`);
    data.entries.push(x);
  }
}
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "data.js"),
  "// LOCAL ONLY — generated by tools/import-certsafari.mjs; git-ignored, not published.\nwindow.CERTSAFARI = " + JSON.stringify(data) + ";\n");
const per = {};
data.entries.forEach((e) => { per[e.de] = (per[e.de] || 0) + 1; });
console.log(`imported ${data.entries.length} questions from ${files.length} files:`, Object.entries(per).map(([d, n]) => `đề ${d}: ${n}`).join(", "));
console.log(`with scenario: ${data.entries.filter((e) => e.scen).length}; with first attempt: ${data.entries.filter((e) => e.first).length}; disputes: ${data.entries.filter((e) => e.dispute).length}`);
console.log(`wrote ${path.relative(root, path.join(outDir, "data.js"))}`);
