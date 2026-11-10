window.CERT_DATA = {
 "code": "CCAO-F",
 "title": "Claude Certified Associate – Foundations",
 "storageKey": "ccaof-notes-v1",
 "exam": {
  "questions": 60,
  "minutes": 120,
  "passScaled": 720
 },
 "intro": "<p><strong>CCAO-F</strong> là chứng chỉ nền tảng cho người dùng Claude trong công việc hằng ngày: viết prompt, kiểm tra output, chọn đúng tính năng và model, đưa Claude vào quy trình, cấu hình Project, dùng AI có trách nhiệm và xử lý khi kết quả kém. Đề không hỏi code hay API; đề hình dung bạn là một người làm văn phòng, vận hành, marketing, quản lý dự án… đang dùng các app Claude cho việc thật.</p>\n<h4>Thông tin đề</h4>\n<table>\n<thead><tr><th>Mục</th><th>Chi tiết</th></tr></thead>\n<tbody>\n<tr><td>Số câu</td><td>60 câu</td></tr>\n<tr><td>Thời gian</td><td>120 phút (trung bình 2 phút/câu)</td></tr>\n<tr><td>Điểm đậu</td><td>720 trên thang điểm quy đổi (scaled) 100–1.000</td></tr>\n<tr><td>Dạng câu hỏi</td><td>Multiple choice (một đáp án đúng) và multiple response (đề ghi rõ, ví dụ \"Choose TWO\")</td></tr>\n<tr><td>Tài liệu</td><td>Closed book: không được mở tài liệu</td></tr>\n</tbody>\n</table>\n<h4>Bảy domain và tỉ trọng</h4>\n<table>\n<thead><tr><th>Domain</th><th>Tỉ trọng</th></tr></thead>\n<tbody>\n<tr><td>D1 Prompting and Task Execution</td><td>14%</td></tr>\n<tr><td>D2 Output Evaluation and Validation</td><td>21%</td></tr>\n<tr><td>D3 Product and Model Selection</td><td>12%</td></tr>\n<tr><td>D4 Workflow Integration and Solution Design</td><td>16%</td></tr>\n<tr><td>D5 Configuration and Knowledge Management</td><td>12%</td></tr>\n<tr><td>D6 Governance, Risk, and Responsible Use</td><td>15%</td></tr>\n<tr><td>D7 Troubleshooting and Optimization</td><td>10%</td></tr>\n</tbody>\n</table>\n<p>D2 nặng nhất (khoảng 1/5 đề, tức chừng 12–13 câu), nên đừng học lướt phần kiểm tra output. D1 và D7 dễ lẫn nhau: D1 dạy cách viết prompt từ đầu, D7 hỏi cách tìm ra <em>vì sao</em> kết quả kém và sửa đúng chỗ. D3 và D5 cũng dễ lẫn: D3 hỏi <em>có nên</em> dùng Project hay không, D5 hỏi <em>cấu hình</em> Project thế nào.</p>\n<h4>Cách dùng trang này</h4>\n<ol>\n<li>Đọc từng domain theo thứ tự. Mỗi bài có phần \"phải nhớ\" ở cuối; bấm đánh dấu đã học để trang lưu tiến độ trên trình duyệt của bạn.</li>\n<li>Ôn nhanh bằng bảng cheat của mỗi domain trước ngày thi.</li>\n<li>Làm 6 câu quiz cuối mỗi domain. Câu hỏi viết bằng tiếng Anh như đề thật; đọc kỹ phần giải thích, kể cả lý do các phương án sai.</li>\n<li>Khi đã học hết, làm bài thi thử để luyện nhịp 2 phút/câu.</li>\n</ol>\n<div class=\"tip\">Khẩu vị chung của đáp án đúng trong đề này: bắt đầu bằng cách đơn giản nhất đủ dùng; đưa thêm bối cảnh trước khi đổi công cụ; kiểm với nguồn nằm ngoài Claude; giữ con người chịu trách nhiệm ở các quyết định quan trọng; chỉ chia sẻ dữ liệu tối thiểu, qua công cụ được tổ chức duyệt. Phương án \"cấm hẳn AI\" hoặc \"tin hẳn AI\" thường là bẫy.</div>\n<div class=\"warn\">Tên sản phẩm, gói và con số giới hạn của Claude thay đổi nhanh. Đề chấm theo từ vựng của exam guide (ví dụ Haiku, Sonnet, Opus, Projects, Research, artifacts). Trang này ưu tiên khái niệm ổn định; con số nào được nêu đều kèm link trang chính thức để bạn tự kiểm lại.</div>",
 "domains": [
  {
   "id": "d1",
   "name": "Prompting and Task Execution",
   "weight": 14,
   "intro": "<p>Domain này hỏi bạn có biết <strong>giao việc cho Claude</strong> hay không: một prompt tốt gồm những phần nào, khi nào nên chia việc lớn thành nhiều bước, sửa prompt theo vòng lặp ra sao, và đổi cách hỏi thế nào cho từng loại việc (phân tích, research, soạn thảo, brainstorm).</p><p>Ranh giới: D1 không hỏi chọn tính năng hay model (đó là D3), không hỏi cấu hình Project (D5). Khi câu hỏi mô tả một output kém và hỏi <em>nguyên nhân</em>, đó thường là D7; khi hỏi <em>nên viết prompt thế nào ngay từ đầu</em>, đó là D1.</p>",
   "lessons": [
    {
     "id": "l-1-0",
     "title": "Nền tảng D1: prompt là gì, Claude đọc nó ra sao, và một lần giao việc gồm những bước nào",
     "minutes": 12,
     "html": "<p>Mọi bài trong Domain 1 đều xoay quanh một thứ: <strong>prompt</strong>. Bài này dựng nó từ đầu: prompt là gì, Claude thấy được gì khi đọc nó, vì sao cách viết đổi được chất lượng output, và một lần giao việc trọn vẹn đi qua những bước nào. Các bài sau đi sâu vào từng bước.</p>\n<h4>Prompt là toàn bộ những gì Claude nhận được để làm việc</h4>\n<p>Trong app Claude, prompt không chỉ là câu bạn vừa gõ. Khi Claude trả lời, nó đọc cùng lúc:</p>\n<ul>\n<li><strong>Tin nhắn hiện tại</strong> và các tin nhắn trước đó trong cùng cuộc trò chuyện.</li>\n<li><strong>File bạn đính kèm</strong> vào chat đó.</li>\n<li><strong>Chỉ dẫn đặt sẵn</strong>: Instructions for Claude (áp cho mọi cuộc chat của bạn) và project instructions cùng project knowledge nếu bạn đang ở trong một Project. Phần này là chuyện cấu hình của D5; ở D1 chỉ cần biết nó cũng là một phần prompt.</li>\n<li><strong>Kết quả công cụ</strong>: trang web tìm được, dữ liệu lấy qua connector.</li><li><strong>Memory và chat cũ</strong> (nếu bật): những gì Claude đã ghi nhớ từ các cuộc chat trước, hoặc nội dung chat cũ Claude tìm lại khi bạn yêu cầu.</li>\n</ul>\n<p>Ngoài những thứ đó, Claude không biết gì về bạn, công ty, khách hàng hay mục đích của bạn. Help center của Anthropic khuyên hình dung Claude như một người làm hợp đồng vừa được thuê, chưa có chút bối cảnh nào về bạn, công việc hay tổ chức của bạn, và vì thế cần chỉ dẫn thật cụ thể.</p>\n<h4>Vì sao cách viết đổi được chất lượng</h4>\n<p>Mô tả khóa \"Prompting &amp; Task Execution\" trong lộ trình ôn Associate mở đầu bằng nhận xét: cùng một yêu cầu, diễn đạt khác nhau thì Claude cho ra chất lượng khác nhau. Lý do dễ hiểu: Claude tạo câu trả lời bằng cách dự đoán phần chữ tiếp theo hợp lý nhất với những gì nó thấy (khóa AI Capabilities and Limitations có hẳn một bài \"Next Token Prediction\"). Khi prompt bỏ trống người đọc, mục đích, độ dài, Claude lấp chỗ trống bằng lựa chọn phổ biến nhất, và kết quả là một văn bản trôi chảy nhưng chung chung. Mỗi thông tin bạn thêm vào là một chỗ Claude không phải đoán.</p>\n<h4>Bộ phận của một prompt</h4>\n<table>\n<thead><tr><th>Phần</th><th>Trả lời câu hỏi</th></tr></thead>\n<tbody>\n<tr><td>Nhiệm vụ</td><td>Làm gì, sản phẩm cuối là gì?</td></tr>\n<tr><td>Bối cảnh và lý do</td><td>Vì sao cần, phục vụ mục tiêu nào?</td></tr>\n<tr><td>Người đọc</td><td>Ai dùng kết quả, họ đã biết gì?</td></tr>\n<tr><td>Nguồn</td><td>Dựa trên tài liệu, số liệu nào?</td></tr>\n<tr><td>Ví dụ</td><td>Output tốt trông như thế nào?</td></tr>\n<tr><td>Định dạng và ràng buộc</td><td>Dài bao nhiêu, cấu trúc ra sao, điều gì không làm?</td></tr>\n<tr><td>Tiêu chí thành công</td><td>Thế nào là xong và đạt?</td></tr>\n</tbody>\n</table>\n<p>Không phải việc nào cũng cần đủ bảy phần. Một câu hỏi tra cứu nhanh chỉ cần nhiệm vụ; một email gửi khách cần gần như tất cả. Phép thử của docs: đưa prompt cho một đồng nghiệp không biết gì về việc này; chỗ nào họ phải hỏi lại là chỗ Claude sẽ phải đoán.</p>\n<h4>Vài thuật ngữ sẽ gặp</h4>\n<ul>\n<li><strong>Few-shot / multishot</strong>: đưa vài ví dụ mẫu trong prompt. Docs gợi ý 3–5 ví dụ sát việc thật và đủ khác nhau.</li>\n<li><strong>Thẻ XML</strong>: bọc từng loại nội dung (chỉ dẫn, tài liệu, ví dụ) trong thẻ như <code>&lt;instructions&gt;</code>, <code>&lt;context&gt;</code> để Claude không lẫn lời dặn với dữ liệu.</li>\n<li><strong>Vai (role)</strong>: một câu giao vai, ví dụ \"bạn là biên tập viên của bản tin nội bộ\", giúp định hướng giọng và cách làm.</li>\n<li><strong>Prompt chaining</strong>: chia việc thành chuỗi bước, kết quả bước trước làm đầu vào bước sau.</li>\n<li><strong>Description</strong>: tên năng lực trong khung AI Fluency 4D ứng với việc viết prompt; gồm Product, Process và Performance Description. Mô tả khóa Prompting gọi Description là xương sống của cả khóa.</li>\n</ul>\n<h4>Một lần giao việc đi qua năm bước</h4>\n<ol>\n<li><strong>Định nghĩa việc</strong>: kết quả cuối là gì, ai dùng, dùng để làm gì, và đây thuộc loại việc nào (phân tích, research, soạn thảo, brainstorm).</li>\n<li><strong>Viết prompt</strong> với các phần cần thiết ở trên.</li>\n<li><strong>Chia bước</strong> nếu việc gồm nhiều loại việc hoặc cần kiểm kết quả giữa chừng.</li>\n<li><strong>Đọc output theo tiêu chí</strong> đã đặt ở bước 1 (cách kiểm chi tiết thuộc D2).</li>\n<li><strong>Lặp có chẩn đoán</strong>: gọi tên chỗ chưa đạt, tìm phần prompt gây ra, sửa một chỗ rồi chạy lại.</li>\n</ol>\n<h4>Bài nào trong Domain 1 đụng vào phần nào</h4>\n<table>\n<thead><tr><th>Bài</th><th>Nội dung chính</th><th>Bước</th></tr></thead>\n<tbody>\n<tr><td>l-1-0 (bài này)</td><td>Prompt là gì, Claude thấy gì, bảy phần, năm bước</td><td>Toàn cảnh</td></tr>\n<tr><td>l-1-1 Cấu trúc một prompt tốt</td><td>Viết từng phần: bối cảnh, lý do, người đọc, nguồn, ví dụ, định dạng; phép thử đồng nghiệp; khung Description</td><td>Bước 2</td></tr>\n<tr><td>l-1-2 Chia việc lớn thành chuỗi bước</td><td>Prompt chaining, khi nào chia, chuyển gì sang bước sau, điểm kiểm</td><td>Bước 3</td></tr>\n<tr><td>l-1-3 Lặp prompt và đổi chiến lược</td><td>Vòng lặp bốn bước, phản hồi cụ thể, sửa tiếp hay làm lại, bảng chiến lược tóm tắt</td><td>Bước 5 (và 1)</td></tr>\n<tr><td>l-1-4 Chiến lược theo loại việc (đi sâu)</td><td>Khung prompt riêng cho phân tích, research, soạn thảo, brainstorm; nhận ra loại việc; việc trộn nhiều loại</td><td>Bước 1–2</td></tr>\n</tbody>\n</table>\n<div class=\"tip\">Câu hỏi D1 thường mô tả một prompt ngắn cho ra output chung chung, rồi hỏi cách cải thiện. Hãy dò xem prompt thiếu phần nào trong bảy phần; phương án bổ sung đúng phần thiếu thường là đáp án.</div>\n<div class=\"warn\">Prompt dài chưa chắc là prompt tốt. Mỗi câu trong prompt nên trả lời một câu hỏi mà người mới sẽ hỏi; câu trang trí, lặp lại hoặc mâu thuẫn chỉ thêm nhiễu.</div>",
     "keypoints": [
      "Prompt trong app gồm tin nhắn, lịch sử chat, file, chỉ dẫn đặt sẵn, kết quả công cụ và memory (nếu bật); ngoài đó Claude không biết gì về bạn.",
      "Help center: coi Claude như người làm hợp đồng mới thuê, chưa có bối cảnh, nên cần chỉ dẫn rất cụ thể.",
      "Thiếu thông tin thì Claude lấp bằng lựa chọn phổ biến nhất, nên output trôi chảy mà chung chung.",
      "Bảy phần: nhiệm vụ, bối cảnh và lý do, người đọc, nguồn, ví dụ, định dạng và ràng buộc, tiêu chí thành công.",
      "Năm bước: định nghĩa việc → viết prompt → chia bước nếu cần → đọc theo tiêu chí → lặp có chẩn đoán."
     ],
     "sources": [
      {
       "t": "Introduction to prompt design (Help Center)",
       "u": "https://support.claude.com/en/articles/7996853-introduction-to-prompt-design"
      },
      {
       "t": "Prompting best practices",
       "u": "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices"
      },
      {
       "t": "Prompting & Task Execution (Claude Associate path)",
       "u": "https://anthropic-partners.skilljar.com/path/claude-associate/prompting-task-execution"
      },
      {
       "t": "AI Capabilities and Limitations",
       "u": "https://anthropic.skilljar.com/ai-capabilities-and-limitations"
      },
      {
       "t": "AI Fluency: Key Terminology Cheat Sheet (PDF)",
       "u": "https://www-cdn.anthropic.com/4396730ed190e691a3712cf2fd6bfe35509deca2.pdf"
      }
     ]
    },
    {
     "id": "l-1-1",
     "title": "Cấu trúc một prompt tốt: viết cho người chưa biết gì về việc của bạn",
     "minutes": 11,
     "html": "<p>Claude chỉ biết những gì nằm trong cuộc trò chuyện: tin nhắn của bạn, file bạn đưa, chỉ dẫn của Project (nếu có), kết quả của công cụ, và memory từ các chat trước nếu bạn bật tính năng này. Claude không biết công ty bạn bán gì, sếp bạn thích văn phong ra sao, hay báo cáo này sẽ được đọc trong cuộc họp nào. Tài liệu của Anthropic gợi ý hình dung Claude như một <strong>nhân viên rất giỏi nhưng mới vào</strong>, chưa nắm quy ước và cách làm của nhóm. Mọi thứ người mới cần để làm đúng, bạn phải nói ra.</p>\n<h4>Phép thử đồng nghiệp</h4>\n<p>Trước khi gửi, hãy tưởng tượng đưa đúng đoạn prompt đó cho một đồng nghiệp không biết gì về việc này. Nếu họ phải hỏi lại \"cho ai đọc?\", \"dài bao nhiêu?\", \"dựa trên số liệu nào?\", thì Claude cũng thiếu đúng những thông tin đó, chỉ khác là Claude sẽ tự đoán thay vì hỏi.</p>\n<h4>Các phần nên có</h4>\n<ul>\n<li><strong>Nhiệm vụ</strong>: một câu nói rõ việc cần làm và sản phẩm cuối cùng là gì.</li>\n<li><strong>Bối cảnh và lý do</strong>: vì sao cần việc này, nó phục vụ mục tiêu nào. Khi biết lý do, Claude xử lý được cả những tình huống bạn chưa dặn. Ví dụ docs đưa ra: thay vì chỉ cấm dấu ba chấm, hãy nói \"văn bản sẽ được đọc bằng giọng máy, nên đừng dùng dấu ba chấm\"; docs nói Claude tổng quát hóa được từ lời giải thích này, nên nó có thể tự tránh cả những thứ khác mà giọng máy khó đọc dù bạn chưa dặn.</li>\n<li><strong>Người đọc</strong>: ban giám đốc, khách hàng mới, đội kỹ thuật… Người đọc quyết định độ sâu, thuật ngữ và giọng văn.</li>\n<li><strong>Nguồn dữ liệu</strong>: dán hoặc đính kèm tài liệu thật, và tách nó khỏi lời dặn bằng tiêu đề hoặc thẻ kiểu <code>&lt;tai_lieu&gt;…&lt;/tai_lieu&gt;</code>. Với tài liệu dài, docs khuyên đặt tài liệu ở trên và câu hỏi ở cuối.</li>\n<li><strong>Ví dụ</strong>: một hai mẫu output mong muốn thường rõ hơn cả đoạn mô tả dài. Docs gợi ý ví dụ nên sát việc thật và đủ đa dạng để Claude không bắt chước máy móc một mẫu duy nhất.</li>\n<li><strong>Định dạng và ràng buộc</strong>: độ dài, cấu trúc (bảng, gạch đầu dòng, email), những gì không được làm. Nói điều bạn muốn có thay vì chỉ liệt kê điều cấm.</li>\n<li><strong>Tiêu chí thành công</strong>: thế nào là \"xong và tốt\". Phần này còn giúp bạn chấm output ở bước sau (D2).</li>\n</ul>\n<h4>Ví dụ trước và sau</h4>\n<p><em>Trước:</em> \"Viết email thông báo tăng giá.\"</p>\n<p><em>Sau:</em> \"Soạn email gửi khách hàng doanh nghiệp đang dùng gói dịch vụ bảo trì, thông báo giá tăng 8% từ quý sau. Lý do thật: chi phí linh kiện tăng; chúng tôi muốn giữ khách nên giọng cần thẳng thắn, tôn trọng, không xin lỗi quá mức. Người đọc là trưởng phòng mua hàng, bận, đọc trên điện thoại. Dưới 150 chữ, có một câu nêu rõ ngày áp dụng và một câu mời liên hệ quản lý tài khoản. Dưới đây là email năm ngoái làm mẫu giọng văn: …\"</p>\n<p>Bản sau không dài vì màu mè; mỗi câu đều trả lời một câu hỏi mà người mới sẽ hỏi.</p>\n<h4>Ba thứ cần mô tả theo khung AI Fluency</h4>\n<p>Khung 4D của Anthropic gọi kỹ năng này là <strong>Description</strong>, gồm ba phần: <strong>Product Description</strong> (sản phẩm cần ra: nội dung, định dạng, người đọc, phong cách), <strong>Process Description</strong> (Claude nên tiếp cận việc thế nào, ví dụ đọc hết tài liệu rồi mới tóm tắt) và <strong>Performance Description</strong> (Claude nên cư xử thế nào khi làm cùng bạn, ví dụ ngắn gọn hay chi tiết, phản biện hay hỗ trợ).</p>\n<div class=\"tip\">Khi đề hỏi \"cách tốt nhất để cải thiện kết quả\" mà prompt trong tình huống thiếu bối cảnh, người đọc hoặc định dạng, đáp án đúng gần như luôn là bổ sung những thứ đó. Các phương án \"đổi sang model mạnh hơn\" hay \"hỏi lại nhiều lần\" là bẫy khi gốc rễ là prompt mơ hồ.</div>\n<div class=\"warn\">Viết in hoa \"QUAN TRỌNG\" hay lặp lại một lời dặn không thay được việc nói lý do. Docs ghi các model mới được huấn luyện để làm theo chỉ dẫn rất sát, và lời lẽ gay gắt kiểu \"CRITICAL: You MUST…\" có thể khiến Claude áp dụng lời dặn cả ở chỗ không cần; docs khuyên viết lại bằng giọng bình thường.</div>",
     "keypoints": [
      "Claude chỉ biết những gì có trong cuộc trò chuyện: phải nói rõ bối cảnh, người đọc, nguồn và mục tiêu.",
      "Nói lý do giúp Claude xử lý đúng cả những trường hợp chưa được dặn.",
      "Tách nguồn dữ liệu khỏi lời dặn; tài liệu dài đặt trên, câu hỏi đặt cuối.",
      "Ví dụ cụ thể thường hiệu quả hơn mô tả dài; nêu định dạng và tiêu chí thành công.",
      "Description trong khung 4D gồm Product, Process và Performance Description."
     ],
     "sources": [
      {
       "t": "Prompting best practices",
       "u": "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices"
      },
      {
       "t": "Introduction to prompt design",
       "u": "https://support.claude.com/en/articles/7996853-introduction-to-prompt-design"
      },
      {
       "t": "AI Fluency: Framework & Foundations",
       "u": "https://anthropic.skilljar.com/ai-fluency-framework-foundations"
      },
      {
       "t": "AI Fluency: Key Terminology Cheat Sheet (PDF)",
       "u": "https://www-cdn.anthropic.com/4396730ed190e691a3712cf2fd6bfe35509deca2.pdf"
      }
     ]
    },
    {
     "id": "l-1-2",
     "title": "Chia việc lớn thành chuỗi bước có điểm kiểm",
     "minutes": 10,
     "html": "<p>Một yêu cầu như \"đọc 300 phản hồi khảo sát, tìm vấn đề chính, rồi viết báo cáo cho ban lãnh đạo kèm đề xuất\" thực ra là bốn năm việc khác nhau gộp lại. Nhồi tất cả vào một prompt thường cho ra kết quả trông ổn nhưng có bước bị làm qua loa, và khi sai bạn không biết sai ở đâu. Kỹ thuật chia việc thành các bước nối tiếp, kết quả bước trước làm đầu vào bước sau, được docs gọi là <strong>prompt chaining</strong>. Trong app chat, điều này đơn giản là làm thành nhiều lượt có chủ đích.</p>\n<h4>Khi nào nên chia</h4>\n<ul>\n<li>Yêu cầu gồm nhiều <strong>loại việc</strong> khác nhau: tìm thông tin, phân tích, rồi viết.</li>\n<li>Bạn cần <strong>kiểm kết quả trung gian</strong> trước khi đi tiếp (ví dụ danh sách chủ đề phải đúng trước khi viết báo cáo dựa trên nó).</li>\n<li>Output cuối rất dài hoặc có nhiều phần cần chất lượng đồng đều.</li>\n<li>Bạn muốn một vòng tự rà soát: docs mô tả mẫu phổ biến là <em>soạn nháp → rà theo tiêu chí → sửa</em>.</li>\n</ul>\n<p>Ngược lại, việc ngắn và liền mạch (viết một đoạn giới thiệu, dịch một email) không cần chia; chia nhỏ chỉ làm chậm.</p>\n<h4>Một chuỗi mẫu</h4>\n<ol>\n<li><strong>Phân loại</strong>: \"Đọc các phản hồi đính kèm, đề xuất tối đa 8 nhóm chủ đề, mỗi nhóm một dòng định nghĩa.\" Bạn xem lại, gộp hoặc đổi tên nhóm nếu cần.</li>\n<li><strong>Gán và đếm</strong>: \"Dùng đúng 8 nhóm đã chốt ở trên, gán từng phản hồi vào một nhóm, trả về bảng đếm.\" Bạn kiểm ngẫu nhiên vài dòng.</li>\n<li><strong>Trích dẫn</strong>: \"Với 3 nhóm lớn nhất, chọn 2 câu trích nguyên văn tiêu biểu.\"</li>\n<li><strong>Viết</strong>: \"Dựa trên bảng đếm và trích dẫn ở trên, viết bản tóm tắt một trang cho ban lãnh đạo, kết thúc bằng 3 đề xuất.\"</li>\n</ol>\n<p>Mỗi bước có một mục tiêu duy nhất, nêu rõ dùng kết quả nào của bước trước, và có một <strong>điểm kiểm</strong> do người thực hiện. Lỗi ở bước 1 (nhóm chủ đề sai) được bắt ngay, không lan sang bản báo cáo.</p>\n<h4>Chuyển gì sang bước kế tiếp</h4>\n<p>Hãy chuyển cho bước sau phần kết quả <em>đã được bạn duyệt</em>, không phải toàn bộ đoạn chat lộn xộn trước đó. Nếu bạn sửa danh sách chủ đề bằng tay, dán bản đã sửa vào prompt bước sau và nói rõ \"dùng đúng danh sách này\". Khi chuỗi dài, bạn có thể mở chat mới cho bước sau và chỉ mang theo kết quả cần thiết (xem thêm bài về context ở D3).</p>\n<h4>Chia bước khác với vi quản lý suy luận</h4>\n<p>Chia việc ở đây là chia <em>quy trình làm việc</em>. Còn việc Claude suy nghĩ bên trong một bước thì docs hiện nay ghi nhận: với các model mới có adaptive thinking, một chỉ dẫn chung như \"hãy cân nhắc kỹ trước khi trả lời\" thường hiệu quả hơn tự viết sẵn từng bước suy luận. Bạn kiểm soát đầu vào, đầu ra và điểm kiểm; không cần đọc chính tả từng ý nghĩ.</p>\n<div class=\"tip\">Trong đề, nếu tình huống mô tả một yêu cầu nhiều phần cho kết quả \"bỏ sót\" hoặc \"nông\", đáp án tốt thường là tách thành các bước tuần tự, kiểm kết quả trung gian, thay vì viết thêm lời dặn vào cùng một prompt khổng lồ.</div>\n<div class=\"warn\">Đừng để Claude tự chuyển bước khi kết quả trung gian chưa được kiểm. Một danh sách chủ đề sai ở bước đầu sẽ được bước sau \"viết rất hay\" thành một báo cáo sai.</div>",
     "keypoints": [
      "Prompt chaining: chia việc thành bước nối tiếp, kết quả đã kiểm của bước trước là đầu vào bước sau.",
      "Nên chia khi có nhiều loại việc, cần kiểm kết quả trung gian, hoặc output dài.",
      "Mẫu phổ biến: soạn nháp → rà theo tiêu chí → sửa.",
      "Việc ngắn, liền mạch thì giữ một prompt.",
      "Chia quy trình, không cần viết sẵn từng bước suy nghĩ cho model mới."
     ],
     "sources": [
      {
       "t": "Prompting best practices (chaining, thinking)",
       "u": "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices"
      },
      {
       "t": "Usage limit best practices (plan first)",
       "u": "https://support.claude.com/en/articles/9797557-usage-limit-best-practices"
      }
     ]
    },
    {
     "id": "l-1-3",
     "title": "Lặp prompt và đổi chiến lược theo loại việc",
     "minutes": 12,
     "html": "<p>Prompt đầu tiên hiếm khi hoàn hảo. Khác biệt giữa người dùng giỏi và người dùng bình thường nằm ở cách họ <strong>lặp</strong>: có tiêu chí, có chẩn đoán, mỗi lần sửa một chỗ. Mục tiêu của khóa Prompting & Task Execution gọi đây là lặp prompt \"có chẩn đoán\" (iterate prompts diagnostically).</p>\n<h4>Vòng lặp bốn bước</h4>\n<ol>\n<li><strong>Chốt tiêu chí</strong>: viết ra output tốt phải có gì (đủ 5 mục, dưới 200 chữ, giọng thân thiện, số liệu khớp nguồn). Không có tiêu chí thì \"chưa ưng\" chỉ là cảm giác.</li>\n<li><strong>Đọc output và gọi tên vấn đề</strong>: chung chung? sai giọng? thiếu mục? sai khuôn?</li>\n<li><strong>Tìm phần prompt gây ra</strong>: output chung chung thường do thiếu bối cảnh hoặc người đọc; sai giọng do thiếu ví dụ; sai khuôn do không nêu định dạng; bịa chi tiết do không đưa nguồn hoặc không cho phép nói \"không biết\".</li>\n<li><strong>Thay đổi một yếu tố, rồi chạy lại</strong>: nếu sửa ba thứ cùng lúc, bạn không biết thứ nào có tác dụng. Với prompt sẽ dùng lại nhiều lần, thử trên vài đầu vào khác nhau trước khi chia sẻ.</li>\n</ol>\n<h4>Phản hồi cụ thể, không phải \"làm tốt hơn\"</h4>\n<p>\"Viết lại hay hơn\" cho Claude rất ít thông tin. So sánh với: \"Đoạn hai quá kỹ thuật cho người đọc là bộ phận bán hàng; bỏ thuật ngữ, thay bằng một ví dụ khách hàng cụ thể, giữ nguyên độ dài.\" Phản hồi tốt nói <em>chỗ nào</em>, <em>sai so với tiêu chí nào</em>, và <em>muốn thay bằng gì</em>.</p>\n<h4>Sửa tiếp hay làm lại</h4>\n<p>Nếu hướng đi sai từ gốc (hiểu nhầm nhiệm vụ), chồng thêm năm tin nhắn sửa thường kém hơn sửa lại prompt ban đầu, hoặc mở chat mới với prompt đã hoàn thiện. Những hiểu nhầm cũ vẫn nằm trong cuộc trò chuyện và tiếp tục kéo kết quả lệch đi.</p>\n<h4>Chiến lược theo loại việc</h4>\n<table>\n<thead><tr><th>Loại việc</th><th>Lỗi thường gặp</th><th>Nên làm trong prompt</th></tr></thead>\n<tbody>\n<tr><td>Phân tích</td><td>Kết luận chắc nịch từ dữ liệu không đủ</td><td>Đưa dữ liệu thật; yêu cầu nêu giả định; cho phép trả lời \"không đủ dữ liệu để kết luận\"; yêu cầu chỉ ra số liệu dẫn tới mỗi nhận định.</td></tr>\n<tr><td>Research</td><td>Lan man, nguồn không rõ</td><td>Phạm vi rõ (câu hỏi, khu vực, khoảng thời gian); loại nguồn ưu tiên; yêu cầu trích dẫn để bạn kiểm.</td></tr>\n<tr><td>Soạn thảo</td><td>Giọng chung chung, dữ kiện bịa</td><td>Người đọc, mục đích, mẫu giọng văn, dữ kiện thật cần dùng, độ dài.</td></tr>\n<tr><td>Brainstorm</td><td>Ít ý, ý an toàn và giống nhau</td><td>Đòi số lượng và độ đa dạng, tạm chưa lọc; chấm và lọc ở bước sau theo tiêu chí riêng.</td></tr>\n</tbody>\n</table>\n<p>Yêu cầu thực tế thường trộn nhiều loại: \"tìm hiểu đối thủ rồi đề xuất ba chiến dịch\". Hãy tách thành research (có phạm vi, có nguồn) rồi brainstorm (nhiều ý) rồi phân tích chọn lọc (có tiêu chí), đúng như bài chia bước.</p>\n<div class=\"tip\">Với việc phân tích và hỏi đáp trên tài liệu, docs của Anthropic nói việc cho phép Claude thừa nhận \"không biết\" có thể giảm mạnh thông tin sai. Đây là đáp án hay xuất hiện khi tình huống mô tả Claude \"tự tin trả lời dù dữ liệu không có\".</div>\n<div class=\"warn\">Brainstorm và đánh giá là hai chế độ khác nhau. Yêu cầu \"đưa 20 ý tưởng khả thi nhất\" cùng lúc vừa sinh vừa lọc, thường cho ra ít ý mới. Tách thành hai bước.</div>",
     "keypoints": [
      "Lặp có chẩn đoán: chốt tiêu chí, gọi tên vấn đề, tìm phần prompt gây ra, thay đổi một yếu tố.",
      "Phản hồi phải nói chỗ nào, sai theo tiêu chí nào, muốn thay bằng gì.",
      "Hướng sai từ gốc: sửa prompt ban đầu hoặc mở chat mới thay vì chồng sửa.",
      "Phân tích: cho phép nói không đủ dữ liệu. Research: phạm vi và nguồn. Soạn thảo: người đọc và mẫu. Brainstorm: nhiều ý đa dạng trước, lọc sau.",
      "Prompt dùng lại nhiều lần phải thử trên nhiều đầu vào."
     ],
     "sources": [
      {
       "t": "Prompting best practices",
       "u": "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices"
      },
      {
       "t": "Reduce hallucinations",
       "u": "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations"
      },
      {
       "t": "Prompting & Task Execution (Claude Associate path)",
       "u": "https://anthropic-partners.skilljar.com/path/claude-associate/prompting-task-execution"
      }
     ]
    },
    {
     "id": "l-1-4",
     "title": "Chiến lược theo loại việc: khung prompt cho phân tích, research, soạn thảo và brainstorm",
     "minutes": 12,
     "html": "<p>Bài l-1-3 đã có bảng tóm tắt bốn loại việc. Bài này đi sâu hơn: mỗi loại việc cần Claude làm một kiểu khác nhau, nên prompt phải nhấn vào những phần khác nhau. Nhận ra đúng loại việc trước khi viết là nửa chặng đường.</p>\n<h4>Nhận ra loại việc</h4>\n<table>\n<thead><tr><th>Loại</th><th>Câu hỏi gốc</th><th>Output thường là</th></tr></thead>\n<tbody>\n<tr><td>Phân tích</td><td>Dữ liệu này nói lên điều gì?</td><td>Nhận định có căn cứ, so sánh, kết luận</td></tr>\n<tr><td>Research</td><td>Bên ngoài đang có thông tin gì về việc này?</td><td>Tổng hợp nhiều nguồn, có trích dẫn</td></tr>\n<tr><td>Soạn thảo</td><td>Viết cái này cho người kia đọc thế nào?</td><td>Email, báo cáo, bài đăng, tài liệu</td></tr>\n<tr><td>Brainstorm</td><td>Có những khả năng nào?</td><td>Danh sách ý tưởng đa dạng, chưa lọc</td></tr>\n</tbody>\n</table>\n<h4>Phân tích: khóa vào dữ liệu, cho phép nói \"không đủ\"</h4>\n<p>Rủi ro lớn nhất là kết luận nghe hợp lý nhưng không dựa trên dữ liệu bạn đưa. Prompt nên có:</p>\n<ul>\n<li>Dữ liệu thật, đặt ở đầu prompt; câu hỏi đặt cuối. Docs ghi với tài liệu dài, để câu hỏi ở cuối có thể cải thiện chất lượng tới 30% trong thử nghiệm.</li>\n<li>Câu hỏi cụ thể: \"Kênh nào có chi phí trên mỗi khách hàng mới tăng nhanh nhất trong quý 3, và vì sao?\" thay vì \"phân tích số liệu này\".</li>\n<li>Lời cho phép: \"Nếu dữ liệu không đủ để kết luận, hãy nói rõ thiếu gì.\" Docs về giảm hallucination nói cho phép Claude thừa nhận không chắc có thể giảm mạnh thông tin sai.</li>\n<li>Yêu cầu chỉ ra số liệu hoặc đoạn trích dẫn tới từng nhận định, để bạn kiểm được.</li>\n</ul>\n<h4>Research: phạm vi, tiêu chí thành công, nguồn</h4>\n<p>Phần research trong docs prompting khuyên ba điều: nêu rõ thế nào là một câu trả lời thành công, khuyến khích Claude kiểm thông tin qua nhiều nguồn, và với việc phức tạp thì làm có cấu trúc: dựng vài giả thuyết cạnh tranh và theo dõi mức độ tin cậy. Áp vào công việc:</p>\n<ul>\n<li><strong>Phạm vi</strong>: câu hỏi chính, khu vực, khoảng thời gian, loại nguồn ưu tiên (văn bản của cơ quan quản lý, báo cáo của doanh nghiệp…).</li>\n<li><strong>Tiêu chí</strong>: \"Thành công là một bảng so sánh 5 nhà cung cấp theo giá, hỗ trợ tiếng Việt, chứng chỉ bảo mật; ô nào không tìm được nguồn thì ghi 'không rõ'.\"</li>\n<li><strong>Đánh dấu độ chắc</strong>: yêu cầu tách điều có nguồn rõ với điều suy luận.</li>\n</ul>\n<p>Chọn công cụ (web search hay Research) là chuyện của D3; ở đây, dù dùng công cụ nào, prompt vẫn quyết định Claude tìm gì và trình bày ra sao.</p>\n<h4>Soạn thảo: người đọc, mẫu và dữ kiện thật</h4>\n<ul>\n<li><strong>Người đọc và mục đích</strong>: người đọc cần làm gì sau khi đọc (duyệt ngân sách, đăng ký, trả lời)?</li>\n<li><strong>Mẫu</strong>: docs coi ví dụ là một trong những cách đáng tin nhất để định hướng định dạng, giọng và cấu trúc. Dán một bản bạn ưng làm mẫu giọng.</li>\n<li><strong>Dữ kiện</strong>: đưa sẵn con số, ngày, tên. Thiếu dữ kiện, Claude có thể điền chi tiết nghe hợp lý mà sai.</li>\n<li><strong>Nói điều muốn có</strong>: docs khuyên nói Claude nên làm gì thay vì chỉ nói không được làm gì, ví dụ \"viết thành các đoạn văn liền mạch\" thay vì \"đừng dùng gạch đầu dòng\".</li>\n</ul>\n<h4>Brainstorm: rộng trước, lọc sau</h4>\n<p>Đây là lời khuyên thực hành hơn là quy định của docs: tách việc sinh ý và việc chấm ý thành hai bước. Ở bước sinh ý, xin số lượng cụ thể và độ đa dạng có chủ đích (\"12 ý, chia đều cho ba hướng: giảm giá, nội dung, đối tác\"), tạm thời chưa yêu cầu khả thi. Ở bước sau, đưa tiêu chí (ngân sách, thời gian, nhân lực) và nhờ Claude chấm từng ý. Bạn cũng có thể dùng Performance Description: \"hãy phản biện thẳng ý của tôi thay vì đồng ý\".</p>\n<h4>Việc trộn nhiều loại</h4>\n<p>\"Tìm hiểu ba đối thủ rồi viết đề xuất chiến dịch cho sếp\" là research → brainstorm → phân tích chọn lọc → soạn thảo. Mỗi chặng có khung prompt riêng; nối chúng bằng cách chia bước (l-1-2) và kiểm kết quả trung gian trước khi sang chặng sau.</p>\n<h4>Dấu hiệu dùng sai chiến lược</h4>\n<table>\n<thead><tr><th>Triệu chứng</th><th>Thường do</th></tr></thead>\n<tbody>\n<tr><td>Phân tích có kết luận mà không chỉ ra số nào dẫn tới</td><td>Dùng prompt kiểu soạn thảo cho việc phân tích</td></tr>\n<tr><td>Research toàn ý chung, không nguồn</td><td>Thiếu phạm vi và tiêu chí, hoặc không yêu cầu trích dẫn</td></tr>\n<tr><td>Bản nháp đúng ý nhưng sai giọng</td><td>Thiếu người đọc và mẫu</td></tr>\n<tr><td>Brainstorm ra năm ý an toàn giống nhau</td><td>Vừa sinh vừa lọc trong một yêu cầu</td></tr>\n</tbody>\n</table>\n<div class=\"tip\">Đề hay cho một tình huống rồi hỏi \"điều chỉnh prompt thế nào cho loại việc này\". Từ khóa giúp nhận ra loại việc: \"dữ liệu, xu hướng, nguyên nhân\" → phân tích; \"thị trường, quy định, tổng quan, nguồn\" → research; \"email, thông báo, người đọc\" → soạn thảo; \"ý tưởng, phương án, tên gọi\" → brainstorm.</div>\n<div class=\"warn\">Đừng áp nguyên một mẫu prompt cho mọi việc. Lời dặn \"ngắn gọn, chỉ đưa phương án tốt nhất\" giúp ích cho một email, nhưng làm hỏng một buổi brainstorm.</div>",
     "keypoints": [
      "Nhận ra loại việc trước: phân tích, research, soạn thảo, brainstorm cần nhấn vào các phần prompt khác nhau.",
      "Phân tích: dữ liệu ở đầu, câu hỏi cụ thể ở cuối, cho phép nói không đủ dữ liệu, chỉ ra căn cứ từng nhận định.",
      "Research: phạm vi, tiêu chí thành công, kiểm qua nhiều nguồn, tách điều có nguồn với điều suy luận.",
      "Soạn thảo: người đọc và mục đích, mẫu giọng, dữ kiện thật; nói điều muốn có thay vì chỉ điều cấm.",
      "Brainstorm: sinh rộng có chủ đích rồi mới chấm theo tiêu chí ở bước sau; việc trộn nhiều loại thì chia chặng."
     ],
     "sources": [
      {
       "t": "Prompting best practices",
       "u": "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices"
      },
      {
       "t": "Reduce hallucinations",
       "u": "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations"
      },
      {
       "t": "Prompting & Task Execution (Claude Associate path)",
       "u": "https://anthropic-partners.skilljar.com/path/claude-associate/prompting-task-execution"
      }
     ]
    }
   ],
   "cheat": [
    [
     "Hình dung Claude thế nào",
     "Nhân viên giỏi nhưng mới vào: không biết bối cảnh, quy ước, người đọc của bạn"
    ],
    [
     "Phép thử đồng nghiệp",
     "Người không biết gì đọc prompt mà phải hỏi lại → Claude cũng thiếu thông tin đó"
    ],
    [
     "Thành phần prompt",
     "Nhiệm vụ, bối cảnh + lý do, người đọc, nguồn, ví dụ, định dạng/ràng buộc, tiêu chí thành công"
    ],
    [
     "Nói lý do",
     "Giúp Claude tổng quát đúng cho trường hợp chưa dặn (ví dụ: đọc bằng giọng máy → tránh dấu ba chấm)"
    ],
    [
     "Tài liệu dài",
     "Đặt tài liệu ở trên, câu hỏi ở cuối; tách bằng tiêu đề hoặc thẻ"
    ],
    [
     "Description (4D)",
     "Product (sản phẩm), Process (cách làm), Performance (cách cư xử khi cộng tác)"
    ],
    [
     "Prompt chaining",
     "Bước nối tiếp, mỗi bước một mục tiêu, kiểm kết quả trung gian trước khi đi tiếp"
    ],
    [
     "Khi nào giữ một prompt",
     "Việc ngắn, liền mạch, không cần kiểm giữa chừng"
    ],
    [
     "Lặp prompt",
     "Tiêu chí trước → chẩn đoán → sửa MỘT chỗ → thử lại trên nhiều đầu vào"
    ],
    [
     "Phân tích / Research",
     "Cho phép nói 'không đủ dữ liệu' / nêu phạm vi, nguồn ưu tiên, đòi trích dẫn"
    ],
    [
     "Soạn thảo / Brainstorm",
     "Người đọc + mẫu giọng + dữ kiện thật / yêu cầu nhiều ý khác nhau, lọc ở bước sau"
    ],
    [
     "Prompt trong app gồm gì",
     "Tin nhắn + lịch sử chat + file + chỉ dẫn đặt sẵn (Instructions for Claude, Project) + kết quả công cụ + memory/chat cũ (nếu bật)"
    ],
    [
     "Help center: hình dung Claude",
     "Người làm hợp đồng mới thuê, chưa có bối cảnh → chỉ dẫn thật cụ thể"
    ],
    [
     "Research prompt (docs)",
     "Tiêu chí thành công rõ, kiểm qua nhiều nguồn, việc phức tạp thì giả thuyết cạnh tranh + mức tin cậy"
    ],
    [
     "Brainstorm vs chọn lọc",
     "Hai bước: sinh rộng có chủ đích (số lượng, hướng) → chấm theo tiêu chí"
    ]
   ],
   "quiz": [
    {
     "q": "A marketing coordinator asks Claude: 'Write a product announcement.' The result is generic and does not mention the features her team cares about. What is the BEST next step?",
     "options": [
      "Switch to the most capable model available and resend the same request, since stronger models infer missing details better",
      "Add the audience, key features, purpose, and length to the prompt, plus a past announcement as a style example",
      "Ask Claude to 'make it more specific' several times until the result improves",
      "Ask Claude to generate ten versions and pick the one that sounds best"
     ],
     "answer": 1,
     "explain": "Gốc rễ là prompt thiếu bối cảnh: Claude không biết người đọc, tính năng nào quan trọng, mục đích hay giọng văn. Bổ sung các phần đó (kèm ví dụ mẫu) là cách sửa đúng. Đổi model mạnh hơn không thêm được thông tin mà Claude không có. 'Cụ thể hơn' lặp lại không nói cụ thể theo hướng nào. Sinh 10 bản chỉ cho 10 bản chung chung."
    },
    {
     "q": "An operations analyst sends one long prompt asking Claude to read 400 support tickets, group them into themes, count each theme, pick representative quotes, and write an executive summary with recommendations. The summary reads well, but several themes are clearly mislabeled. What should the analyst do to make this task more reliable?",
     "options": [
      "Add the word IMPORTANT before each instruction in the single prompt",
      "Ask for a shorter executive summary so Claude can spend more of its attention on labeling the tickets correctly",
      "Remove the recommendations so the prompt has fewer requirements",
      "Split the work into sequential steps and review the theme list before counting and summarizing"
     ],
     "answer": 3,
     "explain": "Đây là việc nhiều phần cần kiểm kết quả trung gian: danh sách chủ đề sai thì mọi bước sau đều sai. Chia thành chuỗi bước có điểm kiểm (prompt chaining) cho phép bắt lỗi ở bước phân loại. Viết in hoa không giải quyết cấu trúc. Rút gọn bản tóm tắt hay bỏ đề xuất không sửa được việc gán nhãn sai."
    },
    {
     "q": "A project manager wants Claude to answer questions using only an attached 60-page vendor contract. In early tests, Claude sometimes states terms that are not in the contract. Which TWO prompt changes are MOST likely to reduce this? (Choose TWO.)",
     "options": [
      "Tell Claude it may say it cannot find the answer in the contract when the text does not support one",
      "Ask Claude to answer in a more confident, authoritative tone",
      "Put the question before the contract text so Claude sees it first",
      "Ask Claude to first quote the exact contract passages relevant to the question, then answer based only on those quotes",
      "Ask Claude to add any useful terms that are common in similar contracts"
     ],
     "answer": [
      0,
      3
     ],
     "explain": "Docs của Anthropic về giảm hallucination nêu hai kỹ thuật này: cho phép Claude thừa nhận không tìm thấy, và yêu cầu trích nguyên văn đoạn liên quan rồi mới trả lời dựa trên đó. Giọng tự tin hơn không làm nội dung đúng hơn. Docs khuyên với tài liệu dài nên đặt tài liệu ở trên, câu hỏi ở cuối, nên đặt câu hỏi lên trước là ngược. Thêm 'điều khoản thường gặp' chính là mời Claude đưa nội dung ngoài hợp đồng vào."
    },
    {
     "q": "A team lead asks Claude for 'the 5 best ideas' for a team offsite and keeps getting the same safe suggestions (escape room, cooking class). What is the MOST effective change?",
     "options": [
      "Ask for a broad, unfiltered list of 25 ideas first, then evaluate them against budget, size, and goals in a separate step",
      "Ask Claude to be more creative in the same prompt",
      "Switch to a faster model so she can regenerate more often",
      "Provide the list of ideas the team rejected last year, ask Claude to avoid them, and request five ideas more unusual than those"
     ],
     "answer": 0,
     "explain": "Brainstorm và đánh giá là hai chế độ khác nhau; đòi '5 ý tốt nhất' ngay từ đầu khiến Claude vừa sinh vừa lọc nên chỉ ra ý an toàn. Tách thành bước sinh nhiều ý đa dạng rồi bước lọc theo tiêu chí là chiến lược đúng cho brainstorm. 'Sáng tạo hơn' quá mơ hồ. Model nhanh hơn không đổi chiến lược. Danh sách loại trừ có ích một phần nhưng không giải quyết việc thiếu độ rộng."
    },
    {
     "q": "After three rounds of feedback, a sales manager's proposal draft is still off. Reviewing the chat, he realizes Claude misunderstood the client's industry in the very first message and each revision built on that mistake. What is the BEST approach?",
     "options": [
      "Continue sending corrections in the same chat until the draft is right",
      "Ask Claude to apologize and confirm it understands the industry now",
      "Revise the original prompt with the correct industry context and needed details, then start fresh from that improved prompt",
      "Switch the response style to Formal and regenerate"
     ],
     "answer": 2,
     "explain": "Khi hướng đi sai từ gốc, hiểu nhầm ban đầu vẫn nằm trong cuộc trò chuyện và tiếp tục kéo các bản sửa lệch đi. Sửa prompt gốc (hoặc mở chat mới với prompt đã hoàn thiện) hiệu quả hơn chồng thêm phản hồi. Lời xin lỗi không thay đổi context. Đổi style chỉ đổi giọng, không sửa hiểu nhầm về ngành."
    },
    {
     "q": "An HR specialist built a prompt that turns interview notes into structured candidate summaries. It worked well on the first set of notes. She plans to share it with ten recruiters. What should she do FIRST?",
     "options": [
      "Share it immediately, since it already produced a good result",
      "Test the prompt on several different sets of notes, including messy and incomplete ones, and check the outputs against her criteria",
      "Add detailed instructions covering every edge case she can think of, then share it right away so the recruiters benefit from the extra guidance",
      "Ask Claude whether the prompt is good enough to share"
     ],
     "answer": 1,
     "explain": "Một lần chạy tốt chưa chứng minh prompt ổn định. Prompt sẽ dùng lại nhiều lần phải được thử trên nhiều đầu vào khác nhau (kể cả đầu vào xấu) và chấm theo tiêu chí trước khi chia sẻ. Chia sẻ ngay là rủi ro. Thêm thật nhiều chỉ dẫn mà chưa thử là đoán mò. Hỏi Claude tự đánh giá không thay được việc thử trên dữ liệu thật."
    }
   ],
   "bank": [
    {
     "q": "Before sending Claude a request to draft a vendor onboarding checklist, an operations coordinator wants a quick way to judge whether her prompt is clear enough. Which check is MOST useful?",
     "options": [
      "Ask Claude to rate the prompt from 1 to 10 and send it unchanged if the score is 7 or higher, since Claude knows best what information it needs",
      "Imagine handing the exact prompt to a colleague who knows nothing about the task and ask whether they could do it without follow-up questions",
      "Add the word 'detailed' so Claude knows to fill in any gaps itself",
      "Count the words and keep the prompt under three sentences, since shorter prompts are always easier for Claude to follow and produce more focused output than longer ones"
     ],
     "answer": 1,
     "explain": "Docs của Anthropic gợi ý 'phép thử đồng nghiệp': đưa prompt cho một người ít bối cảnh về việc này; nếu họ bối rối thì Claude cũng vậy. Prompt ngắn không đồng nghĩa với rõ, nhiều việc cần bối cảnh dài hơn. Để Claude tự chấm điểm prompt không cho biết prompt có đủ thông tin về việc thật của bạn hay không. Thêm chữ 'detailed' chỉ khiến Claude tự đoán phần còn thiếu, đúng thứ cần tránh."
    },
    {
     "q": "A facilities manager asks Claude for safety notices that will appear on small digital screens in elevators. Her prompt says only 'Keep it short.' The drafts are still too long and use long words that wrap awkwardly. Which revision is MOST likely to fix this?",
     "options": [
      "Ask Claude to write five versions and choose the shortest one each time",
      "Remove the instruction entirely and trim each notice by hand afterward",
      "Repeat 'KEEP IT SHORT' in capital letters at the start and end of the prompt",
      "Explain why: 'These appear on a small elevator screen that fits about 40 characters per line, so use short lines and short words'"
     ],
     "answer": 3,
     "explain": "Docs khuyên nêu lý do đằng sau chỉ dẫn (ví dụ trong docs: văn bản sẽ được đọc bằng giọng máy nên đừng dùng dấu ba chấm). Khi biết mục đích, Claude tự suy ra cách làm phù hợp, kể cả chi tiết chưa được dặn. Viết in hoa và lặp lại không thêm thông tin nào. Sinh năm bản rồi chọn bản ngắn nhất tốn công mà không sửa gốc rễ. Bỏ chỉ dẫn rồi tự cắt tay là bỏ cuộc thay vì mô tả đúng yêu cầu."
    },
    {
     "q": "A retail merchandiser gives Claude one sample product description and asks for 30 more in the same style. Every new description copies the sample's sentence structure and even reuses its phrase about 'cozy autumn evenings,' including for swimwear. What is the BEST fix?",
     "options": [
      "Ask for each of the 30 descriptions to be a single sentence to reduce copying",
      "Tell Claude never to reuse any word from the sample, and include the same sample a second time so Claude studies it more closely before writing",
      "Provide three to five varied examples across different product types and state which qualities should stay consistent",
      "Delete the example entirely and describe the desired style with a single adjective, such as 'cozy' or 'premium,' instead"
     ],
     "answer": 2,
     "explain": "Docs khuyên ví dụ nên sát việc thật và đa dạng để Claude không bắt chước những mẫu không mong muốn; 3–5 ví dụ thường cho kết quả tốt, kèm lời nói rõ điều gì cần giữ nhất quán. Bỏ ví dụ, chỉ còn một tính từ, làm mất thông tin về giọng văn. Cấm dùng lại từ và đưa thêm chính mẫu đó vẫn chỉ cho Claude đúng một mẫu để bắt chước. Rút xuống một câu làm hỏng yêu cầu ban đầu mà không xử lý gốc rễ."
    },
    {
     "q": "A program manager pastes three things into one message: last week's meeting notes, the official project charter, and her request for a status update. Claude treats a brainstorm idea from the meeting notes as an approved scope item from the charter. What prompt change BEST prevents this?",
     "options": [
      "Put each source in a clearly labeled section or tag, such as <meeting_notes> and <charter>, and say which one defines scope",
      "Ask Claude to use its best judgment about which document matters most",
      "Send the notes and the charter in two separate chats and merge the answers yourself",
      "Shorten the meeting notes to a single line"
     ],
     "answer": 0,
     "explain": "Docs khuyên dùng thẻ hoặc tiêu đề để tách rõ chỉ dẫn, bối cảnh và từng tài liệu đầu vào. Kết hợp với lời nói rõ tài liệu nào quyết định phạm vi, Claude sẽ không nhầm ý tưởng trong buổi họp thành phạm vi đã duyệt. Tách ra hai chat khiến không cuộc chat nào có đủ cả hai nguồn và đẩy việc ghép về cho bạn. Rút ghi chú họp xuống một dòng làm mất thông tin cần cho báo cáo. 'Tự phán đoán' chính là để Claude đoán, nguyên nhân của lỗi."
    },
    {
     "q": "A policy analyst types a detailed question first and then pastes a 90-page regulatory report below it. The answers miss relevant sections near the end of the report. Based on Anthropic's prompting guidance, which change is MOST likely to help?",
     "options": [
      "Paste only the report's table of contents instead of the full text, and ask Claude to infer what each section says from its title",
      "Turn the question into ten one-word keywords placed above the report",
      "Place the report at the top of the message and put the question and instructions after it",
      "Send the question again in a follow-up message without the report"
     ],
     "answer": 2,
     "explain": "Docs hướng dẫn: với tài liệu dài, đặt tài liệu ở đầu prompt, phía trên câu hỏi, chỉ dẫn và ví dụ; cách này cải thiện chất lượng trên mọi model. Biến câu hỏi thành từ khóa làm mất ý nghĩa của yêu cầu. Chỉ đưa mục lục buộc Claude đoán nội dung, dễ dẫn tới bịa. Gửi lại câu hỏi mà không kèm báo cáo không giúp Claude đọc báo cáo kỹ hơn."
    },
    {
     "q": "A communications lead's prompt says: 'Don't be stiff, don't use jargon, don't write long paragraphs.' The newsletter draft still feels flat and unclear. Which rewrite of the instruction is BEST?",
     "options": [
      "'Write it however you think is best.'",
      "'Write in a warm, conversational tone for front-line staff, use everyday words, and keep paragraphs to two or three sentences'",
      "'Avoid stiffness, jargon, long paragraphs, passive voice, clichés, filler words, and anything at all that sounds corporate, robotic, or overly formal'",
      "'Don't be stiff. Really, do NOT be stiff. Avoid jargon at all costs, and NEVER write long paragraphs under any circumstances.'"
     ],
     "answer": 1,
     "explain": "Docs khuyên nói điều bạn muốn Claude làm thay vì chỉ liệt kê điều cấm. Câu viết lại mô tả cụ thể giọng văn, người đọc, cách dùng từ và độ dài đoạn. Lặp lại lệnh cấm bằng chữ in hoa không cho Claude biết đích đến. 'Viết sao cũng được' bỏ hết tiêu chí. Danh sách cấm dài hơn vẫn chỉ là cấm; Claude vẫn phải đoán bạn muốn giọng văn như thế nào."
    },
    {
     "q": "A nonprofit director wants a donor letter written as flowing paragraphs. Her prompt is a dense outline of nested bullet points and headings, and Claude's letter comes back as bullet points with headings. What is the MOST effective adjustment?",
     "options": [
      "Add more nested bullet levels so Claude understands the structure better",
      "Accept the bullet points and rewrite them into paragraphs by hand each time she needs a new donor letter for a campaign",
      "Ask for the letter as a table so the content is easier to scan",
      "Ask explicitly for prose paragraphs and write the request itself in plain prose rather than bullets"
     ],
     "answer": 3,
     "explain": "Docs ghi nhận định dạng của prompt có thể ảnh hưởng tới định dạng câu trả lời; nói rõ muốn văn xuôi và viết prompt theo đúng phong cách mong muốn là cách điều chỉnh hiệu quả. Thêm cấp gạch đầu dòng càng kéo output về dạng gạch đầu dòng. Bảng không phải là một lá thư gửi nhà tài trợ. Tự chuyển tay mỗi lần là bỏ qua cách sửa ngay từ prompt."
    },
    {
     "q": "A curriculum designer tells Claude: 'When I share lesson plans, point out weaknesses and push back on my assumptions instead of just agreeing.' In the AI Fluency framework, which part of Description does this instruction represent?",
     "options": [
      "Performance Description",
      "Process Description",
      "Product Description",
      "Performance Discernment"
     ],
     "answer": 0,
     "explain": "Trong khung 4D, Performance Description mô tả cách AI cư xử khi cộng tác với bạn, ví dụ ngắn gọn hay chi tiết, phản biện hay hỗ trợ; yêu cầu Claude phản biện thay vì đồng ý thuộc nhóm này. Product Description mô tả sản phẩm đầu ra (nội dung, định dạng, người đọc, phong cách). Process Description mô tả cách Claude tiếp cận nhiệm vụ, ví dụ trình tự các bước. Performance Discernment là đánh giá cách AI đã cư xử (thuộc Discernment), không phải lời mô tả bạn đưa cho Claude trước."
    },
    {
     "q": "A market researcher's prompt clearly specifies the deliverable, a two-page brief for sales managers, but Claude keeps jumping to conclusions without reviewing all five interview transcripts first. What should she add to her prompt?",
     "options": [
      "A request to use a more enthusiastic tone",
      "A process description, such as 'Read all five transcripts, list recurring themes with transcript references, then draft the brief'",
      "A note asking Claude to finish faster",
      "A longer product description that restates the two-page length, the sales-manager audience, and the purpose of the brief in much more detail"
     ],
     "answer": 1,
     "explain": "Vấn đề nằm ở cách Claude tiếp cận việc (bỏ qua bước đọc hết tài liệu), nên cần Process Description: nêu trình tự đọc toàn bộ, liệt kê chủ đề kèm nguồn rồi mới viết. Nhắc lại mô tả sản phẩm không đổi cách làm, vì sản phẩm vốn đã được mô tả rõ. Giọng nhiệt tình là chuyện văn phong. Yêu cầu làm nhanh hơn đi ngược mục tiêu đọc kỹ."
    },
    {
     "q": "A store operations manager pastes two months of sales figures and asks Claude why sales dropped. Claude confidently cites bad weather, a competitor opening, and staffing problems, none of which appear in the data. How should she revise the prompt?",
     "options": [
      "Ask Claude to base conclusions only on the provided data, show which figures support each point, and say when the data is insufficient",
      "Tell Claude to sound more certain so the summary is persuasive to leadership",
      "Remove the sales figures so Claude relies on general retail knowledge",
      "Ask for a longer list of possible causes drawn from general retail trends"
     ],
     "answer": 0,
     "explain": "Với việc phân tích, prompt nên giới hạn nguồn vào dữ liệu được cung cấp, yêu cầu chỉ ra số liệu dẫn tới mỗi nhận định, và cho phép trả lời 'không đủ dữ liệu'; docs nói cho phép Claude thừa nhận không chắc có thể giảm mạnh thông tin sai. Xin thêm nguyên nhân từ xu hướng chung càng trộn thêm thứ không có trong dữ liệu. Giọng chắc chắn hơn không làm kết luận đúng hơn. Bỏ dữ liệu khiến câu trả lời hoàn toàn là suy đoán."
    },
    {
     "q": "An HR business partner asks Claude to 'research remote work trends.' The result is broad, mixes regions and years, and is hard to verify. Which revised request is BEST?",
     "options": [
      "Ask for an answer twice as long so that more trends are covered",
      "Ask Claude to include only the trends it feels fully confident about, without citing any sources",
      "Specify the question, region, and time period, name preferred source types, and ask for citations for each finding",
      "Ask the same question again in a new chat and keep whichever version sounds more authoritative"
     ],
     "answer": 2,
     "explain": "Research hiệu quả cần phạm vi rõ (câu hỏi, khu vực, khoảng thời gian), loại nguồn ưu tiên và trích dẫn để kiểm. Dài gấp đôi chỉ thêm nội dung lan man. 'Chỉ đưa thứ tự tin' mà không có trích dẫn thì không kiểm được; độ tự tin của Claude không phải bằng chứng. Chọn bản 'nghe uy tín hơn' là chấm theo giọng văn, không theo nguồn."
    },
    {
     "q": "A PR specialist asks Claude for a press release about a new partnership. The draft includes a quote attributed to the partner's CEO that nobody provided. What is the BEST way to prevent this in future drafting prompts?",
     "options": [
      "Ask Claude to make any invented quotes sound more realistic and closer to how executives typically talk in press releases",
      "Remove quotes from all press releases permanently",
      "Keep the quote if it matches the CEO's usual public speaking style, since Claude has probably seen many of that executive's past interviews",
      "Supply the approved facts and quotes, and tell Claude to leave a marked placeholder wherever a quote or fact is missing"
     ],
     "answer": 3,
     "explain": "Với việc soạn thảo, đưa dữ kiện thật và trích dẫn đã duyệt, đồng thời dặn để chỗ trống có đánh dấu khi thiếu thông tin, giúp Claude không tự điền. Làm trích dẫn bịa 'thật hơn' là làm lỗi nguy hiểm hơn. Bỏ hẳn trích dẫn là quá tay, vì thông cáo báo chí thường cần chúng. Giọng giống phong cách CEO không chứng minh CEO đã nói câu đó; gán cho người thật lời họ không nói là rủi ro nghiêm trọng."
    },
    {
     "q": "After reviewing a training handout Claude drafted, a learning and development specialist wants to request changes. Which follow-up message is MOST likely to produce the revision she needs?",
     "options": [
      "'Please try again, and this time make the handout more professional, more engaging, and better suited to our company's culture overall.'",
      "'Thanks, this is a good start, but it doesn't feel right to me yet, so please revise the whole handout and improve it wherever you think it needs work'",
      "'Section 2 is too technical for warehouse staff; replace the jargon with one real loading-dock example and keep the length the same'",
      "'This isn't quite right. Make it better.'"
     ],
     "answer": 2,
     "explain": "Phản hồi tốt nói chỗ nào, sai so với tiêu chí nào (quá kỹ thuật với người đọc là nhân viên kho) và muốn thay bằng gì. 'Làm tốt hơn', hay một lời cảm ơn dài kèm 'sửa chỗ nào bạn thấy cần', đều không cho Claude biết vấn đề nằm ở đâu. 'Chuyên nghiệp hơn' mơ hồ và còn có thể đi ngược nhu cầu dễ hiểu."
    },
    {
     "q": "Which of the following tasks is LEAST likely to benefit from being split into a chain of separate prompts with review checkpoints?",
     "options": [
      "Researching three markets, comparing them, and recommending one for expansion",
      "Drafting a 30-page proposal, reviewing it against an RFP checklist, and revising it",
      "Turning 500 survey responses into themes, counts, and a leadership report",
      "Translating a short, friendly email to a supplier into Spanish"
     ],
     "answer": 3,
     "explain": "Chia bước có lợi khi việc gồm nhiều loại công đoạn, cần kiểm kết quả trung gian hoặc output dài. Dịch một email ngắn là việc liền mạch, chia nhỏ chỉ làm chậm. Ba việc còn lại đều nhiều giai đoạn: phân loại khảo sát cần chốt chủ đề trước khi đếm; research, so sánh và đề xuất là ba loại việc khác nhau; đề xuất dài khớp mẫu 'soạn nháp → rà theo tiêu chí → sửa' mà docs mô tả."
    },
    {
     "q": "In step one of a chained workflow, Claude proposed eight complaint categories. A customer experience lead merged two of them and renamed another by hand. What should her step-two prompt, which assigns each complaint to a category, include?",
     "options": [
      "A request for Claude to propose a fresh set of categories before assigning complaints",
      "The edited list of seven categories pasted in full, with an instruction to use exactly these categories",
      "The original eight categories, since Claude generated them and will apply them more consistently than a list that was edited by hand",
      "A reference to 'the categories from earlier' so Claude can find them in the chat history"
     ],
     "answer": 1,
     "explain": "Bước sau nên nhận đúng kết quả đã được người duyệt; dán danh sách đã sửa và nói rõ 'chỉ dùng đúng danh sách này' tránh việc Claude quay về bản cũ. Nhắc 'danh mục ở trên' dễ khiến Claude lấy bản tám nhóm ban đầu, vì cả hai cùng nằm trong lịch sử chat. Xin bộ danh mục mới làm mất công duyệt ở bước một. Dùng lại tám nhóm gốc là bỏ qua quyết định của người duyệt."
    },
    {
     "q": "A people-operations manager's prompt reads: 'Write an onboarding guide for our support team.' Which TWO additions would MOST improve the result? (Choose TWO.)",
     "options": [
      "Ask for the guide to be as long as possible so nothing is left out",
      "Attach the current onboarding checklist and tool list, and tell Claude to build the guide from those materials",
      "Add 'THIS IS VERY IMPORTANT' at the beginning of the prompt",
      "State that readers are new support hires in their first week who do not yet know the product or the ticketing tools",
      "Ask Claude to be as creative as possible with the guide's structure"
     ],
     "answer": [
      1,
      3
     ],
     "explain": "Prompt gốc thiếu người đọc và nguồn dữ liệu. Nêu rõ người đọc (nhân viên mới tuần đầu, chưa biết sản phẩm) quyết định độ sâu và thuật ngữ; đưa checklist và danh sách công cụ thật giúp Claude viết đúng quy trình của công ty thay vì đoán. Chữ in hoa không thêm thông tin. 'Sáng tạo hết mức' không phải tiêu chí cho tài liệu hướng dẫn. 'Càng dài càng tốt' không thay được việc nói rõ cần gì."
    },
    {
     "q": "A team lead is refining a prompt that summarizes weekly project updates. Which TWO practices reflect diagnostic refinement? (Choose TWO.)",
     "options": [
      "Change the wording, examples, and format all at once to save time",
      "Write down what a good summary must contain before judging the output",
      "Identify which part of the prompt likely caused a problem before editing it",
      "Regenerate until one version looks acceptable, then move on",
      "Switch to a different model after every unsatisfying output"
     ],
     "answer": [
      1,
      2
     ],
     "explain": "Tinh chỉnh có chẩn đoán gồm chốt tiêu chí trước, để 'chưa ưng' có thước đo, và tìm phần prompt gây ra vấn đề trước khi sửa. Đổi nhiều thứ cùng lúc khiến không biết thay đổi nào có tác dụng. Bấm tạo lại tới khi trông được là may rủi, không học được gì cho lần sau. Đổi model sau mỗi lần không ưng bỏ qua khả năng gốc rễ nằm ở prompt."
    }
   ]
  },
  {
   "id": "d2",
   "name": "Output Evaluation and Validation",
   "weight": 21,
   "intro": "<p>Domain nặng nhất của đề. Câu hỏi xoay quanh việc <strong>đánh giá output trước khi dùng</strong>: đúng chưa, đủ chưa, có hallucination, mâu thuẫn hay bias không, fact-check bằng cách nào, khi nào bắt buộc phải có người duyệt, và chỉnh output cho đúng người đọc, đúng định dạng.</p><p>Ranh giới: chuyện dữ liệu nhạy cảm, quyền riêng tư và chính sách thuộc D6. Chuyện tìm nguyên nhân gốc của output kém lặp lại (prompt, knowledge, model…) thuộc D7. D2 tập trung vào kỹ năng <em>Discernment</em>: nhìn một output cụ thể và phán xét nó.</p>",
   "lessons": [
    {
     "id": "l-2-0",
     "title": "Nền tảng D2: vì sao output của Claude có thể sai, và \"kiểm\" thật sự là làm gì",
     "minutes": 13,
     "html": "<p>Domain 2 chiếm phần lớn nhất của đề. Sáu bài của domain cùng trả lời một câu: <strong>trước khi dùng một output của Claude, bạn kiểm cái gì, kiểm bằng gì, và khi nào phải nhờ người khác kiểm</strong>. Bài này dựng nền: output được tạo ra thế nào, nó có thể hỏng theo những kiểu nào, và \"kiểm\" nghĩa là gì.</p>\n<h4>Output được tạo ra thế nào</h4>\n<p>Khóa AI Capabilities and Limitations của Anthropic Academy chia các tính chất của model thành vài nhóm, trong đó có <strong>Next Token Prediction</strong>, <strong>Knowledge</strong>, <strong>Working Memory</strong> và <strong>Steerability</strong>. Dịch ra hệ quả thực tế:</p>\n<ul>\n<li><strong>Dự đoán chữ tiếp theo</strong>: Claude viết ra phần chữ hợp lý nhất với những gì nó thấy. Câu chữ vì thế luôn trôi chảy, kể cả khi nội dung sai. Độ trôi chảy không nói gì về độ đúng.</li>\n<li><strong>Kiến thức có mốc</strong>: kiến thức của model dừng ở một thời điểm. Docs hiện ghi mốc kiến thức đáng tin của các model mới nhất là tháng 6/2026 (tháng 11/2026). Sự kiện sau mốc đó Claude chỉ biết nếu bạn đưa vào hoặc nó tìm qua web search.</li>\n<li><strong>Bộ nhớ làm việc có hạn</strong>: Claude chỉ làm việc với những gì nằm trong context của cuộc chat; chat càng dài, càng nhiều tài liệu thì càng dễ sót chi tiết.</li>\n<li><strong>Điều khiển được nhưng không tuyệt đối</strong>: prompt định hướng được output, nhưng cùng một prompt chạy lại có thể cho kết quả khác nhau.</li>\n</ul>\n<p>Mục tiêu khóa này nêu: nhìn một output bất ngờ và nhận ra nó thuộc <em>kiểu</em> bất ngờ nào, rồi sửa đúng chỗ.</p>\n<h4>Các kiểu lỗi cần nhận ra</h4>\n<table>\n<thead><tr><th>Kiểu lỗi</th><th>Nhận diện</th><th>Bài đi sâu</th></tr></thead>\n<tbody>\n<tr><td>Sai hoặc bịa (hallucination)</td><td>Khẳng định nghe hợp lý, nói tự tin nhưng không đúng hoặc không có thật</td><td>l-2-2, l-2-4</td></tr>\n<tr><td>Thiếu</td><td>Đúng từng câu nhưng bỏ sót phần được yêu cầu</td><td>l-2-1</td></tr>\n<tr><td>Cũ</td><td>Đúng ở thời điểm trước, nay đã khác (giá, quy định, nhân sự)</td><td>l-2-4</td></tr>\n<tr><td>Mâu thuẫn</td><td>Hai chỗ trong output, hai lần chạy, hoặc output với tài liệu nguồn nói khác nhau</td><td>l-2-2</td></tr>\n<tr><td>Thiên lệch (bias)</td><td>Thiếu góc nhìn, giả định khuôn mẫu, ngôn ngữ thiên vị</td><td>l-2-2</td></tr>\n<tr><td>Sai người đọc hoặc sai định dạng</td><td>Nội dung đúng nhưng không dùng được ở nơi nhận</td><td>l-2-3, l-2-6</td></tr>\n</tbody>\n</table>\n<h4>\"Kiểm\" nghĩa là so với thứ nằm ngoài Claude</h4>\n<p>Kiểm một output là đặt nó cạnh một chuẩn độc lập: tài liệu gốc, hệ thống số liệu của công ty, văn bản chính thức, chuyên gia, hoặc chính yêu cầu ban đầu (để đo độ đủ). Hỏi lại Claude \"bạn có chắc không?\" không phải là kiểm, vì câu trả lời mới cũng sinh ra theo đúng cơ chế cũ. Docs về giảm hallucination cũng nói rõ: các kỹ thuật trong prompt <strong>giảm</strong> nhưng không <strong>loại bỏ</strong> hallucination, và thông tin quan trọng vẫn phải được kiểm, nhất là với quyết định hệ trọng.</p>\n<h4>Kiểm bao nhiêu là đủ: theo rủi ro</h4>\n<p>Không ai kiểm từng chữ của mọi output. Mức kiểm tăng theo hậu quả nếu sai:</p>\n<ul>\n<li><strong>Thấp</strong>: ghi chú cho riêng bạn, ý tưởng brainstorm. Đọc qua là đủ.</li>\n<li><strong>Vừa</strong>: tài liệu nội bộ, email cho đồng nghiệp. Kiểm số liệu, tên, ngày và các chỗ dễ sai.</li>\n<li><strong>Cao</strong>: nội dung đối ngoại, hợp đồng, số liệu tài chính, quyết định về con người. Đối chiếu từng khẳng định quan trọng và có người đủ chuyên môn duyệt.</li>\n</ul>\n<h4>Discernment: tên năng lực trong khung 4D</h4>\n<p>Khung AI Fluency gọi kỹ năng đánh giá output là <strong>Discernment</strong>, gồm Product Discernment (chất lượng sản phẩm), Process Discernment (cách Claude đi tới kết quả) và Performance Discernment (cách Claude cư xử khi làm cùng bạn). Discernment đi vòng với Description: phát hiện khi kiểm được đưa ngược lại thành prompt tốt hơn.</p>\n<h4>Bài nào trong Domain 2 đụng vào phần nào</h4>\n<table>\n<thead><tr><th>Bài</th><th>Nội dung chính</th><th>Câu hỏi nó trả lời</th></tr></thead>\n<tbody>\n<tr><td>l-2-0 (bài này)</td><td>Cơ chế tạo output, các kiểu lỗi, kiểm theo rủi ro</td><td>Vì sao phải kiểm?</td></tr>\n<tr><td>l-2-1 Đúng và đủ</td><td>Accuracy và completeness, chỗ ưu tiên kiểm, checklist lập sẵn, Discernment</td><td>Kiểm cái gì trước?</td></tr>\n<tr><td>l-2-2 Hallucination, mâu thuẫn, bias</td><td>Gọi tên lỗi, kỹ thuật phòng từ prompt, đối chiếu khi đã có output</td><td>Đây là lỗi gì?</td></tr>\n<tr><td>l-2-3 Người duyệt, người đọc, định dạng</td><td>Tín hiệu cần duyệt, bốn yếu tố chỉnh theo người đọc, bảng định dạng theo nơi nhận</td><td>Tổng quan ba việc cuối</td></tr>\n<tr><td>l-2-4 Fact-check từng khẳng định</td><td>Tách claim, chọn nguồn có thẩm quyền, rút lại khi không có căn cứ, bẫy kiểm vòng</td><td>Kiểm bằng cách nào?</td></tr>\n<tr><td>l-2-5 Người duyệt: khi nào, ai, sâu tới đâu</td><td>Bậc duyệt, người duyệt cần gì, duyệt hình thức, duyệt theo mẫu</td><td>Ai kiểm, kiểm tới đâu?</td></tr>\n<tr><td>l-2-6 Chỉnh cho người đọc, chọn bản nháp, định dạng xuất</td><td>Hồ sơ người đọc, giữ đúng dữ kiện khi viết lại, chấm bản nháp theo tiêu chí, xuất file</td><td>Dùng được ở nơi nhận chưa?</td></tr>\n</tbody>\n</table>\n<div class=\"tip\">Khẩu vị đáp án D2: có một nguồn bên ngoài Claude, mức kiểm tương xứng với rủi ro, và có người chịu trách nhiệm ở việc hệ trọng. Phương án \"tin vì Claude trả lời rất tự tin\" hoặc \"kiểm từng chữ mọi output\" đều lệch.</div>\n<div class=\"warn\">Output trình bày đẹp, có bảng, có trích dẫn trông rất đáng tin. Hình thức không phải bằng chứng; chỉ có đối chiếu với nguồn mới là bằng chứng.</div>",
     "keypoints": [
      "Claude dự đoán chữ tiếp theo nên luôn trôi chảy, kể cả khi sai; trôi chảy không phải bằng chứng.",
      "Kiến thức có mốc (docs hiện ghi tháng 6/2026 cho model mới nhất, tháng 11/2026); thông tin sau mốc phải được đưa vào hoặc tìm qua web.",
      "Các kiểu lỗi: sai/bịa, thiếu, cũ, mâu thuẫn, thiên lệch, sai người đọc/định dạng.",
      "Kiểm là so với chuẩn nằm ngoài Claude; hỏi lại 'bạn có chắc không' không phải là kiểm.",
      "Mức kiểm tăng theo hậu quả nếu sai; việc hệ trọng cần người đủ chuyên môn duyệt."
     ],
     "sources": [
      {
       "t": "AI Capabilities and Limitations",
       "u": "https://anthropic.skilljar.com/ai-capabilities-and-limitations"
      },
      {
       "t": "Reduce hallucinations",
       "u": "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations"
      },
      {
       "t": "Models overview",
       "u": "https://platform.claude.com/docs/en/models/overview"
      },
      {
       "t": "Evaluating & Validating Claude's Output (Claude Associate path)",
       "u": "https://anthropic-partners.skilljar.com/path/claude-associate/evaluating-validating-claudes-output"
      },
      {
       "t": "AI Fluency: Framework & Foundations",
       "u": "https://anthropic.skilljar.com/ai-fluency-framework-foundations"
      },
      {
       "t": "AI Fluency: Key Terminology Cheat Sheet (PDF)",
       "u": "https://www-cdn.anthropic.com/4396730ed190e691a3712cf2fd6bfe35509deca2.pdf"
      }
     ]
    },
    {
     "id": "l-2-1",
     "title": "Đúng và đủ: kiểm output theo rủi ro và tiêu chí",
     "minutes": 11,
     "html": "<p>Claude tạo câu trả lời bằng cách dự đoán chữ tiếp theo dựa trên những gì đã học và những gì có trong context. Vì vậy câu trả lời <strong>luôn trôi chảy</strong>, kể cả khi sai. Giọng tự tin không phải bằng chứng. Kiểm output nghĩa là so nó với một thứ nằm ngoài Claude: tài liệu nguồn, số liệu gốc, chuyên gia, hoặc chính yêu cầu ban đầu của bạn.</p>\n<h4>Chính xác và đầy đủ là hai phép kiểm khác nhau</h4>\n<ul>\n<li><strong>Đúng (accuracy)</strong>: những gì output nói có khớp sự thật và nguồn không?</li>\n<li><strong>Đủ (completeness)</strong>: output có trả lời hết những gì được yêu cầu không, có bỏ sót phần quan trọng không?</li>\n</ul>\n<p>Một bản tóm tắt hợp đồng có thể đúng từng câu nhưng bỏ sót điều khoản phạt chậm giao hàng, và vì thế vẫn nguy hiểm. Lỗi thiếu khó thấy hơn lỗi sai, vì bạn phải biết cái gì <em>đáng lẽ</em> phải có.</p>\n<h4>Ưu tiên kiểm ở đâu</h4>\n<p>Không ai có thời gian kiểm từng chữ. Hãy ưu tiên những chỗ dễ sai nhất và tốn kém nhất nếu sai:</p>\n<ul>\n<li>Con số, ngày tháng, tên người, tên tổ chức, giá tiền.</li>\n<li>Trích dẫn, đường link, tên tài liệu, số điều luật.</li>\n<li>Thông tin mới hoặc rất chuyên ngành (dễ vượt ngoài kiến thức của model).</li>\n<li>Bất cứ thứ gì người khác sẽ hành động theo: cam kết với khách, hướng dẫn quy trình, số liệu trong báo cáo tài chính.</li>\n</ul>\n<h4>Checklist lập sẵn để đo độ đầy đủ</h4>\n<p>Trước khi đọc output, liệt kê những gì nó phải có, lấy từ chính yêu cầu: \"5 rủi ro, mỗi rủi ro có mức độ và người chịu trách nhiệm; nêu ngân sách; dưới 2 trang\". Sau đó dò từng mục. Cách này cũng giúp bạn không bị cuốn theo một output viết hay nhưng lạc đề.</p>\n<h4>Ba góc đánh giá theo khung 4D</h4>\n<p>Khung AI Fluency gọi kỹ năng này là <strong>Discernment</strong>, chia làm ba phần:</p>\n<ul>\n<li><strong>Product Discernment</strong>: chất lượng sản phẩm: chính xác, phù hợp, mạch lạc, đúng trọng tâm.</li>\n<li><strong>Process Discernment</strong>: cách Claude đi tới kết quả: có bước lập luận nào sai, có bỏ qua dữ kiện nào, có nhảy kết luận không. Bạn có thể yêu cầu Claude trình bày lập luận hoặc xem phần tóm tắt suy nghĩ.</li>\n<li><strong>Performance Discernment</strong>: cách Claude cư xử trong cuộc trao đổi: có quá dài dòng, có chiều theo bạn quá mức thay vì phản biện khi cần không.</li>\n</ul>\n<h4>Đưa phát hiện quay lại prompt</h4>\n<p>Khung 4D mô tả vòng <strong>Description – Discernment</strong>: bạn mô tả, Claude làm, bạn đánh giá, rồi dùng điều phát hiện được để mô tả tốt hơn. Nếu output lần nào cũng thiếu phần ngân sách, hãy đưa \"phải có ngân sách\" vào prompt thay vì lần nào cũng tự thêm bằng tay.</p>\n<div class=\"tip\">Trong đề, phương án \"đọc lướt thấy hợp lý là được\" hoặc \"hỏi Claude xem nó có chắc không\" gần như luôn sai. Phương án đúng thường nhắc tới việc so với nguồn gốc, kiểm theo tiêu chí viết trước, hoặc ưu tiên kiểm các chi tiết rủi ro cao.</div>\n<div class=\"warn\">Output càng trau chuốt càng dễ khiến người đọc mất cảnh giác. Định dạng đẹp, giọng chuyên nghiệp không liên quan gì tới việc số liệu có đúng hay không.</div>",
     "keypoints": [
      "Giọng tự tin không phải bằng chứng; kiểm là so với nguồn nằm ngoài Claude.",
      "Tách hai câu hỏi: đúng (accuracy) và đủ (completeness).",
      "Ưu tiên kiểm số liệu, tên, ngày, trích dẫn, link và thứ người khác sẽ hành động theo.",
      "Đo độ đủ bằng danh sách viết trước từ chính yêu cầu.",
      "Discernment gồm Product, Process, Performance; vòng Description–Discernment biến phát hiện thành prompt tốt hơn."
     ],
     "sources": [
      {
       "t": "AI Fluency: Framework & Foundations",
       "u": "https://anthropic.skilljar.com/ai-fluency-framework-foundations"
      },
      {
       "t": "AI Fluency: Key Terminology Cheat Sheet (PDF)",
       "u": "https://www-cdn.anthropic.com/4396730ed190e691a3712cf2fd6bfe35509deca2.pdf"
      },
      {
       "t": "AI Capabilities and Limitations",
       "u": "https://anthropic.skilljar.com/ai-capabilities-and-limitations"
      },
      {
       "t": "Reduce hallucinations",
       "u": "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations"
      }
     ]
    },
    {
     "id": "l-2-2",
     "title": "Hallucination, mâu thuẫn, bias và cách fact-check",
     "minutes": 13,
     "html": "<p>Đề sẽ mô tả một output có vấn đề và hỏi bạn đó là lỗi gì, hoặc nên kiểm bằng cách nào. Phân biệt được ba loại lỗi dưới đây là nền tảng.</p>\n<h4>Ba kiểu lỗi</h4>\n<table>\n<thead><tr><th>Kiểu lỗi</th><th>Nhận diện</th><th>Ví dụ</th></tr></thead>\n<tbody>\n<tr><td><strong>Hallucination</strong></td><td>Khẳng định nghe hợp lý, nói rất tự tin, nhưng sai hoặc không có thật</td><td>Một nghiên cứu \"năm 2023 của Đại học X\" không tồn tại; một đường link dẫn tới trang 404; điều khoản không có trong hợp đồng</td></tr>\n<tr><td><strong>Mâu thuẫn (inconsistency)</strong></td><td>Hai chỗ nói khác nhau</td><td>Đoạn đầu ghi doanh thu tăng 12%, bảng cuối ghi 9%; hỏi lại cùng câu thì ra đáp án khác; output nói khác tài liệu bạn đưa</td></tr>\n<tr><td><strong>Bias</strong></td><td>Thường không phải câu sai mà là thiếu hoặc lệch: một góc nhìn bị bỏ qua, giả định khuôn mẫu, ngôn ngữ thiên vị</td><td>Mô tả công việc kỹ sư toàn dùng đại từ nam; phân tích thị trường chỉ dựa trên giả định của một quốc gia</td></tr>\n</tbody>\n</table>\n<h4>Những vùng dễ bị bịa nhất</h4>\n<p>Trích dẫn học thuật, URL, số liệu thống kê cụ thể, tên người và chức danh, số hiệu văn bản pháp luật, chi tiết của sự kiện gần đây hoặc chủ đề rất ngách. Đây cũng chính là những chỗ bạn nên kiểm đầu tiên.</p>\n<h4>Phòng từ prompt: yêu cầu output có thể đối chiếu</h4>\n<p>Docs của Anthropic về giảm hallucination gợi ý các kỹ thuật bạn có thể đưa vào prompt:</p>\n<ul>\n<li><strong>Cho phép nói \"không biết\"</strong>: nói rõ Claude được phép thừa nhận không chắc hoặc không tìm thấy.</li>\n<li><strong>Trích nguyên văn trước</strong>: với tài liệu dài, yêu cầu Claude trích đúng đoạn liên quan rồi mới trả lời dựa trên đó.</li>\n<li><strong>Giới hạn nguồn</strong>: chỉ dùng tài liệu được cung cấp, không dùng kiến thức chung.</li>\n<li><strong>Mỗi khẳng định một trích dẫn</strong>: khẳng định nào không tìm được đoạn hỗ trợ thì phải rút lại.</li>\n</ul>\n<h4>Khi đã có output: đối chiếu từng ý quan trọng</h4>\n<ul>\n<li><strong>So với nguồn gốc</strong>: mở tài liệu gốc, trang web thật, cơ sở dữ liệu của công ty. Trích dẫn chỉ cho bạn biết nên mở trang nào ra đọc; bản thân nó chưa chứng minh gì. Bạn phải mở nguồn và xem nó có thật sự nói như vậy không.</li>\n<li><strong>Chạy lại và so</strong> (docs gọi là best-of-N): hỏi cùng câu vài lần; nếu các lần trả lời mâu thuẫn nhau ở một chi tiết, chi tiết đó đáng ngờ.</li>\n<li><strong>Đọc lập luận</strong>: xem phần tóm tắt suy nghĩ hoặc yêu cầu Claude giải thích từng bước, tìm bước nhảy vô lý.</li>\n<li><strong>Đối chiếu chéo</strong> với nguồn độc lập thứ hai cho các con số quan trọng.</li>\n</ul>\n<p>Docs cũng nói rõ: các kỹ thuật này <strong>giảm</strong> chứ không <strong>loại bỏ</strong> hallucination. Thông tin quan trọng vẫn phải được kiểm.</p>\n<h4>Kiểm bias</h4>\n<p>Hỏi: ai có thể bị bỏ sót hoặc bị mô tả không công bằng? Output có đang giả định một nhóm người dùng, một nền văn hóa, một giới tính? Bạn có thể yêu cầu Claude tự rà output theo góc nhìn của các nhóm khác nhau, nhưng người quyết định vẫn là bạn, nhất là khi output dùng để ra quyết định về con người (tuyển dụng, đánh giá).</p>\n<div class=\"tip\">\"Hỏi Claude 'Bạn có chắc không?'\" không phải là fact-check. Claude có thể đổi ý hoặc khẳng định lại, nhưng cả hai đều không phải bằng chứng. Đáp án đúng luôn có một nguồn bên ngoài.</div>\n<div class=\"warn\">Có link không có nghĩa là đúng. Link có thể không tồn tại, hoặc tồn tại nhưng không nói điều output khẳng định. Phải mở và đọc.</div>",
     "keypoints": [
      "Hallucination: sai nhưng nghe hợp lý và tự tin; hay nằm ở trích dẫn, URL, số liệu, tên, điều luật, chủ đề mới hoặc ngách.",
      "Mâu thuẫn: trong cùng output, giữa các lần chạy, hoặc với tài liệu nguồn.",
      "Bias thường là thiếu hoặc lệch góc nhìn, không nhất thiết là câu sai.",
      "Trước: cho phép nói không biết, trích nguyên văn trước, giới hạn nguồn. Sau: mở nguồn gốc, chạy lại so sánh, đọc lập luận.",
      "Các kỹ thuật chỉ giảm, không loại bỏ hallucination; trích dẫn chỉ là địa chỉ để mở ra kiểm, chưa phải bằng chứng."
     ],
     "sources": [
      {
       "t": "Reduce hallucinations",
       "u": "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations"
      },
      {
       "t": "Enabling and using web search (citations)",
       "u": "https://support.claude.com/en/articles/10684626-enabling-and-using-web-search"
      },
      {
       "t": "AI Capabilities and Limitations",
       "u": "https://anthropic.skilljar.com/ai-capabilities-and-limitations"
      }
     ]
    },
    {
     "id": "l-2-3",
     "title": "Người duyệt, người đọc và định dạng output",
     "minutes": 12,
     "html": "<h4>Khi nào bắt buộc phải có người duyệt</h4>\n<p>Mọi output đều nên được người dùng đọc qua; điều cần quyết là <em>mức độ duyệt</em> và <em>người duyệt</em>. Tăng mức duyệt khi có các tín hiệu sau:</p>\n<ul>\n<li><strong>Hậu quả lớn hoặc khó đảo ngược</strong>: hợp đồng, thông báo công khai, số liệu gửi cơ quan quản lý.</li>\n<li><strong>Đối ngoại</strong>: nội dung gửi khách hàng, đối tác, báo chí.</li>\n<li><strong>Quyết định về con người</strong>: tuyển dụng, đánh giá, tín dụng, bảo hiểm, y tế, pháp lý. Usage Policy của Anthropic yêu cầu với các lĩnh vực rủi ro cao này, một người có chuyên môn phải xem xét thực chất trước khi kết quả tới tay người bị ảnh hưởng (chi tiết ở D6).</li>\n<li><strong>Bạn không đủ chuyên môn để tự phán</strong>: một bản phân tích thuế mà bạn không phải chuyên gia thuế.</li>\n</ul>\n<p><strong>Người duyệt</strong> cần đủ chuyên môn để đánh giá nội dung và là người đứng tên chịu trách nhiệm. Một đồng nghiệp đọc thấy \"trôi\" không phải là duyệt chuyên môn. Nhờ thêm một phiên Claude rà lại có thể bắt được lỗi, nhưng phiên đó <strong>không thể đứng tên chịu trách nhiệm</strong> thay con người.</p>\n<h4>Chỉnh output cho đúng người đọc</h4>\n<p>Đừng coi bản đầu tiên là bản cuối. Có bốn yếu tố để điều chỉnh:</p>\n<ul>\n<li><strong>Độ sâu kỹ thuật</strong>: giữ hay bỏ thuật ngữ, có giải thích hay không.</li>\n<li><strong>Giọng</strong>: trang trọng, thân thiện, trung tính, thuyết phục.</li>\n<li><strong>Độ dài</strong>: một đoạn cho người bận, bản đầy đủ cho người cần chi tiết.</li>\n<li><strong>Cấu trúc</strong>: kết luận trước cho lãnh đạo, bối cảnh trước cho người mới.</li>\n</ul>\n<p>Một nội dung có thể có nhiều phiên bản: bản cho ban giám đốc (kết luận, rủi ro, quyết định cần đưa ra), bản cho đội thực hiện (các bước, mốc thời gian), bản cho khách hàng (lợi ích, không có chi tiết nội bộ). Yêu cầu chỉnh sửa nên cụ thể đến mức Claude thực hiện được ngay: \"bỏ đoạn 3, đưa con số chi phí lên câu đầu\" tốt hơn \"cho chuyên nghiệp hơn\". Kèm <em>mục đích</em> của từng yêu cầu, để Claude không làm theo câu chữ mà lệch ý bạn.</p>\n<p>Khi có nhiều bản nháp, hãy đối chiếu chúng với tiêu chí đã đặt từ đầu thay vì chọn theo cảm giác. Người chọn bản cuối cũng là người chịu trách nhiệm về nó.</p>\n<h4>Định dạng: nhìn vào nơi output sẽ được dùng</h4>\n<table>\n<thead><tr><th>Nơi nhận / mục đích</th><th>Định dạng hợp lý</th></tr></thead>\n<tbody>\n<tr><td>Câu trả lời nhanh, đọc xong là xong</td><td>Trả lời ngay trong chat</td></tr>\n<tr><td>Sản phẩm dài, độc lập, sẽ chỉnh sửa và dùng lại (tài liệu, slide, dashboard, công cụ nhỏ)</td><td>Artifact. Help center nói Claude tạo artifact khi nội dung đáng kể (thường hơn 15 dòng), độc lập và có khả năng được dùng lại</td></tr>\n<tr><td>So sánh nhiều phương án theo nhiều tiêu chí</td><td>Bảng</td></tr>\n<tr><td>Các bước làm theo thứ tự</td><td>Danh sách đánh số</td></tr>\n<tr><td>Lập luận, giải thích nguyên nhân</td><td>Văn xuôi</td></tr>\n<tr><td>Dán vào bảng tính hoặc phần mềm khác</td><td>Dữ liệu có cấu trúc (CSV, JSON) đúng cột/trường yêu cầu, hoặc file Excel/Word/PowerPoint qua tính năng tạo file</td></tr>\n</tbody>\n</table>\n<div class=\"warn\">Output đúng định dạng vẫn có thể sai nội dung. Một bảng CSV đúng cột vẫn có thể chứa số sai. Kiểm định dạng và kiểm nội dung là hai việc.</div>\n<div class=\"tip\">Câu hỏi về định dạng thường có một chi tiết lộ đáp án: \"sẽ nhập vào hệ thống\", \"chia sẻ và chỉnh sửa tiếp\", \"đọc trên điện thoại trong 30 giây\". Chọn định dạng theo nơi nhận, không theo cái gì trông đẹp nhất.</div>",
     "keypoints": [
      "Tăng mức duyệt khi hậu quả lớn, đối ngoại, quyết định về con người, hoặc bạn không đủ chuyên môn.",
      "Người duyệt cần đủ chuyên môn đánh giá và đứng tên chịu trách nhiệm; một phiên AI rà lại không thay được vai trò đó.",
      "Bốn yếu tố chỉnh theo người đọc: độ sâu kỹ thuật, giọng, độ dài, cấu trúc; yêu cầu sửa phải cụ thể, làm theo được.",
      "Định dạng theo nơi nhận: chat cho việc nhanh, artifact cho sản phẩm dùng lại, dữ liệu có cấu trúc cho phần mềm.",
      "Đúng định dạng không đảm bảo đúng nội dung."
     ],
     "sources": [
      {
       "t": "What are artifacts and how do I use them?",
       "u": "https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them"
      },
      {
       "t": "Create and edit files with Claude",
       "u": "https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude"
      },
      {
       "t": "Anthropic Usage Policy",
       "u": "https://www.anthropic.com/legal/aup"
      }
     ]
    },
    {
     "id": "l-2-4",
     "title": "Fact-check từng khẳng định: tách claim, chọn nguồn có thẩm quyền, rút lại khi không có căn cứ",
     "minutes": 12,
     "html": "<p>Bài l-2-2 giới thiệu các cách đối chiếu. Bài này biến chúng thành một quy trình bạn làm được trong 15 phút với một bản báo cáo hay bài đăng thật.</p>\n<h4>Bước 1: tách output thành từng khẳng định</h4>\n<p>Một <strong>khẳng định (claim)</strong> là một câu nói một điều có thể đúng hoặc sai: \"Thị phần của công ty A năm 2025 là 18%\", \"Nghị định X có hiệu lực từ ngày 1/7\". Đoạn văn dài thường chứa nhiều claim đan vào nhau. Bạn có thể nhờ chính Claude liệt kê: \"Liệt kê mọi khẳng định có thể kiểm chứng trong bản nháp trên thành bảng: khẳng định, nguồn đã dùng, đoạn trích nguyên văn từ nguồn.\" Docs về giảm hallucination gọi hướng này là làm output <strong>có thể kiểm toán</strong>: mỗi khẳng định đi kèm trích dẫn.</p>\n<h4>Bước 2: phân loại và chọn chỗ kiểm</h4>\n<table>\n<thead><tr><th>Loại claim</th><th>Ví dụ</th><th>Cách xử lý</th></tr></thead>\n<tbody>\n<tr><td>Dữ kiện kiểm được</td><td>Số liệu, ngày, tên, giá, điều khoản</td><td>Đối chiếu với nguồn gốc; ưu tiên chỗ người khác sẽ hành động theo</td></tr>\n<tr><td>Phép tính</td><td>Tổng, tỉ lệ tăng trưởng, chênh lệch</td><td>Tự tính lại từ số gốc, đừng chỉ đọc kết quả</td></tr>\n<tr><td>Nhận định, suy luận</td><td>\"Nguyên nhân chính là…\", \"nên chọn…\"</td><td>Không tra được ở đâu; kiểm lập luận: dữ kiện nào dẫn tới, có bỏ qua dữ kiện ngược chiều không</td></tr>\n<tr><td>Thông tin nhạy thời gian</td><td>Giá hiện tại, người giữ chức vụ, quy định mới</td><td>Kiểm với nguồn cập nhật; nhớ kiến thức của model có mốc</td></tr>\n</tbody>\n</table>\n<h4>Bước 3: chọn nguồn có thẩm quyền</h4>\n<p>Không phải nguồn nào cũng ngang nhau. Thứ tự ưu tiên hợp lý (lời khuyên thực hành):</p>\n<ol>\n<li><strong>Nguồn gốc</strong>: văn bản pháp luật gốc, báo cáo tài chính được công bố, hệ thống dữ liệu nội bộ, hợp đồng đã ký.</li>\n<li><strong>Nguồn chính thức</strong>: trang của cơ quan, tổ chức, nhà sản xuất.</li>\n<li><strong>Nguồn thứ cấp đáng tin</strong>: báo chí uy tín, báo cáo ngành, dùng để đối chiếu chéo.</li>\n</ol>\n<p>Với con số quan trọng, đối chiếu ít nhất hai nguồn độc lập. Hai bài báo cùng chép một nguồn không phải hai nguồn độc lập.</p>\n<h4>Bước 4: mở nguồn và đọc đúng đoạn</h4>\n<p>Help center ghi mỗi câu trả lời dùng web search đều kèm trích dẫn để bạn tự kiểm nguồn. Trích dẫn giúp bạn biết <em>mở trang nào</em>; nó chưa chứng minh trang đó nói đúng điều output khẳng định. Ba tình huống hay gặp khi mở ra:</p>\n<ul>\n<li>Nguồn nói đúng như vậy → giữ.</li>\n<li>Nguồn có nói về chủ đề đó nhưng con số, phạm vi hoặc thời điểm khác → sửa theo nguồn.</li>\n<li>Nguồn không nói điều đó, hoặc link không mở được → coi là không có căn cứ.</li>\n</ul>\n<h4>Bước 5: rút lại hoặc đánh dấu</h4>\n<p>Docs mô tả một kỹ thuật cụ thể: sau khi soạn, yêu cầu Claude tìm đoạn trích hỗ trợ cho từng khẳng định; khẳng định nào không tìm được đoạn trích thì phải rút lại. Ví dụ trong docs còn yêu cầu đánh dấu chỗ đã xóa bằng cặp ngoặc vuông trống để người duyệt thấy. Áp vào việc thật: claim không có căn cứ thì bỏ, hoặc chuyển thành câu hỏi gửi người có thông tin, không để nguyên trong bản gửi đi.</p>\n<h4>Những công cụ đi kèm</h4>\n<ul>\n<li><strong>Giới hạn nguồn ngay từ đầu</strong>: \"chỉ dùng các tài liệu đính kèm, không dùng kiến thức chung\". Docs gọi là external knowledge restriction.</li>\n<li><strong>Chạy lại và so (best-of-N)</strong>: chi tiết nào thay đổi giữa các lần chạy là chi tiết đáng ngờ.</li>\n<li><strong>Đọc tóm tắt suy nghĩ</strong> khi kết luận có vẻ sai, để tìm giả định hoặc bước lập luận lỗi.</li>\n</ul>\n<h4>Ví dụ: bản tin thị trường hằng tuần</h4>\n<p>Một chuyên viên dùng Claude với web search soạn bản tin gửi khách hàng. Bản nháp có 14 claim. Chị nhờ Claude lập bảng claim kèm link; mở 6 claim có số liệu và 2 claim về quy định; phát hiện một tỉ lệ lãi suất lấy từ bài báo năm ngoái và một link không còn tồn tại. Chị sửa tỉ lệ theo trang chính thức của ngân hàng trung ương, bỏ claim không có nguồn, rồi mới gửi trưởng nhóm duyệt.</p>\n<div class=\"tip\">Đáp án đúng cho câu hỏi fact-check luôn có hành động mở một nguồn bên ngoài và đọc. \"Yêu cầu Claude thêm trích dẫn\" là bước tốt nhưng chưa đủ nếu không ai mở trích dẫn ra kiểm.</div>\n<div class=\"warn\">Bẫy kiểm vòng: nhờ Claude \"kiểm lại bài vừa viết\" rồi coi đó là fact-check. Phiên rà soát có thể bắt được lỗi, nhưng vẫn là cùng một cơ chế sinh chữ; chuẩn so sánh phải nằm ngoài Claude.</div>",
     "keypoints": [
      "Tách output thành từng claim kiểm được; nhờ Claude lập bảng claim kèm đoạn trích nguồn để output có thể kiểm toán.",
      "Phân loại: dữ kiện (đối chiếu), phép tính (tự tính lại), nhận định (kiểm lập luận), thông tin nhạy thời gian (nguồn cập nhật).",
      "Ưu tiên nguồn gốc và nguồn chính thức; số quan trọng đối chiếu hai nguồn độc lập.",
      "Trích dẫn chỉ là địa chỉ; phải mở và đọc đúng đoạn.",
      "Claim không có đoạn trích hỗ trợ thì rút lại hoặc đánh dấu, không để trong bản gửi đi."
     ],
     "sources": [
      {
       "t": "Reduce hallucinations",
       "u": "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations"
      },
      {
       "t": "Enabling and using web search",
       "u": "https://support.claude.com/en/articles/10684626-enabling-and-using-web-search"
      },
      {
       "t": "Models overview (knowledge cutoff)",
       "u": "https://platform.claude.com/docs/en/models/overview"
      }
     ]
    },
    {
     "id": "l-2-5",
     "title": "Người duyệt: khi nào cần, ai duyệt, và duyệt sâu tới đâu",
     "minutes": 12,
     "html": "<p>Bài l-2-3 nêu các tín hiệu cho thấy cần tăng mức duyệt. Bài này trả lời ba câu tiếp theo mà đề hay hỏi: duyệt ở bậc nào, ai đủ tư cách duyệt, và người duyệt cần làm gì để việc duyệt có thực chất. Cách chia bốn bậc dưới đây là khung thực hành của bài này, không phải thuật ngữ của Anthropic; chỉ yêu cầu ở bậc 4 lấy từ Usage Policy.</p>\n<h4>Bốn bậc duyệt</h4>\n<table>\n<thead><tr><th>Bậc</th><th>Ai làm</th><th>Hợp với</th></tr></thead>\n<tbody>\n<tr><td>1. Tự đọc lại</td><td>Chính người dùng Claude</td><td>Ghi chú, nháp nội bộ, việc dễ sửa nếu sai</td></tr>\n<tr><td>2. Đọc chéo</td><td>Một đồng nghiệp hiểu việc</td><td>Tài liệu nội bộ dùng chung, email quan trọng</td></tr>\n<tr><td>3. Chuyên gia duyệt</td><td>Người có chuyên môn về nội dung (pháp chế, tài chính, kỹ thuật)</td><td>Nội dung đối ngoại, số liệu báo cáo, cam kết với khách</td></tr>\n<tr><td>4. Duyệt bắt buộc theo chính sách</td><td>Người có chuyên môn, có thẩm quyền sửa; có giấy phép nếu luật yêu cầu</td><td>Khuyến nghị trong lĩnh vực rủi ro cao về một cá nhân cụ thể</td></tr>\n</tbody>\n</table>\n<p>Bậc 4 không phải tùy chọn. Usage Policy của Anthropic yêu cầu với khuyến nghị AI trong các lĩnh vực rủi ro cao (pháp lý, y tế, tài chính, tín dụng, bảo hiểm, nhà ở, việc làm, giáo dục và bằng cấp…), một người đủ chuyên môn phải xem xét thực chất, có quyền sửa, và vẫn chịu trách nhiệm về độ chính xác và sự phù hợp của thứ được đưa ra; người nhận phải được thông báo có dùng AI. Phần chính sách thuộc D6; ở D2 bạn cần nhận ra tình huống nào rơi vào bậc này.</p>\n<h4>Người duyệt cần có gì</h4>\n<ul>\n<li><strong>Chuyên môn</strong> để tự đánh giá nội dung, không chỉ thấy câu văn trôi chảy.</li>\n<li><strong>Thẩm quyền</strong> để sửa hoặc dừng output. Người duyệt mà không được phép đổi gì thì chỉ đang ký tên.</li>\n<li><strong>Trách nhiệm</strong>: là người đứng tên. Một phiên Claude khác rà lại có thể giúp bắt lỗi, nhưng không thể đứng tên chịu trách nhiệm.</li>\n<li><strong>Đủ thông tin</strong>: không chỉ bản cuối, mà cả tài liệu nguồn, yêu cầu ban đầu, và ghi chú chỗ nào đã kiểm, chỗ nào chưa.</li>\n</ul>\n<h4>Gói bàn giao cho người duyệt</h4>\n<p>Người duyệt làm nhanh và kỹ hơn khi nhận được (lời khuyên thực hành):</p>\n<ol>\n<li>Output cần duyệt và mục đích của nó.</li>\n<li>Nguồn đã dùng, kèm bảng claim nếu có (xem l-2-4).</li>\n<li>Những chỗ bạn đã kiểm và cách kiểm.</li>\n<li>Những chỗ bạn không đủ chuyên môn để kiểm, nêu thẳng ra.</li>\n<li>Việc Claude đã tham gia vào phần nào.</li>\n</ol>\n<h4>Duyệt hình thức: rủi ro hay gặp</h4>\n<p>Khi output thường xuyên đúng, người duyệt dễ chuyển sang \"lướt rồi duyệt\". Dấu hiệu: thời gian duyệt giảm dần dù khối lượng không đổi, không ai còn sửa gì, người duyệt không nói lại được output dựa trên nguồn nào. Cách giữ cho việc duyệt có thực chất:</p>\n<ul>\n<li>Duyệt theo checklist viết trước (các mục bắt buộc phải kiểm), không duyệt theo cảm giác.</li>\n<li>Với việc khối lượng lớn rủi ro thấp, duyệt theo mẫu ngẫu nhiên và duyệt toàn bộ các trường hợp rủi ro cao.</li>\n<li>Ghi lại lỗi bắt được; nếu một loại lỗi lặp lại, đưa nó ngược về prompt hoặc cấu hình.</li>\n</ul>\n<h4>Ví dụ phân bậc</h4>\n<table>\n<thead><tr><th>Tình huống</th><th>Bậc hợp lý</th></tr></thead>\n<tbody>\n<tr><td>Tóm tắt biên bản họp nội bộ để gửi nhóm</td><td>1, có thể 2 nếu có quyết định quan trọng</td></tr>\n<tr><td>Bảng so sánh giá nhà cung cấp trình ban giám đốc</td><td>3: người phụ trách mua hàng kiểm số liệu</td></tr>\n<tr><td>Thư trả lời khiếu nại của khách có đề cập bồi thường</td><td>3: người có thẩm quyền về chính sách bồi thường</td></tr>\n<tr><td>Đề xuất từ chối hồ sơ vay của một khách hàng</td><td>4: chuyên viên tín dụng có thẩm quyền, và khách được thông báo có dùng AI</td></tr>\n</tbody>\n</table>\n<div class=\"tip\">Khi đề hỏi \"ai nên duyệt\", loại ngay phương án người duyệt không đủ chuyên môn (\"một đồng nghiệp bất kỳ đọc thấy ổn\") và phương án thay người bằng AI (\"nhờ một phiên Claude khác duyệt\"). Đáp án thường là người có chuyên môn và có thẩm quyền ở đúng lĩnh vực.</div>\n<div class=\"warn\">Thêm một lớp duyệt không tự động làm output an toàn hơn nếu người duyệt chỉ nhận bản cuối mà không có nguồn. Duyệt thiếu thông tin dễ thành duyệt hình thức.</div>",
     "keypoints": [
      "Bốn bậc: tự đọc lại, đọc chéo, chuyên gia duyệt, duyệt bắt buộc theo chính sách cho khuyến nghị rủi ro cao.",
      "Usage Policy: khuyến nghị rủi ro cao cần người đủ chuyên môn xem xét thực chất, có quyền sửa, chịu trách nhiệm; người nhận được báo có dùng AI.",
      "Người duyệt cần chuyên môn, thẩm quyền sửa, trách nhiệm đứng tên và đủ thông tin (nguồn, chỗ đã kiểm).",
      "Chống duyệt hình thức: checklist viết trước, duyệt mẫu cho việc rủi ro thấp, duyệt toàn bộ ca rủi ro cao, ghi lại lỗi bắt được.",
      "Một phiên AI rà lại có thể giúp bắt lỗi nhưng không thay được người đứng tên."
     ],
     "sources": [
      {
       "t": "Anthropic Usage Policy",
       "u": "https://www.anthropic.com/legal/aup"
      },
      {
       "t": "Evaluating & Validating Claude's Output (Claude Associate path)",
       "u": "https://anthropic-partners.skilljar.com/path/claude-associate/evaluating-validating-claudes-output"
      },
      {
       "t": "Reduce hallucinations",
       "u": "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations"
      }
     ]
    },
    {
     "id": "l-2-6",
     "title": "Chỉnh output cho đúng người đọc, chọn bản nháp bằng tiêu chí, và xuất đúng định dạng",
     "minutes": 12,
     "html": "<p>Mục tiêu thứ năm của khóa đánh giá output trong lộ trình Associate là chỉnh sửa, điều chỉnh, tinh chỉnh và <strong>so sánh</strong> output cho người đọc đích; mục tiêu thứ sáu là chọn định dạng phù hợp. Bài l-2-3 đã có bốn yếu tố chỉnh theo người đọc và bảng định dạng. Bài này đi vào cách làm.</p>\n<h4>Bắt đầu bằng hồ sơ người đọc</h4>\n<p>Trước khi yêu cầu Claude viết lại, trả lời bốn câu và đưa chúng vào prompt:</p>\n<ul>\n<li><strong>Họ là ai</strong>: chức vụ, chuyên môn, quan hệ với bạn.</li>\n<li><strong>Họ đã biết gì</strong>: có cần giải thích thuật ngữ, bối cảnh dự án không.</li>\n<li><strong>Họ cần làm gì sau khi đọc</strong>: duyệt, quyết định, làm theo, hay chỉ nắm thông tin.</li>\n<li><strong>Họ đọc ở đâu, trong bao lâu</strong>: điện thoại giữa hai cuộc họp, hay in ra đọc kỹ.</li>\n</ul>\n<p>Ví dụ: cùng một kết quả khảo sát nhân viên, bản cho ban giám đốc mở bằng ba phát hiện và một quyết định cần đưa ra; bản cho trưởng phòng có số liệu theo phòng và việc cần làm; bản cho toàn công ty ngắn, trung tính, không có dữ liệu có thể nhận ra cá nhân.</p>\n<h4>Viết lại mà không làm sai dữ kiện</h4>\n<p>Mỗi lần rút gọn, đổi giọng hay đổi cấu trúc là một lần Claude viết lại văn bản, và chi tiết có thể bị đổi theo: con số làm tròn khác, điều kiện bị lược, \"có thể\" thành \"sẽ\". Lời khuyên thực hành:</p>\n<ul>\n<li>Nói rõ phần nào giữ nguyên: \"giữ nguyên mọi con số, ngày và tên; chỉ đổi giọng và độ dài\".</li>\n<li>Sau khi viết lại, so lại các dữ kiện quan trọng với bản đã kiểm, không chỉ đọc bản mới.</li>\n<li>Bản ngắn phải giữ các điều kiện và cảnh báo quan trọng; cắt chúng đi là đổi nghĩa, không phải rút gọn.</li>\n</ul>\n<h4>Yêu cầu chỉnh sửa làm theo được</h4>\n<table>\n<thead><tr><th>Mơ hồ</th><th>Làm theo được</th></tr></thead>\n<tbody>\n<tr><td>\"Cho chuyên nghiệp hơn\"</td><td>\"Bỏ câu cảm thán, thay 'bọn mình' bằng 'chúng tôi', thêm một câu nêu hạn chót\"</td></tr>\n<tr><td>\"Ngắn lại\"</td><td>\"Dưới 120 chữ, giữ đoạn về chi phí, bỏ đoạn lịch sử dự án\"</td></tr>\n<tr><td>\"Dễ hiểu hơn\"</td><td>\"Người đọc là nhân viên bán hàng: thay ba thuật ngữ kỹ thuật bằng ví dụ khách hàng\"</td></tr>\n</tbody>\n</table>\n<p>Kèm <em>mục đích</em> của yêu cầu (\"vì người đọc đọc trên điện thoại\") để Claude xử lý đúng cả những chỗ bạn chưa chỉ ra.</p>\n<h4>Chọn giữa nhiều bản nháp</h4>\n<ol>\n<li><strong>Viết tiêu chí trước khi đọc bản nháp</strong>: ví dụ đúng dữ kiện, đủ ý bắt buộc, đúng giọng, độ dài, lời kêu gọi hành động rõ.</li>\n<li><strong>Đặt trọng số</strong>: đúng dữ kiện là điều kiện bắt buộc, không đổi lấy văn hay.</li>\n<li><strong>Chấm từng bản theo cùng tiêu chí</strong>. Bạn có thể nhờ Claude chấm thử theo bảng tiêu chí để có góc nhìn thứ hai, nhưng người chọn là bạn.</li>\n<li><strong>Ghép có kiểm soát</strong>: lấy mở bài của bản A và phần số liệu của bản B được, nhưng sau khi ghép phải đọc lại toàn bộ vì chỗ nối dễ lệch giọng hoặc lặp ý.</li>\n</ol>\n<h4>Xuất đúng định dạng cho nơi nhận</h4>\n<p>Định dạng cũng là một phần của người đọc: bảng tính cho người sẽ lọc số, slide cho người trình bày, văn bản cho người ký. Docs hiện ghi (tháng 11/2026):</p>\n<ul>\n<li>Claude tạo và chỉnh được file Excel (.xlsx), PowerPoint (.pptx), Word (.docx) và PDF; bạn tải file về hoặc lưu thẳng vào Google Drive. Cần bật cài đặt \"Code execution and file creation\" (bố cục Settings mới gọi là \"Create and edit files\").</li>\n<li>Artifact dạng Docs xuất được ra Word, PDF, Markdown, Google Docs; dạng Slides xuất ra PowerPoint, PDF hoặc Google Slides.</li>\n<li>Artifact mặc định chỉ mình bạn thấy cho tới khi bạn chia sẻ.</li>\n</ul>\n<p>Chọn theo nơi output sẽ đi tiếp: dán vào hệ thống khác thì cần dữ liệu có cấu trúc đúng cột; gửi khách để sửa tiếp thì cần file họ mở được trong công cụ quen dùng.</p>\n<div class=\"tip\">Câu hỏi về so sánh bản nháp: đáp án tốt có tiêu chí viết trước và đặt độ chính xác lên trên văn phong. Phương án \"chọn bản đọc hay nhất\" hoặc \"chọn bản dài nhất vì đầy đủ\" là bẫy.</div>\n<div class=\"warn\">Bản đã kiểm kỹ rồi đem đi \"viết lại cho gọn\" là một bản mới chưa kiểm. Dữ kiện phải được so lại sau mỗi lần viết lại.</div>",
     "keypoints": [
      "Hồ sơ người đọc: họ là ai, đã biết gì, cần làm gì sau khi đọc, đọc ở đâu và trong bao lâu.",
      "Viết lại có thể làm đổi dữ kiện: dặn giữ nguyên số, ngày, tên và so lại sau mỗi lần viết lại.",
      "Yêu cầu chỉnh sửa phải cụ thể, làm theo được, kèm mục đích.",
      "Chọn bản nháp: tiêu chí và trọng số viết trước, chấm cùng tiêu chí, đúng dữ kiện là điều kiện bắt buộc; người chọn là bạn.",
      "Docs hiện ghi Claude tạo được file Excel, PowerPoint, Word, PDF; artifact Docs/Slides xuất được sang Word, PDF, PowerPoint, Google Docs/Slides (tháng 11/2026)."
     ],
     "sources": [
      {
       "t": "Evaluating & Validating Claude's Output (Claude Associate path)",
       "u": "https://anthropic-partners.skilljar.com/path/claude-associate/evaluating-validating-claudes-output"
      },
      {
       "t": "Create and edit files with Claude",
       "u": "https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude"
      },
      {
       "t": "What are artifacts and how do I use them?",
       "u": "https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them"
      }
     ]
    }
   ],
   "cheat": [
    [
     "Kiểm output là gì",
     "So với nguồn NGOÀI Claude (tài liệu gốc, dữ liệu thật, chuyên gia, yêu cầu ban đầu)"
    ],
    [
     "Đúng vs đủ",
     "Accuracy: khớp sự thật. Completeness: không bỏ sót phần được yêu cầu"
    ],
    [
     "Ưu tiên kiểm",
     "Số liệu, tên, ngày, trích dẫn, link, điều luật, thứ người khác sẽ hành động theo"
    ],
    [
     "Hallucination",
     "Sai nhưng nghe hợp lý, nói tự tin; hay ở trích dẫn, URL, số liệu, chủ đề mới/ngách"
    ],
    [
     "Mâu thuẫn",
     "Trong cùng output, giữa các lần chạy (best-of-N), hoặc với tài liệu đưa vào"
    ],
    [
     "Bias",
     "Thiếu/lệch góc nhìn, khuôn mẫu, ngôn ngữ thiên vị; cẩn trọng khi output dùng để quyết định về người"
    ],
    [
     "Kỹ thuật giảm hallucination",
     "Cho phép nói 'không biết'; trích nguyên văn trước; chỉ dùng tài liệu cung cấp; khẳng định không có trích dẫn thì rút lại"
    ],
    [
     "Trích dẫn",
     "Chỉ là địa chỉ để mở nguồn ra đọc; tự nó chưa chứng minh gì"
    ],
    [
     "'Bạn có chắc không?'",
     "Không phải fact-check"
    ],
    [
     "Người duyệt",
     "Đủ chuyên môn, đứng tên chịu trách nhiệm; AI rà AI không thay được"
    ],
    [
     "Discernment (4D)",
     "Product (chất lượng), Process (lập luận), Performance (cách cư xử)"
    ],
    [
     "Định dạng",
     "Theo nơi nhận: chat / artifact / bảng / danh sách / văn xuôi / CSV-JSON / file"
    ],
    [
     "Fact-check theo claim",
     "Tách claim → phân loại → nguồn gốc/chính thức → mở và đọc đúng đoạn → rút lại claim không có căn cứ"
    ],
    [
     "Bẫy kiểm vòng",
     "Nhờ Claude tự kiểm bài vừa viết không phải fact-check; chuẩn so phải nằm ngoài Claude"
    ],
    [
     "Bốn bậc duyệt",
     "Tự đọc → đọc chéo → chuyên gia → duyệt bắt buộc (rủi ro cao: chuyên môn, quyền sửa, chịu trách nhiệm, thông báo AI)"
    ],
    [
     "Viết lại / chọn bản nháp",
     "Giữ nguyên số, ngày, tên và so lại sau khi viết lại; chọn bản theo tiêu chí viết trước, đúng dữ kiện là bắt buộc"
    ]
   ],
   "quiz": [
    {
     "q": "A finance associate uses Claude to draft a quarterly summary for the CFO. The draft is well-written and cites several revenue figures. What should the associate do BEFORE sending it?",
     "options": [
      "Ask Claude to confirm that every figure is accurate",
      "Send it, since Claude used a professional tone and clear structure",
      "Check each revenue figure against the company's source financial reports",
      "Run the draft through a grammar checker"
     ],
     "answer": 2,
     "explain": "Con số gửi CFO là chi tiết rủi ro cao, phải so với nguồn gốc nằm ngoài Claude (báo cáo tài chính). Hỏi Claude tự xác nhận không phải fact-check. Giọng chuyên nghiệp không chứng minh số đúng. Kiểm ngữ pháp không đụng tới tính chính xác của số liệu."
    },
    {
     "q": "Claude's answer to a policy question includes a link to an official government page as its source. What is the MOST appropriate way to treat this citation?",
     "options": [
      "Open the link and confirm the page exists and actually supports the specific claim",
      "Accept the claim, since an official government domain is a reliable source and Claude selected it specifically",
      "Ask Claude to provide two more links to strengthen the answer",
      "Remove the link so readers do not rely on it"
     ],
     "answer": 0,
     "explain": "Trích dẫn chỉ là địa chỉ để kiểm: link có thể không tồn tại, hoặc tồn tại nhưng không nói điều output khẳng định. Phải mở ra và đối chiếu. Tên miền uy tín không chứng minh nội dung khớp. Xin thêm link chỉ thêm việc phải kiểm. Xóa link làm mất khả năng kiểm chứng."
    },
    {
     "q": "A recruiter asks Claude to draft a job description for a senior engineering role. The text is accurate about the role's duties, but it uses only male pronouns and describes the ideal candidate with phrases like 'young and energetic.' What type of issue is this, and what should the recruiter do?",
     "options": [
      "A hallucination, since the wording does not match the company's style; regenerate the description until the pronouns change",
      "A formatting issue; convert the description to bullet points",
      "A completeness issue; ask Claude to add more duties",
      "A bias issue; revise to neutral, inclusive language and review it against the company's hiring guidelines before posting"
     ],
     "answer": 3,
     "explain": "Nội dung không sai sự thật nên không phải hallucination; vấn đề là ngôn ngữ thiên lệch và khuôn mẫu (giới tính, tuổi) — đó là bias. Cách xử lý là sửa sang ngôn ngữ trung lập và người tuyển dụng rà theo hướng dẫn của công ty, vì đây là nội dung ảnh hưởng tới quyết định về con người. Đổi định dạng hay thêm nhiệm vụ không sửa được bias; chạy lại ngẫu nhiên không đảm bảo hết."
    },
    {
     "q": "An analyst needs Claude to summarize findings from a long industry report and wants the summary to be easy to verify. Which TWO actions BEST support verification? (Choose TWO.)",
     "options": [
      "Ask Claude to write the summary in a confident, executive tone",
      "Ask Claude to include the exact quoted passage from the report that supports each key claim",
      "Ask Claude to supplement the report with general industry knowledge where the report is thin",
      "Ask Claude to keep the summary under 100 words",
      "Spot-check the claims against the original report, starting with figures and named sources"
     ],
     "answer": [
      1,
      4
     ],
     "explain": "Yêu cầu trích nguyên văn cho từng khẳng định giúp output kiểm được, và kiểm ngẫu nhiên với báo cáo gốc (bắt đầu từ số liệu, nguồn được nêu tên) là bước kiểm thực sự. Giọng tự tin không giúp kiểm. Bổ sung kiến thức chung làm lẫn nội dung ngoài báo cáo, khó kiểm hơn. Giới hạn 100 chữ chỉ là độ dài, không liên quan tới kiểm chứng."
    },
    {
     "q": "A compliance officer used Claude to draft a customer notice about changes to loan eligibility criteria. A colleague in marketing read it and said it 'reads well.' What is the MOST appropriate next step before the notice is sent?",
     "options": [
      "Send it, since a second person has already reviewed it",
      "Have a qualified reviewer with lending and legal expertise review the content, since it affects customers' access to credit and is external",
      "Ask a second Claude chat to check the notice carefully for legal and factual errors, and send it once that independent review finds no remaining issues",
      "Shorten the notice to reduce the chance of errors"
     ],
     "answer": 1,
     "explain": "Thông báo đối ngoại, ảnh hưởng tới quyền tiếp cận tín dụng của khách là trường hợp rủi ro cao: cần người có chuyên môn (cho vay, pháp lý) duyệt và chịu trách nhiệm. Đồng nghiệp marketing đọc thấy 'trôi' không phải duyệt chuyên môn. Một lượt Claude khác có thể giúp phát hiện lỗi nhưng không thay được người duyệt. Rút ngắn không thay được việc duyệt."
    },
    {
     "q": "A product manager asks Claude to compare four project-management tools across price, integrations, learning curve, and security features so the team can decide in a meeting. Which output format is MOST appropriate?",
     "options": [
      "Four separate paragraphs, one per tool",
      "A single bulleted list of all features mentioned",
      "A JSON object for each tool",
      "A comparison table with tools as rows and criteria as columns, followed by a short note on trade-offs"
     ],
     "answer": 3,
     "explain": "So sánh nhiều phương án theo nhiều tiêu chí để thảo luận trong cuộc họp thì bảng là định dạng dễ đọc nhất, kèm ghi chú ngắn về đánh đổi. Bốn đoạn văn khiến người đọc phải tự so. Danh sách gộp làm mất liên hệ giữa công cụ và tiêu chí. JSON hợp cho phần mềm đọc, không hợp cho người đọc trong cuộc họp."
    }
   ],
   "bank": [
    {
     "q": "Claude summarizes a 60-minute steering committee meeting. Every statement in the summary is accurate, but it leaves out the committee's decision to delay the launch by two weeks. How should this problem be classified?",
     "options": [
      "A completeness problem: the summary is accurate but omits a critical item",
      "A bias problem, because one viewpoint from the discussion is overrepresented in the summary at the expense of the others",
      "A hallucination, because the summary must contain invented content somewhere",
      "A formatting problem, because the decision should have been in bold"
     ],
     "answer": 0,
     "explain": "Đúng (accuracy) và đủ (completeness) là hai phép kiểm khác nhau. Bản tóm tắt không nói sai điều gì nhưng bỏ sót quyết định quan trọng, đó là lỗi thiếu. Hallucination là nội dung sai hoặc bịa, ở đây không có. Bias là lệch góc nhìn hoặc khuôn mẫu, không phải nguyên nhân của việc bỏ sót một quyết định. Định dạng không liên quan vì quyết định hoàn toàn không xuất hiện."
    },
    {
     "q": "An events manager asked Claude for a venue proposal covering capacity, accessibility, catering options, cost, and cancellation terms. The draft is polished and persuasive. What is the MOST efficient way to check whether it is complete?",
     "options": [
      "Check the draft item by item against a list of the five required elements taken from the original request",
      "Read it once quickly and approve it if it sounds convincing",
      "Compare its page count with last year's venue proposal, which the team approved, and accept it if the two are about the same length",
      "Ask Claude whether the draft covered everything that was requested, and approve it if Claude says that it did"
     ],
     "answer": 0,
     "explain": "Cách đo độ đủ hiệu quả nhất là lập danh sách những gì bắt buộc phải có, lấy từ chính yêu cầu, rồi dò từng mục. Đọc lướt thấy thuyết phục dễ bị cuốn theo văn phong. Hỏi Claude đã đủ chưa không phải phép kiểm độc lập. Số trang không cho biết có thiếu điều khoản hủy hay không."
    },
    {
     "q": "A marketing manager has fifteen minutes to review a Claude-drafted product comparison before it goes to a client. Which elements should she check FIRST?",
     "options": [
      "Whether the transitions between paragraphs read smoothly",
      "Prices, specifications, and competitor product names",
      "The order of bullet points within each section, so that the most appealing features always appear first",
      "Whether the adjectives are varied enough to keep it engaging"
     ],
     "answer": 1,
     "explain": "Khi thời gian có hạn, ưu tiên những chi tiết dễ sai nhất và gây hậu quả lớn nhất nếu sai: con số, thông số, tên. Nội dung này gửi khách hàng, nên sai giá hay sai tên đối thủ có thể gây hại thật. Chuyển đoạn, sự đa dạng của tính từ hay thứ tự gạch đầu dòng là chuyện trau chuốt, xử lý sau nếu còn thời gian."
    },
    {
     "q": "A training coordinator asks Claude for five academic studies supporting spaced repetition. Claude lists titles, authors, journals, and years. What should she do before citing them in an internal white paper?",
     "options": [
      "Keep only the studies with the most recent years, since newer research is more likely to be accurate and is what Claude knows best",
      "Cite them as given, since the details are very specific",
      "Look up each study in a library database or the journal to confirm it exists and says what is claimed",
      "Ask Claude to add page numbers and DOIs to each reference so the list looks complete and more professional"
     ],
     "answer": 2,
     "explain": "Trích dẫn học thuật là vùng dễ bị bịa: tiêu đề, tác giả, năm có thể nghe rất thật nhưng không tồn tại. Phải tra từng nghiên cứu ở nguồn ngoài Claude. Chi tiết cụ thể không phải bằng chứng. Thêm số trang và DOI chỉ khiến trích dẫn bịa trông đáng tin hơn; DOI cũng có thể bị bịa. Năm gần đây không chứng minh nghiên cứu có thật; thông tin mới hoặc ngách còn dễ vượt ngoài hiểu biết của model hơn."
    },
    {
     "q": "In a Claude-drafted operations report, the executive summary says three warehouses missed their targets, while the detailed table lists four. What is the BEST next step?",
     "options": [
      "Ask Claude which number is right and use whichever one it picks",
      "Average the two figures and report 3.5 warehouses",
      "Use the number in the executive summary, because that is the section leadership is most likely to read carefully",
      "Treat it as an inconsistency and verify the correct number against the source operations data"
     ],
     "answer": 3,
     "explain": "Hai chỗ nói khác nhau trong cùng một output là mâu thuẫn, dấu hiệu ít nhất một chỗ sai. Cách xử lý là đối chiếu với dữ liệu gốc. Chọn số ở phần tóm tắt vì lãnh đạo đọc phần đó là chọn theo vị trí, không theo sự thật. Lấy trung bình tạo ra một con số vô nghĩa. Hỏi Claude chọn số nào không phải kiểm chứng; câu trả lời của Claude chưa phải bằng chứng."
    },
    {
     "q": "A procurement analyst asks Claude for the founding year of a small regional supplier. Each time she regenerates the answer, the year changes. What does this MOST likely indicate?",
     "options": [
      "The supplier has changed its official founding year",
      "The answer that appears most often across regenerations is the correct one",
      "The first answer is correct, since later regenerations add randomness",
      "The detail is unreliable and should be confirmed from an authoritative source, such as the supplier's official records"
     ],
     "answer": 3,
     "explain": "Docs mô tả best-of-N: chạy cùng một prompt nhiều lần và so sánh; câu trả lời không nhất quán là dấu hiệu có thể bị hallucination. Chi tiết về một công ty nhỏ, ít thông tin công khai là vùng dễ bịa. Đáp án xuất hiện nhiều nhất vẫn chưa phải bằng chứng. Năm thành lập không thay đổi. Lần trả lời đầu tiên không đáng tin hơn các lần sau."
    },
    {
     "q": "A colleague says he verified a statistic in a Claude draft by asking, 'Are you sure about this number?' Claude replied that it was confident. How should you respond?",
     "options": [
      "Suggest asking Claude to state its confidence as a percentage instead, and accept the statistic if the stated confidence is above ninety percent",
      "Explain that this is not verification and that the number must be checked against its original source",
      "Accept it, since Claude would have corrected itself if the number had been wrong, and the statistic sounds plausible",
      "Suggest asking the same question two more times to be certain"
     ],
     "answer": 1,
     "explain": "Hỏi Claude 'bạn có chắc không' không phải fact-check: Claude có thể khẳng định lại hoặc đổi ý, nhưng cả hai đều không phải bằng chứng. Kiểm chứng phải dựa vào nguồn nằm ngoài Claude. Cho rằng Claude 'sẽ tự sửa nếu sai' là tin vào giọng tự tin. Hỏi thêm hai lần hay đòi phần trăm tự tin vẫn chỉ là Claude tự đánh giá chính mình."
    },
    {
     "q": "A finance analyst sees that Claude's staffing forecast used the correct input figures but reached a total that cannot be right. She asks Claude to lay out its calculation steps and finds where it double-counted part-time staff. Which AI Fluency skill is she applying?",
     "options": [
      "Task Delegation",
      "Product Description",
      "Process Discernment",
      "Performance Discernment"
     ],
     "answer": 2,
     "explain": "Process Discernment là đánh giá cách AI đi tới kết quả, tìm lỗi logic hoặc bước lập luận sai; ở đây cô xem từng bước tính và tìm ra chỗ đếm trùng. Product Description thuộc Description (mô tả sản phẩm cần ra). Performance Discernment đánh giá cách AI cư xử trong tương tác, ví dụ phong cách giao tiếp có hợp nhu cầu không. Task Delegation là phân chia việc giữa người và AI."
    },
    {
     "q": "While brainstorming a pricing strategy, a product manager notices that Claude enthusiastically endorses every idea she proposes, even ones she now realizes conflict with each other. What is the MOST appropriate response?",
     "options": [
      "Ask Claude to critique each idea and flag conflicts between them, and judge the ideas against her own criteria",
      "Stop using Claude for strategy work entirely",
      "Switch to a lighter model, which is less likely to agree",
      "Treat the consistent agreement as confirmation that her ideas are strong"
     ],
     "answer": 0,
     "explain": "Nhận ra Claude đang chiều theo thay vì phản biện là Performance Discernment trong khung 4D; cách xử lý là chủ động yêu cầu phản biện, chỉ ra mâu thuẫn và tự đánh giá theo tiêu chí của mình. Coi sự đồng tình là xác nhận độc lập là sai: Claude đồng ý không chứng minh ý tưởng tốt. Không có cơ sở cho rằng model nhẹ hơn ít chiều theo hơn. Ngừng dùng hẳn là phản ứng quá tay."
    },
    {
     "q": "Each week a project coordinator asks Claude for a status update, and each week she manually adds the budget variance section that Claude leaves out. What is the BEST way to act on what she has noticed?",
     "options": [
      "Ask Claude to try harder next week",
      "Add the budget variance section to the prompt as a required element",
      "Keep adding it by hand, since it only takes a few minutes",
      "Switch to a different output format, such as a slide deck, which might naturally include budget information without being asked"
     ],
     "answer": 1,
     "explain": "Đây là vòng Description–Discernment: điều phát hiện khi đánh giá output (luôn thiếu phần chênh lệch ngân sách) được đưa ngược vào mô tả để prompt sau tốt hơn. Tự thêm tay mỗi tuần lặp lại công sức và dễ quên. 'Cố gắng hơn' không nói thiếu gì. Đổi định dạng không bảo đảm có phần ngân sách vì yêu cầu vẫn chưa được nêu."
    },
    {
     "q": "A global HR team asks Claude for a company-wide wellbeing calendar. The draft schedules events around U.S. holidays and assumes a Monday–Friday workweek, although staff work in twelve countries. What kind of issue is this, and what should the team do?",
     "options": [
      "A bias toward one region's norms; review the draft with input from regional teams and adjust it",
      "No issue, because U.S. holidays are a reasonable default for a global company and staff elsewhere can simply adapt the dates themselves",
      "A formatting problem; present the calendar as a table",
      "A hallucination; regenerate the calendar until a different set of holidays and workdays appears in the draft"
     ],
     "answer": 0,
     "explain": "Lịch không bịa thông tin nhưng áp chuẩn mực của một quốc gia cho nhân viên ở mười hai nước: đây là bias dạng thiếu hoặc lệch góc nhìn. Cách xử lý là rà với các nhóm khu vực bị ảnh hưởng rồi điều chỉnh. Không phải hallucination nên tạo lại ngẫu nhiên không giải quyết được. Đổi sang bảng không đổi nội dung. Coi ngày lễ Mỹ là mặc định toàn cầu chính là sự thiên lệch cần sửa."
    },
    {
     "q": "A manager uses Claude to summarize peer feedback for performance reviews. She notices the summaries call some employees' direct communication 'assertive' and others' 'abrasive,' even when the underlying comments are similar. What should she do?",
     "options": [
      "Use the summaries as written, since paraphrasing cannot introduce bias",
      "Stop collecting peer feedback",
      "Compare the summaries with the original comments, correct loaded or inconsistent wording, and keep the review judgments her own",
      "Ask Claude to make every summary more positive"
     ],
     "answer": 2,
     "explain": "Cùng một kiểu nhận xét mà mô tả khác nhau theo người là dấu hiệu bias trong ngôn ngữ, và đây là nội dung dùng cho quyết định về con người. Cần so với nhận xét gốc, sửa từ ngữ thiên lệch và giữ quyền đánh giá cho người quản lý. Cho rằng diễn đạt lại thì không thể có bias là sai; cách chọn từ chính là nơi bias xuất hiện. Làm mọi bản tích cực hơn che mất thông tin thật. Ngừng thu thập phản hồi không liên quan tới lỗi."
    },
    {
     "q": "Which Claude output MOST requires review by a qualified professional before it is used?",
     "options": [
      "A rewrite of a Slack announcement about the office holiday party",
      "A list of icebreaker questions for an internal team meeting",
      "A summary of your own notes from a vendor demo, kept for personal reference only and not shared with anyone",
      "Patient-facing instructions explaining how to adjust medication doses after a procedure"
     ],
     "answer": 3,
     "explain": "Mức duyệt tăng theo hậu quả: hướng dẫn liều thuốc gửi bệnh nhân là nội dung y tế, đối ngoại, sai có thể gây hại nghiêm trọng, nên cần người có chuyên môn duyệt. Câu hỏi làm quen, thông báo tiệc nội bộ và ghi chú cá nhân đều rủi ro thấp; người dùng tự đọc qua là đủ."
    },
    {
     "q": "A small-business owner used Claude to analyze whether certain expenses are tax-deductible. Her office manager, who has no tax background, read it and said it 'looks right.' Before filing, what is the MOST appropriate step?",
     "options": [
      "File it, since a second person has already reviewed the analysis",
      "Have a second Claude chat review the analysis independently and file the return once both chats reach the same conclusion",
      "Have a qualified tax professional review the analysis, since the reviewer must be able to judge the content",
      "Ask Claude to cite the specific official tax rules behind each conclusion and treat those citations as confirmation"
     ],
     "answer": 2,
     "explain": "Người duyệt phải đủ chuyên môn để đánh giá nội dung và chịu trách nhiệm; một người không có kiến thức thuế thấy 'có vẻ đúng' không phải là duyệt chuyên môn. Có người đọc rồi không có nghĩa đã được kiểm. Trích dẫn chỉ là địa chỉ để mở ra kiểm, bản thân nó chưa chứng minh gì. Một phiên Claude khác có thể giúp bắt lỗi nhưng không thay được người có chuyên môn đứng tên chịu trách nhiệm."
    },
    {
     "q": "A project manager has a detailed Claude-drafted risk report for her delivery team. She now needs a version for the executive committee, who will spend about two minutes on it. Which revision request is BEST?",
     "options": [
      "'Lead with overall status and the one decision we need from the committee, then the top three risks and their impact, under 200 words'",
      "'Keep every section but use bigger headings.'",
      "'Add more technical detail so the committee sees the full picture behind each risk, including task-level dependencies, owners, and dates'",
      "'Make it more executive-friendly.'"
     ],
     "answer": 0,
     "explain": "Bản cho lãnh đạo cần đưa kết luận và quyết định cần đưa ra lên đầu, giới hạn độ dài và chỉ giữ rủi ro quan trọng; yêu cầu này cụ thể đến mức Claude làm được ngay. 'Thân thiện với lãnh đạo hơn' quá mơ hồ. Giữ mọi phần chỉ đổi tiêu đề không làm báo cáo đọc được trong hai phút. Thêm chi tiết kỹ thuật đi ngược nhu cầu của người đọc."
    },
    {
     "q": "A sales operations specialist needs Claude to extract contact details from 40 event sign-up emails so she can import them into the company CRM, which expects specific columns. Which output format is MOST appropriate?",
     "options": [
      "A bulleted list grouped by email thread",
      "CSV using exactly the CRM's column names, one row per contact",
      "A slide deck with one contact per slide, so the team can review each person visually before anything is imported",
      "A narrative paragraph describing each contact"
     ],
     "answer": 1,
     "explain": "Định dạng nên theo nơi nhận: dữ liệu nhập vào phần mềm cần cấu trúc đúng cột/trường được yêu cầu, như CSV. Đoạn văn và danh sách gạch đầu dòng hợp cho người đọc nhưng phải chuyển lại bằng tay trước khi nhập. Slide không phải định dạng mà CRM nhập được."
    },
    {
     "q": "Claude returns a perfectly formatted CSV of monthly expenses that imports into the finance system without errors. What does this tell the finance associate about the data?",
     "options": [
      "That the data can be shared externally without further review, since the import process would have flagged any problems with it",
      "That the values are correct, since wrong values would have caused the import to fail",
      "That Claude cross-checked every value against typical monthly expense ranges while formatting the file",
      "Only that the structure is valid; the values still need to be checked against the source receipts"
     ],
     "answer": 3,
     "explain": "Đúng định dạng không bảo đảm đúng nội dung: hệ thống nhập kiểm cấu trúc, không biết số tiền có khớp hóa đơn hay không. Nhập thành công không phát hiện được số sai. Không có cơ sở cho rằng Claude đã đối chiếu từng giá trị, và so với 'khoảng chi phí thông thường' cũng không thay được việc so với chứng từ gốc. Chia sẻ ra ngoài khi chưa kiểm nội dung là bỏ qua bước kiểm cần thiết."
    },
    {
     "q": "Using web search, Claude answers a question about current data-protection fines in a country and cites a government page. When the analyst opens it, the page is six years old and a newer regulation has since replaced the rules it describes. What should she conclude?",
     "options": [
      "She should delete the citation and keep the answer as written",
      "The answer is correct, because Claude's web search returns only pages that are up to date and has already filtered out outdated sources",
      "The citation does not support the claim about current rules; she needs a current authoritative source",
      "The answer is correct, because it cites a government website"
     ],
     "answer": 2,
     "explain": "Help center nói câu trả lời có dùng web search luôn kèm trích dẫn để bạn tự kiểm, nhưng trích dẫn chỉ là địa chỉ để mở ra đọc. Trang đã cũ và bị thay thế nên không hỗ trợ khẳng định về quy định hiện hành. Tên miền chính phủ không bảo đảm thông tin còn hiệu lực. Không có cơ sở cho rằng web search chỉ trả về trang mới nhất. Xóa trích dẫn mà giữ câu trả lời là che đi bằng chứng cho thấy câu trả lời có thể sai."
    },
    {
     "q": "An IT helpdesk lead asks Claude to answer staff questions using the company's attached laptop policy. Some answers mix in general advice from other organizations' policies that contradicts company rules. Which prompt change BEST addresses this?",
     "options": [
      "Ask Claude to label which answers come from general knowledge, but keep including that advice so staff get a complete answer to every question",
      "Instruct Claude to answer only from the attached policy and to say when the policy does not cover a question",
      "Ask Claude to combine the attached policy with general industry best practices so that staff receive fuller answers",
      "Ask for shorter answers"
     ],
     "answer": 1,
     "explain": "Docs về giảm hallucination nêu kỹ thuật giới hạn nguồn (chỉ dùng tài liệu được cung cấp, không dùng kiến thức chung) và cho phép Claude nói không biết. Kết hợp với 'best practice ngành' chính là mời nội dung ngoài chính sách vào. Câu trả lời ngắn hơn vẫn có thể lẫn kiến thức chung. Gắn nhãn mà vẫn giữ lời khuyên chung thì nhân viên vẫn nhận thông tin trái quy định công ty."
    },
    {
     "q": "A communications manager has three Claude drafts of a change announcement. At the start she set criteria: under 250 words, states the effective date, explains why, and lists who to contact. How should she choose?",
     "options": [
      "Score each draft against the four criteria and pick the one that meets them, editing any gaps",
      "Pick the draft that sounds most impressive",
      "Ask three colleagues which draft they like and go with the majority, without discussing the criteria, so that the choice stays objective",
      "Pick the longest draft, since it probably covers the most"
     ],
     "answer": 0,
     "explain": "Khi có nhiều bản nháp, đối chiếu với tiêu chí đặt từ đầu thay vì chọn theo cảm giác. Bản nghe ấn tượng nhất có thể thiếu ngày hiệu lực. Bản dài nhất có thể vượt giới hạn 250 chữ. Bỏ phiếu theo sở thích mà không dựa vào tiêu chí không hề khách quan, và người chọn bản cuối vẫn là người chịu trách nhiệm."
    },
    {
     "q": "Claude translated a product safety notice from English into Japanese for a distributor. No one on the team reads Japanese. What is the MOST appropriate step before the notice is published?",
     "options": [
      "Ask Claude to translate it back into English and publish if that reads correctly",
      "Publish it, since Claude handles Japanese well",
      "Ask Claude whether its translation contains any errors",
      "Have a qualified Japanese speaker with product knowledge review the translation, especially the safety terms"
     ],
     "answer": 3,
     "explain": "Thông báo an toàn đối ngoại, và nhóm không tự đánh giá được bản dịch: cần người có chuyên môn (đọc được tiếng Nhật, hiểu sản phẩm) duyệt, nhất là thuật ngữ an toàn. Dịch ngược bằng chính Claude có thể gợi ý vấn đề nhưng không phải kiểm độc lập; lỗi sắc thái hoặc thuật ngữ có thể bị che khi dịch ngược. Đăng luôn là bỏ qua bước duyệt. Hỏi Claude tự kiểm lỗi không phải kiểm chứng."
    },
    {
     "q": "Claude analyzed an uploaded sales spreadsheet and reported regional totals and growth rates for a board slide. What is the MOST practical way for the analyst to verify the figures?",
     "options": [
      "Recalculate a sample of the totals and growth rates in the spreadsheet and compare",
      "Check that the numbers are formatted consistently",
      "Ask Claude to explain its method and accept the figures if the explanation sounds reasonable",
      "Ask Claude to round all the figures, which reduces the chance of visible errors on the slide"
     ],
     "answer": 0,
     "explain": "Con số đưa lên slide cho hội đồng quản trị phải đối chiếu với nguồn: tính lại một mẫu ngay trên bảng tính là phép kiểm độc lập và thực tế. Định dạng nhất quán không nói gì về độ đúng. Lời giải thích nghe hợp lý không chứng minh phép tính đúng; vẫn phải so với dữ liệu. Làm tròn chỉ che lỗi chứ không sửa lỗi."
    },
    {
     "q": "A nonprofit's development officer is reviewing a Claude-drafted grant proposal under time pressure. Which TWO elements should be verified FIRST? (Choose TWO.)",
     "options": [
      "The choice of synonyms in the introduction",
      "The order of the proposal's sections",
      "Whether the draft uses active voice consistently",
      "Names and titles of the contacts at partner organizations",
      "Statistics about community need and the sources they are attributed to"
     ],
     "answer": [
      3,
      4
     ],
     "explain": "Số liệu kèm nguồn và tên, chức danh người thật là những vùng dễ bị bịa nhất và gây hậu quả lớn nếu sai trong hồ sơ xin tài trợ. Thứ tự các phần, câu chủ động và từ đồng nghĩa là chuyện trình bày, sai cũng không gây hại; kiểm sau nếu còn thời gian."
    },
    {
     "q": "A team is adopting Anthropic's guidance on reducing hallucinations. Which TWO statements are accurate? (Choose TWO.)",
     "options": [
      "These techniques reduce hallucinations but do not eliminate them, so critical information still needs validation",
      "Once a prompt tells Claude to cite sources, any cited claim can be treated as verified",
      "Explicitly allowing Claude to say it doesn't know can drastically reduce false information",
      "If Claude gives the same answer twice in a row, the answer is confirmed correct",
      "Restricting Claude to provided documents removes the need for human review of high-stakes outputs"
     ],
     "answer": [
      0,
      2
     ],
     "explain": "Docs về giảm hallucination nói cho phép Claude thừa nhận không chắc có thể giảm mạnh thông tin sai, và nhấn mạnh các kỹ thuật này giảm đáng kể nhưng không loại bỏ hoàn toàn hallucination, nên thông tin quan trọng vẫn phải kiểm. Trích dẫn giúp output kiểm được chứ không tự chứng minh. Hai lần trả lời giống nhau không phải bằng chứng; best-of-N chỉ giúp phát hiện mâu thuẫn. Giới hạn nguồn là một kỹ thuật giảm rủi ro, không thay được người duyệt cho quyết định quan trọng."
    },
    {
     "q": "A support director wants to turn an internal engineering postmortem into a notice for affected customers. Which TWO revision instructions are MOST appropriate? (Choose TWO.)",
     "options": [
      "Make the notice longer so it appears more thorough",
      "Include the full log-level timeline with server timestamps",
      "Keep the internal discussion of which team caused the outage, for transparency",
      "Focus on how customers were affected, what has been fixed, and what they need to do, if anything",
      "Remove internal system names and engineering jargon, and explain the issue in plain language"
     ],
     "answer": [
      3,
      4
     ],
     "explain": "Bản cho khách cần đổi độ sâu kỹ thuật và cấu trúc theo người đọc: ngôn ngữ dễ hiểu, không có tên hệ thống nội bộ; tập trung vào ảnh hưởng, những gì đã khắc phục và khách cần làm gì. Tranh luận nội bộ về đội gây lỗi và dòng thời gian cấp log là chi tiết nội bộ, không phục vụ khách hàng. Dài hơn không có nghĩa là tốt hơn cho người đọc."
    }
   ]
  },
  {
   "id": "d3",
   "name": "Product and Model Selection",
   "weight": 12,
   "intro": "<p>Domain này hỏi bạn <strong>chọn đúng công cụ cho việc</strong>: chat thường, Project, Research hay artifact; Haiku, Sonnet hay Opus khi cân chi phí, tốc độ và chất lượng; và xử lý giới hạn context: khi nào mở chat mới, khi nào tóm tắt, khi nào lưu lại.</p><p>Ranh giới: D3 hỏi <em>có nên</em> dùng Project hay không; cách viết instructions, chọn knowledge, chia sẻ Project là D5. Đề dùng từ vựng Haiku, Sonnet, Opus; docs hiện nay còn có tầng Fable, được nhắc ngắn trong bài.</p>",
   "lessons": [
    {
     "id": "l-3-0",
     "title": "Nền tảng D3: bốn quyết định trước khi gõ prompt (nơi dùng, tính năng, model, context)",
     "minutes": 12,
     "html": "<p>Khóa \"Claude Platform &amp; Model Foundations\" trong lộ trình ôn Associate mở đầu bằng một ý: trước khi viết prompt, bạn đã đưa ra bốn quyết định đặt <strong>mức trần chất lượng</strong> cho cả phiên làm việc. Bốn quyết định đó là <strong>nơi dùng (entry point)</strong>, <strong>tính năng (capability features)</strong>, <strong>model</strong> và <strong>context</strong>. Domain 3 hỏi đúng bốn quyết định này. Bài này dựng bản đồ; các bài sau đi vào từng quyết định.</p>\n<h4>Quyết định 1: dùng Claude ở đâu</h4>\n<p>Với người dùng văn phòng, Claude có trên web (claude.ai), ứng dụng Claude Desktop và Claude Mobile. Các tính năng chính có mặt ở cả ba, nhưng không hoàn toàn giống nhau. Ví dụ help center về Research ghi: Research chạy được trên web, Desktop và Mobile, nhưng Research khởi chạy từ Mobile chỉ tìm trên web và không dùng connector. Bài học: khi một tính năng \"không chạy như mong đợi\", nơi dùng cũng là một biến cần xét.</p>\n<p>Gói tài khoản cũng quyết định bạn có gì. Các gói cá nhân gồm Free và các gói trả phí (Pro, Max…); gói tổ chức gồm Team và Enterprise, nơi admin bật hoặc tắt tính năng cho cả tổ chức. Nhiều tính năng chỉ có ở gói trả phí, ví dụ Research và RAG cho Project; chia sẻ Project chỉ có ở Team và Enterprise.</p>\n<h4>Quyết định 2: dùng tính năng nào</h4>\n<table>\n<thead><tr><th>Tính năng</th><th>Là gì, nói ngắn</th></tr></thead>\n<tbody>\n<tr><td>Chat thường</td><td>Một cuộc hội thoại độc lập, hợp cho việc một lần</td></tr>\n<tr><td>Project</td><td>Không gian riêng có lịch sử chat, knowledge và instructions riêng</td></tr>\n<tr><td>Research</td><td>Nhiều lượt tìm nối tiếp nhau để điều tra sâu một câu hỏi</td></tr>\n<tr><td>Artifact</td><td>Sản phẩm Claude tạo ra mở cạnh chat để chỉnh, quay lại và chia sẻ</td></tr>\n<tr><td>Năng lực bổ trợ</td><td>Web search, tạo file, Skills, connector, thinking và effort (bài l-3-4)</td></tr>\n</tbody>\n</table>\n<h4>Quyết định 3: dùng model nào</h4>\n<p>Exam guide dùng ba tên Haiku, Sonnet, Opus. Docs hiện ghi thêm tầng Fable mạnh nhất và nặng hạn mức nhất (tháng 11/2026). Ba trục để cân là <strong>chất lượng</strong> (độ sâu lập luận), <strong>tốc độ</strong> và <strong>chi phí</strong> (trong app là hạn mức bị trừ). Hướng dẫn chọn model cho người dùng app của Anthropic: không chắc thì bắt đầu với Sonnet. Bạn đổi model được giữa chừng; help center ghi thay đổi áp dụng từ câu trả lời tiếp theo.</p>\n<h4>Quyết định 4: quản lý context</h4>\n<ul>\n<li><strong>Token</strong>: đơn vị model dùng để đo văn bản; một token thường ngắn hơn một từ.</li>\n<li><strong>Context window</strong>: lượng token Claude \"nhìn thấy\" cùng lúc trong một cuộc chat, gồm tin nhắn, câu trả lời, file, instructions, knowledge và kết quả công cụ. Help center hiện ghi, trên gói trả phí: 1 triệu token với các model mới nhất, 500K với một số model cũ hơn, và 200K (khoảng 500 trang văn bản) với model không có trong danh sách (tháng 11/2026).</li>\n<li><strong>Hai loại giới hạn</strong>: help center phân biệt <em>usage limit</em> (bạn dùng được bao nhiêu trong một khoảng thời gian) và <em>length limit</em> (một cuộc chat dài được bao nhiêu, gắn với context window).</li>\n<li><strong>Thứ được giữ giữa các chat</strong>: Project knowledge và instructions, memory, chat search (gói trả phí). Ngoài các cơ chế này, một chat không thấy nội dung của chat khác.</li>\n</ul>\n<h4>Bốn quyết định ảnh hưởng nhau</h4>\n<p>Ví dụ: một chuyên viên pháp chế cần so 40 hợp đồng với mẫu chuẩn mỗi tháng. Nơi dùng: web hoặc Desktop để tải file. Tính năng: Project, vì làm lặp lại trên cùng bộ mẫu chuẩn và cùng chỉ dẫn. Model: Sonnet cho việc trích điều khoản; lên tầng cao hơn cho vài hợp đồng phức tạp nếu Sonnet chưa đạt. Context: để mẫu chuẩn trong knowledge, mỗi hợp đồng một chat thay vì dồn 40 hợp đồng vào một chat.</p>\n<h4>Bài nào trong Domain 3 đụng vào phần nào</h4>\n<table>\n<thead><tr><th>Bài</th><th>Nội dung chính</th><th>Quyết định</th></tr></thead>\n<tbody>\n<tr><td>l-3-0 (bài này)</td><td>Bốn quyết định, nơi dùng, gói, từ vựng context</td><td>Toàn cảnh</td></tr>\n<tr><td>l-3-1 Chọn tính năng</td><td>Chat, Project, Research, artifact; bảng quyết định nhanh</td><td>2</td></tr>\n<tr><td>l-3-2 Haiku, Sonnet, Opus</td><td>Đặc điểm từng tầng, cách chọn, effort, chi phí tương đối</td><td>3</td></tr>\n<tr><td>l-3-3 Context có hạn</td><td>Chat mới, tóm tắt hay lưu lại; memory, chat search, incognito</td><td>4</td></tr>\n<tr><td>l-3-4 Bật thêm năng lực trong chat</td><td>Web search, tạo file, Skills, connector, thinking và effort: khi nào bật, khi nào tắt</td><td>2 (và 3)</td></tr>\n</tbody>\n</table>\n<div class=\"tip\">Khi đọc câu hỏi D3, gạch chân chi tiết thuộc từng quyết định: \"mỗi tuần, cả nhóm\" (tính năng), \"hàng nghìn yêu cầu ngắn, cần nhanh\" (model), \"chat đã rất dài\" (context), \"trên điện thoại\" (nơi dùng). Đáp án đúng khớp với chi tiết đó, không phải phương án mạnh nhất.</div>\n<div class=\"warn\">Tên gói, tên model và con số context thay đổi nhanh. Đề chấm theo từ vựng của exam guide; hãy nắm logic chọn, còn con số thì kiểm lại trên help center khi cần.</div>",
     "keypoints": [
      "Bốn quyết định trước khi prompt: nơi dùng, tính năng, model, context; chúng đặt mức trần chất lượng của phiên.",
      "Nơi dùng và gói ảnh hưởng tính năng: ví dụ Research từ Mobile chỉ tìm web; Research và RAG Project chỉ có ở gói trả phí.",
      "Model cân chất lượng, tốc độ, chi phí; không chắc thì Sonnet; đổi model giữa chừng áp dụng từ câu trả lời tiếp theo.",
      "Usage limit (dùng bao nhiêu trong một khoảng thời gian) khác length limit (một chat dài được bao nhiêu).",
      "Context window trên gói trả phí hiện là 1M token với model mới nhất, 500K với một số model cũ hơn, 200K với model không có trong danh sách (tháng 11/2026)."
     ],
     "sources": [
      {
       "t": "Claude Platform & Model Foundations (Claude Associate path)",
       "u": "https://anthropic-partners.skilljar.com/path/claude-associate/claude-platform-model-foundations"
      },
      {
       "t": "Using Research on Claude",
       "u": "https://support.claude.com/en/articles/11088861-using-research-on-claude-ai"
      },
      {
       "t": "Choosing the right Claude model",
       "u": "https://academy.claude.com/tutorials/choosing-the-right-claude-model"
      },
      {
       "t": "How large is the context window on paid Claude plans?",
       "u": "https://support.claude.com/en/articles/8606394-how-large-is-the-context-window-on-paid-claude-plans"
      },
      {
       "t": "How do usage and length limits work?",
       "u": "https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work"
      },
      {
       "t": "Using extended thinking",
       "u": "https://support.claude.com/en/articles/10574485-using-extended-thinking"
      },
      {
       "t": "Project visibility and sharing",
       "u": "https://support.claude.com/en/articles/9519189-project-visibility-and-sharing"
      }
     ]
    },
    {
     "id": "l-3-1",
     "title": "Chọn tính năng: chat, Project, Research hay artifact",
     "minutes": 11,
     "html": "<p>Nguyên tắc chung: <strong>mặc định dùng chat thường</strong>, chỉ nâng lên tính năng khác khi có lý do cụ thể: cần bối cảnh dùng lại nhiều lần, cần tìm kiếm sâu trên nhiều nguồn, hoặc cần một sản phẩm để lưu và chỉnh tiếp.</p>\n<h4>Chat thường</h4>\n<p>Hợp cho việc một lần: hỏi nhanh, soạn một email, giải thích một khái niệm, phân tích một file vừa đính kèm. Nếu cần thông tin mới trên mạng, bật web search: help center nói mỗi câu trả lời có dùng web search đều kèm trích dẫn để bạn kiểm.</p>\n<h4>Project</h4>\n<p>Help center định nghĩa Project là không gian làm việc riêng, có <strong>lịch sử chat riêng và knowledge base riêng</strong>, cộng với project instructions áp dụng cho mọi chat trong Project. Dùng khi:</p>\n<ul>\n<li>Việc <strong>lặp lại</strong> trên cùng bộ tài liệu (sổ tay sản phẩm, chính sách nhân sự, hồ sơ một khách hàng).</li>\n<li>Bạn muốn mọi cuộc chat đều theo cùng một vai, giọng văn, quy trình mà không phải dán lại.</li>\n<li>Cả nhóm cần dùng chung bối cảnh (chia sẻ Project có trên gói Team và Enterprise).</li>\n</ul>\n<p>Lưu ý: các chat trong cùng Project không dùng chung context window. Claude chỉ biết nội dung chat khác qua project memory (nếu memory đang bật) hoặc khi bạn yêu cầu tìm lại chat cũ trong Project (gói trả phí). Thứ gì mọi chat chắc chắn cần biết nên nằm trong knowledge hoặc instructions.</p>\n<h4>Research</h4>\n<p>Exam guide gọi là \"research mode\"; trong app tính năng tên là <strong>Research</strong> (bật ở nút \"+\"). Khác với web search trong chat (tìm vài lượt cho một câu hỏi), Research chạy <strong>nhiều lượt tìm nối tiếp nhau</strong>, dựa vào kết quả trước để chọn hướng tìm tiếp, xử lý từng câu hỏi mở, và có thể tìm cả trong các công cụ đã kết nối như Google Workspace. Help center ghi: dành cho gói trả phí, cần bật web search, và tiêu hao hạn mức nhanh hơn chat thường.</p>\n<p>Dùng khi câu hỏi rộng, cần tổng hợp nhiều nguồn (phân tích thị trường, tổng quan quy định của một ngành). Không cần cho câu hỏi tra cứu một dữ kiện.</p>\n<h4>Artifact</h4>\n<p>Artifact là nội dung Claude tạo ra mở ở khung bên cạnh chat để xem, chỉnh, quay lại và chia sẻ: tài liệu, slide, sơ đồ, dashboard, trang web một trang, công cụ tương tác nhỏ. Help center nói Claude tạo artifact khi nội dung đáng kể, độc lập và có khả năng được dùng lại. Dùng khi kết quả là <strong>một sản phẩm</strong> bạn sẽ tiếp tục chỉnh hoặc gửi cho người khác, không phải một câu trả lời đọc xong là xong.</p>\n<h4>Bảng quyết định nhanh</h4>\n<table>\n<thead><tr><th>Tình huống</th><th>Chọn</th></tr></thead>\n<tbody>\n<tr><td>Hỏi nhanh một lần, có hoặc không có file</td><td>Chat</td></tr>\n<tr><td>Cần dữ kiện mới, có nguồn</td><td>Chat + web search</td></tr>\n<tr><td>Câu hỏi rộng, tổng hợp nhiều nguồn, báo cáo có trích dẫn</td><td>Research</td></tr>\n<tr><td>Làm đi làm lại trên cùng tài liệu và chỉ dẫn, hoặc cả nhóm dùng chung</td><td>Project</td></tr>\n<tr><td>Kết quả là tài liệu/slide/công cụ cần chỉnh tiếp và chia sẻ</td><td>Artifact</td></tr>\n</tbody>\n</table>\n<p>Các tính năng kết hợp được: bạn có thể chạy Research trong một Project, và kết quả viết thành artifact.</p>\n<div class=\"tip\">Câu hỏi D3 thường có một chi tiết quyết định: \"mỗi tuần\", \"cả nhóm\", \"cùng bộ tài liệu\" → Project; \"nhiều nguồn\", \"tổng quan\", \"báo cáo có trích dẫn\" → Research; \"chỉnh tiếp\", \"chia sẻ\", \"dashboard\" → artifact. Không có chi tiết nào như vậy → chat thường là đủ.</div>\n<div class=\"warn\">Đừng chọn tính năng nặng nhất \"cho chắc\". Research cho một câu tra cứu đơn giản chỉ tốn thời gian và hạn mức; Project cho một việc làm một lần là thừa.</div>",
     "keypoints": [
      "Mặc định dùng chat thường; chỉ nâng lên tính năng khác khi có lý do cụ thể.",
      "Project: lịch sử chat + knowledge + instructions riêng; hợp việc lặp lại, cùng tài liệu, dùng chung nhóm.",
      "Research: nhiều lượt tìm nối tiếp, tổng hợp nhiều nguồn; gói trả phí, cần web search, tốn hạn mức hơn.",
      "Artifact: sản phẩm độc lập để chỉnh, dùng lại, chia sẻ.",
      "Chat trong cùng Project không dùng chung context; thứ mọi chat đều cần nên nằm trong knowledge/instructions (project memory và chat search chỉ bổ trợ)."
     ],
     "sources": [
      {
       "t": "What are projects?",
       "u": "https://support.claude.com/en/articles/9517075-what-are-projects-and-how-do-i-use-them"
      },
      {
       "t": "Using Research on Claude",
       "u": "https://support.claude.com/en/articles/11088861-using-research-on-claude-ai"
      },
      {
       "t": "What are artifacts?",
       "u": "https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them"
      },
      {
       "t": "Enabling and using web search",
       "u": "https://support.claude.com/en/articles/10684626-enabling-and-using-web-search"
      }
     ]
    },
    {
     "id": "l-3-2",
     "title": "Haiku, Sonnet, Opus: cân chi phí, tốc độ và chất lượng",
     "minutes": 10,
     "html": "<p>Claude có nhiều tầng model trong cùng một họ. Tầng nào cũng viết tốt và đọc được file; khác biệt thật sự nằm ở <strong>độ khó của việc</strong>, <strong>tốc độ cần có</strong> và <strong>hạn mức/chi phí</strong>.</p>\n<h4>Ba tầng trong exam guide</h4>\n<table>\n<thead><tr><th>Tầng</th><th>Đặc điểm</th><th>Hợp với</th></tr></thead>\n<tbody>\n<tr><td><strong>Haiku</strong></td><td>Nhanh nhất, nhẹ nhất về hạn mức và chi phí</td><td>Trả lời nhanh, phân loại, trích xuất thông tin, tóm tắt đơn giản, việc khối lượng lớn và lặp lại</td></tr>\n<tr><td><strong>Sonnet</strong></td><td>Cân bằng giữa năng lực và tốc độ</td><td>Phần lớn việc hằng ngày: viết, phân tích, code, research, quy trình nhiều bước</td></tr>\n<tr><td><strong>Opus</strong></td><td>Suy luận sâu nhất trong ba tầng, chậm hơn, tốn hạn mức hơn</td><td>Việc phức tạp, chuyên sâu, cần suy luận nhiều bước; việc mà Sonnet làm chưa đạt</td></tr>\n</tbody>\n</table>\n<p>Docs hiện nay còn có <strong>Fable</strong>: hướng dẫn chọn model cho người dùng app mô tả đây là model mạnh nhất, tiêu hạn mức nhiều nhất, dành cho việc dài và quan trọng nhất; Fable nghĩ kỹ trước khi trả lời nên phản hồi lâu hơn (tháng 11/2026). Đề viết theo exam guide nên vẫn dùng ba tên Haiku, Sonnet, Opus; logic chọn không đổi.</p>\n<h4>Hướng dẫn chọn</h4>\n<ul>\n<li><strong>Không chắc thì bắt đầu với tầng giữa (Sonnet)</strong>. Hướng dẫn chọn model của Anthropic cho người dùng app (Claude Academy) nói như vậy. Tài liệu API cho developer thì ghi phần lớn workload bắt đầu với Opus; đề Associate hỏi theo góc người dùng app.</li>\n<li><strong>Việc đơn giản, cần nhanh, khối lượng lớn → Haiku</strong>. Ví dụ: gắn nhãn 2.000 phản hồi khách hàng vào 5 nhóm, trả lời câu hỏi thường gặp ngắn.</li>\n<li><strong>Tầng giữa làm chưa đạt sau khi prompt đã tốt → lên Opus</strong>. Dùng tầng nặng cho việc tầng nhẹ làm được chỉ tốn hạn mức mà không thêm lợi ích.</li>\n<li><strong>Một lô có cả việc dễ lẫn việc khó → chia lô</strong>: phần đơn giản cho tầng nhẹ, phần khó cho tầng nặng.</li>\n<li><strong>Thử trên việc thật</strong>: chạy vài mẫu thật bằng hai tầng rồi so theo tiêu chí, thay vì đoán.</li>\n</ul>\n<h4>Thử chỉnh effort trước khi đổi model</h4>\n<p>Trong app có thiết lập <strong>effort</strong> (mức độ suy nghĩ: Low, Medium, High…). Effort cao hơn thì kỹ hơn nhưng chậm hơn và tốn hạn mức hơn. Docs chọn model của Anthropic nhận xét: chỉnh effort thường là đòn bẩy tốt hơn đổi model. Việc thường ngày giữ mặc định; cần nhanh thì hạ; bài khó thì nâng.</p>\n<h4>Chi phí trong app và trên API</h4>\n<p>Người dùng app không trả tiền theo token; tầng nặng tiêu hạn mức nhanh hơn. Trên API, bảng giá theo token tăng dần từ Haiku tới Sonnet tới Opus, nên tỉ lệ đó cho bạn hình dung chi phí tương đối. Đề không yêu cầu nhớ giá.</p>\n<div class=\"tip\">Mẫu câu hỏi phổ biến: một nhóm cần xử lý số lượng lớn yêu cầu ngắn, đơn giản và cần phản hồi nhanh → tầng nhanh, chi phí thấp (Haiku). Một phân tích phức tạp mà Sonnet đã làm chưa tốt dù prompt đầy đủ → Opus.</div>\n<div class=\"warn\">\"Luôn dùng model mạnh nhất\" là bẫy. Nó chậm hơn, tốn hạn mức hơn, và không sửa được prompt thiếu bối cảnh. Nếu output kém vì prompt mơ hồ, đổi model không phải đáp án.</div>",
     "keypoints": [
      "Haiku: nhanh, nhẹ, việc đơn giản và khối lượng lớn. Sonnet: mặc định cân bằng. Opus: việc phức tạp, suy luận sâu.",
      "Không chắc thì bắt đầu Sonnet; lên Opus khi Sonnet chưa đạt dù prompt đã tốt.",
      "Tầng nặng cho việc nhẹ chỉ tốn hạn mức, không thêm lợi ích; lô hỗn hợp thì chia theo độ khó.",
      "Chỉnh effort thường là đòn bẩy tốt hơn đổi model.",
      "Docs hiện có thêm Fable là tầng nặng nhất; đề dùng từ vựng Haiku/Sonnet/Opus."
     ],
     "sources": [
      {
       "t": "Choosing the right Claude model (Claude Academy)",
       "u": "https://academy.claude.com/tutorials/choosing-the-right-claude-model"
      },
      {
       "t": "Choosing a model",
       "u": "https://platform.claude.com/docs/en/about-claude/models/choosing-a-model"
      },
      {
       "t": "Models overview",
       "u": "https://platform.claude.com/docs/en/models/overview"
      },
      {
       "t": "Using extended thinking (effort)",
       "u": "https://support.claude.com/en/articles/10574485-using-extended-thinking"
      }
     ]
    },
    {
     "id": "l-3-3",
     "title": "Context có hạn: mở chat mới, tóm tắt hay lưu lại",
     "minutes": 11,
     "html": "<p><strong>Context window</strong> là lượng thông tin Claude có thể \"nhìn thấy\" cùng lúc trong một cuộc trò chuyện, tính bằng token. Nó chứa tất cả: tin nhắn của bạn, câu trả lời của Claude, file đính kèm, project instructions, knowledge được nạp, kết quả của web search và connector. Một phần context được giữ chỗ cho câu trả lời, nên cuộc chat dài nhất ngắn hơn con số của context window một chút.</p>\n<p>Help center hiện liệt kê context window trên gói trả phí: 1 triệu token với các model mới nhất, 500K với một số model cũ hơn, và 200K với model không có trong danh sách (tháng 11/2026). Con số này thay đổi theo model, nên điều cần hiểu là <em>khái niệm</em>: context có hạn, và nhiều hơn chưa chắc tốt hơn.</p>\n<h4>Vì sao chat dài không miễn phí</h4>\n<ul>\n<li><strong>Tốn hạn mức</strong>: help center liệt kê độ dài cuộc trò chuyện là một trong những yếu tố tiêu hao usage; mỗi lượt mới phải xử lý cả phần lịch sử.</li>\n<li><strong>Nhiễu</strong>: các hướng đã bỏ, những hiểu nhầm cũ vẫn nằm trong context và có thể kéo câu trả lời lệch.</li>\n<li><strong>Chạm giới hạn</strong>: trên gói trả phí có bật code execution, Claude tự động tóm tắt các tin nhắn cũ khi gần đầy để cuộc chat tiếp tục được (lịch sử đầy đủ vẫn được giữ), nhưng việc này cũng tốn thêm usage. Khi chạm giới hạn độ dài, help center khuyên mở cuộc trò chuyện mới hoặc dùng Project.</li>\n</ul>\n<h4>Ba lựa chọn</h4>\n<table>\n<thead><tr><th>Tình huống</th><th>Làm gì</th></tr></thead>\n<tbody>\n<tr><td>Chuyển sang chủ đề khác; chat lạc hướng; một hiểu nhầm cũ cứ quay lại</td><td><strong>Mở chat mới</strong></td></tr>\n<tr><td>Việc vẫn tiếp tục nhưng chat đã rất dài</td><td><strong>Tóm tắt rồi chuyển</strong>: nhờ Claude viết bản tóm tắt bàn giao (mục tiêu, quyết định đã chốt, việc còn lại, dữ kiện quan trọng), bạn kiểm lại, rồi dán vào chat mới</td></tr>\n<tr><td>Thông tin sẽ cần đi cần lại ở nhiều chat</td><td><strong>Lưu lại</strong>: đưa vào Project knowledge hoặc instructions, lưu thành artifact, hoặc để Memory ghi nhớ sở thích cá nhân</td></tr>\n</tbody>\n</table>\n<h4>Cái gì được nhớ giữa các chat</h4>\n<ul>\n<li><strong>Memory</strong>: Claude dần ghi nhớ thông tin về bạn theo từng chủ đề khi trò chuyện; bạn xem, sửa, xóa được. Mỗi Project có memory riêng, không lẫn sang Project khác.</li>\n<li><strong>Chat search</strong> (gói trả phí): khi bạn yêu cầu, Claude tìm lại nội dung trong các chat cũ; không vượt qua ranh giới Project.</li>\n<li><strong>Incognito chat</strong>: không lưu vào lịch sử, không vào memory, không được tìm lại; dùng cho câu hỏi một lần không muốn để lại dấu vết trong memory.</li>\n</ul>\n<div class=\"tip\">Câu hỏi kiểu \"chat đã rất dài, câu trả lời bắt đầu bỏ qua chỉ dẫn đầu tiên, việc vẫn chưa xong\" → tóm tắt những gì đã chốt và tiếp tục ở chat mới. Nếu chỉ dẫn đó dùng cho mọi chat về sau → đưa vào Project instructions.</div>\n<div class=\"warn\">Đừng dồn mọi thứ vào một chat \"để Claude nhớ hết\". Context lớn không thay được tổ chức thông tin; dữ liệu cần dùng lâu dài thuộc về Project hoặc artifact, không thuộc về một cuộc chat dài bất tận.</div>",
     "keypoints": [
      "Context window chứa mọi thứ: tin nhắn, câu trả lời, file, instructions, knowledge, kết quả tool.",
      "Chat dài tốn usage hơn, nhiều nhiễu hơn; gói trả phí có tự động tóm tắt khi gần đầy nhưng cũng tốn usage.",
      "Đổi chủ đề hoặc lạc hướng → chat mới. Việc dài → tóm tắt bàn giao rồi chuyển. Dùng lại nhiều lần → lưu vào Project/artifact.",
      "Memory theo chủ đề, có memory riêng cho từng Project; chat search (trả phí) không vượt ranh giới Project.",
      "Incognito: không lưu lịch sử, không vào memory, không được tìm lại."
     ],
     "sources": [
      {
       "t": "How large is the context window on paid Claude plans?",
       "u": "https://support.claude.com/en/articles/8606394-how-large-is-the-context-window-on-paid-claude-plans"
      },
      {
       "t": "How do usage and length limits work?",
       "u": "https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work"
      },
      {
       "t": "Chat search and memory",
       "u": "https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context"
      },
      {
       "t": "Use incognito chats",
       "u": "https://support.claude.com/en/articles/12260368-use-incognito-chats"
      }
     ]
    },
    {
     "id": "l-3-4",
     "title": "Bật thêm năng lực trong chat: web search, tạo file, Skills, connector, thinking và effort",
     "minutes": 11,
     "html": "<p>Ngoài chọn chat, Project, Research hay artifact (l-3-1), trong mỗi cuộc chat bạn còn quyết định bật những năng lực nào. Mỗi năng lực giải một loại nhu cầu, và hầu hết đều tốn thêm hạn mức hoặc context. Nguyên tắc giống bài l-3-1: bật khi việc cần, tắt khi không.</p>\n<h4>Web search: khi cần thông tin mới</h4>\n<p>Help center mô tả web search giúp Claude lấy thông tin cập nhật trên internet, và mỗi câu trả lời dùng web search đều kèm trích dẫn để bạn tự kiểm. Bật khi câu hỏi phụ thuộc vào thông tin sau mốc kiến thức của model (giá, quy định mới, tin tức). Không cần khi bạn chỉ làm việc trên tài liệu đã đưa vào. Docs hiện ghi (tháng 11/2026): ở giao diện chuẩn, bật qua nút \"+\" rồi chọn Web search; ở trải nghiệm Claude mới thì không có công tắc. Trên Team và Enterprise, Owner phải bật cho tổ chức trước. Web search tính vào hạn mức.</p>\n<h4>Tạo và chỉnh file</h4>\n<p>Với cài đặt tạo file (tên cũ \"Code execution and file creation\", bố cục mới là \"Create and edit files\"), Claude chạy code trong môi trường riêng để tạo và chỉnh file Excel, PowerPoint, Word, PDF, cùng biểu đồ PNG và file CSV. Dùng khi sản phẩm cuối phải là một file mở được trong công cụ quen thuộc. Help center ghi tạo file tốn hạn mức nhiều hơn chat thường, và cảnh báo rủi ro prompt injection: hướng dẫn độc hại giấu trong file hay trang web bên ngoài có thể lừa Claude. Vì vậy chỉ đưa vào file từ nguồn bạn tin, và theo dõi khi Claude làm việc.</p>\n<h4>Skills: quy trình chuyên biệt nạp khi cần</h4>\n<p>Help center định nghĩa Skills là các thư mục chứa chỉ dẫn, script và tài nguyên mà Claude nạp khi việc cần tới, giúp làm nhất quán những việc chuyên biệt lặp lại. So sánh trong help center: Project cung cấp kiến thức nền luôn được nạp trong Project đó; Skills chỉ kích hoạt khi liên quan và dùng được ở mọi nơi; custom instructions áp cho mọi cuộc chat. Có Skills do Anthropic làm (ví dụ tạo file Excel, Word, PowerPoint, PDF, Claude tự gọi khi liên quan), Skills của đối tác, và Skills tự tạo cho quy trình riêng như áp hướng dẫn thương hiệu. Skills cần bật code execution.</p>\n<h4>Connector: lấy dữ liệu từ ứng dụng của bạn</h4>\n<p>Connector cho Claude truy cập ứng dụng như Google Drive, Gmail, Calendar để lấy dữ liệu và thực hiện hành động, theo đúng quyền của bạn trong ứng dụng đó (chi tiết cấu hình thuộc D5). Ở góc độ chọn công cụ: bật connector cho chat cần dữ liệu đó. Help center về context window khuyên giới hạn số công cụ và connector đang bật vì chúng tốn nhiều token.</p>\n<h4>Thinking và effort: Claude nghĩ kỹ tới đâu</h4>\n<ul>\n<li><strong>Thinking</strong> cho Claude thêm thời gian chia nhỏ vấn đề, lập kế hoạch và so các hướng trước khi trả lời. Docs hiện ghi ở các model mới nhất không tắt được thinking; muốn Claude nghĩ ít hơn thì hạ effort (tháng 11/2026).</li>\n<li><strong>Effort</strong> có các mức Low, Medium (việc thường ngày, ít token hơn), High (cân bằng tốt nhất giữa chất lượng và tốc độ), Extra high và Max (kỹ nhất, chậm hơn). Effort cao hơn tốn hạn mức hơn.</li>\n<li>Bạn đổi model, effort hay thinking ở bất kỳ lúc nào trong chat; thay đổi áp dụng từ câu trả lời tiếp theo.</li>\n</ul>\n<h4>Bảng chọn nhanh</h4>\n<table>\n<thead><tr><th>Nhu cầu</th><th>Bật</th><th>Không cần khi</th></tr></thead>\n<tbody>\n<tr><td>Thông tin mới, có nguồn</td><td>Web search</td><td>Chỉ làm trên tài liệu đã đưa</td></tr>\n<tr><td>Kết quả là file Excel/Word/PowerPoint/PDF</td><td>Tạo file</td><td>Chỉ cần đọc câu trả lời</td></tr>\n<tr><td>Quy trình chuyên biệt làm đi làm lại</td><td>Skill phù hợp</td><td>Việc một lần</td></tr>\n<tr><td>Dữ liệu nằm trong Drive, Gmail, Calendar</td><td>Connector</td><td>Dữ liệu đã có trong chat/Project</td></tr>\n<tr><td>Bài toán khó, nhiều bước</td><td>Effort cao hơn</td><td>Việc nhanh, đơn giản: hạ effort</td></tr>\n</tbody>\n</table>\n<div class=\"tip\">Đề hay đặt tình huống \"câu trả lời không có thông tin mới nhất\" hoặc \"cần file Excel để gửi kế toán\". Đáp án là bật đúng năng lực (web search, tạo file), không phải đổi sang model mạnh hơn.</div>\n<div class=\"warn\">Bật mọi connector và công cụ \"cho chắc\" làm tốn token ở mỗi lượt và có thể kéo Claude đi lấy dữ liệu không cần. Chỉ bật thứ việc hiện tại cần.</div>",
     "keypoints": [
      "Web search: thông tin mới, mỗi câu trả lời kèm trích dẫn; tính vào hạn mức; Team/Enterprise cần Owner bật trước.",
      "Tạo file: Excel, PowerPoint, Word, PDF; tốn hạn mức hơn chat thường; cẩn thận prompt injection từ file/web bên ngoài.",
      "Skills: chỉ dẫn, script, tài nguyên nạp khi liên quan; khác Project (kiến thức nền luôn nạp) và custom instructions (mọi chat).",
      "Connector tốn nhiều token: chỉ bật cái cần cho chat hiện tại.",
      "Effort: Low/Medium cho việc thường, High cân bằng, Extra high/Max cho việc khó nhất; đổi được giữa chừng, áp dụng từ câu trả lời tiếp theo."
     ],
     "sources": [
      {
       "t": "Enabling and using web search",
       "u": "https://support.claude.com/en/articles/10684626-enabling-and-using-web-search"
      },
      {
       "t": "Create and edit files with Claude",
       "u": "https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude"
      },
      {
       "t": "What are Skills?",
       "u": "https://support.claude.com/en/articles/12512176-what-are-skills"
      },
      {
       "t": "Use connectors to extend Claude's capabilities",
       "u": "https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities"
      },
      {
       "t": "How large is the context window on paid Claude plans?",
       "u": "https://support.claude.com/en/articles/8606394-how-large-is-the-context-window-on-paid-claude-plans"
      },
      {
       "t": "Using extended thinking",
       "u": "https://support.claude.com/en/articles/10574485-using-extended-thinking"
      }
     ]
    }
   ],
   "cheat": [
    [
     "Nguyên tắc chọn tính năng",
     "Mặc định chat; nâng lên khi cần bối cảnh dùng lại / tìm sâu nhiều nguồn / sản phẩm để lưu"
    ],
    [
     "Project",
     "Lịch sử chat + knowledge + instructions riêng; việc lặp lại, cùng tài liệu, dùng chung nhóm"
    ],
    [
     "Research",
     "Nhiều lượt tìm nối tiếp, tổng hợp nhiều nguồn, có thể tìm trong công cụ kết nối; gói trả phí, cần web search"
    ],
    [
     "Web search trong chat",
     "Dữ kiện mới, nhanh; câu trả lời kèm trích dẫn"
    ],
    [
     "Artifact",
     "Sản phẩm độc lập (doc, slide, dashboard, công cụ nhỏ) để chỉnh, dùng lại, chia sẻ"
    ],
    [
     "Haiku",
     "Nhanh, nhẹ: phân loại, trích xuất, câu hỏi ngắn khối lượng lớn"
    ],
    [
     "Sonnet",
     "Mặc định cân bằng; không chắc thì chọn tầng này"
    ],
    [
     "Opus",
     "Phức tạp, suy luận sâu; khi Sonnet chưa đạt dù prompt tốt"
    ],
    [
     "Effort",
     "Chỉnh effort thường là đòn bẩy tốt hơn đổi model"
    ],
    [
     "Context window",
     "Chứa mọi thứ trong chat; có phần giữ cho câu trả lời; dài hơn ≠ tốt hơn"
    ],
    [
     "Chat mới / tóm tắt / lưu",
     "Đổi chủ đề → chat mới; việc dài → tóm tắt bàn giao; dùng lại → Project hoặc artifact"
    ],
    [
     "Memory / chat search / incognito",
     "Nhớ theo chủ đề, riêng từng Project / tìm chat cũ khi được yêu cầu / không lưu, không nhớ"
    ],
    [
     "Bốn quyết định trước prompt",
     "Nơi dùng, tính năng, model, context: đặt mức trần chất lượng của phiên"
    ],
    [
     "Usage limit vs length limit",
     "Lượng dùng trong một khoảng thời gian vs độ dài một cuộc chat (context window)"
    ],
    [
     "Cần file Excel/Word/PPT/PDF",
     "Bật tạo file ('Create and edit files'); tốn hạn mức hơn chat thường"
    ],
    [
     "Đổi model/effort giữa chừng",
     "Được; áp dụng từ câu trả lời tiếp theo"
    ]
   ],
   "quiz": [
    {
     "q": "A customer support team wants Claude to draft short replies to thousands of simple, repetitive questions each day (order status explanations, password reset steps). Response speed and cost matter most. Which model choice is MOST appropriate?",
     "options": [
      "Haiku, because it is the fastest and lightest tier for high-volume, simple tasks",
      "Opus, because customer-facing text always deserves the highest-quality model regardless of volume or speed",
      "Opus for all replies, with effort set to maximum",
      "Alternate between all tiers randomly to balance usage"
     ],
     "answer": 0,
     "explain": "Việc đơn giản, lặp lại, khối lượng lớn, ưu tiên tốc độ và chi phí → tầng nhanh và nhẹ nhất (Haiku). Opus tốn hạn mức và chậm hơn mà không thêm lợi ích cho câu trả lời đơn giản; đặt effort tối đa còn tốn hơn nữa. Luân phiên ngẫu nhiên không phải chiến lược chọn model."
    },
    {
     "q": "Every week, a policy team answers internal questions using the same set of HR handbooks and wants consistent tone and answer format across all team members. Which TWO steps BEST fit this need? (Choose TWO.)",
     "options": [
      "Start a new standard chat each time and paste the handbooks again",
      "Run Research for each internal question",
      "Create a Project and upload the HR handbooks as project knowledge",
      "Ask each team member to save their own copy of the handbooks locally",
      "Add project instructions describing the tone and answer format, and share the Project with the team"
     ],
     "answer": [
      2,
      4
     ],
     "explain": "Việc lặp lại trên cùng bộ tài liệu, cần thống nhất giọng và định dạng cho cả nhóm → Project: đưa sổ tay vào knowledge và viết project instructions, chia sẻ cho nhóm (Team/Enterprise). Dán lại mỗi lần tốn công và dễ lệch. Research dành cho tổng hợp nhiều nguồn trên mạng, không phải tra cứu nội bộ lặp lại. Bản lưu riêng của mỗi người không giúp Claude và không thống nhất được."
    },
    {
     "q": "A strategy consultant needs an overview of how three countries regulate e-scooter rentals, drawing on many sources, with citations she can check. Which feature is MOST appropriate?",
     "options": [
      "A standard chat without web search",
      "An artifact containing a blank comparison table",
      "Research, which runs multiple connected searches and synthesizes the findings",
      "A Project with no uploaded files"
     ],
     "answer": 2,
     "explain": "Câu hỏi rộng, nhiều nguồn, cần tổng hợp → Research: chạy nhiều lượt tìm nối tiếp, chọn hướng tiếp theo từ kết quả trước. Chat không có web search chỉ dựa vào kiến thức sẵn có, không có nguồn mới. Artifact là định dạng đầu ra, không phải cách tìm thông tin. Project rỗng không cung cấp gì."
    },
    {
     "q": "A user has been working with Claude on a market analysis in one very long chat over two days. Claude has started overlooking constraints set early on, and the work is not finished. What is the BEST action?",
     "options": [
      "Keep going in the same chat and paste the full list of original constraints into every message so Claude cannot forget them as the chat grows",
      "Ask Claude for a handoff summary of goals, decisions, constraints, and open tasks, check it, and continue in a new chat",
      "Switch to Haiku so responses come back faster",
      "Delete the chat and start the analysis over with no prior context"
     ],
     "answer": 1,
     "explain": "Chat quá dài vừa tốn usage vừa nhiều nhiễu. Tóm tắt bàn giao (đã được bạn kiểm) rồi tiếp tục ở chat mới giữ được những gì đã chốt mà bỏ được phần thừa. Lặp lại ràng buộc mỗi tin nhắn chỉ làm chat dài thêm. Đổi sang Haiku không giải quyết vấn đề context. Xóa và làm lại từ đầu bỏ phí công đã làm."
    },
    {
     "q": "An analyst's complex financial modeling questions are getting shallow answers from Sonnet. She has already added full context, data, and clear criteria to her prompt. What should she try NEXT?",
     "options": [
      "Switch to Haiku for faster iterations",
      "Remove the data to shorten the prompt",
      "Use Research mode for the modeling questions",
      "Increase the effort setting or move to Opus, then compare results on the same inputs"
     ],
     "answer": 3,
     "explain": "Prompt đã đủ bối cảnh mà tầng giữa vẫn nông với việc phức tạp → tăng effort hoặc lên Opus, và so trên cùng đầu vào để biết thay đổi có tác dụng không. Haiku nhẹ hơn, không giúp việc khó. Bỏ dữ liệu làm mất bối cảnh. Research dành cho tổng hợp nguồn trên mạng, không phải suy luận trên mô hình tài chính."
    },
    {
     "q": "A communications manager asks Claude to create a one-page event agenda that she will keep revising over the next week and then share with the planning committee. Which output approach fits BEST?",
     "options": [
      "Have Claude create the agenda as an artifact so it can be edited, revisited, and shared",
      "Ask for the agenda inline in the chat and copy the whole text into a new message each time she wants to make changes",
      "Use Research to generate the agenda",
      "Store the agenda in Claude's memory"
     ],
     "answer": 0,
     "explain": "Sản phẩm độc lập sẽ chỉnh tiếp nhiều lần rồi chia sẻ → artifact. Trả lời inline rồi chép đi chép lại dễ lẫn phiên bản. Research là công cụ tìm kiếm, không phải nơi soạn tài liệu. Memory dùng để ghi nhớ thông tin về người dùng, không phải nơi lưu tài liệu làm việc."
    }
   ],
   "bank": [
    {
     "q": "An office manager needs Claude to reword one email politely declining a meeting invitation. She has no files to share and will not repeat this task. Which approach is MOST appropriate?",
     "options": [
      "A shared Project for her whole team with a knowledge base of past emails, so that everyone's replies stay consistent",
      "A standard chat",
      "A new Project with instructions describing her email style",
      "Research, so the reply reflects current business etiquette"
     ],
     "answer": 1,
     "explain": "Nguyên tắc chọn tính năng: mặc định dùng chat thường, chỉ nâng lên khi có lý do cụ thể. Việc làm một lần, không có tài liệu dùng lại thì chat là đủ. Tạo Project cho một email là thừa. Research dành cho câu hỏi rộng cần tổng hợp nhiều nguồn và tốn hạn mức hơn. Project dùng chung cho cả nhóm vượt xa nhu cầu của một email."
    },
    {
     "q": "A communications specialist needs to confirm one recent fact before posting: the date last week when a partner organization announced its new CEO. Which approach fits BEST?",
     "options": [
      "A Project containing the partner's annual report from last year",
      "A chat without web search, relying on Claude's training data",
      "A standard chat with web search on, then opening the cited source to confirm",
      "Research, which runs many connected searches and builds a full report on the partner's leadership history over the past decade"
     ],
     "answer": 2,
     "explain": "Một dữ kiện mới, cần nguồn: chat có web search là đủ, và help center nói câu trả lời dùng web search luôn kèm trích dẫn để bạn tự kiểm. Research hợp với câu hỏi rộng cần tổng hợp nhiều nguồn; dùng cho một dữ kiện là tốn thời gian và hạn mức. Không có web search thì Claude chỉ dựa vào kiến thức huấn luyện, không biết sự kiện tuần trước. Báo cáo thường niên năm ngoái không chứa thông tin mới."
    },
    {
     "q": "A new Claude user at a consulting firm is about to draft a client workshop agenda and isn't sure which model to pick. According to Anthropic's guidance for Claude app users, what should she do?",
     "options": [
      "Start with Haiku for everything, since it uses the least usage",
      "Avoid choosing and ask a colleague to pick each time",
      "Always start with the heaviest model available, since higher tiers produce better results on every kind of task",
      "Start with Sonnet, the everyday default, and change only if results call for it"
     ],
     "answer": 3,
     "explain": "Hướng dẫn chọn model của Anthropic cho người dùng app nói: không chắc thì bắt đầu với Sonnet, model dùng hằng ngày, cân bằng năng lực và tốc độ. Luôn chọn tầng nặng nhất làm chậm và tốn hạn mức mà không thêm lợi ích cho việc thường ngày. Haiku hợp việc đơn giản cần làm ngay, không phải mặc định cho mọi việc. Nhờ đồng nghiệp chọn không phải là chiến lược."
    },
    {
     "q": "A team lead runs simple tasks, such as fixing typos and extracting dates from short emails, on Opus because she assumes it will be more accurate. What is the MAIN drawback?",
     "options": [
      "It uses more of her usage and is slower, with no real gain on tasks a lighter model handles well",
      "Opus is built only for complex reasoning, so it cannot perform simple tasks such as pulling dates out of short emails",
      "Opus refuses tasks it considers too easy",
      "Opus outputs are formatted differently and cannot be copied into other applications such as email clients"
     ],
     "answer": 0,
     "explain": "Hướng dẫn của Anthropic ghi rõ: dùng Opus cho việc Haiku làm được thì tốn token mà không được gì, và còn chậm hơn. Opus vẫn làm được việc đơn giản; vấn đề là lãng phí. Output của Opus không bị giới hạn sao chép. Opus không từ chối việc vì việc quá dễ."
    },
    {
     "q": "An insurance operations team has 3,000 short customer emails to tag by topic, plus about 40 complex complaint letters that need careful analysis. Which model strategy is MOST efficient?",
     "options": [
      "Use Haiku for everything, including the complex letters, to minimize usage",
      "Choose one model at random for each batch",
      "Use a fast, light model such as Haiku for the tagging and a stronger model for the complex letters",
      "Use Opus for all 3,040 items to keep quality uniform"
     ],
     "answer": 2,
     "explain": "Một lô có cả việc dễ lẫn việc khó nên chia theo độ khó: phần đơn giản, khối lượng lớn cho tầng nhanh và nhẹ; phần cần suy luận kỹ cho tầng mạnh hơn. Dùng Opus cho 3.000 email gắn nhãn tốn hạn mức mà không thêm lợi ích. Dùng Haiku cho cả thư khiếu nại phức tạp có thể khiến việc khó bị làm nông. Chọn ngẫu nhiên không phải chiến lược."
    },
    {
     "q": "A coordinator uses Claude to reformat weekly meeting notes into a standard template. Responses are slow and her usage drains quickly because she left the effort setting at Max. What is the BEST adjustment?",
     "options": [
      "Turn on Research for each reformatting request",
      "Lower the effort to Low or Medium for this routine task",
      "Paste the template twice in every message so Claude takes it more seriously and needs less effort to follow it",
      "Keep the effort at Max so each response is as thorough as possible"
     ],
     "answer": 1,
     "explain": "Help center ghi effort cao hơn thì kỹ hơn nhưng chậm hơn và tốn token hơn; Low và Medium hợp việc thường lệ và giúp hạn mức dùng được lâu hơn. Giữ Max (mức kỹ nhất) chỉ làm chậm và tốn thêm hạn mức cho việc vốn đơn giản. Research dành cho câu hỏi cần tìm nhiều nguồn, không liên quan tới định dạng lại ghi chú. Dán mẫu hai lần làm tin nhắn dài thêm, tốn thêm usage."
    },
    {
     "q": "A training team wants to standardize which model turns course transcripts into quiz questions. Some members say Sonnet is enough; others insist Opus is needed. What is the BEST way to decide?",
     "options": [
      "Ask Claude which model is best for writing quizzes and adopt its answer for the whole team without any further testing",
      "Pick Opus, since a higher tier always produces better quiz questions no matter how simple the course material is",
      "Pick whichever model the most senior team member prefers",
      "Run the same few real transcripts through both and compare outputs against agreed quality criteria"
     ],
     "answer": 3,
     "explain": "Thay vì đoán, chạy vài mẫu thật bằng cả hai tầng rồi so theo tiêu chí; docs chọn model của Anthropic cũng nhấn mạnh thử với prompt và dữ liệu thật. Cho rằng tầng cao hơn luôn tốt hơn bỏ qua chi phí, tốc độ và khả năng Sonnet đã đủ. Sở thích của người cấp cao không phải bằng chứng. Hỏi Claude rồi áp dụng mà không thử là thay dữ liệu bằng ý kiến."
    },
    {
     "q": "A marketing manager has finished planning a webinar with Claude in a long chat. She now wants help with an unrelated budget reallocation question. What should she do?",
     "options": [
      "Continue in the webinar chat so Claude has as much context as possible",
      "Start a new chat for the budget question",
      "Paste the entire webinar chat into a new conversation first",
      "Ask Claude to forget the webinar discussion and carry on in the same chat, which keeps all her work in one place"
     ],
     "answer": 1,
     "explain": "Đổi sang chủ đề khác thì mở chat mới. Chat dài tốn hạn mức hơn ở mỗi lượt và mang theo nội dung không liên quan có thể kéo câu trả lời lệch. Bối cảnh webinar không giúp gì cho câu hỏi ngân sách. Dán cả cuộc chat cũ sang là mang nguyên vấn đề sang chat mới. Yêu cầu Claude 'quên' không xóa nội dung đó khỏi context của cuộc chat."
    },
    {
     "q": "A grant writer pastes the same three-page organizational profile into almost every new chat about different funding applications. Which change BEST reduces this repetition?",
     "options": [
      "Cut the profile down to one sentence so pasting it takes less effort, even though applications need the details",
      "Attach the profile to one chat, since attachments automatically carry over into all of her future chats",
      "Keep all applications in one ever-growing chat so the profile is pasted only once",
      "Create a grant-writing Project and add the profile to project knowledge"
     ],
     "answer": 3,
     "explain": "Thông tin dùng đi dùng lại ở nhiều chat nên lưu vào Project knowledge: mọi chat trong Project đều dùng được, và help center nói nội dung Project được lưu đệm nên tính ít hơn khi dùng lại. Một chat dài bất tận vừa tốn hạn mức vừa nhiều nhiễu. File đính kèm chỉ thuộc chat đó, không tự sang chat khác. Rút còn một câu làm mất chi tiết mà hồ sơ tài trợ cần."
    },
    {
     "q": "A team lead wants Claude's help planning a surprise farewell party for a colleague and doesn't want this one-off topic saved to her chat history or memory. Which option fits BEST?",
     "options": [
      "An incognito chat outside any Project",
      "A normal chat that she deletes right afterward, since deleting a chat also removes any memories created from it",
      "A normal chat in which she asks Claude not to remember anything",
      "A chat inside her team's shared Project"
     ],
     "answer": 0,
     "explain": "Help center: incognito chat không lưu vào lịch sử, không dùng memory hiện có và không được thêm vào memory; chế độ này chỉ có cho chat ngoài Project. Project dùng chung không phải chỗ cho một bất ngờ, và incognito không có trong Project. Xóa một chat không xóa các mục memory đã tạo từ chat đó. Dặn Claude 'đừng nhớ' trong chat thường không ngăn chat được lưu vào lịch sử."
    },
    {
     "q": "Working in her 'Client B' Project, a consultant asks Claude to look up a pricing decision she discussed last month in a chat inside her 'Client A' Project. Claude cannot find it. What explains this?",
     "options": [
      "Chats inside Projects are never stored, so the earlier discussion was permanently deleted when that chat ended and cannot be found anywhere",
      "Only Opus can search across Projects, so she should switch models",
      "Chat search stays within each Project, so she must bring any needed information into Client B herself",
      "Chat search is malfunctioning, so she should contact support"
     ],
     "answer": 2,
     "explain": "Help center: với chat trong Project, việc tìm chat cũ chỉ giới hạn trong chính Project đó, nên Claude ở Client B không thấy chat của Client A. Ranh giới này cũng giúp tách thông tin giữa các khách hàng; nếu thật sự cần, cô tự đưa thông tin vào sau khi cân nhắc việc dùng chéo có phù hợp không. Đây không phải lỗi. Không model nào vượt ranh giới Project. Chat trong Project vẫn được lưu trong Project đó."
    },
    {
     "q": "A finance coordinator needs a budget spreadsheet she can open in Excel, with formulas for monthly totals, built from figures she provides. Which Claude capability is MOST directly suited to this?",
     "options": [
      "Memory, which stores her budget figures for later use",
      "Research, which gathers budget figures from across the web",
      "File creation, which lets Claude produce an .xlsx file",
      "Web search, which looks up standard budget templates online and returns links where she can download them"
     ],
     "answer": 2,
     "explain": "Help center mô tả tính năng tạo và sửa file (Code execution and file creation, nay hiển thị là Create and edit files): Claude tạo được bảng tính Excel (.xlsx), tài liệu Word, PowerPoint và PDF. Research và web search là công cụ tìm thông tin, không tạo bảng tính từ số liệu của cô. Memory ghi nhớ thông tin về người dùng, không tạo file."
    },
    {
     "q": "A user's chat is approaching its length limit. Which TWO of the following take up space in that chat's context window? (Choose TWO.)",
     "options": [
      "Chats in her other Projects",
      "Conversations her teammates are having in a shared Project",
      "Files attached earlier in the same chat",
      "Claude's own previous responses in the chat",
      "Files saved on her laptop that she has not uploaded"
     ],
     "answer": [
      2,
      3
     ],
     "explain": "Context window chứa mọi thứ trong cuộc trò chuyện hiện tại: tin nhắn của bạn, câu trả lời của Claude, file đính kèm, instructions, kết quả công cụ. Chat ở Project khác, file chưa tải lên và cuộc trò chuyện của đồng nghiệp không nằm trong cuộc chat này; ngay cả trong cùng một Project, các chat không chia sẻ context với nhau."
    },
    {
     "q": "A strategy analyst is deciding whether to use Research. Which TWO statements about Research are accurate? (Choose TWO.)",
     "options": [
      "It works only on documents uploaded to a Project",
      "It requires web search to be turned on",
      "It is available on the Free plan",
      "It runs multiple searches that build on each other to investigate a question in depth",
      "It uses usage limits more slowly than a standard chat"
     ],
     "answer": [
      1,
      3
     ],
     "explain": "Help center: Research chạy nhiều lượt tìm nối tiếp nhau, chọn bước tiếp theo dựa trên kết quả trước, và phải bật web search mới hoạt động. Research dành cho gói trả phí (Pro, Max, Ultra, Team, Enterprise), không có trên Free. Research chịu cùng hạn mức với chat thường nhưng có thể tiêu hao nhanh hơn vì lấy nhiều nguồn. Research tìm trên web và có thể tìm trong công cụ đã kết nối, không chỉ trong tài liệu của Project."
    }
   ]
  },
  {
   "id": "d4",
   "name": "Workflow Integration and Solution Design",
   "weight": 16,
   "intro": "<p>Domain này nhìn rộng hơn một prompt: <strong>đưa Claude vào cách làm việc thật</strong>. Bạn phải biết phân tích yêu cầu và chia quy trình thành từng bước, quyết bước nào giao cho Claude, bước nào giữ cho người, khi nào chỉ bổ trợ (augment) và khi nào thiết kế lại (redesign) quy trình, dùng Claude cho research, lập kế hoạch, tối ưu quy trình, và nói với stakeholder về giá trị cũng như giới hạn của Claude.</p><p>Ranh giới: sửa một prompt viết kém hay chẩn đoán output tệ thuộc D7; chọn model và tính năng thuộc D3. Năng lực trung tâm ở đây là <em>Delegation</em> trong khung 4D.</p>",
   "lessons": [
    {
     "id": "l-4-0",
     "title": "Nền tảng D4: use case, quy trình, stakeholder và Delegation, bộ từ vựng của domain",
     "minutes": 12,
     "html": "<p>Domain 4 nhìn rộng hơn một prompt hay một cuộc chat. Câu hỏi trung tâm: <strong>đưa Claude vào công việc thật thì phần nào giao cho Claude, phần nào người giữ, và ai chịu trách nhiệm kết quả</strong>. Bài này dựng bộ từ vựng mà năm bài của domain dùng chung.</p>\n<h4>Từ use case tới quy trình</h4>\n<ul>\n<li><strong>Use case</strong>: một nhu cầu cụ thể mà Claude có thể giúp, gắn với một vấn đề đo được. \"Rút ngắn thời gian soạn báo cáo tuần của đội bán hàng\" là use case; \"dùng AI cho bán hàng\" thì chưa.</li>\n<li><strong>Quy trình (workflow)</strong>: chuỗi bước người và công cụ làm để ra một kết quả, có đầu vào, đầu ra và người quyết định ở mỗi bước.</li>\n<li><strong>Bước (step)</strong>: đơn vị nhỏ nhất để quyết định giao hay giữ. Đánh giá theo từng bước, không theo cả quy trình.</li>\n<li><strong>Điểm duyệt (checkpoint)</strong>: chỗ trong quy trình có người kiểm kết quả trước khi đi tiếp.</li>\n<li><strong>Thước đo thành công</strong>: con số cho biết thay đổi có hiệu quả không, ví dụ thời gian xử lý, tỉ lệ lỗi, khối lượng làm lại.</li>\n</ul>\n<h4>Delegation: năng lực trung tâm</h4>\n<p>Mô tả khóa \"Workflow Integration &amp; Solution Design\" trong lộ trình Associate gọi Delegation là năng lực neo của khóa: với <em>từng bước</em>, quyết định việc đó hợp với AI, giữ cho người, hay cộng tác. Khóa cũng nhấn mạnh: giá trị của việc đưa Claude vào quy trình lặp lại chỉ cộng dồn khi thay đổi được làm có chủ đích, và tự động hóa sai bước có thể phản tác dụng. Khung AI Fluency chia Delegation thành ba phần:</p>\n<ul>\n<li><strong>Problem Awareness</strong>: hiểu rõ mục tiêu và bản chất công việc trước khi đưa AI vào.</li>\n<li><strong>Platform Awareness</strong>: hiểu khả năng và giới hạn của hệ thống AI.</li>\n<li><strong>Task Delegation</strong>: chia việc giữa người và AI để tận dụng điểm mạnh của mỗi bên.</li>\n</ul>\n<h4>Ba kiểu làm việc với AI</h4>\n<table>\n<thead><tr><th>Kiểu</th><th>Người làm gì</th><th>Ví dụ</th></tr></thead>\n<tbody>\n<tr><td>Automation</td><td>Định nghĩa việc cụ thể; AI thực hiện</td><td>Chuyển biên bản họp thành danh sách việc theo mẫu</td></tr>\n<tr><td>Augmentation</td><td>Cùng suy nghĩ, trao đổi qua lại</td><td>Cùng Claude phản biện một kế hoạch</td></tr>\n<tr><td>Agency</td><td>Cấu hình kiến thức và khuôn hành vi để AI tự làm</td><td>Trợ lý trả lời câu hỏi nội bộ theo bộ tài liệu</td></tr>\n</tbody>\n</table>\n<h4>Augment và redesign</h4>\n<p><strong>Augment</strong> (bổ trợ) giữ nguyên quy trình, thêm Claude vào vài bước. <strong>Redesign</strong> (thiết kế lại) làm lại quy trình quanh khả năng mới, thường khi nhiều bước cũ chỉ tồn tại vì giới hạn cũ. Cách làm an toàn là augment trước, chạy thử, đo, rồi mới redesign khi có bằng chứng.</p>\n<h4>Stakeholder</h4>\n<p><strong>Stakeholder</strong> là người bị ảnh hưởng hoặc có quyền quyết định với thay đổi: người tài trợ (sponsor), người sở hữu quy trình, người trực tiếp làm, người duyệt, đội pháp chế, bảo mật, IT, và người nhận kết quả cuối (khách hàng, nhân viên). Mỗi nhóm cần nghe một thông điệp khác nhau, nhưng ai cũng cần một bức tranh thật về giá trị và giới hạn của Claude.</p>\n<h4>Luật chung của domain</h4>\n<p>Một câu tóm được tinh thần của đáp án D4: <strong>giao phần làm, giữ phần quyết</strong>. Claude soạn, tổng hợp, đề xuất; người chủ việc quyết, duyệt và chịu trách nhiệm. Khi giải pháp vượt khả năng của app (tích hợp hệ thống, API, bảo mật riêng), chuyển cho đội kỹ thuật.</p>\n<h4>Bài nào trong Domain 4 đụng vào phần nào</h4>\n<table>\n<thead><tr><th>Bài</th><th>Nội dung chính</th></tr></thead>\n<tbody>\n<tr><td>l-4-0 (bài này)</td><td>Từ vựng: use case, quy trình, bước, checkpoint, Delegation, ba kiểu làm việc, augment/redesign, stakeholder</td></tr>\n<tr><td>l-4-1 Phân tích yêu cầu và chia việc</td><td>Định nghĩa vấn đề, vẽ quy trình, phân loại từng bước, thước đo, chạy thử trên hồ sơ cũ</td></tr>\n<tr><td>l-4-2 Research, kế hoạch, tối ưu quy trình</td><td>Chọn kênh thông tin, xếp hạng có tiêu chí, đề xuất tối ưu là giả thuyết, khi nào chuyển đội kỹ thuật</td></tr>\n<tr><td>l-4-3 Augment hay redesign, stakeholder</td><td>Ba chế độ, bảng augment/redesign, nói về giá trị và giới hạn</td></tr>\n<tr><td>l-4-4 Thiết kế giải pháp cùng Claude</td><td>Từ yêu cầu thành spec, dựng bản đầu, bộ ca thử, đánh giá, sửa, bàn giao</td></tr>\n<tr><td>l-4-5 Từ pilot tới quy trình chạy thật</td><td>Bản đồ stakeholder, thiết kế pilot, điểm duyệt, tiêu chí đi tiếp, mở rộng và theo dõi</td></tr>\n</tbody>\n</table>\n<div class=\"tip\">Câu hỏi D4 thường có một phương án làm \"toàn bộ ngay\" (triển khai cho cả phòng, tự động hóa cả quy trình) và một phương án \"không dùng AI\". Đáp án thường ở giữa: bắt đầu từ vấn đề, chia bước, thử có điểm duyệt, đo rồi mới mở rộng.</div>\n<div class=\"warn\">Đừng nhầm Agency với việc bỏ người ra khỏi quy trình. Cấu hình để Claude tự làm vẫn cần người đặt khuôn hành vi, theo dõi và chịu trách nhiệm.</div>",
     "keypoints": [
      "Use case gắn với vấn đề đo được; quyết định giao hay giữ ở cấp từng bước của quy trình.",
      "Delegation là năng lực neo của D4: Problem Awareness, Platform Awareness, Task Delegation; tự động hóa sai bước có thể phản tác dụng.",
      "Ba kiểu: Automation (AI làm theo lệnh), Augmentation (cùng suy nghĩ), Agency (AI tự làm theo cấu hình).",
      "Augment trước, chạy thử có điểm duyệt, đo, rồi mới redesign.",
      "Giao phần làm, giữ phần quyết; vượt khả năng app thì chuyển đội kỹ thuật."
     ],
     "sources": [
      {
       "t": "Workflow Integration & Solution Design (Claude Associate path)",
       "u": "https://anthropic-partners.skilljar.com/path/claude-associate/workflow-integration-solution-design"
      },
      {
       "t": "AI Fluency: Key Terminology Cheat Sheet (PDF)",
       "u": "https://www-cdn.anthropic.com/4396730ed190e691a3712cf2fd6bfe35509deca2.pdf"
      },
      {
       "t": "AI Fluency: Framework & Foundations",
       "u": "https://anthropic.skilljar.com/ai-fluency-framework-foundations"
      }
     ]
    },
    {
     "id": "l-4-1",
     "title": "Phân tích yêu cầu và chia việc: Claude làm phần nào",
     "minutes": 12,
     "html": "<p>Sai lầm phổ biến nhất khi đưa AI vào công việc là bắt đầu từ công cụ (\"ta có Claude rồi, dùng vào đâu nhỉ?\") thay vì từ vấn đề. Khung AI Fluency gọi năng lực này là <strong>Delegation</strong>: đặt mục tiêu và quyết định có nên, khi nào và bằng cách nào dùng AI. Nó gồm ba phần:</p>\n<ul>\n<li><strong>Problem Awareness</strong>: hiểu rõ mục tiêu và bản chất công việc trước khi đưa AI vào.</li>\n<li><strong>Platform Awareness</strong>: hiểu khả năng và giới hạn của từng hệ thống AI.</li>\n<li><strong>Task Delegation</strong>: phân chia công việc giữa người và AI để tận dụng điểm mạnh của mỗi bên.</li>\n</ul>\n<h4>Bước 1: định nghĩa vấn đề</h4>\n<p>Viết ra: vấn đề là gì, ai đang chịu, đo bằng gì. \"Đội pháp chế mất 3 ngày để rà một hợp đồng nhà cung cấp, chủ yếu vì phải đối chiếu tay với danh mục điều khoản chuẩn\" là một vấn đề rõ. \"Dùng AI cho pháp chế\" thì không.</p>\n<h4>Bước 2: vẽ quy trình hiện tại</h4>\n<p>Quan sát hoặc hỏi người đang làm, rồi chia quy trình thành từng bước nhỏ. Với mỗi bước, trả lời: đầu vào là gì, đầu ra là gì, ai quyết, sai thì hậu quả ra sao, có kiểm được kết quả không.</p>\n<h4>Bước 3: phân loại từng bước</h4>\n<table>\n<thead><tr><th>Nhóm</th><th>Đặc điểm</th><th>Ví dụ (rà hợp đồng)</th></tr></thead>\n<tbody>\n<tr><td><strong>Giao cho Claude</strong></td><td>Lặp lại, dựa trên văn bản, kết quả kiểm được nhanh</td><td>Trích các điều khoản về thanh toán, bồi thường, chấm dứt; đánh dấu chỗ khác mẫu chuẩn</td></tr>\n<tr><td><strong>Cộng tác</strong></td><td>Cần phán đoán nhưng Claude giúp tăng tốc</td><td>Soạn ghi chú rủi ro để luật sư rà và sửa</td></tr>\n<tr><td><strong>Giữ cho người</strong></td><td>Quyết định cuối, trách nhiệm pháp lý, quan hệ, phán xét về con người</td><td>Quyết định chấp nhận rủi ro, đàm phán với nhà cung cấp, ký</td></tr>\n</tbody>\n</table>\n<p>Khóa học chính thức của Anthropic nhấn mạnh: khi tự động hóa sai bước, kết quả có thể phản tác dụng. Bước tốt để giao là bước mà nếu Claude sai, người ở bước sau phát hiện được trước khi gây hại.</p>\n<h4>Bước 4: chốt thước đo thành công</h4>\n<p>\"Thời gian rà giảm từ 3 ngày xuống 1 ngày, không bỏ sót điều khoản nào trong danh mục rủi ro cao, luật sư vẫn ký duyệt mọi hợp đồng.\" Tiêu chí đo được giúp bạn biết pilot có thành công không, và giúp nói chuyện với stakeholder.</p>\n<h4>Bước 5: chạy thử trên hồ sơ cũ</h4>\n<p>Chọn vài hợp đồng đã rà xong (đã biết đáp án), chạy quy trình mới, so kết quả. Đây là cách rẻ nhất để phát hiện bước nào Claude làm tốt, bước nào chưa.</p>\n<p>Claude cũng giúp được ở khâu phân tích: dán bản mô tả yêu cầu còn thô và nhờ Claude chỉ ra chỗ mơ hồ, câu hỏi cần hỏi lại stakeholder, trường hợp ngoại lệ chưa tính tới. Nhưng quyết định phạm vi vẫn là của người chủ việc.</p>\n<div class=\"tip\">Khi đề hỏi \"bước đầu tiên\" để đưa Claude vào một quy trình, đáp án thường là hiểu vấn đề và vẽ lại quy trình hiện tại, không phải \"triển khai cho toàn bộ phòng ban\" hay \"chọn model mạnh nhất\".</div>\n<div class=\"warn\">Giao cả quy trình cho Claude chỉ vì từng bước \"có vẻ làm được\" là bẫy. Đánh giá riêng từng bước; bước có hậu quả lớn và khó kiểm phải giữ cho người.</div>",
     "keypoints": [
      "Delegation (4D): Problem Awareness, Platform Awareness, Task Delegation.",
      "Xuất phát điểm là một vấn đề đo được, không phải công cụ.",
      "Chia quy trình thành bước; mỗi bước: đầu vào, đầu ra, ai quyết, hậu quả nếu sai, kiểm được không.",
      "Phân loại: giao cho Claude / cộng tác / giữ cho người; tự động hóa sai bước có thể phản tác dụng.",
      "Viết tiêu chí thành công trước và thử trên mẫu việc thật đã biết đáp án."
     ],
     "sources": [
      {
       "t": "AI Fluency: Key Terminology Cheat Sheet (PDF)",
       "u": "https://www-cdn.anthropic.com/4396730ed190e691a3712cf2fd6bfe35509deca2.pdf"
      },
      {
       "t": "The AI Fluency Framework (one-pager, PDF)",
       "u": "https://www-cdn.anthropic.com/b383cf6baddbfc72fdf8b0ed533a518e2872d531.pdf"
      },
      {
       "t": "AI Fluency: Framework & Foundations",
       "u": "https://anthropic.skilljar.com/ai-fluency-framework-foundations"
      },
      {
       "t": "Workflow Integration & Solution Design (Claude Associate path)",
       "u": "https://anthropic-partners.skilljar.com/path/claude-associate/workflow-integration-solution-design"
      }
     ]
    },
    {
     "id": "l-4-2",
     "title": "Research, lập kế hoạch, tối ưu quy trình và thiết kế giải pháp",
     "minutes": 11,
     "html": "<p>Ngoài việc soạn thảo, Claude là trợ thủ tốt cho ba loại việc mang tính tư duy: research, lập kế hoạch và tối ưu quy trình. Nguyên tắc chung cho cả ba: <strong>Claude soạn phương án, người chủ việc quyết</strong>.</p>\n<h4>Research: chọn kênh theo nơi chứa thông tin</h4>\n<ul>\n<li>Thông tin công khai, cần tổng hợp nhiều nguồn → Research hoặc web search.</li>\n<li>Thông tin nội bộ đã có trong tài liệu → đưa tài liệu vào chat hoặc Project knowledge.</li>\n<li>Thông tin nằm trong email, lịch, Drive → connector.</li>\n<li>Thông tin chỉ có trong đầu người (lý do một quyết định cũ, khẩu vị của khách) → phải hỏi người.</li>\n</ul>\n<p>Khi nhờ Claude xếp hạng phương án (nhà cung cấp, công cụ, địa điểm), hãy đưa <strong>tiêu chí và trọng số</strong> trước. Không có tiêu chí, Claude sẽ tự chọn tiêu chí, và có thể không phải tiêu chí của bạn.</p>\n<h4>Lập kế hoạch</h4>\n<p>Claude giỏi biến một mục tiêu thành bản kế hoạch có các giai đoạn, phụ thuộc, rủi ro và mốc thời gian, và đặc biệt giỏi chỉ ra những thứ bạn chưa nghĩ tới. Hãy cho Claude các ràng buộc thật (ngân sách, nhân sự, hạn chót) và yêu cầu nêu giả định. Bản kế hoạch là bản nháp để người có trách nhiệm duyệt, chỉnh và chịu trách nhiệm.</p>\n<h4>Tối ưu quy trình</h4>\n<p>Dán mô tả quy trình hiện tại và nhờ Claude tìm điểm nghẽn, bước trùng lặp, chỗ có thể chuẩn hóa. Hãy coi mỗi đề xuất của Claude là một <strong>giả thuyết</strong> cần kiểm chứng: Claude không thấy được dữ liệu vận hành thật, ràng buộc pháp lý hay lý do lịch sử của một bước. Kiểm giả thuyết với số liệu và với người đang làm việc đó trước khi đổi.</p>\n<p>Claude cũng hữu ích để <strong>viết tài liệu quy trình</strong> (SOP): bạn kể lại cách làm, Claude cấu trúc thành các bước, chỉ ra chỗ thiếu (\"bước này ai duyệt?\", \"nếu khách không trả lời thì sao?\"). Viết lần lượt từng đoạn của quy trình và nhờ người trực tiếp làm việc đó soát lại.</p>\n<h4>Thiết kế giải pháp: vòng lặp bốn bước</h4>\n<ol>\n<li><strong>Lên kế hoạch</strong>: chuyển yêu cầu ban đầu thành một đặc tả có thể kiểm tra (đầu vào, đầu ra, tiêu chí, ngoại lệ).</li>\n<li><strong>Làm</strong>: dựng phiên bản đầu (một Project có instructions, một chuỗi prompt, một artifact).</li>\n<li><strong>Đánh giá</strong>: chạy trên trường hợp thật, kể cả trường hợp khó; so với tiêu chí. Không báo lỗi chưa có nghĩa là đạt yêu cầu.</li>\n<li><strong>Sửa</strong>: mỗi lần một chỗ, ghi lại thay đổi, đánh giá lại.</li>\n</ol>\n<h4>Khi nào chuyển cho người khác</h4>\n<p>Một associate dùng app Claude giải quyết được nhiều việc, nhưng khi giải pháp cần tích hợp với hệ thống nội bộ, gọi API, xử lý dữ liệu nhạy cảm ở quy mô lớn, hoặc cần kiểm soát bảo mật riêng, hãy chuyển cho đội kỹ thuật (developer, architect) hoặc đội bảo mật thay vì tự chắp vá.</p>\n<div class=\"tip\">Câu hỏi về tối ưu quy trình thường có phương án \"làm theo ngay đề xuất của Claude\". Đáp án tốt hơn gần như luôn có bước kiểm đề xuất với dữ liệu hoặc với người trong cuộc trước khi thay đổi.</div>\n<div class=\"warn\">Nhờ Claude \"chọn nhà cung cấp tốt nhất\" mà không đưa tiêu chí là giao luôn quyết định cho Claude. Đưa tiêu chí và trọng số, và giữ quyết định cuối cho người.</div>",
     "keypoints": [
      "Claude soạn phương án, người chủ việc quyết.",
      "Chọn kênh theo nơi chứa thông tin: Research/web, tài liệu/Project, connector, hoặc hỏi người.",
      "Xếp hạng phương án phải có tiêu chí và trọng số trước.",
      "Đề xuất tối ưu quy trình của Claude là giả thuyết; kiểm với dữ liệu và người làm thật.",
      "Thiết kế giải pháp: lên kế hoạch → làm → đánh giá → sửa; cần tích hợp hệ thống thì chuyển đội kỹ thuật."
     ],
     "sources": [
      {
       "t": "Using Research on Claude",
       "u": "https://support.claude.com/en/articles/11088861-using-research-on-claude-ai"
      },
      {
       "t": "Use connectors to extend Claude's capabilities",
       "u": "https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities"
      },
      {
       "t": "AI Fluency: Framework & Foundations",
       "u": "https://anthropic.skilljar.com/ai-fluency-framework-foundations"
      }
     ]
    },
    {
     "id": "l-4-3",
     "title": "Augment hay redesign, và nói chuyện với stakeholder",
     "minutes": 12,
     "html": "<h4>Ba kiểu làm việc với AI</h4>\n<p>Khung AI Fluency phân biệt ba chế độ tương tác:</p>\n<ul>\n<li><strong>Automation</strong>: AI thực hiện việc cụ thể theo chỉ dẫn cụ thể; người định nghĩa làm gì, AI làm. Ví dụ: chuyển biên bản họp thành danh sách việc theo mẫu.</li>\n<li><strong>Augmentation</strong>: người và AI cộng tác như hai bên cùng suy nghĩ, trao đổi qua lại. Ví dụ: cùng Claude phản biện một chiến lược.</li>\n<li><strong>Agency</strong>: người cấu hình để AI tự làm việc thay mình, kể cả tương tác với người hoặc AI khác; người đặt kiến thức và khuôn hành vi thay vì từng hành động. Ví dụ: một trợ lý được cấu hình để trả lời câu hỏi nội bộ theo bộ tài liệu.</li>\n</ul>\n<h4>Bổ trợ (augment) hay thiết kế lại (redesign)</h4>\n<table>\n<thead><tr><th></th><th>Augment</th><th>Redesign</th></tr></thead>\n<tbody>\n<tr><td>Là gì</td><td>Giữ nguyên quy trình, thêm Claude vào một vài bước</td><td>Thiết kế lại quy trình xoay quanh khả năng mới</td></tr>\n<tr><td>Khi nào</td><td>Quy trình đang chạy ổn, muốn nhanh hơn ở vài điểm; rủi ro cần thấp</td><td>Nhiều bước tồn tại chỉ vì giới hạn cũ (chép tay, chuyển định dạng, chờ người tổng hợp); augment không đủ để đạt mục tiêu</td></tr>\n<tr><td>Rủi ro</td><td>Thấp, dễ quay lại</td><td>Cao hơn: đổi vai trò, đào tạo lại, cần quản lý thay đổi</td></tr>\n</tbody>\n</table>\n<p>Cách làm an toàn: bắt đầu bằng augment ở bước có giá trị rõ, chạy thử có <strong>điểm duyệt của người</strong>, đo theo tiêu chí, rồi mới cân nhắc redesign khi đã có bằng chứng. Ví dụ: đội marketing đầu tiên dùng Claude soạn nháp bài đăng (augment); sau ba tháng thấy khâu chuyển ý tưởng từ họp sang brief chiếm nhiều thời gian nhất, họ thiết kế lại để Claude tạo brief ngay từ ghi chú họp, người duyệt brief thay vì viết từ đầu (redesign).</p>\n<h4>Nói với stakeholder: giá trị thật, giới hạn thật</h4>\n<p>Stakeholder (sếp, đội pháp chế, người dùng cuối, khách hàng) cần một bức tranh thực tế về Claude để quyết định. Những điều nên nói rõ:</p>\n<ul>\n<li><strong>Giá trị cụ thể</strong>: tiết kiệm thời gian ở bước nào, nhất quán hơn ra sao, có số liệu từ pilot.</li>\n<li><strong>Claude không biết dữ liệu nội bộ</strong> trừ khi được cung cấp (dán vào chat, tải file lên, qua Project hoặc connector), và có mốc giới hạn kiến thức.</li>\n<li><strong>Output có thể sai dù văn phong rất thuyết phục</strong>, và cùng một câu hỏi có thể cho kết quả khác nhau giữa các lần chạy. Vì thế mới có bước người duyệt.</li>\n<li><strong>Vai trò</strong>: Claude hỗ trợ người làm việc; trách nhiệm vẫn thuộc về con người.</li>\n</ul>\n<p>Hãy cam kết về <strong>quy trình kiểm soát</strong> (mọi email gửi khách đều được người duyệt; mọi số liệu đều đối chiếu nguồn), đừng cam kết về <strong>sự hoàn hảo</strong> (\"AI không bao giờ sai\"). Báo cáo pilot trung thực: nêu cả trường hợp Claude làm sai và cách quy trình bắt được lỗi. Một báo cáo chỉ có điểm tốt sẽ mất uy tín ngay lần đầu có sự cố.</p>\n<div class=\"tip\">Đáp án đúng cho câu hỏi về stakeholder thường cân bằng: nêu lợi ích cụ thể có số liệu, nêu giới hạn và biện pháp kiểm soát. Phương án hứa \"độ chính xác 100%\" hoặc \"thay thế hoàn toàn nhân viên\" là bẫy; phương án quá bi quan \"AI không đáng tin, không nên dùng\" cũng là bẫy.</div>\n<div class=\"warn\">Đừng nhảy thẳng vào redesign toàn bộ quy trình khi chưa có pilot. Rủi ro cao và khó quay lại.</div>",
     "keypoints": [
      "Ba chế độ: Automation (AI làm theo chỉ dẫn cụ thể), Augmentation (cùng suy nghĩ), Agency (AI tự làm theo cấu hình).",
      "Augment: thêm Claude vào bước có sẵn, rủi ro thấp. Redesign: làm lại quy trình khi bước cũ tồn tại vì giới hạn cũ.",
      "Bắt đầu augment, pilot có điểm duyệt, đo, rồi mới redesign.",
      "Với stakeholder: giá trị cụ thể, giới hạn thật (không biết dữ liệu nội bộ, có thể sai trôi chảy, không nhất quán giữa các lần).",
      "Cam kết quy trình kiểm soát, không cam kết hoàn hảo; báo cáo pilot trung thực cả lỗi."
     ],
     "sources": [
      {
       "t": "AI Fluency: Key Terminology Cheat Sheet (PDF)",
       "u": "https://www-cdn.anthropic.com/4396730ed190e691a3712cf2fd6bfe35509deca2.pdf"
      },
      {
       "t": "Workflow Integration & Solution Design (Claude Associate path)",
       "u": "https://anthropic-partners.skilljar.com/path/claude-associate/workflow-integration-solution-design"
      },
      {
       "t": "AI Fluency: Framework & Foundations",
       "u": "https://anthropic.skilljar.com/ai-fluency-framework-foundations"
      },
      {
       "t": "AI Capabilities and Limitations",
       "u": "https://anthropic.skilljar.com/ai-capabilities-and-limitations"
      }
     ]
    },
    {
     "id": "l-4-4",
     "title": "Thiết kế giải pháp cùng Claude: từ yêu cầu thô tới bản dùng được",
     "minutes": 12,
     "html": "<p>Mục tiêu thứ ba của khóa Workflow Integration là dùng Claude để hỗ trợ <strong>thiết kế, xây dựng và lặp</strong> một giải pháp. Với một associate, \"giải pháp\" thường là một Project có instructions và knowledge, một bộ mẫu prompt dùng chung, một artifact nhỏ, hoặc một quy trình nhiều bước có điểm kiểm. Bài l-4-2 đã nêu vòng lên kế hoạch → làm → đánh giá → sửa. Bài này đi qua từng bước bằng một ví dụ.</p>\n<h4>Ví dụ xuyên suốt</h4>\n<p>Đội nhân sự 6 người nhận khoảng 200 câu hỏi mỗi tháng về chính sách phép, bảo hiểm, công tác phí. Trưởng nhóm muốn một trợ lý giúp nhân viên nhân sự soạn câu trả lời nhanh và nhất quán.</p>\n<h4>Bước 1: biến yêu cầu thô thành bản mô tả (spec)</h4>\n<p>Một spec ngắn trả lời được các câu sau:</p>\n<ul>\n<li><strong>Ai dùng, để làm gì</strong>: nhân viên nhân sự soạn nháp trả lời; không phải chatbot cho toàn công ty.</li>\n<li><strong>Đầu vào, đầu ra</strong>: câu hỏi của nhân viên → bản nháp trả lời kèm tên mục chính sách đã dùng.</li>\n<li><strong>Phạm vi</strong>: ba bộ chính sách hiện hành; câu hỏi về lương cá nhân, kỷ luật thì không xử lý, chuyển trưởng nhóm.</li>\n<li><strong>Tiêu chí đạt</strong>: đúng chính sách, dẫn đúng mục, giọng thân thiện, dưới 150 chữ.</li>\n<li><strong>Ngoại lệ</strong>: chính sách không nói tới thì phải nói rõ là không có, không suy đoán.</li>\n</ul>\n<p>Claude giúp tốt ở bước này: dán yêu cầu thô và nhờ Claude chỉ ra chỗ mơ hồ, câu hỏi cần hỏi lại trưởng nhóm, trường hợp ngoại lệ chưa tính tới. Người chủ việc vẫn là người chốt phạm vi.</p>\n<h4>Bước 2: dựng bản đầu</h4>\n<p>Chọn hình thức đơn giản nhất đáp ứng spec. Ở ví dụ này: một Project dùng chung trong nhóm, chính sách đưa vào knowledge, quy tắc trả lời đưa vào project instructions (cách viết thuộc D5). Nếu cần một công cụ nhỏ có giao diện, artifact là một lựa chọn; docs hiện ghi artifact có thể gọi Claude, người dùng đăng nhập bằng tài khoản Claude của họ và lượt dùng tính vào hạn mức của chính họ (tháng 11/2026).</p>\n<h4>Bước 3: lập bộ ca thử trước khi thử</h4>\n<table>\n<thead><tr><th>Loại ca</th><th>Ví dụ</th><th>Kỳ vọng</th></tr></thead>\n<tbody>\n<tr><td>Thường gặp</td><td>\"Tôi còn bao nhiêu ngày phép nếu vào làm từ tháng 3?\"</td><td>Đúng công thức trong chính sách, dẫn mục</td></tr>\n<tr><td>Ca khó</td><td>Câu hỏi đụng hai chính sách cùng lúc</td><td>Dẫn cả hai, không bỏ sót điều kiện</td></tr>\n<tr><td>Ngoài phạm vi</td><td>\"Lương tôi sao thấp hơn đồng nghiệp?\"</td><td>Từ chối lịch sự, chuyển trưởng nhóm</td></tr>\n<tr><td>Không có trong tài liệu</td><td>Chính sách cho thú cưng đi công tác</td><td>Nói rõ chính sách không đề cập</td></tr>\n<tr><td>Đã biết đáp án</td><td>10 câu hỏi cũ đã được trả lời đúng</td><td>Khớp câu trả lời đã duyệt</td></tr>\n</tbody>\n</table>\n<h4>Bước 4: đánh giá theo tiêu chí</h4>\n<p>Chạy cả bộ, chấm từng ca theo tiêu chí trong spec, ghi kết quả vào một bảng. Một bản chạy không báo lỗi chưa có nghĩa là đạt; phải so với kỳ vọng từng ca. Chú ý đặc biệt các ca ngoài phạm vi và không có trong tài liệu, vì đó là chỗ Claude dễ \"cố trả lời\".</p>\n<h4>Bước 5: sửa từng chỗ và chạy lại</h4>\n<p>Mỗi lần đổi một thứ (một câu instructions, một tài liệu knowledge), chạy lại cùng bộ ca, so với lần trước. Ghi lại thay đổi và lý do. Cách này giữ được những gì đang chạy tốt và cho biết thay đổi nào có tác dụng.</p>\n<h4>Bước 6: bàn giao</h4>\n<ul>\n<li>Một trang hướng dẫn dùng: làm được gì, không làm gì, ai duyệt câu trả lời trước khi gửi.</li>\n<li>Người phụ trách cấu hình và lịch rà soát khi chính sách đổi.</li>\n<li>Bộ ca thử được giữ lại để dùng mỗi khi sửa cấu hình.</li>\n</ul>\n<h4>Khi nào dừng tự làm</h4>\n<p>Nếu yêu cầu chuyển thành \"trả lời tự động cho toàn công ty qua hệ thống nội bộ\", \"đọc dữ liệu trực tiếp từ phần mềm nhân sự\" hay \"xử lý hồ sơ cá nhân ở quy mô lớn\", đó là lúc chuyển cho đội kỹ thuật và bảo mật, và xem lại yêu cầu chính sách (D6).</p>\n<div class=\"tip\">Câu hỏi về thiết kế giải pháp thường thưởng cho phương án có tiêu chí đạt viết trước và bộ ca thử gồm cả ca khó và ca ngoài phạm vi. Phương án \"thử vài câu thấy ổn là triển khai\" là bẫy.</div>\n<div class=\"warn\">Đừng để Claude tự định nghĩa thế nào là đạt. Claude có thể đề xuất tiêu chí, nhưng người chủ việc phải chốt; nếu không, bạn đang chấm Claude bằng thước của chính Claude.</div>",
     "keypoints": [
      "Giải pháp của associate thường là Project, bộ mẫu prompt, artifact nhỏ hoặc quy trình nhiều bước có điểm kiểm.",
      "Spec trả lời: ai dùng, đầu vào/đầu ra, phạm vi, tiêu chí đạt, ngoại lệ; Claude giúp tìm chỗ mơ hồ, người chủ việc chốt.",
      "Lập bộ ca thử trước: thường gặp, khó, ngoài phạm vi, không có trong tài liệu, đã biết đáp án.",
      "Đổi một thứ, chạy lại cùng bộ ca, ghi lại thay đổi; không báo lỗi chưa phải là đạt.",
      "Bàn giao kèm hướng dẫn dùng, người phụ trách, bộ ca thử; cần tích hợp hệ thống thì chuyển đội kỹ thuật."
     ],
     "sources": [
      {
       "t": "Workflow Integration & Solution Design (Claude Associate path)",
       "u": "https://anthropic-partners.skilljar.com/path/claude-associate/workflow-integration-solution-design"
      },
      {
       "t": "What are artifacts and how do I use them?",
       "u": "https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them"
      },
      {
       "t": "How can I create and manage projects?",
       "u": "https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects"
      }
     ]
    },
    {
     "id": "l-4-5",
     "title": "Từ pilot tới quy trình chạy thật: bản đồ stakeholder, điểm duyệt, tiêu chí đi tiếp",
     "minutes": 12,
     "html": "<p>Bài l-4-3 nói nên augment trước, chạy thử có điểm duyệt và nói thật với stakeholder. Bài này là phần \"làm thế nào\": ai cần tham gia, pilot được thiết kế ra sao, khi nào được đi tiếp, và giữ quy trình chạy tốt sau khi mở rộng.</p>\n<h4>Bản đồ stakeholder</h4>\n<table>\n<thead><tr><th>Nhóm</th><th>Họ quan tâm</th><th>Cần từ bạn</th></tr></thead>\n<tbody>\n<tr><td>Người tài trợ (sponsor)</td><td>Giá trị, chi phí, rủi ro</td><td>Mục tiêu đo được, kết quả pilot có số liệu</td></tr>\n<tr><td>Người sở hữu quy trình</td><td>Quy trình còn chạy đúng không</td><td>Bản vẽ quy trình mới, bước nào đổi, ai duyệt</td></tr>\n<tr><td>Người trực tiếp làm</td><td>Việc của họ thay đổi thế nào</td><td>Hướng dẫn, chỗ họ vẫn quyết định, kênh góp ý</td></tr>\n<tr><td>Pháp chế, bảo mật, IT</td><td>Dữ liệu, chính sách, công cụ được duyệt</td><td>Loại dữ liệu đưa vào, tài khoản dùng, cài đặt</td></tr>\n<tr><td>Người nhận kết quả</td><td>Chất lượng và sự minh bạch</td><td>Kết quả đúng; được thông báo nếu chính sách hoặc luật yêu cầu</td></tr>\n</tbody>\n</table>\n<p>Kéo pháp chế và bảo mật vào <em>trước</em> pilot, không phải sau khi đã chạy. Một pilot dùng dữ liệu chưa được phép là một sự cố, dù kết quả tốt.</p>\n<h4>Thiết kế pilot</h4>\n<ol>\n<li><strong>Phạm vi hẹp</strong>: một nhóm, một loại việc, một khoảng thời gian (ví dụ 4 tuần).</li>\n<li><strong>Số đo trước khi bắt đầu (baseline)</strong>: thời gian xử lý, tỉ lệ lỗi, số lần làm lại hiện tại. Không có baseline thì không chứng minh được cải thiện.</li>\n<li><strong>Thước đo</strong>: tốc độ, chất lượng (lỗi người duyệt bắt được, khiếu nại), và trải nghiệm của người làm.</li>\n<li><strong>Điểm duyệt</strong>: mọi output đi ra ngoài đều qua người duyệt trong thời gian pilot.</li>\n<li><strong>Nhật ký lỗi</strong>: ghi mỗi lỗi bắt được, loại lỗi, nguyên nhân, đã sửa ở đâu.</li>\n</ol>\n<h4>Tiêu chí đi tiếp, chỉnh, hay dừng</h4>\n<p>Viết trước khi pilot bắt đầu, để kết quả không bị diễn giải theo mong muốn:</p>\n<ul>\n<li><strong>Đi tiếp</strong>: đạt mục tiêu tốc độ, tỉ lệ lỗi không cao hơn baseline, không có lỗi nghiêm trọng lọt qua điểm duyệt.</li>\n<li><strong>Chỉnh rồi thử tiếp</strong>: nhanh hơn nhưng một loại lỗi lặp lại; sửa prompt, knowledge hoặc chia lại bước.</li>\n<li><strong>Dừng</strong>: lỗi nghiêm trọng khó phát hiện, hoặc thời gian duyệt ăn hết thời gian tiết kiệm.</li>\n</ul>\n<h4>Mở rộng theo từng nấc</h4>\n<p>Mở rộng từng nhóm một thay vì cả phòng cùng lúc. Mỗi nấc giữ điểm duyệt, chỉ nới mức duyệt (ví dụ từ duyệt toàn bộ sang duyệt mẫu) khi số liệu cho thấy ổn định, và không nới với loại output rủi ro cao. Kèm theo: đào tạo ngắn cho người dùng mới, một người phụ trách cấu hình, và kênh báo lỗi rõ ràng.</p>\n<h4>Theo dõi sau khi chạy thật</h4>\n<ul>\n<li>Xem lại thước đo định kỳ; chất lượng có thể trượt khi tài liệu nguồn đổi hoặc loại yêu cầu đổi.</li>\n<li>Khi chính sách, sản phẩm hay quy định thay đổi, cập nhật cấu hình và chạy lại bộ ca thử.</li>\n<li>Giữ người trong quy trình hiểu việc: nếu không ai còn tự làm được bước Claude đang làm, sẽ không ai bắt được lỗi của nó.</li>\n</ul>\n<h4>Báo cáo kết quả</h4>\n<p>Báo cáo pilot tốt có số trước và sau, các lỗi đã gặp và cách quy trình bắt được chúng, chi phí thời gian duyệt, và đề xuất bước tiếp theo. Mục tiêu cuối của khóa Workflow Integration là truyền đạt giá trị và giới hạn của Claude <strong>một cách chính xác</strong>; một báo cáo chỉ có điểm tốt không đạt yêu cầu đó.</p>\n<div class=\"tip\">Đề hay hỏi \"bước tiếp theo sau pilot thành công\". Đáp án tốt thường là mở rộng có kiểm soát (thêm một nhóm, giữ điểm duyệt, tiếp tục đo), không phải \"bỏ bước duyệt vì pilot không có lỗi\" hay \"triển khai toàn công ty ngay\".</div>\n<div class=\"warn\">Thời gian duyệt là một phần chi phí. Pilot báo \"tiết kiệm 5 giờ mỗi tuần\" mà không tính 4 giờ người duyệt bỏ ra là báo cáo sai lệch.</div>",
     "keypoints": [
      "Lập bản đồ stakeholder: sponsor, người sở hữu quy trình, người làm, pháp chế/bảo mật/IT, người nhận; kéo pháp chế và bảo mật vào trước pilot.",
      "Pilot: phạm vi hẹp, baseline, thước đo tốc độ và chất lượng, điểm duyệt cho mọi output ra ngoài, nhật ký lỗi.",
      "Tiêu chí đi tiếp / chỉnh / dừng viết trước khi pilot bắt đầu.",
      "Mở rộng từng nấc, chỉ nới mức duyệt khi số liệu ổn định, không nới với output rủi ro cao.",
      "Báo cáo trung thực: số trước/sau, lỗi đã gặp, chi phí thời gian duyệt."
     ],
     "sources": [
      {
       "t": "Workflow Integration & Solution Design (Claude Associate path)",
       "u": "https://anthropic-partners.skilljar.com/path/claude-associate/workflow-integration-solution-design"
      },
      {
       "t": "AI Fluency: Framework & Foundations",
       "u": "https://anthropic.skilljar.com/ai-fluency-framework-foundations"
      }
     ]
    }
   ],
   "cheat": [
    [
     "Delegation (4D)",
     "Problem Awareness, Platform Awareness, Task Delegation"
    ],
    [
     "Bước đầu tiên",
     "Hiểu vấn đề đo được + vẽ lại quy trình hiện tại; không bắt đầu từ công cụ"
    ],
    [
     "Chia việc",
     "Mỗi bước: đầu vào, đầu ra, ai quyết, hậu quả nếu sai, kiểm được không"
    ],
    [
     "Giao / cộng tác / giữ",
     "Lặp lại, kiểm được → Claude; cần phán đoán → cộng tác; quyết định cuối, trách nhiệm → người"
    ],
    [
     "Tự động hóa sai bước",
     "Có thể phản tác dụng; bước giao tốt là bước lỗi được bắt trước khi gây hại"
    ],
    [
     "Research/kế hoạch/tối ưu",
     "Claude soạn phương án, người chủ việc quyết; đề xuất tối ưu là giả thuyết"
    ],
    [
     "Xếp hạng phương án",
     "Đưa tiêu chí và trọng số trước"
    ],
    [
     "Automation / Augmentation / Agency",
     "AI làm theo lệnh / cùng suy nghĩ / AI tự làm theo cấu hình"
    ],
    [
     "Augment vs redesign",
     "Thêm vào bước có sẵn (rủi ro thấp) vs làm lại quy trình (sau pilot, có bằng chứng)"
    ],
    [
     "Pilot",
     "Mẫu việc thật đã biết đáp án, có điểm duyệt của người, đo theo tiêu chí viết trước"
    ],
    [
     "Stakeholder",
     "Giá trị cụ thể + giới hạn thật + quy trình kiểm soát; không cam kết hoàn hảo"
    ],
    [
     "Chuyển đội kỹ thuật",
     "Khi cần tích hợp hệ thống, API, bảo mật riêng, dữ liệu nhạy cảm quy mô lớn"
    ],
    [
     "Spec giải pháp",
     "Ai dùng, đầu vào/đầu ra, phạm vi, tiêu chí đạt, ngoại lệ; người chủ việc chốt"
    ],
    [
     "Bộ ca thử",
     "Thường gặp, khó, ngoài phạm vi, không có trong tài liệu, đã biết đáp án"
    ],
    [
     "Pilot",
     "Phạm vi hẹp, baseline, thước đo, điểm duyệt, nhật ký lỗi; tiêu chí đi tiếp/chỉnh/dừng viết trước"
    ],
    [
     "Sau pilot thành công",
     "Mở rộng từng nấc, giữ điểm duyệt, tiếp tục đo; tính cả thời gian duyệt vào chi phí"
    ]
   ],
   "quiz": [
    {
     "q": "A department head says, 'We have Claude licenses now; let's use AI in procurement.' As the associate asked to lead this, what should you do FIRST?",
     "options": [
      "Roll Claude out to the whole procurement team at once and collect feedback after a month to see where it helps most",
      "Pick the most capable model and write a general procurement prompt",
      "Ask Claude to recommend which procurement tasks to automate",
      "Identify a specific, measurable procurement problem and map how the current process actually works step by step"
     ],
     "answer": 3,
     "explain": "Delegation bắt đầu từ Problem Awareness: hiểu vấn đề cụ thể, đo được và quy trình hiện tại trước khi quyết Claude làm phần nào. Triển khai cho cả đội khi chưa có vấn đề rõ là bắt đầu từ công cụ. Chọn model là bước sau. Claude không biết quy trình thật của công ty nên không thể tự quyết nên tự động hóa gì."
    },
    {
     "q": "An HR team is mapping its hiring workflow to decide where Claude fits. Which step is MOST appropriate to KEEP with a human decision-maker?",
     "options": [
      "Formatting interview notes into a standard template",
      "Making the final decision on which candidate receives an offer",
      "Drafting a first version of the job posting from a list of requirements",
      "Summarizing common questions candidates ask about benefits"
     ],
     "answer": 1,
     "explain": "Quyết định cuối về con người (ai được nhận) là việc có hậu quả lớn, cần phán xét và trách nhiệm, thuộc lĩnh vực việc làm mà Usage Policy coi là rủi ro cao — phải giữ cho người. Định dạng ghi chú, soạn nháp tin tuyển dụng, tóm tắt câu hỏi thường gặp đều là việc lặp lại, kiểm được, hợp để giao cho Claude."
    },
    {
     "q": "Claude reviewed a description of a team's invoice-approval process and suggested removing a second-approval step to save time. What should the operations lead do?",
     "options": [
      "Remove the step immediately, since Claude identified it as redundant",
      "Ignore the suggestion, since Claude does not understand finance",
      "Treat it as a hypothesis: find out why the step exists, check error and fraud data, and consult the people involved",
      "Ask Claude to rewrite the suggestion more persuasively, with estimated time savings, so leadership approves the change quickly"
     ],
     "answer": 2,
     "explain": "Đề xuất tối ưu của Claude là giả thuyết: Claude không thấy dữ liệu vận hành, yêu cầu kiểm soát nội bộ hay lý do lịch sử của bước duyệt thứ hai (có thể là kiểm soát gian lận). Phải kiểm với dữ liệu và người trong cuộc. Làm theo ngay là rủi ro; bỏ qua hoàn toàn thì mất một gợi ý có thể có giá trị; viết lại cho thuyết phục hơn là bỏ qua bước kiểm."
    },
    {
     "q": "A team wants to bring Claude into its weekly client-reporting process, which currently works but is slow. Which TWO approaches are MOST appropriate as a starting point? (Choose TWO.)",
     "options": [
      "Start by adding Claude to one or two time-consuming steps (such as drafting the narrative from approved data) while keeping the rest of the process unchanged",
      "Redesign the entire reporting process around Claude before running any test",
      "Run a pilot on a few real past reports, with a human reviewing every output against defined success criteria",
      "Let Claude send reports directly to clients to measure time savings",
      "Skip success criteria and judge the pilot by how the team feels afterward"
     ],
     "answer": [
      0,
      2
     ],
     "explain": "Quy trình đang chạy ổn chỉ chậm → bắt đầu bằng augment ở bước tốn thời gian, và pilot trên báo cáo thật có người duyệt và tiêu chí thành công. Redesign toàn bộ khi chưa thử là rủi ro cao. Gửi thẳng cho khách bỏ mất điểm duyệt ở nội dung đối ngoại. Không có tiêu chí thì không biết pilot có thành công hay không."
    },
    {
     "q": "A manager is presenting a Claude pilot to leadership. During the pilot, Claude saved significant drafting time but produced two drafts with incorrect figures, which reviewers caught. How should the manager present the results?",
     "options": [
      "Report the time savings with numbers, describe the two errors and how review caught them, and keep human review in the rollout",
      "Report only the time savings, since the errors were caught and did not reach clients",
      "Report that Claude is 100% accurate once reviewed, so review can be removed later",
      "Recommend against rollout, because a tool that produced incorrect figures in a pilot cannot be trusted with client-facing reports"
     ],
     "answer": 0,
     "explain": "Báo cáo trung thực cân bằng: lợi ích có số liệu, lỗi thật, và biện pháp kiểm soát đã bắt được lỗi. Giấu lỗi làm mất uy tín khi có sự cố. Hứa '100% chính xác' là hứa hoàn hảo. Bác bỏ hoàn toàn bỏ qua việc quy trình có người duyệt đã kiểm soát được rủi ro."
    },
    {
     "q": "An events team used Claude for six months to draft attendee emails one at a time. They now notice that most of their time goes into manually copying details from the registration spreadsheet into each draft, a step that exists only because of how the old tools worked. Which approach does this situation BEST support?",
     "options": [
      "Keep augmenting the same drafting step, but write longer and more detailed prompts so each individual email takes less editing",
      "Stop using Claude, because the gains have plateaued",
      "Redesign the workflow so Claude drafts emails in batches directly from the spreadsheet data for human review, then pilot it",
      "Ask each team member to choose their own approach"
     ],
     "answer": 2,
     "explain": "Khi một bước tồn tại chỉ vì giới hạn của công cụ cũ và augment đã chạm trần, đó là tín hiệu để redesign quy trình quanh khả năng mới — vẫn giữ người duyệt và pilot trước. Prompt dài hơn không bỏ được bước chép tay. Dừng dùng Claude bỏ qua cơ hội rõ ràng. Mỗi người một kiểu làm mất tính nhất quán."
    }
   ],
   "bank": [
    {
     "q": "Before proposing that Claude draft client renewal summaries, an account manager confirms that Claude cannot see the company CRM unless data is provided through files or an approved connector, and that outputs can vary between runs. Which Delegation competency is she exercising?",
     "options": [
      "Platform Awareness",
      "Task Delegation",
      "Transparency Diligence",
      "Problem Awareness"
     ],
     "answer": 0,
     "explain": "Platform Awareness là hiểu khả năng và giới hạn của hệ thống AI, ví dụ Claude không thấy dữ liệu nội bộ nếu không được cung cấp và output có thể khác nhau giữa các lần chạy. Problem Awareness là hiểu rõ mục tiêu và bản chất công việc. Task Delegation là phân chia việc giữa người và AI. Transparency Diligence thuộc nhóm Diligence: trung thực về vai trò của AI với người cần biết."
    },
    {
     "q": "A school operations director wants to 'use Claude to help the admissions office.' Which problem statement gives the BEST starting point for designing a solution?",
     "options": [
      "'List everything Claude can do, then decide where to use it across the whole school, starting with whichever department asks first'",
      "'We should use AI in admissions because other schools in our district are already using it, and parents now expect it'",
      "'Claude should handle admissions from now on'",
      "'Staff spend about 10 hours a week answering the same 15 parent questions by email, delaying replies by up to three days'"
     ],
     "answer": 3,
     "explain": "Điểm xuất phát tốt là một vấn đề cụ thể, đo được: ai đang chịu, mất bao nhiêu thời gian, hậu quả là gì; nó còn cho sẵn thước đo thành công. 'Vì trường khác dùng' là bắt đầu từ công cụ. 'Claude lo tuyển sinh' quá rộng và giao cả quyết định quan trọng. Liệt kê mọi khả năng rồi mới tìm chỗ dùng là đi ngược: bắt đầu từ công cụ thay vì từ vấn đề."
    },
    {
     "q": "A logistics team is mapping its returns process step by step to see where Claude could help. For each step, which set of questions is MOST useful to record?",
     "options": [
      "Which steps would sound the most impressive to automate when the team presents its AI plans to leadership next quarter",
      "Inputs and outputs, who decides, the consequence if it goes wrong, and whether the result can be checked",
      "How long each employee on the team has worked at the company",
      "Which Claude model is newest and how many features it offers"
     ],
     "answer": 1,
     "explain": "Khi chia quy trình, mỗi bước nên được mô tả theo đầu vào, đầu ra, ai quyết, hậu quả nếu sai và có kiểm được kết quả không; đó là dữ liệu để quyết định giao cho Claude, cộng tác hay giữ cho người. Model mới nhất là câu hỏi công cụ, không phải phân tích quy trình. Thâm niên nhân viên không liên quan. Chọn bước 'nghe ấn tượng' bỏ qua rủi ro và giá trị thật."
    },
    {
     "q": "A customer support team is choosing the first step of its workflow to hand to Claude. Which step is the BEST candidate?",
     "options": [
      "Sending account-closure notices to customers directly, without any agent review",
      "Drafting suggested replies that agents review and edit before sending",
      "Automatically approving or denying refund requests and notifying customers directly",
      "Deciding on its own which customer complaints to escalate to the legal team"
     ],
     "answer": 1,
     "explain": "Bước tốt để giao là bước mà nếu Claude sai, người ở bước sau phát hiện được trước khi gây hại: bản nháp được nhân viên duyệt và sửa trước khi gửi. Tự động duyệt hoàn tiền và báo thẳng cho khách là quyết định có hậu quả mà không có điểm kiểm. Quyết định chuyển sang pháp chế cần phán đoán và trách nhiệm. Gửi thông báo đóng tài khoản không qua duyệt là hành động khó đảo ngược với khách hàng."
    },
    {
     "q": "Before piloting Claude for drafting monthly vendor performance reports, a procurement lead wants to define success. Which criterion is MOST useful?",
     "options": [
      "'Drafting time drops from 6 hours to 2, with zero figures that differ from the source data after review'",
      "'We use Claude as much as possible on every report, every month, regardless of whether it actually saves any time'",
      "'The team feels positive about using AI'",
      "'Claude produces reports that look polished and professional enough that the vendors find them easy to read'"
     ],
     "answer": 0,
     "explain": "Tiêu chí thành công nên đo được và gắn với mục tiêu: thời gian giảm bao nhiêu, chất lượng (số liệu khớp nguồn) giữ ở mức nào. Cảm nhận tích cực và 'trông chuyên nghiệp' không đo được và không bắt được số sai. Dùng càng nhiều càng tốt là đo mức sử dụng, không đo giá trị."
    },
    {
     "q": "An HR team wants to test whether Claude can reliably sort employees' policy questions into categories. Which pilot design is BEST?",
     "options": [
      "Test it on three made-up questions written by the project lead",
      "Ask Claude to estimate its own accuracy on the task",
      "Run Claude on past questions HR has already categorized and compare its results with the known answers",
      "Launch it to all employees and count complaints in the first month"
     ],
     "answer": 2,
     "explain": "Thử trên hồ sơ cũ đã biết đáp án là cách rẻ nhất để biết Claude làm tốt tới đâu, vì có chuẩn để so. Triển khai cho toàn công ty rồi đếm phàn nàn là thử trên người thật, không có điểm kiểm, và lỗi không ai nhận ra sẽ bị bỏ sót. Ba câu tự nghĩ ra quá ít và không đại diện cho câu hỏi thật. Claude tự ước lượng độ chính xác không phải là phép đo."
    },
    {
     "q": "A project manager is gathering background for a lessons-learned review. She needs to know why the team chose a particular vendor two years ago. The reasoning was never written down, and the decision-maker still works at the company. What is the BEST way to get this information?",
     "options": [
      "Search her email with a connector and treat whatever Claude finds as the full reasoning, without consulting the decision-maker",
      "Ask Claude to infer the most likely reasons",
      "Run Research to find the reasoning online",
      "Ask the decision-maker directly"
     ],
     "answer": 3,
     "explain": "Chọn kênh theo nơi chứa thông tin: lý do chưa từng được ghi lại chỉ nằm trong đầu người quyết định, nên phải hỏi người. Research tìm thông tin công khai, không có lý do nội bộ. Để Claude suy đoán là tạo ra lý do nghe hợp lý nhưng không có căn cứ. Connector chỉ thấy những gì có trong email; coi đó là toàn bộ lý do khi chưa hỏi người trong cuộc là bỏ qua nguồn chính."
    },
    {
     "q": "A facilities lead asks Claude to 'pick the best cleaning vendor' from four proposals. Which approach BEST keeps the decision sound?",
     "options": [
      "Give Claude the criteria and their weights, ask it to score each proposal with reasons, and make the final choice herself",
      "Let Claude choose the vendor on its own, since it can read and compare all four proposals much faster and more thoroughly than she can",
      "Ask Claude to pick the cheapest vendor automatically",
      "Ask Claude which criteria usually matter for cleaning vendors, then accept the vendor it selects without reviewing how each proposal was scored"
     ],
     "answer": 0,
     "explain": "Khi nhờ Claude xếp hạng phương án, đưa tiêu chí và trọng số trước, yêu cầu chấm có lý do, và giữ quyết định cuối cho người. Để Claude tự chọn là giao luôn quyết định và để Claude tự chọn tiêu chí. Rẻ nhất chỉ là một tiêu chí, có thể bỏ qua chất lượng hoặc an toàn. Dùng tiêu chí chung của Claude rồi chấp nhận mà không xem lại thì tiêu chí có thể không phải của tổ chức."
    },
    {
     "q": "A nonprofit program lead asks Claude to draft a six-month plan for launching a volunteer mentoring program. Which request will produce the MOST useful draft?",
     "options": [
      "Ask Claude for a final plan that can go to the board immediately, without further review by the program team or the director",
      "Ask for an ideal plan without any constraints, to see the best possible version first",
      "Ask for a plan that guarantees the program will succeed",
      "Give the real budget, staffing, and deadline, and ask Claude to list its assumptions, dependencies, and risks with the plan"
     ],
     "answer": 3,
     "explain": "Claude lập kế hoạch tốt khi có ràng buộc thật và được yêu cầu nêu giả định, phụ thuộc, rủi ro, để người phụ trách thấy chỗ cần kiểm. Kế hoạch 'lý tưởng, không ràng buộc' khó dùng thật. Gửi thẳng hội đồng mà không qua duyệt bỏ mất vai trò người chịu trách nhiệm. Không ai, kể cả Claude, bảo đảm được chương trình thành công."
    },
    {
     "q": "An office manager wants Claude to help turn her team's undocumented invoice-processing routine into a written SOP. Which approach is BEST?",
     "options": [
      "Wait until the process is perfect before documenting anything",
      "Ask Claude to write a generic invoice SOP and adopt it as is",
      "Describe the routine to Claude, ask it to structure the steps and flag gaps, then have the people who do the work review the draft",
      "Have Claude base the SOP on an online template so that nobody on the team has to spend time explaining how they currently work"
     ],
     "answer": 2,
     "explain": "Claude hữu ích khi cấu trúc lời kể thành các bước và chỉ ra chỗ thiếu ('ai duyệt bước này?'), còn người trực tiếp làm việc soát lại để bảo đảm đúng thực tế. SOP chung chung không phản ánh cách nhóm làm thật. Bỏ qua việc hỏi người làm khiến tài liệu sai với quy trình thực tế. Chờ quy trình hoàn hảo thì không bao giờ viết được tài liệu."
    },
    {
     "q": "A customer service manager wants Claude to automatically read new tickets from the company's internal ticketing system, classify them, and write the results back, at several thousand tickets per day. What is the MOST appropriate next step?",
     "options": [
      "Build it herself by adding an unvetted custom connector she found online",
      "Bring in the technical team to design an integration with the right security controls",
      "Share her Claude login with the support team so everyone can paste tickets in",
      "Copy and paste each ticket into a Claude chat by hand"
     ],
     "answer": 1,
     "explain": "Giải pháp cần tích hợp với hệ thống nội bộ, xử lý khối lượng lớn và kiểm soát bảo mật, nên chuyển cho đội kỹ thuật (và đội bảo mật) thay vì tự chắp vá. Dán tay hàng nghìn ticket mỗi ngày không khả thi. Help center nói connector tùy chỉnh không được Anthropic kiểm định và chỉ nên kết nối server của tổ chức đáng tin; tự gắn một connector chưa kiểm tra vào hệ thống công ty là rủi ro. Chia sẻ đăng nhập vi phạm kiểm soát truy cập."
    },
    {
     "q": "Each week a team member pastes the meeting transcript into Claude and asks it to convert the transcript into an action-item list using a fixed template, then checks the list. In the AI Fluency framework, which mode of interaction is this?",
     "options": [
      "Agency",
      "Delegation",
      "Augmentation",
      "Automation"
     ],
     "answer": 3,
     "explain": "Automation là AI thực hiện việc cụ thể theo chỉ dẫn cụ thể: người định nghĩa làm gì, AI làm. Augmentation là người và AI cùng suy nghĩ, trao đổi qua lại. Agency là người cấu hình để AI tự làm việc thay mình, kể cả tương tác với người khác. Delegation là một trong bốn năng lực của khung 4D (quyết định có nên, khi nào, bằng cách nào dùng AI), không phải một chế độ tương tác."
    },
    {
     "q": "An HR team sets up Claude with approved policy documents and behavior guidelines so it can answer employees' benefits questions on its own, with HR reviewing a sample of conversations each week. Which mode of interaction does this BEST represent?",
     "options": [
      "Augmentation",
      "Discernment",
      "Agency",
      "Automation"
     ],
     "answer": 2,
     "explain": "Agency là người cấu hình kiến thức và khuôn hành vi để AI tự làm việc thay mình, kể cả tương tác với người khác; ở đây Claude tự trả lời nhân viên dựa trên tài liệu và hướng dẫn đã thiết lập. Automation là AI làm một việc cụ thể theo chỉ dẫn cụ thể của người. Augmentation là cùng suy nghĩ qua lại. Discernment là năng lực đánh giá output trong khung 4D, không phải chế độ tương tác."
    },
    {
     "q": "A finance team's month-end close runs reliably, but writing the variance commentary takes two days. Leadership wants a low-risk improvement this quarter. Which approach fits BEST?",
     "options": [
      "Make no changes until a full redesign can be planned",
      "Augment: have Claude draft the commentary from approved figures for analyst review, leaving the rest of the close unchanged",
      "Redesign the entire close around Claude right away, before testing anything",
      "Replace the analysts' review with Claude's own self-check"
     ],
     "answer": 1,
     "explain": "Quy trình đang chạy ổn, chỉ chậm ở một bước, và cần rủi ro thấp: augment, tức thêm Claude vào bước viết bình luận, có người duyệt, giữ nguyên phần còn lại. Redesign toàn bộ khi chưa thử là rủi ro cao, đổi vai trò và khó quay lại. Thay người duyệt bằng việc Claude tự kiểm bỏ mất điểm kiểm soát với số liệu tài chính. Chờ kế hoạch redesign là bỏ qua cải thiện an toàn có thể làm ngay."
    },
    {
     "q": "A sales VP wants to tell prospects that the team's Claude-assisted proposals are '100% AI-verified and error-free.' As the person who ran the internal rollout, what should you recommend?",
     "options": [
      "Describe the real controls instead, such as account-lead review of every proposal and price checks against source data",
      "Use the claim, but only in verbal conversations",
      "Stop using Claude for proposals so no claims are needed",
      "Approve the claim, since Claude's outputs are highly accurate and the proposals have rarely needed corrections so far"
     ],
     "answer": 0,
     "explain": "Với stakeholder, hãy cam kết về quy trình kiểm soát chứ không cam kết sự hoàn hảo: output có thể sai dù văn phong thuyết phục. Tuyên bố '100% không lỗi' sẽ mất uy tín ngay khi có lỗi đầu tiên. Nói miệng thay vì viết vẫn là hứa sai sự thật với khách. Ngừng dùng Claude là phản ứng quá tay, bỏ mất lợi ích đã có."
    },
    {
     "q": "A team launched a Project to answer internal travel-policy questions. After one week nobody has reported a problem, and the owner wants to declare it validated. What should she do instead?",
     "options": [
      "Run a prepared set of real and tricky questions through the Project and score the answers against defined criteria",
      "Declare it validated, since no complaints means it works",
      "Ask the Project itself whether its answers have been accurate",
      "Wait until the first serious complaint arrives from an employee and only then begin testing how accurate the answers are"
     ],
     "answer": 0,
     "explain": "Trong vòng lặp thiết kế (lên kế hoạch → làm → đánh giá → sửa), không có báo lỗi chưa có nghĩa là đạt yêu cầu: người dùng có thể không nhận ra câu trả lời sai. Cần chạy bộ câu hỏi thật, kể cả câu khó, và chấm theo tiêu chí. Chờ phàn nàn đầu tiên là để lỗi tới tay người dùng trước. Hỏi chính Project tự đánh giá không phải phép kiểm độc lập."
    },
    {
     "q": "A product marketing manager receives a vague request from leadership: 'Create a customer education program.' How can Claude BEST help at this early stage?",
     "options": [
      "Ask Claude to write the full program immediately based on its own assumptions",
      "Paste the request and ask Claude to identify ambiguities, missing information, and questions to clarify with leadership",
      "Skip clarification and have Claude produce ten complete versions of the program so leadership can simply pick one",
      "Ask Claude to decide the program's scope and budget"
     ],
     "answer": 1,
     "explain": "Ở khâu phân tích yêu cầu, Claude giúp chỉ ra chỗ mơ hồ, thông tin còn thiếu và câu hỏi cần hỏi lại stakeholder; quyết định phạm vi vẫn thuộc người chủ việc. Để Claude quyết phạm vi và ngân sách là giao quyết định không thuộc về nó. Viết ngay theo giả định của Claude dễ đi sai hướng. Mười phiên bản hoàn chỉnh tốn công mà vẫn chưa làm rõ lãnh đạo thật sự cần gì."
    },
    {
     "q": "An HR team maps its new-hire onboarding workflow. Which TWO steps are the BEST candidates to delegate to Claude, with HR reviewing the output? (Choose TWO.)",
     "options": [
      "Producing a draft first-week schedule from the role description and the team's calendar notes",
      "Drafting personalized welcome emails from an approved template",
      "Approving the new hire's final salary",
      "Handling a new hire's confidential harassment complaint",
      "Deciding whether a new hire passes probation"
     ],
     "answer": [
      0,
      1
     ],
     "explain": "Soạn email chào mừng theo mẫu và lập nháp lịch tuần đầu là việc lặp lại, dựa trên văn bản, kiểm nhanh được; sai thì HR sửa trước khi gửi. Quyết định qua thử việc và duyệt lương là quyết định về con người, có hậu quả và cần người chịu trách nhiệm. Xử lý khiếu nại quấy rối bảo mật đòi hỏi phán đoán, sự tin cậy và trách nhiệm của con người."
    },
    {
     "q": "You are presenting a Claude rollout plan to a skeptical compliance committee. Which TWO points BEST give them an accurate picture? (Choose TWO.)",
     "options": [
      "Using the most capable model guarantees accurate outputs",
      "Claude has no limitations worth discussing with the committee",
      "Claude will replace the compliance review step entirely",
      "Outputs can be fluent yet wrong, so the plan builds human review into every external deliverable",
      "Claude only knows internal information that is provided to it, for example through files, Projects, or approved connectors"
     ],
     "answer": [
      3,
      4
     ],
     "explain": "Bức tranh thực tế cho stakeholder gồm giới hạn thật (Claude không biết dữ liệu nội bộ trừ khi được cung cấp; output có thể sai dù trôi chảy) và biện pháp kiểm soát (người duyệt). Không model nào bảo đảm chính xác. Thay hẳn bước duyệt của compliance là bỏ kiểm soát. Nói rằng không có giới hạn là cam kết sai và làm mất uy tín."
    }
   ]
  },
  {
   "id": "d5",
   "name": "Configuration and Knowledge Management",
   "weight": 12,
   "intro": "<p>Domain này hỏi về <strong>cấu hình để Claude làm đúng lâu dài</strong>: cái gì đưa vào project instructions, cái gì đưa vào project knowledge, file tải lên và connector cho Claude thấy gì và theo quyền của ai, viết chỉ dẫn cấp hệ thống thế nào, và giữ cấu hình luôn đúng khi tài liệu thay đổi.</p><p>Ranh giới: quyết định <em>có nên</em> dùng Project thay vì chat thường là D3. D5 giả định bạn đã chọn dùng Project và hỏi cách dựng, chia sẻ, bảo trì nó.</p>",
   "lessons": [
    {
     "id": "l-5-0",
     "title": "Nền tảng D5: cấu hình là gì, gồm những lớp nào, và Claude thấy gì khi bạn mở một chat",
     "minutes": 12,
     "html": "<p>Bốn bài của Domain 5 cùng nói về <strong>cấu hình</strong>: những thứ bạn đặt sẵn một lần để mọi cuộc chat sau đều dùng, thay vì dán lại mỗi lần. Bài này dựng từ đầu: cấu hình gồm những lớp nào, mỗi lớp áp cho phạm vi nào, và khi mở một chat thì Claude thực sự thấy gì.</p>\n<h4>Vì sao cần cấu hình</h4>\n<p>Mỗi cuộc chat mới bắt đầu từ con số không: Claude không tự nhớ bạn đã dặn gì trong chat hôm qua. Nếu cả nhóm ngày nào cũng dán lại cùng một đoạn chỉ dẫn và cùng bộ tài liệu, đó là dấu hiệu thông tin ấy nên nằm trong cấu hình. Cấu hình tốt làm output nhất quán giữa các chat và giữa các người dùng; cấu hình kém thì mọi người cùng chịu một lỗi.</p>\n<h4>Các lớp cấu hình và phạm vi</h4>\n<table>\n<thead><tr><th>Lớp</th><th>Chứa gì</th><th>Áp cho</th></tr></thead>\n<tbody>\n<tr><td>Instructions for Claude</td><td>Sở thích và cách làm việc của cá nhân bạn</td><td>Mọi cuộc chat của bạn</td></tr>\n<tr><td>Project instructions</td><td>Vai, giọng, quy trình, định dạng cho một nhóm việc</td><td>Mọi chat trong một Project</td></tr>\n<tr><td>Project knowledge</td><td>Tài liệu tham khảo: chính sách, sổ tay, mẫu</td><td>Mọi chat trong một Project</td></tr>\n<tr><td>Memory</td><td>Điều Claude ghi nhớ dần về bạn theo từng chủ đề</td><td>Tài khoản; mỗi Project có memory riêng</td></tr>\n<tr><td>Skills</td><td>Chỉ dẫn, script, tài nguyên cho việc chuyên biệt</td><td>Nạp khi việc liên quan</td></tr>\n<tr><td>Connector</td><td>Quyền truy cập ứng dụng như Drive, Gmail, Calendar</td><td>Chat bật connector đó, theo quyền của người dùng</td></tr>\n<tr><td>File đính kèm chat</td><td>Tài liệu cho một việc</td><td>Chỉ chat đó</td></tr>\n</tbody>\n</table>\n<p>Help center về personalization mô tả Instructions for Claude áp cho mọi cuộc trò chuyện, project instructions chỉ áp trong Project đó, và các tính năng dùng riêng hoặc kết hợp được. Trang này không nói lớp nào \"thắng\" khi hai lớp mâu thuẫn, nên cách an toàn là đừng để chúng mâu thuẫn (cách xử lý ở l-5-3).</p>\n<h4>Khi bạn mở một chat trong Project, Claude thấy gì</h4>\n<ul>\n<li>Project instructions và project knowledge.</li>\n<li>Memory của Project đó cộng memory từ các chat ngoài Project, không bao giờ memory của Project khác. Tắt \"Use account memory\" ở trang Project để cách ly hoàn toàn.</li>\n<li>Instructions for Claude của chính bạn.</li>\n<li>Tin nhắn, file của chat hiện tại, và kết quả từ connector hay web search nếu được bật.</li>\n</ul>\n<p>Claude <strong>không</strong> thấy: tên và mô tả Project (help center ghi rõ), và nội dung các chat khác trong cùng Project, trừ khi thông tin đó được đưa vào knowledge.</p>\n<h4>Cấu hình cũng chiếm context</h4>\n<p>Instructions, knowledge, công cụ đang bật đều nằm trong context và được xử lý ở mỗi lượt. Help center khuyên giữ project instructions ngắn gọn, gỡ file không dùng và giới hạn số công cụ, connector đang bật. Khi knowledge của Project gần chạm giới hạn context, gói trả phí tự chuyển sang <strong>RAG</strong>: Claude dùng công cụ tìm trong project knowledge để lấy phần liên quan thay vì nạp hết, mở rộng dung lượng tới khoảng 10 lần; không có nút bật tay.</p>\n<h4>Ba câu hỏi phân loại nhanh</h4>\n<ol>\n<li>Nội dung này <em>chỉ cách làm</em> hay <em>cung cấp thông tin</em>? Cách làm → instructions; thông tin → knowledge.</li>\n<li>Nó đúng cho <em>ai</em>? Chỉ mình bạn ở mọi việc → Instructions for Claude; cả nhóm trong một mảng việc → Project.</li>\n<li>Nó <em>mới tới đâu</em>? Cần dữ liệu lúc hỏi → connector; tài liệu ổn định → knowledge.</li>\n</ol>\n<h4>Bài nào trong Domain 5 đụng vào phần nào</h4>\n<table>\n<thead><tr><th>Bài</th><th>Nội dung chính</th></tr></thead>\n<tbody>\n<tr><td>l-5-0 (bài này)</td><td>Các lớp cấu hình, phạm vi, Claude thấy gì, cấu hình chiếm context</td></tr>\n<tr><td>l-5-1 Project: instructions, knowledge, chia sẻ</td><td>Phân biệt instructions và knowledge, ba tầng chỉ dẫn, RAG, quyền Can view/Can edit</td></tr>\n<tr><td>l-5-2 File và connector</td><td>Định dạng file, quyền kế thừa, bản sao tĩnh và bản đồng bộ, kiểm soát của admin</td></tr>\n<tr><td>l-5-3 Chỉ dẫn cấp hệ thống</td><td>Khung viết, xử lý xung đột, kiểm thử, dấu hiệu cấu hình lỗi thời</td></tr>\n<tr><td>l-5-4 Bảo trì theo vòng đời</td><td>Người phụ trách, nhật ký thay đổi, tài liệu đồng bộ, thành viên, memory, kết thúc Project</td></tr>\n</tbody>\n</table>\n<div class=\"tip\">Khi đề mô tả \"mọi người trong nhóm phải dán lại cùng một đoạn hướng dẫn mỗi lần\", đáp án là đưa nó vào project instructions. Khi đề mô tả \"Claude không biết nội dung chính sách mới\", đáp án là cập nhật knowledge.</div>\n<div class=\"warn\">Viết chỉ dẫn vào tên hoặc mô tả Project là vô ích: Claude không đọc được hai trường này.</div>",
     "keypoints": [
      "Cấu hình là thứ đặt sẵn một lần cho mọi chat sau; mỗi chat mới không tự nhớ chat trước.",
      "Lớp và phạm vi: Instructions for Claude (mọi chat của bạn), project instructions và knowledge (một Project), memory, Skills (nạp khi cần), connector, file chat (một chat).",
      "Trong Project, Claude thấy instructions, knowledge, memory của Project cộng memory ngoài Project; không thấy tên/mô tả Project và chat khác.",
      "Cấu hình chiếm context: instructions gọn, gỡ file thừa, ít công cụ; knowledge lớn thì gói trả phí tự chuyển RAG (tới khoảng 10x).",
      "Phân loại: cách làm → instructions; thông tin → knowledge; dữ liệu cần lúc hỏi → connector."
     ],
     "sources": [
      {
       "t": "Understanding Claude's personalization features",
       "u": "https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features"
      },
      {
       "t": "How can I create and manage projects?",
       "u": "https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects"
      },
      {
       "t": "Use Claude's chat search and memory",
       "u": "https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context"
      },
      {
       "t": "Retrieval augmented generation (RAG) for projects",
       "u": "https://support.claude.com/en/articles/11473015-retrieval-augmented-generation-rag-for-projects"
      },
      {
       "t": "How large is the context window on paid Claude plans?",
       "u": "https://support.claude.com/en/articles/8606394-how-large-is-the-context-window-on-paid-claude-plans"
      },
      {
       "t": "What are Skills?",
       "u": "https://support.claude.com/en/articles/12512176-what-are-skills"
      }
     ]
    },
    {
     "id": "l-5-1",
     "title": "Project: instructions, knowledge và chia sẻ",
     "minutes": 12,
     "html": "<h4>Claude thấy gì khi bạn mở một chat trong Project</h4>\n<ul>\n<li><strong>Project instructions</strong>: chỉ dẫn áp dụng cho mọi chat trong Project (vai, giọng, quy trình, định dạng).</li>\n<li><strong>Project knowledge</strong>: tài liệu, file văn bản, đoạn code bạn tải lên; mọi chat trong Project đều dùng được.</li>\n<li><strong>Memory của Project</strong>: mỗi Project có memory riêng; chat trong Project dùng memory của Project cộng memory chung của tài khoản, không bao giờ dùng memory của Project khác.</li>\n<li>Tin nhắn và file của chính cuộc chat đó.</li>\n</ul>\n<p>Hai điều Claude <strong>không</strong> thấy: tên và mô tả Project (help center ghi rõ Claude không đọc được hai trường này, nên đừng viết chỉ dẫn vào đó), và nội dung các chat khác trong cùng Project.</p>\n<h4>Instructions hay knowledge?</h4>\n<p>Phép thử: nội dung này <em>chỉ cho Claude cách hành xử</em>, hay <em>cung cấp thông tin để tra cứu</em>?</p>\n<table>\n<thead><tr><th>Project instructions (hướng dẫn hành vi)</th><th>Project knowledge (tài liệu tham khảo)</th></tr></thead>\n<tbody>\n<tr><td>\"Bạn hỗ trợ đội chăm sóc khách hàng; trả lời ngắn, thân thiện; luôn dẫn tên tài liệu chính sách đã dùng; không hứa hoàn tiền, chuyển cho trưởng ca.\"</td><td>Chính sách đổi trả 2026, bảng giá dịch vụ, mẫu email đã được duyệt, danh sách câu hỏi thường gặp</td></tr>\n</tbody>\n</table>\n<p>Nhét cả chính sách 30 trang vào instructions khiến chỉ dẫn quan trọng bị chìm; ngược lại, để quy tắc giọng văn trong một file knowledge thì Claude có thể không coi đó là chỉ dẫn bắt buộc.</p>\n<h4>Ba tầng chỉ dẫn</h4>\n<ul>\n<li><strong>Instructions for Claude</strong> (trong giao diện Settings mới là mục \"Instructions\" ở \"Your Claude\"): áp dụng cho mọi cuộc trò chuyện của bạn.</li>\n<li><strong>Project instructions</strong>: chỉ áp dụng trong một Project.</li>\n<li><strong>Skills</strong>: gói chỉ dẫn, script, tài nguyên cho một loại việc chuyên biệt, Claude chỉ nạp khi liên quan.</li>\n</ul>\n<h4>Knowledge lớn: RAG</h4>\n<p>Help center mô tả: khi knowledge của Project gần chạm giới hạn context window, Claude tự động chuyển sang <strong>RAG</strong> (retrieval augmented generation), mở rộng dung lượng lên tới khoảng 10 lần; không có nút bật tay, và Claude dùng công cụ tìm trong project knowledge thay vì nạp hết. Tính năng này dành cho gói trả phí. Để tìm tốt, help center khuyên: tải đủ tài liệu từ đầu, đặt tên file rõ ràng, nhóm tài liệu liên quan, và nêu tên tài liệu trong câu hỏi khi biết.</p>\n<h4>Chia sẻ (Team và Enterprise)</h4>\n<ul>\n<li><strong>Private</strong>: chỉ người được mời. <strong>Public</strong> (chia sẻ với cả tổ chức): mọi người trong tổ chức tìm thấy ở tab Organization, xem và dùng được.</li>\n<li>Quyền <strong>Can view</strong>: xem nội dung, knowledge, instructions và mở chat với Claude trong Project, không sửa. <strong>Can edit</strong>: sửa instructions, knowledge, quản lý thành viên.</li>\n<li>Chia sẻ Project <strong>không</strong> chia sẻ các chat của bạn; chat được chia sẻ riêng từng cái.</li>\n<li>Admin có thể tắt chia sẻ Project cho cả tổ chức.</li>\n</ul>\n<div class=\"tip\">Câu hỏi \"Claude không làm theo quy tắc định dạng dù quy tắc nằm trong mô tả Project\" → Claude không đọc được mô tả Project; chuyển quy tắc vào project instructions.</div>\n<div class=\"warn\">Cấp Can edit cho cả nhóm \"cho tiện\" nghĩa là ai cũng sửa được instructions và knowledge dùng chung. Hầu hết người dùng chỉ cần Can view; giữ quyền sửa cho người phụ trách.</div>",
     "keypoints": [
      "Instructions = hướng dẫn hành vi (vai, giọng, quy trình, định dạng); knowledge = tài liệu tham khảo (chính sách, sổ tay, mẫu).",
      "Claude không đọc tên và mô tả Project, không đọc chat khác trong cùng Project.",
      "Ba tầng: Instructions for Claude (mọi chat) → project instructions (một Project) → Skills (nạp khi cần).",
      "Knowledge gần đầy context → tự động RAG (gói trả phí); đặt tên file rõ, nêu tên tài liệu trong câu hỏi.",
      "Chia sẻ: Private/Public (cả tổ chức); Can view/Can edit; chia sẻ Project không chia sẻ chat."
     ],
     "sources": [
      {
       "t": "How can I create and manage projects?",
       "u": "https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects"
      },
      {
       "t": "RAG for projects",
       "u": "https://support.claude.com/en/articles/11473015-retrieval-augmented-generation-rag-for-projects"
      },
      {
       "t": "Project visibility and sharing",
       "u": "https://support.claude.com/en/articles/9519189-project-visibility-and-sharing"
      },
      {
       "t": "Understanding Claude's personalization features",
       "u": "https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features"
      }
     ]
    },
    {
     "id": "l-5-2",
     "title": "File và connector: Claude thấy gì, mới tới đâu, theo quyền của ai",
     "minutes": 11,
     "html": "<p>Có ba cách đưa thông tin cho Claude: <strong>đính kèm file vào chat</strong> (chỉ chat đó dùng), <strong>tải vào project knowledge</strong> (mọi chat trong Project dùng), và <strong>connector</strong> (Claude truy cập ứng dụng của bạn khi cần). Mỗi cách khác nhau ở phạm vi, độ mới và quyền truy cập.</p>\n<h4>File tải lên</h4>\n<p>Help center liệt kê các định dạng phổ biến: PDF, DOCX, CSV, TXT, HTML, JSON, XLSX (XLSX cần bật tính năng code execution/tạo file), và ảnh JPEG, PNG, GIF, WebP. Với file trong project knowledge, Claude chủ yếu dùng phần văn bản được trích ra (PDF có thể được đọc cả phần hình ảnh). Bài học thực tế: một biểu đồ dạng ảnh nhúng trong file Word có thể không được Claude \"nhìn thấy\" như bạn tưởng; nếu số liệu quan trọng, đưa chúng dưới dạng văn bản hoặc bảng.</p>\n<h4>Connector</h4>\n<p>Connector cho phép Claude truy cập ứng dụng và dịch vụ của bạn để lấy dữ liệu và thực hiện hành động. Điểm cốt lõi: <strong>Claude kế thừa quyền của chính người dùng</strong> trong dịch vụ được kết nối. Claude không thấy được thứ bạn không có quyền xem. Ngoại lệ help center có nêu: connector tùy chỉnh dùng một credential chung thì truy cập được mọi thứ credential đó được phép.</p>\n<p>Ví dụ với Google Workspace theo help center:</p>\n<ul>\n<li><strong>Gmail</strong>: tìm, đọc, soạn nháp; gửi/trả lời/chuyển tiếp cần bạn phê duyệt theo mặc định; chỉ thấy thông tin mô tả của file đính kèm, không đọc nội dung file đính kèm.</li>\n<li><strong>Google Calendar</strong>: xem, tạo, sửa, xóa sự kiện; tìm giờ trống chung.</li>\n<li><strong>Google Drive</strong>: tìm và đọc tài liệu; chỉ trích văn bản, ảnh nhúng không được xử lý; chia sẻ/di chuyển/chuyển vào thùng rác cần phê duyệt theo mặc định.</li>\n</ul>\n<h4>Độ mới của dữ liệu</h4>\n<ul>\n<li>File Google Docs thêm vào chat hoặc Project là <strong>bản đồng bộ</strong> theo phiên bản mới nhất trên Drive.</li>\n<li>Dùng connector trong chat thì dữ liệu được <strong>lấy tại thời điểm hỏi</strong>, chỉ khi cần.</li>\n<li>File tải lên từ máy là <strong>bản sao tĩnh</strong> tại lúc tải: tài liệu gốc đổi thì bản trong Project không đổi theo, bạn phải thay.</li>\n</ul>\n<h4>Quyền truy cập trên gói Team và Enterprise</h4>\n<ol>\n<li>Owner bật connector cho tổ chức (bật không có nghĩa là ai cũng truy cập được).</li>\n<li>Mỗi thành viên tự xác thực tài khoản của mình (trừ connector dùng credential chung).</li>\n<li>Owner có thể đặt từng công cụ là luôn cho phép, cần phê duyệt, hoặc bị chặn; các giới hạn chỉ thu hẹp quyền.</li>\n<li>Quyền của người dùng trong chính dịch vụ (Drive, Gmail…) vẫn áp dụng.</li>\n</ol>\n<p>Một giới hạn cụ thể help center về Google Workspace có ghi: thêm file từ Google Drive vào phần Files của Project chỉ làm được ở Project private; tùy chọn này bị tắt với Project đã chia sẻ. Trang connector hiện không ghi giới hạn chung kiểu \"connector chỉ dùng được trong Project private\" (tháng 11/2026).</p>\n<h4>Connector tùy chỉnh và chi phí</h4>\n<p>Bạn có thể thêm connector tùy chỉnh bằng URL của một remote MCP server. Anthropic không kiểm định các connector tùy chỉnh, nên chỉ dùng server đáng tin. Ngoài ra, công cụ và connector tiêu tốn nhiều token; help center khuyên tắt những cái không dùng để tiết kiệm context và hạn mức.</p>\n<div class=\"tip\">Câu hỏi \"Claude trả lời theo phiên bản cũ của tài liệu\" → kiểm xem tài liệu được tải lên như bản sao tĩnh (cần thay) hay đồng bộ từ Drive. Câu hỏi \"Claude không thấy thư mục X trên Drive\" → kiểm quyền của chính người dùng trong Drive và việc admin đã bật connector chưa.</div>\n<div class=\"warn\">Bật connector không mở rộng quyền. Nếu một nhân viên không có quyền xem thư mục lương trên Drive, Claude dùng connector của họ cũng không xem được — và đó là điều đúng.</div>",
     "keypoints": [
      "Ba đường: file đính kèm chat (một chat), project knowledge (cả Project), connector (lấy khi cần).",
      "Connector kế thừa quyền của người dùng trong dịch vụ; bật connector không mở rộng quyền.",
      "Gmail: đọc, soạn nháp; gửi cần phê duyệt mặc định; không đọc nội dung file đính kèm. Drive: chỉ văn bản, không xử lý ảnh nhúng.",
      "File tải lên là bản sao tĩnh; Google Docs thêm vào đồng bộ bản mới nhất; connector lấy dữ liệu lúc hỏi.",
      "Team/Enterprise: owner bật, từng người xác thực, owner đặt quy tắc từng công cụ; connector tùy chỉnh chỉ dùng server tin cậy."
     ],
     "sources": [
      {
       "t": "Uploading files to Claude",
       "u": "https://support.claude.com/en/articles/8241126-uploading-files-to-claude"
      },
      {
       "t": "Use connectors to extend Claude's capabilities",
       "u": "https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities"
      },
      {
       "t": "Use Google Workspace connectors",
       "u": "https://support.claude.com/en/articles/10166901-use-google-workspace-connectors"
      }
     ]
    },
    {
     "id": "l-5-3",
     "title": "Viết chỉ dẫn cấp hệ thống và bảo trì cấu hình",
     "minutes": 12,
     "html": "<p>\"Chỉ dẫn cấp hệ thống\" trong exam guide ứng với <strong>project instructions</strong> và <strong>Instructions for Claude</strong> trong app: những lời dặn áp dụng cho mọi cuộc chat trong phạm vi của nó. Viết tốt một lần thì mọi người dùng Project đều được hưởng; viết kém thì mọi người đều chịu.</p>\n<h4>Nội dung nào thuộc chỉ dẫn hệ thống</h4>\n<p>Chỉ những thứ <strong>ổn định và đúng cho mọi chat</strong>: vai trò, người đọc mặc định, giọng, định dạng chuẩn, quy tắc dùng nguồn, cách xử lý khi không chắc. Yêu cầu riêng của một lần (bài này cần 300 chữ) để trong tin nhắn.</p>\n<h4>Bộ khung gợi ý</h4>\n<ol>\n<li><strong>Vai và mục tiêu</strong>: \"Bạn hỗ trợ đội bán hàng B2B soạn tài liệu cho khách.\"</li>\n<li><strong>Người đọc</strong>: \"Người đọc cuối là trưởng phòng mua hàng, không chuyên kỹ thuật.\"</li>\n<li><strong>Phạm vi</strong>: làm gì và không làm gì (\"không báo giá; giá luôn để người bán điền\").</li>\n<li><strong>Quy tắc nguồn</strong>: \"Thông tin sản phẩm chỉ lấy từ tài liệu trong knowledge; nêu tên tài liệu đã dùng.\"</li>\n<li><strong>Định dạng mặc định</strong>: cấu trúc, độ dài, ngôn ngữ.</li>\n<li><strong>Khi không chắc</strong>: \"Nếu tài liệu không có câu trả lời, nói rõ và gợi ý hỏi đội sản phẩm; không suy đoán.\"</li>\n<li><strong>Lý do</strong> cho các quy tắc quan trọng, để Claude áp dụng đúng tinh thần ở trường hợp mới.</li>\n</ol>\n<h4>Xung đột chỉ dẫn</h4>\n<p>Mâu thuẫn có thể nằm ngay trong một bộ instructions (hai câu nói ngược nhau) hoặc giữa hai lớp chỉ dẫn (Instructions for Claude của một người nói \"trả lời thật ngắn\", project instructions yêu cầu báo cáo đầy đủ). Hãy đọc lại instructions tìm câu mâu thuẫn, viết cụ thể phạm vi của từng quy tắc (\"với email gửi khách thì…; với ghi chú nội bộ thì…\"), và xóa quy tắc cũ thay vì chồng quy tắc mới lên.</p>\n<h4>Kiểm thử trước khi phát hành</h4>\n<p>Chuẩn bị một bộ câu hỏi thật, gồm cả câu khó và câu ngoài phạm vi; chạy thử, chấm theo tiêu chí, sửa instructions, chạy lại cùng bộ câu. Giữ bộ câu này để dùng lại mỗi khi sửa cấu hình.</p>\n<h4>Bảo trì: dấu hiệu cấu hình đã lỗi thời</h4>\n<p>Triệu chứng và chỗ cần sửa:</p>\n<ul>\n<li>Claude trích chính sách đã hết hiệu lực → knowledge có tài liệu cũ.</li>\n<li>Câu trả lời lúc theo bản này, lúc theo bản kia → có hai phiên bản trùng nhau trong knowledge.</li>\n<li>Claude nhắc tới quy trình, tên sản phẩm không còn dùng → instructions cũ.</li>\n</ul>\n<p><strong>Thay một tài liệu</strong>: (1) gỡ bản cũ, (2) tải bản mới với tên rõ ràng có ngày hoặc phiên bản, (3) cập nhật instructions nếu nhắc tới tài liệu đó, (4) chạy lại bộ câu hỏi thử.</p>\n<p><strong>Quản trị</strong>: mỗi Project dùng chung nên có người phụ trách, lịch rà soát định kỳ, và thông báo cho người dùng khi có thay đổi lớn. Khi dự án kết thúc: archive (help center nói archive giữ nguyên chia sẻ, thành viên, quyền và knowledge), gỡ thành viên không còn cần, hoặc xóa nếu không cần giữ.</p>\n<div class=\"tip\">Khi đề mô tả \"câu trả lời mâu thuẫn giữa các lần, mỗi lần dẫn một phiên bản chính sách khác nhau\", đáp án là dọn knowledge (gỡ bản trùng/cũ), không phải đổi model hay viết thêm lời dặn.</div>\n<div class=\"warn\">Thêm câu \"luôn dùng bản mới nhất\" vào instructions mà vẫn để bản cũ trong knowledge không giải quyết được gốc. Gỡ bản cũ.</div>",
     "keypoints": [
      "Chỉ dẫn hệ thống = project instructions / Instructions for Claude; chỉ chứa thứ ổn định, đúng cho mọi chat.",
      "Khung: vai và mục tiêu, người đọc, phạm vi, quy tắc nguồn, định dạng, khi không chắc, lý do.",
      "Xung đột: tìm câu mâu thuẫn, viết rõ phạm vi từng quy tắc, xóa quy tắc cũ thay vì chồng.",
      "Thử bằng bộ câu hỏi thật (kể cả câu khó, ngoài phạm vi) trước khi giao và sau mỗi lần sửa.",
      "Bảo trì: gỡ tài liệu cũ/trùng, đặt tên có phiên bản, có người phụ trách và lịch rà soát; archive giữ nguyên knowledge và quyền."
     ],
     "sources": [
      {
       "t": "Understanding Claude's personalization features",
       "u": "https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features"
      },
      {
       "t": "How can I create and manage projects?",
       "u": "https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects"
      },
      {
       "t": "Prompting best practices",
       "u": "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices"
      }
     ]
    },
    {
     "id": "l-5-4",
     "title": "Bảo trì cấu hình theo vòng đời: người phụ trách, nhật ký thay đổi, thành viên và lúc kết thúc",
     "minutes": 11,
     "html": "<p>Bài l-5-3 đã có các triệu chứng cấu hình lỗi thời và quy trình thay một tài liệu. Bài này nhìn rộng hơn: một Project dùng chung đi qua cả vòng đời, từ lúc dựng tới lúc đóng, và ở mỗi giai đoạn có những việc bảo trì khác nhau.</p>\n<h4>Vòng đời của một Project dùng chung</h4>\n<table>\n<thead><tr><th>Giai đoạn</th><th>Việc cần làm</th></tr></thead>\n<tbody>\n<tr><td>Dựng</td><td>Chọn người phụ trách; viết instructions; đưa knowledge; lập bộ câu hỏi thử</td></tr>\n<tr><td>Phát hành</td><td>Chạy bộ câu thử; đặt quyền; thông báo cách dùng cho nhóm</td></tr>\n<tr><td>Vận hành</td><td>Thu phản hồi; rà soát định kỳ; theo dõi tài liệu nguồn thay đổi</td></tr>\n<tr><td>Thay đổi</td><td>Sửa có ghi lại; chạy lại bộ câu thử; báo cho người dùng</td></tr>\n<tr><td>Kết thúc</td><td>Archive, gỡ thành viên không còn cần, hoặc xóa</td></tr>\n</tbody>\n</table>\n<h4>Người phụ trách và quyền sửa</h4>\n<p>Mỗi Project dùng chung cần một người phụ trách nội dung. Trên Team và Enterprise, quyền <strong>Can edit</strong> cho phép sửa instructions và knowledge, quản lý thành viên; <strong>Can view</strong> cho phép xem nội dung, knowledge, instructions và mở chat với Claude trong Project nhưng không sửa. Giữ Can edit cho một hai người phụ trách là cách đơn giản nhất để cấu hình không bị sửa chồng chéo.</p>\n<h4>Nhật ký thay đổi</h4>\n<p>Đây là lời khuyên thực hành, không phải tính năng của app: giữ một ghi chép ngắn bên ngoài Project gồm ngày, thay đổi gì (câu instructions nào, tài liệu nào), vì sao, ai sửa, kết quả chạy lại bộ câu thử. Khi output đột nhiên khác đi, nhật ký giúp tìm ngay thay đổi gần nhất thay vì đoán. Đặt tên file knowledge có ngày hoặc phiên bản cũng giúp nhìn vào là biết bản nào đang dùng; help center về RAG cũng khuyên đặt tên file rõ ràng, mô tả được nội dung.</p>\n<h4>Tài liệu tĩnh và tài liệu đồng bộ</h4>\n<ul>\n<li>File tải lên từ máy là bản sao tại lúc tải; tài liệu gốc đổi thì phải thay bản trong Project.</li>\n<li>Google Docs thêm vào chat hoặc Project được đồng bộ từ Google Drive. Help center về Google Workspace ghi việc thêm file Drive vào Project chỉ làm được ở Project private; tùy chọn này bị tắt với Project đã chia sẻ.</li>\n</ul>\n<p>Hệ quả cho bảo trì: với Project dùng chung, phần lớn knowledge là bản sao tĩnh, nên danh sách \"tài liệu nào cần kiểm khi nguồn đổi\" là việc bắt buộc của người phụ trách.</p>\n<h4>Khi nào rà soát</h4>\n<p>Lịch định kỳ (ví dụ mỗi quý) cộng với các sự kiện kích hoạt: chính sách hoặc bảng giá mới, sản phẩm đổi tên, quy định thay đổi, phản hồi lặp lại về cùng một lỗi. Mỗi lần rà: gỡ bản cũ hoặc trùng, đọc lại instructions xem còn nhắc tới thứ đã bỏ không, chạy lại bộ câu thử.</p>\n<h4>Thành viên thay đổi</h4>\n<ul>\n<li>Người rời nhóm: người có Can edit mở menu Share, chọn vai trò cạnh tên người đó, chọn \"Remove access\". Người bị gỡ mất quyền vào Project và nội dung của nó.</li>\n<li>Admin có thể tắt chia sẻ Project cho tổ chức; help center ghi khi đó Project đã chia sẻ vẫn giữ chia sẻ, còn Project công khai trong tổ chức chuyển thành private cho tới khi bật lại.</li>\n</ul>\n<h4>Memory trong Project</h4>\n<p>Mỗi Project có memory riêng. Nếu một Project cần tách biệt hẳn (ví dụ hồ sơ một khách hàng), tắt \"Use account memory\" ở trang Project. Lưu ý help center ghi Reset memory xóa vĩnh viễn mọi thứ, kể cả memory của Project; Pause thì giữ nhưng ngừng dùng và ngừng ghi thêm.</p>\n<h4>Kết thúc Project</h4>\n<p>Archive giữ nguyên cài đặt chia sẻ, thành viên, quyền và knowledge. Vì archive <strong>không</strong> gỡ thành viên, nếu cần cắt quyền thì gỡ riêng. Help center hiện ghi Project đã archive không xóa được; muốn xóa phải bỏ archive trước (tháng 11/2026).</p>\n<div class=\"tip\">Câu hỏi \"dự án kết thúc, cần giữ tài liệu để tra cứu nhưng không muốn ai sửa nữa\": archive giữ knowledge nhưng không đổi quyền, nên cần thêm bước gỡ thành viên hoặc hạ quyền. Đáp án chỉ có \"archive\" là chưa đủ nếu đề nhấn vào quyền truy cập.</div>\n<div class=\"warn\">Sửa cấu hình dùng chung mà không chạy lại bộ câu thử và không báo cho người dùng là cách nhanh nhất để làm hỏng thứ đang chạy tốt mà không ai biết vì sao.</div>",
     "keypoints": [
      "Vòng đời: dựng → phát hành → vận hành → thay đổi → kết thúc; mỗi giai đoạn có việc bảo trì riêng.",
      "Mỗi Project dùng chung có người phụ trách; giữ Can edit cho ít người, đa số dùng Can view.",
      "Nhật ký thay đổi (lời khuyên thực hành) và tên file có phiên bản giúp truy ra thay đổi gây lỗi.",
      "File tải lên là bản sao tĩnh; thêm file Drive vào Project chỉ làm được ở Project private.",
      "Archive giữ chia sẻ, thành viên, quyền, knowledge và không gỡ thành viên; Reset memory xóa cả memory của Project."
     ],
     "sources": [
      {
       "t": "How can I create and manage projects?",
       "u": "https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects"
      },
      {
       "t": "Project visibility and sharing",
       "u": "https://support.claude.com/en/articles/9519189-project-visibility-and-sharing"
      },
      {
       "t": "Use Google Workspace connectors",
       "u": "https://support.claude.com/en/articles/10166901-use-google-workspace-connectors"
      },
      {
       "t": "Use Claude's chat search and memory",
       "u": "https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context"
      },
      {
       "t": "Retrieval augmented generation (RAG) for projects",
       "u": "https://support.claude.com/en/articles/11473015-retrieval-augmented-generation-rag-for-projects"
      }
     ]
    }
   ],
   "cheat": [
    [
     "Instructions vs knowledge",
     "Hướng dẫn hành vi (vai, giọng, quy trình, định dạng) vs tài liệu tham khảo (chính sách, sổ tay, mẫu)"
    ],
    [
     "Claude không thấy",
     "Tên và mô tả Project; nội dung chat khác trong cùng Project"
    ],
    [
     "Ba tầng chỉ dẫn",
     "Instructions for Claude (mọi chat) → project instructions → Skills (nạp khi liên quan)"
    ],
    [
     "RAG cho Project",
     "Tự bật khi knowledge gần đầy context, tới ~10x dung lượng, gói trả phí; đặt tên file rõ"
    ],
    [
     "Chia sẻ Project",
     "Private / Public (cả tổ chức); Can view / Can edit; chat không được chia sẻ theo Project"
    ],
    [
     "Memory của Project",
     "Riêng từng Project + memory tài khoản; không lẫn Project khác"
    ],
    [
     "Connector",
     "Kế thừa quyền của người dùng; bật connector không mở rộng quyền (ngoại lệ: connector tùy chỉnh dùng credential chung)"
    ],
    [
     "Gmail / Drive",
     "Gửi cần phê duyệt mặc định, không đọc nội dung file đính kèm / chỉ văn bản, không xử lý ảnh nhúng"
    ],
    [
     "Bản sao tĩnh / đồng bộ / truy xuất khi hỏi",
     "File tải lên / Google Docs thêm vào Project / connector trong chat"
    ],
    [
     "Team/Enterprise connector",
     "Owner bật → từng người xác thực (trừ connector dùng credential chung) → quy tắc từng công cụ; thêm file Drive vào Project chỉ ở Project private"
    ],
    [
     "Khung chỉ dẫn hệ thống",
     "Vai, người đọc, phạm vi, nguồn, định dạng, khi không chắc, lý do"
    ],
    [
     "Bảo trì",
     "Gỡ bản cũ/trùng → tải bản mới có phiên bản → sửa instructions → chạy lại bộ câu thử"
    ],
    [
     "Claude thấy gì trong chat Project",
     "Instructions, knowledge, memory Project + memory ngoài Project, Instructions for Claude, tin nhắn/file chat"
    ],
    [
     "File Drive vào Project",
     "Chỉ ở Project private; bị tắt với Project đã chia sẻ"
    ],
    [
     "Archive Project",
     "Giữ chia sẻ, thành viên, quyền, knowledge; không gỡ thành viên; muốn xóa phải bỏ archive trước"
    ],
    [
     "Reset vs Pause memory",
     "Reset xóa vĩnh viễn kể cả memory Project; Pause giữ nhưng ngừng dùng và ghi"
    ]
   ],
   "quiz": [
    {
     "q": "A team lead put the rule 'Always answer in a numbered list and cite the source document' into the Project's description field. Claude in that Project ignores the rule. What is the MOST likely fix?",
     "options": [
      "Rename the Project to include the rule",
      "Move the rule into the project instructions, since Claude cannot see the Project name or description",
      "Upload the rule as a separate file in project knowledge",
      "Switch to a more capable model"
     ],
     "answer": 1,
     "explain": "Help center ghi rõ tên và mô tả Project không hiển thị với Claude, nên quy tắc phải nằm trong project instructions. Đổi tên Project cũng vô ích vì lý do đó. Để quy tắc trong một file knowledge thì Claude coi đó là tài liệu tham khảo, không chắc được áp dụng như chỉ dẫn bắt buộc. Đổi model không sửa được việc Claude không thấy quy tắc."
    },
    {
     "q": "A customer success team's Project gives inconsistent answers about refund eligibility; sometimes it cites the 2025 policy and sometimes the 2026 policy. Both PDFs are in project knowledge. What should the Project owner do?",
     "options": [
      "Remove the 2025 policy, keep the 2026 file with a clear versioned name, update related instructions, and retest",
      "Keep both files and add an instruction telling Claude to prefer the newest document whenever two sources disagree",
      "Ask users to specify the year in every question",
      "Start a new chat whenever the wrong policy is cited"
     ],
     "answer": 0,
     "explain": "Gốc rễ là knowledge có hai phiên bản trùng nhau. Cách sửa đúng là gỡ bản cũ, giữ bản mới với tên rõ ràng, cập nhật instructions liên quan và thử lại. Thêm lời dặn mà vẫn để bản cũ không giải quyết gốc. Bắt người dùng ghi năm là đẩy gánh nặng cho họ. Chat mới vẫn đọc cùng knowledge lỗi."
    },
    {
     "q": "An organization on a Team plan wants staff to use the Google Drive connector in Claude. Which TWO statements about how access works are correct? (Choose TWO.)",
     "options": [
      "Once an Owner enables the connector, Claude can read every file in the company's Drive for every user",
      "An Owner must enable the connector for the organization, and each member then authenticates with their own account",
      "Users can see Drive files through Claude that they cannot open in Drive directly",
      "Claude inherits each user's own Drive permissions, so it can only access files that user can access",
      "Custom connectors are verified by Anthropic, so any MCP server URL is safe to add"
     ],
     "answer": [
      1,
      3
     ],
     "explain": "Trên Team/Enterprise, Owner bật connector cho tổ chức, rồi từng thành viên tự xác thực; Claude kế thừa quyền của chính người dùng đó. Bật connector không cho Claude đọc toàn bộ Drive và không mở rộng quyền, nên phương án A và C sai. Help center nói Anthropic không kiểm định connector tùy chỉnh; chỉ dùng server tin cậy."
    },
    {
     "q": "A marketing manager is setting up a shared Project for her team. Which content BELONGS in the project instructions rather than project knowledge?",
     "options": [
      "The full 40-page brand guidelines PDF, pasted into the instructions so every brand rule applies to every single chat",
      "Last quarter's campaign performance spreadsheet",
      "A library of approved past social media posts",
      "'You help the marketing team write for small-business owners; use a warm, plain tone; never invent product claims'"
     ],
     "answer": 3,
     "explain": "Instructions mô tả cách Claude hành xử: vai, người đọc, giọng, giới hạn. Câu chỉ dẫn ngắn đó đúng là nội dung instructions. Bộ hướng dẫn thương hiệu dài, bảng số liệu và thư viện bài mẫu là tài liệu tham khảo, thuộc knowledge; nhét chúng vào instructions làm chìm các chỉ dẫn quan trọng."
    },
    {
     "q": "A project owner uploaded a pricing sheet from her laptop to project knowledge two months ago. The sheet has since been updated on her laptop, but Claude still quotes old prices. Why, and what should she do?",
     "options": [
      "Claude's knowledge cutoff is older than the update; switch to a newer model",
      "RAG is turned off; turn it on manually in settings",
      "The uploaded file is a static copy taken at upload time; replace it with the current version and retest",
      "Project memory stored the old prices; reset all memory"
     ],
     "answer": 2,
     "explain": "File tải lên từ máy là bản sao tĩnh tại thời điểm tải; tài liệu gốc đổi thì bản trong Project không tự đổi. Phải thay bằng bản mới rồi thử lại. Knowledge cutoff của model không liên quan tới tài liệu bạn cung cấp. RAG không có nút bật tay và không phải nguyên nhân. Memory không phải nơi lưu bảng giá trong tình huống này."
    },
    {
     "q": "A team's shared Project has grown messy: several people edit the instructions, old documents remain, and nobody knows which rules are current. Which governance step would MOST improve reliability going forward?",
     "options": [
      "Give every team member Can edit access so that anyone who notices a problem can fix the instructions or knowledge files right away",
      "Delete the Project and have everyone use standard chats",
      "Add a line to the instructions asking Claude to ignore outdated documents",
      "Assign an owner, limit edit rights to that owner or a small group, and set a regular review schedule with a test question set"
     ],
     "answer": 3,
     "explain": "Cấu hình dùng chung cần người phụ trách, giới hạn quyền sửa và lịch rà soát có bộ câu thử. Cho mọi người Can edit chính là nguyên nhân gây lộn xộn. Xóa Project mất luôn giá trị của bối cảnh dùng chung. Dặn Claude bỏ qua tài liệu cũ không gỡ được tài liệu cũ và Claude không biết tài liệu nào đã hết hiệu lực."
    }
   ],
   "bank": [
    {
     "q": "In a shared Project, a marketing analyst agreed on campaign naming conventions with Claude in one chat. The next day, in a new chat in the same Project, Claude doesn't follow them. What is the BEST fix?",
     "options": [
      "Switch to a more capable model that can read the other chats in the Project",
      "Share yesterday's chat with the team so that Claude can read it in any new chat",
      "Keep working in yesterday's chat indefinitely",
      "Add the naming conventions to the project instructions or knowledge so every chat can use them"
     ],
     "answer": 3,
     "explain": "Help center: context không được chia sẻ giữa các chat trong cùng Project trừ khi thông tin được đưa vào knowledge; thứ mọi chat cần biết phải nằm trong instructions hoặc knowledge. Không model nào đọc được chat khác trong Project. Dùng mãi một chat làm chat dài, tốn hạn mức và nhiều nhiễu. Chia sẻ chat cho đồng nghiệp không đưa nội dung đó vào context của các chat mới."
    },
    {
     "q": "A team lead is sharing a curated Project with 20 colleagues who will use it daily but should not change its instructions or knowledge. Which permission should most of them receive?",
     "options": [
      "Owner-level access for everyone",
      "No access, with the team lead forwarding answers to them",
      "Can view",
      "Can edit"
     ],
     "answer": 2,
     "explain": "Help center: quyền Can view cho phép xem nội dung, knowledge, instructions và mở chat với Claude trong Project nhưng không sửa, đúng nhu cầu dùng hằng ngày mà không đổi cấu hình. Can edit cho phép sửa instructions, knowledge và quản lý thành viên, nên chỉ dành cho người phụ trách. Chia sẻ Project chỉ có hai mức Can view và Can edit, và trao quyền rộng cho mọi người đi ngược mục tiêu. Không cấp quyền rồi chuyển tiếp câu trả lời tạo nút thắt vô ích."
    },
    {
     "q": "A manager shares a Project with her team on a Team plan and expects to be able to read the chats each member has inside it. What should she understand?",
     "options": [
      "Members get the Project's knowledge and instructions, but their chats stay private unless shared individually",
      "She can read every member's chats as long as she holds Can edit permission, because editors manage the Project's full content",
      "Members' chats become visible to her once the Project is archived",
      "All chats in a shared Project are automatically visible to every member"
     ],
     "answer": 0,
     "explain": "Help center: chia sẻ Project cấp quyền vào Project và knowledge, nhưng chat của mỗi người vẫn riêng tư trừ khi họ chủ động chia sẻ từng chat. Chat không tự hiển thị cho mọi thành viên. Can edit cho phép sửa instructions, knowledge và thành viên, không cho đọc chat riêng của người khác. Archive giữ nguyên quyền và thành viên, không công khai chat."
    },
    {
     "q": "A Project owner on a paid plan keeps adding manuals to project knowledge and reads that Claude may switch to retrieval (RAG) for large knowledge bases. She looks for a setting to turn RAG on. What should she know?",
     "options": [
      "She must ask an organization admin to enable RAG for her account",
      "RAG for Projects is available only on the Free plan",
      "There is no manual setting; RAG turns on automatically as project knowledge approaches the context window limit",
      "She must switch RAG on in each new chat before sending the first message, or Claude will ignore knowledge beyond the limit"
     ],
     "answer": 2,
     "explain": "Help center: RAG tự động bật khi project knowledge gần chạm hoặc vượt giới hạn context window, không cần cấu hình và không có nút bật tay; tính năng có trên gói trả phí (Pro, Max, Ultra, Team, Enterprise) và tăng dung lượng lên tới khoảng 10 lần. Không cần admin bật cho từng tài khoản. Không có thao tác bật trong từng chat. RAG cho Project không có trên gói Free."
    },
    {
     "q": "A Project's knowledge includes a Word document whose key sales figures appear only in an embedded chart image. Claude's answers about those figures are vague or wrong. What is the MOST likely cause and fix?",
     "options": [
      "The chart is too colorful; change it to grayscale",
      "Claude reads only the text of Word files in project knowledge, not embedded images; add the figures as text or a table",
      "Word files are not supported in Projects, so convert them to images first",
      "Claude needs a higher effort setting to read charts inside Word files"
     ],
     "answer": 1,
     "explain": "Help center: file trong project knowledge chỉ được trích văn bản (trừ PDF đa phương thức); với tài liệu như Word, ảnh nhúng không được đọc. Số liệu quan trọng nên đưa ở dạng văn bản hoặc bảng. DOCX là định dạng được hỗ trợ, không cần đổi sang ảnh. Màu sắc biểu đồ không liên quan. Effort không làm Claude đọc được ảnh mà nó vốn không xử lý."
    },
    {
     "q": "Using the Gmail connector, a sales manager asks Claude to summarize the contract PDF attached to a client's email. Claude can describe the attachment's name and type but not its contents. What explains this, and what should she do?",
     "options": [
      "She needs to turn on Research for the chat, because Research is the feature that opens email attachments retrieved through connectors",
      "Her Gmail account lacks permission to view that email",
      "The PDF is too short for Claude to read, so she should ask the client for a longer version",
      "The Gmail connector sees attachment metadata, not attachment content; she should upload the PDF to the chat directly"
     ],
     "answer": 3,
     "explain": "Help center: connector Gmail truy cập metadata của email, gồm metadata của file đính kèm, nhưng không đọc nội dung file đính kèm. Cách xử lý là tải PDF trực tiếp vào chat (sau khi cân nhắc dữ liệu có phù hợp để chia sẻ không). Claude thấy được tên file nghĩa là quyền xem email không bị chặn. Độ dài PDF không phải lý do. Research không phải tính năng mở file đính kèm email."
    },
    {
     "q": "An HR coordinator uses her own private Project to answer new hires' questions. The onboarding FAQ lives in a Google Doc that HR edits every week, but the Project holds a PDF export uploaded months ago, so answers are often out of date. Which change BEST keeps Claude current?",
     "options": [
      "Keep the old PDF and ask employees to include today's date in their questions so that Claude can adjust its answers",
      "Add the Google Doc to the Project from Google Drive, since Google Docs added this way sync from Drive",
      "Ask Claude to search the web for the newest FAQ",
      "Add an instruction telling Claude to always use the latest version of the FAQ whenever it answers a question"
     ],
     "answer": 1,
     "explain": "Help center: Google Docs thêm vào chat và Project được đồng bộ trực tiếp từ Google Drive, nên nội dung theo kịp các lần HR sửa. Đề nói rõ đây là Project riêng (private) vì help center ghi chỉ thêm được file Drive vào Files của Project private; với Project đã chia sẻ, tùy chọn này bị tắt. File PDF xuất ra rồi tải lên là bản tại thời điểm tải, không tự cập nhật. Dặn Claude 'dùng bản mới nhất' không tạo ra bản mới trong knowledge. Web search không thấy tài liệu nội bộ. Ghi ngày vào câu hỏi không thay đổi nội dung file cũ."
    },
    {
     "q": "A regional manager wants every conversation she has with Claude, inside and outside Projects, to use metric units and open with a one-line summary. Where should she put this preference?",
     "options": [
      "In a file uploaded to the knowledge of every Project she uses, so the preference is always available as reference material",
      "In the project instructions of the Project she uses most",
      "In the description field of each of her Projects",
      "In Instructions for Claude in her settings"
     ],
     "answer": 3,
     "explain": "Help center: Instructions for Claude (trong Settings mới là mục Instructions ở Your Claude) áp dụng cho mọi cuộc trò chuyện của bạn; project instructions chỉ áp dụng trong một Project. Sở thích cá nhân cho mọi chat nên đặt ở Instructions for Claude. Đặt trong một Project thì chat ngoài Project không nhận. Claude không đọc được mô tả Project. File trong knowledge là tài liệu tham khảo, không chắc được áp dụng như chỉ dẫn, và phải lặp lại ở mọi Project."
    },
    {
     "q": "An operations team builds quarterly board reports in several Projects using the same specialized procedure: a fixed structure, a formatting template, and a script that generates the charts. Which configuration option BEST packages this procedure?",
     "options": [
      "A Skill, which bundles instructions, scripts, and resources and is loaded only when relevant",
      "Pasting the procedure into the first message of each chat",
      "A long section added to Instructions for Claude so the procedure applies to every conversation she has",
      "A memory entry asking Claude to remember the procedure"
     ],
     "answer": 0,
     "explain": "Help center: Skills là các thư mục chứa chỉ dẫn, script và tài nguyên mà Claude nạp khi cần cho việc chuyên biệt, và chỉ nạp skill liên quan để không làm đầy context. Quy trình chuyên biệt dùng ở nhiều Project, có kèm script, đúng là trường hợp của Skill. Nhồi vào Instructions for Claude áp dụng cho mọi chat kể cả không liên quan, và không chứa được script. Memory ghi nhớ thông tin về người dùng, không phải nơi đóng gói quy trình. Dán lại ở mỗi chat tốn công và dễ lệch."
    },
    {
     "q": "A Project's instructions say 'Always give comprehensive, detailed answers' near the top and 'Keep every answer under 80 words' further down. Users get inconsistent response lengths. What is the BEST fix?",
     "options": [
      "Switch to a more capable model, which can work out on its own which of the two conflicting rules the owner really intended",
      "Keep both lines and add a third rule at the end telling Claude to follow whichever of the two instructions seems more important",
      "Rewrite the rules to state when each applies, such as brief for quick questions and detailed for report drafts",
      "Move both rules into a knowledge file"
     ],
     "answer": 2,
     "explain": "Khi hai chỉ dẫn mâu thuẫn, hãy viết rõ phạm vi của từng quy tắc và bỏ câu xung đột thay vì chồng thêm quy tắc mới. Thêm câu 'làm theo cái quan trọng hơn' buộc Claude đoán, nên độ dài vẫn thất thường. Chuyển vào file knowledge biến các quy tắc thành tài liệu tham khảo mà vẫn mâu thuẫn. Đổi model không xóa được mâu thuẫn nằm trong chỉ dẫn."
    },
    {
     "q": "An Enterprise organization wants employees to use the Gmail connector to draft replies, but requires a person to approve every email before it is sent. Which configuration supports this?",
     "options": [
      "An Owner sets the send-related tools to require approval, which individual users cannot override",
      "Disable all connectors for the organization",
      "Ask employees to draft emails only in incognito chats",
      "Each employee adds a line to their own Instructions for Claude asking it to always check with them before sending any email"
     ],
     "answer": 0,
     "explain": "Help center: Owner có thể đặt từng nhóm quyền hoặc từng công cụ của connector là Always allow, Needs approval hoặc Blocked; thiết lập áp dụng toàn tổ chức và người dùng không ghi đè được. Với Gmail, gửi/trả lời/chuyển tiếp mặc định cần phê duyệt, và Owner của Team/Enterprise quyết định thành viên có được bỏ bước này không. Lời dặn trong Instructions for Claude là chỉ dẫn, không phải kiểm soát, và mỗi người tự sửa được. Tắt mọi connector bỏ luôn lợi ích soạn nháp. Incognito không liên quan tới quyền gửi email."
    },
    {
     "q": "A consultant keeps separate Projects for two competing clients and worries that details from one client's Project could surface in the other. Which statement about Project memory is accurate?",
     "options": [
      "Memory is always disabled inside Projects, so there is no risk",
      "All Projects share one memory, so she must reset it after each client session",
      "Each Project has its own memory and never uses other Projects' memory; turning off account memory isolates it fully",
      "She must switch on incognito mode inside each Project"
     ],
     "answer": 2,
     "explain": "Help center: mỗi Project có memory riêng; chat trong Project dùng memory của Project cộng memory tài khoản (từ chat ngoài Project), nhưng không bao giờ dùng memory của Project khác; tắt account memory cho Project để tách hoàn toàn. Các Project không dùng chung một memory. Memory không bị tắt mặc định trong Project. Incognito hiện chỉ có cho chat ngoài Project."
    },
    {
     "q": "When a user chats inside a Project, which TWO of the following can Claude NOT see? (Choose TWO.)",
     "options": [
      "The content of other chats in the same Project",
      "Files in project knowledge",
      "Messages earlier in the current chat",
      "The Project's description",
      "The project instructions"
     ],
     "answer": [
      0,
      3
     ],
     "explain": "Help center: Claude không truy cập được tên và mô tả Project, và context không được chia sẻ giữa các chat trong Project trừ khi thông tin nằm trong knowledge. Project instructions áp dụng cho mọi chat trong Project; file trong knowledge dùng được ở mọi chat; tin nhắn trước đó trong chat hiện tại là một phần context."
    },
    {
     "q": "A Project's knowledge base has grown large enough that Claude now retrieves from it instead of loading everything. Which TWO practices from Anthropic's guidance help Claude find the right information? (Choose TWO.)",
     "options": [
      "Mention the specific document by name in the question when you know it",
      "Merge all documents into one large unnamed file",
      "Use descriptive filenames instead of names like 'final_v2.pdf'",
      "Find the RAG setting and switch it to manual mode",
      "Upload a few files now and add the rest gradually after each question"
     ],
     "answer": [
      0,
      2
     ],
     "explain": "Help center về RAG cho Project khuyên đặt tên file mô tả rõ để Claude hiểu và truy xuất đúng, và nêu tên tài liệu cụ thể trong câu hỏi để việc tìm kiếm tập trung. Help center cũng khuyên tải đủ tài liệu ngay từ đầu, không nhỏ giọt. RAG không có nút chỉnh tay. Gộp tất cả vào một file không tên làm mất chính tín hiệu giúp truy xuất."
    }
   ]
  },
  {
   "id": "d6",
   "name": "Governance, Risk, and Responsible Use",
   "weight": 15,
   "intro": "<p>Domain này hỏi về <strong>dùng Claude có trách nhiệm</strong>: việc nào được và không được giao cho Claude, xử lý dữ liệu nhạy cảm, quy định pháp luật, làm việc trong chính sách AI của tổ chức, và các vấn đề đạo đức như trách nhiệm giải trình, minh bạch về việc dùng AI, phụ thuộc quá mức và bias.</p><p>Ranh giới: kỹ thuật kiểm output (fact-check, phát hiện hallucination) là D2. D6 hỏi về quyết định và trách nhiệm: có nên đưa dữ liệu này vào không, ai chịu trách nhiệm, phải nói với ai.</p>",
   "lessons": [
    {
     "id": "l-6-0",
     "title": "Nền tảng D6: dữ liệu của bạn đi đâu, ai đặt luật, và luật gồm những tầng nào",
     "minutes": 13,
     "html": "<p>Mô tả khóa \"Governance, Risk &amp; Responsible Use\" trong lộ trình Associate nhận xét rằng hầu hết mọi người chỉ nghĩ tới quản trị khi đã có chuyện, và việc tránh sự cố chủ yếu dựa vào khả năng phán đoán có thể học được. Bốn bài của Domain 6 xây khả năng phán đoán đó. Bài này dựng nền: <strong>governance</strong> là gì, dữ liệu bạn gửi đi đâu, và luật lệ gồm những tầng nào.</p>\n<h4>Governance là gì</h4>\n<p><strong>Governance</strong> (quản trị AI) là toàn bộ những thứ giúp tổ chức dùng AI đúng luật, đúng chính sách: chính sách AI viết ra, người chịu trách nhiệm, cài đặt do admin khóa, nhật ký để kiểm tra, và quy trình khi có sự cố. Với một associate, governance hiện ra ở ba câu hỏi: việc này có được giao cho Claude không, dữ liệu này có được đưa vào không, và ai phải biết là có dùng AI.</p>\n<h4>Dữ liệu đi đâu: gói cá nhân và gói tổ chức</h4>\n<table>\n<thead><tr><th></th><th>Gói cá nhân (Free, Pro, Max…)</th><th>Gói thương mại (Team, Enterprise, API)</th></tr></thead>\n<tbody>\n<tr><td>Dùng để huấn luyện</td><td>Tùy cài đặt quyền riêng tư của người dùng</td><td>Mặc định không, trừ khi tổ chức chọn tham gia (ví dụ Development Partner Program) hoặc người dùng gửi phản hồi</td></tr>\n<tr><td>Ai kiểm soát</td><td>Chính người dùng</td><td>Admin của tổ chức theo chính sách công ty</td></tr>\n</tbody>\n</table>\n<p>Một vài mốc thời gian cần biết, theo trang quyền riêng tư cho dữ liệu tổ chức (docs hiện ghi, tháng 11/2026): chat đã xóa biến mất khỏi lịch sử ngay và bị xóa khỏi hệ thống phía sau trong vòng 30 ngày; chat incognito tự xóa trong vòng 30 ngày trừ khi bị gắn cờ vi phạm Usage Policy; dữ liệu gắn với phản hồi (thumbs up/down) được giữ 5 năm. Trang privacy cũng khuyến khích người dùng không dùng sản phẩm để xử lý dữ liệu cá nhân.</p>\n<h4>Các tầng luật lệ</h4>\n<ol>\n<li><strong>Pháp luật</strong>: luật bảo vệ dữ liệu, luật ngành (ví dụ GDPR, HIPAA tùy nơi và loại dữ liệu).</li>\n<li><strong>Usage Policy của Anthropic</strong>: áp cho mọi người dùng Claude.</li>\n<li><strong>Chính sách AI của tổ chức</strong>: công cụ nào được duyệt, dữ liệu nào được đưa vào, việc nào cần duyệt.</li>\n<li><strong>Cài đặt của admin</strong>: chính sách được biến thành công tắc, ví dụ bật tắt web search, connector, memory, chia sẻ Project.</li>\n<li><strong>Quy tắc của nhóm</strong>: thói quen làm việc riêng, ví dụ mọi bài đăng đều qua trưởng nhóm.</li>\n</ol>\n<p>Tầng gần bạn có thể khắt khe hơn tầng trên, nhưng không thể cho phép điều tầng trên đã cấm.</p>\n<h4>Usage Policy gồm ba phần cần nhớ</h4>\n<ul>\n<li><strong>Việc bị cấm</strong>: không có ngoại lệ vì lý do kinh doanh (danh sách ở l-6-1).</li>\n<li><strong>Yêu cầu cho trường hợp rủi ro cao</strong>: khi Claude tạo khuyến nghị trong các lĩnh vực như pháp lý, y tế, tài chính, tín dụng, bảo hiểm, nhà ở, việc làm, giáo dục và bằng cấp, một người đủ chuyên môn phải xem xét thực chất, có quyền sửa, và vẫn chịu trách nhiệm; người nhận phải được thông báo là có dùng AI (không bắt buộc nêu tên Anthropic hay Claude).</li>\n<li><strong>Công bố là AI</strong>: chatbot hoặc agent giao tiếp trực tiếp với người dùng bên ngoài phải cho biết họ đang nói chuyện với AI, tối thiểu ở đầu mỗi phiên hoặc trong giao diện sản phẩm.</li>\n</ul>\n<p><strong>Phiên bản nào áp dụng khi nào</strong>: bản Usage Policy hiệu lực từ 15/9/2025 áp dụng tới hết ngày 11/11/2026; từ 12/11/2026 bản mới (công bố 8/10/2026) thay thế. Ba ý trên mô tả theo bản mới, là bản đang hiển thị trên anthropic.com/legal/aup. Bản 2025 có cùng hai yêu cầu cốt lõi nhưng ghi chúng áp dụng cho các trường hợp hướng tới người tiêu dùng (consumer-facing) và yêu cầu chatbot công bố là AI ở đầu mỗi phiên chat. Anthropic mô tả yêu cầu cốt lõi cho rủi ro cao là không đổi (chi tiết khác biệt ở l-6-1).</p>\n<h4>Diligence: tên năng lực trong khung 4D</h4>\n<p>Khung AI Fluency gọi nhóm năng lực này là <strong>Diligence</strong>, gồm Creation Diligence (cân nhắc dùng hệ thống AI nào và tương tác ra sao), Transparency Diligence (trung thực về vai trò của AI với người cần biết) và Deployment Diligence (chịu trách nhiệm kiểm và bảo đảm cho output bạn dùng hoặc chia sẻ).</p>\n<h4>Bài nào trong Domain 6 đụng vào phần nào</h4>\n<table>\n<thead><tr><th>Bài</th><th>Nội dung chính</th><th>Câu hỏi</th></tr></thead>\n<tbody>\n<tr><td>l-6-0 (bài này)</td><td>Governance, dữ liệu đi đâu, các tầng luật, ba phần của Usage Policy, Diligence</td><td>Luật nằm ở đâu?</td></tr>\n<tr><td>l-6-1 Usage Policy và vùng rủi ro cao</td><td>Việc bị cấm, yêu cầu rủi ro cao, việc được phép nhưng có phù hợp không</td><td>Việc này có được giao?</td></tr>\n<tr><td>l-6-2 Dữ liệu nhạy cảm</td><td>Loại dữ liệu nhạy cảm, giảm thiểu, chọn tài khoản, incognito, quy định</td><td>Dữ liệu này có được đưa vào?</td></tr>\n<tr><td>l-6-3 Chính sách tổ chức và đạo đức</td><td>Các tầng quy định, cài đặt admin, vùng xám, Diligence, tóm tắt đạo đức</td><td>Làm gì khi bị chặn hoặc chính sách im lặng?</td></tr>\n<tr><td>l-6-4 Đạo đức qua tình huống</td><td>Chuỗi trách nhiệm, quyết định công khai, phụ thuộc quá mức, bias trong quyết định về người</td><td>Ai chịu trách nhiệm, phải nói với ai?</td></tr>\n</tbody>\n</table>\n<div class=\"tip\">Khẩu vị đáp án D6: quyết định về dữ liệu trước khi gửi, dùng công cụ và tài khoản được duyệt, người chịu trách nhiệm ở việc hệ trọng, hỏi khi chính sách không rõ. \"Cấm hẳn AI\" và \"cứ làm vì không ai cấm\" đều là bẫy.</div>\n<div class=\"warn\">Con số thời hạn lưu dữ liệu và tên cài đặt thay đổi theo thời gian và theo gói. Đề hỏi nguyên tắc; con số chỉ để hiểu, và luôn kiểm lại trên trang privacy chính thức.</div>",
     "keypoints": [
      "Governance: chính sách, người chịu trách nhiệm, cài đặt admin, nhật ký, quy trình sự cố.",
      "Gói thương mại mặc định không dùng chat để huấn luyện; gói cá nhân tùy cài đặt người dùng.",
      "Docs hiện ghi (tháng 11/2026): chat xóa bị xóa khỏi hệ thống trong 30 ngày; incognito tự xóa trong 30 ngày trừ khi bị gắn cờ.",
      "Tầng luật: pháp luật → Usage Policy → chính sách tổ chức → cài đặt admin → quy tắc nhóm; tầng dưới chỉ được khắt khe hơn.",
      "Usage Policy: việc bị cấm; rủi ro cao cần người đủ chuyên môn duyệt và thông báo có dùng AI; chatbot với người ngoài phải công bố là AI."
     ],
     "sources": [
      {
       "t": "Governance, Risk & Responsible Use (Claude Associate path)",
       "u": "https://anthropic-partners.skilljar.com/path/claude-associate/governance-risk-responsible-use"
      },
      {
       "t": "How do you use personal data in model training? (commercial)",
       "u": "https://privacy.claude.com/en/articles/7996885-is-my-data-used-for-model-training"
      },
      {
       "t": "How long do you store my organization's data?",
       "u": "https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data"
      },
      {
       "t": "Anthropic Usage Policy (hiệu lực 12/11/2026; xem Version history)",
       "u": "https://www.anthropic.com/legal/aup"
      },
      {
       "t": "2026 Usage Policy update",
       "u": "https://www.anthropic.com/news/2026-usage-policy-update"
      },
      {
       "t": "The 4Ds: Diligence (AI Fluency, PDF)",
       "u": "https://www-cdn.anthropic.com/97ccae9e659f590c192de721eff980ba7549535b.pdf"
      },
      {
       "t": "AI Fluency: Framework & Foundations",
       "u": "https://anthropic.skilljar.com/ai-fluency-framework-foundations"
      }
     ]
    },
    {
     "id": "l-6-1",
     "title": "Việc nào giao cho Claude được: Usage Policy và vùng rủi ro cao",
     "minutes": 11,
     "html": "<p>Mọi người dùng Claude đều phải tuân thủ <strong>Usage Policy</strong> của Anthropic. Một cách ghi nhớ: xếp mỗi việc vào một trong ba nhóm dưới đây.</p>\n<h4>Nhóm 1: bị cấm</h4>\n<p>Usage Policy liệt kê các nhóm sử dụng bị cấm, ví dụ: hoạt động phi pháp; tấn công hạ tầng trọng yếu; truy cập trái phép hệ thống máy tính (mã độc, tấn công từ chối dịch vụ); vũ khí; bạo lực và thù ghét; xâm phạm quyền riêng tư; xâm hại trẻ em; quấy rối; tin giả và mạo danh; chiến dịch lừa dối (tài khoản ảo, đánh giá giả); can thiệp tiến trình dân chủ; giám sát trái phép và đưa ra quyết định trong tư pháp hình sự; lừa đảo (phishing, giả mạo giấy tờ); lạm dụng nền tảng; nội dung khiêu dâm. Không có ngoại lệ vì lý do kinh doanh.</p>\n<h4>Nhóm 2: rủi ro cao, cần người có chuyên môn</h4>\n<p>Usage Policy (bản hiệu lực từ 12/11/2026) xác định các lĩnh vực rủi ro cao như pháp lý, y tế và chăm sóc sức khỏe, tài chính, tín dụng, bảo hiểm, nhà ở, việc làm, giáo dục và bằng cấp, phúc lợi công, tình trạng pháp lý. Khi Claude tạo ra khuyến nghị trong các lĩnh vực này cho một cá nhân cụ thể, hai yêu cầu chính là:</p>\n<ul>\n<li><strong>Human-in-the-loop</strong>: một người có chuyên môn phải xem xét thực chất khuyến nghị trước khi nó tới tay người bị ảnh hưởng hoặc được dùng để ra quyết định; người đó có thể sửa và chịu trách nhiệm. Nếu luật yêu cầu giấy phép hành nghề, người duyệt phải có giấy phép.</li>\n<li><strong>Disclosure</strong>: người bị ảnh hưởng phải được thông báo rõ rằng AI đã được dùng để tạo ra lời khuyên hoặc quyết định (không bắt buộc nêu tên Anthropic hay Claude).</li>\n</ul>\n<p>Bản 2026 cũng liệt kê các trường hợp không thuộc diện này, như thông tin hoặc giáo dục chung (giải thích một đạo luật nói gì mà không áp vào hoàn cảnh của một người), nội dung wellness, soạn thảo, nghiên cứu, tóm tắt hay phân tích nội bộ <em>không phải là khuyến nghị cuối cùng được đưa ra</em>, và vận hành kinh doanh không tư vấn hay quyết định về một cá nhân cụ thể. Bản này còn miễn bước người duyệt (nếu luật cho phép) cho một số quyết định hoàn toàn có lợi cho người đó, ví dụ chi trả một yêu cầu bồi thường bảo hiểm. Ngoài ra, chatbot hoặc agent dành cho người tiêu dùng phải cho người dùng biết họ đang tương tác với AI.</p>\n<h4>Nhóm 3: được phép, nhưng có phù hợp không?</h4>\n<p>Việc được phép chưa chắc là việc hợp với Claude. Câu hỏi nên đặt: <strong>nếu Claude sai, lỗi có được phát hiện và khắc phục kịp trước khi gây hại không?</strong></p>\n<ul>\n<li>Hợp: soạn nháp, tóm tắt tài liệu bạn có, phân loại, brainstorm, chuyển định dạng — người dùng kiểm được trước khi dùng.</li>\n<li>Cần thận trọng: thông tin cần chính xác tuyệt đối mà không có nguồn kiểm; hành động khó đảo ngược (gửi email hàng loạt, xóa file) qua connector mà không có bước phê duyệt.</li>\n</ul>\n<p>Khi Claude thực hiện <em>hành động</em> (gửi, sửa lịch, chia sẻ file) thay vì chỉ soạn thảo, rủi ro tăng. Help center về Google Workspace ghi các hành động như gửi email hay chia sẻ file trên Drive mặc định cần bạn phê duyệt.</p>\n<h4>Phiên bản chính sách</h4>\n<p>Bài này mô tả theo bản Usage Policy hiệu lực từ <strong>12/11/2026</strong> (công bố 8/10/2026), là bản đang hiển thị trên anthropic.com/legal/aup. Trước ngày đó, bản hiệu lực từ <strong>15/9/2025</strong> vẫn áp dụng. Khác biệt cần biết:</p>\n<table>\n<thead><tr><th>Điểm</th><th>Bản 15/9/2025</th><th>Bản 12/11/2026</th></tr></thead>\n<tbody>\n<tr><td>Yêu cầu rủi ro cao áp cho</td><td>Các trường hợp hướng tới người tiêu dùng (consumer-facing)</td><td>Bất kỳ ai dùng Claude để đưa ra khuyến nghị rủi ro cao; có danh sách loại trừ</td></tr>\n<tr><td>Lĩnh vực</td><td>Pháp lý; y tế; bảo hiểm; tài chính; việc làm và nhà ở; khảo thí, kiểm định và tuyển sinh; nội dung báo chí/truyền thông tự động xuất bản</td><td>Pháp lý; y tế; tài chính; tín dụng; bảo hiểm; nhà ở; việc làm; giáo dục và bằng cấp; tiếp cận chăm sóc sức khỏe; phúc lợi công; tình trạng pháp lý</td></tr>\n<tr><td>Chatbot cho người tiêu dùng</td><td>Công bố là AI ít nhất ở đầu mỗi phiên chat</td><td>Ở đầu mỗi phiên chat hoặc trong giao diện sản phẩm; không cần nêu tên Anthropic hay Claude</td></tr>\n</tbody>\n</table>\n<p>Anthropic mô tả hai yêu cầu cốt lõi cho rủi ro cao (người có chuyên môn duyệt, thông báo có dùng AI) là không đổi. Với kỳ thi, hãy nắm tinh thần chung của cả hai bản: cấm là cấm; rủi ro cao thì cần người có chuyên môn duyệt và thông báo việc dùng AI.</p>\n<div class=\"tip\">Câu hỏi về lĩnh vực rủi ro cao (tuyển dụng, tín dụng, y tế, pháp lý) gần như luôn có đáp án chứa hai ý: người có chuyên môn xem xét trước khi kết quả tới tay người bị ảnh hưởng, và thông báo việc dùng AI. Phương án \"cấm hẳn\" thường quá tay; phương án \"để Claude quyết\" luôn sai.</div>\n<div class=\"warn\">\"Chỉ dùng nội bộ\" không tự động đưa việc ra khỏi vùng rủi ro cao. Theo bản 2026, nếu kết quả là khuyến nghị dùng để ra quyết định về một người cụ thể (sa thải, xét duyệt khoản vay), yêu cầu người duyệt vẫn áp dụng. Bản 2025 ghi yêu cầu này cho trường hợp consumer-facing, nhưng với quyết định hệ trọng về một người, giữ người có chuyên môn duyệt vẫn là cách làm có trách nhiệm.</div>",
     "keypoints": [
      "Ba nhóm: bị cấm (không ngoại lệ), rủi ro cao (người có chuyên môn duyệt + thông báo dùng AI), được phép (vẫn hỏi: lỗi có được phát hiện và khắc phục kịp không).",
      "Lĩnh vực rủi ro cao (bản 12/11/2026): pháp lý, y tế, tài chính, tín dụng, bảo hiểm, nhà ở, việc làm, giáo dục, phúc lợi công, tình trạng pháp lý.",
      "Người duyệt phải xem xét thực chất trước khi kết quả tới tay người bị ảnh hưởng, và chịu trách nhiệm.",
      "Chatbot cho người tiêu dùng phải cho biết người dùng đang nói chuyện với AI.",
      "Hành động qua connector rủi ro hơn soạn thảo; giữ bước phê duyệt."
     ],
     "sources": [
      {
       "t": "Anthropic Usage Policy",
       "u": "https://www.anthropic.com/legal/aup"
      },
      {
       "t": "2026 Usage Policy update",
       "u": "https://anthropic.com/news/2026-usage-policy-update"
      },
      {
       "t": "Use Google Workspace connectors",
       "u": "https://support.claude.com/en/articles/10166901-use-google-workspace-connectors"
      }
     ]
    },
    {
     "id": "l-6-2",
     "title": "Dữ liệu nhạy cảm, quyền riêng tư và quy định",
     "minutes": 12,
     "html": "<p>Nguyên tắc số một: quyết định về dữ liệu phải đưa ra <strong>trước khi bấm gửi</strong>. Không có nút thu hồi dữ liệu đã chia sẻ.</p>\n<h4>Dữ liệu nào là nhạy cảm</h4>\n<ul>\n<li>Thông tin định danh cá nhân: họ tên kèm số giấy tờ, địa chỉ, số điện thoại, ngày sinh.</li>\n<li>Sức khỏe, tài chính cá nhân, số tài khoản, thông tin nhân sự (lương, đánh giá, kỷ luật).</li>\n<li>Mật khẩu, khóa API, thông tin đăng nhập.</li>\n<li>Thông tin mật của khách hàng, bí mật kinh doanh, dữ liệu theo hợp đồng bảo mật.</li>\n</ul>\n<h4>Giảm thiểu dữ liệu</h4>\n<ol>\n<li><strong>Bỏ</strong>: chỉ đưa những trường thật sự cần. Phân tích xu hướng khiếu nại không cần tên và số điện thoại khách.</li>\n<li><strong>Ẩn danh hoặc thay mã</strong>: thay tên bằng \"Khách A\", \"Nhân viên 042\".</li>\n<li><strong>Tổng hợp</strong>: đưa số liệu đã gộp (theo vùng, theo tháng) thay vì từng bản ghi.</li>\n</ol>\n<p>Trang privacy của Anthropic về dữ liệu cá nhân trong huấn luyện ghi Anthropic khuyến khích người dùng không dùng sản phẩm để xử lý dữ liệu cá nhân; help center cũng khuyên cân nhắc kỹ trước khi chia sẻ thông tin rất nhạy cảm như số tài khoản, hồ sơ sức khỏe, mật khẩu, tài liệu mật.</p>\n<h4>Tài khoản nào, gói nào</h4>\n<ul>\n<li><strong>Gói cá nhân</strong> (Free, Pro, Max, Ultra): việc dữ liệu có được dùng để cải thiện model hay không phụ thuộc vào cài đặt quyền riêng tư của người dùng.</li>\n<li><strong>Gói thương mại</strong> (Team, Enterprise, API): Anthropic thông báo thay đổi điều khoản cho người dùng cá nhân năm 2025 không áp dụng cho các gói này; mặc định Anthropic không dùng nội dung của khách hàng thương mại để huấn luyện.</li>\n<li>Gói Enterprise có thêm các kiểm soát như audit log, cấu hình thời gian lưu dữ liệu tùy chỉnh, và tùy chọn cấu hình sẵn sàng cho HIPAA kèm BAA.</li>\n</ul>\n<p>Vì vậy, dữ liệu công việc phải đi qua tài khoản công ty được duyệt, không qua tài khoản cá nhân, kể cả khi tài khoản cá nhân \"tiện hơn\".</p>\n<h4>Những điều hay bị hiểu nhầm</h4>\n<ul>\n<li><strong>Incognito chat</strong> không lưu vào lịch sử hay memory và không dùng để huấn luyện, nhưng help center ghi vẫn được lưu giữ 30 ngày theo mặc định. Incognito không biến dữ liệu bị cấm thành được phép.</li>\n<li><strong>Xóa chat</strong>: biến mất khỏi lịch sử ngay, được xóa khỏi hệ thống phía sau trong vòng 30 ngày.</li>\n<li><strong>Yêu cầu Claude \"quên đi\"</strong> không bảo vệ được dữ liệu đã gửi. Biện pháp thật là không gửi dữ liệu đó, hoặc dùng cài đặt và tài khoản phù hợp.</li>\n<li>Memory theo help center không lưu một số loại như số giấy tờ tùy thân, số tài khoản tài chính; nhưng đây là lớp bảo vệ của sản phẩm, không thay cho việc bạn tự giảm thiểu dữ liệu.</li>\n</ul>\n<h4>Quy định pháp luật</h4>\n<p>Tùy nơi làm việc và loại dữ liệu, các quy định như GDPR (dữ liệu cá nhân ở châu Âu) hay HIPAA (thông tin sức khỏe ở Mỹ) đặt yêu cầu về việc ai được xử lý dữ liệu, cho mục đích gì, lưu bao lâu. Một associate không cần thuộc từng điều luật, nhưng phải nhận ra khi nào dữ liệu thuộc diện điều chỉnh và <strong>hỏi đội pháp chế, compliance hoặc bảo mật</strong> trước khi đưa vào bất kỳ công cụ AI nào.</p>\n<div class=\"tip\">Đáp án tốt cho câu hỏi dữ liệu nhạy cảm thường có dạng: giảm thiểu hoặc ẩn danh dữ liệu trước, dùng tài khoản công ty được duyệt, hỏi compliance khi dữ liệu thuộc diện quy định. Phương án \"dùng incognito là đủ\" hoặc \"dặn Claude giữ bí mật\" là bẫy.</div>\n<div class=\"warn\">Dán nguyên bảng dữ liệu khách hàng vào chat \"để Claude phân tích cho nhanh\" là lỗi kinh điển. Hầu hết phân tích chỉ cần vài cột đã ẩn danh.</div>",
     "keypoints": [
      "Quyết định về dữ liệu trước khi gửi; không có nút thu hồi.",
      "Bớt dữ liệu: bỏ trường không cần, ẩn danh/thay mã, tổng hợp.",
      "Dữ liệu công việc đi qua tài khoản công ty được duyệt; gói thương mại mặc định không dùng để huấn luyện.",
      "Incognito vẫn lưu 30 ngày mặc định; xóa chat được purge trong 30 ngày; yêu cầu Claude 'quên' không bảo vệ dữ liệu đã gửi.",
      "Dữ liệu thuộc diện GDPR, HIPAA… → hỏi pháp chế/compliance trước khi dùng."
     ],
     "sources": [
      {
       "t": "Updates to our consumer terms",
       "u": "https://www.anthropic.com/news/updates-to-our-consumer-terms"
      },
      {
       "t": "How do you use personal data in model training? (privacy center)",
       "u": "https://privacy.claude.com/en/articles/7996885-is-my-data-used-for-model-training"
      },
      {
       "t": "I would like to input sensitive data into my chats with Claude. Who can view my conversations?",
       "u": "https://support.claude.com/en/articles/8325621-claude-data-privacy-faq"
      },
      {
       "t": "Use incognito chats",
       "u": "https://support.claude.com/en/articles/12260368-use-incognito-chats"
      },
      {
       "t": "What is the Enterprise plan?",
       "u": "https://support.claude.com/en/articles/9797531-what-is-the-enterprise-plan"
      },
      {
       "t": "Chat search and memory",
       "u": "https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context"
      }
     ]
    },
    {
     "id": "l-6-3",
     "title": "Chính sách tổ chức và đạo đức: trách nhiệm, minh bạch, phụ thuộc, bias",
     "minutes": 12,
     "html": "<h4>Các tầng quy định</h4>\n<p>Việc dùng Claude ở nơi làm việc chịu nhiều tầng: pháp luật, Usage Policy của Anthropic, chính sách AI của tổ chức, và quy tắc riêng của nhóm. Quy định ở <strong>cấp gần bạn hơn có thể khắt khe hơn cấp trên</strong>, nhưng không thể cho phép điều cấp trên đã cấm. Ví dụ: Usage Policy cho phép soạn email marketing, nhưng chính sách công ty có thể yêu cầu mọi nội dung đối ngoại do AI hỗ trợ phải qua phòng truyền thông.</p>\n<h4>Chính sách được thực thi qua cài đặt admin</h4>\n<p>Admin của gói Team và Enterprise biến chính sách thành cài đặt: bật hoặc tắt web search, connector, memory, code execution, chia sẻ Project; trên Enterprise còn có thể tắt model hay mức effort theo vai trò, đặt thời gian lưu dữ liệu, xem audit log. Khi một tính năng bị tắt, đó thường là quyết định có chủ đích.</p>\n<h4>Khi gặp giới hạn hoặc vùng xám</h4>\n<ul>\n<li><strong>Bị chặn</strong>: không tìm đường vòng (tài khoản cá nhân, công cụ khác chưa được duyệt). Nếu có nhu cầu chính đáng, đề xuất với người sở hữu chính sách kèm lý do.</li>\n<li><strong>Chính sách không nhắc tới</strong>: đừng tự suy là được phép. Hỏi người phụ trách (quản lý, compliance, bảo mật), nhất là khi có dữ liệu nhạy cảm hoặc nội dung đối ngoại.</li>\n<li><strong>Yêu cầu của sếp va với chính sách</strong>: nêu rõ xung đột, đề xuất cách làm tuân thủ, và đưa lên đúng cấp; không lặng lẽ vi phạm.</li>\n</ul>\n<h4>Diligence: ba phần của trách nhiệm</h4>\n<p>Khung AI Fluency gọi nhóm năng lực này là <strong>Diligence</strong>, gồm:</p>\n<ul>\n<li><strong>Creation Diligence</strong>: cân nhắc dùng hệ thống AI nào và tương tác với nó ra sao.</li>\n<li><strong>Transparency Diligence</strong>: trung thực về vai trò của AI trong công việc của bạn với những người cần biết.</li>\n<li><strong>Deployment Diligence</strong>: chịu trách nhiệm kiểm và bảo đảm cho output bạn dùng hoặc chia sẻ.</li>\n</ul>\n<h4>Trách nhiệm thuộc về người dùng output</h4>\n<p>\"Claude viết vậy\" không phải lời bào chữa. Khi bạn gửi, đăng hay dùng một output để ra quyết định, trách nhiệm là của bạn (và của người duyệt trong quy trình), không phải của công cụ.</p>\n<h4>Minh bạch về việc dùng AI</h4>\n<p>Có những trường hợp bắt buộc: Usage Policy yêu cầu thông báo khi AI tạo khuyến nghị rủi ro cao cho cá nhân, và chatbot cho người tiêu dùng phải cho biết là AI. Ngoài ra, chính sách tổ chức, yêu cầu của khách hàng, quy định của trường học hay tạp chí có thể đặt thêm yêu cầu. Với việc soạn thảo thường ngày, không có quy tắc chung từ Anthropic; hãy theo chính sách tổ chức và hỏi: người nhận có kỳ vọng hợp lý được biết không?</p>\n<h4>Phụ thuộc quá mức</h4>\n<p>Dùng AI cho mọi việc có thể làm mai một kỹ năng phán đoán mà bạn cần để kiểm chính output đó. Dấu hiệu: chấp nhận output mà không đọc kỹ, không còn tự viết được bản nháp, không giải thích được vì sao kết luận đúng. Cách giữ: tự làm phần cốt lõi của chuyên môn, dùng Claude để phản biện thay vì chỉ để làm hộ, và giữ thói quen kiểm.</p>\n<h4>Bias và công bằng</h4>\n<p>Khi output dùng cho quyết định về con người (tuyển dụng, đánh giá, phân bổ nguồn lực), bias có hậu quả thật. Đừng dùng Claude để chấm điểm hay xếp hạng người dựa trên các thuộc tính không liên quan; rà output theo góc nhìn của các nhóm bị ảnh hưởng; giữ quyết định cuối ở người có trách nhiệm.</p>\n<div class=\"tip\">Câu hỏi \"chính sách công ty không nói gì về việc này\" → đáp án đúng thường là hỏi người phụ trách chính sách trước khi làm, không phải \"được phép vì không bị cấm\" và cũng không phải \"tuyệt đối không dùng AI\".</div>\n<div class=\"warn\">Dùng tài khoản Claude cá nhân để làm việc mà công ty đã tắt tính năng tương ứng là vi phạm chính sách, dù mục đích là \"cho nhanh\".</div>",
     "keypoints": [
      "Các cấp quy định: luật → Usage Policy → chính sách tổ chức → quy tắc nhóm; cấp dưới chỉ được khắt khe hơn.",
      "Admin biến chính sách thành cài đặt; bị chặn thì không đi đường vòng, chính sách im lặng thì hỏi.",
      "Diligence: Creation, Transparency, Deployment.",
      "Ai gửi hoặc dùng output thì người đó chịu trách nhiệm; thông báo dùng AI khi chính sách/luật yêu cầu hoặc người nhận có kỳ vọng hợp lý.",
      "Chống phụ thuộc quá mức: giữ kỹ năng cốt lõi, giữ thói quen kiểm; quyết định về con người phải được rà bias và do người quyết."
     ],
     "sources": [
      {
       "t": "The 4Ds: Diligence (AI Fluency, PDF)",
       "u": "https://www-cdn.anthropic.com/97ccae9e659f590c192de721eff980ba7549535b.pdf"
      },
      {
       "t": "AI Fluency: Framework & Foundations",
       "u": "https://anthropic.skilljar.com/ai-fluency-framework-foundations"
      },
      {
       "t": "Anthropic Usage Policy",
       "u": "https://www.anthropic.com/legal/aup"
      },
      {
       "t": "Change the model, effort, and thinking settings",
       "u": "https://support.claude.com/en/articles/8664678-change-the-model-effort-and-thinking-settings"
      },
      {
       "t": "Enable and use web search",
       "u": "https://support.claude.com/en/articles/10684626-enabling-and-using-web-search"
      },
      {
       "t": "What is the Enterprise plan?",
       "u": "https://support.claude.com/en/articles/9797531-what-is-the-enterprise-plan"
      }
     ]
    },
    {
     "id": "l-6-4",
     "title": "Đạo đức khi dùng AI qua tình huống: ai chịu trách nhiệm, khi nào phải nói, và không để AI nghĩ thay",
     "minutes": 12,
     "html": "<p>Mục tiêu cuối của khóa Governance trong lộ trình Associate là hiểu các hệ quả đạo đức của việc dùng AI. Bài l-6-3 đã nêu các nguyên tắc. Bài này luyện áp dụng chúng vào tình huống, vì đề hiếm khi hỏi định nghĩa mà thường hỏi \"nên làm gì\".</p>\n<h4>1. Chuỗi trách nhiệm</h4>\n<p>Một output đi qua nhiều người: người viết prompt, người kiểm, người duyệt, người gửi. Nguyên tắc: <strong>mỗi người chịu trách nhiệm cho phần mình đã quyết</strong>, và người gửi hoặc dùng output để ra quyết định chịu trách nhiệm cuối cùng với người nhận. Usage Policy (bản hiệu lực từ 12/11/2026) viết rõ cho trường hợp rủi ro cao: người duyệt có thẩm quyền sửa và vẫn chịu trách nhiệm về độ chính xác và sự phù hợp của thứ được đưa ra.</p>\n<p><em>Tình huống</em>: một bản đề xuất ngân sách do Claude soạn có số sai, trưởng phòng đã ký và gửi ban giám đốc. \"Do AI tính\" không chuyển trách nhiệm sang công cụ. Việc nên làm: báo sai sót ngay, sửa, và xem lại vì sao điểm duyệt không bắt được (thiếu bảng số gốc? duyệt hình thức?).</p>\n<h4>2. Khi nào phải nói là có dùng AI</h4>\n<p>Đi qua các câu hỏi theo thứ tự:</p>\n<ol>\n<li><strong>Có quy định bắt buộc không?</strong> Usage Policy yêu cầu thông báo khi AI tạo khuyến nghị rủi ro cao cho một cá nhân, và chatbot giao tiếp với người ngoài phải cho biết là AI.</li>\n<li><strong>Chính sách tổ chức hoặc yêu cầu của bên nhận nói gì?</strong> Khách hàng, trường học, tạp chí, cơ quan có thể có quy định riêng.</li>\n<li><strong>Người nhận có kỳ vọng hợp lý được biết không?</strong> Ví dụ khách trả tiền cho một bản phân tích \"do chuyên gia thực hiện\" thì có lý do để muốn biết mức độ AI tham gia.</li>\n</ol>\n<p>Ngoài các trường hợp bắt buộc, Anthropic không đặt quy tắc chung cho việc soạn thảo thường ngày; Transparency Diligence trong khung 4D nói về sự trung thực với \"những người cần biết\". Trung thực cũng có nghĩa là không nói quá: không tuyên bố \"100% do tôi viết\" khi phần lớn do Claude soạn.</p>\n<h4>3. Phụ thuộc quá mức</h4>\n<p>Phụ thuộc quá mức là khi bạn không còn đủ khả năng tự đánh giá output mà mình đang dùng. Nó nguy hiểm vì làm hỏng chính bước kiểm (D2). Dấu hiệu và cách giữ (lời khuyên thực hành):</p>\n<table>\n<thead><tr><th>Dấu hiệu</th><th>Cách giữ</th></tr></thead>\n<tbody>\n<tr><td>Gửi output mà không đọc hết</td><td>Đọc theo checklist trước khi gửi bất cứ thứ gì đối ngoại</td></tr>\n<tr><td>Không giải thích được vì sao kết luận đúng</td><td>Yêu cầu Claude trình bày lập luận; tự kiểm ít nhất một bước then chốt</td></tr>\n<tr><td>Nhân viên mới chưa từng tự làm việc cốt lõi</td><td>Cho họ tự làm vài lần trước, dùng Claude để phản biện bản của họ</td></tr>\n<tr><td>Luôn chọn phương án đầu tiên Claude đưa</td><td>Xin nhiều phương án và tự đặt tiêu chí chọn</td></tr>\n</tbody>\n</table>\n<h4>4. Bias trong quyết định về con người</h4>\n<p>Khi output dùng để tuyển dụng, đánh giá, xét duyệt, phân bổ nguồn lực, bias có hậu quả thật với người cụ thể, và đây cũng thường rơi vào lĩnh vực rủi ro cao của Usage Policy (việc làm, tín dụng, nhà ở, giáo dục…).</p>\n<ul>\n<li>Không đưa vào các thuộc tính không liên quan tới tiêu chí (tuổi, giới tính, quê quán…) khi nhờ Claude sàng lọc hay so sánh.</li>\n<li>Viết tiêu chí rõ ràng, áp cùng tiêu chí cho mọi người, giữ lại lập luận cho từng đánh giá.</li>\n<li>Rà output theo góc nhìn của các nhóm bị ảnh hưởng: nhóm nào luôn bị xếp thấp, và có lý do chính đáng không?</li>\n<li>Người có thẩm quyền đưa ra quyết định cuối và chịu trách nhiệm; người bị ảnh hưởng được thông báo khi Usage Policy hoặc luật yêu cầu.</li>\n</ul>\n<h4>5. Ba tình huống ngắn</h4>\n<table>\n<thead><tr><th>Tình huống</th><th>Cách xử lý hợp lý</th></tr></thead>\n<tbody>\n<tr><td>Sếp bảo \"cứ để Claude chấm điểm 300 hồ sơ ứng viên rồi loại nửa dưới\"</td><td>Nêu rủi ro: đây là quyết định việc làm về từng cá nhân; đề xuất Claude tóm tắt hồ sơ theo tiêu chí, người tuyển dụng quyết định, ứng viên được thông báo theo yêu cầu</td></tr>\n<tr><td>Đồng nghiệp đăng bài phân tích do Claude viết dưới tên mình, có số liệu chưa kiểm</td><td>Chuyện chính là số chưa kiểm: người đăng chịu trách nhiệm kiểm; việc ghi nhận AI theo chính sách công ty</td></tr>\n<tr><td>Bạn nhận ra mình không còn tự viết được báo cáo tháng</td><td>Tự viết bản nháp đầu, dùng Claude rà và gợi ý; giữ kỹ năng để còn kiểm được output</td></tr>\n</tbody>\n</table>\n<div class=\"tip\">Đáp án đạo đức tốt thường làm cùng lúc hai việc: vẫn dùng Claude cho phần nó làm tốt, và giữ con người ở phần quyết định, kiểm tra, công khai. Phương án đổ trách nhiệm cho công cụ, hoặc cấm hẳn AI, thường là bẫy.</div>\n<div class=\"warn\">\"Công khai có dùng AI\" không thay được việc kiểm. Một báo cáo ghi \"có sự hỗ trợ của AI\" mà số liệu sai vẫn là báo cáo sai, và người gửi vẫn chịu trách nhiệm.</div>",
     "keypoints": [
      "Mỗi người chịu trách nhiệm phần mình quyết; người gửi hoặc dùng output để quyết định chịu trách nhiệm cuối với người nhận.",
      "Công khai: kiểm quy định bắt buộc (Usage Policy rủi ro cao, chatbot với người ngoài) → chính sách tổ chức/bên nhận → kỳ vọng hợp lý của người nhận.",
      "Phụ thuộc quá mức làm hỏng chính bước kiểm; giữ kỹ năng cốt lõi, đọc theo checklist, tự kiểm bước then chốt.",
      "Quyết định về con người: bỏ thuộc tính không liên quan, cùng tiêu chí cho mọi người, rà theo nhóm bị ảnh hưởng, người có thẩm quyền quyết.",
      "Công khai có dùng AI không thay được việc kiểm."
     ],
     "sources": [
      {
       "t": "Governance, Risk & Responsible Use (Claude Associate path)",
       "u": "https://anthropic-partners.skilljar.com/path/claude-associate/governance-risk-responsible-use"
      },
      {
       "t": "Anthropic Usage Policy",
       "u": "https://www.anthropic.com/legal/aup"
      },
      {
       "t": "The 4Ds: Diligence (AI Fluency, PDF)",
       "u": "https://www-cdn.anthropic.com/97ccae9e659f590c192de721eff980ba7549535b.pdf"
      },
      {
       "t": "AI Fluency: Framework & Foundations",
       "u": "https://anthropic.skilljar.com/ai-fluency-framework-foundations"
      }
     ]
    }
   ],
   "cheat": [
    [
     "Bị cấm",
     "Phi pháp, mã độc, vũ khí, lừa đảo, mạo danh, tin giả, đánh giá giả, quấy rối… không ngoại lệ"
    ],
    [
     "Rủi ro cao",
     "Bản 12/11/2026: pháp lý, y tế, tài chính, tín dụng, bảo hiểm, nhà ở, việc làm, giáo dục, tiếp cận chăm sóc sức khỏe, phúc lợi công, tình trạng pháp lý (bản 2025 có thêm nội dung báo chí tự động xuất bản)"
    ],
    [
     "Yêu cầu rủi ro cao",
     "Người có chuyên môn duyệt thực chất trước khi tới tay người bị ảnh hưởng + thông báo có dùng AI"
    ],
    [
     "Chatbot cho người tiêu dùng",
     "Phải cho biết người dùng đang tương tác với AI"
    ],
    [
     "Câu hỏi phù hợp",
     "Nếu sai, lỗi có được phát hiện và khắc phục kịp không? Hành động khó đảo ngược cần phê duyệt"
    ],
    [
     "Giảm thiểu dữ liệu",
     "Bỏ trường không cần → ẩn danh/thay mã → tổng hợp; quyết định TRƯỚC khi gửi"
    ],
    [
     "Tài khoản",
     "Dữ liệu công việc qua tài khoản công ty; gói thương mại mặc định không dùng để huấn luyện"
    ],
    [
     "Incognito / xóa chat",
     "Không lịch sử, không memory, không huấn luyện nhưng vẫn lưu 30 ngày / purge trong 30 ngày"
    ],
    [
     "Quy định (GDPR, HIPAA)",
     "Nhận ra dữ liệu thuộc diện → hỏi pháp chế/compliance trước"
    ],
    [
     "Các cấp chính sách",
     "Luật → Usage Policy → tổ chức → nhóm; cấp dưới chỉ được khắt khe hơn"
    ],
    [
     "Bị chặn / chính sách im lặng",
     "Không đi đường vòng / hỏi người phụ trách"
    ],
    [
     "Diligence (4D)",
     "Creation, Transparency, Deployment; người dùng output chịu trách nhiệm"
    ],
    [
     "Chatbot giao tiếp với người ngoài",
     "Công bố là AI: bản 2025 ít nhất ở đầu mỗi phiên chat; bản từ 12/11/2026 ở đầu mỗi phiên hoặc trong giao diện"
    ],
    [
     "Usage Policy mới",
     "Bản 15/9/2025 áp dụng tới 11/11/2026; bản mới hiệu lực 12/11/2026 (trang này mô tả theo bản mới); hai yêu cầu cốt lõi cho rủi ro cao không đổi"
    ],
    [
     "Có phải công khai dùng AI?",
     "Quy định bắt buộc → chính sách tổ chức/bên nhận → kỳ vọng hợp lý của người nhận"
    ],
    [
     "Phụ thuộc quá mức",
     "Mất khả năng tự kiểm output; giữ kỹ năng cốt lõi, đọc theo checklist, tự kiểm bước then chốt"
    ]
   ],
   "quiz": [
    {
     "q": "A loan officer wants to use Claude to draft recommendations on whether individual applicants should be approved for credit. Which approach BEST aligns with responsible use?",
     "options": [
      "Let Claude make approval decisions automatically to remove human bias",
      "Prohibit any use of Claude anywhere in the lending department",
      "Have a qualified credit professional review Claude's drafts before any decision, and tell applicants AI was used",
      "Use Claude's recommendations as the final decision unless the applicant asks about the process, in which case a human re-checks the file"
     ],
     "answer": 2,
     "explain": "Tín dụng là lĩnh vực rủi ro cao trong Usage Policy: cần người có chuyên môn xem xét thực chất trước khi ra quyết định và thông báo cho người bị ảnh hưởng rằng có dùng AI. Để Claude tự quyết bỏ qua người duyệt (và không loại được bias). Cấm hoàn toàn là quá tay. Coi khuyến nghị là quyết định cuối khi không ai hỏi vi phạm cả hai yêu cầu."
    },
    {
     "q": "A support analyst wants Claude to identify trends in 5,000 customer complaints. The export includes names, email addresses, phone numbers, and complaint text. What should the analyst do FIRST?",
     "options": [
      "Upload the full export to an incognito chat so it is not saved to history",
      "Upload the full export and ask Claude not to remember the personal details",
      "Upload it through a personal Pro account because it has higher usage limits",
      "Remove or pseudonymize the personal fields, keeping only what the trend analysis needs, and use the company-approved Claude account"
     ],
     "answer": 3,
     "explain": "Phân tích xu hướng không cần tên, email, số điện thoại: bớt dữ liệu trước khi gửi và dùng tài khoản công ty được duyệt. Incognito vẫn lưu giữ 30 ngày theo mặc định và không biến dữ liệu thừa thành hợp lệ. Yêu cầu Claude 'quên' không bảo vệ được dữ liệu đã gửi. Tài khoản cá nhân cho dữ liệu công việc vi phạm chính sách và nằm ngoài kiểm soát của tổ chức."
    },
    {
     "q": "An employee notices that her company's AI policy says nothing about using Claude to summarize recorded client calls. What is the MOST appropriate action?",
     "options": [
      "Ask the policy owner or compliance team before proceeding, since client recordings may hold confidential or regulated data",
      "Proceed, since anything not explicitly prohibited is allowed",
      "Never use Claude for any client-related work again",
      "Use her personal Claude account for these summaries so the unresolved company policy questions do not slow the client project down"
     ],
     "answer": 0,
     "explain": "Chính sách im lặng không có nghĩa là được phép, nhất là với ghi âm khách hàng có thể chứa thông tin mật hoặc thuộc diện quy định. Hỏi người phụ trách là đúng. Tự suy là được phép là rủi ro. Cấm mình hoàn toàn là quá tay. Dùng tài khoản cá nhân là đi đường vòng, vi phạm chính sách."
    },
    {
     "q": "A team is reviewing its responsible-use practices for Claude. Which TWO statements reflect sound accountability practices? (Choose TWO.)",
     "options": [
      "If Claude wrote the content, the vendor is responsible for any errors in it",
      "Once a workflow uses Claude, human reviewers are no longer needed for routine tasks",
      "Work produced with Claude never needs to be disclosed to anyone",
      "The person who sends or publishes Claude-assisted work is accountable for verifying it",
      "Disclose AI involvement where policy or law requires it, or where recipients would reasonably expect to know"
     ],
     "answer": [
      3,
      4
     ],
     "explain": "Deployment Diligence: người gửi/đăng chịu trách nhiệm kiểm output. Transparency Diligence: thông báo việc dùng AI khi luật, chính sách yêu cầu hoặc người nhận có kỳ vọng hợp lý. Đổ trách nhiệm cho nhà cung cấp là sai. Bỏ hẳn người duyệt chỉ vì có Claude là bỏ kiểm soát. 'Không bao giờ cần thông báo' mâu thuẫn với yêu cầu của Usage Policy cho trường hợp rủi ro cao."
    },
    {
     "q": "A company's Claude Enterprise admin has disabled web search for the organization. A marketing specialist needs current competitor pricing for a report. What should she do?",
     "options": [
      "Use her personal Claude account, where web search is available",
      "Gather the information from approved sources herself or request access through the policy owner with a business justification",
      "Ask Claude to guess the current prices based on its training data",
      "Ask a colleague to share their login from another company"
     ],
     "answer": 1,
     "explain": "Tính năng bị tắt là quyết định chính sách có chủ đích. Cách đúng là dùng nguồn được duyệt hoặc đề xuất mở quyền với lý do chính đáng. Tài khoản cá nhân hay mượn đăng nhập là đi đường vòng. Bảo Claude đoán giá hiện tại từ dữ liệu huấn luyện dễ dẫn tới thông tin cũ hoặc bịa."
    },
    {
     "q": "A junior analyst has been using Claude for every report and now accepts outputs with little review. Her manager is concerned about over-reliance. Which action BEST addresses this?",
     "options": [
      "Have her write the core analysis herself, use Claude to critique and extend it, and keep verifying figures and claims",
      "Ban her from using Claude for six months",
      "Have Claude review all of her Claude-generated reports before submission, replacing the manager's review to save everyone time",
      "Switch her to a more capable model so fewer errors occur"
     ],
     "answer": 0,
     "explain": "Chống phụ thuộc quá mức là giữ kỹ năng cốt lõi (tự làm phần phân tích chính), dùng Claude để phản biện và mở rộng, và giữ thói quen kiểm. Cấm hẳn bỏ qua lợi ích và không xây kỹ năng dùng AI đúng cách. Để Claude chấm Claude không thay được người chịu trách nhiệm. Model mạnh hơn không giải quyết việc người dùng ngừng kiểm."
    }
   ],
   "bank": [
    {
     "q": "A marketing coordinator asks Claude to write 50 five-star reviews from 'different customers' to post on a product page before launch. What is the appropriate response?",
     "options": [
      "Proceed, but post the reviews from personal accounts",
      "Decline: fake reviews are prohibited under Anthropic's Usage Policy; plan how to collect genuine ones instead",
      "Proceed, as long as every review describes the product's real features accurately and none of them criticize competitors",
      "Proceed if a manager approves the plan in writing"
     ],
     "answer": 1,
     "explain": "Usage Policy liệt kê đánh giá giả (fake reviews) trong nhóm hoạt động lừa dối bị cấm; nhóm bị cấm không có ngoại lệ vì lý do kinh doanh. Nội dung tích cực, mô tả đúng tính năng vẫn là đánh giá giả vì không đến từ khách hàng thật. Quản lý duyệt không biến hành vi bị cấm thành được phép. Đăng bằng tài khoản cá nhân vẫn là lừa dối, còn thêm hành vi tạo danh tính giả."
    },
    {
     "q": "Under Anthropic's Usage Policy, which use of Claude falls into a high-risk area that requires qualified human review and disclosure to the affected person?",
     "options": [
      "Writing a wellness newsletter for employees with general tips on sleep and exercise",
      "Brainstorming names for the meeting rooms in a new office building",
      "Summarizing a property team's internal meeting notes about the office cleaning schedule",
      "Ranking individual rental applicants to decide who is offered an apartment"
     ],
     "answer": 3,
     "explain": "Usage Policy đặt nhà ở (Housing) trong các lĩnh vực rủi ro cao, với ví dụ duyệt, từ chối hoặc xếp hạng hồ sơ thuê/mua nhà; khuyến nghị như vậy cần người có chuyên môn xem xét thực chất, và người bị ảnh hưởng phải được thông báo có dùng AI. Bản 2025 (áp dụng tới 12/11/2026) cũng xếp quyết định về điều kiện thuê nhà vào nhóm rủi ro cao. Nội dung wellness được loại trừ ở cả hai bản. Đặt tên phòng họp không phải khuyến nghị về một cá nhân nào. Tóm tắt ghi chú họp về lịch vệ sinh không đưa ra khuyến nghị về một cá nhân nào."
    },
    {
     "q": "A retailer is launching a customer-facing chat assistant built on Claude. The product team wants it to use a human name and never mention that it is AI, to make conversations 'feel personal.' What does Anthropic's Usage Policy require?",
     "options": [
      "Disclosure only in the company's annual report",
      "Users must be told they are interacting with AI, at least at the start of each session or in the interface",
      "Disclosure only when a customer directly asks whether they are talking to a person; otherwise the human persona can stay",
      "Nothing, as long as the assistant is always polite"
     ],
     "answer": 1,
     "explain": "Usage Policy yêu cầu chatbot hoặc agent tương tác trực tiếp với người dùng bên ngoài phải cho họ biết họ đang nói chuyện với AI chứ không phải người, ít nhất ở đầu mỗi phiên chat (bản 15/9/2025, áp dụng tới 11/11/2026) hoặc, theo bản hiệu lực từ 12/11/2026, ở đầu mỗi phiên chat hoặc trong giao diện sản phẩm. Lịch sự không thay được việc thông báo. Chỉ nói khi khách hỏi là không đáp ứng yêu cầu. Báo cáo thường niên không phải nơi khách đang trò chuyện nhìn thấy."
    },
    {
     "q": "A department head wants Claude to rank individual employees for an upcoming round of layoffs. He argues that because the rankings are 'internal only,' no special safeguards are needed. What is the BEST response?",
     "options": [
      "It is still a high-stakes decision about individuals: a qualified person must meaningfully review any AI input and stay accountable",
      "Use Claude, but delete the chat afterward so no record of AI involvement exists",
      "He is right, since internal documents are exempt from all policies",
      "Let Claude produce the final ranking on its own, because an automated ranking removes the personal bias managers bring to layoff decisions"
     ],
     "answer": 0,
     "explain": "Quyết định sa thải từng người là quyết định có hậu quả lớn về con người: người có chuyên môn phải xem xét thực chất và chịu trách nhiệm, đồng thời rà output về bias. Bản Usage Policy hiệu lực từ 12/11/2026 xếp việc đánh giá, kỷ luật, cho thôi việc người lao động vào lĩnh vực Employment và nói yêu cầu áp dụng cho bất kỳ ai tạo khuyến nghị rủi ro cao; các loại trừ (như phân tích nội bộ không phải khuyến nghị cuối cùng, hay vận hành kinh doanh không quyết định về một cá nhân cụ thể) không bao gồm việc xếp hạng từng người để sa thải. Bản 15/9/2025 (áp dụng tới 11/11/2026) ghi yêu cầu này cho trường hợp consumer-facing, nhưng dù theo bản nào, A vẫn là phương án duy nhất có trách nhiệm. Không có ngoại lệ chung cho tài liệu nội bộ. Để Claude tự xếp hạng bỏ qua người duyệt và không loại được bias. Xóa chat để che việc dùng AI đi ngược tinh thần minh bạch."
    },
    {
     "q": "An operations analyst wants Claude's help troubleshooting why an automated report export fails. She is about to paste the full configuration file, which includes the system's admin password. What should she do?",
     "options": [
      "Paste it unchanged, since Claude needs the real password to diagnose the export failure accurately",
      "Paste it, then ask Claude to forget the password afterward",
      "Paste it in an incognito chat, which makes sharing credentials safe",
      "Remove or mask the password and any other credentials before sharing the file"
     ],
     "answer": 3,
     "explain": "Mật khẩu và thông tin đăng nhập là dữ liệu nhạy cảm; quyết định chia sẻ phải đưa ra trước khi gửi vì không có nút thu hồi. Che hoặc xóa chúng là đủ để Claude phân tích cấu hình. Yêu cầu Claude 'quên' không bảo vệ dữ liệu đã gửi. Incognito vẫn được lưu giữ (mặc định 30 ngày) và không làm việc chia sẻ thông tin đăng nhập trở nên an toàn. Claude không cần mật khẩu thật để chẩn đoán lỗi cấu hình."
    },
    {
     "q": "A consultant has a personal Pro subscription and a company-provided Claude Enterprise account. She wants to analyze a client's confidential strategy documents and prefers her personal account because she's used to it. What should she do?",
     "options": [
      "Use the personal account, since every Claude plan, personal or business, handles data in exactly the same way",
      "Use the personal account but switch on incognito mode",
      "Use the company account, which is covered by the organization's commercial terms and controls",
      "Use whichever account has more usage left this week, since both are Claude products and the client will never know the difference"
     ],
     "answer": 2,
     "explain": "Dữ liệu công việc, nhất là thông tin mật của khách hàng, phải đi qua tài khoản công ty được duyệt. Với gói thương mại như Enterprise, Anthropic mặc định không dùng chat để huấn luyện, và tổ chức có các kiểm soát như audit log, thời gian lưu dữ liệu tùy chỉnh. Với gói cá nhân, việc dữ liệu có được dùng để cải thiện model hay không phụ thuộc vào cài đặt của người dùng, nên các gói không xử lý dữ liệu giống nhau. Incognito không biến tài khoản cá nhân thành kênh được duyệt. Chọn theo hạn mức còn lại bỏ qua chính sách và nghĩa vụ bảo mật với khách."
    },
    {
     "q": "Which statement about incognito chats in Claude is accurate?",
     "options": [
      "They are available inside Projects and keep project knowledge private",
      "They use Claude's existing memory to personalize answers",
      "They are not saved to chat history or used for training, but are still retained for a period (30 days by default)",
      "They are deleted the instant the window closes, so any data is safe to share"
     ],
     "answer": 2,
     "explain": "Help center: incognito chat không lưu vào lịch sử, không dùng để huấn luyện, không dùng memory hiện có và không được thêm vào memory, nhưng vẫn được lưu giữ 30 ngày theo mặc định (có thể lâu hơn nếu tổ chức Enterprise đặt thời gian lưu riêng). Vì vậy chúng không bị xóa ngay và không phải lý do để chia sẻ dữ liệu mật. Incognito hiện chỉ có cho chat ngoài Project. Incognito không dùng memory hiện có."
    },
    {
     "q": "A user with memory turned on mentioned a colleague's private family situation in a chat, then deleted that chat. What else should she do to make sure the detail no longer informs future conversations?",
     "options": [
      "Nothing; deleting a chat removes everything derived from it",
      "Start an incognito chat, which erases past memories",
      "Ask Claude in a new chat whether it remembers the detail, and do nothing further if it says it does not",
      "Review her saved memories and delete any entry created from that chat, since deleting a chat doesn't remove its memories"
     ],
     "answer": 3,
     "explain": "Help center: xóa một chat không xóa các mục memory đã tạo từ chat đó; phải vào phần quản lý memory để xem và xóa riêng (hoặc yêu cầu Claude quên). Cho rằng xóa chat là xóa hết là sai. Incognito chỉ không dùng và không thêm memory cho chính cuộc chat đó, không xóa memory cũ. Hỏi Claude có nhớ không rồi thôi không phải là kiểm tra danh sách memory. Bài học lớn hơn: đừng đưa chuyện riêng của người khác vào chat ngay từ đầu."
    },
    {
     "q": "A marketing team in Germany wants Claude to segment a list of EU customers by purchase history, with names and emails included. Nobody on the team is sure what GDPR allows. What should they do FIRST?",
     "options": [
      "Upload the list, since Claude is a widely used tool",
      "Consult the privacy or legal team before uploading, and plan to minimize or pseudonymize personal fields",
      "Upload the list and then ask Claude whether the processing complies with GDPR",
      "Upload the list through a personal account to keep it off company systems"
     ],
     "answer": 1,
     "explain": "Associate không cần thuộc từng điều luật nhưng phải nhận ra dữ liệu cá nhân thuộc diện GDPR và hỏi đội pháp chế hoặc quyền riêng tư trước khi đưa vào công cụ AI, đồng thời bớt hoặc thay mã các trường cá nhân không cần cho việc phân khúc. Công cụ phổ biến không thay được đánh giá pháp lý. Tài khoản cá nhân đưa dữ liệu ra ngoài kiểm soát của tổ chức. Hỏi Claude sau khi đã tải lên là đảo ngược thứ tự: dữ liệu đã được chia sẻ, và Claude không thay được ý kiến pháp lý."
    },
    {
     "q": "Anthropic's Usage Policy permits drafting marketing emails with Claude, and the company's AI policy allows it too. The marketing team's own rule, however, requires a brand manager to approve every AI-assisted email before it is sent. Which rule should a marketer follow?",
     "options": [
      "The team rule, since a more local policy can be stricter than higher-level ones",
      "The company policy, since team-level rules are only suggestions and cannot add new requirements",
      "Whichever rule is fastest for the campaign deadline",
      "The Usage Policy, because Anthropic's rules override any company or team rule whenever they cover the same activity"
     ],
     "answer": 0,
     "explain": "Việc dùng Claude chịu nhiều tầng quy định: luật, Usage Policy, chính sách tổ chức, quy tắc nhóm. Tầng gần bạn hơn có thể khắt khe hơn tầng trên, nhưng không được cho phép điều tầng trên đã cấm. Quy tắc nhóm yêu cầu duyệt thêm là hợp lệ và phải tuân theo. Usage Policy cho phép không có nghĩa là cấm tổ chức đặt thêm yêu cầu. Quy tắc nhóm không phải 'gợi ý'. Chọn theo hạn chót là bỏ qua chính sách."
    },
    {
     "q": "A manager asks a team member to upload unredacted customer support transcripts to Claude to speed up a report, although company policy requires removing customer identifiers first. What should the team member do?",
     "options": [
      "Explain the conflict, propose redacting the transcripts first, and escalate if the manager still insists",
      "Upload them, since the manager is responsible for the decision",
      "Refuse to work on the report at all, without explaining why",
      "Upload them quietly to a personal account instead"
     ],
     "answer": 0,
     "explain": "Khi yêu cầu của cấp trên va với chính sách: nêu rõ xung đột, đề xuất cách làm tuân thủ (ẩn danh trước) và đưa lên đúng cấp nếu cần; không lặng lẽ vi phạm. Làm theo vì 'sếp chịu trách nhiệm' không miễn trách nhiệm cho người thực hiện. Dùng tài khoản cá nhân là đi đường vòng và còn tệ hơn. Từ chối mà không giải thích không giải quyết được nhu cầu và không giúp ai hiểu chính sách."
    },
    {
     "q": "A freelance writer uses Claude to help outline and edit an article for a trade magazine whose submission guidelines require authors to disclose any AI assistance. What is the BEST course of action?",
     "options": [
      "Disclose only if the editor asks about it",
      "Rewrite enough sentences by hand that disclosure is no longer needed, since the magazine cannot detect AI involvement anyway",
      "Disclose the AI assistance as the guidelines require",
      "Skip disclosure, since Claude only helped with outlining and editing"
     ],
     "answer": 2,
     "explain": "Transparency Diligence là trung thực về vai trò của AI với những người cần biết; khi quy định của nơi nhận bài yêu cầu thông báo, phải làm theo. Hướng dẫn yêu cầu thông báo mọi hỗ trợ của AI, nên lập dàn ý và biên tập vẫn tính. Chờ biên tập viên hỏi là không đáp ứng yêu cầu. Viết lại để che giấu là cố tình né minh bạch."
    },
    {
     "q": "A company newsletter included a Claude-drafted paragraph with an incorrect product launch date. The communications specialist who published it says, 'Claude wrote that part.' Who is accountable for the error?",
     "options": [
      "No one, because AI errors are unpredictable and cannot reasonably be prevented by reviewers",
      "The specialist who published it, along with any reviewers in the approval process",
      "Anthropic, because the incorrect date came from text that Claude generated, not from the specialist",
      "The readers, who should have verified the date themselves before relying on the company newsletter"
     ],
     "answer": 1,
     "explain": "Deployment Diligence: người dùng hoặc chia sẻ output chịu trách nhiệm kiểm và bảo đảm cho nó. 'Claude viết vậy' không phải lời bào chữa; trách nhiệm thuộc người đăng và người duyệt trong quy trình. Đổ cho nhà cung cấp hay coi lỗi AI là lỗi của không ai đều sai. Người đọc có quyền tin vào bản tin chính thức của công ty."
    },
    {
     "q": "An events team wants Claude, through a connected email tool, to send personalized invitations to 2,000 external guests automatically, with no one checking the drafts first. What is the MOST responsible design?",
     "options": [
      "Allow fully automatic sending, since invitations are low-stakes",
      "Have Claude send everything and review a few emails afterward",
      "Send them from a personal email account to avoid company controls",
      "Keep a human approval step, such as reviewing a sample and approving sends, since sending is hard to reverse"
     ],
     "answer": 3,
     "explain": "Khi Claude thực hiện hành động (gửi email, chia sẻ file) thay vì chỉ soạn thảo, rủi ro tăng; gửi 2.000 email ra ngoài là hành động khó đảo ngược, nên cần bước phê duyệt của người. Đó cũng là lý do gửi email qua connector Gmail mặc định cần phê duyệt. Cho rằng sửa bằng email sau là được bỏ qua việc lỗi đã tới tay khách. Dùng email cá nhân là né kiểm soát. Kiểm sau khi gửi là quá muộn."
    },
    {
     "q": "A procurement specialist asks Claude, with file creation turned on, to analyze a supplier's spreadsheet. Partway through, Claude starts trying to send data to an unfamiliar external address that appears nowhere in her request. What should she do?",
     "options": [
      "Stop the task, since instructions hidden in external files can manipulate Claude, and report it to security",
      "Rerun the same task with a higher effort setting so that Claude analyzes the supplier's file more carefully this time",
      "Approve the action, since the spreadsheet came from a known supplier",
      "Let it finish, since Claude only ever follows instructions that come directly from the user typing in the chat"
     ],
     "answer": 0,
     "explain": "Help center về tạo và sửa file cảnh báo prompt injection: kẻ xấu có thể giấu chỉ dẫn trong file hoặc trang web bên ngoài, khiến Claude chạy mã không tin cậy hoặc gửi dữ liệu trong context ra bên thứ ba; người dùng nên theo dõi và dừng lại nếu thấy Claude truy cập dữ liệu bất thường. Cho rằng Claude chỉ làm theo người dùng là bỏ qua rủi ro này. Nhà cung cấp quen không bảo đảm file sạch. Chạy lại với effort cao hơn không xử lý được chỉ dẫn độc hại trong file."
    },
    {
     "q": "Before starting, a policy analyst checks which AI tools her organization has approved for confidential work and decides how much information to share with Claude. Which AI Fluency competency does this BEST illustrate?",
     "options": [
      "Process Discernment",
      "Creation Diligence",
      "Deployment Diligence",
      "Transparency Diligence"
     ],
     "answer": 1,
     "explain": "Creation Diligence là cân nhắc dùng hệ thống AI nào và tương tác với nó ra sao, đúng việc chọn công cụ được duyệt và quyết định chia sẻ bao nhiêu thông tin. Deployment Diligence là chịu trách nhiệm kiểm và bảo đảm cho output bạn dùng hoặc chia sẻ. Transparency Diligence là trung thực về vai trò của AI với người cần biết. Process Discernment là đánh giá cách AI đi tới kết quả."
    },
    {
     "q": "An insurance company wants to use Claude to draft recommendations on whether to deny or reduce individual policyholders' claims. Which TWO requirements does Anthropic's Usage Policy place on this use? (Choose TWO.)",
     "options": [
      "Recommendations may be issued without review when Claude reports high confidence",
      "Anthropic must approve each recommendation before it is issued",
      "Policyholders must be clearly told that AI was used to produce the recommendation",
      "A qualified person must meaningfully review each recommendation before it reaches the policyholder or is used in a decision",
      "The disclosure must name Anthropic and the specific Claude model"
     ],
     "answer": [
      2,
      3
     ],
     "explain": "Bảo hiểm (Insurance) là lĩnh vực rủi ro cao trong Usage Policy, với ví dụ quyết định kết quả một yêu cầu bồi thường. Hai yêu cầu chính: người có chuyên môn xem xét thực chất khuyến nghị trước khi tới tay người bị ảnh hưởng hoặc được dùng để ra quyết định, và người bị ảnh hưởng phải được thông báo rõ có dùng AI. Bản hiệu lực từ 12/11/2026 ghi rõ không cần nêu tên Anthropic, Claude hay model (bản 2025 không đòi nêu tên). Đề hỏi về từ chối hoặc giảm bồi thường vì bản 2026 miễn bước duyệt cho quyết định hoàn toàn có lợi như chi trả trọn vẹn. Anthropic không duyệt từng khuyến nghị. Độ tự tin của Claude không thay được người duyệt."
    },
    {
     "q": "Before asking Claude to find themes in 2,000 employee engagement survey comments, which TWO steps BEST reduce privacy risk? (Choose TWO.)",
     "options": [
      "Use an incognito chat so the data is not retained",
      "Remove names, employee IDs, and email addresses from the export",
      "Ask Claude to forget the comments after the analysis",
      "Use a personal account so the data stays off company systems",
      "Remove or generalize details, such as small-team names and exact tenure, that could identify individuals"
     ],
     "answer": [
      1,
      4
     ],
     "explain": "Giảm thiểu dữ liệu: bỏ trường định danh trực tiếp và khái quát hóa chi tiết gián tiếp (tên nhóm nhỏ, thâm niên chính xác) có thể làm lộ người trả lời; phân tích chủ đề không cần các trường này. Yêu cầu Claude 'quên' không bảo vệ dữ liệu đã gửi. Incognito vẫn được lưu giữ 30 ngày theo mặc định. Tài khoản cá nhân đưa dữ liệu nhân sự ra ngoài kiểm soát của tổ chức."
    }
   ]
  },
  {
   "id": "d7",
   "name": "Troubleshooting and Optimization",
   "weight": 10,
   "intro": "<p>Domain này hỏi bạn làm gì khi <strong>kết quả không như mong muốn</strong>: chẩn đoán nguyên nhân nằm ở prompt, knowledge, cuộc trò chuyện, model/cài đặt hay lập luận; chỉnh theo phản hồi của người dùng; và tối ưu cách dùng để bớt tốn hạn mức và thời gian mà chất lượng không giảm.</p><p>Ranh giới: D7 không dạy lại cấu trúc prompt (đó là D1). D7 hỏi kỹ năng <em>đọc triệu chứng → tìm gốc → sửa đúng chỗ</em>. Nhiều câu D7 có phương án \"đổi model mạnh hơn\" làm bẫy khi gốc rễ nằm ở chỗ khác.</p>",
   "lessons": [
    {
     "id": "l-7-0",
     "title": "Nền tảng D7: từ triệu chứng tới nguyên nhân, bản đồ năm chỗ có thể hỏng và vòng chẩn đoán",
     "minutes": 11,
     "html": "<p>Domain 7 hỏi bạn làm gì khi Claude trả về thứ không dùng được, hoặc dùng được nhưng tốn quá nhiều thời gian và hạn mức. Ba bài của domain dùng chung một cách nghĩ: <strong>đọc triệu chứng → đoán nguyên nhân → sửa một chỗ → kiểm lại</strong>. Bài này dựng cách nghĩ đó và bộ từ vựng đi kèm.</p>\n<h4>Triệu chứng không phải nguyên nhân</h4>\n<p><strong>Triệu chứng</strong> là cái bạn thấy: câu trả lời chung chung, sai số liệu, bỏ quên yêu cầu, mỗi lần một kiểu. <strong>Nguyên nhân</strong> là chỗ thật sự hỏng. Một triệu chứng có thể đến từ nhiều nguyên nhân: \"trả lời sai chính sách\" có thể do tài liệu cũ trong knowledge, do tài liệu đúng nhưng prompt không bảo Claude dùng nó, hoặc do Claude đọc đúng mà suy luận sai. Sửa theo triệu chứng (\"dặn Claude trả lời đúng hơn\") hiếm khi hiệu quả; sửa theo nguyên nhân mới bền.</p>\n<p>Khóa AI Capabilities and Limitations đặt mục tiêu tương tự: nhìn một output bất ngờ, nhận ra nó thuộc kiểu bất ngờ nào, rồi đưa ra cách sửa nhắm đúng chỗ.</p>\n<h4>Bản đồ năm chỗ có thể hỏng</h4>\n<p>Khóa Troubleshooting &amp; Optimization trong lộ trình ôn thi chính thức nêu bốn nguyên nhân gốc: under-specification (prompt thiếu), context overload (quá tải context), wrong feature or model (sai tính năng hoặc model) và stale configuration (cấu hình lỗi thời). Bản đồ năm chỗ dưới đây là cách chia của trang này, phủ cả bốn nguyên nhân đó; bài l-7-1 dùng nó. Mỗi chỗ là một thứ bạn chỉnh được:</p>\n<table>\n<thead><tr><th>Chỗ</th><th>Gồm</th><th>Domain dạy cách làm đúng từ đầu</th></tr></thead>\n<tbody>\n<tr><td>Prompt</td><td>Nhiệm vụ, bối cảnh, người đọc, ví dụ, định dạng, tiêu chí</td><td>D1</td></tr>\n<tr><td>Knowledge / nguồn</td><td>File, project knowledge, connector, web search</td><td>D5</td></tr>\n<tr><td>Cuộc trò chuyện</td><td>Độ dài chat, hiểu nhầm cũ còn nằm trong context</td><td>D3 (context)</td></tr>\n<tr><td>Model / cài đặt</td><td>Tầng model, effort, công cụ đang bật hay tắt</td><td>D3</td></tr>\n<tr><td>Lập luận</td><td>Dữ kiện đúng nhưng kết luận sai, bỏ điều kiện, nhảy bước</td><td>D2 (đánh giá), D1 (chia bước)</td></tr>\n</tbody>\n</table>\n<p>D7 không dạy lại cách viết prompt hay cấu hình Project; nó dạy chọn đúng chỗ trong bảng này để sửa.</p>\n<h4>Vòng chẩn đoán</h4>\n<ol>\n<li><strong>Ghi lại triệu chứng cụ thể</strong>: output nào, sai ở đâu, so với tiêu chí nào.</li>\n<li><strong>Đặt giả thuyết</strong>: chỗ nào trong năm chỗ có khả năng gây ra nhất.</li>\n<li><strong>Đổi một biến</strong>: chỉ sửa một thứ (một câu prompt, một tài liệu, mức effort).</li>\n<li><strong>Chạy lại với cùng đầu vào</strong> và so với lần trước.</li>\n<li><strong>Lưu cách sửa đã xác nhận</strong> vào nơi bền (instructions, knowledge, mẫu prompt) để lỗi không quay lại.</li>\n</ol>\n<h4>Từ vựng của domain</h4>\n<ul>\n<li><strong>Biến (variable)</strong>: một thứ bạn thay đổi giữa hai lần chạy. Đổi nhiều biến cùng lúc thì không biết biến nào có tác dụng.</li>\n<li><strong>Cùng đầu vào</strong>: chạy lại đúng câu hỏi, đúng tài liệu, để so công bằng.</li>\n<li><strong>Bộ câu thử</strong>: vài đầu vào thật, kể cả ca khó, dùng lại mỗi khi sửa để chắc cách sửa không làm hỏng chỗ khác.</li>\n<li><strong>Phản hồi</strong>: ý kiến của người dùng về output; là dữ liệu chẩn đoán, chưa phải đơn thuốc (l-7-2).</li>\n<li><strong>Usage limit và length limit</strong>: help center phân biệt giới hạn lượng dùng trong một khoảng thời gian với giới hạn độ dài của một cuộc chat (gắn với context window). Tối ưu ở l-7-3 nhắm vào cả hai.</li>\n</ul>\n<h4>Thứ tự kiểm: rẻ trước, đắt sau</h4>\n<p>Đọc lại prompt tốn vài phút; đổi sang model nặng hơn thì tốn hạn mức ở mọi lần chạy về sau. Vì vậy bài l-7-1 đề xuất kiểm theo chi phí tăng dần: prompt → nguồn → cuộc trò chuyện → công cụ và cài đặt → effort hoặc model. Docs chọn model của Anthropic cũng nhận xét chỉnh effort thường là đòn bẩy tốt hơn đổi model.</p>\n<h4>Ví dụ ngắn</h4>\n<p>Bản tóm tắt cuộc họp tuần nào cũng thiếu phần \"việc cần làm\". Triệu chứng: thiếu một mục. Giả thuyết: prompt không yêu cầu mục này. Đổi một biến: thêm \"kết thúc bằng bảng việc cần làm, người phụ trách, hạn\". Chạy lại với biên bản tuần trước: đủ mục. Lưu: đưa câu đó vào project instructions của Project biên bản họp.</p>\n<h4>Bài nào trong Domain 7 đụng vào phần nào</h4>\n<table>\n<thead><tr><th>Bài</th><th>Nội dung chính</th><th>Bước trong vòng</th></tr></thead>\n<tbody>\n<tr><td>l-7-0 (bài này)</td><td>Triệu chứng và nguyên nhân, bản đồ năm chỗ, vòng chẩn đoán, từ vựng</td><td>Toàn cảnh</td></tr>\n<tr><td>l-7-1 Chẩn đoán output kém</td><td>Bảng triệu chứng theo từng chỗ hỏng, thứ tự kiểm, phân biệt lỗi nguồn và lỗi lập luận</td><td>Bước 1–4</td></tr>\n<tr><td>l-7-2 Điều chỉnh theo phản hồi</td><td>Phản hồi là triệu chứng, ý kiến trái chiều, chọn chỗ sửa, lưu cách sửa lâu dài</td><td>Bước 1, 5</td></tr>\n<tr><td>l-7-3 Tối ưu usage và hiệu quả</td><td>Cơ chế hạn mức, thứ tiêu tốn hạn mức, thói quen tiết kiệm mà không giảm chất lượng</td><td>Áp vòng chẩn đoán cho chi phí</td></tr>\n</tbody>\n</table>\n<div class=\"tip\">Trong câu hỏi D7, tìm chi tiết lộ nguyên nhân: \"tài liệu đã cập nhật tuần trước\" (nguồn), \"chat đã kéo dài cả buổi\" (cuộc trò chuyện), \"prompt chỉ có một dòng\" (prompt), \"web search đang tắt\" (cài đặt). Đáp án sửa đúng chỗ đó.</div>\n<div class=\"warn\">\"Đổi sang model mạnh hơn\" là phương án bẫy phổ biến nhất của D7. Model mạnh hơn không sửa được tài liệu cũ, prompt mơ hồ hay một cuộc chat đã quá dài.</div>",
     "keypoints": [
      "Triệu chứng là cái thấy được; nguyên nhân là chỗ hỏng thật. Sửa theo nguyên nhân mới bền.",
      "Năm chỗ có thể hỏng: prompt, knowledge/nguồn, cuộc trò chuyện, model/cài đặt, lập luận.",
      "Vòng chẩn đoán: ghi triệu chứng → giả thuyết → đổi một biến → chạy lại cùng đầu vào → lưu cách sửa đã xác nhận.",
      "Kiểm theo chi phí tăng dần; chỉnh effort thường là đòn bẩy tốt hơn đổi model.",
      "Usage limit (lượng dùng theo thời gian) khác length limit (độ dài một chat)."
     ],
     "sources": [
      {
       "t": "Troubleshooting & Optimization (CCAO-F prep course)",
       "u": "https://anthropic-partners.skilljar.com/path/claude-certified-associate-foundations/troubleshooting-optimization"
      },
      {
       "t": "AI Capabilities and Limitations",
       "u": "https://anthropic.skilljar.com/ai-capabilities-and-limitations"
      },
      {
       "t": "Choosing a model",
       "u": "https://platform.claude.com/docs/en/about-claude/models/choosing-a-model"
      },
      {
       "t": "How do usage and length limits work?",
       "u": "https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work"
      },
      {
       "t": "Reduce hallucinations",
       "u": "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations"
      }
     ]
    },
    {
     "id": "l-7-1",
     "title": "Chẩn đoán output kém: năm chỗ có thể hỏng",
     "minutes": 12,
     "html": "<p>Khi output kém, phản xạ tự nhiên là \"hỏi lại\" hoặc \"đổi model\". Cả hai có thể đúng, nhưng thường không phải bước đầu tiên. Chẩn đoán trước giúp bạn sửa đúng chỗ, tốn ít công nhất.</p>\n<h4>Năm chỗ có thể hỏng</h4>\n<table>\n<thead><tr><th>Chỗ hỏng</th><th>Triệu chứng điển hình</th><th>Cách sửa</th></tr></thead>\n<tbody>\n<tr><td><strong>Prompt</strong></td><td>Output chung chung, sai người đọc, sai định dạng, làm thiếu phần</td><td>Thêm bối cảnh, người đọc, ví dụ, định dạng, tiêu chí; gỡ chỉ dẫn mâu thuẫn</td></tr>\n<tr><td><strong>Knowledge / nguồn</strong></td><td>Thông tin cũ, sai so với tài liệu hiện hành, \"không tìm thấy\" dù tài liệu có tồn tại, câu trả lời lúc thế này lúc thế khác theo phiên bản tài liệu</td><td>Cập nhật hoặc gỡ tài liệu cũ/trùng; đặt tên file rõ; kiểm tài liệu có thật sự nằm trong Project/chat không; kiểm quyền connector</td></tr>\n<tr><td><strong>Cuộc trò chuyện</strong></td><td>Chat rất dài, Claude quên ràng buộc đặt từ đầu, một hiểu nhầm cũ cứ lặp lại</td><td>Tóm tắt những gì đã chốt, mở chat mới; sửa prompt gốc thay vì chồng phản hồi</td></tr>\n<tr><td><strong>Model / cài đặt</strong></td><td>Prompt và nguồn đều tốt nhưng lập luận vẫn nông ở việc phức tạp; web search hoặc connector đang tắt nên không lấy được dữ liệu mới</td><td>Tăng effort hoặc lên tầng model cao hơn; bật đúng công cụ cần thiết</td></tr>\n<tr><td><strong>Lập luận</strong></td><td>Dữ kiện đúng nhưng kết luận sai; bỏ qua một điều kiện; nhảy bước</td><td>Yêu cầu trình bày lập luận hoặc xem phần tóm tắt suy nghĩ; chỉ ra bước sai; chia việc thành bước nhỏ có điểm kiểm</td></tr>\n</tbody>\n</table>\n<h4>Kiểm theo chi phí tăng dần</h4>\n<ol>\n<li>Đọc lại prompt: có thiếu bối cảnh, có mâu thuẫn không? (rẻ nhất)</li>\n<li>Kiểm nguồn: Claude có đúng tài liệu, đúng phiên bản không?</li>\n<li>Kiểm cuộc trò chuyện: có quá dài, có hiểu nhầm cũ không?</li>\n<li>Kiểm cài đặt và công cụ: web search, connector có bật không?</li>\n<li>Cuối cùng mới đổi effort hoặc model (tốn hạn mức và thời gian hơn).</li>\n</ol>\n<h4>Phân biệt lỗi nguồn và lỗi lập luận</h4>\n<p>Một mẹo hữu ích: yêu cầu Claude <strong>trích nguyên văn đoạn nguồn</strong> mà nó dựa vào. Nếu đoạn trích là tài liệu cũ → lỗi knowledge. Nếu không có đoạn trích nào → Claude đang dựa vào kiến thức chung hoặc bịa (thiếu nguồn, hoặc prompt chưa giới hạn nguồn). Nếu đoạn trích đúng mà kết luận sai → lỗi lập luận.</p>\n<h4>Mỗi lần thử chỉ thay đổi một biến</h4>\n<p>Khi đã có giả thuyết, chỉ đổi <strong>một</strong> thứ và chạy lại với <strong>cùng đầu vào</strong>. Đổi cả prompt, model và tài liệu cùng lúc thì dù kết quả tốt lên, bạn không biết điều gì có tác dụng, và lần sau gặp lại vẫn không biết sửa thế nào. Tăng effort cũng là một biến; hãy đo tác động của nó như mọi thay đổi khác.</p>\n<h4>Ví dụ</h4>\n<p>Trợ lý nội bộ trong Project trả lời sai số ngày phép năm. Kiểm prompt: instructions ổn. Kiểm nguồn: yêu cầu Claude trích đoạn chính sách đã dùng → đoạn trích lấy từ sổ tay năm ngoái, vẫn còn trong knowledge cạnh bản mới. Sửa: gỡ bản cũ. Chạy lại cùng câu hỏi → đúng. Không cần đổi model.</p>\n<div class=\"tip\">Khi phương án \"dùng model mạnh hơn\" xuất hiện cạnh một phương án sửa prompt hoặc sửa knowledge, hãy đọc kỹ triệu chứng. Nếu triệu chứng là thông tin cũ, thiếu bối cảnh, hoặc chat quá dài, model mạnh hơn không giải quyết được.</div>\n<div class=\"warn\">Sửa nhiều thứ cùng lúc là cách nhanh nhất để \"may mắn sửa được\" mà không học được gì, và cũng là cách nhanh nhất để vô tình làm hỏng thứ đang chạy tốt.</div>",
     "keypoints": [
      "Năm chỗ có thể hỏng: prompt, knowledge/nguồn, cuộc trò chuyện, model/cài đặt, lập luận.",
      "Kiểm theo chi phí tăng dần: prompt → nguồn → cuộc trò chuyện → công cụ/cài đặt → effort/model.",
      "Yêu cầu trích nguồn để phân biệt lỗi knowledge (trích tài liệu cũ), thiếu nguồn (không trích được) và lỗi lập luận (trích đúng, kết luận sai).",
      "Đổi một thứ, chạy lại cùng đầu vào; tăng effort cũng là một biến cần đo.",
      "Đổi model không sửa được thông tin cũ, prompt mơ hồ hay chat quá dài."
     ],
     "sources": [
      {
       "t": "Reduce hallucinations",
       "u": "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations"
      },
      {
       "t": "RAG for projects",
       "u": "https://support.claude.com/en/articles/11473015-retrieval-augmented-generation-rag-for-projects"
      },
      {
       "t": "Change the model, effort, and thinking settings",
       "u": "https://support.claude.com/en/articles/8664678-change-the-model-effort-and-thinking-settings"
      }
     ]
    },
    {
     "id": "l-7-2",
     "title": "Điều chỉnh theo phản hồi và lưu cách sửa lâu dài",
     "minutes": 10,
     "html": "<p>Khi người dùng một Project, một mẫu prompt hay một quy trình có Claude phàn nàn, phản hồi của họ là dữ liệu chẩn đoán quý, nhưng hiếm khi là chỉ dẫn sửa chính xác.</p>\n<h4>Phản hồi là triệu chứng, chưa phải đơn thuốc</h4>\n<p>\"Câu trả lời dài quá\" có thể là: định dạng mặc định chưa được nêu (prompt), người dùng này cần bản ngắn còn người khác cần bản đầy đủ (người đọc chưa được xác định), hoặc Claude đang chép lại cả đoạn tài liệu vì knowledge lộn xộn. Làm theo nguyên văn (\"thêm câu 'trả lời ngắn'\") có thể làm hỏng trải nghiệm của nhóm người dùng khác. Hãy hỏi thêm: ví dụ cụ thể là gì, họ dùng output vào việc gì, \"đúng\" trông như thế nào.</p>\n<h4>Khi người dùng muốn những thứ ngược nhau</h4>\n<p>Một người muốn ngắn, người khác muốn chi tiết; một người muốn trang trọng, người khác muốn thân thiện. Đừng lắc qua lắc lại cấu hình theo người phàn nàn gần nhất. Chốt với người phụ trách thế nào là “đạt” (hoặc tách thành hai chế độ rõ ràng, ví dụ \"bản tóm tắt\" và \"bản đầy đủ\" theo yêu cầu), rồi mới sửa.</p>\n<h4>Sửa ở đâu: dựa vào bằng chứng</h4>\n<table>\n<thead><tr><th>Bằng chứng</th><th>Chỗ sửa phù hợp</th></tr></thead>\n<tbody>\n<tr><td>Nhiều người cùng gặp một lỗi định dạng/giọng</td><td>Project instructions</td></tr>\n<tr><td>Thông tin sai, cũ, thiếu</td><td>Knowledge (cập nhật, gỡ, bổ sung)</td></tr>\n<tr><td>Chỉ một người, một lần, một yêu cầu đặc biệt</td><td>Tin nhắn trong chat đó; không đổi cấu hình chung</td></tr>\n<tr><td>Việc phức tạp bị làm nông dù nguồn và prompt tốt</td><td>Effort hoặc tầng model</td></tr>\n<tr><td>Một quy trình chuyên biệt lặp lại ở nhiều nơi</td><td>Đóng gói thành mẫu dùng chung hoặc Skill</td></tr>\n</tbody>\n</table>\n<h4>Phản hồi trong lúc chat: cụ thể và có định hướng</h4>\n<p>Trong một cuộc chat, \"sai rồi, làm lại\" cho Claude rất ít thông tin. Tốt hơn: \"Bảng doanh thu dùng số của quý 2 thay vì quý 3; hãy dùng cột Q3 trong file đính kèm và giữ nguyên phần còn lại.\" Bạn chỉ ra chỗ sai, nguyên nhân bạn nghĩ tới, và phạm vi cần sửa.</p>\n<h4>Kiểm chứng rồi mới lưu cố định</h4>\n<p>Khi một cách sửa có vẻ hiệu quả trong một chat, hãy kiểm nó trên vài trường hợp khác. Chỉ khi đã xác nhận, mới đưa nó vào nơi bền vững:</p>\n<ul>\n<li>Project instructions, nếu áp dụng cho mọi chat trong Project.</li>\n<li>Instructions for Claude, nếu là sở thích cá nhân của bạn cho mọi cuộc chat.</li>\n<li>Knowledge, nếu là thông tin.</li>\n<li>Mẫu prompt dùng chung hoặc Skill, nếu là một quy trình chuyên biệt.</li>\n</ul>\n<p>Nếu không, cùng một lỗi sẽ quay lại ở chat sau, và người khác trong nhóm sẽ gặp lại nó.</p>\n<div class=\"tip\">Câu hỏi \"người dùng phải nhắc lại cùng một yêu cầu trong mọi chat\" → đáp án là đưa yêu cầu đó vào project instructions (hoặc Instructions for Claude nếu là sở thích cá nhân), không phải \"nhắc lại mỗi lần\" hay \"đổi model\".</div>\n<div class=\"warn\">Đừng đưa một yêu cầu một lần của một người vào cấu hình dùng chung. Cấu hình chung chỉ chứa những gì đúng cho mọi người dùng.</div>",
     "keypoints": [
      "Phản hồi là dữ liệu chẩn đoán, không phải chỉ dẫn sửa nguyên văn; hỏi ví dụ và mục đích.",
      "Ý kiến ngược nhau: chốt định nghĩa “đạt” với người phụ trách trước, hoặc tách thành chế độ rõ ràng.",
      "Chọn chỗ sửa theo bằng chứng: lỗi chung → instructions; thông tin → knowledge; một lần → tin nhắn; việc khó → effort/model.",
      "Sửa giữa chừng: chỉ rõ chỗ sai, nguyên nhân, phạm vi sửa.",
      "Xác nhận cách sửa trên nhiều trường hợp rồi mới đưa vào instructions, knowledge, mẫu hoặc Skill."
     ],
     "sources": [
      {
       "t": "Understanding Claude's personalization features",
       "u": "https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features"
      },
      {
       "t": "What are skills?",
       "u": "https://support.claude.com/en/articles/12512176-what-are-skills"
      },
      {
       "t": "Prompting best practices",
       "u": "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices"
      }
     ]
    },
    {
     "id": "l-7-3",
     "title": "Tối ưu usage và hiệu quả mà không giảm chất lượng",
     "minutes": 10,
     "html": "<h4>Cơ chế hạn mức</h4>\n<p>Theo help center, gói trả phí có giới hạn theo phiên, đặt lại sau mỗi 5 giờ (tính từ tin nhắn đầu tiên), cộng thêm giới hạn theo tuần. Giới hạn tuần áp dụng cho mọi model (một số gói có thêm giới hạn tuần riêng cho Fable), và claude.ai, Claude Code, Claude Desktop dùng chung hạn mức. Ngoại lệ help center nêu: tài khoản Ultra đã xác minh không có giới hạn 5 giờ, và Enterprise tính phí theo mức dùng thì không có hạn mức theo gói. Bạn xem mức đã dùng trong phần Usage của Settings. Khi chạm giới hạn, có thể chờ đặt lại, nâng gói, hoặc dùng usage credits trên gói trả phí.</p>\n<h4>Những gì tiêu tốn hạn mức</h4>\n<p>Help center liệt kê: độ dài tin nhắn, kích thước file đính kèm, độ dài cuộc trò chuyện, công cụ (Research, web search), lựa chọn model, mức effort, tạo artifact, và các việc nhiều bước (chạy code, xử lý file, duyệt web).</p>\n<h4>Tiết kiệm mà vẫn giữ chất lượng</h4>\n<table>\n<thead><tr><th>Thói quen</th><th>Vì sao hiệu quả</th></tr></thead>\n<tbody>\n<tr><td>Dùng Project cho tài liệu dùng lại</td><td>Help center nói nội dung Project được lưu đệm (cache) và tính ít hơn khi dùng lại</td></tr>\n<tr><td>Project instructions ngắn gọn; gỡ file không dùng</td><td>Mọi thứ trong context đều được xử lý ở mỗi lượt</td></tr>\n<tr><td>Tắt connector và web search khi không cần</td><td>Công cụ và connector tốn nhiều token</td></tr>\n<tr><td>Chọn đúng tầng model và effort</td><td>Tầng nặng, effort cao cho việc đơn giản chỉ tốn thêm, không tốt hơn</td></tr>\n<tr><td>Viết prompt rõ ngay từ đầu</td><td>Ít lượt hỏi lại, ít lượt sửa</td></tr>\n<tr><td>Gộp các yêu cầu liên quan vào một tin nhắn</td><td>Tránh nhiều lượt nhỏ mỗi lượt đều phải xử lý lại lịch sử</td></tr>\n<tr><td>Mở chat mới khi đổi chủ đề</td><td>Chat dài thì mỗi lượt đắt hơn</td></tr>\n<tr><td>Lên kế hoạch trước việc lớn</td><td>Tránh làm đi làm lại do đổi hướng giữa chừng</td></tr>\n</tbody>\n</table>\n<h4>Cache của Project không giữ mãi</h4>\n<p>Help center ghi chú: cache của Project hết hạn sau một thời gian không hoạt động, nên tin nhắn đầu tiên sau một quãng nghỉ dài sẽ tính đầy đủ nội dung Project. Đây là chi tiết nhỏ nhưng giải thích vì sao \"lần đầu mở lại Project thấy tốn hơn\".</p>\n<h4>Tối ưu thời gian, không chỉ hạn mức</h4>\n<ul>\n<li><strong>Mẫu prompt</strong> cho việc lặp lại: viết một lần, thử kỹ, dùng chung.</li>\n<li><strong>Tách lô việc theo độ khó</strong>: phần đơn giản cho tầng nhanh, phần khó cho tầng mạnh.</li>\n<li><strong>Đúng tính năng</strong>: Research cho câu hỏi rộng, không cho câu tra cứu; chat thường cho việc một lần.</li>\n<li><strong>Đo trước và sau</strong>: khi tối ưu, giữ một bộ đầu vào thử để chắc chất lượng không tụt.</li>\n</ul>\n<div class=\"tip\">Câu hỏi tối ưu thường có một phương án \"tiết kiệm\" nhưng hại chất lượng (bỏ hết bối cảnh, luôn dùng tầng nhẹ nhất cho mọi việc). Đáp án tốt giảm lãng phí (tool không dùng, chat dài, file thừa, model quá nặng cho việc nhẹ) mà vẫn giữ những gì output cần.</div>\n<div class=\"warn\">Đừng tối ưu bằng cách cắt bỏ bối cảnh cần thiết. Một prompt ngắn hơn nhưng phải sửa ba lượt tốn hơn một prompt đầy đủ làm đúng ngay lần đầu.</div>",
     "keypoints": [
      "Gói trả phí: giới hạn phiên đặt lại mỗi 5 giờ + giới hạn tuần; claude.ai, Claude Code, Desktop dùng chung hạn mức.",
      "Hao hạn mức: tin nhắn và file lớn, chat dài, công cụ (Research, web search), model nặng, effort cao, artifact, việc nhiều bước.",
      "Giảm: dùng Project (có cache), instructions gọn, gỡ file thừa, tắt connector/web search không dùng, đúng model/effort, gộp yêu cầu, chat mới khi đổi chủ đề.",
      "Cache Project hết hạn sau thời gian không hoạt động.",
      "Tối ưu không được cắt bối cảnh cần thiết; đo chất lượng trước và sau."
     ],
     "sources": [
      {
       "t": "How do usage and length limits work?",
       "u": "https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work"
      },
      {
       "t": "Usage limit best practices",
       "u": "https://support.claude.com/en/articles/9797557-usage-limit-best-practices"
      },
      {
       "t": "How large is the context window on paid Claude plans?",
       "u": "https://support.claude.com/en/articles/8606394-how-large-is-the-context-window-on-paid-claude-plans"
      }
     ]
    }
   ],
   "cheat": [
    [
     "Năm chỗ hỏng",
     "Prompt, knowledge/nguồn, cuộc trò chuyện, model/cài đặt, lập luận"
    ],
    [
     "Thứ tự kiểm",
     "Chi phí tăng dần: prompt → nguồn → chat → công cụ/cài đặt → effort/model"
    ],
    [
     "Thông tin cũ / không nhất quán theo phiên bản",
     "Lỗi knowledge: gỡ tài liệu cũ/trùng, không phải đổi model"
    ],
    [
     "Quên ràng buộc đầu chat",
     "Lỗi cuộc trò chuyện: tóm tắt đã chốt, mở chat mới"
    ],
    [
     "Trích đúng nguồn mà kết luận sai",
     "Lỗi lập luận: xem lập luận, chỉ ra bước sai, chia bước"
    ],
    [
     "Vòng chẩn đoán",
     "Đổi MỘT thứ, chạy lại CÙNG đầu vào"
    ],
    [
     "Phản hồi người dùng",
     "Dữ liệu chẩn đoán; hỏi ví dụ và mục đích; ý kiến ngược nhau → chốt định nghĩa “đạt” trước"
    ],
    [
     "Lưu cách sửa lâu dài",
     "Xác nhận rồi đưa vào instructions / knowledge / mẫu prompt / Skill"
    ],
    [
     "Hạn mức",
     "Phiên 5 giờ + tuần; các app Claude dùng chung; xem trong Settings > Usage"
    ],
    [
     "Hao hạn mức",
     "Chat dài, file lớn, Research/web search, model nặng, effort cao, artifact, việc nhiều bước"
    ],
    [
     "Tiết kiệm đúng cách",
     "Project (cache), instructions gọn, tắt tool thừa, đúng model/effort, gộp yêu cầu, chat mới khi đổi chủ đề"
    ],
    [
     "Triệu chứng vs nguyên nhân",
     "Sửa theo nguyên nhân (một trong năm chỗ), không dặn thêm theo triệu chứng"
    ],
    [
     "Vòng chẩn đoán",
     "Ghi triệu chứng → giả thuyết → đổi một biến → chạy lại cùng đầu vào → lưu cách sửa"
    ]
   ],
   "quiz": [
    {
     "q": "An internal HR assistant Project keeps telling employees they get 15 days of annual leave, but the current policy says 18. The project instructions look fine. What should the Project owner check FIRST?",
     "options": [
      "Whether an outdated version of the leave policy is still in project knowledge, by asking Claude to quote the passage it used",
      "Whether switching to Opus fixes the answer",
      "Whether employees are phrasing their questions politely",
      "Whether the effort setting is at maximum"
     ],
     "answer": 0,
     "explain": "Thông tin cũ là triệu chứng điển hình của lỗi knowledge. Yêu cầu Claude trích đoạn nguồn đã dùng cho biết ngay nó đang đọc tài liệu nào; nếu là bản cũ thì gỡ đi. Đổi model hay tăng effort không sửa được tài liệu cũ trong knowledge. Cách đặt câu hỏi lịch sự không liên quan."
    },
    {
     "q": "A user changed his prompt wording, switched from Sonnet to Opus, and replaced two knowledge files all at once. The output improved. What is the MAIN problem with this approach?",
     "options": [
      "Opus should never be used for troubleshooting, because higher-tier models hide the real cause of poor output from the user",
      "Knowledge files should never be replaced",
      "He cannot tell which change caused the improvement, so he cannot reliably reproduce or apply the fix elsewhere",
      "Changing the prompt wording always makes outputs worse"
     ],
     "answer": 2,
     "explain": "Đổi nhiều thứ cùng lúc thì không biết thay đổi nào có tác dụng, nên không tái lập được cách sửa và có thể tốn hạn mức vô ích (ví dụ dùng Opus khi không cần). Quy tắc là đổi một thứ, chạy lại cùng đầu vào. Các phương án còn lại là khẳng định tuyệt đối sai: Opus, thay file, đổi prompt đều có thể là cách sửa hợp lý."
    },
    {
     "q": "Users of a shared sales Project complain that drafts are 'too long.' Some reps, however, rely on the detailed version for complex deals. What is the BEST next step for the Project owner?",
     "options": [
      "Immediately add 'Keep all answers under 100 words' to the project instructions, since several users have raised the same complaint",
      "Agree with the team lead on what 'good' looks like per use case, then define when to give a short summary versus a detailed draft",
      "Ignore the feedback because some users like the long version",
      "Switch the Project to Haiku so answers are shorter"
     ],
     "answer": 1,
     "explain": "Phản hồi trái chiều → chốt định nghĩa “đạt” với người phụ trách trước, rồi viết rõ trong instructions khi nào dùng bản ngắn, khi nào dùng bản đầy đủ. Làm theo nguyên văn người phàn nàn sẽ làm hỏng trải nghiệm của người cần bản chi tiết. Bỏ qua phản hồi bỏ mất dữ liệu chẩn đoán. Đổi model để câu trả lời ngắn hơn là sửa sai chỗ."
    },
    {
     "q": "A project manager has been working in one chat for several days. Claude now ignores formatting rules she set at the start and sometimes refers to a plan that was later abandoned. Her prompt and files have not changed. What is the MOST likely cause and fix?",
     "options": [
      "The model was downgraded; contact support",
      "The knowledge files have become corrupted over the past few days; delete every file, re-upload fresh copies, and repeat the formatting rules in the chat",
      "The formatting rules are too strict; remove them",
      "The chat has grown long and carries stale context; summarize current decisions, continue in a new chat, and put lasting rules in project instructions"
     ],
     "answer": 3,
     "explain": "Prompt và file không đổi, triệu chứng là quên ràng buộc đầu chat và nhắc kế hoạch đã bỏ → lỗi cuộc trò chuyện: chat quá dài mang theo context cũ. Tóm tắt rồi mở chat mới, và đưa quy tắc định dạng lâu dài vào project instructions để không phải nhắc lại. Không có dấu hiệu nào cho thấy model bị hạ hay file hỏng. Bỏ quy tắc không phải cách sửa."
    },
    {
     "q": "A team is running low on its Claude usage limits each week. Which TWO changes would MOST reduce usage without hurting output quality? (Choose TWO.)",
     "options": [
      "Turn off connectors and web search in chats that do not need them",
      "Remove all context from prompts so messages are as short as possible",
      "Use the most capable model with maximum effort for every task to avoid retries",
      "Split each request into many tiny follow-up messages",
      "Keep reused reference documents in a Project and start new chats when switching topics instead of extending one very long chat"
     ],
     "answer": [
      0,
      4
     ],
     "explain": "Công cụ và connector tốn nhiều token nên tắt khi không cần; nội dung Project được cache và tính ít hơn khi dùng lại, còn chat quá dài làm mỗi lượt đắt hơn. Bỏ hết bối cảnh làm output kém và phải sửa nhiều lượt. Model nặng nhất với effort tối đa cho mọi việc tiêu hạn mức nhanh hơn. Chia thành nhiều tin nhắn nhỏ làm tăng số lượt, mỗi lượt lại xử lý lịch sử."
    },
    {
     "q": "An analyst notices she types the same instruction, 'Use British spelling and cite page numbers,' at the start of nearly every chat in her research Project. The instruction works when she includes it. What is the BEST way to optimize this?",
     "options": [
      "Keep typing it, since it works",
      "Add the instruction to the project instructions so it applies to every chat in the Project",
      "Upload a file named 'rules.txt' to project knowledge",
      "Switch to a model that defaults to British spelling"
     ],
     "answer": 1,
     "explain": "Cách sửa đã được xác nhận và áp dụng cho mọi chat trong Project → đưa vào project instructions để nó bền và không phải nhắc lại. Gõ lại mỗi lần tốn công và dễ quên. Một file trong knowledge là tài liệu tham khảo, không chắc được áp dụng như chỉ dẫn. Không có model nào 'mặc định chính tả Anh'; đây là việc của chỉ dẫn."
    }
   ],
   "bank": [
    {
     "q": "Asked whether a contractor qualifies for expedited payment, Claude quotes the correct policy passage, which requires both a signed timesheet and manager approval, but concludes 'yes' even though the contractor lacks manager approval. Where is the problem?",
     "options": [
      "In the model tier: only Opus can quote policy passages correctly",
      "In the conversation: the chat has grown too long",
      "In the reasoning: the source is right but Claude skipped a condition",
      "In the knowledge base: the policy file must be outdated"
     ],
     "answer": 2,
     "explain": "Đoạn trích đúng nguồn mà kết luận sai là dấu hiệu lỗi lập luận: Claude bỏ qua điều kiện thứ hai. Cách sửa là yêu cầu trình bày lập luận, chỉ ra bước sai, hoặc tách thành bước kiểm từng điều kiện. Không phải lỗi knowledge vì đoạn trích là chính sách đúng. Không có dấu hiệu chat quá dài. Model nào cũng trích được đoạn văn; vấn đề không nằm ở tầng model."
    },
    {
     "q": "Using the Google Drive connector, a project coordinator asks Claude to summarize the 'Q3 Vendor Review' document. Claude says it cannot find it, but a colleague can open it in Drive. What should the coordinator check FIRST?",
     "options": [
      "Whether raising the effort setting expands Claude's Drive access",
      "Whether switching to Opus lets Claude see more of the company's files",
      "Whether Claude's training data includes the document",
      "Whether her own Drive account has access to that document"
     ],
     "answer": 3,
     "explain": "Connector kế thừa quyền của chính người dùng trong dịch vụ được kết nối: Claude chỉ thấy những gì tài khoản Drive của cô được phép xem. Đồng nghiệp mở được không có nghĩa là cô có quyền. Model và effort không mở rộng quyền truy cập. Tài liệu nội bộ không nằm trong dữ liệu huấn luyện; Claude lấy nó qua connector khi được yêu cầu."
    },
    {
     "q": "A communications manager asks Claude about an industry announcement made two days ago. Claude answers from older information and never mentions the announcement. Her prompt is clear. What should she check FIRST?",
     "options": [
      "Whether the prompt should be rewritten in a more formal tone",
      "Whether a more capable model already knows about the announcement",
      "Whether web search is available and turned on for this chat",
      "Whether the effort setting is at maximum, since higher effort gives Claude access to more recent information"
     ],
     "answer": 2,
     "explain": "Thông tin mới hơn dữ liệu huấn luyện chỉ có được qua công cụ như web search; kiểm cài đặt công cụ trước khi đổi model hay effort. Model mạnh hơn vẫn có mốc giới hạn kiến thức, không biết sự kiện hai ngày trước nếu không tìm kiếm. Giọng trang trọng không liên quan. Effort quyết định mức suy nghĩ, không cho Claude truy cập thông tin mới."
    },
    {
     "q": "A Project's answers to sales reps have become generic and miss the product details they need. Following a cost-ordered diagnostic approach, what should the Project owner examine FIRST?",
     "options": [
      "Whether moving every rep to the heaviest model fixes it",
      "The project instructions and the prompts reps use, looking for missing context or conflicts",
      "Whether setting effort to maximum improves the answers",
      "Whether the organization should buy a different AI tool for the sales team, since the current one seems unable to produce specific answers"
     ],
     "answer": 1,
     "explain": "Kiểm theo chi phí tăng dần: prompt và instructions trước (rẻ nhất), rồi nguồn, cuộc trò chuyện, công cụ và cài đặt, cuối cùng mới tới effort hoặc model. Output chung chung là triệu chứng điển hình của prompt thiếu bối cảnh. Đổi model hay tăng effort tốn hạn mức mà không sửa được việc thiếu bối cảnh. Đổi hẳn công cụ là bước xa nhất khi chưa chẩn đoán gì."
    },
    {
     "q": "Several users of a shared HR Project say the answers 'feel off.' The Project owner wants to fix the configuration. What should she do FIRST?",
     "options": [
      "Ask for specific examples and what users were trying to do, to understand what 'off' means",
      "Rewrite the whole instruction set in a friendlier voice right away, since 'feel off' most likely means the tone is too formal",
      "Switch the Project to a different model",
      "Delete the Project's knowledge files and re-upload them"
     ],
     "answer": 0,
     "explain": "Phản hồi là triệu chứng, chưa phải đơn thuốc: 'cảm giác không ổn' có thể là giọng, độ dài, thông tin sai hay định dạng. Cần ví dụ cụ thể và mục đích sử dụng trước khi sửa. Đoán là do giọng quá trang trọng rồi viết lại ngay có thể sửa sai chỗ. Đổi model hay tải lại knowledge khi chưa biết vấn đề là thay đổi mù quáng."
    },
    {
     "q": "One member of a shared team Project wants a playful, pirate-themed tone for a single party invitation. What is the BEST way to handle this request?",
     "options": [
      "Add a pirate-tone rule to the project knowledge so future users can find it, along with a note explaining when that tone is appropriate",
      "Create a new shared Project just for this invitation",
      "Add 'Use a pirate-themed tone' to the project instructions so the request is never forgotten",
      "Ask for the pirate tone in that chat's message, leaving the shared instructions unchanged"
     ],
     "answer": 3,
     "explain": "Yêu cầu một lần của một người nên nằm trong tin nhắn của chat đó; cấu hình dùng chung chỉ chứa những gì đúng cho mọi người dùng. Đưa giọng hải tặc vào project instructions sẽ ảnh hưởng mọi chat của cả nhóm. Tạo Project mới cho một lời mời là thừa. Thêm quy tắc vào knowledge làm lộn xộn tài liệu tham khảo dùng chung."
    },
    {
     "q": "Claude's draft budget memo uses Q2 figures instead of the Q3 column in the attached spreadsheet; the rest of the memo is fine. Which follow-up is MOST effective?",
     "options": [
      "'Wrong. Redo it.'",
      "'The table uses Q2 figures; use the Q3 column from the attached file and keep everything else unchanged'",
      "'Please double-check all your numbers.'",
      "'Start over and write a completely new memo, using a different structure and a more concise style throughout'"
     ],
     "answer": 1,
     "explain": "Phản hồi giữa chừng nên chỉ ra chỗ sai, nguyên nhân bạn thấy và phạm vi cần sửa. 'Sai rồi, làm lại' không cho Claude biết sai ở đâu. 'Kiểm lại số' quá chung chung. Viết lại hoàn toàn bỏ luôn những phần đang tốt và tạo thêm việc phải kiểm lại."
    },
    {
     "q": "A team member notices that the first message she sends in her Project on Monday morning uses noticeably more of her usage than messages later that day. What is the MOST likely explanation?",
     "options": [
      "Project content is cached for reuse, but the cache expires after inactivity, so the first message after a break counts it fully",
      "Usage limits are lower on Mondays",
      "Claude automatically routes the first message of each week to the heaviest model, which counts more against the limit than later messages do",
      "The Project's knowledge files were deleted over the weekend"
     ],
     "answer": 0,
     "explain": "Help center: nội dung Project được lưu đệm và tính ít hơn khi dùng lại, nhưng cache hết hạn sau một thời gian không hoạt động; vì vậy tin nhắn đầu tiên sau quãng nghỉ dài tính đầy đủ nội dung Project. Hạn mức không thay đổi theo ngày trong tuần. Nếu file bị xóa thì tin nhắn còn tốn ít hơn chứ không nhiều hơn. Không có cơ chế tự chuyển tin nhắn đầu tuần sang model nặng nhất."
    },
    {
     "q": "To save usage, a colleague cut her prompts for client follow-up emails down to one line. She now needs three or four correction rounds per email. What is the BEST advice?",
     "options": [
      "Keep the one-line prompts but send each correction as several separate short messages, since each short message uses less usage",
      "Switch to the heaviest model, which can infer the missing client details so that one-line prompts work",
      "Restore the key context, such as client, purpose, and tone, so emails come out right in fewer rounds",
      "Cut the prompts even further to save more usage"
     ],
     "answer": 2,
     "explain": "Tối ưu không được cắt bối cảnh cần thiết: prompt ngắn mà phải sửa ba bốn lượt tốn hơn một prompt đủ ý làm đúng ngay. Cắt thêm làm tình hình tệ hơn. Model nặng hơn tốn hạn mức hơn và không tự biết khách hàng, mục đích hay giọng văn. Chia nhỏ thành nhiều tin nhắn làm tăng số lượt; help center khuyên gộp các yêu cầu liên quan vào một tin nhắn."
    },
    {
     "q": "An analyst hits her weekly usage limit in the Claude web app even though her chats there have been light. She has also been using Claude Code heavily for a data-cleaning project. What is the MOST likely explanation?",
     "options": [
      "Claude Code usage is free and separate, so the web app's usage meter must be malfunctioning",
      "Light chats count more against the weekly limit than heavy coding sessions in other tools do",
      "Weekly limits apply only to the web app, so the Claude Code work cannot have affected her remaining chat allowance at all",
      "Usage on claude.ai, Claude Code, and Claude Desktop counts toward the same limit"
     ],
     "answer": 3,
     "explain": "Help center: mức dùng trên claude.ai, Claude Code và Claude Desktop tính chung một hạn mức, và giới hạn tuần áp dụng cho mọi model. Công việc nặng trên Claude Code vì vậy làm giảm phần còn lại cho web app. Claude Code không nằm ngoài hạn mức. Chat nhẹ không tốn hơn chat nặng. Cô có thể xem mức đã dùng ở Settings > Usage."
    },
    {
     "q": "In one chat, an HR specialist found that adding 'List the policy section number after each answer' fixed missing references. She wants to make it permanent in her team's shared Project. What should she do BEFORE updating the project instructions?",
     "options": [
      "Nothing more, since it already worked once",
      "Add it to her personal Instructions for Claude instead, so the change affects only her own chats while teammates keep getting missing references",
      "Ask Claude to promise it will always follow the instruction",
      "Test the change on several different questions to confirm it works consistently"
     ],
     "answer": 3,
     "explain": "Cách sửa hiệu quả trong một chat cần được kiểm trên nhiều trường hợp trước khi đưa vào cấu hình dùng chung; một lần thành công chưa chứng minh ổn định. Lời hứa của Claude không phải phép kiểm. Đặt vào Instructions for Claude cá nhân chỉ sửa cho riêng cô, cả nhóm vẫn gặp lỗi; với lỗi chung, chỗ sửa đúng là project instructions sau khi đã xác nhận."
    },
    {
     "q": "A sales Project keeps quoting incorrect product prices. Which TWO diagnostic steps should the owner take FIRST? (Choose TWO.)",
     "options": [
      "Rewrite all of the project instructions from scratch",
      "Check whether the current price list is in project knowledge and whether outdated versions are still there",
      "Ask Claude to quote the exact passage it used for a price, to see which document it is drawing from",
      "Raise the effort setting to Max",
      "Switch the Project to Opus"
     ],
     "answer": [
      1,
      2
     ],
     "explain": "Giá sai thường là lỗi knowledge hoặc nguồn. Yêu cầu trích nguyên văn đoạn đã dùng cho biết Claude đang đọc tài liệu nào; kiểm knowledge xem có bảng giá hiện hành và còn bản cũ hay không là bước rẻ và trúng gốc. Đổi model hay tăng effort không sửa được tài liệu sai. Viết lại toàn bộ instructions là đổi nhiều thứ cùng lúc khi chưa chẩn đoán."
    },
    {
     "q": "A content team wants to stretch its usage further without lowering quality. Which TWO habits BEST achieve this? (Choose TWO.)",
     "options": [
      "Use a lower effort level for routine tasks such as reformatting",
      "Split each request into many short follow-up messages",
      "Group related questions into a single message instead of sending them one by one",
      "Paste the full reference document again in every message",
      "Use the heaviest model at maximum effort for every task"
     ],
     "answer": [
      0,
      2
     ],
     "explain": "Help center khuyên gộp các yêu cầu liên quan vào một tin nhắn và hạ effort cho việc thường lệ; cả hai giảm tiêu hao mà không giảm chất lượng. Chia nhỏ thành nhiều tin nhắn làm tăng số lượt. Model nặng nhất với effort tối đa cho mọi việc tốn hạn mức nhanh hơn. Dán lại tài liệu ở mỗi tin nhắn làm chat dài và tốn hơn; tài liệu dùng lại nên để trong Project."
    }
   ]
  }
 ]
};
