window.CERT_DATA = {
  code: "CCAO-F",
  title: "Claude Certified Associate – Foundations",
  storageKey: "ccaof-notes-v1",
  exam: { questions: 60, minutes: 120, passScaled: 720 },
  intro: `<p><strong>CCAO-F</strong> là chứng chỉ nền tảng cho người dùng Claude trong công việc hằng ngày: viết prompt, kiểm tra output, chọn đúng tính năng và model, đưa Claude vào quy trình, cấu hình Project, dùng AI có trách nhiệm và xử lý khi kết quả kém. Đề không hỏi code hay API; đề hình dung bạn là một người làm văn phòng, vận hành, marketing, quản lý dự án… đang dùng các app Claude cho việc thật.</p>
<h4>Thông tin đề</h4>
<table>
<thead><tr><th>Mục</th><th>Chi tiết</th></tr></thead>
<tbody>
<tr><td>Số câu</td><td>60 câu</td></tr>
<tr><td>Thời gian</td><td>120 phút (trung bình 2 phút/câu)</td></tr>
<tr><td>Điểm đậu</td><td>720 trên thang điểm quy đổi (scaled) 1000</td></tr>
<tr><td>Dạng câu hỏi</td><td>Multiple choice (một đáp án đúng) và multiple response (đề ghi rõ, ví dụ "Choose TWO")</td></tr>
<tr><td>Tài liệu</td><td>Closed book: không được mở tài liệu</td></tr>
</tbody>
</table>
<h4>Bảy domain và tỉ trọng</h4>
<table>
<thead><tr><th>Domain</th><th>Tỉ trọng</th></tr></thead>
<tbody>
<tr><td>D1 Prompting and Task Execution</td><td>14%</td></tr>
<tr><td>D2 Output Evaluation and Validation</td><td>21%</td></tr>
<tr><td>D3 Product and Model Selection</td><td>12%</td></tr>
<tr><td>D4 Workflow Integration and Solution Design</td><td>16%</td></tr>
<tr><td>D5 Configuration and Knowledge Management</td><td>12%</td></tr>
<tr><td>D6 Governance, Risk, and Responsible Use</td><td>15%</td></tr>
<tr><td>D7 Troubleshooting and Optimization</td><td>10%</td></tr>
</tbody>
</table>
<p>D2 nặng nhất (khoảng 1/5 đề, tức chừng 12–13 câu), nên đừng học lướt phần kiểm tra output. D1 và D7 dễ lẫn nhau: D1 dạy cách viết prompt từ đầu, D7 hỏi cách tìm ra <em>vì sao</em> kết quả kém và sửa đúng chỗ. D3 và D5 cũng dễ lẫn: D3 hỏi <em>có nên</em> dùng Project hay không, D5 hỏi <em>cấu hình</em> Project thế nào.</p>
<h4>Cách dùng trang này</h4>
<ol>
<li>Đọc từng domain theo thứ tự. Mỗi bài có phần "phải nhớ" ở cuối; bấm đánh dấu đã học để trang lưu tiến độ trên trình duyệt của bạn.</li>
<li>Ôn nhanh bằng bảng cheat của mỗi domain trước ngày thi.</li>
<li>Làm 6 câu quiz cuối mỗi domain. Câu hỏi viết bằng tiếng Anh như đề thật; đọc kỹ phần giải thích, kể cả lý do các phương án sai.</li>
<li>Khi đã học hết, làm bài thi thử để luyện nhịp 2 phút/câu.</li>
</ol>
<div class="tip">Khẩu vị chung của đáp án đúng trong đề này: bắt đầu bằng cách đơn giản nhất đủ dùng; đưa thêm bối cảnh trước khi đổi công cụ; kiểm với nguồn nằm ngoài Claude; giữ con người chịu trách nhiệm ở các quyết định quan trọng; chỉ chia sẻ dữ liệu tối thiểu, qua công cụ được tổ chức duyệt. Phương án "cấm hẳn AI" hoặc "tin hẳn AI" thường là bẫy.</div>
<div class="warn">Tên sản phẩm, gói và con số giới hạn của Claude thay đổi nhanh. Đề chấm theo từ vựng của exam guide (ví dụ Haiku, Sonnet, Opus, Projects, Research, artifacts). Trang này ưu tiên khái niệm ổn định; con số nào được nêu đều kèm link trang chính thức để bạn tự kiểm lại.</div>`,
  domains: [
    {
      id: "d1",
      name: "Prompting and Task Execution",
      weight: 14,
      intro: `<p>Domain này hỏi bạn có biết <strong>giao việc cho Claude</strong> hay không: một prompt tốt gồm những phần nào, khi nào nên chia việc lớn thành nhiều bước, sửa prompt theo vòng lặp ra sao, và đổi cách hỏi thế nào cho từng loại việc (phân tích, research, soạn thảo, brainstorm).</p><p>Ranh giới: D1 không hỏi chọn tính năng hay model (đó là D3), không hỏi cấu hình Project (D5). Khi câu hỏi mô tả một output kém và hỏi <em>nguyên nhân</em>, đó thường là D7; khi hỏi <em>nên viết prompt thế nào ngay từ đầu</em>, đó là D1.</p>`,
      lessons: [
        {
          id: "l-1-1",
          title: "Cấu trúc một prompt tốt: viết cho người chưa biết gì về việc của bạn",
          minutes: 11,
          html: `<p>Claude chỉ biết những gì nằm trong cuộc trò chuyện: tin nhắn của bạn, file bạn đưa, chỉ dẫn của Project (nếu có) và kết quả của công cụ. Claude không biết công ty bạn bán gì, sếp bạn thích văn phong ra sao, hay báo cáo này sẽ được đọc trong cuộc họp nào. Tài liệu của Anthropic gợi ý hình dung Claude như một <strong>nhân viên rất giỏi nhưng mới vào</strong>, chưa nắm quy ước và cách làm của nhóm. Mọi thứ người mới cần để làm đúng, bạn phải nói ra.</p>
<h4>Phép thử đồng nghiệp</h4>
<p>Trước khi gửi, hãy tưởng tượng đưa đúng đoạn prompt đó cho một đồng nghiệp không biết gì về việc này. Nếu họ phải hỏi lại "cho ai đọc?", "dài bao nhiêu?", "dựa trên số liệu nào?", thì Claude cũng thiếu đúng những thông tin đó, chỉ khác là Claude sẽ tự đoán thay vì hỏi.</p>
<h4>Các phần nên có</h4>
<ul>
<li><strong>Nhiệm vụ</strong>: một câu nói rõ việc cần làm và sản phẩm cuối cùng là gì.</li>
<li><strong>Bối cảnh và lý do</strong>: vì sao cần việc này, nó phục vụ mục tiêu nào. Khi biết lý do, Claude xử lý được cả những tình huống bạn chưa dặn. Ví dụ docs đưa ra: thay vì chỉ cấm dấu ba chấm, hãy nói "văn bản sẽ được đọc bằng giọng máy, nên đừng dùng dấu ba chấm"; Claude hiểu mục đích và tự tránh cả những ký hiệu khác giọng máy đọc không được.</li>
<li><strong>Người đọc</strong>: ban giám đốc, khách hàng mới, đội kỹ thuật… Người đọc quyết định độ sâu, thuật ngữ và giọng văn.</li>
<li><strong>Nguồn dữ liệu</strong>: dán hoặc đính kèm tài liệu thật, và tách nó khỏi lời dặn bằng tiêu đề hoặc thẻ kiểu <code>&lt;tai_lieu&gt;…&lt;/tai_lieu&gt;</code>. Với tài liệu dài, docs khuyên đặt tài liệu ở trên và câu hỏi ở cuối.</li>
<li><strong>Ví dụ</strong>: một hai mẫu output mong muốn thường rõ hơn cả đoạn mô tả dài. Docs gợi ý ví dụ nên sát việc thật và đủ đa dạng để Claude không bắt chước máy móc một mẫu duy nhất.</li>
<li><strong>Định dạng và ràng buộc</strong>: độ dài, cấu trúc (bảng, gạch đầu dòng, email), những gì không được làm. Nói điều bạn muốn có thay vì chỉ liệt kê điều cấm.</li>
<li><strong>Tiêu chí thành công</strong>: thế nào là "xong và tốt". Phần này còn giúp bạn chấm output ở bước sau (D2).</li>
</ul>
<h4>Ví dụ trước và sau</h4>
<p><em>Trước:</em> "Viết email thông báo tăng giá."</p>
<p><em>Sau:</em> "Soạn email gửi khách hàng doanh nghiệp đang dùng gói dịch vụ bảo trì, thông báo giá tăng 8% từ quý sau. Lý do thật: chi phí linh kiện tăng; chúng tôi muốn giữ khách nên giọng cần thẳng thắn, tôn trọng, không xin lỗi quá mức. Người đọc là trưởng phòng mua hàng, bận, đọc trên điện thoại. Dưới 150 chữ, có một câu nêu rõ ngày áp dụng và một câu mời liên hệ quản lý tài khoản. Dưới đây là email năm ngoái làm mẫu giọng văn: …"</p>
<p>Bản sau không dài vì màu mè; mỗi câu đều trả lời một câu hỏi mà người mới sẽ hỏi.</p>
<h4>Ba thứ cần mô tả theo khung AI Fluency</h4>
<p>Khung 4D của Anthropic gọi kỹ năng này là <strong>Description</strong>, gồm ba phần: <strong>Product Description</strong> (sản phẩm cần ra: nội dung, định dạng, người đọc, phong cách), <strong>Process Description</strong> (Claude nên tiếp cận việc thế nào, ví dụ đọc hết tài liệu rồi mới tóm tắt) và <strong>Performance Description</strong> (Claude nên cư xử thế nào khi làm cùng bạn, ví dụ ngắn gọn hay chi tiết, phản biện hay hỗ trợ).</p>
<div class="tip">Khi đề hỏi "cách tốt nhất để cải thiện kết quả" mà prompt trong tình huống thiếu bối cảnh, người đọc hoặc định dạng, đáp án đúng gần như luôn là bổ sung những thứ đó. Các phương án "đổi sang model mạnh hơn" hay "hỏi lại nhiều lần" là bẫy khi gốc rễ là prompt mơ hồ.</div>
<div class="warn">Viết in hoa "QUAN TRỌNG" hay lặp lại một lời dặn không thay được việc nói lý do. Docs ghi nhận các model hiện nay làm theo chỉ dẫn khá sát, nên lời lẽ quá gay gắt có thể khiến Claude áp dụng máy móc.</div>`,
          keypoints: [
            "Claude chỉ biết những gì có trong cuộc trò chuyện: phải nói rõ bối cảnh, người đọc, nguồn và mục tiêu.",
            "Nói lý do giúp Claude xử lý đúng cả những trường hợp chưa được dặn.",
            "Tách nguồn dữ liệu khỏi lời dặn; tài liệu dài đặt trên, câu hỏi đặt cuối.",
            "Ví dụ cụ thể thường hiệu quả hơn mô tả dài; nêu định dạng và tiêu chí thành công.",
            "Description trong khung 4D gồm Product, Process và Performance Description."
          ],
          sources: [
            { t: "Prompting best practices", u: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" },
            { t: "Introduction to prompt design", u: "https://support.claude.com/en/articles/7996853-introduction-to-prompt-design" },
            { t: "AI Fluency: Framework & Foundations", u: "https://anthropic.skilljar.com/ai-fluency-framework-foundations" }
          ]
        },
        {
          id: "l-1-2",
          title: "Chia việc lớn thành chuỗi bước có điểm kiểm",
          minutes: 10,
          html: `<p>Một yêu cầu như "đọc 300 phản hồi khảo sát, tìm vấn đề chính, rồi viết báo cáo cho ban lãnh đạo kèm đề xuất" thực ra là bốn năm việc khác nhau gộp lại. Nhồi tất cả vào một prompt thường cho ra kết quả trông ổn nhưng có bước bị làm qua loa, và khi sai bạn không biết sai ở đâu. Kỹ thuật chia việc thành các bước nối tiếp, kết quả bước trước làm đầu vào bước sau, được docs gọi là <strong>prompt chaining</strong>. Trong app chat, điều này đơn giản là làm thành nhiều lượt có chủ đích.</p>
<h4>Khi nào nên chia</h4>
<ul>
<li>Yêu cầu gồm nhiều <strong>loại việc</strong> khác nhau: tìm thông tin, phân tích, rồi viết.</li>
<li>Bạn cần <strong>kiểm kết quả trung gian</strong> trước khi đi tiếp (ví dụ danh sách chủ đề phải đúng trước khi viết báo cáo dựa trên nó).</li>
<li>Output cuối rất dài hoặc có nhiều phần cần chất lượng đồng đều.</li>
<li>Bạn muốn một vòng tự rà soát: docs mô tả mẫu phổ biến là <em>soạn nháp → rà theo tiêu chí → sửa</em>.</li>
</ul>
<p>Ngược lại, việc ngắn và liền mạch (viết một đoạn giới thiệu, dịch một email) không cần chia; chia nhỏ chỉ làm chậm.</p>
<h4>Một chuỗi mẫu</h4>
<ol>
<li><strong>Phân loại</strong>: "Đọc các phản hồi đính kèm, đề xuất tối đa 8 nhóm chủ đề, mỗi nhóm một dòng định nghĩa." Bạn xem lại, gộp hoặc đổi tên nhóm nếu cần.</li>
<li><strong>Gán và đếm</strong>: "Dùng đúng 8 nhóm đã chốt ở trên, gán từng phản hồi vào một nhóm, trả về bảng đếm." Bạn kiểm ngẫu nhiên vài dòng.</li>
<li><strong>Trích dẫn</strong>: "Với 3 nhóm lớn nhất, chọn 2 câu trích nguyên văn tiêu biểu."</li>
<li><strong>Viết</strong>: "Dựa trên bảng đếm và trích dẫn ở trên, viết bản tóm tắt một trang cho ban lãnh đạo, kết thúc bằng 3 đề xuất."</li>
</ol>
<p>Mỗi bước có một mục tiêu duy nhất, nêu rõ dùng kết quả nào của bước trước, và có một <strong>điểm kiểm</strong> do người thực hiện. Lỗi ở bước 1 (nhóm chủ đề sai) được bắt ngay, không lan sang bản báo cáo.</p>
<h4>Chuyển gì sang bước kế tiếp</h4>
<p>Hãy chuyển cho bước sau phần kết quả <em>đã được bạn duyệt</em>, không phải toàn bộ đoạn chat lộn xộn trước đó. Nếu bạn sửa danh sách chủ đề bằng tay, dán bản đã sửa vào prompt bước sau và nói rõ "dùng đúng danh sách này". Khi chuỗi dài, bạn có thể mở chat mới cho bước sau và chỉ mang theo kết quả cần thiết (xem thêm bài về context ở D3).</p>
<h4>Chia bước khác với vi quản lý suy luận</h4>
<p>Chia việc ở đây là chia <em>quy trình làm việc</em>. Còn việc Claude suy nghĩ bên trong một bước thì docs hiện nay ghi nhận: với các model mới có adaptive thinking, một chỉ dẫn chung như "hãy cân nhắc kỹ trước khi trả lời" thường hiệu quả hơn tự viết sẵn từng bước suy luận. Bạn kiểm soát đầu vào, đầu ra và điểm kiểm; không cần đọc chính tả từng ý nghĩ.</p>
<div class="tip">Trong đề, nếu tình huống mô tả một yêu cầu nhiều phần cho kết quả "bỏ sót" hoặc "nông", đáp án tốt thường là tách thành các bước tuần tự, kiểm kết quả trung gian, thay vì viết thêm lời dặn vào cùng một prompt khổng lồ.</div>
<div class="warn">Đừng để Claude tự chuyển bước khi kết quả trung gian chưa được kiểm. Một danh sách chủ đề sai ở bước đầu sẽ được bước sau "viết rất hay" thành một báo cáo sai.</div>`,
          keypoints: [
            "Prompt chaining: chia việc thành bước nối tiếp, kết quả đã kiểm của bước trước là đầu vào bước sau.",
            "Nên chia khi có nhiều loại việc, cần kiểm kết quả trung gian, hoặc output dài.",
            "Mẫu phổ biến: soạn nháp → rà theo tiêu chí → sửa.",
            "Việc ngắn, liền mạch thì giữ một prompt.",
            "Chia quy trình, không cần viết sẵn từng bước suy nghĩ cho model mới."
          ],
          sources: [
            { t: "Prompting best practices (chaining, thinking)", u: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" },
            { t: "Usage limit best practices (plan first)", u: "https://support.claude.com/en/articles/9797557-usage-limit-best-practices" }
          ]
        },
        {
          id: "l-1-3",
          title: "Lặp prompt và đổi chiến lược theo loại việc",
          minutes: 12,
          html: `<p>Prompt đầu tiên hiếm khi hoàn hảo. Khác biệt giữa người dùng giỏi và người dùng bình thường nằm ở cách họ <strong>lặp</strong>: có tiêu chí, có chẩn đoán, mỗi lần sửa một chỗ. Khóa học chính thức gọi đây là tinh chỉnh "có chẩn đoán" (refine diagnostically).</p>
<h4>Vòng lặp bốn bước</h4>
<ol>
<li><strong>Chốt tiêu chí</strong>: viết ra output tốt phải có gì (đủ 5 mục, dưới 200 chữ, giọng thân thiện, số liệu khớp nguồn). Không có tiêu chí thì "chưa ưng" chỉ là cảm giác.</li>
<li><strong>Đọc output và gọi tên vấn đề</strong>: chung chung? sai giọng? thiếu mục? sai khuôn?</li>
<li><strong>Tìm phần prompt gây ra</strong>: output chung chung thường do thiếu bối cảnh hoặc người đọc; sai giọng do thiếu ví dụ; sai khuôn do không nêu định dạng; bịa chi tiết do không đưa nguồn hoặc không cho phép nói "không biết".</li>
<li><strong>Thay đổi một yếu tố, rồi chạy lại</strong>: nếu sửa ba thứ cùng lúc, bạn không biết thứ nào có tác dụng. Với prompt sẽ dùng lại nhiều lần, thử trên vài đầu vào khác nhau trước khi chia sẻ.</li>
</ol>
<h4>Phản hồi cụ thể, không phải "làm tốt hơn"</h4>
<p>"Viết lại hay hơn" cho Claude rất ít thông tin. So sánh với: "Đoạn hai quá kỹ thuật cho người đọc là bộ phận bán hàng; bỏ thuật ngữ, thay bằng một ví dụ khách hàng cụ thể, giữ nguyên độ dài." Phản hồi tốt nói <em>chỗ nào</em>, <em>sai so với tiêu chí nào</em>, và <em>muốn thay bằng gì</em>.</p>
<h4>Sửa tiếp hay làm lại</h4>
<p>Nếu hướng đi sai từ gốc (hiểu nhầm nhiệm vụ), chồng thêm năm tin nhắn sửa thường kém hơn sửa lại prompt ban đầu, hoặc mở chat mới với prompt đã hoàn thiện. Những hiểu nhầm cũ vẫn nằm trong cuộc trò chuyện và tiếp tục kéo kết quả lệch đi.</p>
<h4>Chiến lược theo loại việc</h4>
<table>
<thead><tr><th>Loại việc</th><th>Lỗi thường gặp</th><th>Nên làm trong prompt</th></tr></thead>
<tbody>
<tr><td>Phân tích</td><td>Kết luận chắc nịch từ dữ liệu không đủ</td><td>Đưa dữ liệu thật; yêu cầu nêu giả định; cho phép trả lời "không đủ dữ liệu để kết luận"; yêu cầu chỉ ra số liệu dẫn tới mỗi nhận định.</td></tr>
<tr><td>Research</td><td>Lan man, nguồn không rõ</td><td>Phạm vi rõ (câu hỏi, khu vực, khoảng thời gian); loại nguồn ưu tiên; yêu cầu trích dẫn để bạn kiểm.</td></tr>
<tr><td>Soạn thảo</td><td>Giọng chung chung, dữ kiện bịa</td><td>Người đọc, mục đích, mẫu giọng văn, dữ kiện thật cần dùng, độ dài.</td></tr>
<tr><td>Brainstorm</td><td>Ít ý, ý an toàn và giống nhau</td><td>Đòi số lượng và độ đa dạng, tạm chưa lọc; chấm và lọc ở bước sau theo tiêu chí riêng.</td></tr>
</tbody>
</table>
<p>Yêu cầu thực tế thường trộn nhiều loại: "tìm hiểu đối thủ rồi đề xuất ba chiến dịch". Hãy tách thành research (có phạm vi, có nguồn) rồi brainstorm (nhiều ý) rồi phân tích chọn lọc (có tiêu chí), đúng như bài chia bước.</p>
<div class="tip">Với việc phân tích và hỏi đáp trên tài liệu, docs của Anthropic nói việc cho phép Claude thừa nhận "không biết" có thể giảm mạnh thông tin sai. Đây là đáp án hay xuất hiện khi tình huống mô tả Claude "tự tin trả lời dù dữ liệu không có".</div>
<div class="warn">Brainstorm và đánh giá là hai chế độ khác nhau. Yêu cầu "đưa 20 ý tưởng khả thi nhất" cùng lúc vừa sinh vừa lọc, thường cho ra ít ý mới. Tách thành hai bước.</div>`,
          keypoints: [
            "Lặp có chẩn đoán: chốt tiêu chí, gọi tên vấn đề, tìm phần prompt gây ra, thay đổi một yếu tố.",
            "Phản hồi phải nói chỗ nào, sai theo tiêu chí nào, muốn thay bằng gì.",
            "Hướng sai từ gốc: sửa prompt ban đầu hoặc mở chat mới thay vì chồng sửa.",
            "Phân tích: cho phép nói không đủ dữ liệu. Research: phạm vi và nguồn. Soạn thảo: người đọc và mẫu. Brainstorm: nhiều ý đa dạng trước, lọc sau.",
            "Prompt dùng lại nhiều lần phải thử trên nhiều đầu vào."
          ],
          sources: [
            { t: "Prompting best practices", u: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" },
            { t: "Reduce hallucinations", u: "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations" },
            { t: "AI Fluency: Framework & Foundations", u: "https://anthropic.skilljar.com/ai-fluency-framework-foundations" }
          ]
        }
      ],
      cheat: [
        ["Hình dung Claude thế nào", "Nhân viên giỏi nhưng mới vào: không biết bối cảnh, quy ước, người đọc của bạn"],
        ["Phép thử đồng nghiệp", "Người không biết gì đọc prompt mà phải hỏi lại → Claude cũng thiếu thông tin đó"],
        ["Thành phần prompt", "Nhiệm vụ, bối cảnh + lý do, người đọc, nguồn, ví dụ, định dạng/ràng buộc, tiêu chí thành công"],
        ["Nói lý do", "Giúp Claude tổng quát đúng cho trường hợp chưa dặn (ví dụ: đọc bằng giọng máy → tránh dấu ba chấm)"],
        ["Tài liệu dài", "Đặt tài liệu ở trên, câu hỏi ở cuối; tách bằng tiêu đề hoặc thẻ"],
        ["Description (4D)", "Product (sản phẩm), Process (cách làm), Performance (cách cư xử khi cộng tác)"],
        ["Prompt chaining", "Bước nối tiếp, mỗi bước một mục tiêu, kiểm kết quả trung gian trước khi đi tiếp"],
        ["Khi nào giữ một prompt", "Việc ngắn, liền mạch, không cần kiểm giữa chừng"],
        ["Lặp prompt", "Tiêu chí trước → chẩn đoán → sửa MỘT chỗ → thử lại trên nhiều đầu vào"],
        ["Phân tích / Research", "Cho phép nói 'không đủ dữ liệu' / nêu phạm vi, nguồn ưu tiên, đòi trích dẫn"],
        ["Soạn thảo / Brainstorm", "Người đọc + mẫu giọng + dữ kiện thật / yêu cầu nhiều ý khác nhau, lọc ở bước sau"]
      ],
      quiz: [
        {
          q: "A marketing coordinator asks Claude: 'Write a product announcement.' The result is generic and does not mention the features her team cares about. What is the BEST next step?",
          options: [
            "Switch to the most capable model available and resend the same request, since stronger models infer missing details better",
            "Add the audience, key features, purpose, and length to the prompt, plus a past announcement as a style example",
            "Ask Claude to 'make it more specific' several times until the result improves",
            "Ask Claude to generate ten versions and pick the one that sounds best"
          ],
          answer: 1,
          explain: "Gốc rễ là prompt thiếu bối cảnh: Claude không biết người đọc, tính năng nào quan trọng, mục đích hay giọng văn. Bổ sung các phần đó (kèm ví dụ mẫu) là cách sửa đúng. Đổi model mạnh hơn không thêm được thông tin mà Claude không có. 'Cụ thể hơn' lặp lại không nói cụ thể theo hướng nào. Sinh 10 bản chỉ cho 10 bản chung chung."
        },
        {
          q: "An operations analyst sends one long prompt asking Claude to read 400 support tickets, group them into themes, count each theme, pick representative quotes, and write an executive summary with recommendations. The summary reads well, but several themes are clearly mislabeled. What should the analyst do to make this task more reliable?",
          options: [
            "Add the word IMPORTANT before each instruction in the single prompt",
            "Ask for a shorter executive summary so Claude can spend more of its attention on labeling the tickets correctly",
            "Remove the recommendations so the prompt has fewer requirements",
            "Split the work into sequential steps and review the theme list before counting and summarizing"
          ],
          answer: 3,
          explain: "Đây là việc nhiều phần cần kiểm kết quả trung gian: danh sách chủ đề sai thì mọi bước sau đều sai. Chia thành chuỗi bước có điểm kiểm (prompt chaining) cho phép bắt lỗi ở bước phân loại. Viết in hoa không giải quyết cấu trúc. Rút gọn bản tóm tắt hay bỏ đề xuất không sửa được việc gán nhãn sai."
        },
        {
          q: "A project manager wants Claude to answer questions using only an attached 60-page vendor contract. In early tests, Claude sometimes states terms that are not in the contract. Which TWO prompt changes are MOST likely to reduce this? (Choose TWO.)",
          options: [
            "Tell Claude it may say it cannot find the answer in the contract when the text does not support one",
            "Ask Claude to answer in a more confident, authoritative tone",
            "Put the question before the contract text so Claude sees it first",
            "Ask Claude to first quote the exact contract passages relevant to the question, then answer based only on those quotes",
            "Ask Claude to add any useful terms that are common in similar contracts"
          ],
          answer: [0, 3],
          explain: "Docs của Anthropic về giảm hallucination nêu hai kỹ thuật này: cho phép Claude thừa nhận không tìm thấy, và yêu cầu trích nguyên văn đoạn liên quan rồi mới trả lời dựa trên đó. Giọng tự tin hơn không làm nội dung đúng hơn. Docs khuyên với tài liệu dài nên đặt tài liệu ở trên, câu hỏi ở cuối, nên đặt câu hỏi lên trước là ngược. Thêm 'điều khoản thường gặp' chính là mời Claude đưa nội dung ngoài hợp đồng vào."
        },
        {
          q: "A team lead asks Claude for 'the 5 best ideas' for a team offsite and keeps getting the same safe suggestions (escape room, cooking class). What is the MOST effective change?",
          options: [
            "Ask for a broad, unfiltered list of 25 ideas first, then evaluate them against budget, size, and goals in a separate step",
            "Ask Claude to be more creative in the same prompt",
            "Switch to a faster model so she can regenerate more often",
            "Provide the list of ideas the team rejected last year, ask Claude to avoid them, and request five ideas more unusual than those"
          ],
          answer: 0,
          explain: "Brainstorm và đánh giá là hai chế độ khác nhau; đòi '5 ý tốt nhất' ngay từ đầu khiến Claude vừa sinh vừa lọc nên chỉ ra ý an toàn. Tách thành bước sinh nhiều ý đa dạng rồi bước lọc theo tiêu chí là chiến lược đúng cho brainstorm. 'Sáng tạo hơn' quá mơ hồ. Model nhanh hơn không đổi chiến lược. Danh sách loại trừ có ích một phần nhưng không giải quyết việc thiếu độ rộng."
        },
        {
          q: "After three rounds of feedback, a sales manager's proposal draft is still off. Reviewing the chat, he realizes Claude misunderstood the client's industry in the very first message and each revision built on that mistake. What is the BEST approach?",
          options: [
            "Continue sending corrections in the same chat until the draft is right",
            "Ask Claude to apologize and confirm it understands the industry now",
            "Revise the original prompt with the correct industry context and needed details, then start fresh from that improved prompt",
            "Switch the response style to Formal and regenerate"
          ],
          answer: 2,
          explain: "Khi hướng đi sai từ gốc, hiểu nhầm ban đầu vẫn nằm trong cuộc trò chuyện và tiếp tục kéo các bản sửa lệch đi. Sửa prompt gốc (hoặc mở chat mới với prompt đã hoàn thiện) hiệu quả hơn chồng thêm phản hồi. Lời xin lỗi không thay đổi context. Đổi style chỉ đổi giọng, không sửa hiểu nhầm về ngành."
        },
        {
          q: "An HR specialist built a prompt that turns interview notes into structured candidate summaries. It worked well on the first set of notes. She plans to share it with ten recruiters. What should she do FIRST?",
          options: [
            "Share it immediately, since it already produced a good result",
            "Test the prompt on several different sets of notes, including messy and incomplete ones, and check the outputs against her criteria",
            "Add detailed instructions covering every edge case she can think of, then share it right away so the recruiters benefit from the extra guidance",
            "Ask Claude whether the prompt is good enough to share"
          ],
          answer: 1,
          explain: "Một lần chạy tốt chưa chứng minh prompt ổn định. Prompt sẽ dùng lại nhiều lần phải được thử trên nhiều đầu vào khác nhau (kể cả đầu vào xấu) và chấm theo tiêu chí trước khi chia sẻ. Chia sẻ ngay là rủi ro. Thêm thật nhiều chỉ dẫn mà chưa thử là đoán mò. Hỏi Claude tự đánh giá không thay được việc thử trên dữ liệu thật."
        }
      ]
    },
    {
      id: "d2",
      name: "Output Evaluation and Validation",
      weight: 21,
      intro: `<p>Domain nặng nhất của đề. Câu hỏi xoay quanh việc <strong>đánh giá output trước khi dùng</strong>: đúng chưa, đủ chưa, có hallucination, mâu thuẫn hay bias không, fact-check bằng cách nào, khi nào bắt buộc phải có người duyệt, và chỉnh output cho đúng người đọc, đúng định dạng.</p><p>Ranh giới: chuyện dữ liệu nhạy cảm, quyền riêng tư và chính sách thuộc D6. Chuyện tìm nguyên nhân gốc của output kém lặp lại (prompt, knowledge, model…) thuộc D7. D2 tập trung vào kỹ năng <em>Discernment</em>: nhìn một output cụ thể và phán xét nó.</p>`,
      lessons: [
        {
          id: "l-2-1",
          title: "Đúng và đủ: kiểm output theo rủi ro và tiêu chí",
          minutes: 11,
          html: `<p>Claude tạo câu trả lời bằng cách dự đoán chữ tiếp theo dựa trên những gì đã học và những gì có trong context. Vì vậy câu trả lời <strong>luôn trôi chảy</strong>, kể cả khi sai. Giọng tự tin không phải bằng chứng. Kiểm output nghĩa là so nó với một thứ nằm ngoài Claude: tài liệu nguồn, số liệu gốc, chuyên gia, hoặc chính yêu cầu ban đầu của bạn.</p>
<h4>Chính xác và đầy đủ là hai phép kiểm khác nhau</h4>
<ul>
<li><strong>Đúng (accuracy)</strong>: những gì output nói có khớp sự thật và nguồn không?</li>
<li><strong>Đủ (completeness)</strong>: output có trả lời hết những gì được yêu cầu không, có bỏ sót phần quan trọng không?</li>
</ul>
<p>Một bản tóm tắt hợp đồng có thể đúng từng câu nhưng bỏ sót điều khoản phạt chậm giao hàng, và vì thế vẫn nguy hiểm. Lỗi thiếu khó thấy hơn lỗi sai, vì bạn phải biết cái gì <em>đáng lẽ</em> phải có.</p>
<h4>Ưu tiên kiểm ở đâu</h4>
<p>Không ai có thời gian kiểm từng chữ. Hãy ưu tiên những chỗ dễ sai nhất và tốn kém nhất nếu sai:</p>
<ul>
<li>Con số, ngày tháng, tên người, tên tổ chức, giá tiền.</li>
<li>Trích dẫn, đường link, tên tài liệu, số điều luật.</li>
<li>Thông tin mới hoặc rất chuyên ngành (dễ vượt ngoài kiến thức của model).</li>
<li>Bất cứ thứ gì người khác sẽ hành động theo: cam kết với khách, hướng dẫn quy trình, số liệu trong báo cáo tài chính.</li>
</ul>
<h4>Checklist lập sẵn để đo độ đầy đủ</h4>
<p>Trước khi đọc output, liệt kê những gì nó phải có, lấy từ chính yêu cầu: "5 rủi ro, mỗi rủi ro có mức độ và người chịu trách nhiệm; nêu ngân sách; dưới 2 trang". Sau đó dò từng mục. Cách này cũng giúp bạn không bị cuốn theo một output viết hay nhưng lạc đề.</p>
<h4>Ba góc đánh giá theo khung 4D</h4>
<p>Khung AI Fluency gọi kỹ năng này là <strong>Discernment</strong>, chia làm ba phần:</p>
<ul>
<li><strong>Product Discernment</strong>: chất lượng sản phẩm: chính xác, phù hợp, mạch lạc, đúng trọng tâm.</li>
<li><strong>Process Discernment</strong>: cách Claude đi tới kết quả: có bước lập luận nào sai, có bỏ qua dữ kiện nào, có nhảy kết luận không. Bạn có thể yêu cầu Claude trình bày lập luận hoặc xem phần tóm tắt suy nghĩ.</li>
<li><strong>Performance Discernment</strong>: cách Claude cư xử trong cuộc trao đổi: có quá dài dòng, có chiều theo bạn quá mức thay vì phản biện khi cần không.</li>
</ul>
<h4>Đưa phát hiện quay lại prompt</h4>
<p>Khung 4D mô tả vòng <strong>Description – Discernment</strong>: bạn mô tả, Claude làm, bạn đánh giá, rồi dùng điều phát hiện được để mô tả tốt hơn. Nếu output lần nào cũng thiếu phần ngân sách, hãy đưa "phải có ngân sách" vào prompt thay vì lần nào cũng tự thêm bằng tay.</p>
<div class="tip">Trong đề, phương án "đọc lướt thấy hợp lý là được" hoặc "hỏi Claude xem nó có chắc không" gần như luôn sai. Phương án đúng thường nhắc tới việc so với nguồn gốc, kiểm theo tiêu chí viết trước, hoặc ưu tiên kiểm các chi tiết rủi ro cao.</div>
<div class="warn">Output càng trau chuốt càng dễ khiến người đọc mất cảnh giác. Định dạng đẹp, giọng chuyên nghiệp không liên quan gì tới việc số liệu có đúng hay không.</div>`,
          keypoints: [
            "Giọng tự tin không phải bằng chứng; kiểm là so với nguồn nằm ngoài Claude.",
            "Tách hai câu hỏi: đúng (accuracy) và đủ (completeness).",
            "Ưu tiên kiểm số liệu, tên, ngày, trích dẫn, link và thứ người khác sẽ hành động theo.",
            "Đo độ đủ bằng danh sách viết trước từ chính yêu cầu.",
            "Discernment gồm Product, Process, Performance; vòng Description–Discernment biến phát hiện thành prompt tốt hơn."
          ],
          sources: [
            { t: "AI Fluency: Framework & Foundations", u: "https://anthropic.skilljar.com/ai-fluency-framework-foundations" },
            { t: "AI Capabilities and Limitations", u: "https://anthropic.skilljar.com/ai-capabilities-and-limitations" },
            { t: "Reduce hallucinations", u: "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations" }
          ]
        },
        {
          id: "l-2-2",
          title: "Hallucination, mâu thuẫn, bias và cách fact-check",
          minutes: 13,
          html: `<p>Đề sẽ mô tả một output có vấn đề và hỏi bạn đó là lỗi gì, hoặc nên kiểm bằng cách nào. Phân biệt được ba loại lỗi dưới đây là nền tảng.</p>
<h4>Ba kiểu lỗi</h4>
<table>
<thead><tr><th>Kiểu lỗi</th><th>Nhận diện</th><th>Ví dụ</th></tr></thead>
<tbody>
<tr><td><strong>Hallucination</strong></td><td>Khẳng định nghe hợp lý, nói rất tự tin, nhưng sai hoặc không có thật</td><td>Một nghiên cứu "năm 2023 của Đại học X" không tồn tại; một đường link dẫn tới trang 404; điều khoản không có trong hợp đồng</td></tr>
<tr><td><strong>Mâu thuẫn (inconsistency)</strong></td><td>Hai chỗ nói khác nhau</td><td>Đoạn đầu ghi doanh thu tăng 12%, bảng cuối ghi 9%; hỏi lại cùng câu thì ra đáp án khác; output nói khác tài liệu bạn đưa</td></tr>
<tr><td><strong>Bias</strong></td><td>Thường không phải câu sai mà là thiếu hoặc lệch: một góc nhìn bị bỏ qua, giả định khuôn mẫu, ngôn ngữ thiên vị</td><td>Mô tả công việc kỹ sư toàn dùng đại từ nam; phân tích thị trường chỉ dựa trên giả định của một quốc gia</td></tr>
</tbody>
</table>
<h4>Những vùng dễ bị bịa nhất</h4>
<p>Trích dẫn học thuật, URL, số liệu thống kê cụ thể, tên người và chức danh, số hiệu văn bản pháp luật, chi tiết của sự kiện gần đây hoặc chủ đề rất ngách. Đây cũng chính là những chỗ bạn nên kiểm đầu tiên.</p>
<h4>Phòng từ prompt: yêu cầu output có thể đối chiếu</h4>
<p>Docs của Anthropic về giảm hallucination gợi ý các kỹ thuật bạn có thể đưa vào prompt:</p>
<ul>
<li><strong>Cho phép nói "không biết"</strong>: nói rõ Claude được phép thừa nhận không chắc hoặc không tìm thấy.</li>
<li><strong>Trích nguyên văn trước</strong>: với tài liệu dài, yêu cầu Claude trích đúng đoạn liên quan rồi mới trả lời dựa trên đó.</li>
<li><strong>Giới hạn nguồn</strong>: chỉ dùng tài liệu được cung cấp, không dùng kiến thức chung.</li>
<li><strong>Mỗi khẳng định một trích dẫn</strong>: khẳng định nào không tìm được đoạn hỗ trợ thì phải rút lại.</li>
</ul>
<h4>Khi đã có output: đối chiếu từng ý quan trọng</h4>
<ul>
<li><strong>So với nguồn gốc</strong>: mở tài liệu gốc, trang web thật, cơ sở dữ liệu của công ty. Trích dẫn chỉ cho bạn biết nên mở trang nào ra đọc; bản thân nó chưa chứng minh gì. Bạn phải mở nguồn và xem nó có thật sự nói như vậy không.</li>
<li><strong>Chạy lại và so</strong> (docs gọi là best-of-N): hỏi cùng câu vài lần; nếu các lần trả lời mâu thuẫn nhau ở một chi tiết, chi tiết đó đáng ngờ.</li>
<li><strong>Đọc lập luận</strong>: xem phần tóm tắt suy nghĩ hoặc yêu cầu Claude giải thích từng bước, tìm bước nhảy vô lý.</li>
<li><strong>Đối chiếu chéo</strong> với nguồn độc lập thứ hai cho các con số quan trọng.</li>
</ul>
<p>Docs cũng nói rõ: các kỹ thuật này <strong>giảm</strong> chứ không <strong>loại bỏ</strong> hallucination. Thông tin quan trọng vẫn phải được kiểm.</p>
<h4>Kiểm bias</h4>
<p>Hỏi: ai có thể bị bỏ sót hoặc bị mô tả không công bằng? Output có đang giả định một nhóm người dùng, một nền văn hóa, một giới tính? Bạn có thể yêu cầu Claude tự rà output theo góc nhìn của các nhóm khác nhau, nhưng người quyết định vẫn là bạn, nhất là khi output dùng để ra quyết định về con người (tuyển dụng, đánh giá).</p>
<div class="tip">"Hỏi Claude 'Bạn có chắc không?'" không phải là fact-check. Claude có thể đổi ý hoặc khẳng định lại, nhưng cả hai đều không phải bằng chứng. Đáp án đúng luôn có một nguồn bên ngoài.</div>
<div class="warn">Có link không có nghĩa là đúng. Link có thể không tồn tại, hoặc tồn tại nhưng không nói điều output khẳng định. Phải mở và đọc.</div>`,
          keypoints: [
            "Hallucination: sai nhưng nghe hợp lý và tự tin; hay nằm ở trích dẫn, URL, số liệu, tên, điều luật, chủ đề mới hoặc ngách.",
            "Mâu thuẫn: trong cùng output, giữa các lần chạy, hoặc với tài liệu nguồn.",
            "Bias thường là thiếu hoặc lệch góc nhìn, không nhất thiết là câu sai.",
            "Trước: cho phép nói không biết, trích nguyên văn trước, giới hạn nguồn. Sau: mở nguồn gốc, chạy lại so sánh, đọc lập luận.",
            "Các kỹ thuật chỉ giảm, không loại bỏ hallucination; trích dẫn chỉ là địa chỉ để mở ra kiểm, chưa phải bằng chứng."
          ],
          sources: [
            { t: "Reduce hallucinations", u: "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations" },
            { t: "Enabling and using web search (citations)", u: "https://support.claude.com/en/articles/10684626-enabling-and-using-web-search" },
            { t: "AI Capabilities and Limitations", u: "https://anthropic.skilljar.com/ai-capabilities-and-limitations" }
          ]
        },
        {
          id: "l-2-3",
          title: "Người duyệt, người đọc và định dạng output",
          minutes: 12,
          html: `<h4>Khi nào bắt buộc phải có người duyệt</h4>
<p>Mọi output đều nên được người dùng đọc qua; điều cần quyết là <em>mức độ duyệt</em> và <em>người duyệt</em>. Tăng mức duyệt khi có các tín hiệu sau:</p>
<ul>
<li><strong>Hậu quả lớn hoặc khó đảo ngược</strong>: hợp đồng, thông báo công khai, số liệu gửi cơ quan quản lý.</li>
<li><strong>Đối ngoại</strong>: nội dung gửi khách hàng, đối tác, báo chí.</li>
<li><strong>Quyết định về con người</strong>: tuyển dụng, đánh giá, tín dụng, bảo hiểm, y tế, pháp lý. Usage Policy của Anthropic yêu cầu với các lĩnh vực rủi ro cao này, một người có chuyên môn phải xem xét thực chất trước khi kết quả tới tay người bị ảnh hưởng (chi tiết ở D6).</li>
<li><strong>Bạn không đủ chuyên môn để tự phán</strong>: một bản phân tích thuế mà bạn không phải chuyên gia thuế.</li>
</ul>
<p><strong>Người duyệt</strong> cần đủ chuyên môn để đánh giá nội dung và là người đứng tên chịu trách nhiệm. Một đồng nghiệp đọc thấy "trôi" không phải là duyệt chuyên môn. Nhờ thêm một phiên Claude rà lại có thể bắt được lỗi, nhưng phiên đó <strong>không thể đứng tên chịu trách nhiệm</strong> thay con người.</p>
<h4>Chỉnh output cho đúng người đọc</h4>
<p>Đừng coi bản đầu tiên là bản cuối. Có bốn yếu tố để điều chỉnh:</p>
<ul>
<li><strong>Độ sâu kỹ thuật</strong>: giữ hay bỏ thuật ngữ, có giải thích hay không.</li>
<li><strong>Giọng</strong>: trang trọng, thân thiện, trung tính, thuyết phục.</li>
<li><strong>Độ dài</strong>: một đoạn cho người bận, bản đầy đủ cho người cần chi tiết.</li>
<li><strong>Cấu trúc</strong>: kết luận trước cho lãnh đạo, bối cảnh trước cho người mới.</li>
</ul>
<p>Một nội dung có thể có nhiều phiên bản: bản cho ban giám đốc (kết luận, rủi ro, quyết định cần đưa ra), bản cho đội thực hiện (các bước, mốc thời gian), bản cho khách hàng (lợi ích, không có chi tiết nội bộ). Yêu cầu chỉnh sửa nên cụ thể đến mức Claude thực hiện được ngay: "bỏ đoạn 3, đưa con số chi phí lên câu đầu" tốt hơn "cho chuyên nghiệp hơn". Kèm <em>mục đích</em> của từng yêu cầu, để Claude không làm theo câu chữ mà lệch ý bạn.</p>
<p>Khi có nhiều bản nháp, hãy đối chiếu chúng với tiêu chí đã đặt từ đầu thay vì chọn theo cảm giác. Người chọn bản cuối cũng là người chịu trách nhiệm về nó.</p>
<h4>Định dạng: nhìn vào nơi output sẽ được dùng</h4>
<table>
<thead><tr><th>Nơi nhận / mục đích</th><th>Định dạng hợp lý</th></tr></thead>
<tbody>
<tr><td>Câu trả lời nhanh, đọc xong là xong</td><td>Trả lời ngay trong chat</td></tr>
<tr><td>Sản phẩm dài, độc lập, sẽ chỉnh sửa và dùng lại (tài liệu, slide, dashboard, công cụ nhỏ)</td><td>Artifact. Help center nói Claude tạo artifact khi nội dung đáng kể (thường hơn 15 dòng), độc lập và có khả năng được dùng lại</td></tr>
<tr><td>So sánh nhiều phương án theo nhiều tiêu chí</td><td>Bảng</td></tr>
<tr><td>Các bước làm theo thứ tự</td><td>Danh sách đánh số</td></tr>
<tr><td>Lập luận, giải thích nguyên nhân</td><td>Văn xuôi</td></tr>
<tr><td>Dán vào bảng tính hoặc phần mềm khác</td><td>Dữ liệu có cấu trúc (CSV, JSON) đúng cột/trường yêu cầu, hoặc file Excel/Word/PowerPoint qua tính năng tạo file</td></tr>
</tbody>
</table>
<div class="warn">Output đúng định dạng vẫn có thể sai nội dung. Một bảng CSV đúng cột vẫn có thể chứa số sai. Kiểm định dạng và kiểm nội dung là hai việc.</div>
<div class="tip">Câu hỏi về định dạng thường có một chi tiết lộ đáp án: "sẽ nhập vào hệ thống", "chia sẻ và chỉnh sửa tiếp", "đọc trên điện thoại trong 30 giây". Chọn định dạng theo nơi nhận, không theo cái gì trông đẹp nhất.</div>`,
          keypoints: [
            "Tăng mức duyệt khi hậu quả lớn, đối ngoại, quyết định về con người, hoặc bạn không đủ chuyên môn.",
            "Người duyệt cần đủ chuyên môn đánh giá và đứng tên chịu trách nhiệm; một phiên AI rà lại không thay được vai trò đó.",
            "Bốn yếu tố chỉnh theo người đọc: độ sâu kỹ thuật, giọng, độ dài, cấu trúc; yêu cầu sửa phải cụ thể, làm theo được.",
            "Định dạng theo nơi nhận: chat cho việc nhanh, artifact cho sản phẩm dùng lại, dữ liệu có cấu trúc cho phần mềm.",
            "Đúng định dạng không đảm bảo đúng nội dung."
          ],
          sources: [
            { t: "What are artifacts and how do I use them?", u: "https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them" },
            { t: "Create and edit files with Claude", u: "https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude" },
            { t: "Anthropic Usage Policy", u: "https://www.anthropic.com/legal/aup" }
          ]
        }
      ],
      cheat: [
        ["Kiểm output là gì", "So với nguồn NGOÀI Claude (tài liệu gốc, dữ liệu thật, chuyên gia, yêu cầu ban đầu)"],
        ["Đúng vs đủ", "Accuracy: khớp sự thật. Completeness: không bỏ sót phần được yêu cầu"],
        ["Ưu tiên kiểm", "Số liệu, tên, ngày, trích dẫn, link, điều luật, thứ người khác sẽ hành động theo"],
        ["Hallucination", "Sai nhưng nghe hợp lý, nói tự tin; hay ở trích dẫn, URL, số liệu, chủ đề mới/ngách"],
        ["Mâu thuẫn", "Trong cùng output, giữa các lần chạy (best-of-N), hoặc với tài liệu đưa vào"],
        ["Bias", "Thiếu/lệch góc nhìn, khuôn mẫu, ngôn ngữ thiên vị; cẩn trọng khi output dùng để quyết định về người"],
        ["Kỹ thuật giảm hallucination", "Cho phép nói 'không biết'; trích nguyên văn trước; chỉ dùng tài liệu cung cấp; khẳng định không có trích dẫn thì rút lại"],
        ["Trích dẫn", "Chỉ là địa chỉ để mở nguồn ra đọc; tự nó chưa chứng minh gì"],
        ["'Bạn có chắc không?'", "Không phải fact-check"],
        ["Người duyệt", "Đủ chuyên môn, đứng tên chịu trách nhiệm; AI rà AI không thay được"],
        ["Discernment (4D)", "Product (chất lượng), Process (lập luận), Performance (cách cư xử)"],
        ["Định dạng", "Theo nơi nhận: chat / artifact / bảng / danh sách / văn xuôi / CSV-JSON / file"]
      ],
      quiz: [
        {
          q: "A finance associate uses Claude to draft a quarterly summary for the CFO. The draft is well-written and cites several revenue figures. What should the associate do BEFORE sending it?",
          options: [
            "Ask Claude to confirm that every figure is accurate",
            "Send it, since Claude used a professional tone and clear structure",
            "Check each revenue figure against the company's source financial reports",
            "Run the draft through a grammar checker"
          ],
          answer: 2,
          explain: "Con số gửi CFO là chi tiết rủi ro cao, phải so với nguồn gốc nằm ngoài Claude (báo cáo tài chính). Hỏi Claude tự xác nhận không phải fact-check. Giọng chuyên nghiệp không chứng minh số đúng. Kiểm ngữ pháp không đụng tới tính chính xác của số liệu."
        },
        {
          q: "Claude's answer to a policy question includes a link to an official government page as its source. What is the MOST appropriate way to treat this citation?",
          options: [
            "Open the link and confirm the page exists and actually supports the specific claim",
            "Accept the claim, since an official government domain is a reliable source and Claude selected it specifically",
            "Ask Claude to provide two more links to strengthen the answer",
            "Remove the link so readers do not rely on it"
          ],
          answer: 0,
          explain: "Trích dẫn chỉ là địa chỉ để kiểm: link có thể không tồn tại, hoặc tồn tại nhưng không nói điều output khẳng định. Phải mở ra và đối chiếu. Tên miền uy tín không chứng minh nội dung khớp. Xin thêm link chỉ thêm việc phải kiểm. Xóa link làm mất khả năng kiểm chứng."
        },
        {
          q: "A recruiter asks Claude to draft a job description for a senior engineering role. The text is accurate about the role's duties, but it uses only male pronouns and describes the ideal candidate with phrases like 'young and energetic.' What type of issue is this, and what should the recruiter do?",
          options: [
            "A hallucination, since the wording does not match the company's style; regenerate the description until the pronouns change",
            "A formatting issue; convert the description to bullet points",
            "A completeness issue; ask Claude to add more duties",
            "A bias issue; revise to neutral, inclusive language and review it against the company's hiring guidelines before posting"
          ],
          answer: 3,
          explain: "Nội dung không sai sự thật nên không phải hallucination; vấn đề là ngôn ngữ thiên lệch và khuôn mẫu (giới tính, tuổi) — đó là bias. Cách xử lý là sửa sang ngôn ngữ trung lập và người tuyển dụng rà theo hướng dẫn của công ty, vì đây là nội dung ảnh hưởng tới quyết định về con người. Đổi định dạng hay thêm nhiệm vụ không sửa được bias; chạy lại ngẫu nhiên không đảm bảo hết."
        },
        {
          q: "An analyst needs Claude to summarize findings from a long industry report and wants the summary to be easy to verify. Which TWO actions BEST support verification? (Choose TWO.)",
          options: [
            "Ask Claude to write the summary in a confident, executive tone",
            "Ask Claude to include the exact quoted passage from the report that supports each key claim",
            "Ask Claude to supplement the report with general industry knowledge where the report is thin",
            "Ask Claude to keep the summary under 100 words",
            "Spot-check the claims against the original report, starting with figures and named sources"
          ],
          answer: [1, 4],
          explain: "Yêu cầu trích nguyên văn cho từng khẳng định giúp output kiểm được, và kiểm ngẫu nhiên với báo cáo gốc (bắt đầu từ số liệu, nguồn được nêu tên) là bước kiểm thực sự. Giọng tự tin không giúp kiểm. Bổ sung kiến thức chung làm lẫn nội dung ngoài báo cáo, khó kiểm hơn. Giới hạn 100 chữ chỉ là độ dài, không liên quan tới kiểm chứng."
        },
        {
          q: "A compliance officer used Claude to draft a customer notice about changes to loan eligibility criteria. A colleague in marketing read it and said it 'reads well.' What is the MOST appropriate next step before the notice is sent?",
          options: [
            "Send it, since a second person has already reviewed it",
            "Have a qualified reviewer with lending and legal expertise review the content, since it affects customers' access to credit and is external",
            "Ask a second Claude chat to check the notice carefully for legal and factual errors, and send it once that independent review finds no remaining issues",
            "Shorten the notice to reduce the chance of errors"
          ],
          answer: 1,
          explain: "Thông báo đối ngoại, ảnh hưởng tới quyền tiếp cận tín dụng của khách là trường hợp rủi ro cao: cần người có chuyên môn (cho vay, pháp lý) duyệt và chịu trách nhiệm. Đồng nghiệp marketing đọc thấy 'trôi' không phải duyệt chuyên môn. Một lượt Claude khác có thể giúp phát hiện lỗi nhưng không thay được người duyệt. Rút ngắn không thay được việc duyệt."
        },
        {
          q: "A product manager asks Claude to compare four project-management tools across price, integrations, learning curve, and security features so the team can decide in a meeting. Which output format is MOST appropriate?",
          options: [
            "Four separate paragraphs, one per tool",
            "A single bulleted list of all features mentioned",
            "A JSON object for each tool",
            "A comparison table with tools as rows and criteria as columns, followed by a short note on trade-offs"
          ],
          answer: 3,
          explain: "So sánh nhiều phương án theo nhiều tiêu chí để thảo luận trong cuộc họp thì bảng là định dạng dễ đọc nhất, kèm ghi chú ngắn về đánh đổi. Bốn đoạn văn khiến người đọc phải tự so. Danh sách gộp làm mất liên hệ giữa công cụ và tiêu chí. JSON hợp cho phần mềm đọc, không hợp cho người đọc trong cuộc họp."
        }
      ]
    },
    {
      id: "d3",
      name: "Product and Model Selection",
      weight: 12,
      intro: `<p>Domain này hỏi bạn <strong>chọn đúng công cụ cho việc</strong>: chat thường, Project, Research hay artifact; Haiku, Sonnet hay Opus khi cân chi phí, tốc độ và chất lượng; và xử lý giới hạn context: khi nào mở chat mới, khi nào tóm tắt, khi nào lưu lại.</p><p>Ranh giới: D3 hỏi <em>có nên</em> dùng Project hay không; cách viết instructions, chọn knowledge, chia sẻ Project là D5. Đề dùng từ vựng Haiku, Sonnet, Opus; docs hiện nay còn có tầng Fable, được nhắc ngắn trong bài.</p>`,
      lessons: [
        {
          id: "l-3-1",
          title: "Chọn tính năng: chat, Project, Research hay artifact",
          minutes: 11,
          html: `<p>Nguyên tắc chung: <strong>mặc định dùng chat thường</strong>, chỉ nâng lên tính năng khác khi có lý do cụ thể: cần bối cảnh dùng lại nhiều lần, cần tìm kiếm sâu trên nhiều nguồn, hoặc cần một sản phẩm để lưu và chỉnh tiếp.</p>
<h4>Chat thường</h4>
<p>Hợp cho việc một lần: hỏi nhanh, soạn một email, giải thích một khái niệm, phân tích một file vừa đính kèm. Nếu cần thông tin mới trên mạng, bật web search: help center nói mỗi câu trả lời có dùng web search đều kèm trích dẫn để bạn kiểm.</p>
<h4>Project</h4>
<p>Help center định nghĩa Project là không gian làm việc riêng, có <strong>lịch sử chat riêng và knowledge base riêng</strong>, cộng với project instructions áp dụng cho mọi chat trong Project. Dùng khi:</p>
<ul>
<li>Việc <strong>lặp lại</strong> trên cùng bộ tài liệu (sổ tay sản phẩm, chính sách nhân sự, hồ sơ một khách hàng).</li>
<li>Bạn muốn mọi cuộc chat đều theo cùng một vai, giọng văn, quy trình mà không phải dán lại.</li>
<li>Cả nhóm cần dùng chung bối cảnh (chia sẻ Project có trên gói Team và Enterprise).</li>
</ul>
<p>Lưu ý: các chat trong cùng Project không tự đọc được nội dung của nhau; thứ gì muốn mọi chat đều biết phải nằm trong knowledge hoặc instructions.</p>
<h4>Research</h4>
<p>Exam guide gọi là "research mode"; trong app tính năng tên là <strong>Research</strong> (bật ở nút "+"). Khác với web search trong chat (tìm vài lượt cho một câu hỏi), Research chạy <strong>nhiều lượt tìm nối tiếp nhau</strong>, dựa vào kết quả trước để chọn hướng tìm tiếp, xử lý từng câu hỏi mở, và có thể tìm cả trong các công cụ đã kết nối như Google Workspace. Help center ghi: dành cho gói trả phí, cần bật web search, và tiêu hao hạn mức nhanh hơn chat thường.</p>
<p>Dùng khi câu hỏi rộng, cần tổng hợp nhiều nguồn (phân tích thị trường, tổng quan quy định của một ngành). Không cần cho câu hỏi tra cứu một dữ kiện.</p>
<h4>Artifact</h4>
<p>Artifact là nội dung Claude tạo ra mở ở khung bên cạnh chat để xem, chỉnh, quay lại và chia sẻ: tài liệu, slide, sơ đồ, dashboard, trang web một trang, công cụ tương tác nhỏ. Help center nói Claude tạo artifact khi nội dung đáng kể, độc lập và có khả năng được dùng lại. Dùng khi kết quả là <strong>một sản phẩm</strong> bạn sẽ tiếp tục chỉnh hoặc gửi cho người khác, không phải một câu trả lời đọc xong là xong.</p>
<h4>Bảng quyết định nhanh</h4>
<table>
<thead><tr><th>Tình huống</th><th>Chọn</th></tr></thead>
<tbody>
<tr><td>Hỏi nhanh một lần, có hoặc không có file</td><td>Chat</td></tr>
<tr><td>Cần dữ kiện mới, có nguồn</td><td>Chat + web search</td></tr>
<tr><td>Câu hỏi rộng, tổng hợp nhiều nguồn, báo cáo có trích dẫn</td><td>Research</td></tr>
<tr><td>Làm đi làm lại trên cùng tài liệu và chỉ dẫn, hoặc cả nhóm dùng chung</td><td>Project</td></tr>
<tr><td>Kết quả là tài liệu/slide/công cụ cần chỉnh tiếp và chia sẻ</td><td>Artifact</td></tr>
</tbody>
</table>
<p>Các tính năng kết hợp được: bạn có thể chạy Research trong một Project, và kết quả viết thành artifact.</p>
<div class="tip">Câu hỏi D3 thường có một chi tiết quyết định: "mỗi tuần", "cả nhóm", "cùng bộ tài liệu" → Project; "nhiều nguồn", "tổng quan", "báo cáo có trích dẫn" → Research; "chỉnh tiếp", "chia sẻ", "dashboard" → artifact. Không có chi tiết nào như vậy → chat thường là đủ.</div>
<div class="warn">Đừng chọn tính năng nặng nhất "cho chắc". Research cho một câu tra cứu đơn giản chỉ tốn thời gian và hạn mức; Project cho một việc làm một lần là thừa.</div>`,
          keypoints: [
            "Mặc định dùng chat thường; chỉ nâng lên tính năng khác khi có lý do cụ thể.",
            "Project: lịch sử chat + knowledge + instructions riêng; hợp việc lặp lại, cùng tài liệu, dùng chung nhóm.",
            "Research: nhiều lượt tìm nối tiếp, tổng hợp nhiều nguồn; gói trả phí, cần web search, tốn hạn mức hơn.",
            "Artifact: sản phẩm độc lập để chỉnh, dùng lại, chia sẻ.",
            "Chat trong cùng Project không đọc được nhau; thứ dùng chung phải nằm trong knowledge/instructions."
          ],
          sources: [
            { t: "What are projects?", u: "https://support.claude.com/en/articles/9517075-what-are-projects-and-how-do-i-use-them" },
            { t: "Using Research on Claude", u: "https://support.claude.com/en/articles/11088861-using-research-on-claude-ai" },
            { t: "What are artifacts?", u: "https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them" },
            { t: "Enabling and using web search", u: "https://support.claude.com/en/articles/10684626-enabling-and-using-web-search" }
          ]
        },
        {
          id: "l-3-2",
          title: "Haiku, Sonnet, Opus: cân chi phí, tốc độ và chất lượng",
          minutes: 10,
          html: `<p>Claude có nhiều tầng model trong cùng một họ. Tầng nào cũng viết tốt và đọc được file; khác biệt thật sự nằm ở <strong>độ khó của việc</strong>, <strong>tốc độ cần có</strong> và <strong>hạn mức/chi phí</strong>.</p>
<h4>Ba tầng trong exam guide</h4>
<table>
<thead><tr><th>Tầng</th><th>Đặc điểm</th><th>Hợp với</th></tr></thead>
<tbody>
<tr><td><strong>Haiku</strong></td><td>Nhanh nhất, nhẹ nhất về hạn mức và chi phí</td><td>Trả lời nhanh, phân loại, trích xuất thông tin, tóm tắt đơn giản, việc khối lượng lớn và lặp lại</td></tr>
<tr><td><strong>Sonnet</strong></td><td>Cân bằng giữa năng lực và tốc độ</td><td>Phần lớn việc hằng ngày: viết, phân tích, code, research, quy trình nhiều bước</td></tr>
<tr><td><strong>Opus</strong></td><td>Suy luận sâu nhất trong ba tầng, chậm hơn, tốn hạn mức hơn</td><td>Việc phức tạp, chuyên sâu, cần suy luận nhiều bước; việc mà Sonnet làm chưa đạt</td></tr>
</tbody>
</table>
<p>Docs hiện nay còn liệt kê <strong>Fable</strong> là tầng mạnh nhất, chậm nhất và nặng hạn mức nhất, dành cho việc dài và quan trọng nhất. Đề viết theo exam guide nên vẫn dùng ba tên Haiku, Sonnet, Opus; logic chọn không đổi.</p>
<h4>Hướng dẫn chọn</h4>
<ul>
<li><strong>Không chắc thì bắt đầu với tầng giữa (Sonnet)</strong>. Hướng dẫn chọn model của Anthropic cho người dùng app nói như vậy.</li>
<li><strong>Việc đơn giản, cần nhanh, khối lượng lớn → Haiku</strong>. Ví dụ: gắn nhãn 2.000 phản hồi khách hàng vào 5 nhóm, trả lời câu hỏi thường gặp ngắn.</li>
<li><strong>Tầng giữa làm chưa đạt sau khi prompt đã tốt → lên Opus</strong>. Dùng tầng nặng cho việc tầng nhẹ làm được chỉ tốn hạn mức mà không thêm lợi ích.</li>
<li><strong>Một lô có cả việc dễ lẫn việc khó → chia lô</strong>: phần đơn giản cho tầng nhẹ, phần khó cho tầng nặng.</li>
<li><strong>Thử trên việc thật</strong>: chạy vài mẫu thật bằng hai tầng rồi so theo tiêu chí, thay vì đoán.</li>
</ul>
<h4>Thử chỉnh effort trước khi đổi model</h4>
<p>Trong app có thiết lập <strong>effort</strong> (mức độ suy nghĩ: Low, Medium, High…). Effort cao hơn thì kỹ hơn nhưng chậm hơn và tốn hạn mức hơn. Docs chọn model của Anthropic nhận xét: chỉnh effort thường là đòn bẩy tốt hơn đổi model. Việc thường ngày giữ mặc định; cần nhanh thì hạ; bài khó thì nâng.</p>
<h4>Chi phí trong app và trên API</h4>
<p>Người dùng app không trả tiền theo token; tầng nặng tiêu hạn mức nhanh hơn. Trên API, bảng giá theo token tăng dần từ Haiku tới Sonnet tới Opus, nên tỉ lệ đó cho bạn hình dung chi phí tương đối. Đề không yêu cầu nhớ giá.</p>
<div class="tip">Mẫu câu hỏi phổ biến: một nhóm cần xử lý số lượng lớn yêu cầu ngắn, đơn giản và cần phản hồi nhanh → tầng nhanh, chi phí thấp (Haiku). Một phân tích phức tạp mà Sonnet đã làm chưa tốt dù prompt đầy đủ → Opus.</div>
<div class="warn">"Luôn dùng model mạnh nhất" là bẫy. Nó chậm hơn, tốn hạn mức hơn, và không sửa được prompt thiếu bối cảnh. Nếu output kém vì prompt mơ hồ, đổi model không phải đáp án.</div>`,
          keypoints: [
            "Haiku: nhanh, nhẹ, việc đơn giản và khối lượng lớn. Sonnet: mặc định cân bằng. Opus: việc phức tạp, suy luận sâu.",
            "Không chắc thì bắt đầu Sonnet; lên Opus khi Sonnet chưa đạt dù prompt đã tốt.",
            "Tầng nặng cho việc nhẹ chỉ tốn hạn mức, không thêm lợi ích; lô hỗn hợp thì chia theo độ khó.",
            "Chỉnh effort thường là đòn bẩy tốt hơn đổi model.",
            "Docs hiện có thêm Fable là tầng nặng nhất; đề dùng từ vựng Haiku/Sonnet/Opus."
          ],
          sources: [
            { t: "Choosing a model", u: "https://platform.claude.com/docs/en/about-claude/models/choosing-a-model" },
            { t: "Models overview", u: "https://platform.claude.com/docs/en/models/overview" },
            { t: "Using extended thinking (effort)", u: "https://support.claude.com/en/articles/10574485-using-extended-thinking" }
          ]
        },
        {
          id: "l-3-3",
          title: "Context có hạn: mở chat mới, tóm tắt hay lưu lại",
          minutes: 11,
          html: `<p><strong>Context window</strong> là lượng thông tin Claude có thể "nhìn thấy" cùng lúc trong một cuộc trò chuyện, tính bằng token. Nó chứa tất cả: tin nhắn của bạn, câu trả lời của Claude, file đính kèm, project instructions, knowledge được nạp, kết quả của web search và connector. Một phần context được giữ chỗ cho câu trả lời, nên cuộc chat dài nhất ngắn hơn con số của context window một chút.</p>
<p>Help center hiện liệt kê context window 1 triệu token cho các model mới nhất trên gói trả phí, và mặc định 200K cho model không được nêu tên. Con số này thay đổi theo model, nên điều cần hiểu là <em>khái niệm</em>: context có hạn, và nhiều hơn chưa chắc tốt hơn.</p>
<h4>Vì sao chat dài không miễn phí</h4>
<ul>
<li><strong>Tốn hạn mức</strong>: help center liệt kê độ dài cuộc trò chuyện là một trong những yếu tố tiêu hao usage; mỗi lượt mới phải xử lý cả phần lịch sử.</li>
<li><strong>Nhiễu</strong>: các hướng đã bỏ, những hiểu nhầm cũ vẫn nằm trong context và có thể kéo câu trả lời lệch.</li>
<li><strong>Chạm giới hạn</strong>: trên gói trả phí có bật code execution, Claude tự động tóm tắt các tin nhắn cũ khi gần đầy để cuộc chat tiếp tục được (lịch sử đầy đủ vẫn được giữ), nhưng việc này cũng tốn thêm usage. Khi chạm giới hạn độ dài, help center khuyên mở cuộc trò chuyện mới hoặc dùng Project.</li>
</ul>
<h4>Ba lựa chọn</h4>
<table>
<thead><tr><th>Tình huống</th><th>Làm gì</th></tr></thead>
<tbody>
<tr><td>Chuyển sang chủ đề khác; chat lạc hướng; một hiểu nhầm cũ cứ quay lại</td><td><strong>Mở chat mới</strong></td></tr>
<tr><td>Việc vẫn tiếp tục nhưng chat đã rất dài</td><td><strong>Tóm tắt rồi chuyển</strong>: nhờ Claude viết bản tóm tắt bàn giao (mục tiêu, quyết định đã chốt, việc còn lại, dữ kiện quan trọng), bạn kiểm lại, rồi dán vào chat mới</td></tr>
<tr><td>Thông tin sẽ cần đi cần lại ở nhiều chat</td><td><strong>Lưu lại</strong>: đưa vào Project knowledge hoặc instructions, lưu thành artifact, hoặc để Memory ghi nhớ sở thích cá nhân</td></tr>
</tbody>
</table>
<h4>Cái gì được nhớ giữa các chat</h4>
<ul>
<li><strong>Memory</strong>: Claude dần ghi nhớ thông tin về bạn theo từng chủ đề khi trò chuyện; bạn xem, sửa, xóa được. Mỗi Project có memory riêng, không lẫn sang Project khác.</li>
<li><strong>Chat search</strong> (gói trả phí): khi bạn yêu cầu, Claude tìm lại nội dung trong các chat cũ; không vượt qua ranh giới Project.</li>
<li><strong>Incognito chat</strong>: không lưu vào lịch sử, không vào memory, không được tìm lại; dùng cho câu hỏi một lần không muốn để lại dấu vết trong memory.</li>
</ul>
<div class="tip">Câu hỏi kiểu "chat đã rất dài, câu trả lời bắt đầu bỏ qua chỉ dẫn đầu tiên, việc vẫn chưa xong" → tóm tắt những gì đã chốt và tiếp tục ở chat mới. Nếu chỉ dẫn đó dùng cho mọi chat về sau → đưa vào Project instructions.</div>
<div class="warn">Đừng dồn mọi thứ vào một chat "để Claude nhớ hết". Context lớn không thay được tổ chức thông tin; dữ liệu cần dùng lâu dài thuộc về Project hoặc artifact, không thuộc về một cuộc chat dài bất tận.</div>`,
          keypoints: [
            "Context window chứa mọi thứ: tin nhắn, câu trả lời, file, instructions, knowledge, kết quả tool.",
            "Chat dài tốn usage hơn, nhiều nhiễu hơn; gói trả phí có tự động tóm tắt khi gần đầy nhưng cũng tốn usage.",
            "Đổi chủ đề hoặc lạc hướng → chat mới. Việc dài → tóm tắt bàn giao rồi chuyển. Dùng lại nhiều lần → lưu vào Project/artifact.",
            "Memory theo chủ đề, có memory riêng cho từng Project; chat search (trả phí) không vượt ranh giới Project.",
            "Incognito: không lưu lịch sử, không vào memory, không được tìm lại."
          ],
          sources: [
            { t: "How large is the context window on paid Claude plans?", u: "https://support.claude.com/en/articles/8606394-how-large-is-the-context-window-on-paid-claude-plans" },
            { t: "How do usage and length limits work?", u: "https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work" },
            { t: "Chat search and memory", u: "https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context" },
            { t: "Use incognito chats", u: "https://support.claude.com/en/articles/12260368-use-incognito-chats" }
          ]
        }
      ],
      cheat: [
        ["Nguyên tắc chọn tính năng", "Mặc định chat; nâng lên khi cần bối cảnh dùng lại / tìm sâu nhiều nguồn / sản phẩm để lưu"],
        ["Project", "Lịch sử chat + knowledge + instructions riêng; việc lặp lại, cùng tài liệu, dùng chung nhóm"],
        ["Research", "Nhiều lượt tìm nối tiếp, tổng hợp nhiều nguồn, có thể tìm trong công cụ kết nối; gói trả phí, cần web search"],
        ["Web search trong chat", "Dữ kiện mới, nhanh; câu trả lời kèm trích dẫn"],
        ["Artifact", "Sản phẩm độc lập (doc, slide, dashboard, công cụ nhỏ) để chỉnh, dùng lại, chia sẻ"],
        ["Haiku", "Nhanh, nhẹ: phân loại, trích xuất, câu hỏi ngắn khối lượng lớn"],
        ["Sonnet", "Mặc định cân bằng; không chắc thì chọn tầng này"],
        ["Opus", "Phức tạp, suy luận sâu; khi Sonnet chưa đạt dù prompt tốt"],
        ["Effort", "Chỉnh effort thường là đòn bẩy tốt hơn đổi model"],
        ["Context window", "Chứa mọi thứ trong chat; có phần giữ cho câu trả lời; dài hơn ≠ tốt hơn"],
        ["Chat mới / tóm tắt / lưu", "Đổi chủ đề → chat mới; việc dài → tóm tắt bàn giao; dùng lại → Project hoặc artifact"],
        ["Memory / chat search / incognito", "Nhớ theo chủ đề, riêng từng Project / tìm chat cũ khi được yêu cầu / không lưu, không nhớ"]
      ],
      quiz: [
        {
          q: "A customer support team wants Claude to draft short replies to thousands of simple, repetitive questions each day (order status explanations, password reset steps). Response speed and cost matter most. Which model choice is MOST appropriate?",
          options: [
            "Haiku, because it is the fastest and lightest tier for high-volume, simple tasks",
            "Opus, because customer-facing text always deserves the highest-quality model regardless of volume or speed",
            "Opus for all replies, with effort set to maximum",
            "Alternate between all tiers randomly to balance usage"
          ],
          answer: 0,
          explain: "Việc đơn giản, lặp lại, khối lượng lớn, ưu tiên tốc độ và chi phí → tầng nhanh và nhẹ nhất (Haiku). Opus tốn hạn mức và chậm hơn mà không thêm lợi ích cho câu trả lời đơn giản; đặt effort tối đa còn tốn hơn nữa. Luân phiên ngẫu nhiên không phải chiến lược chọn model."
        },
        {
          q: "Every week, a policy team answers internal questions using the same set of HR handbooks and wants consistent tone and answer format across all team members. Which TWO steps BEST fit this need? (Choose TWO.)",
          options: [
            "Start a new standard chat each time and paste the handbooks again",
            "Run Research for each internal question",
            "Create a Project and upload the HR handbooks as project knowledge",
            "Ask each team member to save their own copy of the handbooks locally",
            "Add project instructions describing the tone and answer format, and share the Project with the team"
          ],
          answer: [2, 4],
          explain: "Việc lặp lại trên cùng bộ tài liệu, cần thống nhất giọng và định dạng cho cả nhóm → Project: đưa sổ tay vào knowledge và viết project instructions, chia sẻ cho nhóm (Team/Enterprise). Dán lại mỗi lần tốn công và dễ lệch. Research dành cho tổng hợp nhiều nguồn trên mạng, không phải tra cứu nội bộ lặp lại. Bản lưu riêng của mỗi người không giúp Claude và không thống nhất được."
        },
        {
          q: "A strategy consultant needs an overview of how three countries regulate e-scooter rentals, drawing on many sources, with citations she can check. Which feature is MOST appropriate?",
          options: [
            "A standard chat without web search",
            "An artifact containing a blank comparison table",
            "Research, which runs multiple connected searches and synthesizes the findings",
            "A Project with no uploaded files"
          ],
          answer: 2,
          explain: "Câu hỏi rộng, nhiều nguồn, cần tổng hợp → Research: chạy nhiều lượt tìm nối tiếp, chọn hướng tiếp theo từ kết quả trước. Chat không có web search chỉ dựa vào kiến thức sẵn có, không có nguồn mới. Artifact là định dạng đầu ra, không phải cách tìm thông tin. Project rỗng không cung cấp gì."
        },
        {
          q: "A user has been working with Claude on a market analysis in one very long chat over two days. Claude has started overlooking constraints set early on, and the work is not finished. What is the BEST action?",
          options: [
            "Keep going in the same chat and paste the full list of original constraints into every message so Claude cannot forget them as the chat grows",
            "Ask Claude for a handoff summary of goals, decisions, constraints, and open tasks, check it, and continue in a new chat",
            "Switch to Haiku so responses come back faster",
            "Delete the chat and start the analysis over with no prior context"
          ],
          answer: 1,
          explain: "Chat quá dài vừa tốn usage vừa nhiều nhiễu. Tóm tắt bàn giao (đã được bạn kiểm) rồi tiếp tục ở chat mới giữ được những gì đã chốt mà bỏ được phần thừa. Lặp lại ràng buộc mỗi tin nhắn chỉ làm chat dài thêm. Đổi sang Haiku không giải quyết vấn đề context. Xóa và làm lại từ đầu bỏ phí công đã làm."
        },
        {
          q: "An analyst's complex financial modeling questions are getting shallow answers from Sonnet. She has already added full context, data, and clear criteria to her prompt. What should she try NEXT?",
          options: [
            "Switch to Haiku for faster iterations",
            "Remove the data to shorten the prompt",
            "Use Research mode for the modeling questions",
            "Increase the effort setting or move to Opus, then compare results on the same inputs"
          ],
          answer: 3,
          explain: "Prompt đã đủ bối cảnh mà tầng giữa vẫn nông với việc phức tạp → tăng effort hoặc lên Opus, và so trên cùng đầu vào để biết thay đổi có tác dụng không. Haiku nhẹ hơn, không giúp việc khó. Bỏ dữ liệu làm mất bối cảnh. Research dành cho tổng hợp nguồn trên mạng, không phải suy luận trên mô hình tài chính."
        },
        {
          q: "A communications manager asks Claude to create a one-page event agenda that she will keep revising over the next week and then share with the planning committee. Which output approach fits BEST?",
          options: [
            "Have Claude create the agenda as an artifact so it can be edited, revisited, and shared",
            "Ask for the agenda inline in the chat and copy the whole text into a new message each time she wants to make changes",
            "Use Research to generate the agenda",
            "Store the agenda in Claude's memory"
          ],
          answer: 0,
          explain: "Sản phẩm độc lập sẽ chỉnh tiếp nhiều lần rồi chia sẻ → artifact. Trả lời inline rồi chép đi chép lại dễ lẫn phiên bản. Research là công cụ tìm kiếm, không phải nơi soạn tài liệu. Memory dùng để ghi nhớ thông tin về người dùng, không phải nơi lưu tài liệu làm việc."
        }
      ]
    },
    {
      id: "d4",
      name: "Workflow Integration and Solution Design",
      weight: 16,
      intro: `<p>Domain này nhìn rộng hơn một prompt: <strong>đưa Claude vào cách làm việc thật</strong>. Bạn phải biết phân tích yêu cầu và chia quy trình thành từng bước, quyết bước nào giao cho Claude, bước nào giữ cho người, khi nào chỉ bổ trợ (augment) và khi nào thiết kế lại (redesign) quy trình, dùng Claude cho research, lập kế hoạch, tối ưu quy trình, và nói với stakeholder về giá trị cũng như giới hạn của Claude.</p><p>Ranh giới: sửa một prompt viết kém hay chẩn đoán output tệ thuộc D7; chọn model và tính năng thuộc D3. Năng lực trung tâm ở đây là <em>Delegation</em> trong khung 4D.</p>`,
      lessons: [
        {
          id: "l-4-1",
          title: "Phân tích yêu cầu và chia việc: Claude làm phần nào",
          minutes: 12,
          html: `<p>Sai lầm phổ biến nhất khi đưa AI vào công việc là bắt đầu từ công cụ ("ta có Claude rồi, dùng vào đâu nhỉ?") thay vì từ vấn đề. Khung AI Fluency gọi năng lực này là <strong>Delegation</strong>: đặt mục tiêu và quyết định có nên, khi nào và bằng cách nào dùng AI. Nó gồm ba phần:</p>
<ul>
<li><strong>Problem Awareness</strong>: hiểu rõ mục tiêu và bản chất công việc trước khi đưa AI vào.</li>
<li><strong>Platform Awareness</strong>: hiểu khả năng và giới hạn của từng hệ thống AI.</li>
<li><strong>Task Delegation</strong>: phân chia công việc giữa người và AI để tận dụng điểm mạnh của mỗi bên.</li>
</ul>
<h4>Bước 1: định nghĩa vấn đề</h4>
<p>Viết ra: vấn đề là gì, ai đang chịu, đo bằng gì. "Đội pháp chế mất 3 ngày để rà một hợp đồng nhà cung cấp, chủ yếu vì phải đối chiếu tay với danh mục điều khoản chuẩn" là một vấn đề rõ. "Dùng AI cho pháp chế" thì không.</p>
<h4>Bước 2: vẽ quy trình hiện tại</h4>
<p>Quan sát hoặc hỏi người đang làm, rồi chia quy trình thành từng bước nhỏ. Với mỗi bước, trả lời: đầu vào là gì, đầu ra là gì, ai quyết, sai thì hậu quả ra sao, có kiểm được kết quả không.</p>
<h4>Bước 3: phân loại từng bước</h4>
<table>
<thead><tr><th>Nhóm</th><th>Đặc điểm</th><th>Ví dụ (rà hợp đồng)</th></tr></thead>
<tbody>
<tr><td><strong>Giao cho Claude</strong></td><td>Lặp lại, dựa trên văn bản, kết quả kiểm được nhanh</td><td>Trích các điều khoản về thanh toán, bồi thường, chấm dứt; đánh dấu chỗ khác mẫu chuẩn</td></tr>
<tr><td><strong>Cộng tác</strong></td><td>Cần phán đoán nhưng Claude giúp tăng tốc</td><td>Soạn ghi chú rủi ro để luật sư rà và sửa</td></tr>
<tr><td><strong>Giữ cho người</strong></td><td>Quyết định cuối, trách nhiệm pháp lý, quan hệ, phán xét về con người</td><td>Quyết định chấp nhận rủi ro, đàm phán với nhà cung cấp, ký</td></tr>
</tbody>
</table>
<p>Khóa học chính thức của Anthropic nhấn mạnh: khi tự động hóa sai bước, kết quả có thể phản tác dụng. Bước tốt để giao là bước mà nếu Claude sai, người ở bước sau phát hiện được trước khi gây hại.</p>
<h4>Bước 4: chốt thước đo thành công</h4>
<p>"Thời gian rà giảm từ 3 ngày xuống 1 ngày, không bỏ sót điều khoản nào trong danh mục rủi ro cao, luật sư vẫn ký duyệt mọi hợp đồng." Tiêu chí đo được giúp bạn biết pilot có thành công không, và giúp nói chuyện với stakeholder.</p>
<h4>Bước 5: chạy thử trên hồ sơ cũ</h4>
<p>Chọn vài hợp đồng đã rà xong (đã biết đáp án), chạy quy trình mới, so kết quả. Đây là cách rẻ nhất để phát hiện bước nào Claude làm tốt, bước nào chưa.</p>
<p>Claude cũng giúp được ở khâu phân tích: dán bản mô tả yêu cầu còn thô và nhờ Claude chỉ ra chỗ mơ hồ, câu hỏi cần hỏi lại stakeholder, trường hợp ngoại lệ chưa tính tới. Nhưng quyết định phạm vi vẫn là của người chủ việc.</p>
<div class="tip">Khi đề hỏi "bước đầu tiên" để đưa Claude vào một quy trình, đáp án thường là hiểu vấn đề và vẽ lại quy trình hiện tại, không phải "triển khai cho toàn bộ phòng ban" hay "chọn model mạnh nhất".</div>
<div class="warn">Giao cả quy trình cho Claude chỉ vì từng bước "có vẻ làm được" là bẫy. Đánh giá riêng từng bước; bước có hậu quả lớn và khó kiểm phải giữ cho người.</div>`,
          keypoints: [
            "Delegation (4D): Problem Awareness, Platform Awareness, Task Delegation.",
            "Xuất phát điểm là một vấn đề đo được, không phải công cụ.",
            "Chia quy trình thành bước; mỗi bước: đầu vào, đầu ra, ai quyết, hậu quả nếu sai, kiểm được không.",
            "Phân loại: giao cho Claude / cộng tác / giữ cho người; tự động hóa sai bước có thể phản tác dụng.",
            "Viết tiêu chí thành công trước và thử trên mẫu việc thật đã biết đáp án."
          ],
          sources: [
            { t: "AI Fluency: Framework & Foundations", u: "https://anthropic.skilljar.com/ai-fluency-framework-foundations" },
            { t: "AI Capabilities and Limitations", u: "https://anthropic.skilljar.com/ai-capabilities-and-limitations" }
          ]
        },
        {
          id: "l-4-2",
          title: "Research, lập kế hoạch, tối ưu quy trình và thiết kế giải pháp",
          minutes: 11,
          html: `<p>Ngoài việc soạn thảo, Claude là trợ thủ tốt cho ba loại việc mang tính tư duy: research, lập kế hoạch và tối ưu quy trình. Nguyên tắc chung cho cả ba: <strong>Claude soạn phương án, người chủ việc quyết</strong>.</p>
<h4>Research: chọn kênh theo nơi chứa thông tin</h4>
<ul>
<li>Thông tin công khai, cần tổng hợp nhiều nguồn → Research hoặc web search.</li>
<li>Thông tin nội bộ đã có trong tài liệu → đưa tài liệu vào chat hoặc Project knowledge.</li>
<li>Thông tin nằm trong email, lịch, Drive → connector.</li>
<li>Thông tin chỉ có trong đầu người (lý do một quyết định cũ, khẩu vị của khách) → phải hỏi người.</li>
</ul>
<p>Khi nhờ Claude xếp hạng phương án (nhà cung cấp, công cụ, địa điểm), hãy đưa <strong>tiêu chí và trọng số</strong> trước. Không có tiêu chí, Claude sẽ tự chọn tiêu chí, và có thể không phải tiêu chí của bạn.</p>
<h4>Lập kế hoạch</h4>
<p>Claude giỏi biến một mục tiêu thành bản kế hoạch có các giai đoạn, phụ thuộc, rủi ro và mốc thời gian, và đặc biệt giỏi chỉ ra những thứ bạn chưa nghĩ tới. Hãy cho Claude các ràng buộc thật (ngân sách, nhân sự, hạn chót) và yêu cầu nêu giả định. Bản kế hoạch là bản nháp để người có trách nhiệm duyệt, chỉnh và chịu trách nhiệm.</p>
<h4>Tối ưu quy trình</h4>
<p>Dán mô tả quy trình hiện tại và nhờ Claude tìm điểm nghẽn, bước trùng lặp, chỗ có thể chuẩn hóa. Hãy coi mỗi đề xuất của Claude là một <strong>giả thuyết</strong> cần kiểm chứng: Claude không thấy được dữ liệu vận hành thật, ràng buộc pháp lý hay lý do lịch sử của một bước. Kiểm giả thuyết với số liệu và với người đang làm việc đó trước khi đổi.</p>
<p>Claude cũng hữu ích để <strong>viết tài liệu quy trình</strong> (SOP): bạn kể lại cách làm, Claude cấu trúc thành các bước, chỉ ra chỗ thiếu ("bước này ai duyệt?", "nếu khách không trả lời thì sao?"). Viết lần lượt từng đoạn của quy trình và nhờ người trực tiếp làm việc đó soát lại.</p>
<h4>Thiết kế giải pháp: vòng lặp bốn bước</h4>
<ol>
<li><strong>Lên kế hoạch</strong>: chuyển yêu cầu ban đầu thành một đặc tả có thể kiểm tra (đầu vào, đầu ra, tiêu chí, ngoại lệ).</li>
<li><strong>Làm</strong>: dựng phiên bản đầu (một Project có instructions, một chuỗi prompt, một artifact).</li>
<li><strong>Đánh giá</strong>: chạy trên trường hợp thật, kể cả trường hợp khó; so với tiêu chí. Không báo lỗi chưa có nghĩa là đạt yêu cầu.</li>
<li><strong>Sửa</strong>: mỗi lần một chỗ, ghi lại thay đổi, đánh giá lại.</li>
</ol>
<h4>Khi nào chuyển cho người khác</h4>
<p>Một associate dùng app Claude giải quyết được nhiều việc, nhưng khi giải pháp cần tích hợp với hệ thống nội bộ, gọi API, xử lý dữ liệu nhạy cảm ở quy mô lớn, hoặc cần kiểm soát bảo mật riêng, hãy chuyển cho đội kỹ thuật (developer, architect) hoặc đội bảo mật thay vì tự chắp vá.</p>
<div class="tip">Câu hỏi về tối ưu quy trình thường có phương án "làm theo ngay đề xuất của Claude". Đáp án tốt hơn gần như luôn có bước kiểm đề xuất với dữ liệu hoặc với người trong cuộc trước khi thay đổi.</div>
<div class="warn">Nhờ Claude "chọn nhà cung cấp tốt nhất" mà không đưa tiêu chí là giao luôn quyết định cho Claude. Đưa tiêu chí và trọng số, và giữ quyết định cuối cho người.</div>`,
          keypoints: [
            "Claude soạn phương án, người chủ việc quyết.",
            "Chọn kênh theo nơi chứa thông tin: Research/web, tài liệu/Project, connector, hoặc hỏi người.",
            "Xếp hạng phương án phải có tiêu chí và trọng số trước.",
            "Đề xuất tối ưu quy trình của Claude là giả thuyết; kiểm với dữ liệu và người làm thật.",
            "Thiết kế giải pháp: lên kế hoạch → làm → đánh giá → sửa; cần tích hợp hệ thống thì chuyển đội kỹ thuật."
          ],
          sources: [
            { t: "Using Research on Claude", u: "https://support.claude.com/en/articles/11088861-using-research-on-claude-ai" },
            { t: "Use connectors to extend Claude's capabilities", u: "https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities" },
            { t: "AI Fluency: Framework & Foundations", u: "https://anthropic.skilljar.com/ai-fluency-framework-foundations" }
          ]
        },
        {
          id: "l-4-3",
          title: "Augment hay redesign, và nói chuyện với stakeholder",
          minutes: 12,
          html: `<h4>Ba kiểu làm việc với AI</h4>
<p>Khung AI Fluency phân biệt ba chế độ tương tác:</p>
<ul>
<li><strong>Automation</strong>: AI thực hiện việc cụ thể theo chỉ dẫn cụ thể; người định nghĩa làm gì, AI làm. Ví dụ: chuyển biên bản họp thành danh sách việc theo mẫu.</li>
<li><strong>Augmentation</strong>: người và AI cộng tác như hai bên cùng suy nghĩ, trao đổi qua lại. Ví dụ: cùng Claude phản biện một chiến lược.</li>
<li><strong>Agency</strong>: người cấu hình để AI tự làm việc thay mình, kể cả tương tác với người hoặc AI khác; người đặt kiến thức và khuôn hành vi thay vì từng hành động. Ví dụ: một trợ lý được cấu hình để trả lời câu hỏi nội bộ theo bộ tài liệu.</li>
</ul>
<h4>Bổ trợ (augment) hay thiết kế lại (redesign)</h4>
<table>
<thead><tr><th></th><th>Augment</th><th>Redesign</th></tr></thead>
<tbody>
<tr><td>Là gì</td><td>Giữ nguyên quy trình, thêm Claude vào một vài bước</td><td>Thiết kế lại quy trình xoay quanh khả năng mới</td></tr>
<tr><td>Khi nào</td><td>Quy trình đang chạy ổn, muốn nhanh hơn ở vài điểm; rủi ro cần thấp</td><td>Nhiều bước tồn tại chỉ vì giới hạn cũ (chép tay, chuyển định dạng, chờ người tổng hợp); augment không đủ để đạt mục tiêu</td></tr>
<tr><td>Rủi ro</td><td>Thấp, dễ quay lại</td><td>Cao hơn: đổi vai trò, đào tạo lại, cần quản lý thay đổi</td></tr>
</tbody>
</table>
<p>Cách làm an toàn: bắt đầu bằng augment ở bước có giá trị rõ, chạy thử có <strong>điểm duyệt của người</strong>, đo theo tiêu chí, rồi mới cân nhắc redesign khi đã có bằng chứng. Ví dụ: đội marketing đầu tiên dùng Claude soạn nháp bài đăng (augment); sau ba tháng thấy khâu chuyển ý tưởng từ họp sang brief chiếm nhiều thời gian nhất, họ thiết kế lại để Claude tạo brief ngay từ ghi chú họp, người duyệt brief thay vì viết từ đầu (redesign).</p>
<h4>Nói với stakeholder: giá trị thật, giới hạn thật</h4>
<p>Stakeholder (sếp, đội pháp chế, người dùng cuối, khách hàng) cần một bức tranh thực tế về Claude để quyết định. Những điều nên nói rõ:</p>
<ul>
<li><strong>Giá trị cụ thể</strong>: tiết kiệm thời gian ở bước nào, nhất quán hơn ra sao, có số liệu từ pilot.</li>
<li><strong>Claude không biết dữ liệu nội bộ</strong> trừ khi được cung cấp qua file, Project hoặc connector, và có mốc giới hạn kiến thức.</li>
<li><strong>Output có thể sai dù văn phong rất thuyết phục</strong>, và cùng một câu hỏi có thể cho kết quả khác nhau giữa các lần chạy. Vì thế mới có bước người duyệt.</li>
<li><strong>Vai trò</strong>: Claude hỗ trợ người làm việc; trách nhiệm vẫn thuộc về con người.</li>
</ul>
<p>Hãy cam kết về <strong>quy trình kiểm soát</strong> (mọi email gửi khách đều được người duyệt; mọi số liệu đều đối chiếu nguồn), đừng cam kết về <strong>sự hoàn hảo</strong> ("AI không bao giờ sai"). Báo cáo pilot trung thực: nêu cả trường hợp Claude làm sai và cách quy trình bắt được lỗi. Một báo cáo chỉ có điểm tốt sẽ mất uy tín ngay lần đầu có sự cố.</p>
<div class="tip">Đáp án đúng cho câu hỏi về stakeholder thường cân bằng: nêu lợi ích cụ thể có số liệu, nêu giới hạn và biện pháp kiểm soát. Phương án hứa "độ chính xác 100%" hoặc "thay thế hoàn toàn nhân viên" là bẫy; phương án quá bi quan "AI không đáng tin, không nên dùng" cũng là bẫy.</div>
<div class="warn">Đừng nhảy thẳng vào redesign toàn bộ quy trình khi chưa có pilot. Rủi ro cao và khó quay lại.</div>`,
          keypoints: [
            "Ba chế độ: Automation (AI làm theo chỉ dẫn cụ thể), Augmentation (cùng suy nghĩ), Agency (AI tự làm theo cấu hình).",
            "Augment: thêm Claude vào bước có sẵn, rủi ro thấp. Redesign: làm lại quy trình khi bước cũ tồn tại vì giới hạn cũ.",
            "Bắt đầu augment, pilot có điểm duyệt, đo, rồi mới redesign.",
            "Với stakeholder: giá trị cụ thể, giới hạn thật (không biết dữ liệu nội bộ, có thể sai trôi chảy, không nhất quán giữa các lần).",
            "Cam kết quy trình kiểm soát, không cam kết hoàn hảo; báo cáo pilot trung thực cả lỗi."
          ],
          sources: [
            { t: "AI Fluency: Framework & Foundations", u: "https://anthropic.skilljar.com/ai-fluency-framework-foundations" },
            { t: "AI Capabilities and Limitations", u: "https://anthropic.skilljar.com/ai-capabilities-and-limitations" },
            { t: "Claude 101", u: "https://anthropic.skilljar.com/claude-101" }
          ]
        }
      ],
      cheat: [
        ["Delegation (4D)", "Problem Awareness, Platform Awareness, Task Delegation"],
        ["Bước đầu tiên", "Hiểu vấn đề đo được + vẽ lại quy trình hiện tại; không bắt đầu từ công cụ"],
        ["Chia việc", "Mỗi bước: đầu vào, đầu ra, ai quyết, hậu quả nếu sai, kiểm được không"],
        ["Giao / cộng tác / giữ", "Lặp lại, kiểm được → Claude; cần phán đoán → cộng tác; quyết định cuối, trách nhiệm → người"],
        ["Tự động hóa sai bước", "Có thể phản tác dụng; bước giao tốt là bước lỗi được bắt trước khi gây hại"],
        ["Research/kế hoạch/tối ưu", "Claude soạn phương án, người chủ việc quyết; đề xuất tối ưu là giả thuyết"],
        ["Xếp hạng phương án", "Đưa tiêu chí và trọng số trước"],
        ["Automation / Augmentation / Agency", "AI làm theo lệnh / cùng suy nghĩ / AI tự làm theo cấu hình"],
        ["Augment vs redesign", "Thêm vào bước có sẵn (rủi ro thấp) vs làm lại quy trình (sau pilot, có bằng chứng)"],
        ["Pilot", "Mẫu việc thật đã biết đáp án, có điểm duyệt của người, đo theo tiêu chí viết trước"],
        ["Stakeholder", "Giá trị cụ thể + giới hạn thật + quy trình kiểm soát; không cam kết hoàn hảo"],
        ["Chuyển đội kỹ thuật", "Khi cần tích hợp hệ thống, API, bảo mật riêng, dữ liệu nhạy cảm quy mô lớn"]
      ],
      quiz: [
        {
          q: "A department head says, 'We have Claude licenses now; let's use AI in procurement.' As the associate asked to lead this, what should you do FIRST?",
          options: [
            "Roll Claude out to the whole procurement team at once and collect feedback after a month to see where it helps most",
            "Pick the most capable model and write a general procurement prompt",
            "Ask Claude to recommend which procurement tasks to automate",
            "Identify a specific, measurable procurement problem and map how the current process actually works step by step"
          ],
          answer: 3,
          explain: "Delegation bắt đầu từ Problem Awareness: hiểu vấn đề cụ thể, đo được và quy trình hiện tại trước khi quyết Claude làm phần nào. Triển khai cho cả đội khi chưa có vấn đề rõ là bắt đầu từ công cụ. Chọn model là bước sau. Claude không biết quy trình thật của công ty nên không thể tự quyết nên tự động hóa gì."
        },
        {
          q: "An HR team is mapping its hiring workflow to decide where Claude fits. Which step is MOST appropriate to KEEP with a human decision-maker?",
          options: [
            "Formatting interview notes into a standard template",
            "Making the final decision on which candidate receives an offer",
            "Drafting a first version of the job posting from a list of requirements",
            "Summarizing common questions candidates ask about benefits"
          ],
          answer: 1,
          explain: "Quyết định cuối về con người (ai được nhận) là việc có hậu quả lớn, cần phán xét và trách nhiệm, thuộc lĩnh vực việc làm mà Usage Policy coi là rủi ro cao — phải giữ cho người. Định dạng ghi chú, soạn nháp tin tuyển dụng, tóm tắt câu hỏi thường gặp đều là việc lặp lại, kiểm được, hợp để giao cho Claude."
        },
        {
          q: "Claude reviewed a description of a team's invoice-approval process and suggested removing a second-approval step to save time. What should the operations lead do?",
          options: [
            "Remove the step immediately, since Claude identified it as redundant",
            "Ignore the suggestion, since Claude does not understand finance",
            "Treat it as a hypothesis: find out why the step exists, check error and fraud data, and consult the people involved",
            "Ask Claude to rewrite the suggestion more persuasively, with estimated time savings, so leadership approves the change quickly"
          ],
          answer: 2,
          explain: "Đề xuất tối ưu của Claude là giả thuyết: Claude không thấy dữ liệu vận hành, yêu cầu kiểm soát nội bộ hay lý do lịch sử của bước duyệt thứ hai (có thể là kiểm soát gian lận). Phải kiểm với dữ liệu và người trong cuộc. Làm theo ngay là rủi ro; bỏ qua hoàn toàn thì mất một gợi ý có thể có giá trị; viết lại cho thuyết phục hơn là bỏ qua bước kiểm."
        },
        {
          q: "A team wants to bring Claude into its weekly client-reporting process, which currently works but is slow. Which TWO approaches are MOST appropriate as a starting point? (Choose TWO.)",
          options: [
            "Start by adding Claude to one or two time-consuming steps (such as drafting the narrative from approved data) while keeping the rest of the process unchanged",
            "Redesign the entire reporting process around Claude before running any test",
            "Run a pilot on a few real past reports, with a human reviewing every output against defined success criteria",
            "Let Claude send reports directly to clients to measure time savings",
            "Skip success criteria and judge the pilot by how the team feels afterward"
          ],
          answer: [0, 2],
          explain: "Quy trình đang chạy ổn chỉ chậm → bắt đầu bằng augment ở bước tốn thời gian, và pilot trên báo cáo thật có người duyệt và tiêu chí thành công. Redesign toàn bộ khi chưa thử là rủi ro cao. Gửi thẳng cho khách bỏ mất điểm duyệt ở nội dung đối ngoại. Không có tiêu chí thì không biết pilot có thành công hay không."
        },
        {
          q: "A manager is presenting a Claude pilot to leadership. During the pilot, Claude saved significant drafting time but produced two drafts with incorrect figures, which reviewers caught. How should the manager present the results?",
          options: [
            "Report the time savings with numbers, describe the two errors and how review caught them, and keep human review in the rollout",
            "Report only the time savings, since the errors were caught and did not reach clients",
            "Report that Claude is 100% accurate once reviewed, so review can be removed later",
            "Recommend against rollout, because a tool that produced incorrect figures in a pilot cannot be trusted with client-facing reports"
          ],
          answer: 0,
          explain: "Báo cáo trung thực cân bằng: lợi ích có số liệu, lỗi thật, và biện pháp kiểm soát đã bắt được lỗi. Giấu lỗi làm mất uy tín khi có sự cố. Hứa '100% chính xác' là hứa hoàn hảo. Bác bỏ hoàn toàn bỏ qua việc quy trình có người duyệt đã kiểm soát được rủi ro."
        },
        {
          q: "An events team used Claude for six months to draft attendee emails one at a time. They now notice that most of their time goes into manually copying details from the registration spreadsheet into each draft, a step that exists only because of how the old tools worked. Which approach does this situation BEST support?",
          options: [
            "Keep augmenting the same drafting step, but write longer and more detailed prompts so each individual email takes less editing",
            "Stop using Claude, because the gains have plateaued",
            "Redesign the workflow so Claude drafts emails in batches directly from the spreadsheet data for human review, then pilot it",
            "Ask each team member to choose their own approach"
          ],
          answer: 2,
          explain: "Khi một bước tồn tại chỉ vì giới hạn của công cụ cũ và augment đã chạm trần, đó là tín hiệu để redesign quy trình quanh khả năng mới — vẫn giữ người duyệt và pilot trước. Prompt dài hơn không bỏ được bước chép tay. Dừng dùng Claude bỏ qua cơ hội rõ ràng. Mỗi người một kiểu làm mất tính nhất quán."
        }
      ]
    },
    {
      id: "d5",
      name: "Configuration and Knowledge Management",
      weight: 12,
      intro: `<p>Domain này hỏi về <strong>cấu hình để Claude làm đúng lâu dài</strong>: cái gì đưa vào project instructions, cái gì đưa vào project knowledge, file tải lên và connector cho Claude thấy gì và theo quyền của ai, viết chỉ dẫn cấp hệ thống thế nào, và giữ cấu hình luôn đúng khi tài liệu thay đổi.</p><p>Ranh giới: quyết định <em>có nên</em> dùng Project thay vì chat thường là D3. D5 giả định bạn đã chọn dùng Project và hỏi cách dựng, chia sẻ, bảo trì nó.</p>`,
      lessons: [
        {
          id: "l-5-1",
          title: "Project: instructions, knowledge và chia sẻ",
          minutes: 12,
          html: `<h4>Claude thấy gì khi bạn mở một chat trong Project</h4>
<ul>
<li><strong>Project instructions</strong>: chỉ dẫn áp dụng cho mọi chat trong Project (vai, giọng, quy trình, định dạng).</li>
<li><strong>Project knowledge</strong>: tài liệu, file văn bản, đoạn code bạn tải lên; mọi chat trong Project đều dùng được.</li>
<li><strong>Memory của Project</strong>: mỗi Project có memory riêng; chat trong Project dùng memory của Project cộng memory chung của tài khoản, không bao giờ dùng memory của Project khác.</li>
<li>Tin nhắn và file của chính cuộc chat đó.</li>
</ul>
<p>Hai điều Claude <strong>không</strong> thấy: tên và mô tả Project (help center ghi rõ Claude không đọc được hai trường này, nên đừng viết chỉ dẫn vào đó), và nội dung các chat khác trong cùng Project.</p>
<h4>Instructions hay knowledge?</h4>
<p>Phép thử: nội dung này <em>chỉ cho Claude cách hành xử</em>, hay <em>cung cấp thông tin để tra cứu</em>?</p>
<table>
<thead><tr><th>Project instructions (hướng dẫn hành vi)</th><th>Project knowledge (tài liệu tham khảo)</th></tr></thead>
<tbody>
<tr><td>"Bạn hỗ trợ đội chăm sóc khách hàng; trả lời ngắn, thân thiện; luôn dẫn tên tài liệu chính sách đã dùng; không hứa hoàn tiền, chuyển cho trưởng ca."</td><td>Chính sách đổi trả 2026, bảng giá dịch vụ, mẫu email đã được duyệt, danh sách câu hỏi thường gặp</td></tr>
</tbody>
</table>
<p>Nhét cả chính sách 30 trang vào instructions khiến chỉ dẫn quan trọng bị chìm; ngược lại, để quy tắc giọng văn trong một file knowledge thì Claude có thể không coi đó là chỉ dẫn bắt buộc.</p>
<h4>Ba tầng chỉ dẫn</h4>
<ul>
<li><strong>Instructions for Claude</strong> (trước đây gọi là profile preferences): áp dụng cho mọi cuộc trò chuyện của bạn.</li>
<li><strong>Project instructions</strong>: chỉ áp dụng trong một Project.</li>
<li><strong>Skills</strong>: gói chỉ dẫn, script, tài nguyên cho một loại việc chuyên biệt, Claude chỉ nạp khi liên quan.</li>
</ul>
<h4>Knowledge lớn: RAG</h4>
<p>Help center mô tả: khi knowledge của Project gần chạm giới hạn context window, Claude tự động chuyển sang <strong>RAG</strong> (retrieval augmented generation), mở rộng dung lượng lên tới khoảng 10 lần; không có nút bật tay, và Claude dùng công cụ tìm trong project knowledge thay vì nạp hết. Tính năng này dành cho gói trả phí. Để tìm tốt, help center khuyên: tải đủ tài liệu từ đầu, đặt tên file rõ ràng, nhóm tài liệu liên quan, và nêu tên tài liệu trong câu hỏi khi biết.</p>
<h4>Chia sẻ (Team và Enterprise)</h4>
<ul>
<li><strong>Private</strong>: chỉ người được mời. <strong>Organization</strong>: mọi người trong tổ chức xem và dùng được.</li>
<li>Quyền <strong>Can view</strong>: xem nội dung, knowledge, instructions và chat trong Project, không sửa. <strong>Can edit</strong>: sửa instructions, knowledge, quản lý thành viên.</li>
<li>Chia sẻ Project <strong>không</strong> chia sẻ các chat của bạn; chat được chia sẻ riêng từng cái.</li>
<li>Admin có thể tắt chia sẻ Project cho cả tổ chức.</li>
</ul>
<div class="tip">Câu hỏi "Claude không làm theo quy tắc định dạng dù quy tắc nằm trong mô tả Project" → Claude không đọc được mô tả Project; chuyển quy tắc vào project instructions.</div>
<div class="warn">Cấp Can edit cho cả nhóm "cho tiện" nghĩa là ai cũng sửa được instructions và knowledge dùng chung. Hầu hết người dùng chỉ cần Can view; giữ quyền sửa cho người phụ trách.</div>`,
          keypoints: [
            "Instructions = hướng dẫn hành vi (vai, giọng, quy trình, định dạng); knowledge = tài liệu tham khảo (chính sách, sổ tay, mẫu).",
            "Claude không đọc tên và mô tả Project, không đọc chat khác trong cùng Project.",
            "Ba tầng: Instructions for Claude (mọi chat) → project instructions (một Project) → Skills (nạp khi cần).",
            "Knowledge gần đầy context → tự động RAG (gói trả phí); đặt tên file rõ, nêu tên tài liệu trong câu hỏi.",
            "Chia sẻ: Private/Organization; Can view/Can edit; chia sẻ Project không chia sẻ chat."
          ],
          sources: [
            { t: "How can I create and manage projects?", u: "https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects" },
            { t: "RAG for projects", u: "https://support.claude.com/en/articles/11473015-retrieval-augmented-generation-rag-for-projects" },
            { t: "Project visibility and sharing", u: "https://support.claude.com/en/articles/9519189-project-visibility-and-sharing" },
            { t: "Understanding Claude's personalization features", u: "https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features" }
          ]
        },
        {
          id: "l-5-2",
          title: "File và connector: Claude thấy gì, mới tới đâu, theo quyền của ai",
          minutes: 11,
          html: `<p>Có ba cách đưa thông tin cho Claude: <strong>đính kèm file vào chat</strong> (chỉ chat đó dùng), <strong>tải vào project knowledge</strong> (mọi chat trong Project dùng), và <strong>connector</strong> (Claude truy cập ứng dụng của bạn khi cần). Mỗi cách khác nhau ở phạm vi, độ mới và quyền truy cập.</p>
<h4>File tải lên</h4>
<p>Help center liệt kê các định dạng phổ biến: PDF, DOCX, CSV, TXT, HTML, JSON, XLSX (XLSX cần bật tính năng code execution/tạo file), và ảnh JPEG, PNG, GIF, WebP. Với file trong project knowledge, Claude chủ yếu dùng phần văn bản được trích ra (PDF có thể được đọc cả phần hình ảnh). Bài học thực tế: một biểu đồ dạng ảnh nhúng trong file Word có thể không được Claude "nhìn thấy" như bạn tưởng; nếu số liệu quan trọng, đưa chúng dưới dạng văn bản hoặc bảng.</p>
<h4>Connector</h4>
<p>Connector cho phép Claude truy cập ứng dụng và dịch vụ của bạn để lấy dữ liệu và thực hiện hành động. Điểm cốt lõi: <strong>Claude kế thừa quyền của chính người dùng</strong> trong dịch vụ được kết nối. Claude không thấy được thứ bạn không có quyền xem.</p>
<p>Ví dụ với Google Workspace theo help center:</p>
<ul>
<li><strong>Gmail</strong>: tìm, đọc, soạn nháp; gửi/trả lời/chuyển tiếp cần bạn phê duyệt theo mặc định; chỉ thấy thông tin mô tả của file đính kèm, không đọc nội dung file đính kèm.</li>
<li><strong>Google Calendar</strong>: xem, tạo, sửa, xóa sự kiện; tìm giờ trống chung.</li>
<li><strong>Google Drive</strong>: tìm và đọc tài liệu; chỉ trích văn bản, ảnh nhúng không được xử lý; chia sẻ/di chuyển/xóa cần phê duyệt theo mặc định.</li>
</ul>
<h4>Độ mới của dữ liệu</h4>
<ul>
<li>File Google Docs thêm vào chat hoặc Project là <strong>bản đồng bộ</strong> theo phiên bản mới nhất trên Drive.</li>
<li>Dùng connector trong chat thì dữ liệu được <strong>lấy tại thời điểm hỏi</strong>, chỉ khi cần.</li>
<li>File tải lên từ máy là <strong>bản sao tĩnh</strong> tại lúc tải: tài liệu gốc đổi thì bản trong Project không đổi theo, bạn phải thay.</li>
</ul>
<h4>Quyền truy cập trên gói Team và Enterprise</h4>
<ol>
<li>Owner bật connector cho tổ chức (bật không có nghĩa là ai cũng truy cập được).</li>
<li>Mỗi thành viên tự xác thực tài khoản của mình.</li>
<li>Owner có thể đặt từng công cụ là luôn cho phép, cần phê duyệt, hoặc bị chặn; các giới hạn chỉ thu hẹp quyền.</li>
<li>Quyền của người dùng trong chính dịch vụ (Drive, Gmail…) vẫn áp dụng.</li>
</ol>
<p>Help center cũng ghi: trên Team/Enterprise, connector chỉ dùng được trong Project riêng tư (private).</p>
<h4>Connector tùy chỉnh và chi phí</h4>
<p>Bạn có thể thêm connector tùy chỉnh bằng URL của một remote MCP server. Anthropic không kiểm định các connector tùy chỉnh, nên chỉ dùng server đáng tin. Ngoài ra, công cụ và connector tiêu tốn nhiều token; help center khuyên tắt những cái không dùng để tiết kiệm context và hạn mức.</p>
<div class="tip">Câu hỏi "Claude trả lời theo phiên bản cũ của tài liệu" → kiểm xem tài liệu được tải lên như bản sao tĩnh (cần thay) hay đồng bộ từ Drive. Câu hỏi "Claude không thấy thư mục X trên Drive" → kiểm quyền của chính người dùng trong Drive và việc admin đã bật connector chưa.</div>
<div class="warn">Bật connector không mở rộng quyền. Nếu một nhân viên không có quyền xem thư mục lương trên Drive, Claude dùng connector của họ cũng không xem được — và đó là điều đúng.</div>`,
          keypoints: [
            "Ba đường: file đính kèm chat (một chat), project knowledge (cả Project), connector (lấy khi cần).",
            "Connector kế thừa quyền của người dùng trong dịch vụ; bật connector không mở rộng quyền.",
            "Gmail: đọc, soạn nháp; gửi cần phê duyệt mặc định; không đọc nội dung file đính kèm. Drive: chỉ văn bản, không xử lý ảnh nhúng.",
            "File tải lên là bản sao tĩnh; Google Docs thêm vào đồng bộ bản mới nhất; connector lấy dữ liệu lúc hỏi.",
            "Team/Enterprise: owner bật, từng người xác thực, owner đặt quy tắc từng công cụ; connector tùy chỉnh chỉ dùng server tin cậy."
          ],
          sources: [
            { t: "Uploading files to Claude", u: "https://support.claude.com/en/articles/8241126-uploading-files-to-claude" },
            { t: "Use connectors to extend Claude's capabilities", u: "https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities" },
            { t: "Use Google Workspace connectors", u: "https://support.claude.com/en/articles/10166901-use-google-workspace-connectors" }
          ]
        },
        {
          id: "l-5-3",
          title: "Viết chỉ dẫn cấp hệ thống và bảo trì cấu hình",
          minutes: 12,
          html: `<p>"Chỉ dẫn cấp hệ thống" trong exam guide ứng với <strong>project instructions</strong> và <strong>Instructions for Claude</strong> trong app: những lời dặn áp dụng cho mọi cuộc chat trong phạm vi của nó. Viết tốt một lần thì mọi người dùng Project đều được hưởng; viết kém thì mọi người đều chịu.</p>
<h4>Nội dung nào thuộc chỉ dẫn hệ thống</h4>
<p>Chỉ những thứ <strong>ổn định và đúng cho mọi chat</strong>: vai trò, người đọc mặc định, giọng, định dạng chuẩn, quy tắc dùng nguồn, cách xử lý khi không chắc. Yêu cầu riêng của một lần (bài này cần 300 chữ) để trong tin nhắn.</p>
<h4>Bộ khung gợi ý</h4>
<ol>
<li><strong>Vai và mục tiêu</strong>: "Bạn hỗ trợ đội bán hàng B2B soạn tài liệu cho khách."</li>
<li><strong>Người đọc</strong>: "Người đọc cuối là trưởng phòng mua hàng, không chuyên kỹ thuật."</li>
<li><strong>Phạm vi</strong>: làm gì và không làm gì ("không báo giá; giá luôn để người bán điền").</li>
<li><strong>Quy tắc nguồn</strong>: "Thông tin sản phẩm chỉ lấy từ tài liệu trong knowledge; nêu tên tài liệu đã dùng."</li>
<li><strong>Định dạng mặc định</strong>: cấu trúc, độ dài, ngôn ngữ.</li>
<li><strong>Khi không chắc</strong>: "Nếu tài liệu không có câu trả lời, nói rõ và gợi ý hỏi đội sản phẩm; không suy đoán."</li>
<li><strong>Lý do</strong> cho các quy tắc quan trọng, để Claude áp dụng đúng tinh thần ở trường hợp mới.</li>
</ol>
<h4>Xung đột chỉ dẫn</h4>
<p>Mâu thuẫn có thể nằm ngay trong một bộ instructions (hai câu nói ngược nhau) hoặc giữa hai lớp chỉ dẫn (Instructions for Claude của một người nói "trả lời thật ngắn", project instructions yêu cầu báo cáo đầy đủ). Hãy đọc lại instructions tìm câu mâu thuẫn, viết cụ thể phạm vi của từng quy tắc ("với email gửi khách thì…; với ghi chú nội bộ thì…"), và xóa quy tắc cũ thay vì chồng quy tắc mới lên.</p>
<h4>Kiểm thử trước khi phát hành</h4>
<p>Chuẩn bị một bộ câu hỏi thật, gồm cả câu khó và câu ngoài phạm vi; chạy thử, chấm theo tiêu chí, sửa instructions, chạy lại cùng bộ câu. Giữ bộ câu này để dùng lại mỗi khi sửa cấu hình.</p>
<h4>Bảo trì: dấu hiệu cấu hình đã lỗi thời</h4>
<p>Triệu chứng và chỗ cần sửa:</p>
<ul>
<li>Claude trích chính sách đã hết hiệu lực → knowledge có tài liệu cũ.</li>
<li>Câu trả lời lúc theo bản này, lúc theo bản kia → có hai phiên bản trùng nhau trong knowledge.</li>
<li>Claude nhắc tới quy trình, tên sản phẩm không còn dùng → instructions cũ.</li>
</ul>
<p><strong>Thay một tài liệu</strong>: (1) gỡ bản cũ, (2) tải bản mới với tên rõ ràng có ngày hoặc phiên bản, (3) cập nhật instructions nếu nhắc tới tài liệu đó, (4) chạy lại bộ câu hỏi thử.</p>
<p><strong>Quản trị</strong>: mỗi Project dùng chung nên có người phụ trách, lịch rà soát định kỳ, và thông báo cho người dùng khi có thay đổi lớn. Khi dự án kết thúc: archive (help center nói archive giữ nguyên chia sẻ, thành viên, quyền và knowledge), gỡ thành viên không còn cần, hoặc xóa nếu không cần giữ.</p>
<div class="tip">Khi đề mô tả "câu trả lời mâu thuẫn giữa các lần, mỗi lần dẫn một phiên bản chính sách khác nhau", đáp án là dọn knowledge (gỡ bản trùng/cũ), không phải đổi model hay viết thêm lời dặn.</div>
<div class="warn">Thêm câu "luôn dùng bản mới nhất" vào instructions mà vẫn để bản cũ trong knowledge không giải quyết được gốc. Gỡ bản cũ.</div>`,
          keypoints: [
            "Chỉ dẫn hệ thống = project instructions / Instructions for Claude; chỉ chứa thứ ổn định, đúng cho mọi chat.",
            "Khung: vai và mục tiêu, người đọc, phạm vi, quy tắc nguồn, định dạng, khi không chắc, lý do.",
            "Xung đột: tìm câu mâu thuẫn, viết rõ phạm vi từng quy tắc, xóa quy tắc cũ thay vì chồng.",
            "Thử bằng bộ câu hỏi thật (kể cả câu khó, ngoài phạm vi) trước khi giao và sau mỗi lần sửa.",
            "Bảo trì: gỡ tài liệu cũ/trùng, đặt tên có phiên bản, có người phụ trách và lịch rà soát; archive giữ nguyên knowledge và quyền."
          ],
          sources: [
            { t: "Understanding Claude's personalization features", u: "https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features" },
            { t: "How can I create and manage projects?", u: "https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects" },
            { t: "Prompting best practices", u: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" }
          ]
        }
      ],
      cheat: [
        ["Instructions vs knowledge", "Hướng dẫn hành vi (vai, giọng, quy trình, định dạng) vs tài liệu tham khảo (chính sách, sổ tay, mẫu)"],
        ["Claude không thấy", "Tên và mô tả Project; nội dung chat khác trong cùng Project"],
        ["Ba tầng chỉ dẫn", "Instructions for Claude (mọi chat) → project instructions → Skills (nạp khi liên quan)"],
        ["RAG cho Project", "Tự bật khi knowledge gần đầy context, tới ~10x dung lượng, gói trả phí; đặt tên file rõ"],
        ["Chia sẻ Project", "Private / Organization; Can view / Can edit; chat không được chia sẻ theo Project"],
        ["Memory của Project", "Riêng từng Project + memory tài khoản; không lẫn Project khác"],
        ["Connector", "Kế thừa quyền của người dùng; bật connector không mở rộng quyền"],
        ["Gmail / Drive", "Gửi cần phê duyệt mặc định, không đọc nội dung file đính kèm / chỉ văn bản, không xử lý ảnh nhúng"],
        ["Bản sao tĩnh / đồng bộ / truy xuất khi hỏi", "File tải lên / Google Docs thêm vào Project / connector trong chat"],
        ["Team/Enterprise connector", "Owner bật → từng người xác thực → quy tắc từng công cụ; chỉ trong Project private"],
        ["Khung chỉ dẫn hệ thống", "Vai, người đọc, phạm vi, nguồn, định dạng, khi không chắc, lý do"],
        ["Bảo trì", "Gỡ bản cũ/trùng → tải bản mới có phiên bản → sửa instructions → chạy lại bộ câu thử"]
      ],
      quiz: [
        {
          q: "A team lead put the rule 'Always answer in a numbered list and cite the source document' into the Project's description field. Claude in that Project ignores the rule. What is the MOST likely fix?",
          options: [
            "Rename the Project to include the rule",
            "Move the rule into the project instructions, since Claude cannot see the Project name or description",
            "Upload the rule as a separate file in project knowledge",
            "Switch to a more capable model"
          ],
          answer: 1,
          explain: "Help center ghi rõ tên và mô tả Project không hiển thị với Claude, nên quy tắc phải nằm trong project instructions. Đổi tên Project cũng vô ích vì lý do đó. Để quy tắc trong một file knowledge thì Claude coi đó là tài liệu tham khảo, không chắc được áp dụng như chỉ dẫn bắt buộc. Đổi model không sửa được việc Claude không thấy quy tắc."
        },
        {
          q: "A customer success team's Project gives inconsistent answers about refund eligibility; sometimes it cites the 2025 policy and sometimes the 2026 policy. Both PDFs are in project knowledge. What should the Project owner do?",
          options: [
            "Remove the 2025 policy, keep the 2026 file with a clear versioned name, update related instructions, and retest",
            "Keep both files and add an instruction telling Claude to prefer the newest document whenever two sources disagree",
            "Ask users to specify the year in every question",
            "Start a new chat whenever the wrong policy is cited"
          ],
          answer: 0,
          explain: "Gốc rễ là knowledge có hai phiên bản trùng nhau. Cách sửa đúng là gỡ bản cũ, giữ bản mới với tên rõ ràng, cập nhật instructions liên quan và thử lại. Thêm lời dặn mà vẫn để bản cũ không giải quyết gốc. Bắt người dùng ghi năm là đẩy gánh nặng cho họ. Chat mới vẫn đọc cùng knowledge lỗi."
        },
        {
          q: "An organization on a Team plan wants staff to use the Google Drive connector in Claude. Which TWO statements about how access works are correct? (Choose TWO.)",
          options: [
            "Once an Owner enables the connector, Claude can read every file in the company's Drive for every user",
            "An Owner must enable the connector for the organization, and each member then authenticates with their own account",
            "Users can see Drive files through Claude that they cannot open in Drive directly",
            "Claude inherits each user's own Drive permissions, so it can only access files that user can access",
            "Custom connectors are verified by Anthropic, so any MCP server URL is safe to add"
          ],
          answer: [1, 3],
          explain: "Trên Team/Enterprise, Owner bật connector cho tổ chức, rồi từng thành viên tự xác thực; Claude kế thừa quyền của chính người dùng đó. Bật connector không cho Claude đọc toàn bộ Drive và không mở rộng quyền, nên hai phương án đầu và thứ ba sai. Help center nói Anthropic không kiểm định connector tùy chỉnh; chỉ dùng server tin cậy."
        },
        {
          q: "A marketing manager is setting up a shared Project for her team. Which content BELONGS in the project instructions rather than project knowledge?",
          options: [
            "The full 40-page brand guidelines PDF, pasted into the instructions so every brand rule applies to every single chat",
            "Last quarter's campaign performance spreadsheet",
            "A library of approved past social media posts",
            "'You help the marketing team write for small-business owners; use a warm, plain tone; never invent product claims'"
          ],
          answer: 3,
          explain: "Instructions mô tả cách Claude hành xử: vai, người đọc, giọng, giới hạn. Câu chỉ dẫn ngắn đó đúng là nội dung instructions. Bộ hướng dẫn thương hiệu dài, bảng số liệu và thư viện bài mẫu là tài liệu tham khảo, thuộc knowledge; nhét chúng vào instructions làm chìm các chỉ dẫn quan trọng."
        },
        {
          q: "A project owner uploaded a pricing sheet from her laptop to project knowledge two months ago. The sheet has since been updated on her laptop, but Claude still quotes old prices. Why, and what should she do?",
          options: [
            "Claude's knowledge cutoff is older than the update; switch to a newer model",
            "RAG is turned off; turn it on manually in settings",
            "The uploaded file is a static copy taken at upload time; replace it with the current version and retest",
            "Project memory stored the old prices; reset all memory"
          ],
          answer: 2,
          explain: "File tải lên từ máy là bản sao tĩnh tại thời điểm tải; tài liệu gốc đổi thì bản trong Project không tự đổi. Phải thay bằng bản mới rồi thử lại. Knowledge cutoff của model không liên quan tới tài liệu bạn cung cấp. RAG không có nút bật tay và không phải nguyên nhân. Memory không phải nơi lưu bảng giá trong tình huống này."
        },
        {
          q: "A team's shared Project has grown messy: several people edit the instructions, old documents remain, and nobody knows which rules are current. Which governance step would MOST improve reliability going forward?",
          options: [
            "Give every team member Can edit access so that anyone who notices a problem can fix the instructions or knowledge files right away",
            "Delete the Project and have everyone use standard chats",
            "Add a line to the instructions asking Claude to ignore outdated documents",
            "Assign an owner, limit edit rights to that owner or a small group, and set a regular review schedule with a test question set"
          ],
          answer: 3,
          explain: "Cấu hình dùng chung cần người phụ trách, giới hạn quyền sửa và lịch rà soát có bộ câu thử. Cho mọi người Can edit chính là nguyên nhân gây lộn xộn. Xóa Project mất luôn giá trị của bối cảnh dùng chung. Dặn Claude bỏ qua tài liệu cũ không gỡ được tài liệu cũ và Claude không biết tài liệu nào đã hết hiệu lực."
        }
      ]
    },
    {
      id: "d6",
      name: "Governance, Risk, and Responsible Use",
      weight: 15,
      intro: `<p>Domain này hỏi về <strong>dùng Claude có trách nhiệm</strong>: việc nào được và không được giao cho Claude, xử lý dữ liệu nhạy cảm, quy định pháp luật, làm việc trong chính sách AI của tổ chức, và các vấn đề đạo đức như trách nhiệm giải trình, minh bạch về việc dùng AI, phụ thuộc quá mức và bias.</p><p>Ranh giới: kỹ thuật kiểm output (fact-check, phát hiện hallucination) là D2. D6 hỏi về quyết định và trách nhiệm: có nên đưa dữ liệu này vào không, ai chịu trách nhiệm, phải nói với ai.</p>`,
      lessons: [
        {
          id: "l-6-1",
          title: "Việc nào giao cho Claude được: Usage Policy và vùng rủi ro cao",
          minutes: 11,
          html: `<p>Mọi người dùng Claude đều phải tuân thủ <strong>Usage Policy</strong> của Anthropic. Một cách ghi nhớ: xếp mỗi việc vào một trong ba nhóm dưới đây.</p>
<h4>Nhóm 1: bị cấm</h4>
<p>Usage Policy liệt kê các nhóm sử dụng bị cấm, ví dụ: hoạt động phi pháp; tấn công hạ tầng trọng yếu; truy cập trái phép hệ thống máy tính (mã độc, tấn công từ chối dịch vụ); vũ khí; bạo lực và thù ghét; xâm phạm quyền riêng tư; xâm hại trẻ em; quấy rối; tin giả và mạo danh; chiến dịch lừa dối (tài khoản ảo, đánh giá giả); can thiệp tiến trình dân chủ; lừa đảo (phishing, giả mạo giấy tờ); lạm dụng nền tảng; nội dung khiêu dâm. Không có ngoại lệ vì lý do kinh doanh.</p>
<h4>Nhóm 2: rủi ro cao, cần người có chuyên môn</h4>
<p>Usage Policy xác định các lĩnh vực rủi ro cao như pháp lý, y tế và chăm sóc sức khỏe, tài chính, tín dụng, bảo hiểm, nhà ở, việc làm, giáo dục và bằng cấp, phúc lợi công, tình trạng pháp lý. Khi Claude tạo ra khuyến nghị trong các lĩnh vực này cho một cá nhân cụ thể, hai yêu cầu chính là:</p>
<ul>
<li><strong>Human-in-the-loop</strong>: một người có chuyên môn phải xem xét thực chất khuyến nghị trước khi nó tới tay người bị ảnh hưởng hoặc được dùng để ra quyết định; người đó có thể sửa và chịu trách nhiệm. Nếu luật yêu cầu giấy phép hành nghề, người duyệt phải có giấy phép.</li>
<li><strong>Disclosure</strong>: người bị ảnh hưởng phải được thông báo rõ rằng AI đã được dùng để tạo ra lời khuyên hoặc quyết định (không bắt buộc nêu tên Anthropic hay Claude).</li>
</ul>
<p>Usage Policy cũng nêu các trường hợp không thuộc diện này, như nội dung giáo dục chung, soạn thảo nội bộ, vận hành kinh doanh không tư vấn cho một cá nhân cụ thể. Ngoài ra, chatbot hoặc agent dành cho người tiêu dùng phải cho người dùng biết họ đang tương tác với AI.</p>
<h4>Nhóm 3: được phép, nhưng có phù hợp không?</h4>
<p>Việc được phép chưa chắc là việc hợp với Claude. Câu hỏi nên đặt: <strong>nếu Claude sai, lỗi có được phát hiện và khắc phục kịp trước khi gây hại không?</strong></p>
<ul>
<li>Hợp: soạn nháp, tóm tắt tài liệu bạn có, phân loại, brainstorm, chuyển định dạng — người dùng kiểm được trước khi dùng.</li>
<li>Cần thận trọng: thông tin cần chính xác tuyệt đối mà không có nguồn kiểm; hành động khó đảo ngược (gửi email hàng loạt, xóa file) qua connector mà không có bước phê duyệt.</li>
</ul>
<p>Khi Claude thực hiện <em>hành động</em> (gửi, sửa lịch, chia sẻ file) thay vì chỉ soạn thảo, rủi ro tăng. Đó là lý do các hành động như gửi email hay chia sẻ file trên Drive mặc định cần phê duyệt.</p>
<h4>Phiên bản chính sách</h4>
<p>Anthropic thông báo phiên bản Usage Policy mới có hiệu lực từ 12/11/2026 và mô tả các yêu cầu cốt lõi cho trường hợp rủi ro cao là không đổi. Với kỳ thi, hãy nắm tinh thần: cấm là cấm; rủi ro cao thì cần người có chuyên môn duyệt và thông báo việc dùng AI.</p>
<div class="tip">Câu hỏi về lĩnh vực rủi ro cao (tuyển dụng, tín dụng, y tế, pháp lý) gần như luôn có đáp án chứa hai ý: người có chuyên môn xem xét trước khi kết quả tới tay người bị ảnh hưởng, và thông báo việc dùng AI. Phương án "cấm hẳn" thường quá tay; phương án "để Claude quyết" luôn sai.</div>
<div class="warn">"Chỉ dùng nội bộ" không tự động đưa việc ra khỏi vùng rủi ro cao. Nếu kết quả được dùng để ra quyết định về một người cụ thể (sa thải, xét duyệt khoản vay), yêu cầu người duyệt vẫn áp dụng.</div>`,
          keypoints: [
            "Ba nhóm: bị cấm (không ngoại lệ), rủi ro cao (người có chuyên môn duyệt + thông báo dùng AI), được phép (vẫn hỏi: lỗi có được phát hiện và khắc phục kịp không).",
            "Lĩnh vực rủi ro cao: pháp lý, y tế, tài chính, tín dụng, bảo hiểm, nhà ở, việc làm, giáo dục, phúc lợi công, tình trạng pháp lý.",
            "Người duyệt phải xem xét thực chất trước khi kết quả tới tay người bị ảnh hưởng, và chịu trách nhiệm.",
            "Chatbot cho người tiêu dùng phải cho biết người dùng đang nói chuyện với AI.",
            "Hành động qua connector rủi ro hơn soạn thảo; giữ bước phê duyệt."
          ],
          sources: [
            { t: "Anthropic Usage Policy", u: "https://www.anthropic.com/legal/aup" },
            { t: "2026 Usage Policy update", u: "https://anthropic.com/news/2026-usage-policy-update" },
            { t: "Use Google Workspace connectors", u: "https://support.claude.com/en/articles/10166901-use-google-workspace-connectors" }
          ]
        },
        {
          id: "l-6-2",
          title: "Dữ liệu nhạy cảm, quyền riêng tư và quy định",
          minutes: 12,
          html: `<p>Nguyên tắc số một: quyết định về dữ liệu phải đưa ra <strong>trước khi bấm gửi</strong>. Không có nút thu hồi dữ liệu đã chia sẻ.</p>
<h4>Dữ liệu nào là nhạy cảm</h4>
<ul>
<li>Thông tin định danh cá nhân: họ tên kèm số giấy tờ, địa chỉ, số điện thoại, ngày sinh.</li>
<li>Sức khỏe, tài chính cá nhân, số tài khoản, thông tin nhân sự (lương, đánh giá, kỷ luật).</li>
<li>Mật khẩu, khóa API, thông tin đăng nhập.</li>
<li>Thông tin mật của khách hàng, bí mật kinh doanh, dữ liệu theo hợp đồng bảo mật.</li>
</ul>
<h4>Giảm thiểu dữ liệu</h4>
<ol>
<li><strong>Bỏ</strong>: chỉ đưa những trường thật sự cần. Phân tích xu hướng khiếu nại không cần tên và số điện thoại khách.</li>
<li><strong>Ẩn danh hoặc thay mã</strong>: thay tên bằng "Khách A", "Nhân viên 042".</li>
<li><strong>Tổng hợp</strong>: đưa số liệu đã gộp (theo vùng, theo tháng) thay vì từng bản ghi.</li>
</ol>
<p>Anthropic cũng khuyến nghị không xử lý dữ liệu cá nhân trong sản phẩm thương mại khi không cần thiết.</p>
<h4>Tài khoản nào, gói nào</h4>
<ul>
<li><strong>Gói cá nhân</strong> (Free, Pro, Max): việc dữ liệu có được dùng để cải thiện model hay không phụ thuộc vào cài đặt quyền riêng tư của người dùng.</li>
<li><strong>Gói thương mại</strong> (Team, Enterprise, API): Anthropic thông báo thay đổi điều khoản cho người dùng cá nhân năm 2025 không áp dụng cho các gói này; mặc định Anthropic không dùng nội dung của khách hàng thương mại để huấn luyện.</li>
<li>Gói Enterprise có thêm các kiểm soát như audit log, cấu hình thời gian lưu dữ liệu tùy chỉnh, và tùy chọn cấu hình sẵn sàng cho HIPAA kèm BAA.</li>
</ul>
<p>Vì vậy, dữ liệu công việc phải đi qua tài khoản công ty được duyệt, không qua tài khoản cá nhân, kể cả khi tài khoản cá nhân "tiện hơn".</p>
<h4>Những điều hay bị hiểu nhầm</h4>
<ul>
<li><strong>Incognito chat</strong> không lưu vào lịch sử hay memory và không dùng để huấn luyện, nhưng help center ghi vẫn được lưu giữ 30 ngày theo mặc định. Incognito không biến dữ liệu bị cấm thành được phép.</li>
<li><strong>Xóa chat</strong>: biến mất khỏi lịch sử ngay, được xóa khỏi hệ thống phía sau trong vòng 30 ngày.</li>
<li><strong>Yêu cầu Claude "quên đi"</strong> không bảo vệ được dữ liệu đã gửi. Biện pháp thật là không gửi dữ liệu đó, hoặc dùng cài đặt và tài khoản phù hợp.</li>
<li>Memory theo help center không lưu một số loại như số giấy tờ tùy thân, số tài khoản tài chính; nhưng đây là lớp bảo vệ của sản phẩm, không thay cho việc bạn tự giảm thiểu dữ liệu.</li>
</ul>
<h4>Quy định pháp luật</h4>
<p>Tùy nơi làm việc và loại dữ liệu, các quy định như GDPR (dữ liệu cá nhân ở châu Âu) hay HIPAA (thông tin sức khỏe ở Mỹ) đặt yêu cầu về việc ai được xử lý dữ liệu, cho mục đích gì, lưu bao lâu. Một associate không cần thuộc từng điều luật, nhưng phải nhận ra khi nào dữ liệu thuộc diện điều chỉnh và <strong>hỏi đội pháp chế, compliance hoặc bảo mật</strong> trước khi đưa vào bất kỳ công cụ AI nào.</p>
<div class="tip">Đáp án tốt cho câu hỏi dữ liệu nhạy cảm thường có dạng: giảm thiểu hoặc ẩn danh dữ liệu trước, dùng tài khoản công ty được duyệt, hỏi compliance khi dữ liệu thuộc diện quy định. Phương án "dùng incognito là đủ" hoặc "dặn Claude giữ bí mật" là bẫy.</div>
<div class="warn">Dán nguyên bảng dữ liệu khách hàng vào chat "để Claude phân tích cho nhanh" là lỗi kinh điển. Hầu hết phân tích chỉ cần vài cột đã ẩn danh.</div>`,
          keypoints: [
            "Quyết định về dữ liệu trước khi gửi; không có nút thu hồi.",
            "Bớt dữ liệu: bỏ trường không cần, ẩn danh/thay mã, tổng hợp.",
            "Dữ liệu công việc đi qua tài khoản công ty được duyệt; gói thương mại mặc định không dùng để huấn luyện.",
            "Incognito vẫn lưu 30 ngày mặc định; xóa chat được purge trong 30 ngày; yêu cầu Claude 'quên' không bảo vệ dữ liệu đã gửi.",
            "Dữ liệu thuộc diện GDPR, HIPAA… → hỏi pháp chế/compliance trước khi dùng."
          ],
          sources: [
            { t: "Updates to our consumer terms", u: "https://www.anthropic.com/news/updates-to-our-consumer-terms" },
            { t: "Claude data privacy FAQ", u: "https://support.claude.com/en/articles/8325621-claude-data-privacy-faq" },
            { t: "Use incognito chats", u: "https://support.claude.com/en/articles/12260368-use-incognito-chats" },
            { t: "What is the Enterprise plan?", u: "https://support.claude.com/en/articles/9797531-what-is-the-enterprise-plan" },
            { t: "Chat search and memory", u: "https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context" }
          ]
        },
        {
          id: "l-6-3",
          title: "Chính sách tổ chức và đạo đức: trách nhiệm, minh bạch, phụ thuộc, bias",
          minutes: 12,
          html: `<h4>Các tầng quy định</h4>
<p>Việc dùng Claude ở nơi làm việc chịu nhiều tầng: pháp luật, Usage Policy của Anthropic, chính sách AI của tổ chức, và quy tắc riêng của nhóm. Quy định ở <strong>cấp gần bạn hơn có thể khắt khe hơn cấp trên</strong>, nhưng không thể cho phép điều cấp trên đã cấm. Ví dụ: Usage Policy cho phép soạn email marketing, nhưng chính sách công ty có thể yêu cầu mọi nội dung đối ngoại do AI hỗ trợ phải qua phòng truyền thông.</p>
<h4>Chính sách được thực thi qua cài đặt admin</h4>
<p>Admin của gói Team và Enterprise biến chính sách thành cài đặt: bật hoặc tắt web search, connector, memory, code execution, chia sẻ Project; trên Enterprise còn có thể tắt model hay mức effort theo vai trò, đặt thời gian lưu dữ liệu, xem audit log. Khi một tính năng bị tắt, đó thường là quyết định có chủ đích.</p>
<h4>Khi gặp giới hạn hoặc vùng xám</h4>
<ul>
<li><strong>Bị chặn</strong>: không tìm đường vòng (tài khoản cá nhân, công cụ khác chưa được duyệt). Nếu có nhu cầu chính đáng, đề xuất với người sở hữu chính sách kèm lý do.</li>
<li><strong>Chính sách không nhắc tới</strong>: đừng tự suy là được phép. Hỏi người phụ trách (quản lý, compliance, bảo mật), nhất là khi có dữ liệu nhạy cảm hoặc nội dung đối ngoại.</li>
<li><strong>Yêu cầu của sếp va với chính sách</strong>: nêu rõ xung đột, đề xuất cách làm tuân thủ, và đưa lên đúng cấp; không lặng lẽ vi phạm.</li>
</ul>
<h4>Diligence: ba phần của trách nhiệm</h4>
<p>Khung AI Fluency gọi nhóm năng lực này là <strong>Diligence</strong>, gồm:</p>
<ul>
<li><strong>Creation Diligence</strong>: cân nhắc dùng hệ thống AI nào và tương tác với nó ra sao.</li>
<li><strong>Transparency Diligence</strong>: trung thực về vai trò của AI trong công việc của bạn với những người cần biết.</li>
<li><strong>Deployment Diligence</strong>: chịu trách nhiệm kiểm và bảo đảm cho output bạn dùng hoặc chia sẻ.</li>
</ul>
<h4>Trách nhiệm thuộc về người dùng output</h4>
<p>"Claude viết vậy" không phải lời bào chữa. Khi bạn gửi, đăng hay dùng một output để ra quyết định, trách nhiệm là của bạn (và của người duyệt trong quy trình), không phải của công cụ.</p>
<h4>Minh bạch về việc dùng AI</h4>
<p>Có những trường hợp bắt buộc: Usage Policy yêu cầu thông báo khi AI tạo khuyến nghị rủi ro cao cho cá nhân, và chatbot cho người tiêu dùng phải cho biết là AI. Ngoài ra, chính sách tổ chức, yêu cầu của khách hàng, quy định của trường học hay tạp chí có thể đặt thêm yêu cầu. Với việc soạn thảo thường ngày, không có quy tắc chung từ Anthropic; hãy theo chính sách tổ chức và hỏi: người nhận có kỳ vọng hợp lý được biết không?</p>
<h4>Phụ thuộc quá mức</h4>
<p>Dùng AI cho mọi việc có thể làm mai một kỹ năng phán đoán mà bạn cần để kiểm chính output đó. Dấu hiệu: chấp nhận output mà không đọc kỹ, không còn tự viết được bản nháp, không giải thích được vì sao kết luận đúng. Cách giữ: tự làm phần cốt lõi của chuyên môn, dùng Claude để phản biện thay vì chỉ để làm hộ, và giữ thói quen kiểm.</p>
<h4>Bias và công bằng</h4>
<p>Khi output dùng cho quyết định về con người (tuyển dụng, đánh giá, phân bổ nguồn lực), bias có hậu quả thật. Đừng dùng Claude để chấm điểm hay xếp hạng người dựa trên các thuộc tính không liên quan; rà output theo góc nhìn của các nhóm bị ảnh hưởng; giữ quyết định cuối ở người có trách nhiệm.</p>
<div class="tip">Câu hỏi "chính sách công ty không nói gì về việc này" → đáp án đúng thường là hỏi người phụ trách chính sách trước khi làm, không phải "được phép vì không bị cấm" và cũng không phải "tuyệt đối không dùng AI".</div>
<div class="warn">Dùng tài khoản Claude cá nhân để làm việc mà công ty đã tắt tính năng tương ứng là vi phạm chính sách, dù mục đích là "cho nhanh".</div>`,
          keypoints: [
            "Các cấp quy định: luật → Usage Policy → chính sách tổ chức → quy tắc nhóm; cấp dưới chỉ được khắt khe hơn.",
            "Admin biến chính sách thành cài đặt; bị chặn thì không đi đường vòng, chính sách im lặng thì hỏi.",
            "Diligence: Creation, Transparency, Deployment.",
            "Ai gửi hoặc dùng output thì người đó chịu trách nhiệm; thông báo dùng AI khi chính sách/luật yêu cầu hoặc người nhận có kỳ vọng hợp lý.",
            "Chống phụ thuộc quá mức: giữ kỹ năng cốt lõi, giữ thói quen kiểm; quyết định về con người phải được rà bias và do người quyết."
          ],
          sources: [
            { t: "AI Fluency: Framework & Foundations", u: "https://anthropic.skilljar.com/ai-fluency-framework-foundations" },
            { t: "Anthropic Usage Policy", u: "https://www.anthropic.com/legal/aup" },
            { t: "Deploying Claude Enterprise with Confidence", u: "https://anthropic.skilljar.com/deploying-claude-enterprise-with-confidence" },
            { t: "What is the Enterprise plan?", u: "https://support.claude.com/en/articles/9797531-what-is-the-enterprise-plan" }
          ]
        }
      ],
      cheat: [
        ["Bị cấm", "Phi pháp, mã độc, vũ khí, lừa đảo, mạo danh, tin giả, đánh giá giả, quấy rối… không ngoại lệ"],
        ["Rủi ro cao", "Pháp lý, y tế, tài chính, tín dụng, bảo hiểm, nhà ở, việc làm, giáo dục, phúc lợi công, tình trạng pháp lý"],
        ["Yêu cầu rủi ro cao", "Người có chuyên môn duyệt thực chất trước khi tới tay người bị ảnh hưởng + thông báo có dùng AI"],
        ["Chatbot cho người tiêu dùng", "Phải cho biết người dùng đang tương tác với AI"],
        ["Câu hỏi phù hợp", "Nếu sai, lỗi có được phát hiện và khắc phục kịp không? Hành động khó đảo ngược cần phê duyệt"],
        ["Giảm thiểu dữ liệu", "Bỏ trường không cần → ẩn danh/thay mã → tổng hợp; quyết định TRƯỚC khi gửi"],
        ["Tài khoản", "Dữ liệu công việc qua tài khoản công ty; gói thương mại mặc định không dùng để huấn luyện"],
        ["Incognito / xóa chat", "Không lịch sử, không memory, không huấn luyện nhưng vẫn lưu 30 ngày / purge trong 30 ngày"],
        ["Quy định (GDPR, HIPAA)", "Nhận ra dữ liệu thuộc diện → hỏi pháp chế/compliance trước"],
        ["Các cấp chính sách", "Luật → Usage Policy → tổ chức → nhóm; cấp dưới chỉ được khắt khe hơn"],
        ["Bị chặn / chính sách im lặng", "Không đi đường vòng / hỏi người phụ trách"],
        ["Diligence (4D)", "Creation, Transparency, Deployment; người dùng output chịu trách nhiệm"]
      ],
      quiz: [
        {
          q: "A loan officer wants to use Claude to draft recommendations on whether individual applicants should be approved for credit. Which approach BEST aligns with responsible use?",
          options: [
            "Let Claude make approval decisions automatically to remove human bias",
            "Prohibit any use of Claude anywhere in the lending department",
            "Have a qualified credit professional review Claude's drafts before any decision, and tell applicants AI was used",
            "Use Claude's recommendations as the final decision unless the applicant asks about the process, in which case a human re-checks the file"
          ],
          answer: 2,
          explain: "Tín dụng là lĩnh vực rủi ro cao trong Usage Policy: cần người có chuyên môn xem xét thực chất trước khi ra quyết định và thông báo cho người bị ảnh hưởng rằng có dùng AI. Để Claude tự quyết bỏ qua người duyệt (và không loại được bias). Cấm hoàn toàn là quá tay. Coi khuyến nghị là quyết định cuối khi không ai hỏi vi phạm cả hai yêu cầu."
        },
        {
          q: "A support analyst wants Claude to identify trends in 5,000 customer complaints. The export includes names, email addresses, phone numbers, and complaint text. What should the analyst do FIRST?",
          options: [
            "Upload the full export to an incognito chat so it is not saved to history",
            "Upload the full export and ask Claude not to remember the personal details",
            "Upload it through a personal Pro account because it has higher usage limits",
            "Remove or pseudonymize the personal fields, keeping only what the trend analysis needs, and use the company-approved Claude account"
          ],
          answer: 3,
          explain: "Phân tích xu hướng không cần tên, email, số điện thoại: bớt dữ liệu trước khi gửi và dùng tài khoản công ty được duyệt. Incognito vẫn lưu giữ 30 ngày theo mặc định và không biến dữ liệu thừa thành hợp lệ. Yêu cầu Claude 'quên' không bảo vệ được dữ liệu đã gửi. Tài khoản cá nhân cho dữ liệu công việc vi phạm chính sách và nằm ngoài kiểm soát của tổ chức."
        },
        {
          q: "An employee notices that her company's AI policy says nothing about using Claude to summarize recorded client calls. What is the MOST appropriate action?",
          options: [
            "Ask the policy owner or compliance team before proceeding, since client recordings may hold confidential or regulated data",
            "Proceed, since anything not explicitly prohibited is allowed",
            "Never use Claude for any client-related work again",
            "Use her personal Claude account for these summaries so the unresolved company policy questions do not slow the client project down"
          ],
          answer: 0,
          explain: "Chính sách im lặng không có nghĩa là được phép, nhất là với ghi âm khách hàng có thể chứa thông tin mật hoặc thuộc diện quy định. Hỏi người phụ trách là đúng. Tự suy là được phép là rủi ro. Cấm mình hoàn toàn là quá tay. Dùng tài khoản cá nhân là đi đường vòng, vi phạm chính sách."
        },
        {
          q: "A team is reviewing its responsible-use practices for Claude. Which TWO statements reflect sound accountability practices? (Choose TWO.)",
          options: [
            "If Claude wrote the content, the vendor is responsible for any errors in it",
            "Once a workflow uses Claude, human reviewers are no longer needed for routine tasks",
            "Work produced with Claude never needs to be disclosed to anyone",
            "The person who sends or publishes Claude-assisted work is accountable for verifying it",
            "Disclose AI involvement where policy or law requires it, or where recipients would reasonably expect to know"
          ],
          answer: [3, 4],
          explain: "Deployment Diligence: người gửi/đăng chịu trách nhiệm kiểm output. Transparency Diligence: thông báo việc dùng AI khi luật, chính sách yêu cầu hoặc người nhận có kỳ vọng hợp lý. Đổ trách nhiệm cho nhà cung cấp là sai. Bỏ hẳn người duyệt chỉ vì có Claude là bỏ kiểm soát. 'Không bao giờ cần thông báo' mâu thuẫn với yêu cầu của Usage Policy cho trường hợp rủi ro cao."
        },
        {
          q: "A company's Claude Enterprise admin has disabled web search for the organization. A marketing specialist needs current competitor pricing for a report. What should she do?",
          options: [
            "Use her personal Claude account, where web search is available",
            "Gather the information from approved sources herself or request access through the policy owner with a business justification",
            "Ask Claude to guess the current prices based on its training data",
            "Ask a colleague to share their login from another company"
          ],
          answer: 1,
          explain: "Tính năng bị tắt là quyết định chính sách có chủ đích. Cách đúng là dùng nguồn được duyệt hoặc đề xuất mở quyền với lý do chính đáng. Tài khoản cá nhân hay mượn đăng nhập là đi đường vòng. Bảo Claude đoán giá hiện tại từ dữ liệu huấn luyện dễ dẫn tới thông tin cũ hoặc bịa."
        },
        {
          q: "A junior analyst has been using Claude for every report and now accepts outputs with little review. Her manager is concerned about over-reliance. Which action BEST addresses this?",
          options: [
            "Have her write the core analysis herself, use Claude to critique and extend it, and keep verifying figures and claims",
            "Ban her from using Claude for six months",
            "Have Claude review all of her Claude-generated reports before submission, replacing the manager's review to save everyone time",
            "Switch her to a more capable model so fewer errors occur"
          ],
          answer: 0,
          explain: "Chống phụ thuộc quá mức là giữ kỹ năng cốt lõi (tự làm phần phân tích chính), dùng Claude để phản biện và mở rộng, và giữ thói quen kiểm. Cấm hẳn bỏ qua lợi ích và không xây kỹ năng dùng AI đúng cách. Để Claude chấm Claude không thay được người chịu trách nhiệm. Model mạnh hơn không giải quyết việc người dùng ngừng kiểm."
        }
      ]
    },
    {
      id: "d7",
      name: "Troubleshooting and Optimization",
      weight: 10,
      intro: `<p>Domain này hỏi bạn làm gì khi <strong>kết quả không như mong muốn</strong>: chẩn đoán nguyên nhân nằm ở prompt, knowledge, cuộc trò chuyện, model/cài đặt hay lập luận; chỉnh theo phản hồi của người dùng; và tối ưu cách dùng để bớt tốn hạn mức và thời gian mà chất lượng không giảm.</p><p>Ranh giới: D7 không dạy lại cấu trúc prompt (đó là D1). D7 hỏi kỹ năng <em>đọc triệu chứng → tìm gốc → sửa đúng chỗ</em>. Nhiều câu D7 có phương án "đổi model mạnh hơn" làm bẫy khi gốc rễ nằm ở chỗ khác.</p>`,
      lessons: [
        {
          id: "l-7-1",
          title: "Chẩn đoán output kém: năm chỗ có thể hỏng",
          minutes: 12,
          html: `<p>Khi output kém, phản xạ tự nhiên là "hỏi lại" hoặc "đổi model". Cả hai có thể đúng, nhưng thường không phải bước đầu tiên. Chẩn đoán trước giúp bạn sửa đúng chỗ, tốn ít công nhất.</p>
<h4>Năm chỗ có thể hỏng</h4>
<table>
<thead><tr><th>Chỗ hỏng</th><th>Triệu chứng điển hình</th><th>Cách sửa</th></tr></thead>
<tbody>
<tr><td><strong>Prompt</strong></td><td>Output chung chung, sai người đọc, sai định dạng, làm thiếu phần</td><td>Thêm bối cảnh, người đọc, ví dụ, định dạng, tiêu chí; gỡ chỉ dẫn mâu thuẫn</td></tr>
<tr><td><strong>Knowledge / nguồn</strong></td><td>Thông tin cũ, sai so với tài liệu hiện hành, "không tìm thấy" dù tài liệu có tồn tại, câu trả lời lúc thế này lúc thế khác theo phiên bản tài liệu</td><td>Cập nhật hoặc gỡ tài liệu cũ/trùng; đặt tên file rõ; kiểm tài liệu có thật sự nằm trong Project/chat không; kiểm quyền connector</td></tr>
<tr><td><strong>Cuộc trò chuyện</strong></td><td>Chat rất dài, Claude quên ràng buộc đặt từ đầu, một hiểu nhầm cũ cứ lặp lại</td><td>Tóm tắt những gì đã chốt, mở chat mới; sửa prompt gốc thay vì chồng phản hồi</td></tr>
<tr><td><strong>Model / cài đặt</strong></td><td>Prompt và nguồn đều tốt nhưng lập luận vẫn nông ở việc phức tạp; web search hoặc connector đang tắt nên không lấy được dữ liệu mới</td><td>Tăng effort hoặc lên tầng model cao hơn; bật đúng công cụ cần thiết</td></tr>
<tr><td><strong>Lập luận</strong></td><td>Dữ kiện đúng nhưng kết luận sai; bỏ qua một điều kiện; nhảy bước</td><td>Yêu cầu trình bày lập luận hoặc xem phần tóm tắt suy nghĩ; chỉ ra bước sai; chia việc thành bước nhỏ có điểm kiểm</td></tr>
</tbody>
</table>
<h4>Kiểm theo chi phí tăng dần</h4>
<ol>
<li>Đọc lại prompt: có thiếu bối cảnh, có mâu thuẫn không? (rẻ nhất)</li>
<li>Kiểm nguồn: Claude có đúng tài liệu, đúng phiên bản không?</li>
<li>Kiểm cuộc trò chuyện: có quá dài, có hiểu nhầm cũ không?</li>
<li>Kiểm cài đặt và công cụ: web search, connector có bật không?</li>
<li>Cuối cùng mới đổi effort hoặc model (tốn hạn mức và thời gian hơn).</li>
</ol>
<h4>Phân biệt lỗi nguồn và lỗi lập luận</h4>
<p>Một mẹo hữu ích: yêu cầu Claude <strong>trích nguyên văn đoạn nguồn</strong> mà nó dựa vào. Nếu đoạn trích là tài liệu cũ → lỗi knowledge. Nếu không có đoạn trích nào → Claude đang dựa vào kiến thức chung hoặc bịa (thiếu nguồn, hoặc prompt chưa giới hạn nguồn). Nếu đoạn trích đúng mà kết luận sai → lỗi lập luận.</p>
<h4>Mỗi lần thử chỉ thay đổi một biến</h4>
<p>Khi đã có giả thuyết, chỉ đổi <strong>một</strong> thứ và chạy lại với <strong>cùng đầu vào</strong>. Đổi cả prompt, model và tài liệu cùng lúc thì dù kết quả tốt lên, bạn không biết điều gì có tác dụng, và lần sau gặp lại vẫn không biết sửa thế nào. Tăng effort cũng là một biến; hãy đo tác động của nó như mọi thay đổi khác.</p>
<h4>Ví dụ</h4>
<p>Trợ lý nội bộ trong Project trả lời sai số ngày phép năm. Kiểm prompt: instructions ổn. Kiểm nguồn: yêu cầu Claude trích đoạn chính sách đã dùng → đoạn trích lấy từ sổ tay năm ngoái, vẫn còn trong knowledge cạnh bản mới. Sửa: gỡ bản cũ. Chạy lại cùng câu hỏi → đúng. Không cần đổi model.</p>
<div class="tip">Khi phương án "dùng model mạnh hơn" xuất hiện cạnh một phương án sửa prompt hoặc sửa knowledge, hãy đọc kỹ triệu chứng. Nếu triệu chứng là thông tin cũ, thiếu bối cảnh, hoặc chat quá dài, model mạnh hơn không giải quyết được.</div>
<div class="warn">Sửa nhiều thứ cùng lúc là cách nhanh nhất để "may mắn sửa được" mà không học được gì, và cũng là cách nhanh nhất để vô tình làm hỏng thứ đang chạy tốt.</div>`,
          keypoints: [
            "Năm chỗ có thể hỏng: prompt, knowledge/nguồn, cuộc trò chuyện, model/cài đặt, lập luận.",
            "Kiểm theo chi phí tăng dần: prompt → nguồn → cuộc trò chuyện → công cụ/cài đặt → effort/model.",
            "Yêu cầu trích nguồn để phân biệt lỗi knowledge (trích tài liệu cũ), thiếu nguồn (không trích được) và lỗi lập luận (trích đúng, kết luận sai).",
            "Đổi một thứ, chạy lại cùng đầu vào; tăng effort cũng là một biến cần đo.",
            "Đổi model không sửa được thông tin cũ, prompt mơ hồ hay chat quá dài."
          ],
          sources: [
            { t: "Reduce hallucinations", u: "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations" },
            { t: "RAG for projects", u: "https://support.claude.com/en/articles/11473015-retrieval-augmented-generation-rag-for-projects" },
            { t: "Using extended thinking (effort)", u: "https://support.claude.com/en/articles/10574485-using-extended-thinking" }
          ]
        },
        {
          id: "l-7-2",
          title: "Điều chỉnh theo phản hồi và lưu cách sửa lâu dài",
          minutes: 10,
          html: `<p>Khi người dùng một Project, một mẫu prompt hay một quy trình có Claude phàn nàn, phản hồi của họ là dữ liệu chẩn đoán quý, nhưng hiếm khi là chỉ dẫn sửa chính xác.</p>
<h4>Phản hồi là triệu chứng, chưa phải đơn thuốc</h4>
<p>"Câu trả lời dài quá" có thể là: định dạng mặc định chưa được nêu (prompt), người dùng này cần bản ngắn còn người khác cần bản đầy đủ (người đọc chưa được xác định), hoặc Claude đang chép lại cả đoạn tài liệu vì knowledge lộn xộn. Làm theo nguyên văn ("thêm câu 'trả lời ngắn'") có thể làm hỏng trải nghiệm của nhóm người dùng khác. Hãy hỏi thêm: ví dụ cụ thể là gì, họ dùng output vào việc gì, "đúng" trông như thế nào.</p>
<h4>Khi người dùng muốn những thứ ngược nhau</h4>
<p>Một người muốn ngắn, người khác muốn chi tiết; một người muốn trang trọng, người khác muốn thân thiện. Đừng lắc qua lắc lại cấu hình theo người phàn nàn gần nhất. Chốt với người phụ trách thế nào là “đạt” (hoặc tách thành hai chế độ rõ ràng, ví dụ "bản tóm tắt" và "bản đầy đủ" theo yêu cầu), rồi mới sửa.</p>
<h4>Sửa ở đâu: dựa vào bằng chứng</h4>
<table>
<thead><tr><th>Bằng chứng</th><th>Chỗ sửa phù hợp</th></tr></thead>
<tbody>
<tr><td>Nhiều người cùng gặp một lỗi định dạng/giọng</td><td>Project instructions</td></tr>
<tr><td>Thông tin sai, cũ, thiếu</td><td>Knowledge (cập nhật, gỡ, bổ sung)</td></tr>
<tr><td>Chỉ một người, một lần, một yêu cầu đặc biệt</td><td>Tin nhắn trong chat đó; không đổi cấu hình chung</td></tr>
<tr><td>Việc phức tạp bị làm nông dù nguồn và prompt tốt</td><td>Effort hoặc tầng model</td></tr>
<tr><td>Một quy trình chuyên biệt lặp lại ở nhiều nơi</td><td>Đóng gói thành mẫu dùng chung hoặc Skill</td></tr>
</tbody>
</table>
<h4>Phản hồi trong lúc chat: cụ thể và có định hướng</h4>
<p>Trong một cuộc chat, "sai rồi, làm lại" cho Claude rất ít thông tin. Tốt hơn: "Bảng doanh thu dùng số của quý 2 thay vì quý 3; hãy dùng cột Q3 trong file đính kèm và giữ nguyên phần còn lại." Bạn chỉ ra chỗ sai, nguyên nhân bạn nghĩ tới, và phạm vi cần sửa.</p>
<h4>Kiểm chứng rồi mới lưu cố định</h4>
<p>Khi một cách sửa có vẻ hiệu quả trong một chat, hãy kiểm nó trên vài trường hợp khác. Chỉ khi đã xác nhận, mới đưa nó vào nơi bền vững:</p>
<ul>
<li>Project instructions, nếu áp dụng cho mọi chat trong Project.</li>
<li>Instructions for Claude, nếu là sở thích cá nhân của bạn cho mọi cuộc chat.</li>
<li>Knowledge, nếu là thông tin.</li>
<li>Mẫu prompt dùng chung hoặc Skill, nếu là một quy trình chuyên biệt.</li>
</ul>
<p>Nếu không, cùng một lỗi sẽ quay lại ở chat sau, và người khác trong nhóm sẽ gặp lại nó.</p>
<div class="tip">Câu hỏi "người dùng phải nhắc lại cùng một yêu cầu trong mọi chat" → đáp án là đưa yêu cầu đó vào project instructions (hoặc Instructions for Claude nếu là sở thích cá nhân), không phải "nhắc lại mỗi lần" hay "đổi model".</div>
<div class="warn">Đừng đưa một yêu cầu một lần của một người vào cấu hình dùng chung. Cấu hình chung chỉ chứa những gì đúng cho mọi người dùng.</div>`,
          keypoints: [
            "Phản hồi là dữ liệu chẩn đoán, không phải chỉ dẫn sửa nguyên văn; hỏi ví dụ và mục đích.",
            "Ý kiến ngược nhau: chốt định nghĩa “đạt” với người phụ trách trước, hoặc tách thành chế độ rõ ràng.",
            "Chọn chỗ sửa theo bằng chứng: lỗi chung → instructions; thông tin → knowledge; một lần → tin nhắn; việc khó → effort/model.",
            "Sửa giữa chừng: chỉ rõ chỗ sai, nguyên nhân, phạm vi sửa.",
            "Xác nhận cách sửa trên nhiều trường hợp rồi mới đưa vào instructions, knowledge, mẫu hoặc Skill."
          ],
          sources: [
            { t: "Understanding Claude's personalization features", u: "https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features" },
            { t: "What are skills?", u: "https://support.claude.com/en/articles/12512176-what-are-skills" },
            { t: "Prompting best practices", u: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" }
          ]
        },
        {
          id: "l-7-3",
          title: "Tối ưu usage và hiệu quả mà không giảm chất lượng",
          minutes: 10,
          html: `<h4>Cơ chế hạn mức</h4>
<p>Theo help center, gói trả phí có giới hạn theo phiên, đặt lại sau mỗi 5 giờ (tính từ tin nhắn đầu tiên), cộng thêm giới hạn theo tuần. Giới hạn tuần áp dụng cho mọi model, và claude.ai, Claude Code, Claude Desktop dùng chung hạn mức. Bạn xem mức đã dùng trong phần Usage của Settings. Khi chạm giới hạn, có thể chờ đặt lại, nâng gói, hoặc dùng usage credits trên gói trả phí.</p>
<h4>Những gì tiêu tốn hạn mức</h4>
<p>Help center liệt kê: độ dài tin nhắn, kích thước file đính kèm, độ dài cuộc trò chuyện, công cụ (Research, web search), lựa chọn model, mức effort, tạo artifact, và các việc nhiều bước (chạy code, xử lý file, duyệt web).</p>
<h4>Tiết kiệm mà vẫn giữ chất lượng</h4>
<table>
<thead><tr><th>Thói quen</th><th>Vì sao hiệu quả</th></tr></thead>
<tbody>
<tr><td>Dùng Project cho tài liệu dùng lại</td><td>Help center nói nội dung Project được lưu đệm (cache) và tính ít hơn khi dùng lại</td></tr>
<tr><td>Project instructions ngắn gọn; gỡ file không dùng</td><td>Mọi thứ trong context đều được xử lý ở mỗi lượt</td></tr>
<tr><td>Tắt connector và web search khi không cần</td><td>Công cụ và connector tốn nhiều token</td></tr>
<tr><td>Chọn đúng tầng model và effort</td><td>Tầng nặng, effort cao cho việc đơn giản chỉ tốn thêm, không tốt hơn</td></tr>
<tr><td>Viết prompt rõ ngay từ đầu</td><td>Ít lượt hỏi lại, ít lượt sửa</td></tr>
<tr><td>Gộp các yêu cầu liên quan vào một tin nhắn</td><td>Tránh nhiều lượt nhỏ mỗi lượt đều phải xử lý lại lịch sử</td></tr>
<tr><td>Mở chat mới khi đổi chủ đề</td><td>Chat dài thì mỗi lượt đắt hơn</td></tr>
<tr><td>Lên kế hoạch trước việc lớn</td><td>Tránh làm đi làm lại do đổi hướng giữa chừng</td></tr>
</tbody>
</table>
<h4>Cache của Project không giữ mãi</h4>
<p>Help center ghi chú: cache của Project hết hạn sau một thời gian không hoạt động, nên tin nhắn đầu tiên sau một quãng nghỉ dài sẽ tính đầy đủ nội dung Project. Đây là chi tiết nhỏ nhưng giải thích vì sao "lần đầu mở lại Project thấy tốn hơn".</p>
<h4>Tối ưu thời gian, không chỉ hạn mức</h4>
<ul>
<li><strong>Mẫu prompt</strong> cho việc lặp lại: viết một lần, thử kỹ, dùng chung.</li>
<li><strong>Tách lô việc theo độ khó</strong>: phần đơn giản cho tầng nhanh, phần khó cho tầng mạnh.</li>
<li><strong>Đúng tính năng</strong>: Research cho câu hỏi rộng, không cho câu tra cứu; chat thường cho việc một lần.</li>
<li><strong>Đo trước và sau</strong>: khi tối ưu, giữ một bộ đầu vào thử để chắc chất lượng không tụt.</li>
</ul>
<div class="tip">Câu hỏi tối ưu thường có một phương án "tiết kiệm" nhưng hại chất lượng (bỏ hết bối cảnh, luôn dùng tầng nhẹ nhất cho mọi việc). Đáp án tốt giảm lãng phí (tool không dùng, chat dài, file thừa, model quá nặng cho việc nhẹ) mà vẫn giữ những gì output cần.</div>
<div class="warn">Đừng tối ưu bằng cách cắt bỏ bối cảnh cần thiết. Một prompt ngắn hơn nhưng phải sửa ba lượt tốn hơn một prompt đầy đủ làm đúng ngay lần đầu.</div>`,
          keypoints: [
            "Gói trả phí: giới hạn phiên đặt lại mỗi 5 giờ + giới hạn tuần; claude.ai, Claude Code, Desktop dùng chung hạn mức.",
            "Hao hạn mức: tin nhắn và file lớn, chat dài, công cụ (Research, web search), model nặng, effort cao, artifact, việc nhiều bước.",
            "Giảm: dùng Project (có cache), instructions gọn, gỡ file thừa, tắt connector/web search không dùng, đúng model/effort, gộp yêu cầu, chat mới khi đổi chủ đề.",
            "Cache Project hết hạn sau thời gian không hoạt động.",
            "Tối ưu không được cắt bối cảnh cần thiết; đo chất lượng trước và sau."
          ],
          sources: [
            { t: "How do usage and length limits work?", u: "https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work" },
            { t: "Usage limit best practices", u: "https://support.claude.com/en/articles/9797557-usage-limit-best-practices" },
            { t: "How large is the context window on paid Claude plans?", u: "https://support.claude.com/en/articles/8606394-how-large-is-the-context-window-on-paid-claude-plans" }
          ]
        }
      ],
      cheat: [
        ["Năm chỗ hỏng", "Prompt, knowledge/nguồn, cuộc trò chuyện, model/cài đặt, lập luận"],
        ["Thứ tự kiểm", "Chi phí tăng dần: prompt → nguồn → chat → công cụ/cài đặt → effort/model"],
        ["Thông tin cũ / không nhất quán theo phiên bản", "Lỗi knowledge: gỡ tài liệu cũ/trùng, không phải đổi model"],
        ["Quên ràng buộc đầu chat", "Lỗi cuộc trò chuyện: tóm tắt đã chốt, mở chat mới"],
        ["Trích đúng nguồn mà kết luận sai", "Lỗi lập luận: xem lập luận, chỉ ra bước sai, chia bước"],
        ["Vòng chẩn đoán", "Đổi MỘT thứ, chạy lại CÙNG đầu vào"],
        ["Phản hồi người dùng", "Dữ liệu chẩn đoán; hỏi ví dụ và mục đích; ý kiến ngược nhau → chốt định nghĩa “đạt” trước"],
        ["Lưu cách sửa lâu dài", "Xác nhận rồi đưa vào instructions / knowledge / mẫu prompt / Skill"],
        ["Hạn mức", "Phiên 5 giờ + tuần; các app Claude dùng chung; xem trong Settings > Usage"],
        ["Hao hạn mức", "Chat dài, file lớn, Research/web search, model nặng, effort cao, artifact, việc nhiều bước"],
        ["Tiết kiệm đúng cách", "Project (cache), instructions gọn, tắt tool thừa, đúng model/effort, gộp yêu cầu, chat mới khi đổi chủ đề"]
      ],
      quiz: [
        {
          q: "An internal HR assistant Project keeps telling employees they get 15 days of annual leave, but the current policy says 18. The project instructions look fine. What should the Project owner check FIRST?",
          options: [
            "Whether an outdated version of the leave policy is still in project knowledge, by asking Claude to quote the passage it used",
            "Whether switching to Opus fixes the answer",
            "Whether employees are phrasing their questions politely",
            "Whether the effort setting is at maximum"
          ],
          answer: 0,
          explain: "Thông tin cũ là triệu chứng điển hình của lỗi knowledge. Yêu cầu Claude trích đoạn nguồn đã dùng cho biết ngay nó đang đọc tài liệu nào; nếu là bản cũ thì gỡ đi. Đổi model hay tăng effort không sửa được tài liệu cũ trong knowledge. Cách đặt câu hỏi lịch sự không liên quan."
        },
        {
          q: "A user changed his prompt wording, switched from Sonnet to Opus, and replaced two knowledge files all at once. The output improved. What is the MAIN problem with this approach?",
          options: [
            "Opus should never be used for troubleshooting, because higher-tier models hide the real cause of poor output from the user",
            "Knowledge files should never be replaced",
            "He cannot tell which change caused the improvement, so he cannot reliably reproduce or apply the fix elsewhere",
            "Changing the prompt wording always makes outputs worse"
          ],
          answer: 2,
          explain: "Đổi nhiều thứ cùng lúc thì không biết thay đổi nào có tác dụng, nên không tái lập được cách sửa và có thể tốn hạn mức vô ích (ví dụ dùng Opus khi không cần). Quy tắc là đổi một thứ, chạy lại cùng đầu vào. Các phương án còn lại là khẳng định tuyệt đối sai: Opus, thay file, đổi prompt đều có thể là cách sửa hợp lý."
        },
        {
          q: "Users of a shared sales Project complain that drafts are 'too long.' Some reps, however, rely on the detailed version for complex deals. What is the BEST next step for the Project owner?",
          options: [
            "Immediately add 'Keep all answers under 100 words' to the project instructions, since several users have raised the same complaint",
            "Agree with the team lead on what 'good' looks like per use case, then define when to give a short summary versus a detailed draft",
            "Ignore the feedback because some users like the long version",
            "Switch the Project to Haiku so answers are shorter"
          ],
          answer: 1,
          explain: "Phản hồi trái chiều → chốt định nghĩa “đạt” với người phụ trách trước, rồi viết rõ trong instructions khi nào dùng bản ngắn, khi nào dùng bản đầy đủ. Làm theo nguyên văn người phàn nàn sẽ làm hỏng trải nghiệm của người cần bản chi tiết. Bỏ qua phản hồi bỏ mất dữ liệu chẩn đoán. Đổi model để câu trả lời ngắn hơn là sửa sai chỗ."
        },
        {
          q: "A project manager has been working in one chat for several days. Claude now ignores formatting rules she set at the start and sometimes refers to a plan that was later abandoned. Her prompt and files have not changed. What is the MOST likely cause and fix?",
          options: [
            "The model was downgraded; contact support",
            "The knowledge files have become corrupted over the past few days; delete every file, re-upload fresh copies, and repeat the formatting rules in the chat",
            "The formatting rules are too strict; remove them",
            "The chat has grown long and carries stale context; summarize current decisions, continue in a new chat, and put lasting rules in project instructions"
          ],
          answer: 3,
          explain: "Prompt và file không đổi, triệu chứng là quên ràng buộc đầu chat và nhắc kế hoạch đã bỏ → lỗi cuộc trò chuyện: chat quá dài mang theo context cũ. Tóm tắt rồi mở chat mới, và đưa quy tắc định dạng lâu dài vào project instructions để không phải nhắc lại. Không có dấu hiệu nào cho thấy model bị hạ hay file hỏng. Bỏ quy tắc không phải cách sửa."
        },
        {
          q: "A team is running low on its Claude usage limits each week. Which TWO changes would MOST reduce usage without hurting output quality? (Choose TWO.)",
          options: [
            "Turn off connectors and web search in chats that do not need them",
            "Remove all context from prompts so messages are as short as possible",
            "Use the most capable model with maximum effort for every task to avoid retries",
            "Split each request into many tiny follow-up messages",
            "Keep reused reference documents in a Project and start new chats when switching topics instead of extending one very long chat"
          ],
          answer: [0, 4],
          explain: "Công cụ và connector tốn nhiều token nên tắt khi không cần; nội dung Project được cache và tính ít hơn khi dùng lại, còn chat quá dài làm mỗi lượt đắt hơn. Bỏ hết bối cảnh làm output kém và phải sửa nhiều lượt. Model nặng nhất với effort tối đa cho mọi việc tiêu hạn mức nhanh hơn. Chia thành nhiều tin nhắn nhỏ làm tăng số lượt, mỗi lượt lại xử lý lịch sử."
        },
        {
          q: "An analyst notices she types the same instruction, 'Use British spelling and cite page numbers,' at the start of nearly every chat in her research Project. The instruction works when she includes it. What is the BEST way to optimize this?",
          options: [
            "Keep typing it, since it works",
            "Add the instruction to the project instructions so it applies to every chat in the Project",
            "Upload a file named 'rules.txt' to project knowledge",
            "Switch to a model that defaults to British spelling"
          ],
          answer: 1,
          explain: "Cách sửa đã được xác nhận và áp dụng cho mọi chat trong Project → đưa vào project instructions để nó bền và không phải nhắc lại. Gõ lại mỗi lần tốn công và dễ quên. Một file trong knowledge là tài liệu tham khảo, không chắc được áp dụng như chỉ dẫn. Không có model nào 'mặc định chính tả Anh'; đây là việc của chỉ dẫn."
        }
      ]
    }
  ]
};
