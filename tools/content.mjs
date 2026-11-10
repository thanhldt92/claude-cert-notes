#!/usr/bin/env node
// Validate a cert's data.js, and optionally merge staged part files into it.
//
//   node tools/content.mjs check <cert>            validate <cert>/data.js
//   node tools/content.mjs check <cert> <part.js>  validate one part file against data.js
//   node tools/content.mjs merge <cert>            merge <cert>/parts/*.js into data.js, then validate
//
// A part file calls CERT_PART({ lessons: {d1: [...]}, bank: {d1: [...]}, cheat: {d1: [[a, b], ...]} }).
// Lessons whose id already exists replace the old lesson; lessons are sorted by their numeric id.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const [, , cmd, cert, onePart] = process.argv;
if (!cmd || !cert) {
  console.error("usage: node tools/content.mjs check|merge <cert> [part.js]");
  process.exit(2);
}
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const dataFile = path.join(root, cert, "data.js");

function loadData() {
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(dataFile, "utf8"), ctx, { filename: dataFile });
  if (!ctx.window.CERT_DATA) throw new Error("data.js did not set window.CERT_DATA");
  return ctx.window.CERT_DATA;
}

function loadPart(file) {
  const parts = [];
  const ctx = { CERT_PART: (p) => parts.push(p) };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(file, "utf8"), ctx, { filename: file });
  if (parts.length !== 1) throw new Error(`${file}: expected exactly one CERT_PART(...) call, got ${parts.length}`);
  return parts[0];
}

function applyPart(D, part, file) {
  const byId = Object.fromEntries(D.domains.map((d) => [d.id, d]));
  for (const key of ["lessons", "bank", "cheat"]) {
    for (const [did, items] of Object.entries(part[key] || {})) {
      const d = byId[did];
      if (!d) throw new Error(`${file}: unknown domain "${did}" in ${key}`);
      if (!Array.isArray(items)) throw new Error(`${file}: ${key}.${did} must be an array`);
      if (key === "lessons") {
        for (const l of items) {
          const at = d.lessons.findIndex((x) => x.id === l.id);
          if (at === -1) d.lessons.push(l); else d.lessons[at] = l;
        }
      } else {
        d[key] = (d[key] || []).concat(items);
      }
    }
  }
  // exam-strategy section: { guide: { title, intro, lessons: [...] } } — lessons replace by id
  if (part.guide) {
    D.guide = D.guide || { title: "", intro: "", lessons: [] };
    if (part.guide.title) D.guide.title = part.guide.title;
    if (part.guide.intro) D.guide.intro = part.guide.intro;
    for (const l of part.guide.lessons || []) {
      const at = D.guide.lessons.findIndex((x) => x.id === l.id);
      if (at === -1) D.guide.lessons.push(l); else D.guide.lessons[at] = l;
    }
  }
  // exam scenarios: [{ id: "s1", name, desc }] — replaces the list
  if (part.scenarios) D.scenarios = part.scenarios;
}

const lessonNum = (l) => {
  const m = /^l-(\d+)-(\d+)$/.exec(l.id); if (m) return +m[1] * 1000 + +m[2];
  const g = /^g-(\d+)$/.exec(l.id); return g ? +g[1] : 1e9;
};
const TS_RE = /^\d+\.\d+$/;

const ALLOWED = new Set("p h4 ul ol li strong em code pre table thead tbody tr th td blockquote a div br".split(" "));
const OK_HOSTS = ["platform.claude.com", "docs.claude.com", "code.claude.com", "support.claude.com", "www.anthropic.com",
  "anthropic.com", "modelcontextprotocol.io", "anthropic.skilljar.com", "anthropic-partners.skilljar.com",
  "privacy.claude.com", "www-cdn.anthropic.com", "claude.com", "www.claude.com", "academy.claude.com", "github.com"];

