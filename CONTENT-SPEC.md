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

## Ngân hàng câu hỏi thi thử (`bank`)

Mỗi domain có thể có thêm mảng `bank` cùng định dạng với `quiz`. Câu trong `quiz` hiện ở cuối domain trên trang bài học;
câu trong `bank` chỉ dùng cho đề thi thử. Đề thi thử bốc từ cả hai, theo tỉ trọng domain.

## Bài nền tảng (`l-N-0`)

Mỗi domain có thể có một bài mở đầu id `l-N-0`: dựng từ con số 0 những khái niệm cả domain dùng
(cái này là gì → gồm những phần nào → chạy thế nào), kết thúc bằng bảng "bài nào trong domain đụng vào phần nào".

## File soạn thêm (`<cert>/parts/*.js`)

Khi nhiều người soạn song song, mỗi người viết một file riêng trong `<cert>/parts/`, gọi đúng một lần:

```js
CERT_PART({
  lessons: { d1: [ { id: "l-1-0", title: "…", minutes: 12, html: `…`, keypoints: […], sources: […] } ] },
  bank:    { d1: [ { q: "…", options: […], answer: 0, explain: "…" } ] },
  cheat:   { d1: [ ["…", "…"] ] }      // tùy chọn: thêm dòng cheatsheet
});
```

Kiểm tra một file: `node tools/content.mjs check <cert> <cert>/parts/<file>.js`.
Gộp tất cả vào data.js: `node tools/content.mjs merge <cert>` (bài được sắp theo id).

## Độ chính xác (bắt buộc)

- Mỗi chi tiết kỹ thuật (tên tham số, giá trị, giới hạn, tên sự kiện, đường dẫn file, cờ CLI, tên model, giá, thời hạn)
  phải được đối chiếu với trang chính thức **trong lúc viết** (WebFetch), và trang đó nằm trong `sources` của bài.
- Không xác nhận được thì không viết. Không suy đoán, không "chắc là".
- Thông tin hay thay đổi ghi "docs hiện ghi … (tháng 11/2026)".
- Câu hỏi: đáp án đúng phải đúng theo docs chính thức; mỗi phương án sai phải sai rõ ràng (không có hai đáp án cùng bảo vệ được).
  `explain` nêu lý do cho từng phương án.
- Lời khuyên thiết kế (không phải fact trong docs) thì viết như lời khuyên, không gán cho docs.
