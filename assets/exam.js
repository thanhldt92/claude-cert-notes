/*
 * Mock exam and practice.
 *  - Thi thử: real format (4 scenarios × 15 questions) when the cert has tagged scenarios, otherwise drawn by domain weight.
 *  - Luyện tập: filter by domain / scenario, answer shown right after each question, no timer.
 *  - Luyện câu sai: questions from the wrong-answer notebook.
 * Every graded answer is recorded in the notebook (C.notebook).
 */
(function () {
  "use strict";
  var D = window.CERT_DATA, C = window.CCN;
  var root = document.getElementById("exam");
  if (!D) { root.textContent = "Không tải được dữ liệu (data.js)."; return; }

  var esc = C.esc, el = C.el;
  var NB = C.notebook(D);
  var CUR_KEY = D.storageKey + "-exam-current";
  var HIST_KEY = D.storageKey + "-exam-history";
  var PASS_RATIO = 0.72; // rough guide: 720 on the 100–1,000 scale ≈ 72% correct
  var PER_SCENARIO = 15;

  document.title = "Thi thử " + D.code;
  document.getElementById("bar-title").textContent = "Thi thử · " + D.code;

  var ALL = C.allQuestions(D);
  var byId = {};
  ALL.forEach(function (x) { byId[x.id] = x; });
  var scenarios = (D.scenarios || []).map(function (s) {
    return { s: s, ids: ALL.filter(function (x) { return x.q.sc === s.id; }).map(function (x) { return x.id; }) };
  });
  var usableSc = scenarios.filter(function (x) { return x.ids.length >= PER_SCENARIO; });
  var canScenarioExam = usableSc.length >= 4;

  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function fmt(sec) {
    sec = Math.max(0, Math.round(sec));
    var h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60;
    return (h ? h + ":" + String(m).padStart(2, "0") : m) + ":" + String(s).padStart(2, "0");
  }
  function params() {
    var p = {};
    location.search.replace(/^\?/, "").split("&").forEach(function (kv) { if (kv) { var a = kv.split("="); p[a[0]] = decodeURIComponent(a[1] || ""); } });
    return p;
  }

  // ---------- drawing ----------
  function drawByDomain(n) {
    n = Math.min(n, ALL.length);
    var picked = [], left = [];
    D.domains.forEach(function (d, di) {
      var ids = shuffle(ALL.filter(function (x) { return x.di === di; }).map(function (x) { return x.id; }));
      var quota = Math.min(ids.length, Math.round(n * d.weight / 100));
      picked = picked.concat(ids.slice(0, quota));
      left = left.concat(ids.slice(quota));
    });
    shuffle(left);
    while (picked.length < n && left.length) picked.push(left.pop());
    return shuffle(picked.slice(0, n));
  }
  function drawByScenario(scIds) {
    var out = [];
    scIds.forEach(function (sid) {
      var sc = scenarios.filter(function (x) { return x.s.id === sid; })[0];
      out = out.concat(shuffle(sc.ids.slice()).slice(0, PER_SCENARIO));
    });
    return out; // grouped by scenario, like the real exam
  }

  var timerEl = document.getElementById("timer");
  var tick = null;

  // ---------- setup ----------
  function setup() {
    clearInterval(tick); timerEl.hidden = true;
    history.replaceState(null, "", location.pathname);
    var cur = C.store.get(CUR_KEY, null);
    if (cur && !(cur.ids || []).every(function (id) { return byId[id]; })) { cur = null; C.store.set(CUR_KEY, null); }
    var hist = C.store.get(HIST_KEY, []) || [];
    var wrongActive = activeWrongIds();
    root.innerHTML = "";

    if (cur) {
      var rb = el("section", { class: "box" });
      rb.innerHTML = "<h3>Bài đang làm dở</h3><p>" + (cur.mode === "exam" ? "Thi thử" : "Luyện tập") + " · đã trả lời " +
        Object.keys(cur.answers).length + "/" + cur.ids.length + ' câu.</p><div class="qact"><button class="btn" type="button" id="resume">Làm tiếp</button>' +
        '<button class="btn ghost" type="button" id="drop">Bỏ bài này</button></div>';
      root.appendChild(rb);
      rb.querySelector("#resume").addEventListener("click", function () { run(cur); });
      rb.querySelector("#drop").addEventListener("click", function () { C.store.set(CUR_KEY, null); setup(); });
    }

    // 1. mock exam
    var ex = el("section", { class: "box setup" });
    var fullMin = D.exam.minutes;
    var html = "<h3>Thi thử</h3><p>Đề thật: " + D.exam.questions + " câu, " + D.exam.minutes + " phút, đậu từ " + D.exam.passScaled +
      " trên thang 100–1.000 (ước chừng ~" + Math.round(PASS_RATIO * 100) + "% câu đúng). Ngân hàng hiện có <b>" + ALL.length +
      "</b> câu. Không hiện đáp án cho tới khi nộp bài.</p>";
    if (canScenarioExam) {
      html += '<label><input type="radio" name="fmt" value="sc" checked> Theo kịch bản như đề thật: bốc ngẫu nhiên kịch bản, mỗi kịch bản ' + PER_SCENARIO + " câu</label>" +
        '<label><input type="radio" name="fmt" value="dom"> Theo tỉ trọng domain</label>' +
        '<div id="scopts"><label>Số kịch bản <select id="nsc"><option value="4">4 kịch bản · ' + (4 * PER_SCENARIO) + " câu · " + fullMin + ' phút</option>' +
        '<option value="2">2 kịch bản · ' + (2 * PER_SCENARIO) + " câu · " + Math.round(fullMin / 2) + " phút</option></select></label>" +
        '<p class="hint">Muốn chọn kịch bản cụ thể thì tick đúng số kịch bản ở trên; không tick thì bốc ngẫu nhiên.</p><div class="sclist">' +
        usableSc.map(function (x) { return '<label><input type="checkbox" value="' + x.s.id + '"> ' + esc(x.s.name) + ' <span class="hint">(' + x.ids.length + " câu)</span></label>"; }).join("") +
        "</div></div>";
    }
    var sizes = [15, 30, D.exam.questions].filter(function (v, i, a) { return a.indexOf(v) === i; });
    html += '<div id="domopts"' + (canScenarioExam ? " hidden" : "") + '><label>Số câu <select id="n">' + sizes.map(function (s) {
      var real = Math.min(s, ALL.length);
      return '<option value="' + s + '"' + (s === D.exam.questions ? " selected" : "") + ">" + real + " câu · " + Math.round(fullMin * real / D.exam.questions) + " phút</option>";
    }).join("") + "</select></label></div>" +
      '<div class="qact"><button class="btn" id="start" type="button">Bắt đầu thi</button></div>';
    ex.innerHTML = html;
    root.appendChild(ex);
    ex.querySelectorAll('input[name="fmt"]').forEach(function (r) {
      r.addEventListener("change", function () {
        var sc = ex.querySelector('input[name="fmt"]:checked').value === "sc";
        ex.querySelector("#scopts").hidden = !sc; ex.querySelector("#domopts").hidden = sc;
      });
    });
    ex.querySelector("#start").addEventListener("click", function () {
      if (cur && !confirm("Bỏ bài đang làm dở và bắt đầu đề mới?")) return;
      var useSc = canScenarioExam && ex.querySelector('input[name="fmt"]:checked').value === "sc";
      var ids, scIds = null, mins;
      if (useSc) {
        var k = +ex.querySelector("#nsc").value;
        var chosen = Array.prototype.map.call(ex.querySelectorAll(".sclist input:checked"), function (i) { return i.value; });
        scIds = chosen.length === k ? chosen : shuffle(usableSc.map(function (x) { return x.s.id; })).slice(0, k);
        ids = drawByScenario(scIds);
        mins = fullMin * k / 4;
      } else {
        ids = drawByDomain(+ex.querySelector("#n").value);
        mins = fullMin * ids.length / D.exam.questions;
      }
      start({ mode: "exam", ids: ids, scIds: scIds, answers: {}, flags: {}, endAt: Date.now() + mins * 60000, i: 0 });
    });

    // 2. practice
    var pr = el("section", { class: "box setup", id: "practice" });
    pr.innerHTML = "<h3>Luyện tập</h3><p>Hiện đáp án và giải thích ngay sau mỗi câu, không giới hạn thời gian. Câu sai được ghi vào Sổ câu sai.</p>" +
      '<label>Domain <select id="pd"><option value="">Tất cả</option>' +
      D.domains.map(function (d, i) { return '<option value="' + d.id + '">D' + (i + 1) + " · " + esc(d.name) + "</option>"; }).join("") + "</select></label>" +
      (scenarios.length ? '<label>Kịch bản <select id="ps"><option value="">Tất cả</option>' +
        scenarios.map(function (x) { return '<option value="' + x.s.id + '">' + esc(x.s.name) + " (" + x.ids.length + ")</option>"; }).join("") + "</select></label>" : "") +
      '<label>Số câu <select id="pn"><option value="10">10</option><option value="20" selected>20</option><option value="0">Tất cả câu khớp</option></select></label>' +
      '<p class="hint" id="pcount"></p><div class="qact"><button class="btn" id="pstart" type="button">Bắt đầu luyện</button></div>';
    root.appendChild(pr);
    function practicePool() {
      var dsel = pr.querySelector("#pd").value, ssel = pr.querySelector("#ps") ? pr.querySelector("#ps").value : "";
      return ALL.filter(function (x) {
        return (!dsel || D.domains[x.di].id === dsel) && (!ssel || x.q.sc === ssel);
      }).map(function (x) { return x.id; });
    }
    function showCount() { pr.querySelector("#pcount").textContent = practicePool().length + " câu khớp bộ lọc."; }
    pr.querySelectorAll("select").forEach(function (s) { s.addEventListener("change", showCount); });
    pr.querySelector("#pstart").addEventListener("click", function () {
      var pool = shuffle(practicePool()), n = +pr.querySelector("#pn").value;
      if (!pool.length) { alert("Không có câu nào khớp bộ lọc."); return; }
      if (cur && !confirm("Bỏ bài đang làm dở?")) return;
      start({ mode: "practice", ids: n ? pool.slice(0, n) : pool, answers: {}, graded: {}, i: 0 });
    });

    // 3. wrong answers
    var wr = el("section", { class: "box setup", id: "retry" });
    wr.innerHTML = "<h3>Luyện câu sai</h3><p>" + (wrongActive.length
      ? "Sổ câu sai đang có <b>" + wrongActive.length + "</b> câu. Một câu rời sổ sau 2 lần trả lời đúng liên tiếp."
      : "Chưa có câu sai nào. Câu làm sai ở quiz, luyện tập và thi thử sẽ được ghi lại ở đây.") + "</p>" +
      '<div class="qact"><button class="btn" id="wstart" type="button"' + (wrongActive.length ? "" : " disabled") + '>Luyện lại câu sai</button><a class="btn ghost" href="wrong.html" style="text-decoration:none">Mở Sổ câu sai</a>' +
      (D.code === "CCAR-F" && location.protocol === "file:" ? '<a class="btn ghost" href="certsafari.html" style="text-decoration:none">Sổ ôn certsafari</a>' : "") + "</div>";
    root.appendChild(wr);
    wr.querySelector("#wstart").addEventListener("click", function () {
      if (cur && !confirm("Bỏ bài đang làm dở?")) return;
      start({ mode: "practice", ids: shuffle(activeWrongIds()), answers: {}, graded: {}, i: 0, retry: true });
    });

    if (hist.length) {
      var hb = el("section", { class: "box" });
      hb.innerHTML = "<h3>Lịch sử thi thử</h3><div class=\"tablewrap\"><table><thead><tr><th>Ngày</th><th>Dạng đề</th><th>Đúng</th><th>Kết quả</th></tr></thead><tbody>" +
        hist.slice(-10).reverse().map(function (h) {
          var pct = Math.round(h.right / h.n * 100);
          return "<tr><td>" + esc(new Date(h.at).toLocaleString("vi-VN")) + "</td><td>" + (h.label ? esc(h.label) : h.n + " câu") + "</td><td>" + h.right + "/" + h.n + " (" + pct + "%)</td><td>" +
            (h.right / h.n >= PASS_RATIO ? '<span class="badge ok">Đạt</span>' : '<span class="badge warn">Chưa đạt</span>') + "</td></tr>";
        }).join("") + "</tbody></table></div>";
      root.appendChild(hb);
    }

    showCount();
    var p = params();
    if (p.practice) { pr.querySelector("#pd").value = p.practice; showCount(); pr.scrollIntoView(); }
    if (p.sc && pr.querySelector("#ps")) { pr.querySelector("#ps").value = p.sc; showCount(); pr.scrollIntoView(); }
    if (p.mode === "wrong") wr.scrollIntoView();
  }

  function activeWrongIds() {
    var nb = NB.all();
    return Object.keys(nb).filter(function (id) { return !nb[id].done && byId[id]; });
  }

  function start(state) {
    C.store.set(CUR_KEY, state);
    run(state);
  }

  function scenarioCard(q) {
    var s = C.scenarioOf(D, q);
    if (!s) return null;
    var box = el("details", { class: "scenario", open: "" });
    box.innerHTML = "<summary>Kịch bản: " + esc(s.name) + "</summary><p>" + esc(s.desc) + "</p>";
    return box;
  }

  // ---------- running ----------
  function run(state) {
    root.innerHTML = "";
    var practice = state.mode === "practice";
    var nav = el("div", { class: "navgrid" });
    var qwrap = el("section", { class: "box" });
    var ctrl = el("div", { class: "qact" });
    ctrl.innerHTML =
      '<button class="btn ghost" type="button" data-go="-1">← Câu trước</button>' +
      '<button class="btn ghost" type="button" data-go="1">Câu sau →</button>' +
      (practice ? "" : '<label class="hint" style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="flag"> Đánh dấu xem lại</label>') +
      '<span style="flex:1"></span><button class="btn" type="button" id="submit">' + (practice ? "Kết thúc" : "Nộp bài") + "</button>";
    root.appendChild(nav); root.appendChild(qwrap); root.appendChild(ctrl);

    state.ids.forEach(function (_, i) {
      var b = el("button", { type: "button", text: String(i + 1) });
      b.addEventListener("click", function () { show(i); });
      nav.appendChild(b);
    });

    function save() { C.store.set(CUR_KEY, state); }
    function paintNav() {
      Array.prototype.forEach.call(nav.children, function (b, i) {
        var id = state.ids[i];
        b.classList.toggle("ans", !practice && !!(state.answers[id] || []).length);
        b.classList.toggle("flag", !!(state.flags && state.flags[id]));
        b.classList.toggle("cur", i === state.i);
        if (practice && state.graded[id] != null) { b.classList.toggle("right", state.graded[id]); b.classList.toggle("wrong", !state.graded[id]); }
      });
    }
    function show(i) {
      state.i = Math.max(0, Math.min(state.ids.length - 1, i));
      var id = state.ids[state.i], x = byId[id], q = x.q;
      qwrap.innerHTML = "";
      var prev = state.i > 0 ? byId[state.ids[state.i - 1]].q : null;
      var card = scenarioCard(q);
      if (card) { if (prev && prev.sc === q.sc && !practice) card.removeAttribute("open"); qwrap.appendChild(card); }
      qwrap.appendChild(el("p", { class: "hint", text: "Câu " + (state.i + 1) + "/" + state.ids.length + " · Domain " + (x.di + 1) + " · " + D.domains[x.di].name }));
      if (practice) {
        var graded = state.graded[id] != null;
        var node = C.renderQuestion(q, {
          instant: true, retry: true, selected: state.answers[id] || [], reveal: graded, meta: C.relatedLinks(D, q, "notes.html"),
          onGrade: function (ok, sel) {
            state.answers[id] = sel; state.graded[id] = ok; NB.record(q, ok); save(); paintNav();
          }
        });
        qwrap.appendChild(node);
      } else {
        qwrap.appendChild(C.renderQuestion(q, {
          selected: state.answers[id] || [],
          onChange: function (sel) { state.answers[id] = sel; save(); paintNav(); }
        }));
        ctrl.querySelector("#flag").checked = !!state.flags[id];
      }
      save(); paintNav();
    }
    ctrl.addEventListener("click", function (e) {
      var g = e.target.closest("[data-go]");
      if (g) show(state.i + +g.dataset.go);
    });
    var flag = ctrl.querySelector("#flag");
    if (flag) flag.addEventListener("change", function () {
      var id = state.ids[state.i];
      if (this.checked) state.flags[id] = true; else delete state.flags[id];
      save(); paintNav();
    });
    ctrl.querySelector("#submit").addEventListener("click", function () {
      if (practice) { finishPractice(state); return; }
      var missing = state.ids.filter(function (id) { return !(state.answers[id] || []).length; }).length;
      if (!confirm(missing ? "Còn " + missing + " câu chưa trả lời. Nộp bài?" : "Nộp bài?")) return;
      finishExam(state);
    });

    clearInterval(tick);
    if (!practice) {
      timerEl.hidden = false;
      var t = function () {
        var left = (state.endAt - Date.now()) / 1000;
        timerEl.textContent = "⏱ " + fmt(left);
        timerEl.classList.toggle("low", left < 300);
        if (left <= 0) { clearInterval(tick); alert("Hết giờ. Bài được nộp tự động."); finishExam(state); }
      };
      t(); tick = setInterval(t, 1000);
    } else timerEl.hidden = true;
    show(state.i || 0);
  }

  // ---------- results ----------
  function breakdown(ids, okOf) {
    var per = D.domains.map(function () { return { n: 0, r: 0 }; }), perSc = {};
    ids.forEach(function (id) {
      var x = byId[id], ok = okOf(id);
      per[x.di].n++; if (ok) per[x.di].r++;
      if (x.q.sc) { perSc[x.q.sc] = perSc[x.q.sc] || { n: 0, r: 0 }; perSc[x.q.sc].n++; if (ok) perSc[x.q.sc].r++; }
    });
    function bar(label, p) {
      var r = p.r / p.n;
      return '<div class="dombar"><span>' + label + '</span><span class="pbar"><i class="' + (r < PASS_RATIO ? "lowv" : "") +
        '" style="width:' + (r * 100) + '%"></i></span><span>' + p.r + "/" + p.n + "</span></div>";
    }
    var html = "<h3>Theo domain</h3>" + per.map(function (p, di) { return p.n ? bar("D" + (di + 1) + " · " + esc(D.domains[di].name), p) : ""; }).join("");
    var scKeys = Object.keys(perSc);
    if (scKeys.length) html += "<h3>Theo kịch bản</h3>" + (D.scenarios || []).filter(function (s) { return perSc[s.id]; })
      .map(function (s) { return bar(esc(s.name), perSc[s.id]); }).join("");
    return html;
  }

  function reviewList(ids, answers, okOf) {
    var review = el("section", { class: "box" });
    review.appendChild(el("h3", { text: "Xem lại đáp án" }));
    var lastSc = null;
    ids.forEach(function (id, i) {
      var q = byId[id].q;
      if (q.sc && q.sc !== lastSc) { var c = scenarioCard(q); if (c) { c.removeAttribute("open"); review.appendChild(c); } }
      lastSc = q.sc || null;
      var node = C.renderQuestion(q, { num: (i + 1) + ".", selected: answers[id] || [], reveal: true, meta: C.relatedLinks(D, q, "notes.html") });
      node.dataset.ok = okOf(id) ? "1" : "0";
      review.appendChild(node);
    });
    return review;
  }

  function finishExam(state) {
    clearInterval(tick); timerEl.hidden = true;
    C.store.set(CUR_KEY, null);
    var okMap = {}, right = 0;
    state.ids.forEach(function (id) {
      var q = byId[id].q, ok = C.sameSet(state.answers[id] || [], C.answerSet(q));
      okMap[id] = ok; if (ok) right++;
      NB.record(q, ok);
    });
    var okOf = function (id) { return okMap[id]; };
    var label = state.scIds ? state.scIds.length + " kịch bản · " + state.ids.length + " câu" : state.ids.length + " câu theo domain";
    var hist = C.store.get(HIST_KEY, []) || [];
    hist.push({ at: Date.now(), n: state.ids.length, right: right, label: label });
    C.store.set(HIST_KEY, hist.slice(-50));

    var ratio = right / state.ids.length;
    root.innerHTML = "";
    var sum = el("section", { class: "box" });
    sum.innerHTML = "<h3>Kết quả · " + esc(label) + "</h3>" +
      '<div class="score"><div class="stat"><div class="v">' + right + "/" + state.ids.length + '</div><div class="k">câu đúng</div></div>' +
      '<div class="stat"><div class="v">' + Math.round(ratio * 100) + '%</div><div class="k">tỉ lệ đúng</div></div>' +
      '<div class="stat"><div class="v" style="color:var(--' + (ratio >= PASS_RATIO ? "ok" : "bad") + ')">' + (ratio >= PASS_RATIO ? "Đạt" : "Chưa đạt") +
      '</div><div class="k">mốc tham khảo ~' + Math.round(PASS_RATIO * 100) + "%</div></div></div>" +
      breakdown(state.ids, okOf) +
      '<div class="qact" style="margin-top:14px"><button class="btn" type="button" id="again">Về màn hình chọn đề</button>' +
      '<label class="hint" style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="onlywrong"> Chỉ xem câu sai</label>' +
      '<a class="btn ghost" href="wrong.html" style="text-decoration:none">Sổ câu sai</a></div>';
    root.appendChild(sum);
    var review = reviewList(state.ids, state.answers, okOf);
    root.appendChild(review);
    sum.querySelector("#again").addEventListener("click", setup);
    sum.querySelector("#onlywrong").addEventListener("change", function () {
      var on = this.checked;
      review.querySelectorAll(".q").forEach(function (n) { n.hidden = on && n.dataset.ok === "1"; });
    });
    window.scrollTo(0, 0);
  }

  function finishPractice(state) {
    C.store.set(CUR_KEY, null);
    var done = state.ids.filter(function (id) { return state.graded[id] != null; });
    var right = done.filter(function (id) { return state.graded[id]; }).length;
    root.innerHTML = "";
    var sum = el("section", { class: "box" });
    sum.innerHTML = "<h3>Kết thúc " + (state.retry ? "luyện câu sai" : "luyện tập") + "</h3>" +
      (done.length ? '<div class="score"><div class="stat"><div class="v">' + right + "/" + done.length + '</div><div class="k">câu đúng trong số câu đã làm</div></div>' +
        '<div class="stat"><div class="v">' + NB.activeCount() + '</div><div class="k">câu còn trong Sổ câu sai</div></div></div>' +
        breakdown(done, function (id) { return state.graded[id]; }) : "<p>Chưa làm câu nào.</p>") +
      '<div class="qact" style="margin-top:14px"><button class="btn" type="button" id="again">Về màn hình chọn đề</button>' +
      '<a class="btn ghost" href="wrong.html" style="text-decoration:none">Sổ câu sai</a></div>';
    root.appendChild(sum);
    sum.querySelector("#again").addEventListener("click", setup);
    window.scrollTo(0, 0);
  }

  setup();
})();
