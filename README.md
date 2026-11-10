# Ôn chứng chỉ Claude

Trang ôn thi các chứng chỉ Claude bằng tiếng Việt: bài học theo domain, cheatsheet, quiz cuối domain, đề thi thử có hẹn giờ, chế độ luyện tập và sổ câu sai.

- **Bài học**: theo domain của exam guide, mỗi domain có bài nền tảng, Tổng kết, cheatsheet và quiz. CCAR-F có thêm phần Chiến lược thi và nhãn task statement.
- **Thi thử** (`exam.html`): đề theo kịch bản như đề thật (CCAR-F: 4 kịch bản × 15 câu) hoặc theo tỉ trọng domain; chấm theo domain và kịch bản.
- **Luyện tập**: lọc theo domain / kịch bản, hiện đáp án ngay; luyện lại câu sai.
- **Sổ câu sai** (`wrong.html`): tự ghi mọi câu trả lời sai, thống kê domain / kịch bản / task statement hay sai; một câu rời sổ sau 2 lần đúng liên tiếp.

Xem trang: https://thanhldt92.github.io/claude-cert-notes/

## Cấu trúc

```
index.html            trang mục lục (thẻ cho từng chứng chỉ)
assets/site.css       giao diện chung (sáng / tối)
assets/common.js      lưu tiến độ, đổi theme, hiển thị câu hỏi
assets/notes.js       dựng trang bài học từ data.js
assets/exam.js        thi thử (theo kịch bản hoặc domain), luyện tập, luyện câu sai
assets/wrong.js       trang Sổ câu sai
ccar-f/ ccao-f/ ccdv-f/  mỗi chứng chỉ: data.js (nội dung) + notes.html + exam.html + wrong.html
CONTENT-SPEC.md       định dạng file data.js và quy tắc viết nội dung
tools/content.mjs     kiểm tra data.js, gộp file soạn thêm (parts/)
tools/review.mjs      in nội dung một domain, áp dụng file sửa (review/)
```

Toàn bộ là HTML/JS tĩnh, không cần build. Mở `index.html` trực tiếp bằng trình duyệt cũng chạy.

## Thêm hoặc sửa nội dung

Sửa `<chứng chỉ>/data.js` theo `CONTENT-SPEC.md`. Muốn thêm chứng chỉ mới: tạo thư mục mới,
chép `notes.html` + `exam.html` từ một thư mục có sẵn, viết `data.js`, rồi thêm một thẻ trong `index.html`.

Ngày thi đặt ở biến `EXAM_DATES` trong `index.html`.

## Lưu ý

Tài liệu tự soạn để ôn thi, không phải tài liệu chính thức của Anthropic.
Tiến độ học, lịch sử thi thử và Sổ câu sai chỉ lưu trong `localStorage` của trình duyệt đang dùng.
