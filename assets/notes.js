/* Notes page: renders window.CERT_DATA into the exam-strategy section, lessons, summaries, cheatsheets and domain quizzes. */
(function () {
  "use strict";
  var D = window.CERT_DATA, C = window.CCN;
  if (!D) { document.getElementById("content").textContent = "Không tải được dữ liệu (data.js)."; return; }

  var esc = C.esc, el = C.el;
  var NB = C.notebook(D);
  // lesson number from its id (l-2-0 -> "2.0", g-3 -> "G3"), falling back to position
  function num(l, n, i) {
    var m = /^l-(\d+)-(\d+)$/.exec(l.id); if (m) return m[1] + "." + m[2];
    var g = /^g-(\d+)$/.exec(l.id); return g ? "G" + g[1] : n + "." + (i + 1);
  }
  var done = C.store.get(D.storageKey, {}) || {};
  var guide = D.guide && D.guide.lessons && D.guide.lessons.length ? D.guide : null;
  var allLessons = [];
  if (guide) guide.lessons.forEach(function (l) { allLessons.push(l.id); });
  D.domains.forEach(function (d) { d.lessons.forEach(function (l) { allLessons.push(l.id); }); });

  document.title = "Ôn thi " + D.code;
  document.getElementById("bar-title").textContent = D.code + " · " + D.title;

  // ---------- content ----------
  var main = document.getElementById("content");
  var intro = el("section", { class: "intro", id: "top" });
  var totalMin = 0, totalQ = 0;
  D.domains.forEach(function (d) {
    totalQ += d.quiz.length + (d.bank ? d.bank.length : 0);
    d.lessons.forEach(function (l) { totalMin += l.minutes || 0; });
  });
  if (guide) guide.lessons.forEach(function (l) { totalMin += l.minutes || 0; });
  var wrongN = NB.activeCount();
  var PLAN_KEY = D.storageKey + "-plan";
  var plan = C.store.get(PLAN_KEY, {}) || {};
  function daysTo(iso) {
    if (!iso) return null;
    var p = iso.split("-"), t = new Date(+p[0], +p[1] - 1, +p[2]);
    return Math.round((t - new Date().setHours(0, 0, 0, 0)) / 864e5);
  }
  function fmtDate(iso) { var p = iso.split("-"); return p[2] + "/" + p[1] + "/" + p[0]; }
  intro.innerHTML =
    "<h1>" + esc(D.title) + "</h1>" +
    '<p class="hint">' + D.domains.length + " domain · " + allLessons.length + " bài · ~" + Math.round(totalMin / 60 * 10) / 10 +
    " giờ đọc · " + totalQ + ' câu hỏi · <a href="exam.html">Thi thử và luyện tập →</a> · <a href="wrong.html">Sổ câu sai' +
    (wrongN ? " (" + wrongN + ")" : "") + "</a>" +
    (D.code === "CCAR-F" && location.protocol === "file:" ? ' · <a href="certsafari.html">Sổ ôn certsafari</a>' : "") + "</p>" +
    '<div class="statcards">' +
    '<div class="stat"><div class="v">' + D.exam.questions + ' câu</div><div class="k">' + D.exam.minutes + " phút · có câu chọn nhiều đáp án</div></div>" +
    '<div class="stat"><div class="v">' + D.exam.passScaled + '/1000</div><div class="k">điểm đậu (thang 100–1.000) · ≈ 72% câu đúng</div></div>' +
    (D.scenarios ? '<div class="stat"><div class="v">4 / ' + D.scenarios.length + '</div><div class="k">kịch bản bốc ngẫu nhiên mỗi đề</div></div>'
      : '<div class="stat"><div class="v">' + D.domains.length + ' domain</div><div class="k">chấm theo tỉ trọng domain</div></div>') +
    '<div class="stat" id="examcard"></div>' +
    "</div>" +
    (D.intro || "");
  main.appendChild(intro);

  // ---------- study plan (Lộ trình & tiến độ) ----------
  var planSec = el("section", { class: "box plan", id: "plan" });
  main.appendChild(planSec);
  function orderedLessons() {
    var out = [];
    if (guide) guide.lessons.forEach(function (l) { out.push({ l: l, label: num(l, 0, 0) }); });
    D.domains.forEach(function (d, di) { d.lessons.forEach(function (l, i) { out.push({ l: l, label: num(l, di + 1, i) }); }); });
    return out;
  }
  function addDays(d, n) { var x = new Date(d); x.setDate(x.getDate() + n); return x; }
  function iso(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function dm(d) { return d.getDate() + "/" + (d.getMonth() + 1); }
  function paintExamCard() {
    var card = document.getElementById("examcard"), dd = daysTo(plan.exam);
    if (card) card.innerHTML = '<div class="v">' + (plan.exam ? fmtDate(plan.exam) : "—") + '</div><div class="k">' +
      (plan.exam ? (dd >= 0 ? "ngày thi · còn " + dd + " ngày" : "ngày thi đã qua") : '<a href="#plan">đặt ngày thi</a> để có lộ trình') + "</div>";
  }
  function renderPlan() {
    paintExamCard();
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var mockIso = plan.mock || (plan.exam ? iso(addDays(new Date(plan.exam + "T00:00"), -3)) : "");
    var retakeMin = plan.exam ? iso(addDays(new Date(plan.exam + "T00:00"), 14)) : "";
    function dateField(id, label, val, note) {
      var dd = daysTo(val);
      return '<label class="pf"><span>' + label + '</span><input type="date" id="' + id + '" value="' + (val || "") + '">' +
        '<small>' + (val ? (dd === 0 ? "hôm nay" : dd > 0 ? "còn " + dd + " ngày" : "đã qua " + -dd + " ngày") : note || "") + "</small></label>";
    }
    var html = "<h3>Lộ trình & tiến độ</h3>" +
      '<p class="hint">Hôm nay là ' + ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"][today.getDay()] + ", " + dm(today) + "/" + today.getFullYear() +
      ". Đặt ngày thi; kế hoạch bên dưới tự chia các bài <b>chưa học</b> theo tuần và cập nhật khi bạn đánh dấu đã học. Ngày lưu trên trình duyệt này.</p>" +
      '<div class="pfields">' +
      dateField("p-mock", "Thi thử đạt ≥ 80% trước ngày", mockIso, "mặc định: 3 ngày trước ngày thi") +
      dateField("p-exam", "Ngày thi lần 1", plan.exam, "chưa đặt") +
      dateField("p-retake", "Thi lần 2 (nếu cần, ≥ 14 ngày sau lần 1)", plan.retake, retakeMin ? "sớm nhất " + fmtDate(retakeMin) : "") +
      "</div>" +
      '<div class="tip">Rớt lần 1 phải chờ 14 ngày mới thi lại, rớt lần 2 chờ 30 ngày (theo chính sách thi' +
      (guide ? ', xem <a href="#g-7">G7</a>' : "") + "). Nên thi lần 1 khi thi thử đã ổn định ≥ 80%, và chừa đủ thời gian cho lần 2 trước hạn của bạn.</div>";
    var rest = orderedLessons().filter(function (x) { return !done[x.l.id]; });
    if (!mockIso || daysTo(mockIso) < 1) {
      html += '<p class="hint">' + (mockIso ? "Ngày mục tiêu đã tới: dồn sức vào thi thử, luyện câu sai và chế độ Chỉ cheatsheet." : "Đặt ngày thi để thấy kế hoạch theo tuần.") +
        " Còn " + rest.length + " bài chưa học.</p>";
    } else {
      var end = new Date(mockIso + "T00:00");
      var weeks = [], start = new Date(today);
      while (start < end) {
        var wEnd = addDays(start, 6 - ((start.getDay() + 6) % 7)); // through Sunday
        if (wEnd > addDays(end, -1)) wEnd = addDays(end, -1);
        weeks.push({ from: new Date(start), to: wEnd, days: Math.round((wEnd - start) / 864e5) + 1, items: [] });
        start = addDays(wEnd, 1);
      }
      var totalDays = weeks.reduce(function (s, w) { return s + w.days; }, 0), k = 0;
      weeks.forEach(function (w, i) {
        var take = i === weeks.length - 1 ? rest.length - k : Math.round(rest.length * w.days / totalDays);
        w.items = rest.slice(k, k + take); k += take;
      });
      html += weeks.map(function (w, i) {
        var mins = w.items.reduce(function (s, x) { return s + (x.l.minutes || 0); }, 0);
        return '<div class="pweek"><div class="pwhead"><b>Tuần ' + (i + 1) + " · " + dm(w.from) + (w.days > 1 ? "–" + dm(w.to) : "") + "</b><span>" + w.items.length + " bài · ~" + mins + " phút</span></div>" +
          (w.items.length ? "<ul>" + w.items.map(function (x) {
            return '<li><a href="#' + esc(x.l.id) + '">' + esc(x.label) + " " + esc(x.l.title) + "</a></li>";
          }).join("") + "</ul>" : '<p class="hint">Ôn lại, làm quiz cuối domain.</p>') + "</div>";
      }).join("") +
        '<div class="pweek last"><div class="pwhead"><b>' + dm(end) + (plan.exam ? " → " + fmtDate(plan.exam) + " · thi lần 1" : "") + "</b></div>" +
        '<p>Thi thử đủ đề ít nhất 2 lần (≥ 80%), <a href="exam.html?mode=wrong">luyện lại câu sai</a>, đọc chế độ <b>Chỉ cheatsheet</b>.</p></div>';
    }
    planSec.innerHTML = html;
    ["p-mock", "p-exam", "p-retake"].forEach(function (id) {
      planSec.querySelector("#" + id).addEventListener("change", function () {
        var key = id.slice(2);
        if (this.value) plan[key] = this.value; else delete plan[key];
        C.store.set(PLAN_KEY, plan);
        renderPlan();
      });
    });
  }
  renderPlan();

  function lessonNode(l, label) {
    var art = el("details", { class: "lesson", id: l.id });
    var srcs = (l.sources || []).map(function (s) {
      return '<a href="' + esc(s.u) + '" target="_blank" rel="noopener">' + esc(s.t || s.u) + "</a>";
    }).join(" · ");
    var tags = l.ts && l.ts.length ? '<span class="tags">' + l.ts.map(function (t) { return '<span class="tag">TS ' + esc(t) + "</span>"; }).join("") + "</span>" : "";
    art.innerHTML =
      '<summary><span class="ts">' + label + '</span><h3>' + esc(l.title) + "</h3>" + tags + '<span class="min">' +
      (l.minutes || "?") + ' phút</span><span class="chev" aria-hidden="true">›</span></summary>' +
      '<div class="lbody">' + l.html +
      (l.keypoints && l.keypoints.length ? '<div class="keys"><b>Phải nhớ</b><ul>' +
        l.keypoints.map(function (k) { return "<li>" + esc(k) + "</li>"; }).join("") + "</ul></div>" : "") +
      (srcs ? '<p class="srcs">Nguồn: ' + srcs + "</p>" : "") +
      '<div class="lfoot"><button type="button" class="donebtn" data-lesson="' + esc(l.id) + '" aria-pressed="false">Đánh dấu đã học</button></div>' +
      "</div>";
    return art;
  }

  // exam-strategy section
  if (guide) {
    var gs = el("section", { class: "domain guide", id: "guide" });
    var gmins = guide.lessons.reduce(function (s, l) { return s + (l.minutes || 0); }, 0);
    gs.innerHTML =
      '<div class="dhead"><h2>' + esc(guide.title || "Chiến lược thi") + "</h2>" +
      '<div class="sub"><span>' + guide.lessons.length + " bài · ~" + gmins + ' phút</span>' +
      '<span class="pbar"><i></i></span><span class="dcount"></span></div></div>' +
      '<div class="dintro">' + (guide.intro || "") + "</div>";
    guide.lessons.forEach(function (l, i) { gs.appendChild(lessonNode(l, num(l, 0, i))); });
    main.appendChild(gs);
  }

  D.domains.forEach(function (d, di) {
    var n = di + 1;
    var sec = el("section", { class: "domain", id: d.id });
    var mins = d.lessons.reduce(function (s, l) { return s + (l.minutes || 0); }, 0);
    sec.innerHTML =
      '<div class="dhead"><h2>Domain ' + n + " · " + esc(d.name) + "</h2>" +
      '<div class="sub"><span>' + d.weight + "% đề · " + d.lessons.length + " bài · ~" + mins + ' phút</span>' +
      '<span class="pbar"><i></i></span><span class="dcount"></span></div></div>' +
      '<div class="dintro">' + (d.intro || "") + "</div>";

    d.lessons.forEach(function (l, li) { sec.appendChild(lessonNode(l, num(l, n, li))); });

    if (d.summary && d.summary.length) {
      var sum = el("section", { class: "box summary", id: "sum-" + d.id });
      sum.innerHTML = "<h3>Tổng kết Domain " + n + "</h3><ul>" +
        d.summary.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>";
      sec.appendChild(sum);
    }

    if (d.cheat && d.cheat.length) {
      var cheat = el("section", { class: "box", id: "cheat-" + d.id });
      cheat.innerHTML = "<h3>Cheatsheet Domain " + n + '</h3><div class="tablewrap"><table><thead><tr><th>Tình huống / thuật ngữ</th><th>Nhớ gì</th></tr></thead><tbody>' +
        d.cheat.map(function (r) { return "<tr><td>" + esc(r[0]) + "</td><td>" + esc(r[1]) + "</td></tr>"; }).join("") +
        "</tbody></table></div>";
      sec.appendChild(cheat);
    }

    if (d.quiz && d.quiz.length) {
      var qb = el("section", { class: "box", id: "quiz-" + d.id });
      qb.appendChild(el("h3", { text: "Quiz Domain " + n + " (" + d.quiz.length + " câu)" }));
      qb.appendChild(el("p", { class: "hint" }, 'Câu trả lời sai được ghi vào <a href="wrong.html">Sổ câu sai</a>. Muốn luyện thêm câu của domain này: <a href="exam.html?practice=' + d.id + '">luyện tập D' + n + "</a>."));
      d.quiz.forEach(function (q, qi) {
        qb.appendChild(C.renderQuestion(q, {
          num: (qi + 1) + ".", instant: true, meta: C.relatedLinks(D, q, ""),
          onGrade: function (ok) { NB.record(q, ok); }
        }));
      });
      sec.appendChild(qb);
    }
    main.appendChild(sec);
  });

  // wrap bare tables in lesson bodies so they scroll on phones
  main.querySelectorAll(".lbody table").forEach(function (t) {
    if (t.parentNode.classList.contains("tablewrap")) return;
    var w = el("div", { class: "tablewrap" });
    t.parentNode.insertBefore(w, t); w.appendChild(t);
  });

  // ---------- sidebar ----------
  var toc = document.getElementById("toc");
  function tocGroup(id, label, right, lessons, n, extras) {
    var li = el("li", { "data-domain": id });
    li.innerHTML = '<a class="dn" href="#' + id + '">' + label + "<span>" + right + "</span></a>";
    var ul = el("ul");
    lessons.forEach(function (l, i) {
      ul.appendChild(el("li", null, '<a href="#' + esc(l.id) + '" data-goto="' + esc(l.id) + '"><span class="m"></span><span class="tt">' +
        num(l, n, i) + " " + esc(l.title) + "</span>" + (l.ts && l.ts.length ? '<span class="tts">TS ' + esc(l.ts[0]) + "</span>" : "") + "</a>"));
    });
    extras.forEach(function (x) {
      ul.appendChild(el("li", { class: "extra" }, '<a href="#' + x[0] + '"><span class="m" style="visibility:hidden"></span><span>' + x[1] + "</span></a>"));
    });
    li.appendChild(ul);
    toc.appendChild(li);
  }
  var modes = el("li", { class: "modes" });
  modes.innerHTML = '<div class="seg"><button type="button" data-mode="learn">Học</button><button type="button" data-mode="cheat">Chỉ cheatsheet</button></div>' +
    '<a class="dn" href="#plan">Lộ trình &amp; tiến độ</a>';
  toc.appendChild(modes);
  var MODE_KEY = D.storageKey + "-mode";
  function setMode(m) {
    document.body.classList.toggle("cheat-only", m === "cheat");
    modes.querySelectorAll("[data-mode]").forEach(function (b) { b.classList.toggle("on", b.dataset.mode === m); });
    C.store.set(MODE_KEY, m);
  }
  modes.addEventListener("click", function (e) {
    var b = e.target.closest("[data-mode]");
    if (b) { setMode(b.dataset.mode); window.scrollTo(0, 0); }
  });
  setMode(C.store.get(MODE_KEY, "learn"));
  if (guide) tocGroup("guide", esc(guide.title || "Chiến lược thi"), "", guide.lessons, 0, []);
  D.domains.forEach(function (d, di) {
    var extras = [];
    if (d.summary && d.summary.length) extras.push(["sum-" + d.id, "Tổng kết"]);
    if (d.cheat && d.cheat.length) extras.push(["cheat-" + d.id, "Cheatsheet"]);
    if (d.quiz && d.quiz.length) extras.push(["quiz-" + d.id, "Quiz"]);
    tocGroup(d.id, "D" + (di + 1) + " · " + esc(d.name), d.weight + "%", d.lessons, di + 1, extras);
  });

  function openLesson(id) {
    var art = document.getElementById(id);
    if (art && art.tagName === "DETAILS") art.open = true;
  }
  var side = document.getElementById("side");
  toc.addEventListener("click", function (e) {
    var a = e.target.closest("a[data-goto]");
    if (a) openLesson(a.dataset.goto);
    if (window.matchMedia("(max-width:860px)").matches) side.classList.remove("open");
  });
  // links inside content (e.g. "bài 2.3", related lessons) also open the target lesson
  main.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (a) openLesson(a.getAttribute("href").slice(1));
  });
  // content is built by script, so the browser's own jump to #hash on load may miss: open and scroll explicitly
  function goToHash() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    openLesson(id);
    var t = document.getElementById(id);
    if (t) t.scrollIntoView({ block: "start", behavior: "instant" });
  }
  if (location.hash) requestAnimationFrame(goToHash);
  window.addEventListener("hashchange", goToHash);

  // filter
  document.getElementById("filter").addEventListener("input", function () {
    var t = this.value.trim().toLowerCase();
    toc.querySelectorAll("li[data-domain]").forEach(function (dli) {
      if (!dli.querySelector("ul")) return;
      var any = false;
      dli.querySelectorAll("ul li").forEach(function (li) {
        var show = !t || li.textContent.toLowerCase().indexOf(t) !== -1;
        li.hidden = !show; any = any || show;
      });
      dli.hidden = !any;
    });
  });

  document.getElementById("sidetoggle").addEventListener("click", function () { side.classList.toggle("open"); });

  // ---------- progress ----------
  function paintGroup(secId, lessons) {
    var sec = document.getElementById(secId);
    if (!sec) return;
    var k = lessons.filter(function (l) { return done[l.id]; }).length;
    sec.querySelector(".dhead .pbar i").style.width = (k / lessons.length * 100) + "%";
    sec.querySelector(".dcount").textContent = k + "/" + lessons.length;
  }
  function refresh() {
    var n = 0;
    allLessons.forEach(function (id) {
      var on = !!done[id];
      if (on) n++;
      var art = document.getElementById(id);
      if (art) art.classList.toggle("done", on);
      var b = main.querySelector('.donebtn[data-lesson="' + id + '"]');
      if (b) { b.setAttribute("aria-pressed", on); b.textContent = on ? "✓ Đã học" : "Đánh dấu đã học"; }
      var a = toc.querySelector('a[data-goto="' + id + '"]');
      if (a) a.classList.toggle("done", on);
    });
    if (guide) paintGroup("guide", guide.lessons);
    D.domains.forEach(function (d) { paintGroup(d.id, d.lessons); });
    document.getElementById("bar-prog").style.width = (allLessons.length ? n / allLessons.length * 100 : 0) + "%";
    document.getElementById("bar-count").textContent = n + "/" + allLessons.length + " bài";
  }
  main.addEventListener("click", function (e) {
    var b = e.target.closest(".donebtn");
    if (!b) return;
    var id = b.dataset.lesson;
    if (done[id]) delete done[id]; else done[id] = true;
    C.store.set(D.storageKey, done);
    refresh();
    renderPlan();
  });
  refresh();
})();
