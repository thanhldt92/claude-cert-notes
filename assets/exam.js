/* Mock exam: draws questions from every domain quiz, weighted by domain weight, with a countdown. */
(function () {
  "use strict";
  var D = window.CERT_DATA, C = window.CCN;
  var root = document.getElementById("exam");
  if (!D) { root.textContent = "Không tải được dữ liệu (data.js)."; return; }

  var esc = C.esc, el = C.el;
  var CUR_KEY = D.storageKey + "-exam-current";
  var HIST_KEY = D.storageKey + "-exam-history";
  var PASS_RATIO = 0.72; // rough guide: 720/1000 scaled ≈ 72% correct

  document.title = "Thi thử " + D.code;
  document.getElementById("bar-title").textContent = "Thi thử " + D.code;

  // pool: id = "<domainIndex>-<questionIndex>"
  var pool = {};
  D.domains.forEach(function (d, di) { d.quiz.forEach(function (q, qi) { pool[di + "-" + qi] = q; }); });
  var poolIds = Object.keys(pool);

  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }

  function draw(n) {
    n = Math.min(n, poolIds.length);
    var picked = [], left = [];
    D.domains.forEach(function (d, di) {
      var ids = shuffle(d.quiz.map(function (_, qi) { return di + "-" + qi; }));
      var quota = Math.min(ids.length, Math.round(n * d.weight / 100));
      picked = picked.concat(ids.slice(0, quota));
      left = left.concat(ids.slice(quota));
    });
    shuffle(left);
    while (picked.length < n && left.length) picked.push(left.pop());
    return shuffle(picked.slice(0, n));
  }

  function fmt(sec) {
    sec = Math.max(0, Math.round(sec));
    var h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60;
    return (h ? h + ":" + String(m).padStart(2, "0") : m) + ":" + String(s).padStart(2, "0");
  }

  var timerEl = document.getElementById("timer");
  var tick = null;

  // ---------- setup ----------
  function setup() {
    clearInterval(tick); timerEl.hidden = true;
    var cur = C.store.get(CUR_KEY, null);
    var hist = C.store.get(HIST_KEY, []) || [];
    var sizes = [15, 30, D.exam.questions].filter(function (v, i, a) { return a.indexOf(v) === i; });
    root.innerHTML = "";
    var box = el("section", { class: "box setup" });
    box.innerHTML =
      "<h3>Thi thử " + esc(D.code) + "</h3>" +
      "<p>Đề thật: " + D.exam.questions + " câu, " + D.exam.minutes + " phút, đậu từ " + D.exam.passScaled +
      "/1000 điểm quy đổi (ước chừng ~" + Math.round(PASS_RATIO * 100) + "% câu đúng). Ngân hàng hiện có <b>" + poolIds.length +
      "</b> câu, bốc theo tỉ trọng domain. Không hiện đáp án cho tới khi nộp bài.</p>" +
      '<label>Số câu <select id="n">' + sizes.map(function (s) {
        var real = Math.min(s, poolIds.length);
        return '<option value="' + s + '"' + (s === D.exam.questions ? " selected" : "") + ">" + real + " câu · " +
          Math.round(D.exam.minutes * real / D.exam.questions) + " phút</option>";
      }).join("") + "</select></label>" +
      '<div class="qact"><button class="btn" id="start" type="button">Bắt đầu</button>' +
      (cur ? '<button class="btn ghost" id="resume" type="button">Làm tiếp bài đang dở (' + Object.keys(cur.answers).length + "/" + cur.ids.length + ")</button>" : "") +
      "</div>";
    root.appendChild(box);
    if (hist.length) {
      var hb = el("section", { class: "box" });
      hb.innerHTML = "<h3>Lịch sử</h3><div class=\"tablewrap\"><table><thead><tr><th>Ngày</th><th>Số câu</th><th>Đúng</th><th>Kết quả</th></tr></thead><tbody>" +
        hist.slice(-10).reverse().map(function (h) {
          var pct = Math.round(h.right / h.n * 100);
          return "<tr><td>" + esc(new Date(h.at).toLocaleString("vi-VN")) + "</td><td>" + h.n + "</td><td>" + h.right + " (" + pct + "%)</td><td>" +
            (h.right / h.n >= PASS_RATIO ? '<span class="badge ok">Đạt</span>' : '<span class="badge warn">Chưa đạt</span>') + "</td></tr>";
        }).join("") + "</tbody></table></div>";
      root.appendChild(hb);
    }
    box.querySelector("#start").addEventListener("click", function () {
      if (cur && !confirm("Bỏ bài đang làm dở và bắt đầu đề mới?")) return;
      var n = +box.querySelector("#n").value;
      var ids = draw(n);
      var mins = D.exam.minutes * ids.length / D.exam.questions;
      var state = { ids: ids, answers: {}, flags: {}, endAt: Date.now() + mins * 60000, i: 0 };
      C.store.set(CUR_KEY, state);
      run(state);
    });
    var rb = box.querySelector("#resume");
    if (rb) rb.addEventListener("click", function () { run(cur); });
  }

  // ---------- running ----------
  function run(state) {
    root.innerHTML = "";
    var nav = el("div", { class: "navgrid" });
    var qwrap = el("section", { class: "box" });
    var ctrl = el("div", { class: "qact" });
    ctrl.innerHTML =
      '<button class="btn ghost" type="button" data-go="-1">← Câu trước</button>' +
      '<button class="btn ghost" type="button" data-go="1">Câu sau →</button>' +
      '<label class="hint" style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="flag"> Đánh dấu xem lại</label>' +
      '<span style="flex:1"></span><button class="btn" type="button" id="submit">Nộp bài</button>';
    root.appendChild(nav); root.appendChild(qwrap); root.appendChild(ctrl);

    state.ids.forEach(function (_, i) {
      var b = el("button", { type: "button", text: String(i + 1) });
      b.addEventListener("click", function () { show(i); });
      nav.appendChild(b);
    });

    function save() { C.store.set(CUR_KEY, state); }
    function paintNav() {
      Array.prototype.forEach.call(nav.children, function (b, i) {
        b.classList.toggle("ans", !!(state.answers[state.ids[i]] || []).length);
        b.classList.toggle("flag", !!state.flags[state.ids[i]]);
        b.classList.toggle("cur", i === state.i);
      });
    }
    function show(i) {
      state.i = Math.max(0, Math.min(state.ids.length - 1, i));
      var id = state.ids[state.i], q = pool[id];
      qwrap.innerHTML = "";
      var di = +id.split("-")[0];
      qwrap.appendChild(el("p", { class: "hint", text: "Câu " + (state.i + 1) + "/" + state.ids.length + " · Domain " + (di + 1) + " · " + D.domains[di].name }));
      qwrap.appendChild(C.renderQuestion(q, {
        selected: state.answers[id] || [],
        onChange: function (sel) { state.answers[id] = sel; save(); paintNav(); }
      }));
      ctrl.querySelector("#flag").checked = !!state.flags[id];
      save(); paintNav();
    }
    ctrl.addEventListener("click", function (e) {
      var g = e.target.closest("[data-go]");
      if (g) show(state.i + +g.dataset.go);
    });
    ctrl.querySelector("#flag").addEventListener("change", function () {
      var id = state.ids[state.i];
      if (this.checked) state.flags[id] = true; else delete state.flags[id];
      save(); paintNav();
    });
    ctrl.querySelector("#submit").addEventListener("click", function () {
      var missing = state.ids.filter(function (id) { return !(state.answers[id] || []).length; }).length;
      if (!confirm(missing ? "Còn " + missing + " câu chưa trả lời. Nộp bài?" : "Nộp bài?")) return;
      finish(state);
    });

    timerEl.hidden = false;
    clearInterval(tick);
    function t() {
      var left = (state.endAt - Date.now()) / 1000;
      timerEl.textContent = "⏱ " + fmt(left);
      timerEl.classList.toggle("low", left < 300);
      if (left <= 0) { clearInterval(tick); alert("Hết giờ. Bài được nộp tự động."); finish(state); }
    }
    t(); tick = setInterval(t, 1000);
    show(state.i || 0);
  }

  // ---------- result ----------
  function finish(state) {
    clearInterval(tick); timerEl.hidden = true;
    C.store.set(CUR_KEY, null);
    try { localStorage.removeItem(CUR_KEY); } catch (e) {}
    var right = 0, per = D.domains.map(function () { return { n: 0, r: 0 }; });
    var results = state.ids.map(function (id) {
      var q = pool[id], di = +id.split("-")[0];
      var ok = C.sameSet(state.answers[id] || [], C.answerSet(q));
      per[di].n++; if (ok) { per[di].r++; right++; }
      return ok;
    });
    var hist = C.store.get(HIST_KEY, []) || [];
    hist.push({ at: Date.now(), n: state.ids.length, right: right });
    C.store.set(HIST_KEY, hist.slice(-50));

    var ratio = right / state.ids.length;
    root.innerHTML = "";
    var sum = el("section", { class: "box" });
    sum.innerHTML = "<h3>Kết quả</h3>" +
      '<div class="score"><div class="stat"><div class="v">' + right + "/" + state.ids.length + '</div><div class="k">câu đúng</div></div>' +
      '<div class="stat"><div class="v">' + Math.round(ratio * 100) + '%</div><div class="k">tỉ lệ đúng</div></div>' +
      '<div class="stat"><div class="v" style="color:var(--' + (ratio >= PASS_RATIO ? "ok" : "bad") + ')">' + (ratio >= PASS_RATIO ? "Đạt" : "Chưa đạt") +
      '</div><div class="k">mốc tham khảo ~' + Math.round(PASS_RATIO * 100) + "%</div></div></div>" +
      "<h3>Theo domain</h3>" +
      per.map(function (p, di) {
        if (!p.n) return "";
        var r = p.r / p.n;
        return '<div class="dombar"><span>D' + (di + 1) + " · " + esc(D.domains[di].name) + '</span><span class="pbar"><i class="' + (r < PASS_RATIO ? "lowv" : "") +
          '" style="width:' + (r * 100) + '%"></i></span><span>' + p.r + "/" + p.n + "</span></div>";
      }).join("") +
      '<div class="qact" style="margin-top:14px"><button class="btn" type="button" id="again">Làm đề mới</button>' +
      '<label class="hint" style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="onlywrong"> Chỉ xem câu sai</label>' +
      '<a class="btn ghost" href="notes.html" style="text-decoration:none">Về bài học</a></div>';
    root.appendChild(sum);

    var review = el("section", { class: "box" });
    review.appendChild(el("h3", { text: "Xem lại đáp án" }));
    state.ids.forEach(function (id, i) {
      var node = C.renderQuestion(pool[id], { num: (i + 1) + ".", selected: state.answers[id] || [], reveal: true });
      node.dataset.ok = results[i] ? "1" : "0";
      review.appendChild(node);
    });
    root.appendChild(review);
    sum.querySelector("#again").addEventListener("click", setup);
    sum.querySelector("#onlywrong").addEventListener("change", function () {
      var on = this.checked;
      review.querySelectorAll(".q").forEach(function (n) { n.hidden = on && n.dataset.ok === "1"; });
    });
    window.scrollTo(0, 0);
  }

  setup();
})();
