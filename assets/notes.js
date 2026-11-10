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
  intro.innerHTML =
    "<h1>" + esc(D.title) + "</h1>" +
    '<p class="hint">' + D.domains.length + " domain · " + allLessons.length + " bài · ~" + Math.round(totalMin / 60 * 10) / 10 +
    " giờ đọc · " + totalQ + ' câu hỏi · <a href="exam.html">Thi thử và luyện tập →</a> · <a href="wrong.html">Sổ câu sai' +
    (wrongN ? " (" + wrongN + ")" : "") + "</a></p>" +
    (D.intro || "");
  main.appendChild(intro);

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
          num: (qi + 1) + ".", checkable: true, meta: C.relatedLinks(D, q, ""),
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
      ul.appendChild(el("li", null, '<a href="#' + esc(l.id) + '" data-goto="' + esc(l.id) + '"><span class="m"></span><span>' +
        num(l, n, i) + " " + esc(l.title) + "</span></a>"));
    });
    extras.forEach(function (x) {
      ul.appendChild(el("li", { class: "extra" }, '<a href="#' + x[0] + '"><span class="m" style="visibility:hidden"></span><span>' + x[1] + "</span></a>"));
    });
    li.appendChild(ul);
    toc.appendChild(li);
  }
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
  });
  refresh();
})();
