/* Notes page: renders window.CERT_DATA into lessons, cheatsheets and domain quizzes. */
(function () {
  "use strict";
  var D = window.CERT_DATA, C = window.CCN;
  if (!D) { document.getElementById("content").textContent = "Không tải được dữ liệu (data.js)."; return; }

  var esc = C.esc, el = C.el;
  // lesson number from its id (l-2-0 -> "2.0"), falling back to position
  function num(l, n, i) { var m = /^l-(\d+)-(\d+)$/.exec(l.id); return m ? m[1] + "." + m[2] : n + "." + (i + 1); }
  var done = C.store.get(D.storageKey, {}) || {};
  var allLessons = [];
  D.domains.forEach(function (d) { d.lessons.forEach(function (l) { allLessons.push(l.id); }); });

  document.title = "Ôn thi " + D.code;
  document.getElementById("bar-title").textContent = D.code + " · " + D.title;

  // ---------- content ----------
  var main = document.getElementById("content");
  var intro = el("section", { class: "intro", id: "top" });
  var totalMin = 0, totalQ = 0;
  D.domains.forEach(function (d) {
    totalQ += d.quiz.length;
    d.lessons.forEach(function (l) { totalMin += l.minutes || 0; });
  });
  intro.innerHTML =
    "<h1>" + esc(D.title) + "</h1>" +
    '<p class="hint">' + D.domains.length + " domain · " + allLessons.length + " bài · ~" + Math.round(totalMin / 60 * 10) / 10 +
    " giờ đọc · " + totalQ + ' câu quiz · <a href="exam.html">Thi thử có hẹn giờ →</a></p>' +
    (D.intro || "");
  main.appendChild(intro);

  D.domains.forEach(function (d, di) {
    var n = di + 1;
    var sec = el("section", { class: "domain", id: d.id });
    var mins = d.lessons.reduce(function (s, l) { return s + (l.minutes || 0); }, 0);
    sec.innerHTML =
      '<div class="dhead"><h2>Domain ' + n + " · " + esc(d.name) + "</h2>" +
      '<div class="sub"><span>' + d.weight + "% đề · " + d.lessons.length + " bài · ~" + mins + ' phút</span>' +
      '<span class="pbar"><i></i></span><span class="dcount"></span></div></div>' +
      '<div class="dintro">' + (d.intro || "") + "</div>";

    d.lessons.forEach(function (l, li) {
      var art = el("details", { class: "lesson", id: l.id });
      var srcs = (l.sources || []).map(function (s) {
        return '<a href="' + esc(s.u) + '" target="_blank" rel="noopener">' + esc(s.t || s.u) + "</a>";
      }).join(" · ");
      art.innerHTML =
        '<summary><span class="ts">' + num(l, n, li) + '</span><h3>' + esc(l.title) + '</h3><span class="min">' +
        (l.minutes || "?") + ' phút</span><span class="chev" aria-hidden="true">›</span></summary>' +
        '<div class="lbody">' + l.html +
        (l.keypoints && l.keypoints.length ? '<div class="keys"><b>Phải nhớ</b><ul>' +
          l.keypoints.map(function (k) { return "<li>" + esc(k) + "</li>"; }).join("") + "</ul></div>" : "") +
        (srcs ? '<p class="srcs">Nguồn: ' + srcs + "</p>" : "") +
        '<div class="lfoot"><button type="button" class="donebtn" data-lesson="' + esc(l.id) + '" aria-pressed="false">Đánh dấu đã học</button></div>' +
        "</div>";
      sec.appendChild(art);
    });

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
      d.quiz.forEach(function (q, qi) {
        qb.appendChild(C.renderQuestion(q, { num: (qi + 1) + ".", checkable: true }));
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
  D.domains.forEach(function (d, di) {
    var li = el("li", { "data-domain": d.id });
    li.innerHTML = '<a class="dn" href="#' + d.id + '">D' + (di + 1) + " · " + esc(d.name) + "<span>" + d.weight + "%</span></a>";
    var ul = el("ul");
    d.lessons.forEach(function (l, i) {
      ul.appendChild(el("li", null, '<a href="#' + esc(l.id) + '" data-goto="' + esc(l.id) + '"><span class="m"></span><span>' +
        num(l, di + 1, i) + " " + esc(l.title) + "</span></a>"));
    });
    if (d.cheat && d.cheat.length) ul.appendChild(el("li", { class: "extra" }, '<a href="#cheat-' + d.id + '"><span class="m" style="visibility:hidden"></span><span>Cheatsheet</span></a>'));
    if (d.quiz && d.quiz.length) ul.appendChild(el("li", { class: "extra" }, '<a href="#quiz-' + d.id + '"><span class="m" style="visibility:hidden"></span><span>Quiz</span></a>'));
    li.appendChild(ul);
    toc.appendChild(li);
  });

  function openLesson(id) {
    var art = document.getElementById(id);
    if (art && art.tagName === "DETAILS") art.open = true;
  }
  toc.addEventListener("click", function (e) {
    var a = e.target.closest("a[data-goto]");
    if (a) openLesson(a.dataset.goto);
    if (window.matchMedia("(max-width:860px)").matches) side.classList.remove("open");
  });
  if (location.hash) openLesson(location.hash.slice(1));

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

  var side = document.getElementById("side");
  document.getElementById("sidetoggle").addEventListener("click", function () { side.classList.toggle("open"); });

  // ---------- progress ----------
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
    D.domains.forEach(function (d) {
      var k = d.lessons.filter(function (l) { return done[l.id]; }).length;
      var sec = document.getElementById(d.id);
      sec.querySelector(".dhead .pbar i").style.width = (k / d.lessons.length * 100) + "%";
      sec.querySelector(".dcount").textContent = k + "/" + d.lessons.length;
    });
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
