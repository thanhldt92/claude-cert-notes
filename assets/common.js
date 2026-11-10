/* Shared helpers: storage, theme toggle, quiz question rendering. */
(function () {
  "use strict";

  var store = {
    get: function (key, fallback) {
      try {
        var v = localStorage.getItem(key);
        return v == null ? fallback : JSON.parse(v);
      } catch (e) { return fallback; }
    },
    set: function (key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
    }
  };

  // ---- theme: auto -> light -> dark ----
  var THEME_KEY = "ccn-theme";
  var THEME_LABEL = { auto: "◐ Tự động", light: "☀ Sáng", dark: "☾ Tối" };
  function applyTheme(t) {
    if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
    else document.documentElement.removeAttribute("data-theme");
    document.querySelectorAll("[data-theme-toggle]").forEach(function (b) { b.textContent = THEME_LABEL[t] || THEME_LABEL.auto; });
  }
  var theme = store.get(THEME_KEY, "auto");
  applyTheme(theme);
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-theme-toggle]");
    if (!b) return;
    theme = theme === "auto" ? "light" : theme === "light" ? "dark" : "auto";
    store.set(THEME_KEY, theme);
    applyTheme(theme);
  });
  document.addEventListener("DOMContentLoaded", function () { applyTheme(theme); });

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (k === "class") n.className = attrs[k];
      else if (k === "text") n.textContent = attrs[k];
      else n.setAttribute(k, attrs[k]);
    }
    if (html != null) n.innerHTML = html;
    return n;
  }

  var LETTERS = "ABCDEFGH";

  // Keep only a few inline tags (code, pre, b, i, em, strong, br) from imported HTML; everything else becomes text.
  var SAFE_TAGS = { CODE: 1, PRE: 1, B: 1, I: 1, EM: 1, STRONG: 1, BR: 1 };
  function sanitize(html) {
    var doc = new DOMParser().parseFromString("<div>" + String(html) + "</div>", "text/html");
    function walk(node) {
      var out = "";
      node.childNodes.forEach(function (c) {
        if (c.nodeType === 3) out += esc(c.nodeValue);
        else if (c.nodeType === 1) {
          var inner = walk(c), t = c.tagName;
          out += SAFE_TAGS[t] ? (t === "BR" ? "<br>" : "<" + t.toLowerCase() + ">" + inner + "</" + t.toLowerCase() + ">") : inner;
        }
      });
      return out;
    }
    return walk(doc.body.firstChild);
  }

  function answerSet(q) { return Array.isArray(q.answer) ? q.answer.slice().sort() : [q.answer]; }
  function isMulti(q) { return Array.isArray(q.answer); }
  function sameSet(a, b) {
    a = a.slice().sort(); b = b.slice().sort();
    return a.length === b.length && a.every(function (v, i) { return v === b[i]; });
  }

  /*
   * Render one question. opts:
   *   num        – label shown before the question
   *   selected   – initial selection (array of indices)
   *   onChange   – called with the selection array whenever it changes
   *   reveal     – true to render already graded (read-only)
   *   instant    – learning mode: clicking an option grades it at once (Choose TWO: once both are picked);
   *                wrong pick turns light red, the right answer light green
   *   checkable  – older mode with a "Kiểm tra" button
   *   onGrade    – called with (ok, selection) when the answer is graded by the user
   *   meta       – small HTML line shown under the explanation (e.g. related lessons)
   *   html       – q.q and q.options are trusted-ish HTML (sanitised to a few inline tags)
   *   explainHtml – HTML for the explanation box instead of q.explain
   */
  function renderQuestion(q, opts) {
    opts = opts || {};
    var need = answerSet(q).length;
    var sel = (opts.selected || []).slice();
    var txt = opts.html ? sanitize : esc;
    var wrap = el("div", { class: "q" + (opts.instant ? " instant" : "") });
    var head = el("p", { class: "qt" }, '<span class="n">' + esc(opts.num || "") + "</span>" + txt(q.q));
    wrap.appendChild(head);
    if (isMulti(q)) wrap.appendChild(el("p", { class: "hint", text: "Chọn " + need + " đáp án." + (opts.instant ? " Chọn đủ " + need + " thì chấm." : "") }));
    var list = el("div", { class: "opts" });
    var buttons = q.options.map(function (o, i) {
      var b = el("button", { type: "button", class: "opt" }, '<span class="l">' + LETTERS[i] + "</span><span>" + txt(o) + "</span>");
      b.addEventListener("click", function () {
        if (wrap.dataset.locked) return;
        var at = sel.indexOf(i);
        if (need === 1) sel = at === -1 || opts.instant ? [i] : [];
        else if (at !== -1) sel.splice(at, 1);
        else if (sel.length < need) sel.push(i);
        else { sel.shift(); sel.push(i); }
        paint();
        if (opts.onChange) opts.onChange(sel.slice());
        if (opts.instant && sel.length === need) grade();
      });
      list.appendChild(b);
      return b;
    });
    wrap.appendChild(list);

    var act, checkBtn, verdict, explainBox;
    if (opts.instant) {
      act = el("div", { class: "qact" });
      verdict = el("span", { class: "verdict" });
      checkBtn = el("button", { type: "button", class: "btn ghost small", text: "Làm lại" });
      checkBtn.hidden = true;
      act.appendChild(verdict); act.appendChild(checkBtn);
      wrap.appendChild(act);
      checkBtn.addEventListener("click", function () { reset(); });
    } else if (opts.checkable) {
      act = el("div", { class: "qact" });
      checkBtn = el("button", { type: "button", class: "btn", text: "Kiểm tra" });
      verdict = el("span", { class: "verdict" });
      act.appendChild(checkBtn); act.appendChild(verdict);
      wrap.appendChild(act);
      checkBtn.addEventListener("click", function () {
        if (wrap.dataset.locked) { reset(); return; }
        grade();
      });
    }

    function paint() {
      buttons.forEach(function (b, i) { b.classList.toggle("sel", sel.indexOf(i) !== -1); });
      if (checkBtn && !opts.instant && !wrap.dataset.locked) checkBtn.disabled = sel.length !== need;
    }

    function grade() {
      wrap.dataset.locked = "1";
      var right = answerSet(q);
      buttons.forEach(function (b, i) {
        b.disabled = true;
        b.classList.remove("sel");
        if (right.indexOf(i) !== -1) b.classList.add("right");
        else if (sel.indexOf(i) !== -1) b.classList.add("wrong");
      });
      var ok = sameSet(sel, right);
      if (opts.onGrade && !opts.reveal) opts.onGrade(ok, sel.slice());
      var rightLetters = right.map(function (i) { return LETTERS[i]; }).join(", ");
      if (verdict) {
        verdict.textContent = ok ? "✓ Đúng" : (sel.length ? "✗ Sai · đáp án đúng: " + rightLetters : "Chưa trả lời · đáp án đúng: " + rightLetters);
        verdict.className = "verdict " + (ok ? "ok" : "bad");
      }
      if (checkBtn) {
        if (opts.instant) checkBtn.hidden = !!opts.reveal && !opts.retry;
        else { checkBtn.textContent = "Làm lại"; checkBtn.className = "btn ghost"; checkBtn.disabled = false; }
      }
      var ex = opts.explainHtml || (q.explain ? "<b>Giải thích: </b>" + esc(q.explain) : "");
      if (ex || opts.meta) {
        explainBox = el("div", { class: "explain" }, ex + (opts.meta ? '<div class="qmeta">' + opts.meta + "</div>" : ""));
        wrap.appendChild(explainBox);
      }
      return ok;
    }

    function reset() {
      delete wrap.dataset.locked;
      sel = [];
      buttons.forEach(function (b) { b.disabled = false; b.classList.remove("right", "wrong", "sel"); });
      if (verdict) { verdict.textContent = ""; verdict.className = "verdict"; }
      if (checkBtn) {
        if (opts.instant) checkBtn.hidden = true;
        else { checkBtn.textContent = "Kiểm tra"; checkBtn.className = "btn"; }
      }
      if (explainBox) { explainBox.remove(); explainBox = null; }
      if (opts.onReset) opts.onReset();
      paint();
    }

    paint();
    if (opts.reveal) grade();
    return wrap;
  }

  // Stable id for a question: hash of its text (survives reordering of the bank).
  function qid(q) {
    var s = q.q, h = 5381;
    for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
    return "q" + h.toString(36);
  }

  // Every question of a cert with its domain index and stable id.
  function allQuestions(D) {
    var out = [];
    D.domains.forEach(function (d, di) {
      d.quiz.forEach(function (q) { out.push({ q: q, di: di, id: qid(q), kind: "quiz" }); });
      (d.bank || []).forEach(function (q) { out.push({ q: q, di: di, id: qid(q), kind: "bank" }); });
    });
    return out;
  }

  /*
   * Wrong-answer notebook, per cert: { [qid]: { n: times wrong, last: ms, streak: right answers since, done: bool } }.
   * A question leaves the active list after 2 correct answers in a row (or when marked as learnt).
   */
  function notebook(D) {
    var key = D.storageKey + "-wrong";
    function load() { return store.get(key, {}) || {}; }
    return {
      all: load,
      record: function (q, ok) {
        var nb = load(), id = qid(q), e = nb[id];
        if (!ok) { e = e || { n: 0 }; e.n++; e.last = Date.now(); e.streak = 0; e.done = false; nb[id] = e; }
        else if (e) { e.streak = (e.streak || 0) + 1; if (e.streak >= 2) e.done = true; }
        else return;
        store.set(key, nb);
      },
      setDone: function (id, done) {
        var nb = load();
        if (nb[id]) { nb[id].done = done; if (!done) nb[id].streak = 0; store.set(key, nb); }
      },
      remove: function (id) { var nb = load(); delete nb[id]; store.set(key, nb); },
      activeCount: function () { var nb = load(), n = 0; for (var k in nb) if (!nb[k].done) n++; return n; }
    };
  }

  function lessonNum(id) {
    var m = /^l-(\d+)-(\d+)$/.exec(id);
    return m ? m[1] + "." + m[2] : id;
  }

  // HTML links to lessons that share a task statement with the question (prefix: "" on notes page, "notes.html" elsewhere).
  function relatedLinks(D, q, prefix) {
    if (!q.ts || !q.ts.length) return "";
    var out = [];
    D.domains.forEach(function (d) {
      d.lessons.forEach(function (l) {
        if (l.ts && l.ts.some(function (t) { return q.ts.indexOf(t) !== -1; }))
          out.push('<a href="' + (prefix || "") + "#" + l.id + '">' + lessonNum(l.id) + " " + esc(l.title) + "</a>");
      });
    });
    return (q.ts.length ? "Task statement " + q.ts.map(esc).join(", ") : "") +
      (out.length ? " · Đọc lại: " + out.slice(0, 3).join(" · ") : "");
  }

  function scenarioOf(D, q) {
    if (!q.sc || !D.scenarios) return null;
    for (var i = 0; i < D.scenarios.length; i++) if (D.scenarios[i].id === q.sc) return D.scenarios[i];
    return null;
  }

  window.CCN = {
    lessonNum: lessonNum, relatedLinks: relatedLinks, scenarioOf: scenarioOf,
    store: store, esc: esc, el: el, renderQuestion: renderQuestion, sanitize: sanitize,
    answerSet: answerSet, sameSet: sameSet, LETTERS: LETTERS,
    qid: qid, allQuestions: allQuestions, notebook: notebook
  };
})();
