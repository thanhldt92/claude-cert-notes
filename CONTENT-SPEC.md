# Đặc tả file nội dung (`<cert>/data.js`)

Mỗi chứng chỉ có một file `data.js` gán đúng một biến toàn cục. Trang `notes.html` và `exam.html`
trong cùng thư mục đọc biến này (không dùng fetch, nên mở bằng `file://` cũng chạy).

```js
window.CERT_DATA = {
  code: "CCAO-F",                       // mã chứng chỉ
  title: "Claude Certified Associate – Foundations",
  storageKey: "ccaof-notes-v1",         // khóa localStorage lưu bài đã học
  exam: { questions: 60, minutes: 120, passScaled: 720 },
  intro: `<p>…HTML giới thiệu ngắn về kỳ thi và cách dùng trang…</p>`,
  domains: [
    {
      id: "d1",                         // d1, d2, …
      name: "Prompting and Task Execution",   // giữ tên tiếng Anh như exam guide
      weight: 14,                       // % trong đề
      intro: `<p>…domain này hỏi gì, ranh giới với domain khác…</p>`,
      lessons: [
        {
          id: "l-1-1",                  // l-<domain>-<thứ tự>
          title: "Cấu trúc một prompt tốt",
          minutes: 10,                  // thời gian đọc ước tính
          html: `<p>…</p><h4>…</h4><ul>…</ul>`,   // thân bài, tiếng Việt
          keypoints: ["…", "…"],       // 3–5 ý phải nhớ
          sources: [{ t: "Prompt engineering overview", u: "https://platform.claude.com/docs/en/…" }]
        }
      ],
      cheat: [["Thuật ngữ / tình huống", "Nhớ gì"], …],   // 6–12 dòng
      quiz: [
        {
          q: "A team lead wants … Which approach is BEST?",   // tiếng Anh, kiểu đề thật
          options: ["…", "…", "…", "…"],   // 4 phương án; "Choose TWO" thì 5 phương án
          answer: 2,                    // chỉ số đúng; "Choose TWO" thì mảng [0, 3]
          explain: "…giải thích tiếng Việt: vì sao đúng, vì sao từng phương án sai…"
        }
      ]
    }
  ]
};
```

## Quy tắc viết

- Bài học viết **tiếng Việt**, giữ nguyên thuật ngữ tiếng Anh (prompt, context window, subagent…).
  Câu hỏi quiz viết **tiếng Anh** như đề thật; phần `explain` viết tiếng Việt.
- Viết mới hoàn toàn bằng lời của mình. Không chép đoạn văn hay câu hỏi từ tài liệu khác.
- HTML trong bài chỉ dùng: `p h4 ul ol li strong em code pre table thead tbody tr th td blockquote a`.
  Có thể dùng `<div class="tip">…</div>` (mẹo thi) và `<div class="warn">…</div>` (bẫy hay gặp).
- Nội dung nằm trong template literal: escape dấu backtick và `${`.
- Không bịa con số, giá, giới hạn. Không chắc thì viết "docs nói …" kèm nguồn, hoặc bỏ qua.
- Link `sources` chỉ trỏ tới trang chính thức của Anthropic (platform.claude.com, docs.claude.com,
  code.claude.com, support.claude.com, anthropic.com, modelcontextprotocol.io, anthropic.skilljar.com).
- Quiz: rải đều đáp án đúng giữa A/B/C/D; đáp án đúng không phải lúc nào cũng dài nhất;
  mỗi domain có ít nhất một câu "Choose TWO". Ưu tiên câu theo tình huống (scenario).
