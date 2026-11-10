# Ôn chứng chỉ Claude

Trang ôn thi các chứng chỉ Claude bằng tiếng Việt: bài học theo domain, cheatsheet, quiz cuối domain và đề thi thử có hẹn giờ.

Xem trang: https://thanhldt92.github.io/claude-cert-notes/

## Cấu trúc

```
index.html            trang mục lục (thẻ cho từng chứng chỉ)
assets/site.css       giao diện chung (sáng / tối)
assets/common.js      lưu tiến độ, đổi theme, hiển thị câu hỏi
assets/notes.js       dựng trang bài học từ data.js
assets/exam.js        đề thi thử: bốc câu theo tỉ trọng domain, đếm giờ, chấm điểm
ccar-f/ ccao-f/ ccdv-f/  mỗi chứng chỉ: data.js (nội dung) + notes.html + exam.html
CONTENT-SPEC.md       định dạng file data.js và quy tắc viết nội dung
```

Toàn bộ là HTML/JS tĩnh, không cần build. Mở `index.html` trực tiếp bằng trình duyệt cũng chạy.

## Thêm hoặc sửa nội dung

Sửa `<chứng chỉ>/data.js` theo `CONTENT-SPEC.md`. Muốn thêm chứng chỉ mới: tạo thư mục mới,
chép `notes.html` + `exam.html` từ một thư mục có sẵn, viết `data.js`, rồi thêm một thẻ trong `index.html`.

Ngày thi đặt ở biến `EXAM_DATES` trong `index.html`.

## Lưu ý

Tài liệu tự soạn để ôn thi, không phải tài liệu chính thức của Anthropic.
Tiến độ học và lịch sử thi thử chỉ lưu trong `localStorage` của trình duyệt đang dùng.
