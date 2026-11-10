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
   *   checkable  – true to add a "Kiểm tra" button (notes quiz)
   */
  function renderQuestion(q, opts) {
    opts = opts || {};
    var need = answerSet(q).length;
    var sel = (opts.selected || []).slice();
    var wrap = el("div", { class: "q" });
    var head = el("p", { class: "qt" }, '<span class="n">' + esc(opts.num || "") + "</span>" + esc(q.q));
    wrap.appendChild(head);
    if (isMulti(q)) wrap.appendChild(el("p", { class: "hint", text: "Chọn " + need + " đáp án." }));
    var list = el("div", { class: "opts" });
    var buttons = q.options.map(function (o, i) {
      var b = el("button", { type: "button", class: "opt" }, '<span class="l">' + LETTERS[i] + "</span><span>" + esc(o) + "</span>");
      b.addEventListener("click", function () {
        if (wrap.dataset.locked) return;
        var at = sel.indexOf(i);
        if (need === 1) sel = at === -1 ? [i] : [];
        else if (at !== -1) sel.splice(at, 1);
        else if (sel.length < need) sel.push(i);
        else { sel.shift(); sel.push(i); }
        paint();
        if (opts.onChange) opts.onChange(sel.slice());
      });
      list.appendChild(b);
      return b;
    });
    wrap.appendChild(list);

    var act, checkBtn, verdict, explainBox;
    if (opts.checkable) {
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
      if (checkBtn && !wrap.dataset.locked) checkBtn.disabled = sel.length !== need;
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
      if (verdict) { verdict.textContent = ok ? "✓ Đúng" : "✗ Chưa đúng"; verdict.className = "verdict " + (ok ? "ok" : "bad"); }
      if (checkBtn) { checkBtn.textContent = "Làm lại"; checkBtn.className = "btn ghost"; checkBtn.disabled = false; }
      if (q.explain) {
        explainBox = el("div", { class: "explain" }, "<b>Giải thích: </b>" + esc(q.explain));
        wrap.appendChild(explainBox);
      }
      return ok;
    }

    function reset() {
      delete wrap.dataset.locked;
      sel = [];
      buttons.forEach(function (b) { b.disabled = false; b.classList.remove("right", "wrong", "sel"); });
      if (verdict) { verdict.textContent = ""; verdict.className = "verdict"; }
      if (checkBtn) { checkBtn.textContent = "Kiểm tra"; checkBtn.className = "btn"; }
      if (explainBox) { explainBox.remove(); explainBox = null; }
      paint();
    }

    paint();
    if (opts.reveal) grade();
    return wrap;
  }

  window.CCN = {
    store: store, esc: esc, el: el, renderQuestion: renderQuestion,
    answerSet: answerSet, sameSet: sameSet, LETTERS: LETTERS
  };
})();
