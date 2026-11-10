/* Wrong-answer notebook page: stats + list of questions answered wrong, with filters and retry. */
(function () {
  "use strict";
  var D = window.CERT_DATA, C = window.CCN;
  var root = document.getElementById("wrong");
  if (!D) { root.textContent = "Không tải được dữ liệu (data.js)."; return; }
  var esc = C.esc, el = C.el, NB = C.notebook(D);

  document.title = "Sổ câu sai " + D.code;
  document.getElementById("bar-title").textContent = "Sổ câu sai · " + D.code;

  var ALL = C.allQuestions(D), byId = {};
  ALL.forEach(function (x) { byId[x.id] = x; });

  var filt = { d: "", s: "", showDone: false, sort: "n" };

  function render() {
    var nb = NB.all();
    var items = Object.keys(nb).filter(function (id) { return byId[id]; }).map(function (id) { return { id: id, e: nb[id], x: byId[id] }; });
    var active = items.filter(function (it) { return !it.e.done; });
    root.innerHTML = "";

    // ---- stats ----
    var st = el("section", { class: "box" });
    if (!items.length) {
      st.innerHTML = "<h3>Sổ câu sai</h3><p>Chưa có câu nào. Khi bạn trả lời sai ở quiz cuối domain, luyện tập hoặc thi thử, câu đó được ghi vào đây cùng số lần sai. " +
        'Một câu rời sổ sau 2 lần trả lời đúng liên tiếp, hoặc khi bạn đánh dấu "Đã thuộc".</p>' +
        '<div class="qact"><a class="btn" href="exam.html" style="text-decoration:none">Đi luyện tập</a></div>';
      root.appendChild(st);
      return;
    }
    function group(keyOf, labels) {
      var m = {};
      active.forEach(function (it) { var k = keyOf(it); if (k == null) return; m[k] = (m[k] || 0) + 1; });
      return Object.keys(m).map(function (k) { return { k: k, n: m[k], label: labels(k) }; }).sort(function (a, b) { return b.n - a.n; });
    }
    var byDom = group(function (it) { return it.x.di; }, function (k) { return "D" + (+k + 1) + " · " + D.domains[k].name; });
    var bySc = group(function (it) { return it.x.q.sc || null; }, function (k) { var s = C.scenarioOf(D, { sc: k }); return s ? s.name : k; });
    var tsCount = {};
    active.forEach(function (it) { (it.x.q.ts || []).forEach(function (t) { tsCount[t] = (tsCount[t] || 0) + 1; }); });
    var byTs = Object.keys(tsCount).map(function (t) { return { k: t, n: tsCount[t] }; }).sort(function (a, b) { return b.n - a.n; }).slice(0, 8);
    var max = Math.max.apply(null, byDom.map(function (g) { return g.n; }).concat([1]));
    function bars(list) {
      return list.map(function (g) {
        return '<div class="dombar"><span>' + esc(g.label) + '</span><span class="pbar"><i class="lowv" style="width:' + (g.n / max * 100) + '%"></i></span><span>' + g.n + "</span></div>";
      }).join("");
    }
    var totalWrong = items.reduce(function (s, it) { return s + it.e.n; }, 0);
    st.innerHTML = "<h3>Thống kê</h3>" +
      '<div class="score"><div class="stat"><div class="v">' + active.length + '</div><div class="k">câu còn trong sổ</div></div>' +
      '<div class="stat"><div class="v">' + (items.length - active.length) + '</div><div class="k">câu đã sửa được</div></div>' +
      '<div class="stat"><div class="v">' + totalWrong + '</div><div class="k">lượt trả lời sai</div></div></div>' +
      (byDom.length ? "<h3>Domain hay sai</h3>" + bars(byDom) : "") +
      (bySc.length ? "<h3>Kịch bản hay sai</h3>" + bars(bySc) : "") +
      (byTs.length ? '<h3>Task statement hay sai</h3><p class="tags">' + byTs.map(function (t) { return '<span class="tag">TS ' + esc(t.k) + " · " + t.n + "</span>"; }).join("") + "</p>" : "");
    root.appendChild(st);

    // ---- filters ----
    var fb = el("section", { class: "box setup" });
    fb.innerHTML = '<h3>Danh sách câu</h3><div class="filters"><label>Domain <select id="fd"><option value="">Tất cả</option>' +
      D.domains.map(function (d, i) { return '<option value="' + i + '">D' + (i + 1) + " · " + esc(d.name) + "</option>"; }).join("") + "</select></label>" +
      (D.scenarios ? '<label>Kịch bản <select id="fs"><option value="">Tất cả</option>' + D.scenarios.map(function (s) { return '<option value="' + s.id + '">' + esc(s.name) + "</option>"; }).join("") + "</select></label>" : "") +
      '<label>Sắp xếp <select id="fo"><option value="n">Sai nhiều nhất</option><option value="last">Sai gần nhất</option></select></label>' +
      '<label><input type="checkbox" id="fdone"> Hiện cả câu đã sửa</label></div>' +
      '<div class="qact"><button class="btn" type="button" id="retry">Luyện lại các câu đang lọc</button><button class="btn ghost" type="button" id="clear">Xóa câu đã sửa khỏi sổ</button></div>';
    root.appendChild(fb);
    fb.querySelector("#fd").value = filt.d;
    if (fb.querySelector("#fs")) fb.querySelector("#fs").value = filt.s;
    fb.querySelector("#fo").value = filt.sort;
    fb.querySelector("#fdone").checked = filt.showDone;
    fb.addEventListener("change", function () {
      filt.d = fb.querySelector("#fd").value;
      filt.s = fb.querySelector("#fs") ? fb.querySelector("#fs").value : "";
      filt.sort = fb.querySelector("#fo").value;
      filt.showDone = fb.querySelector("#fdone").checked;
      render();
    });

    var list = items.filter(function (it) {
      return (filt.showDone || !it.e.done) && (filt.d === "" || it.x.di === +filt.d) && (!filt.s || it.x.q.sc === filt.s);
    }).sort(function (a, b) { return filt.sort === "n" ? (b.e.n - a.e.n || b.e.last - a.e.last) : b.e.last - a.e.last; });

    fb.querySelector("#retry").disabled = !list.some(function (it) { return !it.e.done; });
    fb.querySelector("#retry").addEventListener("click", function () {
      var ids = list.filter(function (it) { return !it.e.done; }).map(function (it) { return it.id; });
      for (var i = ids.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = ids[i]; ids[i] = ids[j]; ids[j] = t; }
      C.store.set(D.storageKey + "-exam-current", { mode: "practice", ids: ids, answers: {}, graded: {}, i: 0, retry: true });
      location.href = "exam.html";
    });
    fb.querySelector("#clear").addEventListener("click", function () {
      if (!confirm("Xóa hẳn các câu đã sửa khỏi sổ?")) return;
      items.forEach(function (it) { if (it.e.done) NB.remove(it.id); });
      render();
    });

    var box = el("section", { class: "box" });
    if (!list.length) box.appendChild(el("p", { text: "Không có câu nào khớp bộ lọc." }));
    list.forEach(function (it, i) {
      var q = it.x.q;
      var head = el("p", { class: "hint" }, "D" + (it.x.di + 1) + " · " + esc(D.domains[it.x.di].name) +
        (q.sc && C.scenarioOf(D, q) ? " · " + esc(C.scenarioOf(D, q).name) : "") +
        " · sai " + it.e.n + " lần · lần cuối " + esc(new Date(it.e.last).toLocaleDateString("vi-VN")) +
        (it.e.done ? ' · <span class="badge ok">đã sửa</span>' : it.e.streak ? " · đúng liên tiếp " + it.e.streak + "/2" : ""));
      var node = C.renderQuestion(q, { num: (i + 1) + ".", reveal: true, meta: C.relatedLinks(D, q, "notes.html") });
      var act = el("div", { class: "qact" });
      var b = el("button", { type: "button", class: "btn ghost", text: it.e.done ? "Đưa lại vào sổ" : "Đã thuộc" });
      b.addEventListener("click", function () { NB.setDone(it.id, !it.e.done); render(); });
      act.appendChild(b);
      var wrap = el("div", { class: "wq" });
      wrap.appendChild(head); wrap.appendChild(node); wrap.appendChild(act);
      box.appendChild(wrap);
    });
    root.appendChild(box);
  }

  render();
})();