function checkQuestion(q, where, errs, stats) {
  if (typeof q.q !== "string" || !q.q.trim()) errs.push(`${where}: empty question`);
  if (!Array.isArray(q.options) || q.options.length < 4 || q.options.length > 5) errs.push(`${where}: needs 4–5 options`);
  if (typeof q.explain !== "string" || q.explain.length < 40) errs.push(`${where}: explanation missing or too short`);
  const ans = Array.isArray(q.answer) ? q.answer : [q.answer];
  if (Array.isArray(q.answer) && (q.answer.length !== 2 || q.options.length !== 5)) errs.push(`${where}: Choose TWO needs 5 options and 2 answers`);
  if (!Array.isArray(q.answer) && q.options && q.options.length !== 4) errs.push(`${where}: single-answer question needs exactly 4 options`);
  for (const a of ans) if (!Number.isInteger(a) || a < 0 || a >= (q.options || []).length) errs.push(`${where}: answer ${a} out of range`);
  if (new Set(ans).size !== ans.length) errs.push(`${where}: duplicate answer index`);
  if (!Array.isArray(q.answer)) {
    stats.pos[q.answer] = (stats.pos[q.answer] || 0) + 1;
    const lens = q.options.map((o) => o.length);
    if (lens[q.answer] === Math.max(...lens)) stats.longest++;
    stats.single++;
  } else stats.multi++;
  if ("sc" in q && !(stats.scIds || new Set()).has(q.sc)) errs.push(`${where}: unknown scenario "${q.sc}"`);
  if ("ts" in q && (!Array.isArray(q.ts) || !q.ts.every((t) => TS_RE.test(t)))) errs.push(`${where}: ts must be an array like ["1.1"]`);
  if (q.sc) stats.sc[q.sc] = (stats.sc[q.sc] || 0) + 1;
  const key = q.q.trim().toLowerCase();
  if (stats.seen.has(key)) errs.push(`${where}: duplicate question text`);
  stats.seen.add(key);
}

function checkHtml(html, where, errs) {
  const stack = [];
  for (const m of html.matchAll(/<(\/?)([a-zA-Z0-9]+)([^>]*)>/g)) {
    const [, close, tag0, attrs] = m;
    const tag = tag0.toLowerCase();
    if (!ALLOWED.has(tag)) { errs.push(`${where}: tag <${tag}> not allowed`); continue; }
    if (tag === "div" && !close && !/class="(tip|warn)"/.test(attrs)) errs.push(`${where}: <div> must be class tip or warn`);
    if (tag === "br") continue;
    if (close) { if (stack.pop() !== tag) errs.push(`${where}: unbalanced </${tag}>`); }
    else stack.push(tag);
  }
  if (stack.length) errs.push(`${where}: unclosed <${stack.join(">, <")}>`);
  for (const m of html.matchAll(/href="([^"]+)"/g)) checkUrl(m[1], where, errs);
}

function checkUrl(u, where, errs) {
  if (u.startsWith("#")) return;
  try {
    const h = new URL(u).hostname;
    if (!OK_HOSTS.includes(h)) errs.push(`${where}: link to non-official host ${h}`);
  } catch { errs.push(`${where}: bad URL ${u}`); }
}

function validate(D) {
  const errs = [];
  const stats = { pos: {}, longest: 0, single: 0, multi: 0, seen: new Set(), sc: {}, scIds: new Set() };
  const ids = new Set();
  let wsum = 0, lessons = 0, quiz = 0, bank = 0;
  for (const k of ["code", "title", "storageKey", "exam", "intro", "domains"]) if (!(k in D)) errs.push(`missing top-level ${k}`);
  (D.scenarios || []).forEach((s, i) => {
    if (!/^s\d+$/.test(s.id || "")) errs.push(`scenarios[${i}]: id must be s<n>`);
    if (!s.name || !s.desc) errs.push(`scenarios[${i}]: needs name and desc`);
    if (stats.scIds.has(s.id)) errs.push(`scenarios[${i}]: duplicate id`);
    stats.scIds.add(s.id);
  });
  const checkLesson = (l, w) => {
    for (const k of ["title", "minutes", "html", "keypoints", "sources"]) if (!(k in l)) errs.push(`${w}: missing ${k}`);
    checkHtml(l.html || "", w, errs);
    (l.sources || []).forEach((s) => checkUrl(s.u, w, errs));
    if (!(l.sources || []).length) errs.push(`${w}: no sources`);
    if ("ts" in l && (!Array.isArray(l.ts) || !l.ts.every((t) => TS_RE.test(t)))) errs.push(`${w}: ts must be an array like ["1.1"]`);
  };
  if (D.guide) {
    if (!D.guide.title) errs.push("guide: missing title");
    (D.guide.lessons || []).forEach((l) => {
      lessons++;
      const w = `guide/${l.id}`;
      if (!/^g-\d+$/.test(l.id)) errs.push(`${w}: id must be g-<n>`);
      if (ids.has(l.id)) errs.push(`${w}: duplicate lesson id`);
      ids.add(l.id);
      checkLesson(l, w);
    });
  }
  D.domains.forEach((d, di) => {
    wsum += d.weight;
    for (const k of ["id", "name", "weight", "intro", "lessons", "cheat", "quiz"]) if (!(k in d)) errs.push(`${d.id || di}: missing ${k}`);
    d.lessons.forEach((l) => {
      lessons++;
      const w = `${d.id}/${l.id}`;
      if (ids.has(l.id)) errs.push(`${w}: duplicate lesson id`);
      ids.add(l.id);
      if (!new RegExp(`^l-${di + 1}-\\d+$`).test(l.id)) errs.push(`${w}: id must be l-${di + 1}-<n>`);
      checkLesson(l, w);
    });
    if ("summary" in d && (!Array.isArray(d.summary) || !d.summary.every((s) => typeof s === "string" && s.trim()))) errs.push(`${d.id}: summary must be an array of strings`);
    (d.cheat || []).forEach((r, i) => { if (!Array.isArray(r) || r.length !== 2) errs.push(`${d.id}/cheat[${i}]: must be [a, b]`); });
    (d.quiz || []).forEach((q, i) => { quiz++; checkQuestion(q, `${d.id}/quiz[${i}]`, errs, stats); });
    (d.bank || []).forEach((q, i) => { bank++; checkQuestion(q, `${d.id}/bank[${i}]`, errs, stats); });
  });
  if (Math.abs(wsum - 100) > 0.01) errs.push(`weights sum to ${wsum}, not 100`);
  return { errs, lessons, quiz, bank, stats };
}

function report(D, label) {
  const { errs, lessons, quiz, bank, stats } = validate(D);
  const letters = "ABCD".split("").map((c, i) => `${c} ${stats.pos[i] || 0}`).join(" / ");
  console.log(`${label}: ${D.domains.length} domains, ${lessons} lessons, ${quiz} quiz + ${bank} bank questions`);
  D.domains.forEach((d) => console.log(`  ${d.id} ${d.name}: ${d.lessons.length} lessons, ${d.quiz.length} quiz, ${(d.bank || []).length} bank, ${d.cheat.length} cheat`));
  console.log(`  single-answer positions: ${letters}; correct option is longest in ${stats.longest}/${stats.single}; Choose TWO: ${stats.multi}`);
  if (D.guide) console.log(`  guide: ${D.guide.lessons.length} lessons`);
  if (D.scenarios) console.log(`  questions per scenario: ${D.scenarios.map((s) => `${s.id} ${stats.sc[s.id] || 0}`).join(", ")}; untagged ${quiz + bank - Object.values(stats.sc).reduce((a, b) => a + b, 0)}`);
  const noTs = D.domains.flatMap((d) => d.lessons).filter((l) => !l.ts).length;
  if (D.domains.some((d) => d.lessons.some((l) => l.ts))) console.log(`  lessons without ts: ${noTs}; domains without summary: ${D.domains.filter((d) => !d.summary).length}`);
  if (errs.length) { console.log(`  ${errs.length} problem(s):`); errs.slice(0, 60).forEach((e) => console.log("   - " + e)); }
  else console.log("  OK: no problems");
  return errs.length;
}

const D = loadData();
if (cmd === "check") {
  if (onePart) {
    applyPart(D, loadPart(path.resolve(onePart)), onePart);
    process.exit(report(D, `${cert} + ${path.basename(onePart)}`) ? 1 : 0);
  }
  process.exit(report(D, cert) ? 1 : 0);
}
if (cmd === "merge") {
  const dir = path.join(root, cert, "parts");
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".js")).sort() : [];
  if (!files.length) { console.error(`no part files in ${dir}`); process.exit(1); }
  for (const f of files) applyPart(D, loadPart(path.join(dir, f)), f);
  D.domains.forEach((d) => d.lessons.sort((a, b) => lessonNum(a) - lessonNum(b)));
  if (D.guide) D.guide.lessons.sort((a, b) => lessonNum(a) - lessonNum(b));
  const bad = report(D, `${cert} merged (${files.join(", ")})`);
  if (bad) { console.error("not written: fix the problems above first"); process.exit(1); }
  fs.writeFileSync(dataFile, "window.CERT_DATA = " + JSON.stringify(D, null, 1) + ";\n");
  console.log(`wrote ${path.relative(root, dataFile)}`);
  process.exit(0);
}
console.error(`unknown command ${cmd}`);
process.exit(2);
