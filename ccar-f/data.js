window.CERT_DATA = {
 "code": "CCAR-F",
 "title": "Claude Certified Architect – Foundations",
 "storageKey": "ccarf-notes-v1",
 "exam": {
  "questions": 60,
  "minutes": 120,
  "passScaled": 720
 },
 "intro": "<p><strong>Claude Certified Architect – Foundations (CCAR-F)</strong> kiểm tra khả năng <em>thiết kế</em> hệ thống dùng Claude: agent chạy vòng lặp tool, hệ nhiều agent, tích hợp MCP, cấu hình Claude Code cho cả team và CI, prompt cho output có cấu trúc, và giữ hệ thống đáng tin khi context dài. Đề có <strong>60 câu trong 120 phút</strong>, điểm quy đổi thang 100–1.000 và cần <strong>720</strong> để đậu. Có hai dạng câu: chọn một đáp án, hoặc chọn nhiều đáp án (đề ghi rõ cần chọn mấy).</p>\n<p>Câu hỏi thật gần như đều theo <strong>tình huống</strong> (mỗi đề rút ngẫu nhiên 4 trong 6 tình huống của exam guide): một agent chăm sóc khách hàng, một hệ nghiên cứu nhiều agent, Claude Code dùng trong team hoặc pipeline CI, một luồng trích xuất dữ liệu có cấu trúc, một công cụ tăng năng suất cho developer. Đề hiếm khi hỏi thuộc lòng. Thường bạn phải chọn cách <em>đúng nhất</em> giữa vài cách đều “chạy được”. Mẫu hay gặp:</p>\n<ul>\n<li>Quy tắc bắt buộc (tiền, bảo mật, thứ tự bước) thì cưỡng chế bằng code (hook, kiểm tra trong tool), không chỉ dặn trong prompt.</li>\n<li>Agent chọn sai tool thì sửa mô tả tool trước. Đừng vội thêm tầng phức tạp.</li>\n<li>Muốn JSON đúng schema thì dùng tool/JSON schema (structured outputs), không năn nỉ trong prompt.</li>\n<li>Subagent không tự biết gì, mọi context phải nằm trong lời giao việc.</li>\n<li>Cấu hình cả team cần thấy thì đặt ở file cấp project được commit, không đặt ở file cá nhân.</li>\n</ul>\n<h4>Cách dùng trang này</h4>\n<ol>\n<li>Đọc từng domain theo thứ tự. Trọng số (%) cho biết domain chiếm bao nhiêu phần đề. Domain 1 nặng nhất.</li>\n<li>Mỗi bài học có phần <em>ý chính</em> để ôn nhanh và link tới tài liệu chính thức. Gặp chi tiết kỹ thuật (tên flag, đường dẫn file, giá trị <code>stop_reason</code>) thì nên mở docs đối chiếu, vì sản phẩm cập nhật thường xuyên.</li>\n<li>Đánh dấu bài đã học. Tiến độ lưu trong trình duyệt của bạn.</li>\n<li>Bảng <em>cheat</em> cuối mỗi domain dùng để ôn trước giờ thi.</li>\n<li>Làm quiz của từng domain (câu hỏi tiếng Anh như đề thật, giải thích tiếng Việt), rồi làm bài thi thử tổng hợp.</li>\n</ol>\n<div class=\"tip\">Khi hai đáp án đều đúng về kỹ thuật, chọn cách giải quyết <strong>gốc rễ</strong> với ít thay đổi nhất, và cách có tính <strong>xác định</strong> (deterministic) khi rủi ro cao.</div>",
 "domains": [
  {
   "id": "d1",
   "name": "Agentic Architecture & Orchestration",
   "weight": 27,
   "intro": "<p>Domain nặng nhất. Nó hỏi cách bạn dựng một agent chạy đúng: vòng lặp dựa trên <code>stop_reason</code>, mô hình coordinator–subagent, cách chia việc và truyền context cho subagent, khi nào dùng hook/code thay cho lời dặn trong prompt, cách resume hoặc fork session, và cách thiết kế escalation sang người.</p>\n<p>Ranh giới: cách <em>viết</em> từng tool và cấu hình MCP thuộc Domain 2. Cách giữ context sạch và lan truyền lỗi khi hệ thống chạy lâu thuộc Domain 5. Domain 1 tập trung vào <em>kiến trúc điều phối</em>.</p>",
   "lessons": [
    {
     "id": "l-1-0",
     "title": "Nền tảng: từ một lời gọi API đến hệ nhiều agent",
     "minutes": 14,
     "html": "<p>Mọi bài trong Domain 1 nói về cùng một cỗ máy: <strong>vòng lặp agent</strong>. Bài này dựng cỗ máy đó từ đầu theo thứ tự: một lời gọi API, thêm tool, ghép thành vòng lặp, đóng gói bằng Agent SDK, rồi nhân lên thành nhiều agent. Cuối bài có bảng cho biết mỗi bài sau đụng vào bộ phận nào.</p>\n<h4>1. Điểm xuất phát: một lời gọi Messages API</h4>\n<p>Một request gửi tới Messages API gồm tên model, <code>max_tokens</code>, một <code>system</code> prompt (tùy chọn) và mảng <code>messages</code> gồm các lượt <code>user</code> và <code>assistant</code>. Response trả về một danh sách <em>content block</em> (khối text, khối <code>tool_use</code>…), trường <code>stop_reason</code> cho biết vì sao Claude dừng sinh, và trường <code>usage</code> ghi số token đã dùng.</p>\n<p>Điểm quan trọng nhất: API <strong>không tự nhớ</strong> cuộc hội thoại. Mỗi lượt, code của bạn gửi lại toàn bộ lịch sử cộng với message mới. Docs về context window mô tả đúng như vậy: input của mỗi lượt là mọi lượt trước đó cộng message hiện tại. Vì thế “trí nhớ” của agent chính là mảng <code>messages</code> mà code của bạn giữ, và nó chỉ dài thêm theo thời gian (Domain 5 xử lý chuyện này).</p>\n<h4>2. Tool: cho Claude cách tác động ra ngoài</h4>\n<p>Bạn khai báo tool bằng <code>name</code>, <code>description</code> và <code>input_schema</code> (JSON Schema). Claude <strong>không tự chạy</strong> tool của bạn. Khi muốn dùng, nó trả về khối <code>tool_use</code> (tên tool, input, id) và <code>stop_reason: \"tool_use\"</code>. Code của bạn chạy hàm thật rồi gửi lại khối <code>tool_result</code> mang đúng <code>tool_use_id</code>.</p>\n<p>Docs chia tool theo <strong>nơi code chạy</strong>:</p>\n<ul>\n<li><strong>Client tool</strong>: chạy trong ứng dụng của bạn. Gồm tool bạn tự định nghĩa và tool có schema do Anthropic công bố như <code>bash</code>, <code>text_editor</code>, memory tool.</li>\n<li><strong>Server tool</strong>: chạy trên hạ tầng của Anthropic, ví dụ <code>web_search</code>, <code>web_fetch</code>, <code>code_execution</code>. Bạn nhận kết quả luôn, không phải tự thực thi.</li>\n</ul>\n<h4>3. Agent là gì</h4>\n<p>“Building effective agents” phân biệt <strong>workflow</strong> (LLM và tool đi theo đường code định sẵn) với <strong>agent</strong> (LLM tự quyết các bước và cách dùng tool). Bài “Effective context engineering” sau đó rút gọn định nghĩa agent thành: <em>LLM tự dùng tool trong một vòng lặp</em>. Hai bài đều khuyên chọn giải pháp đơn giản nhất chạy được, chỉ thêm độ phức tạp khi nó cải thiện kết quả rõ ràng.</p>\n<h4>4. Vòng lặp và các bộ phận của nó</h4>\n<pre>  câu hỏi của user\n        |\n        v\n  [gọi Messages API] &lt;------------------------------+\n        |                                           |\n  stop_reason = ?                                   |\n    |- \"tool_use\"  -&gt; kiểm tra quyền/hook -&gt; chạy tool\n    |                -&gt; thêm tool_result vào messages --+\n    |- \"end_turn\"  -&gt; trả kết quả, thoát\n    '- max_tokens / refusal / ... -&gt; xử lý riêng</pre>\n<table>\n<thead><tr><th>Bộ phận</th><th>Vai trò</th><th>Ai nắm</th></tr></thead>\n<tbody>\n<tr><td>Model</td><td>Đọc context, quyết định gọi tool hay trả lời</td><td>Anthropic</td></tr>\n<tr><td>Tool</td><td>Hành động thật: tra đơn, hoàn tiền, đọc file</td><td>Bạn (hoặc server tool, MCP server)</td></tr>\n<tr><td>Code vòng lặp (harness)</td><td>Đọc <code>stop_reason</code>, chạy tool, nối lịch sử</td><td>Bạn, hoặc Agent SDK</td></tr>\n<tr><td>Context / lịch sử</td><td>Mọi thứ Claude “biết” trong lượt này</td><td>Bạn quyết định đưa gì vào</td></tr>\n<tr><td>Điều kiện dừng</td><td><code>end_turn</code>, cộng lưới an toàn số vòng/ngân sách</td><td>Bạn</td></tr>\n<tr><td>Rào chắn</td><td>Permission, hook, kiểm tra trong tool</td><td>Bạn (bằng code, có tính xác định)</td></tr>\n<tr><td>Con người</td><td>Duyệt, nhận bàn giao khi agent bế tắc</td><td>Quy trình của bạn</td></tr>\n</tbody>\n</table>\n<h4>5. Agent SDK: vòng lặp đóng gói sẵn</h4>\n<p>Viết vòng lặp tay thì bạn tự lo hết các bộ phận trên. Claude Agent SDK (Python và TypeScript) chạy sẵn <em>cùng vòng lặp với Claude Code</em>: Claude đánh giá prompt, gọi tool, nhận kết quả, lặp đến khi có một response không còn lời gọi tool. SDK cung cấp built-in tool (Read, Edit, Bash, Grep, Glob, Agent…), permission, hook, subagent, session, và trả về <code>ResultMessage</code> có <code>subtype</code>, chi phí, <code>session_id</code>. Docs cũng nhắc client SDK có <em>tool runner</em> để tự chạy tool của bạn và gửi kết quả về, nếu bạn chỉ cần vòng lặp gọn hơn trên Messages API.</p>\n<h4>6. Từ một agent đến nhiều agent</h4>\n<p>Khi việc quá rộng hoặc cần chạy song song, một <strong>coordinator</strong> giao việc cho <strong>subagent</strong> qua tool <code>Agent</code>. Subagent là một vòng lặp khác, có context riêng. Theo docs Agent SDK, trừ loại fork (sao chép hội thoại của cha), nó <strong>không thấy</strong> lịch sử của agent cha; thứ duy nhất truyền xuống là chuỗi prompt của lời gọi <code>Agent</code>. Chỉ message cuối của subagent quay về cha.</p>\n<h4>7. Quyết định nằm ở đâu: prompt hay code</h4>\n<p>Docs Claude Code chia mọi chỉ dẫn thành hai loại. <strong>Không xác định</strong>: prompt, CLAUDE.md, skill; model đọc và thường làm theo, nhưng không có gì bảo đảm. <strong>Xác định</strong>: hook, rule deny, managed setting; harness luôn áp dụng bất kể model nghĩ gì. Quy tắc nào “không được phép sai một lần” (tiền, bảo mật, thứ tự bước) phải nằm ở loại thứ hai.</p>\n<h4>8. Session: lịch sử được lưu lại</h4>\n<p>Agent SDK và Claude Code ghi lịch sử hội thoại (prompt, lời gọi tool, kết quả) xuống đĩa thành <strong>session</strong> có ID. Nhờ đó bạn tiếp tục (resume) hoặc rẽ nhánh (fork) một phiên. Session lưu hội thoại, không lưu trạng thái file.</p>\n<h4>Bản đồ Domain 1</h4>\n<table>\n<thead><tr><th>Bài</th><th>Đụng vào bộ phận</th><th>Câu hỏi chính</th></tr></thead>\n<tbody>\n<tr><td>l-1-1 Vòng lặp agent và stop_reason</td><td>Code vòng lặp, điều kiện dừng</td><td>Dựa vào tín hiệu nào để chạy tiếp hay dừng?</td></tr>\n<tr><td>l-1-2 Coordinator–subagent</td><td>Nhiều vòng lặp, context truyền xuống</td><td>Chia việc và viết lời giao việc thế nào?</td></tr>\n<tr><td>l-1-3 Hook và cưỡng chế bằng code</td><td>Rào chắn</td><td>Khi nào prompt không đủ, phải dùng code?</td></tr>\n<tr><td>l-1-4 Session và escalation</td><td>Lịch sử, con người</td><td>Resume, fork hay mở mới? Khi nào chuyển người?</td></tr>\n<tr><td>l-1-5 Chia việc: chaining, routing, phân rã động</td><td>Cấu trúc workflow</td><td>Đường đi cố định hay để model lập kế hoạch?</td></tr>\n<tr><td>l-1-6 Cấu hình subagent trong Agent SDK</td><td>Tool <code>Agent</code>, AgentDefinition</td><td>Subagent nhận gì, giới hạn thế nào?</td></tr>\n<tr><td>l-1-7 Hook trong Agent SDK</td><td>Rào chắn và chuẩn hóa dữ liệu</td><td>Chặn, sửa input, sửa output tool ra sao?</td></tr>\n</tbody>\n</table>\n<div class=\"tip\">Gặp câu hỏi Domain 1, hãy tự hỏi: lỗi nằm ở bộ phận nào? Dừng sai thì xem <code>stop_reason</code>. Subagent làm sai thì xem lời giao việc. Quy tắc bị vi phạm thì xem rào chắn bằng code.</div>",
     "keypoints": [
      "API không tự nhớ: mỗi lượt gửi lại toàn bộ messages; trí nhớ của agent là lịch sử do code giữ.",
      "Claude chỉ đề xuất tool_use; client tool do app bạn chạy, server tool chạy trên hạ tầng Anthropic.",
      "Agent = LLM tự dùng tool trong vòng lặp; workflow = đường đi do code định sẵn.",
      "Agent SDK chạy sẵn vòng lặp của Claude Code: tool, permission, hook, subagent, session.",
      "Prompt/CLAUDE.md là chỉ dẫn không xác định; hook, rule deny, managed setting là cưỡng chế xác định."
     ],
     "sources": [
      {
       "t": "Tool use with Claude (overview)",
       "u": "https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview"
      },
      {
       "t": "Context windows",
       "u": "https://platform.claude.com/docs/en/build-with-claude/context-windows"
      },
      {
       "t": "How the agent loop works (Agent SDK)",
       "u": "https://code.claude.com/docs/en/agent-sdk/agent-loop"
      },
      {
       "t": "Subagents in the SDK",
       "u": "https://code.claude.com/docs/en/agent-sdk/subagents"
      },
      {
       "t": "Best practices for Claude Code",
       "u": "https://code.claude.com/docs/en/best-practices"
      },
      {
       "t": "Building effective agents",
       "u": "https://www.anthropic.com/engineering/building-effective-agents"
      },
      {
       "t": "Effective context engineering for AI agents",
       "u": "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents"
      }
     ],
     "ts": [
      "1.1",
      "1.2",
      "1.4",
      "1.5"
     ]
    },
    {
     "id": "l-1-1",
     "title": "Vòng lặp agent và stop_reason",
     "minutes": 12,
     "html": "<p>Agent chăm sóc khách hàng, agent review code hay hệ nghiên cứu nhiều agent đều chạy chung một vòng lặp trên Messages API: gửi request, đọc response, nếu Claude muốn gọi tool thì chạy tool rồi gửi kết quả về, lặp lại đến khi xong. Đề thi ít hỏi cú pháp. Câu hỏi thường là: <em>code của bạn dựa vào tín hiệu nào để biết chạy tiếp hay dừng?</em></p>\n<h4>Tín hiệu điều khiển: <code>stop_reason</code></h4>\n<p>Mỗi response có trường <code>stop_reason</code> cho biết vì sao Claude ngừng sinh. Các giá trị docs liệt kê:</p>\n<table>\n<thead><tr><th>Giá trị</th><th>Ý nghĩa</th><th>Code nên làm gì</th></tr></thead>\n<tbody>\n<tr><td><code>tool_use</code></td><td>Claude đang yêu cầu gọi tool</td><td>Chạy tool, gửi <code>tool_result</code>, lặp tiếp</td></tr>\n<tr><td><code>end_turn</code></td><td>Claude trả lời xong một cách tự nhiên</td><td>Kết thúc vòng lặp, trả kết quả</td></tr>\n<tr><td><code>max_tokens</code></td><td>Chạm giới hạn <code>max_tokens</code> bạn đặt</td><td>Tăng giới hạn hoặc cho viết tiếp. Nếu bị cắt giữa một khối tool_use thì gửi lại với <code>max_tokens</code> cao hơn</td></tr>\n<tr><td><code>stop_sequence</code></td><td>Gặp một chuỗi trong <code>stop_sequences</code></td><td>Đọc trường <code>stop_sequence</code> xem chuỗi nào</td></tr>\n<tr><td><code>pause_turn</code></td><td>Vòng lặp server tool chạm giới hạn lượt</td><td>Gửi nguyên nội dung assistant trở lại để tiếp tục</td></tr>\n<tr><td><code>refusal</code></td><td>Claude từ chối trả lời</td><td>Đến trong response HTTP 200 (không phải lỗi) nên phải tự kiểm tra; đọc <code>stop_details</code> và có thể thử lại trên model dự phòng (fallback)</td></tr>\n<tr><td><code>model_context_window_exceeded</code></td><td>Response làm đầy context window</td><td>Coi như bị cắt cụt</td></tr>\n</tbody>\n</table>\n<h4>Khung vòng lặp chuẩn</h4>\n<pre>messages = [{\"role\": \"user\", \"content\": user_input}]\nfor _ in range(MAX_ITERATIONS):          # lưới an toàn, không phải tín hiệu chính\n    resp = client.messages.create(model=MODEL, max_tokens=4096,\n                                  tools=TOOLS, messages=messages)\n    messages.append({\"role\": \"assistant\", \"content\": resp.content})\n\n    if resp.stop_reason != \"tool_use\":\n        break                             # end_turn, max_tokens, refusal... xử lý riêng\n\n    results = []\n    for block in resp.content:\n        if block.type == \"tool_use\":\n            output, failed = run_tool(block.name, block.input)\n            results.append({\"type\": \"tool_result\",\n                            \"tool_use_id\": block.id,\n                            \"content\": output,\n                            \"is_error\": failed})\n    messages.append({\"role\": \"user\", \"content\": results})</pre>\n<p>Những chi tiết hay bị hỏi:</p>\n<ul>\n<li><strong>Thêm nguyên nội dung assistant vào lịch sử</strong>, gồm cả khối text lẫn khối <code>tool_use</code>. Mỗi <code>tool_result</code> phải trỏ đúng <code>tool_use_id</code>.</li>\n<li><strong>Một response có thể chứa nhiều khối <code>tool_use</code></strong> (gọi song song). Trả tất cả kết quả trong <em>một</em> message user.</li>\n<li><strong>Thứ tự trong message user</strong>: các khối <code>tool_result</code> phải đứng đầu, text (nếu có) đứng sau. Message chứa kết quả phải nằm ngay sau message assistant gọi tool. Docs còn khuyên đừng chèn khối text ngay sau tool_result, vì Claude có thể học theo mẫu đó và kết thúc lượt với response rỗng.</li>\n<li><strong>Báo lỗi bằng <code>is_error: true</code></strong> kèm thông điệp rõ ràng. Docs khuyên thông điệp lỗi nên nói rõ lỗi gì và Claude nên thử gì tiếp. Nếu nuốt lỗi và trả chuỗi rỗng, Claude không có cách nào biết tool đã thất bại.</li>\n</ul>\n<h4>Các anti-pattern đề hay đưa làm đáp án nhiễu</h4>\n<ul>\n<li><strong>Dừng khi response có text.</strong> Sai, vì Claude thường viết một câu như “Để tôi kiểm tra đơn hàng” <em>rồi</em> mới gọi tool trong cùng response. Có text không có nghĩa là xong.</li>\n<li><strong>Dò chữ “done”, “hoàn thành” trong câu trả lời.</strong> Dễ gãy, phụ thuộc cách diễn đạt. Tín hiệu có cấu trúc là <code>stop_reason</code>.</li>\n<li><strong>Dùng số vòng cố định làm điều kiện dừng chính.</strong> Bài “Building effective agents” của Anthropic ghi rằng agent thường có thêm điều kiện dừng (ví dụ số vòng tối đa) để giữ quyền kiểm soát. Giới hạn đó là lưới an toàn chống chạy vô hạn, không thay được việc đọc <code>stop_reason</code>.</li>\n</ul>\n<div class=\"tip\">Câu hỏi về vòng lặp thường có đáp án: “tiếp tục khi <code>stop_reason</code> là <code>tool_use</code>, kết thúc khi là <code>end_turn</code>; giới hạn số vòng chỉ để phòng hờ”.</div>\n<h4>Khi dùng Claude Agent SDK</h4>\n<p>Agent SDK chạy sẵn vòng lặp này (cùng vòng lặp với Claude Code). Theo docs, mỗi lượt Claude có thể gọi tool, SDK chạy tool rồi đưa kết quả về, và vòng lặp kết thúc khi Claude trả một response không còn lời gọi tool nào. Cuối cùng SDK trả một <code>ResultMessage</code> có <code>subtype</code>:</p>\n<ul>\n<li><code>success</code>: xong bình thường, có trường <code>result</code>.</li>\n<li><code>error_max_turns</code>, <code>error_max_budget_usd</code>: chạm giới hạn <code>max_turns</code> / <code>max_budget_usd</code>.</li>\n<li><code>error_during_execution</code>: lỗi làm gián đoạn vòng lặp.</li>\n<li><code>error_max_structured_output_retries</code>: không tạo được structured output hợp lệ trong số lần thử cho phép.</li>\n</ul>\n<p>Luôn kiểm tra <code>subtype</code> trước khi đọc <code>result</code>, vì <code>result</code> chỉ có ở biến thể <code>success</code>. Mọi subtype đều có <code>session_id</code>, nên kể cả khi chạm giới hạn bạn vẫn resume được.</p>\n<div class=\"warn\">Model chỉ <em>đề xuất</em> lời gọi tool. Code của bạn (permission, hook, logic trong tool) mới quyết định có thực thi hay không. Đây là chỗ đặt các rào chắn cứng.</div>",
     "keypoints": [
      "Điều khiển vòng lặp bằng stop_reason: tool_use thì chạy tool rồi lặp, end_turn thì dừng.",
      "Có text trong response không có nghĩa là xong; Claude hay viết text trước khi gọi tool.",
      "tool_result đứng đầu message user, khớp tool_use_id; nhiều tool_use thì trả hết trong một message.",
      "Lỗi tool trả về với is_error: true và thông điệp rõ ràng; giới hạn số vòng chỉ là lưới an toàn.",
      "Agent SDK: kiểm tra ResultMessage.subtype (success, error_max_turns, error_max_budget_usd, error_during_execution, error_max_structured_output_retries)."
     ],
     "sources": [
      {
       "t": "Handling stop reasons",
       "u": "https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons"
      },
      {
       "t": "Handle tool calls",
       "u": "https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls"
      },
      {
       "t": "How the agent loop works (Agent SDK)",
       "u": "https://code.claude.com/docs/en/agent-sdk/agent-loop"
      },
      {
       "t": "Building effective agents",
       "u": "https://www.anthropic.com/engineering/building-effective-agents"
      }
     ],
     "ts": [
      "1.1"
     ]
    },
    {
     "id": "l-1-2",
     "title": "Coordinator–subagent: chia việc và truyền context",
     "minutes": 14,
     "html": "<p>Khi một agent đơn không đủ (việc quá rộng, cần chạy song song, hoặc context của một agent bị đầy), ta chuyển sang mô hình <strong>coordinator–subagent</strong>: một agent điều phối chia việc, giao cho các subagent, rồi gom và tổng hợp kết quả. Bài viết về hệ nghiên cứu nhiều agent của Anthropic gọi đây là mẫu <em>orchestrator-worker</em>.</p>\n<h4>Workflow hay agent? Bắt đầu từ đơn giản</h4>\n<p>“Building effective agents” phân biệt <strong>workflow</strong> (LLM và tool được điều phối theo đường đi định sẵn trong code) với <strong>agent</strong> (LLM tự quyết quy trình và cách dùng tool). Các mẫu workflow:</p>\n<table>\n<thead><tr><th>Mẫu</th><th>Dùng khi</th></tr></thead>\n<tbody>\n<tr><td>Prompt chaining</td><td>Việc tách gọn thành các bước cố định, bước sau dùng output bước trước</td></tr>\n<tr><td>Routing</td><td>Đầu vào chia rõ thành loại, mỗi loại xử lý riêng</td></tr>\n<tr><td>Parallelization</td><td>Các phần độc lập chạy cùng lúc (sectioning) hoặc chạy nhiều lần để lấy đa số (voting)</td></tr>\n<tr><td>Orchestrator-workers</td><td>Không đoán trước được cần những việc con nào</td></tr>\n<tr><td>Evaluator-optimizer</td><td>Có tiêu chí đánh giá rõ và lặp sửa mang lại giá trị đo được</td></tr>\n</tbody>\n</table>\n<p>Lời khuyên chung: chọn giải pháp đơn giản nhất chạy được, chỉ thêm độ phức tạp khi nó <em>cải thiện kết quả rõ ràng</em>. Review mã theo checklist cố định thì prompt chaining là đủ. Nghiên cứu mở thì cần coordinator lập kế hoạch thích ứng.</p>\n<h4>Coordinator là trung tâm (hub-and-spoke)</h4>\n<p>Trong thiết kế khuyến nghị, subagent báo cáo về coordinator, và coordinator quyết định bước tiếp theo: giao thêm, sửa hướng, hay tổng hợp. Lợi ích là có một chỗ duy nhất để quan sát luồng, xử lý lỗi và kiểm soát chất lượng. Khi báo cáo cuối <strong>thiếu cả một mảng</strong> mà log cho thấy từng subagent làm đúng phần được giao, lỗi nằm ở <strong>bước chia việc của coordinator</strong>. Ví dụ: chủ đề “tác động của AI lên ngành sáng tạo” chỉ được chia thành các việc con về hội họa và thiết kế, nên âm nhạc và văn chương không ai làm.</p>\n<h4>Subagent không biết gì ngoài lời giao việc</h4>\n<p>Theo docs Agent SDK, subagent (trừ loại fork) bắt đầu với context mới: <strong>không có lịch sử hội thoại</strong> và không có kết quả tool của agent cha. Thứ duy nhất truyền từ cha sang con là chuỗi prompt của lời gọi tool <code>Agent</code> (trước đây tên là <code>Task</code>). Vì vậy đường dẫn file, thông báo lỗi, quyết định đã chốt đều phải được viết thẳng vào prompt đó.</p>\n<p>Bài viết về hệ nghiên cứu của Anthropic nêu bốn thứ một lời giao việc cần có: <strong>mục tiêu</strong>, <strong>định dạng output</strong>, <strong>hướng dẫn về tool/nguồn nên dùng</strong>, và <strong>ranh giới nhiệm vụ</strong>. Thiếu chúng, các subagent làm trùng việc của nhau.</p>\n<pre>Mục tiêu: Tìm các nghiên cứu 2023–2025 về pin natri-ion cho lưu trữ lưới điện.\nPhạm vi: CHỈ natri-ion. Lithium-ion và pin dòng chảy đã có agent khác lo.\nNguồn: ưu tiên bài peer-reviewed và báo cáo của cơ quan năng lượng; bỏ qua blog bán hàng.\nOutput: danh sách JSON, mỗi mục gồm\n  {\"claim\": ..., \"source_url\": ..., \"published\": \"YYYY-MM\", \"excerpt\": ...}\nNếu không tìm được nguồn cho một ý, ghi rõ \"chưa có nguồn\", đừng đoán.</pre>\n<p>Yêu cầu subagent trả <strong>kết quả có cấu trúc kèm nguồn</strong> (claim, URL, ngày) giúp coordinator tổng hợp mà vẫn giữ được nguồn gốc (xem Domain 5).</p>\n<h4>Chạy song song và điều chỉnh mức đầu tư</h4>\n<ul>\n<li>Coordinator có thể phát <strong>nhiều lời gọi tool <code>Agent</code> trong cùng một response</strong>, và các subagent chạy đồng thời. Theo docs SDK, các việc con độc lập khi đó xong trong thời gian của việc chậm nhất chứ không phải tổng thời gian. Docs hiện ghi (tháng 11/2026) subagent mặc định chạy nền: kết quả tool <code>Agent</code> trả <code>status: \"async_launched\"</code> và báo cáo đến ở lượt sau (chi tiết ở l-1-6).</li>\n<li>Bài viết về hệ nghiên cứu cho biết họ ghi quy tắc “đầu tư theo độ khó” vào prompt: câu hỏi tra cứu đơn giản chỉ dùng một agent với vài lời gọi tool, câu hỏi phức tạp mới chia cho nhiều subagent. Cũng theo bài viết, hệ nhiều agent tốn token hơn nhiều so với chat thường, nên chỉ đáng dùng cho việc có giá trị cao.</li>\n<li>Sau khi tổng hợp, coordinator nên tự kiểm tra lỗ hổng (mảng nào chưa có nguồn, chỗ nào mâu thuẫn) rồi giao thêm việc có mục tiêu hẹp. Đừng coi lượt đầu là kết quả cuối.</li>\n</ul>\n<h4>Định nghĩa subagent trong Agent SDK</h4>\n<pre>options = ClaudeAgentOptions(\n    allowed_tools=[\"Read\", \"Grep\", \"Glob\", \"Agent\"],   # tự duyệt cả tool Agent\n    agents={\n        \"contract-reviewer\": AgentDefinition(\n            description=\"Reviews contracts for legal risk. Use for clause-level analysis.\",\n            prompt=\"You are a contract analyst. Report each risk with clause and severity.\",\n            tools=[\"Read\", \"Grep\", \"Glob\"],            # chỉ đọc\n            model=\"sonnet\",\n        )\n    },\n)</pre>\n<p><code>description</code> là thứ Claude dựa vào để quyết định giao việc cho subagent nào. <code>tools</code> giới hạn quyền của subagent. Muốn chắc chắn dùng một subagent cụ thể thì gọi tên nó trong prompt.</p>\n<div class=\"warn\">Bẫy hay gặp: subagent trả kết quả chung chung, và đáp án nhiễu đề xuất “đổi model lớn hơn” hoặc “cho thêm tool”. Gốc rễ thường là lời giao việc thiếu context (“phân tích các hợp đồng ta vừa bàn”), mà subagent không hề thấy cuộc trao đổi đó.</div>",
     "keypoints": [
      "Bắt đầu đơn giản; workflow cố định cho việc đoán trước được, orchestrator-workers khi việc con không đoán trước được.",
      "Coordinator là trung tâm: chia việc, giao, tổng hợp; báo cáo thiếu mảng thì xem lại bước chia việc.",
      "Subagent (trừ fork) không thấy lịch sử của agent cha; mọi context phải nằm trong prompt của lời gọi tool Agent.",
      "Lời giao việc tốt có mục tiêu, định dạng output, hướng dẫn nguồn/tool và ranh giới.",
      "Nhiều lời gọi Agent trong một response thì chạy song song; mức đầu tư nên tương xứng độ khó."
     ],
     "sources": [
      {
       "t": "Building effective agents",
       "u": "https://www.anthropic.com/engineering/building-effective-agents"
      },
      {
       "t": "How we built our multi-agent research system",
       "u": "https://www.anthropic.com/engineering/multi-agent-research-system"
      },
      {
       "t": "Subagents in the SDK",
       "u": "https://code.claude.com/docs/en/agent-sdk/subagents"
      }
     ],
     "ts": [
      "1.2",
      "1.3"
     ]
    },
    {
     "id": "l-1-3",
     "title": "Hook và cưỡng chế bằng code so với lời dặn trong prompt",
     "minutes": 13,
     "html": "<p>Prompt là hướng dẫn mang tính <em>xác suất</em>: Claude làm theo phần lớn thời gian, nhưng không phải lúc nào cũng vậy. Docs Claude Code nói thẳng rằng CLAUDE.md là <strong>context, không phải cấu hình bị cưỡng chế</strong>, và muốn chặn một hành động bất kể Claude quyết định gì thì dùng hook <code>PreToolUse</code>. Đề thi rất thích tình huống “quy tắc trong prompt được tuân thủ 97%, nhưng 3% còn lại gây thiệt hại”.</p>\n<h4>Khi nào prompt là đủ, khi nào phải dùng code</h4>\n<table>\n<thead><tr><th>Prompt/CLAUDE.md là đủ</th><th>Phải cưỡng chế bằng code</th></tr></thead>\n<tbody>\n<tr><td>Giọng văn, cách trình bày, quy ước đặt tên</td><td>Giới hạn tiền (hoàn tiền trên ngưỡng cần người duyệt)</td></tr>\n<tr><td>Ưu tiên thư viện A hơn B</td><td>Thứ tự bắt buộc (xác minh danh tính trước khi sửa tài khoản)</td></tr>\n<tr><td>Gợi ý cách tiếp cận</td><td>Bảo mật: chặn lệnh phá hoại, chặn đọc file bí mật</td></tr>\n<tr><td>Sai một lần không gây hại lớn</td><td>Tuân thủ pháp lý, dữ liệu cá nhân</td></tr>\n</tbody>\n</table>\n<h4>Ba chỗ đặt rào chắn cứng</h4>\n<ol>\n<li><strong>Trong chính tool</strong> (điều kiện tiên quyết). Ví dụ <code>process_refund</code> kiểm tra trạng thái phiên: nếu <code>verify_customer</code> chưa thành công thì từ chối và trả lỗi có cấu trúc giải thích lý do. Model không thể “quên” bước này, vì tool không cho đi tiếp.</li>\n<li><strong>Hook <code>PreToolUse</code></strong>: chạy trước khi tool thực thi, đọc tên tool và input, rồi cho phép, từ chối, hoặc hỏi người dùng. Hợp với chính sách áp lên nhiều tool, hoặc khi bạn không sửa được tool (ví dụ tool MCP của bên thứ ba).</li>\n<li><strong>Permission rule</strong> trong Claude Code (<code>deny</code>/<code>ask</code>/<code>allow</code>), xem Domain 3.</li>\n</ol>\n<h4>Hook trong Claude Code</h4>\n<p>Hook khai báo trong file settings, lồng ba cấp: sự kiện, nhóm matcher, rồi handler.</p>\n<pre>{\n  \"hooks\": {\n    \"PreToolUse\": [\n      {\n        \"matcher\": \"Bash\",\n        \"hooks\": [\n          { \"type\": \"command\",\n            \"command\": \"${CLAUDE_PROJECT_DIR}/.claude/hooks/block-prod.sh\" }\n        ]\n      }\n    ]\n  }\n}</pre>\n<ul>\n<li><strong>Matcher</strong>: chuỗi chỉ gồm chữ, số, <code>_</code>, <code>-</code>, khoảng trắng, dấu phẩy và <code>|</code> được so khớp chính xác, có thể là danh sách cách nhau bởi <code>|</code> hoặc dấu phẩy (ví dụ <code>Edit|Write</code>). Vì vậy <code>mcp__memory</code> không khớp tool nào. Chuỗi có ký tự khác thì được hiểu là regex, ví dụ <code>mcp__memory__.*</code> khớp mọi tool của server <code>memory</code>.</li>\n<li><strong>Exit code</strong>: <code>0</code> là thành công, các trường JSON (nếu có) được áp dụng. <code>2</code> là <strong>chặn</strong>, và nội dung stderr trở thành lý do gửi cho Claude. Mã khác (kể cả <code>1</code>) với stdout không phải JSON hợp lệ là lỗi <em>không chặn</em>, hành động vẫn chạy. Nếu hook in JSON hợp lệ thì docs ghi Claude Code bỏ qua mã thoát đó và để các trường JSON quyết định; hook đặt <code>\"onFailure\": \"block\"</code> thì khi hỏng cũng chặn. Hook dùng để thực thi chính sách phải dùng <code>exit 2</code>.</li>\n<li><strong>Quyết định bằng JSON</strong>: <code>PreToolUse</code> có thể trả <code>hookSpecificOutput.permissionDecision</code> (<code>allow</code>, <code>deny</code>, <code>ask</code>, <code>defer</code>; <code>defer</code> chỉ dùng ở chế độ non-interactive <code>-p</code>) kèm <code>permissionDecisionReason</code>, và có thể sửa input qua <code>updatedInput</code>.</li>\n<li>Hook trả “allow” <strong>không vượt qua</strong> được rule <code>deny</code>/<code>ask</code>. Ngược lại, hook chặn bằng exit 2 thắng cả rule <code>allow</code>.</li>\n<li>Kiểu handler: <code>command</code>, <code>http</code>, <code>mcp_tool</code>, <code>prompt</code>, <code>agent</code>.</li>\n</ul>\n<h4><code>PostToolUse</code>: sau khi tool đã chạy</h4>\n<p><code>PostToolUse</code> không ngăn được hành động, vì tool đã chạy rồi. Nó dùng để phản hồi hoặc chuẩn hóa thứ Claude nhìn thấy. Docs Claude Code cho phép thêm <code>additionalContext</code>, hoặc thay output bằng <code>updatedToolOutput</code> trước khi gửi cho Claude. Ví dụ: chuẩn hóa định dạng ngày hay mã trạng thái từ nhiều nguồn khác nhau, hoặc che dữ liệu nhạy cảm. Lưu ý docs nhấn mạnh: thay output chỉ đổi thứ Claude <em>thấy</em>, còn file đã ghi hay request đã gửi thì đã xảy ra. Muốn ngăn thì phải dùng <code>PreToolUse</code>.</p>\n<h4>Hook trong Agent SDK</h4>\n<p>Agent SDK có các hook như <code>PreToolUse</code>, <code>PostToolUse</code>, <code>UserPromptSubmit</code>, <code>Stop</code>, <code>SubagentStart</code>/<code>SubagentStop</code>, <code>PreCompact</code>, dưới dạng callback chạy trong process ứng dụng của bạn. Theo docs, chúng <strong>không tốn context</strong>. Hook <code>PreToolUse</code> từ chối một lời gọi thì tool không chạy, và Claude nhận thông điệp từ chối để đổi hướng.</p>\n<div class=\"tip\">Gặp tình huống có hậu quả tài chính, bảo mật hay pháp lý mà đáp án đưa ra “viết prompt mạnh hơn / thêm few-shot / nhắc lại quy tắc”, hãy tìm đáp án cưỡng chế bằng code (hook, kiểm tra trong tool, permission).</div>\n<div class=\"warn\">Đừng dùng “điểm tự tin do model tự báo” làm cổng chặn. Đó vẫn là output của model, không phải kiểm tra xác định.</div>",
     "keypoints": [
      "Prompt và CLAUDE.md là hướng dẫn xác suất; quy tắc bắt buộc phải cưỡng chế bằng code.",
      "Ba chỗ đặt rào chắn: kiểm tra trong tool, hook PreToolUse, permission rule.",
      "Hook Claude Code: exit 2 là chặn (stderr thành lý do); exit 1 và mã khác (không kèm JSON hợp lệ) không chặn.",
      "PreToolUse có thể deny/ask/allow và sửa input; allow của hook không vượt qua rule deny.",
      "PostToolUse không ngăn được hành động, chỉ thêm context hoặc thay output Claude thấy."
     ],
     "sources": [
      {
       "t": "Hooks reference",
       "u": "https://code.claude.com/docs/en/hooks"
      },
      {
       "t": "How Claude remembers your project (CLAUDE.md)",
       "u": "https://code.claude.com/docs/en/memory"
      },
      {
       "t": "Configure permissions",
       "u": "https://code.claude.com/docs/en/permissions"
      },
      {
       "t": "How the agent loop works (hooks)",
       "u": "https://code.claude.com/docs/en/agent-sdk/agent-loop"
      }
     ],
     "ts": [
      "1.4",
      "1.5"
     ]
    },
    {
     "id": "l-1-4",
     "title": "Session (resume, fork) và thiết kế escalation",
     "minutes": 13,
     "html": "<h4>Session là gì</h4>\n<p>Trong Agent SDK và Claude Code, <strong>session</strong> là lịch sử hội thoại tích lũy khi agent làm việc: prompt, mọi lời gọi tool, kết quả tool, câu trả lời. SDK tự ghi xuống đĩa để quay lại sau. Docs nhấn mạnh một điểm hay bị hỏi: session lưu <strong>hội thoại, không lưu hệ thống file</strong>. Muốn chụp và hoàn tác thay đổi file thì dùng file checkpointing.</p>\n<h4>Continue, resume, fork</h4>\n<table>\n<thead><tr><th>Cách</th><th>Làm gì</th><th>CLI / SDK</th></tr></thead>\n<tbody>\n<tr><td>Continue</td><td>Nối vào session gần nhất trong thư mục hiện tại, không cần ID</td><td><code>claude -c</code> / <code>continue: true</code> (TS), <code>continue_conversation=True</code> (Python)</td></tr>\n<tr><td>Resume</td><td>Nối vào một session cụ thể theo ID</td><td><code>claude -r &lt;id&gt;</code> / <code>resume=session_id</code></td></tr>\n<tr><td>Fork</td><td>Tạo session mới (ID mới) bắt đầu bằng bản sao lịch sử; bản gốc giữ nguyên</td><td><code>--resume &lt;id&gt; --fork-session</code> / <code>fork_session=True</code>, <code>forkSession: true</code></td></tr>\n</tbody>\n</table>\n<p>Lấy <code>session_id</code> từ <code>ResultMessage</code> (có ở mọi kết quả, kể cả lỗi), hoặc từ message <code>init</code>. Với CLI, <code>--output-format json</code> trả về <code>session_id</code> để script resume tiếp.</p>\n<h4>Chọn cách nào</h4>\n<ul>\n<li><strong>Hỏi tiếp trên cùng phân tích</strong> (đã đọc code, giờ muốn sửa): resume, vì agent còn nguyên context, không phải đọc lại.</li>\n<li><strong>Thử hai hướng khác nhau từ cùng một điểm</strong>: fork mỗi hướng. Lưu ý fork chỉ rẽ nhánh <em>hội thoại</em>. Nếu nhánh fork sửa file thì thay đổi đó là thật và mọi session cùng thư mục đều thấy.</li>\n<li><strong>Chạm <code>error_max_turns</code></strong>: docs gợi ý resume với giới hạn cao hơn.</li>\n<li><strong>Context cũ đã lỗi thời hoặc session quá dài</strong>: bắt đầu session mới và đưa vào một bản tóm tắt có cấu trúc các phát hiện chính. Docs nói khi chạy trên nhiều máy, việc lưu kết quả cần thiết (phân tích, quyết định, diff) làm state của ứng dụng rồi đưa vào prompt của session mới “thường bền hơn” so với chuyển file transcript.</li>\n</ul>\n<div class=\"warn\">Resume sau khi đồng đội đã sửa file: kết quả tool cũ trong lịch sử (nội dung file, chữ ký hàm) giờ đã sai. Hãy nói rõ cho agent <em>file nào đã đổi</em> để nó đọc lại, hoặc mở session mới với bản tóm tắt. Fork không “làm mới” hệ thống file.</div>\n<h4>Thiết kế escalation sang người</h4>\n<p>Với agent chăm sóc khách hàng, câu hỏi kiến trúc là <em>khi nào</em> chuyển cho nhân viên và <em>chuyển cái gì</em>. Docs chính thức không nêu bộ quy tắc escalation cụ thể; phần dưới là <strong>lời khuyên thiết kế</strong> (khớp với hướng dẫn ôn thi), không phải nội dung trích từ docs. Các tín hiệu đáng tin:</p>\n<ul>\n<li><strong>Khách yêu cầu rõ ràng được gặp người.</strong> Tôn trọng ngay, đừng cố níu kéo tự giải quyết.</li>\n<li><strong>Chính sách không bao quát trường hợp này</strong> (ngoại lệ, chính sách im lặng). Agent không nên tự bịa chính sách.</li>\n<li><strong>Không tiến triển được</strong> sau vài lần thử hợp lý, hoặc thiếu quyền/thiếu dữ liệu.</li>\n<li><strong>Hành động vượt ngưỡng rủi ro</strong>. Ngưỡng này nên được cưỡng chế bằng code (bài trước), không chỉ dặn trong prompt.</li>\n</ul>\n<p>Các tín hiệu kém tin cậy hay xuất hiện làm đáp án nhiễu: <strong>chỉ dựa vào cảm xúc</strong> (khách bực không có nghĩa là việc vượt khả năng agent), <strong>điểm tự tin model tự báo</strong> (không được hiệu chuẩn), <strong>số lượt hội thoại</strong> cố định. Khi tra cứu khách hàng ra <em>nhiều</em> kết quả khớp, agent nên hỏi thêm thông tin định danh thay vì tự chọn theo phỏng đoán.</p>\n<p>Viết tiêu chí escalation <strong>rõ ràng trong system prompt</strong>, kèm vài ví dụ ranh giới (nên chuyển / không nên chuyển), thường cải thiện quyết định hơn là thêm một mô hình phân loại riêng.</p>\n<h4>Gói bàn giao</h4>\n<p>Nhân viên nhận việc thường không đọc lại toàn bộ transcript, nên agent cần tạo một bản tóm tắt có cấu trúc:</p>\n<pre>{\n  \"customer_id\": \"C-20931\",\n  \"verified\": true,\n  \"issue\": \"Yêu cầu hoàn 720 USD cho đơn #88412, vượt ngưỡng tự duyệt\",\n  \"facts\": {\"order_date\": \"2025-03-02\", \"amount\": 720.00, \"status\": \"delivered_damaged\"},\n  \"actions_taken\": [\"Đã xác minh danh tính\", \"Đã kiểm tra ảnh hư hỏng\"],\n  \"reason_for_escalation\": \"amount_above_threshold\",\n  \"recommended_next_step\": \"Duyệt hoàn tiền đầy đủ hoặc đổi hàng\"\n}</pre>",
     "keypoints": [
      "Session lưu hội thoại, không lưu file; fork chỉ rẽ nhánh lịch sử.",
      "Resume để làm tiếp trên cùng phân tích; fork để thử hướng khác mà giữ bản gốc; continue lấy session gần nhất.",
      "File đã đổi sau lần chạy trước: báo agent file nào đổi, hoặc mở session mới kèm bản tóm tắt.",
      "Escalate khi khách yêu cầu người, chính sách không bao quát, không tiến triển được, hoặc vượt ngưỡng rủi ro.",
      "Cảm xúc hay điểm tự tin model tự báo không phải tiêu chí escalation đáng tin; bàn giao bằng tóm tắt có cấu trúc."
     ],
     "sources": [
      {
       "t": "Work with sessions (Agent SDK)",
       "u": "https://code.claude.com/docs/en/agent-sdk/sessions"
      },
      {
       "t": "CLI reference",
       "u": "https://code.claude.com/docs/en/cli-reference"
      },
      {
       "t": "Run Claude Code programmatically",
       "u": "https://code.claude.com/docs/en/headless"
      }
     ],
     "ts": [
      "1.7",
      "1.4",
      "5.2"
     ]
    },
    {
     "id": "l-1-5",
     "title": "Chia việc lớn: prompt chaining, routing, song song và phân rã động",
     "minutes": 13,
     "html": "<p>Bài l-1-2 đã liệt kê các mẫu workflow. Bài này đi sâu vào câu hỏi đề hay đặt ra: <em>với một việc cụ thể, nên cắt thành các bước cố định trong code, hay để một agent tự lập kế hoạch?</em> Câu trả lời phụ thuộc vào một điều: <strong>bạn có biết trước các bước con không</strong>.</p>\n<h4>Đường đi biết trước: prompt chaining</h4>\n<p>Prompt chaining chia việc thành chuỗi lời gọi, mỗi lời gọi xử lý output của bước trước. “Building effective agents” nói mẫu này hợp khi việc tách gọn thành các bước con cố định, và mục tiêu là <strong>đổi độ trễ lấy độ chính xác</strong>: mỗi lời gọi chỉ làm một việc dễ hơn. Giữa các bước có thể đặt <strong>gate</strong>, tức kiểm tra bằng code xem bước trước có đạt không rồi mới đi tiếp.</p>\n<pre>outline = call(\"Lập dàn ý báo cáo sự cố từ log sau...\", log)\nif not has_sections(outline, [\"timeline\", \"root_cause\", \"action_items\"]):\n    outline = call(\"Dàn ý thiếu mục bắt buộc. Bổ sung...\", outline)   # gate bằng code\nreport  = call(\"Viết báo cáo theo dàn ý đã duyệt...\", outline)\nsummary = call(\"Tóm tắt báo cáo trong 5 gạch đầu dòng cho quản lý\", report)</pre>\n<p>Docs prompting hiện ghi rằng với thinking thích ứng và khả năng tự điều phối subagent, Claude tự xử lý phần lớn suy luận nhiều bước. Chaining tường minh vẫn hữu ích khi bạn <strong>cần xem output trung gian</strong> hoặc <strong>cần ép một cấu trúc pipeline</strong>. Mẫu chaining phổ biến nhất mà docs nêu là tự sửa: viết nháp, cho Claude review theo tiêu chí, rồi sửa theo review, mỗi bước một lời gọi riêng để log và đánh giá được.</p>\n<h4>Đầu vào rơi vào các loại rõ ràng: routing</h4>\n<p>Routing phân loại đầu vào rồi chuyển sang xử lý chuyên biệt. Lợi ích là tách mối quan tâm: tối ưu prompt cho loại này không làm hỏng loại khác. Ví dụ agent hỗ trợ khách: câu hỏi chung, yêu cầu hoàn tiền, lỗi kỹ thuật đi ba nhánh với prompt và bộ tool khác nhau. Bài viết cũng nêu cách route câu dễ sang model nhỏ, rẻ và câu khó sang model mạnh hơn. Điều kiện: việc phân loại phải làm chính xác được.</p>\n<h4>Các phần độc lập: parallelization</h4>\n<ul>\n<li><strong>Sectioning</strong>: tách thành các phần độc lập chạy cùng lúc. Ví dụ một instance trả lời khách, một instance khác chỉ sàng lọc nội dung không phù hợp. Bài viết ghi cách này thường tốt hơn để một lời gọi gánh cả hai.</li>\n<li><strong>Voting</strong>: chạy cùng một việc nhiều lần hoặc bằng nhiều prompt khác nhau, rồi gộp. Ví dụ nhiều prompt cùng soát lỗ hổng bảo mật trong một đoạn code; ngưỡng phiếu quyết định cân bằng giữa false positive và false negative.</li>\n</ul>\n<h4>Không biết trước các bước: phân rã động</h4>\n<p>Với <strong>orchestrator-workers</strong>, một LLM trung tâm tự chia việc dựa trên đầu vào cụ thể. Về hình dạng nó giống parallelization, nhưng khác ở chỗ các việc con <em>không định sẵn</em>. Bài viết lấy ví dụ thay đổi code nhiều file (số file và kiểu thay đổi phụ thuộc vào yêu cầu) và tìm kiếm thông tin từ nhiều nguồn.</p>\n<p>Hệ nghiên cứu nhiều agent của Anthropic cho thấy phân rã động trông thế nào khi chạy thật:</p>\n<ul>\n<li>Agent dẫn dắt phân tích câu hỏi, lập chiến lược, <strong>lưu kế hoạch vào bộ nhớ</strong> (vì context có thể bị cắt), rồi tạo subagent cho từng khía cạnh.</li>\n<li>Sau khi nhận kết quả, nó <strong>quyết định có cần nghiên cứu thêm không</strong>: tạo thêm subagent hoặc đổi chiến lược. Kế hoạch được điều chỉnh theo những gì vừa tìm thấy.</li>\n<li>Họ ghi quy tắc mức đầu tư vào prompt: tra cứu đơn giản dùng 1 agent với 3–10 lời gọi tool; so sánh trực tiếp dùng 2–4 subagent, mỗi cái 10–15 lời gọi; nghiên cứu phức tạp có thể dùng hơn 10 subagent với trách nhiệm chia rõ.</li>\n</ul>\n<h4>Chọn thế nào</h4>\n<table>\n<thead><tr><th>Tín hiệu trong đề</th><th>Mẫu hợp</th></tr></thead>\n<tbody>\n<tr><td>Checklist cố định, các bước luôn giống nhau (review theo từng file rồi một lượt tích hợp)</td><td>Prompt chaining, có gate</td></tr>\n<tr><td>Đầu vào thuộc vài loại rõ, mỗi loại cần prompt/tool riêng</td><td>Routing</td></tr>\n<tr><td>Nhiều khía cạnh độc lập, cần nhanh hoặc cần nhiều “phiếu”</td><td>Parallelization (sectioning / voting)</td></tr>\n<tr><td>Câu hỏi mở, không biết trước cần những việc con nào</td><td>Orchestrator-workers, kế hoạch thích ứng</td></tr>\n<tr><td>Có tiêu chí đánh giá rõ, sửa lặp mang lại giá trị đo được</td><td>Evaluator-optimizer</td></tr>\n</tbody>\n</table>\n<div class=\"warn\">Phân rã động không phải lúc nào cũng tốt hơn. Bài viết về hệ nghiên cứu kể agent đời đầu từng sinh 50 subagent cho câu hỏi đơn giản, và nói hệ nhiều agent tốn khoảng 15 lần token so với chat. Bài viết cũng nhận xét các việc cần mọi agent chia sẻ cùng context, hoặc có nhiều phụ thuộc giữa các agent (phần lớn việc code), hiện chưa hợp với hệ nhiều agent.</div>\n<h4>Lỗi chia việc hay gặp</h4>\n<ul>\n<li><strong>Chia quá hẹp</strong>: các việc con không phủ hết chủ đề, báo cáo thiếu một mảng dù từng subagent làm đúng phần mình (xem l-1-2).</li>\n<li><strong>Chia chồng lấn</strong>: lời giao việc mơ hồ nên hai subagent cùng tìm một thứ. Bài viết kể ví dụ ba subagent được giao “nghiên cứu thiếu hụt chip”, hai trong số đó làm trùng nhau.</li>\n<li><strong>Dùng pipeline cứng cho việc mở</strong>: bước 2 phát hiện hướng mới nhưng code không có nhánh nào cho nó.</li>\n<li><strong>Dùng agent tự do cho việc cố định</strong>: tốn token, khó dự đoán, khó kiểm thử, trong khi ba lời gọi nối tiếp là đủ.</li>\n</ul>\n<div class=\"tip\">Đề mô tả “các bước luôn giống nhau, cần dễ kiểm tra từng bước” thì chọn chaining. Đề mô tả “không biết trước phải tìm gì, kết quả bước trước quyết định bước sau” thì chọn coordinator lập kế hoạch thích ứng.</div>",
     "keypoints": [
      "Câu hỏi quyết định: các bước con có biết trước không? Biết trước thì chaining/routing; không thì orchestrator-workers.",
      "Prompt chaining đổi độ trễ lấy độ chính xác; đặt gate bằng code giữa các bước.",
      "Parallelization có hai dạng: sectioning (phần độc lập) và voting (nhiều lần/nhiều prompt rồi gộp).",
      "Phân rã động: agent dẫn dắt lưu kế hoạch, giao việc, xem kết quả rồi quyết định nghiên cứu thêm.",
      "Hệ nhiều agent tốn token hơn nhiều; ghi quy tắc mức đầu tư theo độ khó vào prompt."
     ],
     "sources": [
      {
       "t": "Building effective agents",
       "u": "https://www.anthropic.com/engineering/building-effective-agents"
      },
      {
       "t": "How we built our multi-agent research system",
       "u": "https://www.anthropic.com/engineering/multi-agent-research-system"
      },
      {
       "t": "Prompting best practices (Chain complex prompts)",
       "u": "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices"
      }
     ],
     "ts": [
      "1.6",
      "1.2"
     ]
    },
    {
     "id": "l-1-6",
     "title": "Cấu hình subagent trong Agent SDK: AgentDefinition, tool Agent và giới hạn",
     "minutes": 13,
     "html": "<p>Bài l-1-2 nói vì sao cần subagent và viết lời giao việc ra sao. Bài này đi vào phần cấu hình trong Claude Agent SDK: định nghĩa subagent bằng code, subagent nhận được gì, cách theo dõi, và các giới hạn để một prompt không nở thành cả “cây” agent tốn kém.</p>\n<h4>Ba cách có subagent</h4>\n<ul>\n<li><strong>Bằng code</strong>: tham số <code>agents</code> trong options của <code>query()</code>. Docs khuyên dùng cách này cho ứng dụng SDK.</li>\n<li><strong>Bằng file</strong>: markdown có frontmatter trong <code>.claude/agents/</code> (giống Claude Code, xem l-3-2). Nếu trùng tên, định nghĩa bằng code thắng.</li>\n<li><strong>Built-in <code>general-purpose</code></strong>: Claude gọi được qua tool <code>Agent</code> mà không cần bạn định nghĩa gì.</li>\n</ul>\n<h4>AgentDefinition: các trường đáng nhớ</h4>\n<table>\n<thead><tr><th>Trường</th><th>Bắt buộc</th><th>Ý nghĩa</th></tr></thead>\n<tbody>\n<tr><td><code>description</code></td><td>Có</td><td>Khi nào nên dùng agent này. Claude dựa vào đây để tự chọn</td></tr>\n<tr><td><code>prompt</code></td><td>Có</td><td>System prompt của subagent: vai trò, cách làm, định dạng trả về</td></tr>\n<tr><td><code>tools</code></td><td>Không</td><td>Danh sách tool được phép. Bỏ trống thì thừa hưởng mọi tool dành cho subagent</td></tr>\n<tr><td><code>disallowedTools</code></td><td>Không</td><td>Bớt tool khỏi bộ tool; nhận cả mẫu <code>mcp__server__*</code></td></tr>\n<tr><td><code>model</code></td><td>Không</td><td>Alias như <code>'sonnet'</code>, <code>'haiku'</code>, <code>'inherit'</code> (dùng model chính) hoặc model ID đầy đủ</td></tr>\n<tr><td><code>maxTurns</code></td><td>Không</td><td>Số lượt tối đa; chạm giới hạn thì kết quả được đánh dấu là chưa xong</td></tr>\n<tr><td><code>mcpServers</code>, <code>skills</code></td><td>Không</td><td>MCP server và skill dành riêng cho agent này</td></tr>\n</tbody>\n</table>\n<pre>options = ClaudeAgentOptions(\n    allowed_tools=[\"Read\", \"Grep\", \"Glob\", \"Agent\"],      # tự duyệt các lời gọi này\n    agents={\n        \"invoice-auditor\": AgentDefinition(\n            description=\"Audits one vendor's invoices against contract rates. \"\n                        \"Use when a task names a vendor and asks about overcharges.\",\n            prompt=\"You audit invoices. For each discrepancy return JSON: \"\n                   \"{invoice_id, line, billed, contract_rate, source_file}.\",\n            tools=[\"Read\", \"Grep\", \"Glob\"],                # chỉ đọc, không có Agent\n            model=\"haiku\",\n            maxTurns=30,\n        )\n    },\n)</pre>\n<p>Trong ví dụ, <code>tools</code> của subagent không có <code>Agent</code>, nên nó không tự sinh subagent con được. Docs Claude Code ghi rõ: bỏ <code>Agent</code> khỏi danh sách tools thì agent đó không spawn subagent bằng tool Agent.</p>\n<div class=\"warn\">Hai lớp khác nhau: <code>allowed_tools</code> là <strong>quyền</strong> (lời gọi được tự duyệt), không phải danh sách tool <em>tồn tại</em>. Docs permissions ghi tool không có trong <code>allowed_tools</code> vẫn có mặt, chỉ là lời gọi cần duyệt sẽ đi tiếp qua permission mode. Muốn bỏ hẳn một tool khỏi context thì dùng <code>tools</code> hoặc ghi tên trần trong <code>disallowed_tools</code>.</div>\n<h4>Subagent nhận gì, không nhận gì</h4>\n<table>\n<thead><tr><th>Nhận</th><th>Không nhận</th></tr></thead>\n<tbody>\n<tr><td>System prompt riêng (<code>prompt</code>) và chuỗi prompt của lời gọi <code>Agent</code></td><td>Lịch sử hội thoại và kết quả tool của agent cha</td></tr>\n<tr><td>CLAUDE.md của project (nếu SDK nạp qua <code>settingSources</code>)</td><td>System prompt của agent cha</td></tr>\n<tr><td>Định nghĩa tool (thừa hưởng, hoặc tập con trong <code>tools</code>)</td><td>Nội dung skill, trừ khi liệt kê trong <code>skills</code></td></tr>\n</tbody>\n</table>\n<p>Ngoại lệ là <strong>fork</strong>: subagent bắt đầu bằng bản sao cuộc hội thoại thay vì context trống. Với subagent thường, mọi đường dẫn file, thông báo lỗi, quyết định đã chốt phải được viết vào prompt của lời gọi <code>Agent</code>. Docs cũng lưu ý agent cha có thể tóm tắt lại báo cáo của subagent; nếu cần giữ nguyên văn thì dặn điều đó trong prompt của <code>query()</code> chính.</p>\n<h4>Gọi, chờ và theo dõi</h4>\n<ul>\n<li><strong>Tự động</strong>: Claude so việc với <code>description</code>. <strong>Tường minh</strong>: nêu tên trong prompt (“dùng agent invoice-auditor để…”) để chắc chắn dùng đúng subagent.</li>\n<li><strong>Song song</strong>: nhiều subagent chạy đồng thời, việc độc lập xong trong thời gian của việc chậm nhất.</li>\n<li><strong>Chờ hay không</strong>: docs hiện ghi (tháng 11/2026) subagent mặc định chạy nền; kết quả tool Agent có <code>status: \"async_launched\"</code> và báo cáo đến ở lượt sau. Khi bước tiếp theo cần báo cáo, Claude chờ và nhận <code>status: \"completed\"</code>. Bạn có thể dặn “chạy rồi chờ” trong prompt, hoặc đặt <code>background: true</code> để giữ một agent luôn chạy nền.</li>\n<li><strong>Nhận diện</strong>: lời gọi subagent là khối <code>tool_use</code> có <code>name</code> là <code>\"Agent\"</code>. Message phát ra từ bên trong subagent có trường <code>parent_tool_use_id</code>.</li>\n<li><strong>Resume subagent</strong>: kết quả tool Agent chứa <code>agentId</code>. Resume cùng session rồi nhắc agentId trong prompt để subagent làm tiếp với nguyên lịch sử của nó. Explore và Plan là loại chạy một lần, không trả agentId.</li>\n</ul>\n<div class=\"warn\">Tên tool: docs ghi tool hiện tên <code>\"Agent\"</code> trong khối <code>tool_use</code> nhưng vẫn là <code>\"Task\"</code> trong danh sách tool của message <code>init</code>; trước Claude Code v2.1.63 khối <code>tool_use</code> cũng dùng <code>\"Task\"</code>. Tài liệu ôn thi viết trước đó gọi là “Task tool”. Hai tên chỉ cùng một cơ chế.</div>\n<h4>Giới hạn độ sâu, số lượng và chi phí</h4>\n<p>Docs hiện ghi (tháng 11/2026) subagent <strong>có thể</strong> sinh subagent con, nên một prompt có thể thành một cây agent. Có ba nút chặn:</p>\n<table>\n<thead><tr><th>Giới hạn</th><th>Đặt bằng</th><th>Mặc định docs ghi</th></tr></thead>\n<tbody>\n<tr><td>Độ sâu</td><td>Biến môi trường <code>CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH</code></td><td>3 tầng dưới agent chính; đặt <code>1</code> để tắt lồng nhau</td></tr>\n<tr><td>Số chạy đồng thời</td><td><code>CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS</code></td><td>20; vượt thì nhận <code>Concurrent subagent limit reached</code></td></tr>\n<tr><td>Chi phí</td><td><code>max_budget_usd</code> / <code>maxBudgetUsd</code></td><td>Không giới hạn; chạm trần thì kết thúc với <code>error_max_budget_usd</code></td></tr>\n</tbody>\n</table>\n<p>Docs nhấn mạnh lời dặn trong prompt (“đừng tự giao việc trừ khi được yêu cầu”) chỉ định hướng Claude, nên vẫn phải đặt các giới hạn trên để harness cưỡng chế.</p>\n<div class=\"tip\">Câu hỏi “coordinator không gọi được subagent / subagent làm việc chung chung” thường xoay quanh ba thứ: tool <code>Agent</code> có trong bộ tool và được phép không, <code>description</code> có đủ rõ để Claude chọn không, và prompt giao việc có chứa đủ context không.</div>",
     "keypoints": [
      "SDK: định nghĩa subagent bằng tham số agents (AgentDefinition); description và prompt là bắt buộc.",
      "Subagent thường chỉ nhận system prompt riêng, prompt của lời gọi Agent, CLAUDE.md và tool; không thấy lịch sử cha.",
      "allowed_tools là quyền tự duyệt, không phải danh sách tool tồn tại; bỏ Agent khỏi tools để chặn sinh subagent con.",
      "Nhận diện lời gọi qua tool_use name 'Agent' (tên cũ 'Task') và parent_tool_use_id trên message của subagent.",
      "Docs hiện ghi subagent có thể lồng nhau (mặc định 3 tầng) và chạy nền mặc định; giới hạn bằng biến môi trường và max_budget_usd."
     ],
     "sources": [
      {
       "t": "Subagents in the SDK",
       "u": "https://code.claude.com/docs/en/agent-sdk/subagents"
      },
      {
       "t": "Create custom subagents (Claude Code)",
       "u": "https://code.claude.com/docs/en/sub-agents"
      },
      {
       "t": "Configure permissions (Agent SDK)",
       "u": "https://code.claude.com/docs/en/agent-sdk/permissions"
      }
     ],
     "ts": [
      "1.3"
     ]
    },
    {
     "id": "l-1-7",
     "title": "Hook trong Agent SDK: chặn lời gọi, sửa input và chuẩn hóa dữ liệu tool",
     "minutes": 12,
     "html": "<p>Bài l-1-3 giải thích vì sao quy tắc bắt buộc phải cưỡng chế bằng code và cách hook chạy trong Claude Code (lệnh shell, exit code). Bài này nhìn từ phía ứng dụng viết bằng Claude Agent SDK, nơi hook là <strong>hàm callback trong chính process của bạn</strong>. Kịch bản đề hay dùng: agent hỗ trợ khách gọi tool hoàn tiền và các tool MCP trả dữ liệu không đồng nhất.</p>\n<h4>Hook chạy thế nào</h4>\n<ol>\n<li>Một sự kiện xảy ra: sắp gọi tool (<code>PreToolUse</code>), tool vừa trả kết quả (<code>PostToolUse</code>), tool lỗi (<code>PostToolUseFailure</code>), subagent bắt đầu/kết thúc, sắp compact…</li>\n<li>SDK lấy các hook đã đăng ký cho sự kiện đó, lọc bằng <code>matcher</code> (với hook tool, matcher so với <strong>tên tool</strong>).</li>\n<li>Callback nhận input (tên tool, input của tool, session ID…), làm việc của nó, rồi trả về quyết định.</li>\n</ol>\n<pre>async def refund_guard(input_data, tool_use_id, context):\n    amount = input_data[\"tool_input\"].get(\"amount\", 0)\n    if amount &gt; 500:\n        return {\"hookSpecificOutput\": {\n            \"hookEventName\": input_data[\"hook_event_name\"],\n            \"permissionDecision\": \"deny\",\n            \"permissionDecisionReason\":\n                \"Refunds above 500 USD need a human. Call escalate_to_human \"\n                \"with the order id and amount instead.\"}}\n    return {}                                   # {} = cho đi tiếp, không đổi gì\n\noptions = ClaudeAgentOptions(hooks={\n    \"PreToolUse\": [HookMatcher(matcher=\"mcp__billing__process_refund\",\n                               hooks=[refund_guard])]})</pre>\n<p>Lý do từ chối đi về cho Claude, nên thông điệp nên nói <em>làm gì thay thế</em>. Matcher chỉ khớp tên tool; muốn lọc theo đường dẫn file hay số tiền thì kiểm tra trong callback như ví dụ.</p>\n<h4>Callback trả về được gì</h4>\n<table>\n<thead><tr><th>Sự kiện</th><th>Trường trong <code>hookSpecificOutput</code></th><th>Tác dụng</th></tr></thead>\n<tbody>\n<tr><td><code>PreToolUse</code></td><td><code>permissionDecision</code>: <code>allow</code> / <code>deny</code> / <code>ask</code> / <code>defer</code>, kèm <code>permissionDecisionReason</code></td><td>Cho chạy, chặn, hỏi người, hoặc hoãn lời gọi để xử lý sau</td></tr>\n<tr><td><code>PreToolUse</code></td><td><code>updatedInput</code></td><td>Thay input trước khi tool chạy (ví dụ ép đường dẫn vào thư mục sandbox)</td></tr>\n<tr><td><code>PostToolUse</code></td><td><code>additionalContext</code></td><td>Thêm thông tin kèm kết quả tool</td></tr>\n<tr><td><code>PostToolUse</code></td><td><code>updatedToolOutput</code></td><td>Thay output tool trước khi Claude thấy; dùng được cho built-in lẫn MCP tool</td></tr>\n</tbody>\n</table>\n<p>Ngoài ra có các trường cấp cao nhất cho mọi sự kiện: <code>systemMessage</code> (hiện cho người dùng) và <code>continue</code> (agent có chạy tiếp sau hook không). Trả <code>{}</code> nghĩa là không có ý kiến.</p>\n<h4>Chuẩn hóa dữ liệu bằng PostToolUse</h4>\n<p>Ba MCP server trả ngày theo ba kiểu: Unix timestamp, <code>03/04/2025</code>, ISO 8601. Claude phải tự đoán và có thể đọc nhầm ngày/tháng. Nếu tool là của bạn, sửa ngay trong tool. Nếu là tool bên thứ ba, một hook <code>PostToolUse</code> chuẩn hóa trước khi kết quả vào context:</p>\n<pre>async def normalize_dates(input_data, tool_use_id, context):\n    raw = input_data[\"tool_response\"]            # kết quả gốc của tool\n    fixed = convert_dates_to_iso(raw)            # hàm của bạn; giữ nguyên hình dạng\n    return {\"hookSpecificOutput\": {\n        \"hookEventName\": \"PostToolUse\",\n        \"updatedToolOutput\": fixed}}\n\nhooks = {\"PostToolUse\": [HookMatcher(matcher=\"^mcp__\", hooks=[normalize_dates])]}</pre>\n<p>Docs hooks ghi hai lưu ý: giá trị thay thế phải <strong>khớp hình dạng output</strong> của tool (với built-in tool, sai hình dạng thì bị bỏ qua và dùng output gốc; output MCP thì không được kiểm schema), và việc thay output <strong>chỉ đổi thứ Claude thấy</strong>, còn hành động của tool đã xảy ra rồi. Đừng xóa chi tiết lỗi mà Claude cần.</p>\n<h4>Thứ tự kiểm tra quyền trong SDK</h4>\n<p>Docs permissions của SDK mô tả một lời gọi tool đi qua các bước theo thứ tự: <strong>hook → rule deny → rule ask → permission mode → rule allow → callback <code>canUseTool</code></strong>. Hệ quả hay bị hỏi:</p>\n<ul>\n<li>Hook trả <code>allow</code> <strong>không bỏ qua</strong> bước rule deny và ask. Rule deny vẫn chặn, kể cả ở <code>bypassPermissions</code>.</li>\n<li>Lời gọi đã được tự duyệt ở bước trước (bởi rule allow, <code>acceptEdits</code>, <code>bypassPermissions</code>) sẽ <strong>không tới</strong> <code>canUseTool</code>. Kiểm tra đặt trong <code>canUseTool</code> có thể bị bỏ qua âm thầm; kiểm tra bắt buộc nên đặt ở hook <code>PreToolUse</code>.</li>\n<li>Nhiều hook cùng khớp chạy <strong>song song</strong>; quyết định chặt nhất thắng (deny, rồi defer, rồi ask, rồi allow). Đừng viết hook phụ thuộc vào việc hook khác đã chạy trước.</li>\n</ul>\n<h4>Khi chính hook hỏng</h4>\n<div class=\"warn\">Docs hiện ghi (tháng 11/2026): với phần lớn sự kiện, nếu callback ném lỗi hoặc trả output sai định dạng thì <strong>hành động vẫn diễn ra</strong> và ứng dụng nhận cảnh báo. Một hook bảo vệ bị crash nghĩa là lời gọi đi tiếp vào luồng permission bình thường. Muốn chặn khi callback lỗi thì đặt <code>onFailure: \"block\"</code> (TypeScript) hoặc <code>on_failure=\"block\"</code> (Python) trên matcher, có yêu cầu phiên bản SDK. Ngược lại, khi hook <code>PreToolUse</code> quá thời gian chờ thì lời gọi tool bị chặn.</div>\n<h4>Hook hay prompt?</h4>\n<table>\n<thead><tr><th>Yêu cầu</th><th>Cách đúng</th></tr></thead>\n<tbody>\n<tr><td>Không bao giờ hoàn tiền trên ngưỡng mà không có người</td><td><code>PreToolUse</code> deny kèm hướng dẫn escalate, hoặc kiểm tra trong chính tool</td></tr>\n<tr><td>Chuẩn hóa ngày, mã trạng thái từ nhiều nguồn</td><td><code>PostToolUse</code> với <code>updatedToolOutput</code> (hoặc sửa trong tool nếu là của bạn)</td></tr>\n<tr><td>Ghi log mọi lời gọi tool để audit</td><td>Hook không matcher; có thể trả output async vì không cần chặn</td></tr>\n<tr><td>Giọng văn thân thiện với khách</td><td>System prompt là đủ</td></tr>\n</tbody>\n</table>\n<div class=\"tip\">Đáp án dạng “thêm dòng IMPORTANT vào system prompt” cho quy tắc tiền bạc gần như luôn sai. Tìm đáp án đặt kiểm tra ở <code>PreToolUse</code> hoặc trong tool, và trả lý do từ chối có hướng dẫn để agent đổi hướng (thường là escalate).</div>",
     "keypoints": [
      "Hook SDK là callback trong process của bạn, đăng ký theo sự kiện, lọc bằng matcher theo tên tool.",
      "PreToolUse trả permissionDecision (allow/deny/ask/defer), lý do, và updatedInput; PostToolUse trả additionalContext hoặc updatedToolOutput.",
      "updatedToolOutput phải giữ hình dạng output và chỉ đổi thứ Claude thấy; hành động của tool đã xảy ra.",
      "Thứ tự: hook → deny → ask → permission mode → allow → canUseTool; hook allow không vượt rule deny.",
      "Callback ném lỗi thì mặc định hành động vẫn chạy; cần onFailure 'block' nếu muốn chặn khi hook hỏng."
     ],
     "sources": [
      {
       "t": "Intercept and control agent behavior with hooks (Agent SDK)",
       "u": "https://code.claude.com/docs/en/agent-sdk/hooks"
      },
      {
       "t": "Configure permissions (Agent SDK)",
       "u": "https://code.claude.com/docs/en/agent-sdk/permissions"
      },
      {
       "t": "Hooks reference (PostToolUse decision control)",
       "u": "https://code.claude.com/docs/en/hooks"
      }
     ],
     "ts": [
      "1.5"
     ]
    }
   ],
   "cheat": [
    [
     "stop_reason = tool_use",
     "Chạy tool, gửi tool_result (đứng đầu message user, đúng tool_use_id), lặp tiếp"
    ],
    [
     "stop_reason = end_turn",
     "Claude xong, thoát vòng lặp"
    ],
    [
     "max_tokens / pause_turn / refusal",
     "Tăng max_tokens hoặc viết tiếp / gửi lại nội dung để tiếp tục / refusal là HTTP 200, tự kiểm tra stop_details và có thể thử lại trên model dự phòng"
    ],
    [
     "Dừng khi thấy text hoặc chữ 'done'",
     "Anti-pattern; text thường đi trước tool_use"
    ],
    [
     "Giới hạn số vòng",
     "Lưới an toàn, không phải tín hiệu dừng chính"
    ],
    [
     "Subagent ra kết quả chung chung",
     "Lời giao việc thiếu context; subagent (trừ fork) không thấy lịch sử của agent cha"
    ],
    [
     "Lời giao việc tốt",
     "Mục tiêu + định dạng output + nguồn/tool nên dùng + ranh giới"
    ],
    [
     "Báo cáo thiếu cả một mảng",
     "Xem lại bước chia việc của coordinator"
    ],
    [
     "Chạy song song",
     "Nhiều lời gọi Agent trong một response"
    ],
    [
     "Quy tắc tiền/bảo mật/thứ tự bước",
     "Cưỡng chế bằng code: kiểm tra trong tool, PreToolUse hook, permission"
    ],
    [
     "Hook chặn",
     "exit 2 (stderr thành lý do) hoặc permissionDecision: deny; exit 1 (không kèm JSON hợp lệ) không chặn"
    ],
    [
     "Resume / fork / session mới",
     "Làm tiếp / thử hướng khác / context cũ lỗi thời thì mở mới kèm tóm tắt"
    ],
    [
     "Pipeline cố định hay phân rã động",
     "Bước biết trước: prompt chaining có gate; không biết trước: coordinator lập kế hoạch thích ứng"
    ],
    [
     "AgentDefinition",
     "description + prompt bắt buộc; tools giới hạn tool; bỏ Agent khỏi tools để subagent không sinh subagent con"
    ],
    [
     "Tool Agent / Task",
     "Cùng một cơ chế; tool_use tên 'Agent', danh sách tool trong init vẫn ghi 'Task'; message từ subagent có parent_tool_use_id"
    ],
    [
     "Hook SDK chuẩn hóa dữ liệu",
     "PostToolUse + updatedToolOutput (giữ hình dạng output); chặn/sửa trước khi chạy thì PreToolUse deny/updatedInput"
    ]
   ],
   "quiz": [
    {
     "q": "A customer-support agent built on the Messages API sometimes ends the conversation right after replying \"Let me look up that order for you,\" without ever calling the lookup tool. The loop exits whenever the response contains a text block. What is the BEST fix?",
     "options": [
      "Increase max_tokens so Claude can finish its reasoning before it replies.",
      "Continue the loop while stop_reason is \"tool_use\" and exit when it is \"end_turn\".",
      "Add a system prompt rule telling Claude never to write any explanatory text before it calls a tool, so that text always signals a final answer.",
      "Stop the loop after a fixed number of iterations instead of inspecting the response content."
     ],
     "answer": 1,
     "explain": "Claude hay viết một câu dẫn rồi mới gọi tool trong cùng response, nên dùng 'có text' làm điều kiện dừng là sai. Tín hiệu đúng là stop_reason: tool_use thì chạy tool rồi lặp, end_turn thì dừng. A không liên quan, vì response không bị cắt. C là vá bằng prompt, dễ gãy và không xử lý gốc. D biến lưới an toàn thành điều kiện dừng chính, vừa có thể dừng sớm vừa phí lượt.",
     "sc": "s1",
     "ts": [
      "1.1"
     ]
    },
    {
     "q": "An airline support agent may issue refunds through a process_refund tool. Policy says refunds above $500 require a human supervisor. The rule is in the system prompt and is followed about 97% of the time, but several large refunds were issued automatically last month. What should the architect do?",
     "options": [
      "Move the refund rule to the very top of the system prompt, restate it at the end, and mark it as CRITICAL so the model weighs it more heavily.",
      "Add few-shot examples in which the agent declines refunds above $500.",
      "Have the model output a confidence score and block refunds when the score is below 0.8.",
      "Enforce the limit in code, e.g. a PreToolUse hook or a check inside process_refund that routes amounts above $500 to a human."
     ],
     "answer": 3,
     "explain": "Quy tắc tài chính bắt buộc cần cơ chế xác định. Chặn trong code (hook hoặc kiểm tra trong tool) đảm bảo 100% lời gọi vượt ngưỡng đi tới người duyệt. A và B chỉ tăng xác suất tuân thủ, vẫn có thể sót. C dựa vào điểm tự tin do model tự báo, vốn không được hiệu chuẩn và không liên quan tới số tiền.",
     "sc": "s1",
     "ts": [
      "1.5"
     ]
    },
    {
     "q": "A multi-agent research system is asked to report on \"grid-scale energy storage.\" The final report discusses only lithium-ion batteries. Logs show each subagent completed its assigned search thoroughly and returned well-sourced findings. What is the MOST likely root cause?",
     "options": [
      "The coordinator decomposed the topic too narrowly, so no subagent was assigned the other storage technologies.",
      "The web-search subagent's tool description is too short, causing poor query selection.",
      "The synthesis step dropped findings because its context window overflowed.",
      "Subagents need access to the coordinator's full conversation history so they can see the overall goal and broaden their searches on their own."
     ],
     "answer": 0,
     "explain": "Từng subagent làm tốt phần được giao, vậy mà cả mảng bị thiếu. Lỗi nằm ở bước chia việc của coordinator. B sẽ làm chất lượng tìm kiếm kém, không giải thích được việc thiếu mảng khi log cho thấy kết quả tốt. C không có dấu hiệu gì trong log. D không đúng hướng: phạm vi do lời giao việc quyết định, lịch sử hội thoại không mở rộng được nó.",
     "sc": "s3",
     "ts": [
      "1.2"
     ]
    },
    {
     "q": "A coordinator agent delegates to a custom subagent (not a fork) with the prompt \"Review the contracts we discussed and flag any risky clauses.\" The subagent returns a generic list of common contract risks unrelated to the actual files. What is the BEST change?",
     "options": [
      "Switch the subagent to a larger model so it can infer which contracts were meant.",
      "Give the subagent the same full toolset as the coordinator.",
      "Include the contract file paths, the risk criteria, and the expected output format directly in the delegation prompt, because the subagent does not see the coordinator's conversation.",
      "Raise the subagent's maximum turn count so it has time to search for the earlier discussion."
     ],
     "answer": 2,
     "explain": "Subagent bắt đầu với context mới. Thứ duy nhất nó nhận là prompt giao việc, nên 'các hợp đồng ta vừa bàn' là vô nghĩa với nó. Phải ghi rõ đường dẫn, tiêu chí và định dạng. A và B không cung cấp được thông tin còn thiếu. D cũng vậy: subagent không có cách nào 'tìm' cuộc trao đổi của agent cha.",
     "ts": [
      "1.3"
     ]
    },
    {
     "q": "You are designing escalation rules for an e-commerce support agent. Which TWO conditions are the MOST appropriate triggers for handing the case to a human? (Choose TWO.)",
     "options": [
      "The customer explicitly asks to speak with a human agent.",
      "Sentiment analysis flags the customer's latest message as frustrated.",
      "The model's self-reported confidence for its answer falls below 0.7.",
      "The request is not covered by documented policy, such as a price-match request the policy does not address.",
      "The conversation has exceeded five turns."
     ],
     "answer": [
      0,
      3
     ],
     "explain": "(Lời khuyên thiết kế, không phải quy định trong docs.) Yêu cầu rõ ràng của khách và trường hợp chính sách không bao quát là hai tín hiệu đáng tin: agent không được tự bịa chính sách và phải tôn trọng mong muốn của khách. B: khách bực không có nghĩa là agent không giải quyết được. C: điểm tự tin model tự báo không được hiệu chuẩn. E: số lượt là ngưỡng tùy tiện, không phản ánh độ khó của vấn đề.",
     "sc": "s1",
     "ts": [
      "5.2"
     ]
    },
    {
     "q": "Using the Claude Agent SDK, a developer has a session in which the agent analyzed a legacy payment module. She wants to explore two different refactoring strategies from that same analysis without either attempt polluting the original session. What should she do?",
     "options": [
      "Start two fresh sessions and paste the full original transcript into each prompt so that both attempts begin with exactly the same analysis.",
      "Resume the original session with forking enabled for each strategy, leaving the original history unchanged.",
      "Use continue twice in a row, once for each strategy.",
      "Resume the same session ID from two processes at once so both strategies share one history."
     ],
     "answer": 1,
     "explain": "Fork tạo session mới có bản sao lịch sử, còn bản gốc giữ nguyên. Đây đúng là trường hợp 'thử hướng khác từ cùng một điểm'. A tốn token và dễ thiếu sót. C nối tiếp vào cùng một session, nên hai hướng trộn vào nhau. D làm hai hướng ghi chồng lên cùng một lịch sử. Lưu ý: fork chỉ rẽ nhánh hội thoại, còn file sửa thì vẫn là thật.",
     "sc": "s4",
     "ts": [
      "1.7"
     ]
    },
    {
     "q": "A developer resumes yesterday's Claude Code session about a service's API layer. Overnight, teammates merged changes to four of the files the agent had read. The agent now references function signatures that no longer exist. What is the BEST next step?",
     "options": [
      "Tell the agent which files changed and have it re-read them, or start a fresh session seeded with a summary of prior findings.",
      "Fork the session, because forking refreshes the agent's snapshot of the filesystem.",
      "Switch to a model with a larger context window so older tool results are weighted less.",
      "Run /compact so that outdated tool results are automatically discarded and replaced with the current contents of the files on disk."
     ],
     "answer": 0,
     "explain": "Kết quả tool cũ trong lịch sử đã lỗi thời. Phải chỉ rõ file nào đã đổi để agent đọc lại, hoặc mở session mới với bản tóm tắt có cấu trúc. B sai vì session và fork lưu hội thoại, không lưu hệ thống file. C không làm dữ liệu cũ đúng trở lại. D: compaction chỉ tóm tắt lịch sử, không đọc lại file.",
     "sc": "s2",
     "ts": [
      "1.7"
     ]
    },
    {
     "q": "A team adds a PreToolUse hook in .claude/settings.json to stop Claude Code from running Bash commands that touch production config. The script detects the pattern, prints an error message to stderr, and exits with code 1, but the commands still run. Why?",
     "options": [
      "The matcher \"Bash\" must be written as a regular expression to match anything.",
      "PreToolUse hooks can only observe and log tool calls; to actually block a command, the policy must be moved into a PostToolUse hook.",
      "Hooks in .claude/settings.json are ignored unless they are also defined in ~/.claude/settings.json.",
      "Exit code 1 is a non-blocking error; blocking requires exit code 2 or a deny permission decision."
     ],
     "answer": 3,
     "explain": "Theo docs hooks, exit 2 là mã chặn (stderr thành lý do). Các mã khác như 1 (khi stdout không phải JSON hợp lệ, như ở đây) là lỗi không chặn, hành động vẫn chạy. A sai: 'Bash' là chuỗi khớp chính xác hợp lệ. B ngược: PreToolUse mới chặn được, còn PostToolUse chạy khi tool đã xong. C sai: .claude/settings.json là vị trí cấp project hợp lệ.",
     "sc": "s2",
     "ts": [
      "1.5"
     ]
    }
   ],
   "bank": [
    {
     "q": "A document-processing agent built on the Messages API calls a write_report tool whose input is a long Markdown body. Occasionally the loop crashes while parsing the tool input. The failing responses have stop_reason \"max_tokens\" and end partway through a tool_use block. What should the loop do?",
     "options": [
      "Treat it as an incomplete response and retry the request with a higher max_tokens value.",
      "Execute the partial tool input anyway, since a tool_use block shows that Claude had already chosen the tool and its arguments.",
      "Retry with tool_choice set to none so that Claude writes the report as plain text instead of a tool call.",
      "Handle max_tokens exactly like end_turn and show whatever text was generated to the user as the final answer."
     ],
     "answer": 0,
     "explain": "Đúng: theo trang Stop reasons, max_tokens nghĩa là response chạm giới hạn max_tokens; docs nói rõ nếu response bị cắt chứa một khối tool_use dở dang thì phải gửi lại request với max_tokens cao hơn để nhận đủ tool call. Sai: \"chạy phần input dở dang\" — input bị cắt giữa chừng, không hợp lệ, chạy nó là ghi báo cáo hỏng. \"Đặt tool_choice none\" — bỏ luôn yêu cầu gọi tool, không sửa nguyên nhân là thiếu token. \"Coi như end_turn\" — max_tokens là bị cắt, không phải hoàn tất; trả nửa câu trả lời cho người dùng là sai.",
     "ts": [
      "1.1"
     ]
    },
    {
     "q": "A research assistant uses Anthropic's server-side web search tool. For broad questions, some responses arrive with stop_reason \"pause_turn\" and a server_tool_use block that has no result yet, and the app shows these to users as final answers. What is the correct handling?",
     "options": [
      "Run the search yourself and reply with a tool_result block that contains the results for that server_tool_use block.",
      "Send the paused response back as-is in a follow-up request so Claude can continue the turn.",
      "Treat pause_turn as a refusal and retry the same request on a fallback model.",
      "Raise max_tokens, because pause_turn means the output budget ran out before the search could finish."
     ],
     "answer": 1,
     "explain": "Đúng: docs Stop reasons ghi pause_turn xảy ra khi vòng lặp server-side chạy server tool (như web search) chạm giới hạn số vòng (docs hiện ghi mặc định 10 vòng mỗi request, tháng 11/2026); cách xử lý là gửi lại response như cũ để Claude làm tiếp. Sai: \"tự chạy search rồi gửi tool_result\" — đó là cách cho client tool (stop_reason tool_use); docs nói một response chờ client tool không bao giờ có pause_turn. \"Coi là refusal\" — refusal là stop_reason riêng. \"Tăng max_tokens\" — hết token là max_tokens, không phải pause_turn.",
     "ts": [
      "1.1"
     ]
    },
    {
     "q": "A support agent often calls get_order and get_shipment in the same response. The developer's loop appends each tool_result as its own separate user message. Over time Claude stops making parallel calls and latency grows. What is the BEST fix?",
     "options": [
      "Set disable_parallel_tool_use: true so the message history stays consistent with one tool call per turn.",
      "Insert a short assistant message between the separate tool_result messages so roles keep alternating correctly.",
      "Return all tool_result blocks for that turn together in one user message, matched by tool_use_id.",
      "Repeat the instruction to call tools in parallel inside every user message instead of only in the system prompt."
     ],
     "answer": 2,
     "explain": "Đúng: docs Parallel tool use nói lỗi phổ biến nhất là định dạng kết quả sai, cụ thể là \"một user message riêng cho mỗi tool result\", điều này \"dạy\" Claude tránh gọi song song; phải trả mọi tool_result trong một user message, ghép bằng tool_use_id, đặt trước mọi text. Sai: \"disable_parallel_tool_use\" — tắt hẳn gọi song song, ngược mục tiêu. \"Chèn assistant message ở giữa\" — docs yêu cầu tool_result phải đi ngay sau tool_use, không được chen message. \"Nhắc lại trong mỗi user message\" — không sửa lỗi định dạng gốc.",
     "sc": "s1",
     "ts": [
      "1.1"
     ]
    },
    {
     "q": "In a custom agent loop, after each tool runs, the code sends a user message containing the tool_result block followed by a text block saying \"Here is the result.\" The agent increasingly returns empty responses with stop_reason \"end_turn\" right after tool results. What is the MOST likely cause?",
     "options": [
      "The context window is nearly full, so the history should be summarized whenever an empty response appears.",
      "Empty end_turn responses mean the tool output was rejected, so every tool_result needs an explicit is_error: false.",
      "A custom stop sequence is firing too early, so the stop_sequences list should be removed from the request.",
      "The text added after each tool_result teaches Claude to end its turn; send only the tool_result blocks."
     ],
     "answer": 3,
     "explain": "Đúng: trang Stop reasons (mục Empty responses with end_turn) nêu nguyên nhân phổ biến là thêm text block ngay sau tool_result, lịch sử khi đó luôn có text của user sau tool result nên Claude kết thúc lượt theo mẫu đó; cách tránh là không thêm text sau tool_result. Sai: \"context gần đầy\" — không phải nguyên nhân docs nêu, và đầy context thì không sinh response rỗng kiểu này. \"is_error: false\" — is_error là tùy chọn, bỏ trống không làm tool bị từ chối. \"stop sequence\" — nếu stop sequence kích hoạt thì stop_reason là stop_sequence, không phải end_turn.",
     "ts": [
      "1.1"
     ]
    },
    {
     "q": "Which TWO statements about stop_reason in the Messages API are correct? (Choose TWO.)",
     "options": [
      "A \"refusal\" stop_reason arrives in a normal HTTP 200 response, so the loop must check for it explicitly.",
      "A \"max_tokens\" stop_reason is returned as an HTTP 4xx error, so a standard error handler will catch it.",
      "\"end_turn\" guarantees that the response contains at least one non-empty text block.",
      "When stop_reason is \"tool_use\", your code runs the requested client tools and replies with tool_result blocks.",
      "\"pause_turn\" is returned when Claude is waiting for the results of your client-side tools."
     ],
     "answer": [
      0,
      3
     ],
     "explain": "Đúng: docs ghi refusal là response HTTP 200 bình thường (không phải lỗi) nên phải tự kiểm tra stop_reason; tool_use nghĩa là Claude đang gọi tool, bạn chạy tool và gửi tool_result. Sai: max_tokens là stop_reason trong response thành công, docs phân biệt rõ stop_reason với lỗi 4xx/5xx. end_turn vẫn có thể đi kèm response rỗng (docs có mục riêng về empty responses). pause_turn chỉ dành cho vòng lặp server tool; khi chờ client tool thì stop_reason luôn là tool_use.",
     "ts": [
      "1.1"
     ]
    },
    {
     "q": "Using the Claude Agent SDK, a developer sets max_turns=3 for a task that needs exactly three tool-calling turns (run tests, read files, edit and re-run). Every run ends with a ResultMessage of subtype error_max_turns and no final summary. Why?",
     "options": [
      "The final text-only response is also a turn, so this task needs max_turns of at least 4.",
      "max_turns counts individual tool calls, and the edit turn made two calls, so the limit was exceeded.",
      "The SDK reserves one turn for session initialization, so the usable limit is always max_turns minus one.",
      "max_turns is only enforced together with max_budget_usd, so the budget limit was reached and reported as turns."
     ],
     "answer": 0,
     "explain": "Đúng: trang Agent loop định nghĩa turn là một vòng qua loop và hướng dẫn đếm mỗi turn có tool call cộng thêm một cho câu trả lời cuối chỉ có text; thiếu turn đó thì run kết thúc bằng error_max_turns và không có câu trả lời cuối. Sai: \"đếm từng tool call\" — một turn có thể có nhiều tool call. \"Dành một turn cho khởi tạo\" — init là SystemMessage, không phải turn. \"Chỉ áp dụng cùng max_budget_usd\" — hai giới hạn độc lập, mỗi cái có subtype riêng (error_max_turns, error_max_budget_usd).",
     "sc": "s4",
     "ts": [
      "1.1"
     ]
    },
    {
     "q": "An overnight Agent SDK job that analyzes a large repository stops with a result of subtype error_max_budget_usd after completing most of the analysis. The team wants to finish without redoing the work already done. What should they do?",
     "options": [
      "Start a fresh query with the same prompt and a higher budget; the SDK skips files the earlier session already read.",
      "Resume the captured session ID with a higher max_budget_usd so the agent continues with its prior context.",
      "Remove max_turns, because budget errors are triggered by the turn limit rather than by estimated spend.",
      "Raise the budget in the settings file; the stopped run picks up the new value and resumes on its own."
     ],
     "answer": 1,
     "explain": "Đúng: trang Sessions liệt kê \"Recover from a limit\" là lý do điển hình để resume: run kết thúc với error_max_turns hoặc error_max_budget_usd thì resume với giới hạn cao hơn, agent giữ nguyên context cũ. Sai: \"query mới cùng prompt\" — mỗi query() mặc định là session mới, không tự bỏ qua việc đã làm. \"Bỏ max_turns\" — error_max_budget_usd là do chi phí ước tính chạm mức trần, không liên quan turn. \"Sửa settings rồi run tự chạy tiếp\" — run đã kết thúc; không có cơ chế tự resume.",
     "sc": "s4",
     "ts": [
      "1.7"
     ]
    },
    {
     "q": "In a multi-agent system, a code-generation subagent produces several large source files. They are passed through the coordinator's conversation to a packaging subagent, and the final files contain small but damaging changes, while the coordinator's context fills quickly. What is the BEST design change?",
     "options": [
      "Instruct the coordinator to copy each subagent's output verbatim inside XML tags so the content survives every handoff.",
      "Merge generation and packaging into the coordinator itself so that no handoff between agents is needed.",
      "Have the subagent write its files to shared storage and return lightweight references to the coordinator.",
      "Move the coordinator to a model with a larger context window so the full files fit alongside its history."
     ],
     "answer": 2,
     "explain": "Đúng: bài \"How we built our multi-agent research system\" khuyên cho subagent ghi output ra hệ thống lưu trữ bên ngoài rồi chuyển tham chiếu nhẹ về coordinator, để tránh \"trò chơi truyền tin\" làm mất/biến đổi thông tin và giảm token phải chép qua lịch sử hội thoại. Sai: \"chép nguyên văn trong XML\" — vẫn đi qua coordinator, vẫn tốn context và vẫn có rủi ro biến đổi. \"Gộp vào coordinator\" — mất tính chuyên biệt, context coordinator còn phình hơn. \"Context lớn hơn\" — chỉ hoãn vấn đề, không sửa việc nội dung bị sao chép qua nhiều bước.",
     "ts": [
      "1.3"
     ]
    },
    {
     "q": "A research coordinator spawns ten or more subagents even for simple fact-finding questions such as \"When was this company founded?\", which drives up cost and latency. What is the MOST effective fix?",
     "options": [
      "Hard-code exactly three subagents for every query so that the cost of each request becomes predictable.",
      "Remove the coordinator entirely and send every query, simple or complex, to a single agent.",
      "Let each spawned subagent decide on its own whether it is really needed, and exit early whenever another subagent already found the answer.",
      "Add effort-scaling rules to the coordinator's prompt, e.g. one agent and a few tool calls for simple facts."
     ],
     "answer": 3,
     "explain": "Đúng: bài multi-agent research của Anthropic kể agent ban đầu khó tự ước lượng công sức, nên họ nhúng quy tắc scale vào prompt: câu hỏi fact đơn giản chỉ 1 agent với 3–10 tool call, so sánh trực tiếp 2–4 subagent, nghiên cứu phức tạp có thể hơn 10 subagent. Sai: \"cố định 3 subagent\" — lãng phí với câu đơn giản và thiếu với câu phức tạp. \"Bỏ coordinator\" — mất lợi ích song song cho truy vấn rộng. \"Subagent tự quyết\" — subagent đã được tạo (đã tốn chi phí) và không biết việc của nhau; quyết định phải nằm ở coordinator.",
     "sc": "s3",
     "ts": [
      "1.2"
     ]
    },
    {
     "q": "A coordinator delegates \"research remote-work trends\" to three subagents with that same one-line instruction. Two of them return nearly identical summaries of the same 2024 surveys, and none covers productivity studies. What should change in how the coordinator delegates?",
     "options": [
      "Give each subagent a distinct objective, clear boundaries, an output format, and source guidance.",
      "Use a larger model for the subagents so they can interpret the short instruction more creatively.",
      "Raise the number of subagents to five so that the extra agents will cover whatever topics were missed.",
      "Add a deduplication step after synthesis that removes repeated findings from the final report."
     ],
     "answer": 0,
     "explain": "Đúng: bài multi-agent research nêu mỗi subagent cần mục tiêu, định dạng output, hướng dẫn về tool/nguồn và ranh giới nhiệm vụ rõ ràng; giao việc ngắn gọn mơ hồ khiến các agent làm trùng và bỏ sót. Sai: \"model lớn hơn\" — vấn đề là cách giao việc, không phải năng lực. \"Thêm subagent\" — cùng một câu giao việc thì càng trùng nhiều hơn, không đảm bảo phủ phần thiếu. \"Khử trùng lặp sau tổng hợp\" — chữa triệu chứng; phần nghiên cứu bị thiếu vẫn thiếu.",
     "sc": "s3",
     "ts": [
      "1.2"
     ]
    },
    {
     "q": "A lead agent exposes a delegate_research tool, and your harness runs one subagent per call. For four independent subtopics, the agent calls the tool once per response and waits for each result before the next call, so runtime is the sum of all four. Which change BEST reduces runtime?",
     "options": [
      "Increase each subagent's turn limit so that it can finish its research in fewer round trips to the lead agent.",
      "Have the agent issue all four calls in one response and run them concurrently in the harness.",
      "Assign all four subtopics to a single subagent, because one shared context avoids any coordination overhead.",
      "Lower the overall spend limit so the lead agent is pushed to finish each subtopic more quickly."
     ],
     "answer": 1,
     "explain": "Đúng: docs Parallel tool use cho phép một response chứa nhiều tool_use và để bạn tự chọn chạy đồng thời; bài multi-agent research ghi việc cho lead agent tạo 3–5 subagent song song (thay vì tuần tự) cắt thời gian nghiên cứu tới 90% với truy vấn phức tạp. Sai: \"tăng giới hạn turn\" — không làm các subagent chạy cùng lúc. \"Một subagent làm cả bốn\" — quay lại tuần tự và dồn context. \"Giảm ngân sách\" — chỉ làm run dừng sớm, không song song hóa.",
     "sc": "s3",
     "ts": [
      "1.3"
     ]
    },
    {
     "q": "A coordinator's system prompt defines a strict citation format. Subagents defined with AgentDefinition return findings without that format; the developer assumed they inherit the coordinator's instructions. What is the BEST fix?",
     "options": [
      "Move the citation rules into the coordinator's first user message so they become part of the shared conversation history.",
      "Set each subagent's model to \"inherit\" so that it also inherits the coordinator's system prompt.",
      "Put the citation format in each subagent's own prompt or in the delegation message.",
      "Increase the subagents' maxTurns so they have enough time to infer the format from earlier coordinator results."
     ],
     "answer": 2,
     "explain": "Đúng: trang Subagents in the SDK có bảng \"subagent không nhận\": lịch sử hội thoại và tool result của parent, và system prompt của parent; subagent (không phải fork) chỉ có prompt riêng của nó (AgentDefinition.prompt) và chuỗi prompt của Agent tool. Vì vậy quy tắc phải nằm ở một trong hai chỗ đó. Sai: \"đưa vào user message đầu\" — subagent cũng không thấy lịch sử hội thoại. \"model: inherit\" — chỉ kế thừa model, không kế thừa prompt. \"Tăng maxTurns\" — subagent không có cách nào thấy kết quả cũ của coordinator.",
     "sc": "s3",
     "ts": [
      "1.3"
     ]
    },
    {
     "q": "An agent queries three MCP servers that return dates in different formats (Unix epochs, ISO 8601, \"MM/DD/YY\") along with numeric status codes, and Claude sometimes misorders events. The team wants every result normalized before Claude sees it, without changing the servers. What is the BEST approach in Claude Code?",
     "options": [
      "A PreToolUse hook that converts the tool inputs to ISO 8601 before each call is sent to the server.",
      "A CLAUDE.md section listing the three formats and asking Claude to convert them carefully before reasoning.",
      "A Stop hook that checks the dates in the final answer and blocks the turn when they look inconsistent.",
      "A PostToolUse hook on those MCP tools that rewrites each result with updatedToolOutput into one format."
     ],
     "answer": 3,
     "explain": "Đúng: theo Hooks reference, PostToolUse có trường updatedToolOutput thay output của tool trước khi gửi cho Claude (với MCP tool, output được chuyển tiếp không qua kiểm schema), và matcher dạng mcp__server__.* bắt được tool của MCP server. Đây là cách chuẩn hóa tất định. Sai: \"PreToolUse đổi input\" — vấn đề nằm ở output. \"CLAUDE.md\" — chỉ là lời dặn, mô hình có thể bỏ sót. \"Stop hook\" — phát hiện muộn ở cuối lượt, không chuẩn hóa dữ liệu Claude đã dùng để suy luận.",
     "ts": [
      "1.5"
     ]
    },
    {
     "q": "A team adds a PreToolUse hook with the matcher \"mcp__billing\" to audit every call to their billing MCP server's tools (for example mcp__billing__refund and mcp__billing__get_invoice). The hook never fires. Why?",
     "options": [
      "A matcher with only letters, digits and underscores matches exactly; use \"mcp__billing__.*\".",
      "PreToolUse hooks don't receive MCP tool calls; only PostToolUse events are emitted for MCP tools.",
      "Hooks for MCP tools must be declared in .mcp.json next to the server definition, not in a settings file.",
      "The matcher has to use the server's URL rather than its name, because MCP tools are resolved per endpoint."
     ],
     "answer": 0,
     "explain": "Đúng: Hooks reference ghi matcher chỉ gồm chữ, số, _, -, khoảng trắng, dấu phẩy, | được so khớp chính xác; tên MCP tool có dạng mcp__<server>__<tool>, và docs nói rõ \"mcp__memory\" không khớp tool nào, phải viết \"mcp__memory__.*\" (đuôi .* là bắt buộc). Sai: MCP tool xuất hiện như tool thường trong PreToolUse, PostToolUse, PermissionRequest…. Hook khai báo trong settings (hoặc plugin, skill, subagent frontmatter), không trong .mcp.json. Matcher của tool event lọc theo tool_name, không theo URL.",
     "ts": [
      "1.5"
     ]
    },
    {
     "q": "A PreToolUse hook with matcher \"Write|Edit\" denies any change to files under config/secrets/. Later the team finds that Claude updated one of those files using a shell command (sed -i). Why did the hook not stop it?",
     "options": [
      "Hooks run only in the main conversation, so a subagent probably made the change and bypassed the hook.",
      "The edit went through the Bash tool, which this matcher never sees; the policy must cover Bash too.",
      "The hook exited 0 after printing a deny decision; it should exit 1 so that the denial is actually enforced.",
      "\"Write|Edit\" is read as a regular expression that matches no tool, so it must be written as a JSON array."
     ],
     "answer": 1,
     "explain": "Đúng: docs Agent SDK hooks cảnh báo đúng tình huống này: matcher Write|Edit chỉ giới hạn ở tool Write và Edit; nếu Claude ghi file bằng lệnh Bash thì hook không chạy. Cần thêm xử lý cho Bash (hoặc dùng sandbox/deny rule). Sai: \"hook không chạy trong subagent\" — Hooks reference ghi hook trong settings cũng chạy cho tool call của subagent. \"Đổi sang exit 1\" — không thay đổi gì: exit 0 kèm JSON deny hợp lệ đã là cách đúng (với JSON hợp lệ, docs ghi mã thoát khác 0/2 bị bỏ qua và các trường JSON quyết định); hook không chặn được chỉ vì lệnh đi qua Bash. \"Write|Edit là regex không khớp\" — chuỗi chỉ gồm chữ và | được hiểu là danh sách tên khớp chính xác, khớp đúng hai tool.",
     "ts": [
      "1.5"
     ]
    },
    {
     "q": "A Stop hook runs the test suite and exits with code 2 to keep Claude working until all tests pass. On one branch a test fails for an environmental reason Claude cannot fix, and Claude keeps trying to stop and being sent back. What should the hook do?",
     "options": [
      "Exit with code 1 on the first failure so that Claude re-runs the failing tests automatically before stopping.",
      "Move the test check into a PostToolUse hook so it runs after every edit instead of at the end of the turn.",
      "Check stop_hook_active and allow the stop when Claude is already continuing because of a stop hook.",
      "Return decision \"block\" with an empty reason, which Claude Code treats as a block that applies only once."
     ],
     "answer": 2,
     "explain": "Đúng: Hooks reference ghi Stop hook nhận trường stop_hook_active = true khi Claude đang tiếp tục do stop hook; nên kiểm tra nó để tránh chặn mãi vì một điều kiện không bao giờ được giải quyết. Docs hiện ghi (tháng 11/2026) Claude Code giới hạn 8 lần tiếp tục liên tiếp do stop hook rồi bỏ qua lần chặn kế tiếp, nhưng bộ đếm reset mỗi khi Claude gọi tool (và chỉnh được bằng CLAUDE_CODE_STOP_HOOK_BLOCK_CAP), nên không nên dựa vào giới hạn đó. Sai: \"exit 1\" — là lỗi không chặn, Claude chỉ dừng luôn chứ không tự chạy lại test. \"Chuyển sang PostToolUse\" — PostToolUse không chặn được việc kết thúc lượt. \"decision block với reason rỗng\" — không có hành vi \"chặn một lần\" như vậy.",
     "ts": [
      "1.5"
     ]
    },
    {
     "q": "A banking support agent must call verify_identity successfully before it may call update_contact_details. Prompt instructions achieve this in most conversations, but audits found several updates made without verification. What is the MOST reliable fix?",
     "options": [
      "Add several few-shot examples to the system prompt in which the agent always verifies the customer's identity before updating any details.",
      "Rename the tool to update_contact_details_after_verification so the required order is obvious from its name.",
      "Have the model state before each update whether identity was verified, and proceed when it says yes.",
      "Gate update_contact_details in code, blocking it until verify_identity has succeeded in the session."
     ],
     "answer": 3,
     "explain": "Đúng: khi một thứ tự bắt buộc phải luôn đúng (tuân thủ, tài chính), hãy cưỡng chế bằng code: một hook/kiểm tra tiên quyết chặn update_contact_details cho đến khi verify_identity thành công. Docs Claude Code (Best practices, Memory) nhấn mạnh hướng dẫn trong prompt/CLAUDE.md là context chứ không phải cấu hình bị cưỡng chế. Sai: few-shot và đổi tên tool vẫn là gợi ý xác suất, vẫn có lúc bị bỏ qua. \"Hỏi mô hình đã xác minh chưa\" — tự khai báo của mô hình không phải bằng chứng; mô hình có thể trả lời sai.",
     "sc": "s1",
     "ts": [
      "1.4"
     ]
    },
    {
     "q": "When the support agent escalates a case, the human receives only the ticket ID and has to scroll a long transcript in a tool that renders it poorly, often asking the customer to repeat details. What should the escalation handoff contain?",
     "options": [
      "A structured summary: customer and order IDs, the issue, what was tried, and why it is escalated.",
      "The complete raw transcript including every tool call, so that nothing at all can be lost in the handoff.",
      "Only the customer's latest message, so the human agent starts fresh without being biased by the agent's work.",
      "A sentiment score and a model confidence score so the human team can prioritize its queue."
     ],
     "answer": 0,
     "explain": "Đúng (lời khuyên thiết kế): người nhận bàn giao không có (hoặc khó đọc) transcript, nên bản bàn giao phải tự đủ: định danh khách/đơn, vấn đề, những gì đã kiểm tra và đã thử, lý do escalate. Như vậy khách không phải kể lại. Sai: \"toàn bộ transcript thô\" — đúng thứ người nhận không đọc được, lại nhiều nhiễu. \"Chỉ tin nhắn cuối\" — mất hết ngữ cảnh, buộc khách lặp lại. \"Điểm sentiment/confidence\" — không chứa thông tin để xử lý vụ việc.",
     "sc": "s1",
     "ts": [
      "1.4"
     ]
    },
    {
     "q": "A platform team wants Claude Code to pause for explicit developer confirmation whenever it runs kubectl against the production context, without blocking those commands outright and without affecting other commands. Which hook design fits BEST?",
     "options": [
      "A PreToolUse hook that exits with code 2 for every kubectl command, so developers must re-run approved ones by hand.",
      "A PreToolUse hook on Bash that returns permissionDecision \"ask\" with a reason when the command targets production.",
      "A PostToolUse hook that returns decision \"block\" whenever a production kubectl command has finished running.",
      "A PermissionRequest hook that always returns behavior \"allow\" for kubectl so the prompts never appear."
     ],
     "answer": 1,
     "explain": "Đúng: Hooks reference ghi permissionDecision của PreToolUse có allow/deny/ask/defer; \"ask\" hiện prompt xác nhận cho người dùng kèm permissionDecisionReason. Hook chỉ trả ask khi lệnh nhắm production, lệnh khác đi theo luồng bình thường. Sai: \"exit 2 mọi lệnh kubectl\" — chặn hẳn và chặn cả lệnh không phải production. \"PostToolUse block\" — lệnh đã chạy rồi; decision block chỉ thêm lý do cạnh tool result. \"Luôn allow\" — ngược yêu cầu, bỏ luôn bước xác nhận.",
     "ts": [
      "1.5"
     ]
    },
    {
     "q": "A PreToolUse hook appends --dry-run to Bash commands that call a deployment script. It returns permissionDecision \"allow\" with updatedInput {\"command\": \"./deploy.sh --dry-run\"}. The team notices that the timeout and description the call originally had are gone. Why?",
     "options": [
      "An \"allow\" decision strips optional fields from tool inputs; returning \"ask\" instead would have kept them.",
      "updatedInput is merged field by field only for MCP tools; built-in tools need updatedToolOutput instead.",
      "updatedInput replaces the whole input object, so unchanged fields must be copied into it too.",
      "Hooks cannot change tool inputs, so Claude regenerated the command without those fields after reading the hook."
     ],
     "answer": 2,
     "explain": "Đúng: Hooks reference mô tả updatedInput \"thay toàn bộ object input, nên phải kèm các trường không đổi cùng trường đã sửa\"; input của Bash gồm command, description, timeout, run_in_background. Sai: \"allow xóa trường tùy chọn\" — không có hành vi đó; ask chỉ hiện input đã sửa cho người dùng. \"Chỉ merge với MCP; built-in dùng updatedToolOutput\" — updatedToolOutput là của PostToolUse để thay output, không phải input. \"Hook không đổi được input\" — PreToolUse đổi được input qua updatedInput.",
     "ts": [
      "1.5"
     ]
    },
    {
     "q": "A finance team must process supplier invoices through the same fixed steps every time: extract fields, validate totals against the purchase order, then post to the ERP. Auditors require predictable, inspectable behavior. Which architecture is MOST appropriate?",
     "options": [
      "An autonomous agent that holds all three tools and decides its own sequence of steps for every invoice.",
      "A coordinator that dynamically spawns research subagents for each invoice field it needs to extract.",
      "An evaluator-optimizer loop in which a second model keeps rewriting each invoice until an evaluator approves it.",
      "A prompt-chaining workflow with programmatic checks between the steps."
     ],
     "answer": 3,
     "explain": "Đúng: bài \"Building effective agents\" phân biệt workflow (đường đi định sẵn bằng code) với agent (mô hình tự điều hướng); prompt chaining hợp khi việc tách gọn thành các bước cố định, có thể thêm \"gate\" kiểm tra bằng code giữa các bước, và workflow cho tính dự đoán được với việc đã xác định rõ. Sai: \"agent tự quyết thứ tự\" — bỏ mất tính dự đoán mà kiểm toán cần. \"Coordinator sinh subagent\" — phức tạp, tốn token, dành cho việc mở. \"Evaluator-optimizer\" — để tinh chỉnh dần một output theo tiêu chí, không phải để chạy quy trình cố định; \"viết lại hóa đơn\" còn sai bản chất.",
     "sc": "s6",
     "ts": [
      "1.6"
     ]
    },
    {
     "q": "A coding assistant receives requests such as \"rename this API field everywhere and update its callers.\" How many files change, and what each change looks like, cannot be known until the codebase is inspected. Which pattern fits BEST?",
     "options": [
      "Orchestrator-workers: a central model splits the work at runtime and delegates it to workers.",
      "Parallelization with a fixed set of predefined sections that run in the same way for every request.",
      "Routing each request to one of several specialized prompts based on the request's category.",
      "A single prompt-chaining sequence whose steps are all written in advance by the developers."
     ],
     "answer": 0,
     "explain": "Đúng: \"Building effective agents\" mô tả orchestrator-workers hợp với việc phức tạp mà không đoán trước được subtask, lấy ví dụ coding: số file cần đổi và kiểu thay đổi phụ thuộc từng yêu cầu; khác biệt then chốt với parallelization là subtask không định sẵn. Sai: parallelization với phần định sẵn và prompt chaining viết trước đều giả định biết trước các bước. Routing chỉ phân loại đầu vào sang luồng chuyên biệt, không chia việc theo nội dung codebase.",
     "ts": [
      "1.6"
     ]
    },
    {
     "q": "Which TWO pairings of task and workflow pattern match Anthropic's guidance in \"Building effective agents\"? (Choose TWO.)",
     "options": [
      "Prompt chaining: open-ended research where the number of steps cannot be predicted in advance.",
      "Routing: sending refund requests, technical questions, and general questions to different specialized prompts and tools.",
      "Orchestrator-workers: translating one fixed marketing text into a single language, identical on every run.",
      "Voting: deciding which of several sequential setup steps in a deployment must be run first.",
      "Evaluator-optimizer: literary translation where one model critiques drafts against clear criteria and another refines them."
     ],
     "answer": [
      1,
      4
     ],
     "explain": "Đúng: bài viết lấy chính ví dụ routing các loại câu hỏi chăm sóc khách hàng sang quy trình/prompt/tool khác nhau, và evaluator-optimizer cho dịch văn học khi có tiêu chí đánh giá rõ và vòng góp ý cải thiện được kết quả. Sai: việc mở không đoán được số bước là chỗ của agent, không phải prompt chaining (vốn cho các bước cố định). Một bản dịch cố định không cần orchestrator chia việc động. Voting là chạy cùng một việc nhiều lần để lấy nhiều kết quả, không dùng để sắp thứ tự các bước tuần tự.",
     "ts": [
      "1.6"
     ]
    },
    {
     "q": "A developer asks Claude Code to \"add comprehensive tests to the legacy billing module,\" which has no tests and an unclear structure. Which way of decomposing this open-ended task is BEST?",
     "options": [
      "Write a fixed list of test files based on the module's file names up front, then execute that list without ever revisiting the plan.",
      "Map the module and its risky areas first, then plan by priority and adapt as dependencies surface.",
      "Ask Claude to write every test in one pass, because splitting the work only adds coordination overhead.",
      "Generate tests for every function in alphabetical order so that coverage stays systematic and complete."
     ],
     "answer": 1,
     "explain": "Đúng (lời khuyên thiết kế, khớp \"Building effective agents\": agent hợp với việc mở không đoán trước số bước, cần lấy \"ground truth\" từ môi trường mỗi bước): khảo sát trước, ưu tiên phần rủi ro cao, rồi điều chỉnh kế hoạch theo những phụ thuộc phát hiện ra. Sai: \"danh sách cố định từ tên file\" — kế hoạch tĩnh cho việc mà cấu trúc chưa rõ, không thích ứng. \"Một lượt viết hết\" — dễ hời hợt, không có bước xác minh. \"Theo thứ tự chữ cái\" — bỏ qua mức độ rủi ro/quan trọng.",
     "sc": "s2",
     "ts": [
      "1.6"
     ]
    },
    {
     "q": "A multi-user web app runs one Agent SDK conversation per customer on the same server and working directory. When customer B returns, the app passes continue to pick up their conversation, but sometimes loads customer A's history instead. What is the correct fix?",
     "options": [
      "Fork every returning customer's conversation so each one gets an isolated copy of the most recent session.",
      "Set persistSession to false so that sessions written by different customers can no longer collide on disk.",
      "Store each customer's session ID and pass it to resume; continue picks the directory's latest session.",
      "Call continue twice in a row, because the second call skips the session that was opened most recently."
     ],
     "answer": 2,
     "explain": "Đúng: trang Sessions phân biệt: continue tìm session gần nhất trong thư mục hiện tại (hợp khi app chạy một hội thoại mỗi lúc), còn resume nhận session ID cụ thể và là bắt buộc khi có nhiều session, ví dụ mỗi người dùng một session. Sai: \"fork session gần nhất\" — vẫn chọn nhầm session gốc, chỉ là bản sao của sai session. \"persistSession: false\" — session chỉ tồn tại trong bộ nhớ, không thể quay lại được nữa. \"continue hai lần\" — không có hành vi đó.",
     "ts": [
      "1.7"
     ]
    },
    {
     "q": "A CI pipeline runs claude -p on ephemeral runners. Step 1 analyzes a pull request; step 2 runs on a different runner with --resume and step 1's session ID, and cannot find the session. Which TWO approaches let step 2 build on step 1's work? (Choose TWO.)",
     "options": [
      "Have step 1 emit its findings as structured output and pass them into step 2's prompt in a fresh session.",
      "Use --continue instead of --resume, because continue searches every machine for the latest session.",
      "Persist step 1's .jsonl session transcript file and restore it on the second runner before resuming.",
      "Add --fork-session, which copies the session to whichever runner resumes it next.",
      "Increase the session timeout, because sessions on CI runners expire after a few minutes."
     ],
     "answer": [
      0,
      2
     ],
     "explain": "Đúng: trang Sessions (Resume across hosts) ghi file session nằm cục bộ trên máy tạo ra nó; để resume ở host khác thì chuyển file .jsonl sang máy mới (CLI reference ghi --resume nhận cả đường dẫn tuyệt đối tới file .jsonl; ứng dụng Agent SDK còn có thể dùng session store), hoặc không dựa vào resume mà đưa kết quả cần thiết (phân tích, quyết định) vào prompt của session mới, docs gọi cách này thường bền hơn. Sai: continue chỉ tìm session gần nhất trên máy hiện tại. --fork-session chỉ tạo session ID mới khi resume, không sao chép giữa máy. Không có cơ chế session hết hạn sau vài phút; lỗi là do file không có trên runner mới.",
     "sc": "s5",
     "ts": [
      "1.7",
      "3.6"
     ]
    },
    {
     "q": "A developer forks an Agent SDK session to try a risky refactor while keeping the original conversation intact. The forked agent edits several files. When she later resumes the original session, its agent finds those files already changed. Why?",
     "options": [
      "The fork silently failed and the edits were made in the original session, which a working fork would have prevented.",
      "A fork reuses the original session ID, so both conversations write their tool calls into the same transcript.",
      "Resuming the original session replays the fork's tool calls, because fork history is merged back on resume.",
      "Forking branches the conversation history, not the filesystem; file changes need checkpointing or git to isolate."
     ],
     "answer": 3,
     "explain": "Đúng: trang Sessions nói rõ session lưu hội thoại chứ không lưu filesystem; fork rẽ nhánh lịch sử hội thoại, nếu agent ở nhánh fork sửa file thì thay đổi là thật và mọi session trong cùng thư mục đều thấy; muốn rẽ nhánh và hoàn tác file thì dùng file checkpointing. Sai: fork không \"thất bại\" ở đây, đó là hành vi đúng. Fork có session ID riêng, lịch sử gốc giữ nguyên. Không có cơ chế gộp lịch sử fork vào session gốc.",
     "ts": [
      "1.7"
     ]
    },
    {
     "q": "A customer writes in one message that their last order arrived damaged, that they were charged twice for it, and that they want to change the delivery address on a separate open order. The agent resolves the first issue and ignores the other two. What is the BEST improvement?",
     "options": [
      "Have the agent split the message into distinct issues, handle each, and send one combined reply.",
      "Ask the customer to open a separate conversation for each issue so the agent can focus on one at a time.",
      "Escalate every message that contains more than one request to a human agent by default.",
      "Increase max_tokens so the agent has more room to address the rest of the customer's message."
     ],
     "answer": 0,
     "explain": "Đúng (lời khuyên thiết kế): yêu cầu nhiều vấn đề nên được tách thành các mục riêng, điều tra từng mục (song song nếu độc lập, ví dụ tra đơn và tra giao dịch), rồi tổng hợp thành một phản hồi. Sai: \"bắt khách mở nhiều hội thoại\" — đẩy việc sang khách, trải nghiệm tệ. \"Escalate mọi yêu cầu kép\" — đây là các việc agent làm được; escalate không cần thiết làm quá tải người. \"Tăng max_tokens\" — agent không bị cắt chữ; nó bỏ sót vì không tách vấn đề.",
     "sc": "s1",
     "ts": [
      "1.4"
     ]
    },
    {
     "q": "A research coordinator synthesizes subagent findings in a single pass and publishes immediately. Reviewers often find that one requested aspect was barely covered. What change to the coordinator's loop BEST addresses this?",
     "options": [
      "Have every subagent research all aspects of the request so coverage no longer depends on the coordinator.",
      "After synthesis, check coverage against the request and delegate follow-up research for gaps.",
      "Ask the synthesis step to write longer sections so that the thinly covered areas read as complete.",
      "Raise each subagent's search result limit from 10 to 50 results per query."
     ],
     "answer": 1,
     "explain": "Đúng: bài multi-agent research mô tả LeadResearcher tổng hợp kết quả rồi quyết định có cần nghiên cứu thêm không; nếu cần thì tạo thêm subagent hoặc chỉnh chiến lược trước khi kết thúc. Sai: \"mọi subagent làm mọi khía cạnh\" — trùng lặp, tốn token, bỏ lợi ích chia việc. \"Viết dài hơn\" — che lỗ hổng chứ không lấp. \"Tăng số kết quả mỗi truy vấn\" — không giúp nếu khía cạnh đó chưa từng được giao.",
     "sc": "s3",
     "ts": [
      "1.2"
     ]
    },
    {
     "q": "A security engineer configured a PreToolUse hook in the project's .claude/settings.json that blocks curl calls to unknown hosts. A colleague worries Claude could bypass it by delegating the request to a subagent. What is accurate?",
     "options": [
      "Subagents run with an isolated configuration, so the hook has to be copied into each subagent's frontmatter.",
      "The hook fires inside a subagent only when that subagent's permissionMode is explicitly set to default.",
      "Settings hooks also fire for subagent tool calls, and the input carries agent_id and agent_type.",
      "Subagents can never run Bash, so delegated work cannot reach curl and the concern does not apply."
     ],
     "answer": 2,
     "explain": "Đúng: Hooks reference ghi hook từ settings, managed policy và plugin cũng chạy trong subagent; khi subagent gọi tool, PreToolUse/PostToolUse bắn cùng các hook đã cấu hình, và input có agent_id, agent_type để nhận diện subagent. Sai: không cần chép hook vào frontmatter (frontmatter chỉ thêm hook riêng cho subagent đó). Không có điều kiện về permissionMode. Subagent general-purpose có mọi tool dành cho subagent, gồm Bash.",
     "ts": [
      "1.5"
     ]
    },
    {
     "q": "To stop Claude Code from dropping database tables, a team writes a PostToolUse hook on Bash that exits with code 2 when the command contains DROP TABLE. In testing, the table is still dropped, although Claude does see the hook's message. Why?",
     "options": [
      "Exit code 2 is non-blocking for every hook event; PostToolUse needs exit code 1 to stop the command.",
      "The Bash matcher does not match commands that are piped into a database client such as psql.",
      "PostToolUse can block only when the hook also returns an empty updatedToolOutput value.",
      "PostToolUse runs after the tool executes; preventing it needs PreToolUse or a deny rule."
     ],
     "answer": 3,
     "explain": "Đúng: bảng \"Exit code 2 behavior per event\" ghi PostToolUse không chặn được: exit 2 chỉ hiện stderr cho Claude vì tool đã chạy; muốn ngăn thì dùng PreToolUse (exit 2 chặn tool call) hoặc permission deny. Sai: exit 2 là mã chặn ở các event chặn được như PreToolUse; exit 1 là lỗi không chặn. Matcher Bash khớp mọi lệnh qua Bash tool, kể cả lệnh pipe. updatedToolOutput chỉ đổi thứ Claude thấy, docs cảnh báo nó không hoàn tác việc tool đã làm.",
     "ts": [
      "1.5"
     ]
    },
    {
     "q": "A team wants the rule \"never read .env files\" to be enforced by Claude Code itself rather than left to the model's judgment. Which TWO mechanisms meet that requirement? (Choose TWO.)",
     "options": [
      "A line in CLAUDE.md written in capital letters that says never to read .env files.",
      "An instruction added with --append-system-prompt on every session start.",
      "A Read deny rule for those paths in the permissions section of .claude/settings.json.",
      "A skill with disable-model-invocation: true that describes the rule in detail.",
      "A PreToolUse hook that inspects the target path and blocks matching calls with exit code 2."
     ],
     "answer": [
      2,
      4
     ],
     "explain": "Đúng: Best practices của Claude Code chia hướng dẫn thành hai loại: không tất định (prompt, CLAUDE.md, skill — Claude quyết định) và tất định (hook, deny rule, managed settings — harness bắt buộc thực thi). Deny rule Read(...) chặn tool đọc file; PreToolUse exit 2 chặn tool call. Sai: CLAUDE.md và system prompt là context, docs Memory nói rõ không phải cấu hình bị cưỡng chế, viết hoa cũng vậy. Skill chỉ là nội dung prompt nạp khi gọi; disable-model-invocation chỉ quyết định ai được gọi skill.",
     "ts": [
      "1.4"
     ]
    },
    {
     "q": "A customer support agent built on the Messages API (tools: get_customer, lookup_order, process_refund, escalate_to_human) always ends its loop after exactly five iterations, whatever the model returned. Simple lookups work, but multi-step refund cases are often cut off mid-process and the customer never gets a final answer. What is the BEST change to the loop?",
     "options": [
      "Raise the fixed limit to 25 iterations so that even the longest refund cases have enough room to finish before the loop exits.",
      "Ask Claude to end every final answer with the token DONE, and stop the loop as soon as that token appears in a text block.",
      "Remove the limit and stop the loop whenever the response contains any text block, since Claude writes text once it has finished.",
      "Keep looping while stop_reason is \"tool_use\" and stop on \"end_turn\"; keep a high cap only as a safety net that hands off to a human."
     ],
     "answer": 3,
     "explain": "D đúng: stop_reason là tín hiệu có cấu trúc cho biết Claude muốn gọi tool (\"tool_use\") hay đã xong (\"end_turn\"). Vòng lặp dựa vào đó sẽ chạy đúng số bước mà ca cần; giới hạn số vòng chỉ nên là lưới an toàn, và khi chạm thì chuyển người thay vì im lặng dừng. A sai: vẫn dùng số vòng làm tín hiệu dừng chính, ca dài hơn vẫn bị cắt và vòng lặp không biết lúc nào Claude đã xong. B sai: dựa vào chữ trong câu trả lời là kiểu phân tích ngôn ngữ tự nhiên dễ vỡ (Claude có thể quên token, hoặc token xuất hiện trong ngữ cảnh khác). C sai: Claude thường viết text trước khi gọi tool trong cùng một response, nên \"có text\" không có nghĩa là đã xong.",
     "sc": "s1",
     "ts": [
      "1.1"
     ]
    },
    {
     "q": "A developer is writing the tool loop for the support agent. When Claude returns a lookup_order tool_use block, the code runs the tool and sends a new request whose messages array ends with a user message containing only the matching tool_result. The API rejects the request with a 400 error. What is the MOST likely cause?",
     "options": [
      "Tool results must be placed in the system prompt rather than in a user message so that Claude treats them as trusted data.",
      "tool_result blocks are accepted only when tool_choice is set to \"any\" or \"tool\" for that request.",
      "The assistant response containing the tool_use block was not appended to the history before the tool_result message.",
      "The tool_result content must be a JSON object, so returning plain text from lookup_order is rejected by the API."
     ],
     "answer": 2,
     "explain": "C đúng: docs tool use yêu cầu khối tool_result phải đi ngay sau message assistant chứa khối tool_use tương ứng. Nếu code không thêm response của assistant (gồm khối tool_use) vào lịch sử, tool_result trỏ tới một tool_use_id không tồn tại và request bị từ chối. A sai: docs khuyên giữ nội dung từ nguồn ngoài trong tool_result, không đưa vào system prompt (rủi ro prompt injection), và đó cũng không phải cách API nhận kết quả tool. B sai: tool_result dùng được với mọi giá trị tool_choice, kể cả auto mặc định. D sai: content của tool_result có thể là chuỗi thuần (docs có ví dụ \"15 degrees\") hoặc danh sách khối.",
     "sc": "s1",
     "ts": [
      "1.1"
     ]
    },
    {
     "q": "The support team is listing requirements for its customer support agent. Which TWO should be enforced in code, for example inside the tools or in a PreToolUse hook, rather than only stated in the system prompt? (Choose TWO.)",
     "options": [
      "Use a warm, apologetic tone whenever a customer reports that a delivery is late.",
      "Never call process_refund for an order that lookup_order has not confirmed belongs to the verified customer.",
      "Keep replies short enough to read comfortably on a phone screen.",
      "Refunds above the $300 policy limit must go to escalate_to_human instead of process_refund.",
      "End the conversation by offering the customer a short summary of what was done."
     ],
     "answer": [
      1,
      3
     ],
     "explain": "B và D đúng: đây là quy tắc về tiền và quyền truy cập, sai một lần là thiệt hại thật. Lời dặn trong prompt chỉ làm tăng xác suất tuân thủ, còn kiểm tra trong tool hoặc hook PreToolUse cho bảo đảm tất định: lời gọi sai bị chặn bất kể model nghĩ gì. A, C, E sai: giọng văn, độ dài và lời tóm tắt cuối là hành vi mềm, thỉnh thoảng lệch cũng không gây hại nghiêm trọng, nên system prompt là chỗ phù hợp; viết code cưỡng chế cho chúng vừa khó vừa không đáng.",
     "sc": "s1",
     "ts": [
      "1.4"
     ]
    },
    {
     "q": "In the support agent, a PreToolUse hook denies process_refund calls above $500 and tells Claude to use escalate_to_human instead. Supervisors now approve some of these refunds inside the escalation system and want the agent to complete them afterwards. A first attempt let the call through whenever the agent's own message said \"supervisor approved\". What is the BEST way to allow approved refunds?",
     "options": [
      "Have the hook look up an approval record that the escalation system created for that order and amount, and allow the call only when one exists.",
      "Keep the hook but raise its threshold, so that most of the refunds supervisors approve no longer reach the hook at all.",
      "Add few-shot examples in which the agent asks the supervisor to confirm the approval in chat before calling process_refund.",
      "Disable the hook for any session in which escalate_to_human has already been called at least once."
     ],
     "answer": 0,
     "explain": "A đúng: cổng kiểm tra phải dựa vào dữ kiện do hệ thống tạo ra (bản ghi phê duyệt gắn với đúng đơn và số tiền), không dựa vào lời model tự khẳng định. Như vậy chỉ những khoản thật sự được duyệt mới đi qua. B sai: nâng ngưỡng là nới chính sách cho mọi khoản, kể cả khoản chưa ai duyệt. C sai: lời xác nhận trong chat vẫn chỉ là text trong hội thoại, model hoặc người dùng đều có thể viết ra, nên không phải bằng chứng phê duyệt. D sai: một lần escalate bất kỳ (có thể cho việc khác) sẽ mở khóa mọi khoản hoàn tiền về sau, với bất kỳ số tiền nào.",
     "sc": "s1",
     "ts": [
      "1.4",
      "1.5"
     ]
    },
    {
     "q": "A PreToolUse hook in the support agent blocks any single process_refund call above $300 by returning a deny decision with no reason. Audits show that after a denial the agent sometimes issued two or three smaller refunds on the same order that together exceeded $300. What is the BEST fix?",
     "options": [
      "Add a sentence to the system prompt saying that splitting one refund into several smaller refunds is not allowed under the policy.",
      "Move the check into a PostToolUse hook so that every refund is compared with the limit right after it has been processed.",
      "Check the order's already-refunded total plus the new amount against the limit, and deny with a reason telling Claude to call escalate_to_human.",
      "Lower the per-call limit to $100 so that splitting a large refund would take too many calls to be worth trying."
     ],
     "answer": 2,
     "explain": "C đúng: quy tắc thật là tổng tiền hoàn trên một đơn, nên phép kiểm tra phải tính cả số đã hoàn trước đó. Docs Agent SDK ghi permissionDecisionReason được gửi cho model, nên lý do từ chối kèm hướng dẫn \"gọi escalate_to_human\" giúp agent đổi hướng thay vì thử đường vòng. A sai: lại đưa quy tắc tiền bạc về lời dặn trong prompt, đúng loại cưỡng chế đã thất bại. B sai: PostToolUse chạy sau khi tool đã thực thi, tiền đã hoàn rồi mới kiểm tra. D sai: hạ ngưỡng từng lần không chặn được việc cộng dồn, lại làm agent không xử lý được các khoản nhỏ hợp lệ.",
     "sc": "s1",
     "ts": [
      "1.5"
     ]
    },
    {
     "q": "The support agent, built with the Claude Agent SDK, connects to a vendor's CRM MCP server that the team cannot modify. Its get_customer tool returns full card numbers and dates of birth, which then sit in Claude's context and sometimes appear in its replies. What is the MOST reliable fix?",
     "options": [
      "A PostToolUse hook on that tool that masks those fields and returns the result through updatedToolOutput before Claude sees it.",
      "A system prompt rule telling Claude never to repeat card numbers or dates of birth back to the customer under any circumstances.",
      "A PreToolUse hook on get_customer that strips the sensitive fields from the tool's input before the call is sent to the server.",
      "A Stop hook that scans Claude's final reply for card numbers and blocks the turn whenever one is found in the text."
     ],
     "answer": 0,
     "explain": "A đúng: docs Agent SDK ghi PostToolUse có thể đặt updatedToolOutput để thay output của tool (cả built-in lẫn MCP) trước khi Claude thấy. Che dữ liệu nhạy cảm ở đây nghĩa là nó không bao giờ vào context, nên không thể bị lặp lại. B sai: lời dặn chỉ giảm xác suất, dữ liệu vẫn nằm trong context. C sai: PreToolUse chỉ sửa input của lời gọi; dữ liệu nhạy cảm nằm trong output trả về, không phải input. D sai: chỉ bắt được ở câu trả lời cuối, dữ liệu vẫn ở trong context suốt phiên và có thể lộ qua các đường khác.",
     "sc": "s1",
     "ts": [
      "1.5"
     ]
    },
    {
     "q": "A customer returns to the support chat three days after a conversation about a delayed order. The app could resume the old Agent SDK session by its ID. In the meantime the order has shipped and a human agent issued a partial refund. What is the BEST way to continue?",
     "options": [
      "Resume the old session unchanged, since its history already contains the order details the agent looked up three days ago.",
      "Fork the old session, because a forked session reloads the latest order data from the connected tools when it starts.",
      "Use continue instead of the session ID, so that the most recent state of the order is loaded into the session automatically when it resumes.",
      "Start a fresh session seeded with a structured summary of the earlier case, and have the agent re-fetch the current order status first."
     ],
     "answer": 3,
     "explain": "D đúng: kết quả tool trong phiên cũ (trạng thái đơn, số tiền đã hoàn) đã lỗi thời. Phiên mới kèm bản tóm tắt có cấu trúc giữ lại các dữ kiện còn đúng (mã đơn, vấn đề, cam kết), còn dữ liệu hay thay đổi thì tra lại. A sai: agent sẽ trả lời dựa trên trạng thái \"đang chậm\" và chưa hoàn tiền, trái với thực tế. B sai: docs Agent SDK mô tả fork chỉ sao chép lịch sử hội thoại sang session mới; nó không tải lại dữ liệu nào từ tool. C sai: continue chỉ chọn session gần nhất trong thư mục, nội dung vẫn là lịch sử cũ, và với app nhiều khách thì còn có thể chọn nhầm session của người khác.",
     "sc": "s1",
     "ts": [
      "1.7"
     ]
    },
    {
     "q": "To save time, a team lets the search subagents in its multi-agent research system send findings directly to the report-writing subagent instead of returning them to the coordinator. Since then, failed searches go unnoticed, duplicate findings appear in reports, and nobody can trace which subagent produced a claim. What is the BEST fix?",
     "options": [
      "Have every subagent also copy its messages to a shared log file, so that the team can review and trace each finding and failure after every run.",
      "Route all subagent results back through the coordinator, which checks them, handles failures, and decides what goes to the writer.",
      "Add a deduplication step inside the report-writing subagent that removes repeated findings before it starts writing.",
      "Give each search subagent the report-writing tools, so that it can add its own section to the report directly."
     ],
     "answer": 1,
     "explain": "B đúng: mô hình hub-and-spoke để coordinator là điểm duy nhất nhận kết quả, nên nó phát hiện được lỗi, gộp trùng, giữ nguồn gốc từng claim và quyết định bước tiếp. Cả ba triệu chứng đều do bỏ qua điểm kiểm soát này. A sai: log giúp điều tra sau, nhưng không ai xử lý lỗi hay trùng lặp trong lúc chạy. C sai: chỉ chữa triệu chứng trùng lặp; lỗi tìm kiếm vẫn bị bỏ sót và nguồn gốc vẫn mất. D sai: càng phân tán hơn, mỗi subagent tự viết vào báo cáo mà không ai kiểm soát chất lượng hay tính nhất quán.",
     "sc": "s3",
     "ts": [
      "1.2"
     ]
    },
    {
     "q": "A research coordinator built with the Claude Agent SDK delegates to search subagents. Costs have spiked because some search subagents spawn subagents of their own. The team wants search subagents to do their delegated work themselves. Which TWO changes enforce this? (Choose TWO.)",
     "options": [
      "Add the instruction \"Do not delegate to other agents\" to the search subagents' prompts.",
      "Set the CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH environment variable to 1 for the query.",
      "Set maxTurns on the search subagents to a lower value.",
      "Run the search subagents on a smaller model alias such as haiku.",
      "Omit the Agent tool from the search subagents' tools list, or add it to their disallowedTools."
     ],
     "answer": [
      1,
      4
     ],
     "explain": "B và E đúng. Docs hiện ghi (tháng 11/2026) subagent mặc định được sinh subagent con tới 3 tầng dưới agent chính; đặt CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH = 1 tắt việc lồng nhau, và bỏ Agent khỏi tools (hoặc đưa vào disallowedTools) khiến riêng subagent đó không sinh được subagent con. Cả hai do harness cưỡng chế. A sai: docs nói rõ lời dặn kiểu này chỉ định hướng Claude, vẫn phải đặt giới hạn để harness cưỡng chế. C sai: maxTurns giới hạn số lượt, không ngăn subagent gọi tool Agent trong các lượt đó. D sai: đổi model không lấy đi tool Agent; model nhỏ vẫn có thể ủy quyền.",
     "sc": "s3",
     "ts": [
      "1.3"
     ]
    },
    {
     "q": "In a multi-agent research system, the coordinator passes subagent results to the synthesis subagent as a few paragraphs of prose that it writes itself. Final reports keep losing source URLs and publication dates, and no one can tell which subagent a claim came from. How should the coordinator pass findings to the synthesis subagent instead?",
     "options": [
      "As a longer prose summary that names each source, so that the synthesis subagent can look up the URLs later if it needs them.",
      "By forking the coordinator's conversation for the synthesis step, so the subagent can read every original tool result and page itself.",
      "By telling the synthesis subagent to search again for a source for each claim while it is writing the report.",
      "As structured records in the Agent tool prompt, each with claim, source URL, excerpt, publication date, and originating subagent."
     ],
     "answer": 3,
     "explain": "D đúng: docs Agent SDK ghi thứ duy nhất truyền từ cha sang subagent (không phải fork) là chuỗi prompt của tool Agent, nên dữ liệu cần giữ phải nằm trong đó, và dạng bản ghi có cấu trúc (claim, nguồn, đoạn trích, ngày, subagent) giữ được nguồn gốc qua bước tổng hợp. A sai: văn xuôi dài hơn vẫn đánh rơi URL và ngày, và đi tìm lại sau dễ gán nhầm nguồn. B sai: docs Agent SDK ghi các lời gọi tool và kết quả trung gian nằm lại trong subagent, chỉ báo cáo cuối quay về cha; nên fork hội thoại của coordinator không cho bước tổng hợp đọc được kết quả tool hay trang gốc của các subagent như phương án nói, mà chỉ chép thêm cả context điều phối, vẫn không có ánh xạ claim–nguồn rõ ràng. C sai: gắn nguồn sau khi viết là cách dễ gán sai nhất; nguồn phải đi cùng claim từ lúc thu thập.",
     "sc": "s3",
     "ts": [
      "1.3",
      "5.6"
     ]
    },
    {
     "q": "A research coordinator runs the same fixed chain for every question: four searches on predefined angles, then analysis, then synthesis. For broad questions, early findings often reveal important sub-areas, such as a new regulation that changes the whole picture, which the fixed plan never investigates. What is the BEST change?",
     "options": [
      "Let the coordinator plan subtasks from the question, review interim findings, and add or redirect subtasks as new sub-areas emerge.",
      "Add more predefined angles to the fixed chain, so that every run covers a much wider range of possible sub-areas right from the very start.",
      "Run the fixed chain twice for each question and merge the two reports, so that the second run catches what the first one missed.",
      "Replace the coordinator with a single agent that answers each question in one long pass, without any delegation to subagents."
     ],
     "answer": 0,
     "explain": "A đúng: câu hỏi nghiên cứu mở là đúng loại việc mà các việc con không đoán trước được, nên cần phân rã động: coordinator lập kế hoạch, xem kết quả giữa chừng rồi giao thêm hoặc đổi hướng. Chuỗi cố định chỉ hợp với việc lặp lại, đoán trước được. B sai: thêm góc định sẵn vẫn là đoán trước; hướng mới phát sinh từ kết quả vẫn không được theo, lại tốn thêm cho câu hỏi hẹp. C sai: chạy lại cùng một kế hoạch cố định sẽ bỏ sót cùng những mảng đó. D sai: bỏ hẳn điều phối không giải quyết việc thích ứng, và mất lợi ích tách context và chạy song song.",
     "sc": "s3",
     "ts": [
      "1.6"
     ]
    },
    {
     "q": "An invoice-extraction agent has three tools: extract_invoice, validate_invoice, and post_to_erp. post_to_erp already refuses to run unless validate_invoice returned a pass earlier in the session. Audits still find posted invoices with errors: after a pass, the agent sometimes corrected a field, such as the supplier name, and posted the corrected data without validating it again. What is the MOST reliable fix?",
     "options": [
      "Add a system prompt rule that any change made after validation requires calling validate_invoice again before post_to_erp.",
      "Make post_to_erp accept only a payload whose hash matches one that validate_invoice recorded as passing.",
      "Add a PostToolUse hook on post_to_erp that alerts the finance team whenever the posted data differ from the last validated data.",
      "Remove the agent's ability to correct fields, so that any invoice with an error is rejected and must be scanned and extracted again."
     ],
     "answer": 1,
     "explain": "B đúng: cổng hiện tại kiểm tra sai thứ: \"đã có một lần validate đạt trong phiên\" chứ không phải \"chính dữ liệu sắp ghi đã được validate\". Gắn kết quả validate với đúng dữ liệu (ví dụ so khớp hash do validator ghi lại) khiến mọi chỉnh sửa sau đó buộc phải validate lại, do code cưỡng chế chứ không dựa vào trí nhớ của model (lời khuyên thiết kế). A sai: lại là lời dặn trong prompt cho đúng chỗ mà cổng code chưa bao được; model vẫn có thể quên. C sai: PostToolUse chạy sau khi tool đã thực thi, nên dữ liệu sai đã vào ERP rồi mới có cảnh báo. D sai: bỏ khả năng sửa là quá tay, biến lỗi nhỏ sửa được thành việc làm lại toàn bộ, trong khi vấn đề chỉ là cổng kiểm tra gắn sai đối tượng.",
     "sc": "s6",
     "ts": [
      "1.4"
     ]
    },
    {
     "q": "A team adds a progress panel to their Agent SDK coding assistant. It should show when the main agent delegates work to a subagent, and which streamed messages come from inside that subagent. How should the app detect these events?",
     "options": [
      "Parse the assistant's text for phrases such as \"I'll delegate this\", since subagent calls do not appear in the message stream.",
      "Watch for new files under .claude/agents/, because every delegation writes a fresh agent definition file into that folder.",
      "Watch for tool_use blocks named \"Agent\" (older versions used \"Task\"), and group messages by their parent_tool_use_id field.",
      "Compare token usage between turns, since a sudden jump in input tokens is the only sign that a subagent has started work."
     ],
     "answer": 2,
     "explain": "Docs SDK subagents: Claude gọi subagent qua tool Agent; để phát hiện, kiểm tra block tool_use có name là \"Agent\" (bản cũ là \"Task\", docs khuyên khớp cả hai), và message phát sinh trong subagent mang trường parent_tool_use_id. Lời gọi subagent hiện rõ trong stream, nên dò câu chữ là mong manh và không cần. Gọi subagent không tạo file định nghĩa mới; .claude/agents/ là nơi bạn tự định nghĩa agent. Dựa vào token tăng đột biến là đoán mò khi đã có tín hiệu tường minh.",
     "sc": "s4",
     "ts": [
      "1.3"
     ]
    },
    {
     "q": "An Agent SDK app puts a security check in its canUseTool callback: Bash commands that contact hosts outside the company network are refused. To cut down on prompts, a developer later added \"Bash\" to allowedTools, and now the check never runs. What is the BEST fix?",
     "options": [
      "Mention canUseTool at the top of the system prompt, so that the model runs the check before each command.",
      "Move the check into a PreToolUse hook, which runs even for calls that an allow rule has already approved.",
      "Add \"Bash\" to allowedTools a second time with a higher priority, so canUseTool is consulted before the rule.",
      "Switch to bypassPermissions mode, in which canUseTool is invoked for every tool call that Claude makes."
     ],
     "answer": 1,
     "explain": "Docs SDK permissions cảnh báo: tool đã được tự duyệt (bởi allow rule, acceptEdits hoặc bypassPermissions) không bao giờ tới canUseTool, nên kiểm tra đặt ở đó bị bỏ qua âm thầm; muốn kiểm tra cả các lời gọi đã được duyệt thì dùng hook PreToolUse, hook này chạy cho chúng và lệnh deny của hook có hiệu lực cả trong bypass. canUseTool là callback của app, model không \"chạy\" được nó qua system prompt. Không có khái niệm ưu tiên khi liệt kê trùng trong allowedTools. Ở bypassPermissions, lời gọi được duyệt trước khi tới canUseTool, ngược với điều phương án đó nói.",
     "sc": "s4",
     "ts": [
      "1.5",
      "2.3"
     ]
    },
    {
     "q": "A documentation generator built on the Agent SDK must produce a page for each of 40 modules plus an architecture overview of how the modules interact. A single prompt asking for everything at once yields detailed pages for the first modules, thin pages for the rest, and an overview that misses cross-module dependencies. Which decomposition is BEST?",
     "options": [
      "The same single prompt with a much higher max_turns value, so that the agent has enough turns left to reach the later modules and the overview properly.",
      "A focused pass per module recording its interfaces and dependencies, then a separate synthesis pass that builds the overview from those records.",
      "Only the overview, generated in one pass, with readers sent to the source code whenever they need details about a specific module.",
      "All 40 pages requested in one prompt again, with \"be equally thorough for every module\" added to the end of the instructions."
     ],
     "answer": 1,
     "explain": "Bài toán biết trước cấu trúc (40 module + một tổng quan) hợp với chuỗi bước cố định: một lượt tập trung cho từng module ghi lại interface và phụ thuộc ở dạng có cấu trúc, rồi một lượt tổng hợp xuyên module dựa trên các bản ghi đó (exam guide 1.6: per-file + cross-file). Mỗi lượt có sự chú ý đầy đủ, còn lượt tổng hợp thấy được phụ thuộc giữa các module. Tăng max_turns không sửa việc chú ý loãng dần trong một prompt quá rộng. Bỏ trang module là bỏ yêu cầu. Thêm câu \"thorough như nhau\" vẫn giữ nguyên thiết kế đã thất bại.",
     "sc": "s4",
     "ts": [
      "1.6"
     ]
    }
   ],
   "summary": [
    "Điều khiển vòng lặp agent bằng stop_reason: tool_use thì chạy tool, gửi tool_result rồi lặp; end_turn thì dừng. Thấy text trong response không có nghĩa là xong, và giới hạn số vòng chỉ là lưới an toàn.",
    "tool_result đứng đầu message user và khớp tool_use_id; nhiều tool_use trong một lượt thì trả hết kết quả trong một message.",
    "Các bước con biết trước thì dùng prompt chaining hoặc routing, đặt gate bằng code giữa các bước; không biết trước thì để coordinator phân rã động (orchestrator-workers).",
    "Coordinator là trung tâm: chia việc, giao việc, tổng hợp. Báo cáo thiếu cả một mảng thì xem lại bước chia việc của coordinator, không đổ cho subagent.",
    "Subagent (trừ fork) không thấy lịch sử của agent cha: mục tiêu, dữ liệu, định dạng output, nguồn/tool nên dùng và ranh giới phải nằm trong prompt giao việc.",
    "Nhiều lời gọi Agent (tên cũ Task) trong cùng một response thì chạy song song. AgentDefinition bắt buộc có description và prompt; tools giới hạn tool của subagent, bỏ Agent khỏi tools để chặn sinh subagent con.",
    "Quy tắc về tiền, bảo mật hay thứ tự bước phải cưỡng chế bằng code (kiểm tra trong tool, hook PreToolUse, permission rule); prompt và CLAUDE.md chỉ là hướng dẫn xác suất.",
    "PreToolUse chặn hoặc sửa trước khi tool chạy (deny/ask/allow, updatedInput); PostToolUse không ngăn được hành động, chỉ thêm context hoặc thay output Claude thấy (updatedToolOutput để chuẩn hóa dữ liệu). Hook Claude Code chặn bằng exit 2, exit 1 không chặn.",
    "Resume để làm tiếp trên cùng phân tích, fork để thử hướng khác mà giữ bản gốc; session lưu hội thoại chứ không lưu file. File đã đổi thì báo agent file nào đổi, hoặc mở session mới kèm bản tóm tắt.",
    "Escalate khi khách yêu cầu gặp người, chính sách không bao quát, không tiến triển được hoặc vượt ngưỡng rủi ro; cảm xúc hay điểm tự tin model tự báo không phải tiêu chí đáng tin; bàn giao bằng tóm tắt có cấu trúc."
   ]
  },
  {
   "id": "d2",
   "name": "Tool Design & MCP Integration",
   "weight": 18,
   "intro": "<p>Domain này hỏi cách thiết kế <em>giao diện</em> giữa Claude và thế giới bên ngoài: viết mô tả tool và input schema để Claude chọn đúng tool, giới hạn số tool cho mỗi agent, thiết kế lỗi trả về để agent biết retry hay dừng, và tích hợp MCP (tools/resources/prompts, cấu hình trong Claude Code). Domain này cũng bao gồm các built-in tool của Claude Code.</p>\n<p>Ranh giới: dùng tool để <em>ép output có cấu trúc</em> được hỏi ở Domain 4. Cách coordinator xử lý lỗi lan từ subagent lên thuộc Domain 5.</p>",
   "lessons": [
    {
     "id": "l-2-0",
     "title": "Nền tảng: tool được khai báo, chạy và kết nối qua MCP thế nào",
     "minutes": 13,
     "html": "<p>Domain 1 nói về vòng lặp: Claude xin gọi tool, code chạy rồi trả kết quả. Domain 2 nói về chính các tool đó: chúng được mô tả thế nào để Claude chọn đúng, chạy ở đâu, báo lỗi ra sao, và cách cắm cả một hệ thống bên ngoài vào agent bằng <strong>Model Context Protocol (MCP)</strong>. Bài này dựng các khái niệm đó từ đầu.</p>\n<h4>1. Tool là một hợp đồng ba phần</h4>\n<p>Với tool do bạn định nghĩa, Claude chỉ nhìn thấy ba thứ:</p>\n<table>\n<thead><tr><th>Trường</th><th>Vai trò</th></tr></thead>\n<tbody>\n<tr><td><code>name</code></td><td>Định danh, phải khớp regex <code>^[a-zA-Z0-9_-]{1,128}$</code></td></tr>\n<tr><td><code>description</code></td><td>Tool làm gì, khi nào dùng, khi nào không. Docs gọi đây là yếu tố quan trọng nhất cho hiệu quả dùng tool</td></tr>\n<tr><td><code>input_schema</code></td><td>JSON Schema cho tham số: kiểu, <code>enum</code>, <code>required</code>, mô tả từng thuộc tính</td></tr>\n</tbody>\n</table>\n<p>Các trường tùy chọn đáng biết: <code>input_examples</code> (ví dụ input hợp lệ cho tool phức tạp) và <code>strict: true</code> (bảo đảm input của lời gọi khớp schema). Claude không đọc code của tool. Mô tả tồi thì chọn nhầm, dù code đúng.</p>\n<h4>2. Tool chạy ở đâu</h4>\n<table>\n<thead><tr><th>Loại</th><th>Ví dụ</th><th>Ai thực thi</th></tr></thead>\n<tbody>\n<tr><td>Client tool tự định nghĩa</td><td><code>lookup_order</code>, <code>process_refund</code></td><td>Ứng dụng của bạn</td></tr>\n<tr><td>Client tool schema của Anthropic</td><td><code>bash</code>, <code>text_editor</code>, memory tool</td><td>Ứng dụng của bạn (Anthropic công bố schema)</td></tr>\n<tr><td>Server tool</td><td><code>web_search</code>, <code>web_fetch</code>, <code>code_execution</code>, <code>tool_search</code></td><td>Hạ tầng Anthropic</td></tr>\n<tr><td>Built-in tool của harness</td><td><code>Read</code>, <code>Edit</code>, <code>Bash</code>, <code>Grep</code>, <code>Glob</code>, <code>Agent</code></td><td>Claude Code / Agent SDK</td></tr>\n<tr><td>MCP tool</td><td><code>mcp__github__list_issues</code></td><td>MCP server</td></tr>\n</tbody>\n</table>\n<h4>3. Một vòng gọi tool</h4>\n<ol>\n<li>Request có mảng <code>tools</code>. Mặc định <code>tool_choice</code> là <code>auto</code>: Claude tự quyết gọi tool hay trả lời thẳng.</li>\n<li>Claude trả khối <code>tool_use</code> (id, name, input) với <code>stop_reason: \"tool_use\"</code>.</li>\n<li>Code chạy tool và gửi khối <code>tool_result</code> có cùng <code>tool_use_id</code>. Thất bại thì đặt <code>is_error: true</code> kèm thông điệp nói rõ chuyện gì sai và nên làm gì.</li>\n</ol>\n<p><strong>Chi phí</strong>: theo docs, tên, mô tả và schema của mọi tool đều tính vào input token, và API tự thêm một system prompt để bật tool use. Bộ tool phình to vừa tốn token vừa tạo nhiều điểm phân vân. Tool search (bật mặc định trong Claude Code và Agent SDK) giảm chi phí này bằng cách chỉ nạp schema đầy đủ khi cần.</p>\n<h4>4. MCP từ con số 0</h4>\n<p>Nếu mỗi ứng dụng AI phải tự viết tích hợp cho GitHub, Slack, Jira… thì có rất nhiều đoạn code lặp lại. MCP là giao thức mở chuẩn hóa chỗ nối này. Docs kiến trúc MCP mô tả ba vai:</p>\n<ul>\n<li><strong>Host</strong>: ứng dụng AI, ví dụ Claude Code hay Claude Desktop.</li>\n<li><strong>Client</strong>: thành phần trong host giữ kết nối tới <em>một</em> server. Host kết nối N server thì tạo N client.</li>\n<li><strong>Server</strong>: chương trình cung cấp context và hành động, chạy local hoặc remote.</li>\n</ul>\n<p>MCP có hai lớp. <strong>Lớp dữ liệu</strong> dùng JSON-RPC 2.0, định nghĩa các primitive và thông báo. <strong>Lớp vận chuyển</strong> có hai loại chuẩn: <strong>stdio</strong> (host khởi chạy server như một tiến trình con trên cùng máy) và <strong>Streamable HTTP</strong> (server từ xa, hỗ trợ xác thực HTTP; MCP khuyên dùng OAuth để lấy token).</p>\n<p>Server cung cấp ba primitive (chi tiết ở l-2-4): <strong>tools</strong> (hàm để hành động), <strong>resources</strong> (dữ liệu để đọc), <strong>prompts</strong> (mẫu tương tác dựng sẵn). Client khám phá chúng bằng các method <code>*/list</code> rồi mới dùng, nên danh sách có thể thay đổi động.</p>\n<div class=\"warn\">Đặc tả MCP đổi phiên bản theo thời gian. Docs hiện ghi (tháng 11/2026) phiên bản đặc tả mới nhất là 2026-07-28, trong đó giao thức được mô tả là stateless và tính năng sampling bị đánh dấu deprecated. Khi đọc tài liệu cũ, để ý phiên bản đặc tả mà nó trích.</div>\n<h4>5. MCP được cấu hình ở đâu</h4>\n<ul>\n<li><strong>Claude Code</strong>: ba scope local (mặc định), project (<code>.mcp.json</code> commit vào repo), user. Xem l-2-4.</li>\n<li><strong>Agent SDK</strong>: truyền trong option <code>mcpServers</code> khi gọi <code>query()</code>, hoặc để SDK nạp <code>.mcp.json</code> qua setting source <code>project</code>. Có thêm loại server chạy ngay trong process ứng dụng. Xem l-2-5.</li>\n<li>Tool MCP luôn có tên đầy đủ dạng <code>mcp__&lt;server&gt;__&lt;tool&gt;</code>, dùng trong permission rule và matcher của hook.</li>\n</ul>\n<h4>6. Lỗi: hai kênh</h4>\n<p>Trong MCP, lỗi về cấu trúc request (tool không tồn tại, request sai định dạng, lỗi server) đi theo <strong>lỗi JSON-RPC</strong>. Lỗi khi thực thi (API ngoài hỏng, dữ liệu không hợp lệ, vi phạm quy tắc nghiệp vụ) nằm trong <strong>kết quả</strong> với <code>isError: true</code>, để model đọc và tự sửa. Trên Messages API, tương đương là <code>is_error: true</code> trong <code>tool_result</code>. Chi tiết ở l-2-3.</p>\n<h4>Bản đồ Domain 2</h4>\n<table>\n<thead><tr><th>Bài</th><th>Phần nào của bức tranh</th></tr></thead>\n<tbody>\n<tr><td>l-2-1 Viết mô tả tool và input schema</td><td>Hợp đồng ba phần, gộp/tách tool, thiết kế response</td></tr>\n<tr><td>l-2-2 Phạm vi tool, tool_choice, built-in tools</td><td>Mỗi agent cầm tool nào; ép gọi tool; Read/Edit/Grep/Glob</td></tr>\n<tr><td>l-2-3 Thiết kế lỗi trả về</td><td>Kênh lỗi, phân loại lỗi, rỗng khác thất bại</td></tr>\n<tr><td>l-2-4 MCP: primitive và cấu hình trong Claude Code</td><td>Tools/resources/prompts, scope, <code>.mcp.json</code>, secret</td></tr>\n<tr><td>l-2-5 MCP trong ứng dụng Agent SDK</td><td><code>mcpServers</code>, tool tự viết in-process, quyền, trạng thái kết nối</td></tr>\n</tbody>\n</table>\n<div class=\"tip\">Domain 2 hay hỏi “sửa ở đâu trước”. Chọn nhầm tool thì sửa mô tả. Agent không biết retry hay dừng thì sửa payload lỗi. Cả team cần cùng một server thì dùng project scope.</div>",
     "keypoints": [
      "Claude chỉ thấy name, description, input_schema; mô tả là yếu tố quan trọng nhất.",
      "Client tool do app chạy, server tool do Anthropic chạy, built-in tool do Claude Code/SDK chạy, MCP tool do MCP server chạy.",
      "Định nghĩa tool tốn input token; tool search (mặc định bật trong Claude Code/SDK) chỉ nạp schema khi cần.",
      "MCP: host tạo một client cho mỗi server; lớp dữ liệu JSON-RPC 2.0; vận chuyển stdio hoặc Streamable HTTP.",
      "Lỗi cấu trúc request đi qua JSON-RPC error; lỗi thực thi nằm trong result với isError: true."
     ],
     "sources": [
      {
       "t": "Tool use with Claude (overview)",
       "u": "https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview"
      },
      {
       "t": "Define tools",
       "u": "https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools"
      },
      {
       "t": "MCP architecture overview",
       "u": "https://modelcontextprotocol.io/docs/learn/architecture"
      },
      {
       "t": "MCP specification 2026-07-28: Tools (error handling)",
       "u": "https://modelcontextprotocol.io/specification/2026-07-28/server/tools"
      },
      {
       "t": "Connect to external tools with MCP (Agent SDK)",
       "u": "https://code.claude.com/docs/en/agent-sdk/mcp"
      },
      {
       "t": "Connect Claude Code to tools via MCP (tool search)",
       "u": "https://code.claude.com/docs/en/mcp"
      }
     ],
     "ts": [
      "2.1",
      "2.2",
      "2.4"
     ]
    },
    {
     "id": "l-2-1",
     "title": "Viết mô tả tool và input schema",
     "minutes": 12,
     "html": "<p>Docs tool use của Anthropic nói rõ: mô tả tool chi tiết là <strong>yếu tố quan trọng nhất, hơn hẳn mọi yếu tố khác</strong> quyết định hiệu quả dùng tool. Claude không đọc code của tool. Nó chỉ thấy <code>name</code>, <code>description</code> và <code>input_schema</code>. Nếu hai tool có mô tả mơ hồ và chồng lấn nhau, Claude sẽ chọn nhầm.</p>\n<h4>Một mô tả tốt gồm gì</h4>\n<p>Docs khuyên mỗi tool nên có <strong>ít nhất 3–4 câu</strong> (nhiều hơn nếu tool phức tạp), nói rõ:</p>\n<ul>\n<li>Tool làm gì, trả về dữ liệu gì.</li>\n<li><strong>Khi nào nên dùng, và khi nào không nên dùng.</strong></li>\n<li>Từng tham số có nghĩa gì, ảnh hưởng thế nào tới kết quả.</li>\n<li>Giới hạn và lưu ý, ví dụ thông tin nào tool <em>không</em> trả về.</li>\n</ul>\n<pre>// Kém: hai tool gần như trùng nghĩa\n{\"name\": \"get_customer\", \"description\": \"Retrieves customer information.\"}\n{\"name\": \"lookup_order\", \"description\": \"Retrieves order information.\"}\n\n// Tốt hơn\n{\n  \"name\": \"lookup_order\",\n  \"description\": \"Looks up a single order by its order number (format: '#' followed by\n    digits, e.g. #48213). Returns status, items, shipping carrier, tracking number and\n    refund eligibility. Use this whenever the customer mentions an order number or asks\n    where a package is. Does NOT return the customer's profile or payment methods; use\n    get_customer for account questions.\",\n  \"input_schema\": {\n    \"type\": \"object\",\n    \"properties\": {\n      \"order_number\": {\"type\": \"string\",\n                       \"description\": \"Order number including '#', e.g. '#48213'\"}\n    },\n    \"required\": [\"order_number\"]\n  }\n}</pre>\n<h4>Input schema: để cấu trúc gánh bớt việc cho mô tả</h4>\n<ul>\n<li>Dùng <code>type</code>, <code>enum</code>, <code>required</code> để giới hạn giá trị hợp lệ. Thêm <code>description</code> cho từng thuộc tính, ghi rõ định dạng (ví dụ “ngày theo ISO 8601”).</li>\n<li>Docs có trường tùy chọn <code>input_examples</code>: một mảng ví dụ input hợp lệ, hữu ích cho input lồng nhau hoặc nhạy định dạng. Mỗi ví dụ phải hợp lệ theo schema (nếu không, API trả lỗi 400) và tốn thêm token prompt.</li>\n<li>Tên tool phải khớp <code>^[a-zA-Z0-9_-]{1,128}$</code>. Khi có nhiều dịch vụ, docs khuyên thêm tiền tố theo dịch vụ (ví dụ <code>github_list_prs</code>, <code>slack_send_message</code>) để tránh mơ hồ.</li>\n</ul>\n<h4>Gộp hay tách?</h4>\n<p>Mục tiêu là <strong>giảm mơ hồ khi chọn tool</strong>. Docs khuyên gộp các thao tác liên quan trên cùng một đối tượng vào một tool có tham số <code>action</code>, thay vì tạo <code>create_pr</code>, <code>review_pr</code>, <code>merge_pr</code> riêng. Ít tool mạnh hơn thì Claude bớt phân vân. Ngược lại, khi một tool “làm đủ thứ” với mô tả chung chung khiến Claude không biết lúc nào nên gọi, đổi tên và viết mô tả theo đúng mục đích sẽ giúp ích. Hãy tự hỏi: <em>nhìn mô tả, một người mới có biết chắc nên gọi tool nào không?</em></p>\n<h4>Thiết kế response của tool</h4>\n<p>Docs khuyên tool chỉ trả về <strong>thông tin có giá trị cao</strong>: định danh ổn định, có ý nghĩa (slug, UUID) thay cho tham chiếu nội bộ khó hiểu, và chỉ những trường Claude cần cho bước tiếp theo. Response phình to vừa tốn context vừa khiến Claude khó tìm thứ quan trọng. Ví dụ minh họa (không phải số liệu trong docs): API đơn hàng trả 40 trường thì tool chỉ nên trả vài trường liên quan tới bước tiếp theo.</p>\n<div class=\"tip\">Agent chọn nhầm giữa hai tool thì việc <strong>đầu tiên</strong> là viết lại mô tả cho rõ (định dạng input, ví dụ, ranh giới “dùng tool kia khi…”). Thêm bộ phân loại định tuyến, fine-tune hay đổi model đều tốn hơn và không giải quyết gốc rễ.</div>\n<div class=\"warn\">Đừng ép chọn tool bằng <code>tool_choice</code> để chữa mô tả kém. Ép một tool cụ thể chỉ hợp khi bạn chắc chắn bước đó luôn là bước đúng, ví dụ bước trích xuất trong pipeline.</div>",
     "keypoints": [
      "Mô tả tool là yếu tố quan trọng nhất; tối thiểu 3–4 câu: làm gì, khi nào dùng/không dùng, tham số, giới hạn.",
      "Dùng type/enum/required và mô tả từng thuộc tính; input_examples cho input phức tạp.",
      "Thêm tiền tố theo dịch vụ; gộp thao tác liên quan vào một tool có tham số action để giảm mơ hồ.",
      "Response của tool chỉ trả trường cần thiết, định danh ổn định.",
      "Chọn nhầm tool thì sửa mô tả trước, trước khi nghĩ tới routing hay fine-tune."
     ],
     "sources": [
      {
       "t": "Define tools",
       "u": "https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools"
      },
      {
       "t": "Writing tools for agents",
       "u": "https://www.anthropic.com/engineering/writing-tools-for-agents"
      }
     ],
     "ts": [
      "2.1"
     ]
    },
    {
     "id": "l-2-2",
     "title": "Phạm vi tool cho mỗi agent, tool_choice và built-in tools",
     "minutes": 13,
     "html": "<h4>Mỗi agent bao nhiêu tool?</h4>\n<p>Không có con số thần kỳ, nhưng nguyên tắc rõ: <strong>mỗi agent chỉ cầm những tool cần cho vai trò của nó</strong>. Theo docs Agent SDK, mỗi định nghĩa tool tốn chỗ trong context, và giới hạn tool cho subagent giảm rủi ro hành động ngoài ý muốn. Ví dụ: một subagent review tài liệu chỉ cần <code>Read</code> và <code>Grep</code>. Lời khuyên thiết kế (không phải câu trích docs): agent cầm quá nhiều tool chồng chéo sẽ hay chọn nhầm, hoặc “lạc đề”, ví dụ agent tổng hợp có tool tìm kiếm web dễ đi tìm thêm thay vì tổng hợp.</p>\n<p>Khi một vai trò thỉnh thoảng cần một chút năng lực của vai trò khác (agent tổng hợp cần kiểm chứng một con số), cách hợp lý là cho nó một tool <strong>phạm vi hẹp</strong> (chẳng hạn <code>verify_fact</code>). Yêu cầu nghiên cứu lớn hơn thì đẩy về coordinator. Không nên trao cả bộ tool tìm kiếm.</p>\n<p>Trong Claude Code, <strong>tool search</strong> bật mặc định: định nghĩa tool MCP được hoãn lại và chỉ nạp khi cần, nên thêm MCP server không làm phình context ngay từ đầu.</p>\n<h4><code>tool_choice</code></h4>\n<table>\n<thead><tr><th>Giá trị</th><th>Hành vi</th></tr></thead>\n<tbody>\n<tr><td><code>{\"type\": \"auto\"}</code></td><td>Claude tự quyết có gọi tool hay không (mặc định khi có <code>tools</code>)</td></tr>\n<tr><td><code>{\"type\": \"any\"}</code></td><td>Bắt buộc gọi <em>một</em> tool nào đó trong danh sách</td></tr>\n<tr><td><code>{\"type\": \"tool\", \"name\": \"...\"}</code></td><td>Bắt buộc gọi đúng tool đã chỉ định</td></tr>\n<tr><td><code>{\"type\": \"none\"}</code></td><td>Không cho gọi tool (mặc định khi không có <code>tools</code>)</td></tr>\n</tbody>\n</table>\n<ul>\n<li>Với <code>any</code>/<code>tool</code>, API điền sẵn đầu message assistant để ép gọi tool, nên Claude <strong>không viết lời giải thích</strong> trước khối <code>tool_use</code>. Muốn có lời giải thích thì dùng <code>auto</code> và dặn trong message user.</li>\n<li>Dùng <code>any</code> khi pipeline <em>bắt buộc</em> phải ra một lời gọi tool (ví dụ chọn một trong vài schema trích xuất). Dùng <code>tool</code> để ép một bước cụ thể chạy trước (ví dụ <code>extract_metadata</code>), rồi các lượt sau trả về <code>auto</code>.</li>\n<li>Docs gợi ý kết hợp <code>any</code> với <code>strict: true</code> trên định nghĩa tool để vừa chắc chắn có lời gọi, vừa chắc chắn input đúng schema.</li>\n</ul>\n<div class=\"warn\">Docs hiện ghi rằng ép tool (<code>any</code>/<code>tool</code>) <strong>không dùng được</strong> với extended thinking bật thủ công, và một số model mới nhất trả lỗi 400 với hai giá trị này. Docs khuyên dùng <code>auto</code> kèm strict tool use, hoặc structured outputs. Khi đề hỏi “ép model luôn gọi tool”, hiểu là trong bối cảnh model hỗ trợ.</div>\n<h4>Built-in tools của Claude Code</h4>\n<table>\n<thead><tr><th>Tool</th><th>Dùng để</th><th>Cần quyền?</th></tr></thead>\n<tbody>\n<tr><td><code>Read</code></td><td>Đọc nội dung file</td><td>Không</td></tr>\n<tr><td><code>Write</code></td><td>Tạo mới hoặc ghi đè toàn bộ file</td><td>Có</td></tr>\n<tr><td><code>Edit</code></td><td>Sửa có mục tiêu bằng thay chuỗi chính xác</td><td>Có</td></tr>\n<tr><td><code>Glob</code></td><td>Tìm file theo mẫu tên (ví dụ <code>**/*.test.ts</code>)</td><td>Không</td></tr>\n<tr><td><code>Grep</code></td><td>Tìm theo nội dung trong file (dựa trên ripgrep, cú pháp regex của ripgrep)</td><td>Không</td></tr>\n<tr><td><code>Bash</code></td><td>Chạy lệnh shell</td><td>Có</td></tr>\n<tr><td><code>Agent</code></td><td>Sinh subagent có context riêng</td><td>Không</td></tr>\n<tr><td><code>WebFetch</code> / <code>WebSearch</code></td><td>Lấy trang web / tìm kiếm web</td><td>Có</td></tr>\n</tbody>\n</table>\n<p>Phân biệt cho đúng: <strong>Glob tìm file theo tên</strong>, còn <strong>Grep tìm dòng bên trong file</strong>. Muốn tìm mọi nơi gọi hàm <code>processPayment</code> thì dùng Grep. Muốn liệt kê mọi file test thì dùng Glob. Docs tools reference hiện ghi rằng trên macOS/Linux/WSL, Glob và Grep không nằm trong bộ tool mặc định (Claude tìm bằng <code>find</code>/<code>grep</code> qua Bash), và có lại khi bạn chỉ định chúng trong <code>--tools</code> hoặc <code>--allowedTools</code>. Về khái niệm, vai trò của hai tool không đổi.</p>\n<p><strong>Edit</strong> thay chuỗi chính xác, không dùng regex hay khớp mờ. <code>old_string</code> phải xuất hiện <strong>đúng một lần</strong>. Nếu xuất hiện nhiều lần, cần đưa chuỗi dài hơn kèm ngữ cảnh xung quanh để chỉ đúng một chỗ, hoặc đặt <code>replace_all: true</code> nếu muốn thay hết. Khi cần viết lại phần lớn file, <code>Write</code> cả file thường hợp lý hơn nhiều lần Edit.</p>\n<div class=\"tip\">Chiến lược khám phá code hiệu quả: Glob/Grep để khoanh vùng, rồi Read có chọn lọc. Đừng Read toàn bộ thư mục ngay từ đầu.</div>",
     "keypoints": [
      "Mỗi agent chỉ cầm tool cần cho vai trò; vai trò khác cần chút năng lực thì cho tool phạm vi hẹp.",
      "tool_choice: auto (mặc định), any (bắt buộc một tool), tool (ép tool cụ thể), none.",
      "any/tool khiến Claude không viết text trước tool_use; kết hợp strict: true để input đúng schema.",
      "Glob tìm file theo tên, Grep tìm nội dung, Edit thay chuỗi chính xác và duy nhất, Write ghi đè cả file.",
      "Edit lỗi vì chuỗi trùng thì thêm ngữ cảnh cho duy nhất hoặc dùng replace_all."
     ],
     "sources": [
      {
       "t": "Define tools (tool_choice)",
       "u": "https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools"
      },
      {
       "t": "Tools reference (Claude Code)",
       "u": "https://code.claude.com/docs/en/tools-reference"
      },
      {
       "t": "Subagents in the SDK (tool restrictions)",
       "u": "https://code.claude.com/docs/en/agent-sdk/subagents"
      },
      {
       "t": "Connect Claude Code to tools via MCP (tool search)",
       "u": "https://code.claude.com/docs/en/mcp"
      }
     ],
     "ts": [
      "2.3",
      "2.5"
     ]
    },
    {
     "id": "l-2-3",
     "title": "Thiết kế lỗi trả về từ tool",
     "minutes": 11,
     "html": "<p>Agent chỉ phản ứng đúng khi nó <em>hiểu</em> chuyện gì đã xảy ra. Một tool trả về “Operation failed” buộc Claude phải đoán: thử lại? đổi tham số? báo khách? Thiết kế lỗi tốt là phần quan trọng của thiết kế tool.</p>\n<h4>Trong Messages API: <code>is_error</code></h4>\n<pre>{\n  \"type\": \"tool_result\",\n  \"tool_use_id\": \"toolu_01A09q90qw90lq917835lq9\",\n  \"content\": \"Rate limit exceeded on inventory service. Retry after 60 seconds.\",\n  \"is_error\": true\n}</pre>\n<ul>\n<li>Docs khuyên viết thông điệp lỗi <strong>có tính hướng dẫn</strong>: nói rõ chuyện gì sai và nên làm gì tiếp, thay vì “failed”.</li>\n<li>Khi Claude gọi tool thiếu tham số hoặc sai tham số, docs mô tả rằng nếu bạn trả lỗi qua <code>tool_result</code>, Claude sẽ thử lại khoảng 2–3 lần với bản sửa trước khi xin lỗi người dùng. Muốn loại bỏ hẳn lời gọi sai schema thì dùng <code>strict: true</code>.</li>\n<li>Lỗi của <em>server tool</em> (ví dụ web search) do Claude tự xử lý, bạn không cần trả <code>is_error</code>.</li>\n</ul>\n<h4>Trong MCP: hai cơ chế lỗi</h4>\n<table>\n<thead><tr><th>Loại</th><th>Dùng cho</th><th>Cách trả</th></tr></thead>\n<tbody>\n<tr><td>Protocol error</td><td>Tool không tồn tại, request sai định dạng (không thỏa schema <code>CallToolRequest</code>), lỗi server</td><td>Lỗi JSON-RPC chuẩn (trường <code>error</code>)</td></tr>\n<tr><td>Tool execution error</td><td>API bên ngoài lỗi, lỗi kiểm tra input (ví dụ ngày sai định dạng, giá trị ngoài khoảng), vi phạm quy tắc nghiệp vụ</td><td>Trong <code>result</code> với <code>isError: true</code> và nội dung mô tả</td></tr>\n</tbody>\n</table>\n<p>Lỗi thực thi nằm trong kết quả nên model đọc được và có thể tự sửa hướng. Spec ghi client NÊN (SHOULD) chuyển tool execution error cho model, còn protocol error thì chỉ CÓ THỂ (MAY) vì model ít khi tự sửa được. Đây là kênh để truyền thông tin lỗi có ý nghĩa cho agent.</p><p>Lưu ý phiên bản: bản đặc tả 2025-06-18 còn liệt kê “invalid arguments” là protocol error; từ bản 2025-11-25 (và bản hiện tại 2026-07-28), lỗi kiểm tra input được chuyển sang tool execution error để model tự sửa.</p>\n<h4>Phân loại lỗi để agent chọn hành động</h4>\n<p>Một cách thiết kế hay dùng là trả payload lỗi có cấu trúc thay vì chuỗi tự do:</p>\n<pre>{\n  \"error_category\": \"transient\",       // transient | validation | business_rule | permission\n  \"retryable\": true,\n  \"message\": \"Payment gateway timed out after 10s\",\n  \"suggested_action\": \"Retry once; if it fails again, tell the customer the payment\n                       is pending and do not charge twice\"\n}</pre>\n<table>\n<thead><tr><th>Loại</th><th>Ví dụ</th><th>Agent nên</th></tr></thead>\n<tbody>\n<tr><td>Tạm thời (transient)</td><td>Timeout, dịch vụ quá tải</td><td>Retry (tốt nhất là tool/subagent tự retry có backoff trước khi báo lên)</td></tr>\n<tr><td>Validation</td><td>Sai định dạng mã đơn</td><td>Sửa input hoặc hỏi lại người dùng</td></tr>\n<tr><td>Quy tắc nghiệp vụ</td><td>Đơn quá hạn hoàn tiền</td><td>Không retry; giải thích cho khách hoặc escalate</td></tr>\n<tr><td>Quyền</td><td>Không đủ quyền truy cập</td><td>Không retry; escalate</td></tr>\n</tbody>\n</table>\n<h4>“Không có kết quả” khác với “thất bại”</h4>\n<p>Đây là bẫy kinh điển. Truy vấn chạy xong và trả về rỗng (“không có đơn nào cho email này”) là một <strong>kết quả thành công</strong> mang thông tin hữu ích. Truy vấn bị timeout là <strong>thất bại</strong>. Nếu tool trả mảng rỗng khi database timeout, agent sẽ kết luận sai (“hết hàng”, “không có dữ liệu”), và coordinator trong hệ nhiều agent sẽ tổng hợp như thể chủ đề đó không có thông tin.</p>\n<div class=\"tip\">Đáp án tốt thường có ba ý: (1) phân biệt lỗi tạm thời với lỗi vĩnh viễn, (2) retry cục bộ cho lỗi tạm thời, (3) chỉ báo lên khi không tự khắc phục được, kèm ngữ cảnh: đã thử gì, có kết quả một phần nào không.</div>\n<div class=\"warn\">Hai thái cực đều sai: nuốt lỗi rồi trả “thành công” rỗng, và ném lỗi chung chung làm dừng cả pipeline. Nên trả lỗi có cấu trúc để bên trên quyết định.</div>",
     "keypoints": [
      "Messages API: báo lỗi bằng tool_result với is_error: true và thông điệp hướng dẫn.",
      "MCP: protocol error (JSON-RPC) cho tool không tồn tại, request sai schema, lỗi server; lỗi thực thi (gồm lỗi kiểm tra input) trong result với isError: true.",
      "Phân loại lỗi (transient / validation / business_rule / permission) kèm cờ retryable để agent chọn hành động.",
      "Kết quả rỗng hợp lệ khác với thất bại; đừng trả rỗng khi bị timeout.",
      "Lỗi tạm thời thì retry cục bộ trước, chỉ báo lên kèm ngữ cảnh khi không tự xử lý được."
     ],
     "sources": [
      {
       "t": "Handle tool calls (is_error)",
       "u": "https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls"
      },
      {
       "t": "MCP specification 2026-07-28: Tools (error handling)",
       "u": "https://modelcontextprotocol.io/specification/2026-07-28/server/tools"
      },
      {
       "t": "MCP specification 2025-11-25: changelog (input validation errors)",
       "u": "https://modelcontextprotocol.io/specification/2025-11-25/changelog"
      }
     ],
     "ts": [
      "2.2"
     ]
    },
    {
     "id": "l-2-4",
     "title": "MCP: tools, resources, prompts và cấu hình trong Claude Code",
     "minutes": 14,
     "html": "<p><strong>Model Context Protocol (MCP)</strong> là giao thức mở để ứng dụng AI kết nối tới hệ thống bên ngoài qua các <em>MCP server</em>. Một server cung cấp ba loại khối xây dựng, mỗi loại do một bên khác nhau điều khiển:</p>\n<table>\n<thead><tr><th>Primitive</th><th>Là gì</th><th>Ai điều khiển</th><th>Method</th></tr></thead>\n<tbody>\n<tr><td><strong>Tools</strong></td><td>Hàm mà model chủ động gọi để hành động (ghi DB, gọi API, sửa file)</td><td>Model</td><td><code>tools/list</code>, <code>tools/call</code></td></tr>\n<tr><td><strong>Resources</strong></td><td>Nguồn dữ liệu thụ động, chỉ đọc, định danh bằng URI (nội dung file, schema DB, tài liệu API). Có resource cố định và resource template có tham số</td><td>Ứng dụng</td><td><code>resources/list</code>, <code>resources/templates/list</code>, <code>resources/read</code></td></tr>\n<tr><td><strong>Prompts</strong></td><td>Mẫu chỉ dẫn dựng sẵn, có tham số, người dùng gọi rõ ràng</td><td>Người dùng</td><td><code>prompts/list</code>, <code>prompts/get</code></td></tr>\n</tbody>\n</table>\n<p>Về thiết kế: cung cấp danh mục, schema hay tài liệu dưới dạng <strong>resource</strong> giúp agent có sẵn bối cảnh mà không phải tốn nhiều lời gọi tool thăm dò. Hành động có tác dụng phụ thì phải là <strong>tool</strong>.</p>\n<h4>Ba scope cấu hình trong Claude Code</h4>\n<table>\n<thead><tr><th>Scope</th><th>Áp dụng</th><th>Chia sẻ với team</th><th>Lưu ở</th></tr></thead>\n<tbody>\n<tr><td>Local (mặc định)</td><td>Chỉ project hiện tại</td><td>Không</td><td><code>~/.claude.json</code> (dưới đường dẫn project)</td></tr>\n<tr><td>Project</td><td>Chỉ project hiện tại</td><td>Có, qua version control</td><td><code>.mcp.json</code> ở thư mục gốc project</td></tr>\n<tr><td>User</td><td>Mọi project của bạn</td><td>Không</td><td><code>~/.claude.json</code></td></tr>\n</tbody>\n</table>\n<p>Khi một server được khai báo ở nhiều scope, Claude Code dùng <em>nguyên</em> mục từ một nguồn (không trộn trường), theo thứ tự ưu tiên local, rồi project, rồi user.</p>\n<h4><code>.mcp.json</code> và biến môi trường</h4>\n<pre>{\n  \"mcpServers\": {\n    \"github\": {\n      \"type\": \"http\",\n      \"url\": \"https://mcp.example.com/github\",\n      \"headers\": { \"Authorization\": \"Bearer ${GITHUB_TOKEN}\" }\n    },\n    \"internal-docs\": {\n      \"type\": \"stdio\",\n      \"command\": \"npx\",\n      \"args\": [\"-y\", \"@acme/docs-mcp\"],\n      \"env\": { \"DOCS_API_URL\": \"${DOCS_API_URL:-https://docs.internal.example}\" }\n    }\n  }\n}</pre>\n<ul>\n<li>Cú pháp <code>${VAR}</code> và <code>${VAR:-default}</code> dùng được trong <code>command</code>, <code>args</code>, <code>env</code>, <code>url</code>, <code>headers</code>.</li>\n<li>Biến chưa đặt và không có default thì cấu hình vẫn nạp, Claude Code cảnh báo và giữ nguyên chuỗi <code>${VAR}</code>.</li>\n<li>Commit <code>.mcp.json</code> để cả team có cùng server, nhưng <strong>không bao giờ</strong> ghi token thật vào đó. Mỗi người tự đặt biến môi trường của mình.</li>\n</ul>\n<h4>Thêm server bằng CLI</h4>\n<pre>claude mcp add --transport http github https://mcp.example.com/github\nclaude mcp add --transport http shared-docs --scope project https://example.com/mcp\nclaude mcp add --env AIRTABLE_API_KEY=YOUR_KEY --transport stdio airtable \\\n  -- npx -y airtable-mcp-server</pre>\n<p><code>--transport</code> nhận <code>http</code> (khuyên dùng), <code>sse</code> (đã lỗi thời) hoặc <code>stdio</code>. <code>--scope</code> nhận <code>local</code> (mặc định), <code>project</code>, <code>user</code>. Mọi thứ sau <code>--</code> là lệnh khởi động server.</p>\n<p>Vì lý do bảo mật, trong phiên tương tác Claude Code <strong>hỏi xác nhận</strong> trước khi dùng server project-scope từ <code>.mcp.json</code>. Trong <code>claude -p</code> không có ai trả lời, nên server được nạp mà không hỏi. Muốn chặn thì dùng <code>disabledMcpjsonServers</code> hoặc <code>--strict-mcp-config</code>.</p>\n<h4>Dùng resources và prompts trong Claude Code</h4>\n<ul>\n<li><strong>Resource</strong>: gõ <code>@</code> để thấy danh sách, tham chiếu theo dạng <code>@server:protocol://resource/path</code>, ví dụ <code>@github:issue://123</code>. Resource được tự động lấy và đính kèm.</li>\n<li><strong>Prompt</strong>: xuất hiện như lệnh, hiển thị dạng <code>/servername:promptname (MCP)</code>. Gõ <code>/mcp__servername__promptname</code> cũng chạy được.</li>\n<li><strong>Tool</strong> MCP có tên đầy đủ dạng <code>mcp__&lt;server&gt;__&lt;tool&gt;</code>, dùng trong permission rule và matcher của hook.</li>\n<li>Output lớn: Claude Code cảnh báo khi output một tool MCP vượt 10.000 token. Giới hạn mặc định là 25.000 token, chỉnh bằng biến <code>MAX_MCP_OUTPUT_TOKENS</code>.</li>\n</ul>\n<div class=\"tip\">Server cả team cần thì dùng project scope (<code>.mcp.json</code> commit vào repo, secret qua <code>${VAR}</code>). Server thử nghiệm cá nhân thì dùng local hoặc user scope.</div>\n<div class=\"warn\">Nhầm lẫn hay gặp: tưởng <code>~/.claude.json</code> được chia sẻ với team (không phải), hoặc tưởng prompt của MCP do model tự gọi (không, prompt do người dùng gọi).</div>",
     "keypoints": [
      "MCP có ba primitive: Tools (model điều khiển), Resources (ứng dụng điều khiển, chỉ đọc, có URI), Prompts (người dùng gọi).",
      "Scope: local (mặc định, riêng tư), project (.mcp.json, commit, chia sẻ), user (mọi project, riêng tư).",
      ".mcp.json hỗ trợ ${VAR} và ${VAR:-default}; không commit secret.",
      "Resource tham chiếu bằng @server:protocol://path; prompt chạy bằng /mcp__server__prompt.",
      "Server project-scope cần xác nhận trong phiên tương tác; với -p thì được nạp không hỏi."
     ],
     "sources": [
      {
       "t": "Understanding MCP servers",
       "u": "https://modelcontextprotocol.io/docs/learn/server-concepts"
      },
      {
       "t": "Connect Claude Code to tools via MCP",
       "u": "https://code.claude.com/docs/en/mcp"
      }
     ],
     "ts": [
      "2.4"
     ]
    },
    {
     "id": "l-2-5",
     "title": "MCP trong ứng dụng Agent SDK: nối server, tự viết tool và cấp quyền",
     "minutes": 12,
     "html": "<p>Bài l-2-4 cấu hình MCP cho người dùng Claude Code. Khi bạn tự viết agent bằng Claude Agent SDK (ví dụ agent hỗ trợ khách chạy trên server của công ty), câu hỏi đổi thành: nối MCP server vào <code>query()</code> thế nào, khi nào tự viết tool, và cấp quyền sao cho vừa đủ.</p>\n<h4>Dùng server có sẵn hay tự viết?</h4>\n<p>Docs Agent SDK giới thiệu MCP là cách để agent truy vấn database, dùng API như Slack, GitHub <em>mà không phải tự viết tool</em>. Lời khuyên thiết kế rút ra: tích hợp chuẩn (GitHub, Slack, issue tracker) thì ưu tiên server có sẵn đáng tin; logic riêng của doanh nghiệp (chính sách hoàn tiền, tra hợp đồng nội bộ) thì tự viết tool. Docs Claude Code cũng nhắc phải kiểm tra mình tin server trước khi kết nối, vì server lấy nội dung từ bên ngoài có thể mở đường cho prompt injection.</p>\n<h4>Ba kiểu server trong <code>mcpServers</code></h4>\n<pre>options = ClaudeAgentOptions(\n    mcp_servers={\n        # 1. stdio: SDK khởi chạy tiến trình local\n        \"files\": {\"command\": \"npx\",\n                  \"args\": [\"-y\", \"@modelcontextprotocol/server-filesystem\", \"/srv/kb\"]},\n        # 2. HTTP: server từ xa, secret lấy từ biến môi trường\n        \"tickets\": {\"type\": \"http\", \"url\": \"https://mcp.example.com/tickets\",\n                    \"headers\": {\"Authorization\": f\"Bearer {os.environ['TICKETS_TOKEN']}\"}},\n        # 3. SDK server: tool viết ngay trong process của bạn\n        \"billing\": billing_server,\n    },\n    allowed_tools=[\"mcp__files__*\", \"mcp__tickets__search_tickets\",\n                   \"mcp__billing__get_refund_policy\"],\n)</pre>\n<p>Docs gợi ý cách chọn: tài liệu của server đưa <strong>lệnh để chạy</strong> thì dùng stdio; đưa <strong>URL</strong> thì dùng HTTP (<code>\"type\": \"http\"</code> cho Streamable HTTP; SSE vẫn có nhưng docs Claude Code ghi SSE đã deprecated); tool tự viết trong code thì dùng SDK server. Cũng có thể đặt cấu hình trong <code>.mcp.json</code> và để SDK nạp qua setting source <code>project</code>.</p>\n<h4>Tự viết tool: in-process MCP server</h4>\n<pre>@tool(\"get_refund_policy\",\n      \"Return the refund window and conditions for a product category. \"\n      \"Use before promising any refund. Does not issue refunds.\",\n      {\"category\": str})\nasync def get_refund_policy(args):\n    policy = POLICIES.get(args[\"category\"])\n    if policy is None:\n        return {\"content\": [{\"type\": \"text\",\n                 \"text\": f\"Unknown category '{args['category']}'. \"\n                         \"Valid: electronics, apparel, grocery.\"}],\n                \"is_error\": True}\n    return {\"content\": [{\"type\": \"text\", \"text\": json.dumps(policy)}]}\n\nbilling_server = create_sdk_mcp_server(name=\"billing\", version=\"1.0.0\",\n                                       tools=[get_refund_policy])</pre>\n<ul>\n<li>Một tool gồm bốn phần: tên, mô tả, schema input, handler. Handler trả <code>content</code> (bắt buộc), có thể kèm <code>structuredContent</code> và cờ lỗi.</li>\n<li><strong>Lỗi</strong>: docs ghi handler ném exception không bắt thì server in-process chuyển thành kết quả lỗi mang nguyên thông điệp exception, và vòng lặp vẫn chạy tiếp. Tự bắt lỗi và trả cờ lỗi kèm thông điệp có hướng dẫn thì Claude có thông tin tốt hơn để retry hoặc đổi hướng.</li>\n<li><strong>Annotation</strong> như <code>readOnlyHint</code> (mặc định <code>false</code>) cho biết tool không sửa môi trường; docs ghi nó quyết định tool có được gọi song song với các tool chỉ đọc khác không. Annotation là metadata, <em>không</em> phải cưỡng chế: tool gắn <code>readOnlyHint</code> mà handler ghi đĩa thì vẫn ghi.</li>\n</ul>\n<h4>Tên và quyền</h4>\n<ul>\n<li>Tên đầy đủ là <code>mcp__&lt;tên server&gt;__&lt;tên tool&gt;</code>; ký tự như dấu chấm, khoảng trắng trong tên server được đổi thành <code>_</code>.</li>\n<li>Docs ghi MCP tool cần quyền rõ ràng: thiếu quyền thì Claude thấy tool nhưng không gọi được.</li>\n<li>Wildcard chỉ hợp lệ sau tiền tố server cụ thể: <code>mcp__files__*</code> duyệt mọi tool của server <code>files</code>. Mục allow không neo như <code>\"*\"</code> hay <code>\"mcp__*\"</code> bị bỏ qua, không duyệt gì cả.</li>\n<li>Docs khuyên dùng <code>allowedTools</code> thay vì permission mode cho MCP: <code>acceptEdits</code> không tự duyệt MCP tool, còn <code>bypassPermissions</code> thì duyệt nhưng tắt gần hết các lời hỏi an toàn khác, rộng hơn mức cần.</li>\n<li>Phân biệt hai lớp: <code>tools</code> / tên trần trong <code>disallowedTools</code> quyết định tool <em>có trong context</em> không; <code>allowedTools</code> quyết định lời gọi có <em>được tự duyệt</em> không. Ví dụ <code>tools: []</code> bỏ mọi built-in, Claude chỉ còn MCP tool của bạn.</li>\n</ul>\n<h4>Server không kết nối được</h4>\n<p>Message <code>system</code> subtype <code>init</code> đầu mỗi query ghi trạng thái từng server: <code>pending</code>, <code>connected</code>, <code>failed</code>, <code>needs-auth</code>, <code>disabled</code>. Docs lưu ý <code>pending</code> chưa chắc là lỗi (có thể đang kết nối hoặc dùng danh sách tool đã cache); cần kiểm tra <code>failed</code> và <code>needs-auth</code> để phát hiện server không dùng được. SDK không mở trình duyệt chạy OAuth; server cần đăng nhập thì truyền token qua <code>headers</code>.</p>\n<div class=\"tip\">Tình huống “agent phải dùng hệ thống ticket nội bộ, team chỉ muốn cho phép đọc”: cấp đúng các tool đọc bằng tên đầy đủ trong <code>allowedTools</code>, không dùng <code>bypassPermissions</code>, không dùng wildcard toàn cục.</div>\n<div class=\"warn\">Đừng nhầm tool search với “tool bị ẩn”. Tool search bật mặc định chỉ hoãn việc nạp schema đầy đủ; Claude vẫn thấy tên tool trong danh sách gọn và tải schema khi cần. Mô tả tool vẫn phải rõ để Claude tìm và chọn đúng.</div>",
     "keypoints": [
      "Tích hợp chuẩn thì ưu tiên MCP server có sẵn đáng tin; logic riêng thì tự viết tool (in-process SDK server).",
      "mcpServers nhận stdio (command/args), HTTP (url/headers) và SDK server; secret lấy từ biến môi trường.",
      "Tên tool mcp__server__tool; wildcard chỉ hợp lệ sau tiền tố server; 'mcp__*' trong allow bị bỏ qua.",
      "Handler ném exception thì thành kết quả lỗi, vòng lặp chạy tiếp; tự trả cờ lỗi với thông điệp hướng dẫn thì tốt hơn.",
      "Kiểm tra trạng thái failed/needs-auth trong message init; pending chưa chắc là lỗi."
     ],
     "sources": [
      {
       "t": "Connect to external tools with MCP (Agent SDK)",
       "u": "https://code.claude.com/docs/en/agent-sdk/mcp"
      },
      {
       "t": "Give Claude custom tools (Agent SDK)",
       "u": "https://code.claude.com/docs/en/agent-sdk/custom-tools"
      },
      {
       "t": "Configure permissions (Agent SDK)",
       "u": "https://code.claude.com/docs/en/agent-sdk/permissions"
      },
      {
       "t": "Connect Claude Code to tools via MCP",
       "u": "https://code.claude.com/docs/en/mcp"
      }
     ],
     "ts": [
      "2.4",
      "2.2"
     ]
    }
   ],
   "cheat": [
    [
     "Agent chọn nhầm tool",
     "Viết lại mô tả: làm gì, input dạng nào, khi nào dùng/không dùng, phân biệt với tool kia"
    ],
    [
     "Độ dài mô tả",
     "Docs khuyên tối thiểu 3–4 câu mỗi tool"
    ],
    [
     "input_examples",
     "Ví dụ input hợp lệ theo schema; cho input phức tạp; tốn token"
    ],
    [
     "Quá nhiều tool",
     "Chỉ cấp tool cần cho vai trò; cần thêm thì cho tool phạm vi hẹp"
    ],
    [
     "tool_choice",
     "auto (mặc định) / any (bắt buộc một tool) / tool (ép tool cụ thể) / none"
    ],
    [
     "any + strict: true",
     "Vừa chắc có lời gọi tool, vừa chắc input đúng schema (trên model hỗ trợ ép tool)"
    ],
    [
     "Lỗi tool (API)",
     "tool_result + is_error: true + thông điệp nói rõ nên làm gì"
    ],
    [
     "Lỗi MCP",
     "Protocol error (JSON-RPC): tool không tồn tại, request sai schema, lỗi server / Tool execution error (result.isError: true): lỗi API, lỗi kiểm tra input, lỗi nghiệp vụ"
    ],
    [
     "Rỗng và lỗi",
     "Kết quả rỗng là thành công; timeout là lỗi retryable, không được trả rỗng"
    ],
    [
     "MCP scopes",
     "local (mặc định, ~/.claude.json) / project (.mcp.json) / user (~/.claude.json)"
    ],
    [
     "Secret trong .mcp.json",
     "Dùng ${VAR} hoặc ${VAR:-default}, mỗi dev tự đặt biến"
    ],
    [
     "Resource / prompt MCP trong Claude Code",
     "@server:protocol://path / /mcp__server__prompt"
    ],
    [
     "MCP host / client / server",
     "Host tạo một client cho mỗi server; stdio (local) hoặc Streamable HTTP (remote); lớp dữ liệu JSON-RPC 2.0"
    ],
    [
     "mcpServers trong Agent SDK",
     "stdio (command/args), http (url/headers), SDK server in-process; quyền bằng allowedTools mcp__server__*"
    ],
    [
     "Tool tự viết ném exception",
     "Thành kết quả lỗi mang thông điệp gốc, vòng lặp chạy tiếp; tự trả cờ lỗi kèm hướng dẫn thì tốt hơn"
    ]
   ],
   "quiz": [
    {
     "q": "A support agent has two tools: get_customer (\"Retrieves customer information\") and lookup_order (\"Retrieves order information\"). When users ask \"Where is my order #48213?\", the agent frequently calls get_customer first and then asks for an email address. What should you do FIRST?",
     "options": [
      "Add a lightweight routing classifier in front of the agent that inspects each message and decides which of the two tools should be called.",
      "Merge both tools into a single generic lookup tool that accepts any identifier.",
      "Rewrite both descriptions: what each returns, which identifiers it accepts, and when to use the other one instead.",
      "Set tool_choice to force lookup_order whenever the user's message contains a number."
     ],
     "answer": 2,
     "explain": "Mô tả tool là yếu tố quan trọng nhất trong việc chọn tool. Ở đây hai mô tả quá ngắn và chồng lấn, nên sửa mô tả là bước đầu tiên, rẻ nhất và đúng gốc rễ. A thêm hạ tầng mà chưa chữa nguyên nhân. B gộp hai đối tượng khác nhau vào một tool mơ hồ hơn. D là luật cứng dễ sai (số điện thoại, số lượng hàng cũng là số).",
     "sc": "s1",
     "ts": [
      "2.1"
     ]
    },
    {
     "q": "An invoice-extraction pipeline must produce a call to the extract_invoice tool for every document, never a free-text reply. The model in use supports forced tool use. Which configuration BEST meets this requirement?",
     "options": [
      "Set tool_choice to {\"type\": \"tool\", \"name\": \"extract_invoice\"} and enable strict: true on the tool definition.",
      "Keep tool_choice as auto and add a strongly worded instruction to the system prompt telling Claude it must always respond by calling extract_invoice.",
      "Set tool_choice to none and parse the JSON from the text response.",
      "Lower the temperature to zero so the model reliably chooses the tool."
     ],
     "answer": 0,
     "explain": "Ép đúng tool bằng tool_choice dạng tool bảo đảm mỗi response là một lời gọi extract_invoice. strict: true bảo đảm input khớp schema. B vẫn chỉ là xác suất. C bỏ mất cơ chế bảo đảm cấu trúc. D không bảo đảm gì về việc có gọi tool hay không.",
     "sc": "s6",
     "ts": [
      "2.3",
      "4.3"
     ]
    },
    {
     "q": "An MCP server's check_inventory tool returns a successful, empty item list whenever its upstream database query times out. The agent then tells customers that products are out of stock. What is the BEST fix?",
     "options": [
      "Add a system prompt rule telling the agent that whenever the inventory list comes back empty it should call the tool two more times before answering.",
      "Make the server process exit on timeouts so the client restarts it automatically.",
      "Raise the database timeout to 60 seconds so timeouts become rarer.",
      "Return the timeout as a tool execution error (isError: true) marked retryable, distinct from a genuine empty result."
     ],
     "answer": 3,
     "explain": "Gốc rễ là tool trộn lẫn 'thất bại' với 'không có kết quả'. Trả lỗi thực thi có cấu trúc (isError, có thể retry) giúp agent biết retry hoặc báo đúng tình trạng. A bắt cả trường hợp hết hàng thật cũng phải gọi lại, và vẫn không phân biệt được hai trường hợp. B làm mất kết nối, không mang thông tin. C chỉ làm lỗi hiếm hơn, khi xảy ra vẫn sai như cũ.",
     "sc": "s1",
     "ts": [
      "2.2",
      "5.3"
     ]
    },
    {
     "q": "A platform team wants every developer's Claude Code to connect to the company GitHub MCP server when working in the monorepo. Each developer has a personal access token. Which setup is BEST?",
     "options": [
      "Ask each developer to run claude mcp add with --scope user on their own machine.",
      "Commit a .mcp.json at the repository root whose server entry uses \"Authorization\": \"Bearer ${GITHUB_TOKEN}\", and have each developer export their own token.",
      "Commit a .mcp.json at the repository root containing a shared service-account token so setup is automatic.",
      "Add the server to ~/.claude.json on the CI runner so it propagates to developers."
     ],
     "answer": 1,
     "explain": ".mcp.json ở project scope được commit nên cả team có cùng cấu hình. Biến môi trường ${GITHUB_TOKEN} giữ secret ngoài repo. A làm được nhưng mỗi người tự cấu hình, dễ lệch nhau và không gắn với repo. C lộ secret trong version control. D sai: ~/.claude.json là cấu hình riêng của từng máy, không lan sang ai.",
     "ts": [
      "2.4"
     ]
    },
    {
     "q": "Which TWO statements about MCP server primitives are correct? (Choose TWO.)",
     "options": [
      "Resources are model-controlled functions that Claude invokes to change external state.",
      "Resources provide read-only context identified by URIs, such as a database schema or documentation pages.",
      "Prompts are triggered automatically by the model whenever they seem relevant.",
      "Each tool must be listed individually in .mcp.json before Claude can use it.",
      "Prompts are user-invoked templates, and Claude Code surfaces them as slash commands."
     ],
     "answer": [
      1,
      4
     ],
     "explain": "Resource là dữ liệu chỉ đọc có URI, do ứng dụng điều khiển. Prompt là mẫu do người dùng gọi, và Claude Code hiển thị chúng như lệnh /mcp__server__prompt. A mô tả tool chứ không phải resource. C sai vì prompt cần người dùng gọi rõ ràng. D sai: client khám phá tool qua tools/list, còn .mcp.json chỉ khai báo server.",
     "ts": [
      "2.4"
     ]
    },
    {
     "q": "In a multi-agent research system, the synthesis agent has 18 tools, including web search, page fetch, database query, and file operations. It often launches new web searches instead of synthesizing the findings it was given, and sometimes calls the wrong tool. What is the BEST change?",
     "options": [
      "Expand the descriptions of all 18 tools with detailed usage guidance so the synthesis agent understands exactly when each one should be used.",
      "Set tool_choice to any so the synthesis agent always calls a tool.",
      "Give it only the tools its role needs (plus a narrow fact-check tool) and route new research through the coordinator.",
      "Move the synthesis agent to a larger model that can manage more tools."
     ],
     "answer": 2,
     "explain": "Agent cầm quá nhiều tool ngoài vai trò sẽ dễ lạc đề và chọn nhầm. Thu hẹp bộ tool theo vai trò, thêm một tool kiểm chứng phạm vi hẹp, và đẩy nghiên cứu mới về coordinator. A không giải quyết việc agent có quyền làm việc ngoài vai trò. B còn ép nó gọi tool nhiều hơn. D tốn hơn mà không sửa thiết kế.",
     "sc": "s3",
     "ts": [
      "2.3"
     ]
    },
    {
     "q": "Claude Code's Edit tool fails on a file because the old_string Claude chose appears in three places. Which response is CORRECT?",
     "options": [
      "Use a longer old_string that matches exactly one location, or set replace_all to change every occurrence.",
      "Escape all regex metacharacters in old_string, because the Edit tool performs regular-expression matching and treats some characters specially.",
      "Use the Grep tool, which can modify matching lines in place.",
      "Disable the uniqueness check in settings.json."
     ],
     "answer": 0,
     "explain": "Edit thay chuỗi chính xác và yêu cầu old_string xuất hiện đúng một lần. Cách xử lý là thêm ngữ cảnh cho duy nhất, hoặc dùng replace_all khi muốn thay hết. B sai: Edit không dùng regex. C sai: Grep chỉ tìm, không sửa. D: không có thiết lập như vậy.",
     "sc": "s4",
     "ts": [
      "2.5"
     ]
    },
    {
     "q": "A developer wants Claude Code to use the users table schema that the connected MCP server named \"postgres\" exposes as a resource. How should the developer include it in the prompt?",
     "options": [
      "Run /mcp__postgres__users to insert the schema.",
      "Reference the resource with an @ mention such as @postgres:schema://users.",
      "Paste the schema into CLAUDE.md before every session so that it is always loaded into Claude's context automatically.",
      "Ask Claude to run claude mcp get postgres to read the schema."
     ],
     "answer": 1,
     "explain": "Resource của MCP được tham chiếu bằng @server:protocol://resource/path và được tự động lấy về đính kèm. A là cú pháp chạy prompt của MCP, không phải resource. C là thao tác thủ công, dễ lỗi thời. D chỉ hiển thị cấu hình server, không đọc resource.",
     "ts": [
      "2.4"
     ]
    }
   ],
   "bank": [
    {
     "q": "A scheduling assistant has list_users, list_events, and create_event tools. To book a meeting it typically makes many calls, reads large calendars into context, and sometimes double-books. Following Anthropic's guidance on writing tools for agents, what is the BEST redesign?",
     "options": [
      "Add a schedule_event tool that finds a common free slot and books it in one call.",
      "Keep the three tools but add a fourth tool, get_tool_usage_guide, that explains the right order of calls to make.",
      "Split list_events into list_events_today, list_events_this_week, and list_events_this_month to shrink responses.",
      "Return the raw calendar API payloads unchanged so the agent always has every field it might need for booking."
     ],
     "answer": 0,
     "explain": "Đúng: bài \"Writing effective tools for agents\" khuyên đừng chỉ bọc lại từng endpoint API; tool có thể gộp chức năng, xử lý nhiều bước hay đi cùng nhau trong một lần gọi, và lấy đúng ví dụ thay list_users/list_events/create_event bằng schedule_event tự tìm lịch trống và đặt lịch. Sai: thêm tool \"hướng dẫn\" vẫn giữ chuỗi gọi dài và dễ sai. Tách list_events thành nhiều tool làm tăng số tool và chọn nhầm, không giải quyết việc đặt trùng. Trả payload thô làm phình context, ngược với khuyến nghị chỉ trả thông tin tín hiệu cao.",
     "ts": [
      "2.1"
     ]
    },
    {
     "q": "An agent connects to Jira, Asana, and Confluence servers, and each exposes a tool simply named search. The agent often searches the wrong system. Which naming change BEST helps tool selection?",
     "options": [
      "Give all three tools the same detailed description so the agent treats them consistently.",
      "Namespace the tools by service, e.g. jira_search, asana_search, confluence_search.",
      "Merge them into one search tool that queries all three systems and returns every result together in one list.",
      "Put the three tools in alphabetical order in the tools array so the most relevant one is easier to locate."
     ],
     "answer": 1,
     "explain": "Đúng: docs Define tools (best practices) và bài \"Writing effective tools for agents\" đều khuyên đặt namespace theo dịch vụ/tài nguyên (ví dụ github_list_prs, asana_search, jira_search) để việc chọn tool rõ ràng khi thư viện tool lớn dần. Sai: mô tả giống hệt nhau làm ba tool càng khó phân biệt. Gộp thành một search chung trả về trộn lẫn kết quả nhiễu, agent mất khả năng nhắm đúng hệ thống. Thứ tự trong mảng tools không phải cơ chế chọn tool.",
     "ts": [
      "2.1"
     ]
    },
    {
     "q": "A contacts tool returns records such as {\"uuid\": \"9f1c2e7a-4b8d-…\", \"mime_type\": \"text/vcard\", \"avatar_256px_url\": \"…\", \"name\": \"Jane Li\"}. In follow-up calls the agent sometimes passes a mistyped or invented uuid. What change does Anthropic's tool-writing guidance recommend?",
     "options": [
      "Return even more low-level fields, such as internal row numbers, so that the agent can cross-check the uuid it uses.",
      "Ask the agent in the system prompt to copy uuids character by character and double-check them before each call.",
      "Return meaningful fields like name and a simple ID, with full technical IDs only in an optional detailed mode.",
      "Encode each record as base64 so that the agent treats the identifier as one opaque token and cannot alter it."
     ],
     "answer": 2,
     "explain": "Đúng: bài \"Writing effective tools for agents\" khuyên chỉ trả thông tin tín hiệu cao, bỏ định danh kỹ thuật cấp thấp (uuid, 256px_image_url, mime_type), vì agent xử lý tên/định danh có nghĩa tốt hơn nhiều; đổi UUID sang tên có nghĩa hoặc ID đơn giản giảm hallucination. Khi cần ID kỹ thuật cho bước sau, có thể thêm tham số response_format \"concise\"/\"detailed\". Sai: thêm trường cấp thấp làm nhiễu hơn. Dặn trong prompt không sửa gốc vấn đề. Base64 còn khó đọc hơn, không ngăn sai lệch.",
     "ts": [
      "2.1"
     ]
    },
    {
     "q": "A search_tickets tool returns every matching ticket with full history, sometimes tens of thousands of tokens, crowding the agent's context. Which TWO changes are MOST appropriate? (Choose TWO.)",
     "options": [
      "Raise the client's output limit (for example MAX_MCP_OUTPUT_TOKENS) so every ticket always fits.",
      "Add pagination and filters with sensible defaults, and say in truncated results how to fetch more.",
      "Return the upstream API's raw JSON unchanged, so that the agent can decide which fields matter.",
      "Add a response_format parameter so the agent can choose concise results and request detail only when needed.",
      "Split the tool into many narrower tools, one per ticket field, and register all of them on the agent."
     ],
     "answer": [
      1,
      3
     ],
     "explain": "Đúng: \"Writing effective tools for agents\" khuyên kết hợp pagination, range, filter và/hoặc truncation với giá trị mặc định hợp lý cho tool có thể trả nhiều token, kèm hướng dẫn hữu ích khi cắt; và dùng tham số response_format (concise/detailed) để agent chọn mức chi tiết. Sai: tăng giới hạn output chỉ cho phép nhồi thêm vào context. Trả JSON thô ngược lại khuyến nghị trả thông tin tín hiệu cao. Tách thành hàng loạt tool nhỏ làm tăng số tool, tăng nhầm lẫn và số lần gọi.",
     "ts": [
      "2.1",
      "5.1"
     ]
    },
    {
     "q": "When an inventory tool hits a rate limit, it returns a tool_result with is_error: true and the content \"failed\". Claude either gives up immediately or retries in a tight loop. What is the BEST change to the tool?",
     "options": [
      "Return is_error: false with an empty result, so that Claude treats the call as successful and keeps working.",
      "Throw an exception in the client code so the whole agent loop stops and the user restarts the request.",
      "Remove is_error and put the HTTP status code alone in the content, since status codes are a standard convention.",
      "Make the error say what went wrong and what to do next, e.g. \"Rate limit exceeded. Retry after 60 seconds.\""
     ],
     "answer": 3,
     "explain": "Đúng: trang Handle tool calls có mẹo \"Write instructive error messages\": thay vì \"failed\", ghi rõ chuyện gì xảy ra và Claude nên thử gì tiếp, lấy đúng ví dụ \"Rate limit exceeded. Retry after 60 seconds.\" để Claude phục hồi mà không phải đoán. Sai: trả rỗng như thành công che lỗi, Claude sẽ hiểu sai là không có hàng. Ném exception dừng cả loop là bỏ cơ hội phục hồi. Chỉ trả mã HTTP vẫn mơ hồ và bỏ cờ is_error mà docs dùng để báo lỗi thực thi.",
     "ts": [
      "2.2"
     ]
    },
    {
     "q": "A team builds an MCP server whose create_booking tool requires a date in YYYY-MM-DD format. When the model sends \"next Friday\", the server currently answers with a JSON-RPC protocol error, and the model rarely recovers. What does the current MCP specification (2026-07-28) recommend instead?",
     "options": [
      "Return a tool result with isError: true explaining the expected date format, so the model can fix its input.",
      "Keep the JSON-RPC error but add a longer message, because input problems must always be reported as protocol errors.",
      "Silently convert any unparseable date to today's date so the booking still succeeds without an error.",
      "Close the connection so the client reconnects and re-sends the request with the correct format."
     ],
     "answer": 0,
     "explain": "Đúng: spec MCP (Tools, Error Handling) chia hai loại: protocol error (JSON-RPC) cho tool không tồn tại, request sai cấu trúc, lỗi server; còn tool execution error với isError: true cho lỗi API, lỗi kiểm tra input (ví dụ ngày sai định dạng) và lỗi nghiệp vụ, vì chúng chứa phản hồi mô hình dùng được để tự sửa và thử lại. Client NÊN chuyển tool execution error cho mô hình. (Bản spec cũ 2025-06-18 còn xếp \"invalid arguments\" vào protocol error; thay đổi này có từ bản 2025-11-25.) Sai: spec xếp lỗi validate input vào tool execution error. Tự đổi sang ngày hôm nay là đặt sai lịch. Đóng kết nối không cho mô hình biết phải sửa gì.",
     "ts": [
      "2.2"
     ]
    },
    {
     "q": "A client application auto-approves any tool whose MCP annotations include readOnlyHint: true. It connects to a third-party MCP server the team has not reviewed. What is the problem with this design?",
     "options": [
      "readOnlyHint is only meaningful when destructiveHint is also set to true, so the check is incomplete.",
      "Annotations are only hints; clients must treat them as untrusted unless the server itself is trusted.",
      "Annotations are verified cryptographically by the protocol, so the only risk is that the hint is out of date.",
      "readOnlyHint applies to resources rather than tools, so it has no effect on whether a tool modifies data."
     ],
     "answer": 1,
     "explain": "Đúng: spec MCP ghi client PHẢI coi annotations của tool là không đáng tin trừ khi đến từ server tin cậy; schema ToolAnnotations nói mọi thuộc tính chỉ là gợi ý, không đảm bảo mô tả trung thực hành vi, và client không nên quyết định dùng tool dựa trên annotations từ server không tin cậy. Sai: destructiveHint chỉ có nghĩa khi readOnlyHint = false (ngược với phương án). Không có cơ chế xác minh mật mã nào cho annotations. readOnlyHint là thuộc tính của ToolAnnotations, tức là của tool.",
     "ts": [
      "2.4"
     ]
    },
    {
     "q": "A pipeline receives mixed documents and has three extraction tools: extract_invoice, extract_receipt, and extract_contract. Every request must end in exactly one of these calls, but the model should pick which one. The model in use supports forced tool use. Which tool_choice setting fits?",
     "options": [
      "{\"type\": \"tool\", \"name\": \"extract_invoice\"}, then re-run with the other names if the result looks wrong.",
      "{\"type\": \"auto\"} with no further instructions, because auto never answers in plain text when tools exist.",
      "{\"type\": \"any\"}, which requires a tool call but leaves the choice of tool to Claude.",
      "{\"type\": \"none\"}, then parse whichever extraction the model describes in its text reply."
     ],
     "answer": 2,
     "explain": "Đúng: docs Define tools: \"any\" bắt Claude phải dùng một trong các tool được cung cấp nhưng không ép tool cụ thể; \"tool\" ép đúng một tool; \"auto\" (mặc định khi có tools) để Claude tự quyết có gọi tool hay không; \"none\" cấm dùng tool. Lưu ý: docs hiện ghi một số model mới (ví dụ Claude Opus 5.5, Sonnet 5.5) trả lỗi 400 với \"any\"/\"tool\" và khuyên dùng auto kèm strict tool use hoặc structured outputs (tháng 11/2026), vì vậy đề bài nói rõ model hỗ trợ forced tool use. Sai: ép extract_invoice rồi thử lại là đoán mò, tốn gấp ba. auto có thể trả lời bằng text. none cấm gọi tool.",
     "sc": "s6",
     "ts": [
      "2.3",
      "4.3"
     ]
    },
    {
     "q": "A team forces a specific tool with tool_choice {\"type\": \"tool\", \"name\": \"classify_ticket\"}. They also want Claude to write a short natural-language explanation before the call, but no explanation ever appears even when the prompt asks for one. What should they do?",
     "options": [
      "Raise max_tokens, because forced tool calls cut the response off before any explanation text can be produced.",
      "Add a second forced tool named explain_reasoning and list it before classify_ticket in the tools array.",
      "Set temperature to 1.0 so the model is more likely to add free-form text before the forced tool call.",
      "Use tool_choice auto and instruct Claude in the user message to explain briefly and then call classify_ticket."
     ],
     "answer": 3,
     "explain": "Đúng: docs Define tools ghi khi tool_choice là any hoặc tool, API prefill assistant message để ép gọi tool, nên mô hình không sinh lời giải thích trước tool_use dù được yêu cầu; muốn có giải thích thì dùng auto (mặc định) và thêm chỉ dẫn rõ trong user message. Sai: max_tokens không phải nguyên nhân. Chỉ ép được một tool tên cụ thể; thứ tự trong mảng tools không ép thứ tự gọi. Temperature không thay đổi cơ chế prefill.",
     "ts": [
      "2.3"
     ]
    },
    {
     "q": "Which TWO statements about the tool_choice parameter are correct? (Choose TWO.)",
     "options": [
      "\"auto\" is the default when tools are provided and lets Claude decide whether to call a tool.",
      "\"any\" forces Claude to call one particular tool, chosen by the order of the tools array.",
      "Forced tool use (\"any\" or \"tool\") works together with manual extended thinking (thinking type \"enabled\").",
      "Changing tool_choice between requests has no effect on prompt caching of the message history.",
      "\"none\" prevents Claude from using any tools and is the default when no tools are provided."
     ],
     "answer": [
      0,
      4
     ],
     "explain": "Đúng: docs Define tools liệt kê bốn giá trị: auto (mặc định khi có tools), any, tool, none (ngăn dùng tool; mặc định khi không có tools). Sai: any bắt dùng một tool bất kỳ, không ép tool cụ thể và không theo thứ tự mảng. Docs ghi với manual extended thinking (thinking type \"enabled\"), any và tool không được hỗ trợ và gây lỗi. Docs cũng ghi thay đổi tool_choice làm mất cache các khối message (tool definitions và system prompt vẫn được cache).",
     "ts": [
      "2.3"
     ]
    },
    {
     "q": "An agent has a transfer_funds tool with side effects. When Claude calls it twice in one response, the two transfers race against each other. The team wants Claude to make at most one tool call per response while still being able to reply in plain text. What should they set?",
     "options": [
      "disable_parallel_tool_use: true inside the tool_choice object, with type \"auto\".",
      "A top-level request parameter parallel_tool_calls: false next to max_tokens.",
      "tool_choice {\"type\": \"any\"} with disable_parallel_tool_use: true, so that every response contains a transfer.",
      "strict: true on transfer_funds, since strict mode only ever allows one call of the tool per response."
     ],
     "answer": 0,
     "explain": "Đúng: docs Parallel tool use ghi disable_parallel_tool_use: true đặt BÊN TRONG object tool_choice, không phải tham số top-level; với type auto, Claude gọi tối đa một tool mỗi response và vẫn có thể trả lời bằng text. Sai: không có tham số top-level như vậy trong Messages API. Với any (hoặc tool) cộng disable_parallel_tool_use, Claude phải gọi đúng một tool, tức là bắt buộc gọi tool ở mọi response, trái yêu cầu được trả lời bằng text. strict: true chỉ đảm bảo input khớp schema, không giới hạn số lần gọi.",
     "ts": [
      "2.3"
     ]
    },
    {
     "q": "A create_shipment tool's input schema marks weight_kg and destination_country as required. In production, Claude occasionally calls it with weight_kg missing or given as a string like \"5kg\", which breaks the backend. Which change gives a guarantee rather than an improvement in odds?",
     "options": [
      "Add a sentence to the description saying that weight_kg must always be a number in kilograms and is required.",
      "Set strict: true on the tool definition so that tool inputs are constrained to match the schema.",
      "Return is_error: true for bad inputs and rely on Claude retrying until the input happens to be valid.",
      "Move both required parameters to the start of the input schema so that Claude fills them in first."
     ],
     "answer": 1,
     "explain": "Đúng: trang Handle tool calls có mẹo: muốn loại bỏ hoàn toàn tool call không hợp lệ thì dùng strict tool use với strict: true, đảm bảo input luôn khớp schema, không thiếu tham số, không sai kiểu (strict tool use dùng constrained decoding như structured outputs). Sai: sửa description giúp nhưng chỉ tăng xác suất. Trả lỗi để Claude thử lại là cơ chế phục hồi, không phải đảm bảo (docs ghi Claude thử 2–3 lần rồi xin lỗi). Thứ tự thuộc tính không bắt buộc giá trị phải đúng.",
     "ts": [
      "2.1",
      "4.3"
     ]
    },
    {
     "q": "A search_logs tool has a nested filter object with format-sensitive fields (ISO timestamps, severity enums, and a query mini-language). Claude often builds filters that are valid JSON but semantically wrong. Besides a detailed description, which tool-definition feature is designed for this?",
     "options": [
      "cache_control on the tool definition, so that the model keeps a correct filter format cached between requests.",
      "defer_loading on the tool, so that Claude only sees the schema after it has decided which filter to use.",
      "input_examples: a few schema-valid example inputs showing correct filters.",
      "A longer tool name, such as search_logs_with_iso_timestamps_and_severity_enum, that encodes the format."
     ],
     "answer": 2,
     "explain": "Đúng: docs Define tools: ưu tiên mô tả, nhưng với tool có input phức tạp, object lồng nhau hoặc tham số nhạy định dạng, có thể dùng trường input_examples (mảng ví dụ input, mỗi cái phải hợp lệ theo input_schema). Sai: cache_control là prompt caching để giảm chi phí, không dạy định dạng. defer_loading thuộc tool search, để hoãn nạp định nghĩa tool, không cải thiện cách điền input. Nhồi định dạng vào tên tool không thay được ví dụ và còn vướng giới hạn tên (regex ^[a-zA-Z0-9_-]{1,128}$).",
     "ts": [
      "2.1"
     ]
    },
    {
     "q": "A developer added a \"postgres\" MCP server at local scope pointing at her personal database. The repository's committed .mcp.json also defines a server named \"postgres\" pointing at the shared staging database. Which definition does Claude Code use in her sessions in that repository?",
     "options": [
      "The .mcp.json entry, because project scope is committed and shared, so it always overrides personal entries.",
      "Both servers, merged field by field, with any conflicting fields taken from the .mcp.json entry.",
      "Neither one: Claude Code refuses to start a server whose name is defined at more than one scope.",
      "Her local-scope entry, used in full, because local scope takes precedence over project scope."
     ],
     "answer": 3,
     "explain": "Đúng: docs MCP (Scope hierarchy and precedence): cùng tên ở nhiều nơi thì Claude Code kết nối một lần theo nguồn ưu tiên cao nhất, thứ tự Local → Project → User → plugin → claude.ai connectors; dùng nguyên entry của nguồn đó, không gộp trường. Sai: project không thắng local. Không có gộp từng trường (docs nói rõ fields are not merged). Không có hành vi từ chối khởi động khi trùng tên.",
     "ts": [
      "2.4"
     ]
    },
    {
     "q": "A team shares an HTTP MCP server in .mcp.json. Most developers use the production endpoint, but some must point at a staging URL, and nobody should commit credentials. Which configuration supports this?",
     "options": [
      "\"url\": \"${MCP_API_URL:-https://api.example.com}/mcp\" with an Authorization header of \"Bearer ${MCP_API_TOKEN}\".",
      "Commit one .mcp.json per environment (.mcp.staging.json, .mcp.prod.json) with the shared token included in each.",
      "Hard-code the production URL and token in .mcp.json, and ask staging users to edit the file without committing.",
      "Store the URL and token in CLAUDE.md so that Claude reads them and passes them to the server at runtime."
     ],
     "answer": 0,
     "explain": "Đúng: docs MCP (Environment variable expansion in .mcp.json) hỗ trợ ${VAR} và ${VAR:-default} trong command, args, env, url, headers; ví dụ chính thức dùng url với giá trị mặc định và header Authorization lấy từ biến môi trường, nên mỗi người đặt biến riêng mà không commit bí mật. Sai: commit token vào bất kỳ file nào là lộ thông tin xác thực; Claude Code cũng không tự đọc file .mcp.staging.json. Sửa file cục bộ không commit thì dễ lỡ tay commit token. CLAUDE.md là chỉ dẫn cho mô hình, không phải cấu hình kết nối MCP, và đưa token vào context là rủi ro.",
     "ts": [
      "2.4"
     ]
    },
    {
     "q": "A refund tool can fail in several ways: the payments API times out, the customer lacks permission, the amount exceeds policy, or the order ID is malformed. Which TWO properties make these errors MOST useful to the agent? (Choose TWO.)",
     "options": [
      "A full server stack trace, so the agent can diagnose the exact line of code that failed.",
      "One generic \"operation failed\" message for every case, so the agent doesn't over-fit to error details.",
      "An error category (transient, validation, permission, business rule) plus whether a retry can help.",
      "A plain-language explanation the agent can act on or relay, e.g. that the amount exceeds the refund policy.",
      "A successful empty response for policy violations, so customers never see an error message."
     ],
     "answer": [
      2,
      3
     ],
     "explain": "Đúng (khớp spec MCP và docs Handle tool calls): lỗi thực thi nên mang phản hồi hành động được, để mô hình biết nên thử lại (lỗi tạm thời), sửa input (lỗi validate), giải thích cho khách (vi phạm chính sách, không nên thử lại) hay escalate (thiếu quyền). Phân loại kèm cờ có-thể-thử-lại cộng giải thích rõ ràng cho phép đúng hành vi đó. Sai: stack trace là chi tiết kỹ thuật vô dụng với agent; bài \"Writing effective tools for agents\" khuyên tránh mã lỗi mờ và traceback. Thông báo chung chung khiến agent không biết làm gì. Trả rỗng như thành công che lỗi và làm agent trả lời sai.",
     "sc": "s1",
     "ts": [
      "2.2"
     ]
    },
    {
     "q": "Claude Code needs to change one constant in a 1,800-line configuration module that another developer is also editing. Which built-in tool behavior makes Edit the better choice than Write here?",
     "options": [
      "Edit locks the file for other editors until the session ends, while Write leaves the file unlocked.",
      "Edit replaces one exact, unique string, while Write overwrites the whole file with the content Claude provides.",
      "Edit applies regular-expression replacements across the file, so it can update every similar constant at once.",
      "Write is limited to new files only and fails whenever the target file already exists on disk."
     ],
     "answer": 1,
     "explain": "Đúng: Tools reference: Edit thay chuỗi chính xác (old_string → new_string, không regex, old_string phải duy nhất trừ khi replace_all); Write tạo file mới hoặc ghi đè toàn bộ nội dung, không append hay merge; docs ghi với thay đổi một phần file thì Claude dùng Edit. Ghi đè cả file có thể xóa thay đổi khác. Sai: Edit không khóa file. Edit không dùng regex. Write ghi đè được file có sẵn (với điều kiện đọc trước tùy model), không chỉ tạo file mới.",
     "sc": "s4",
     "ts": [
      "2.5"
     ]
    },
    {
     "q": "In an Agent SDK app where both the Glob and Grep tools are enabled, the agent must find every place in the repository that calls the function legacyFormatDate. Which tool fits this step BEST?",
     "options": [
      "Glob with the pattern **/legacyFormatDate*, which lists files whose names start with the function name.",
      "Read on every file in the repository one by one, checking each file's contents for the function name.",
      "Grep, which searches file contents for a pattern.",
      "Write, which creates a temporary index file of all function calls that later searches can then reuse."
     ],
     "answer": 2,
     "explain": "Đúng: Tools reference: Glob tìm file theo mẫu tên, Grep tìm dòng bên trong file (dựa trên ripgrep, hỗ trợ lọc theo glob/type). Tìm nơi gọi hàm là tìm nội dung, nên dùng Grep. (Lưu ý: docs hiện ghi trên macOS/Linux/WSL, Claude Code mặc định bỏ Glob/Grep khỏi bộ tool và tìm bằng find/grep qua Bash, trừ khi bạn bật lại, tháng 11/2026; vì vậy đề bài nói rõ cả hai tool đã được bật.) Sai: Glob chỉ khớp tên file, bỏ sót mọi file gọi hàm mà tên không chứa tên hàm. Đọc từng file tốn context khủng khiếp. Write không phải công cụ tìm kiếm.",
     "sc": "s4",
     "ts": [
      "2.5"
     ]
    },
    {
     "q": "A code-review subagent must never modify files. Its definition currently says \"You are read-only; never edit files\" in its prompt and inherits all tools, and it has occasionally applied \"quick fixes.\" What is the BEST fix?",
     "options": [
      "Repeat the read-only instruction at the start and end of the subagent's prompt and mark it as critical.",
      "Run the subagent on a smaller model, since smaller models are less inclined to make unrequested edits.",
      "Ask the parent agent to review every subagent message and undo any edits that the subagent reports making.",
      "Restrict the subagent's tools to read-only ones, e.g. Read, Grep, Glob, so editing tools are not available."
     ],
     "answer": 3,
     "explain": "Đúng: docs Subagents (SDK và Claude Code) cho giới hạn tool bằng trường tools; tool bị bỏ ra không có trong session của subagent, Claude làm việc không có nó. Best practices nêu đúng ví dụ reviewer chỉ có Read, Grep, Glob: giới hạn do Claude Code cưỡng chế chứ không phải lời dặn. Sai: nhắc lại trong prompt vẫn là gợi ý. Đổi model không đảm bảo gì. Hoàn tác sau khi sửa là chữa cháy và phụ thuộc subagent tự khai báo.",
     "ts": [
      "2.3"
     ]
    },
    {
     "q": "A documentation agent spends many turns calling list_pages and get_page just to discover which documents exist before answering. The MCP server owner wants the agent to see the documentation catalog up front without extra tool calls. Which MCP primitive fits this BEST?",
     "options": [
      "Expose the catalog as a resource that the client can read into context.",
      "Expose the catalog as a prompt, so the model invokes it automatically whenever it needs the list of pages.",
      "Add a third tool, list_all_pages_recursively, so that one call returns the entire documentation hierarchy.",
      "Put the catalog inside the server's tool descriptions so it is sent along with every single tool definition."
     ],
     "answer": 0,
     "explain": "Đúng: trang \"Understanding MCP servers\" mô tả resource là nguồn dữ liệu thụ động, chỉ đọc, cung cấp context như nội dung file, schema, tài liệu; ứng dụng (application-controlled) quyết định đưa vào context, và Claude Code cho tham chiếu resource bằng @. Sai: prompt là mẫu do người dùng gọi (user-controlled), không phải do mô hình tự gọi. Thêm tool vẫn là tool call do mô hình quyết định, đúng thứ đang muốn giảm. Nhồi catalog vào mô tả tool làm phình mọi định nghĩa tool và bị cắt theo giới hạn độ dài mô tả.",
     "ts": [
      "2.4"
     ]
    },
    {
     "q": "A developer connects Claude Code to eight MCP servers exposing over 150 tools and worries that the tool definitions alone will consume a large part of the context window in every session. What does Claude Code do to address this?",
     "options": [
      "Claude Code caps each MCP server at 20 tools and silently drops the rest of the tool list.",
      "Tool search defers MCP tool definitions, loading only names and server instructions until a tool is needed.",
      "Claude Code loads every tool schema at startup but compresses the descriptions into short summaries.",
      "MCP tools are only available inside subagents, so that their definitions never enter the main context."
     ],
     "answer": 1,
     "explain": "Đúng: docs MCP (Scale with MCP tool search): tool search giữ mức dùng context thấp bằng cách hoãn định nghĩa tool đến khi Claude cần; lúc bắt đầu session chỉ nạp tên tool và server instructions, và Claude Code không đặt giới hạn cố định số tool mỗi server (docs hiện ghi, tháng 11/2026; một số nền tảng như Foundry trên Azure không hỗ trợ). Sai: không có giới hạn 20 tool mỗi server. Không có cơ chế tự nén mô tả (chỉ có giới hạn độ dài, phần vượt bị cắt). MCP tool dùng được trong hội thoại chính, không chỉ trong subagent.",
     "ts": [
      "2.4"
     ]
    },
    {
     "q": "An email-triage agent fetches customer emails with a get_email tool. To \"make the content more prominent,\" a developer changes the code to paste each fetched email body into the system prompt instead of returning it in the tool_result. Why is this a bad change?",
     "options": [
      "System prompts are limited to 1,000 tokens, so long emails would be truncated before Claude could read them.",
      "Claude ignores the system prompt once tools are defined, so the email content would never be seen at all.",
      "Emails are untrusted input; keeping them in tool_result blocks, not the system prompt, limits prompt injection.",
      "Moving content into the system prompt disables prompt caching for every request that includes tool definitions."
     ],
     "answer": 2,
     "explain": "Đúng: trang Handle tool calls cảnh báo tool result thường mang nội dung ngoài tầm kiểm soát (web, email đến, file người dùng, API bên thứ ba); kẻ tấn công có thể nhúng chỉ dẫn để điều hướng Claude (indirect prompt injection); docs khuyên giữ nội dung không đáng tin trong tool_result thay vì system prompt hay text block thường. Đưa email vào system prompt là trao cho nó vị trí có thẩm quyền cao nhất. Sai: không có giới hạn 1.000 token cho system prompt. Claude không bỏ qua system prompt khi có tools. Đặt nội dung vào system prompt không tắt prompt caching (chỉ là nội dung thay đổi theo request thì cache prefix kém hiệu quả), và đó không phải lý do chính.",
     "ts": [
      "1.1"
     ]
    },
    {
     "q": "After the team rewrote the descriptions of get_customer and lookup_order to say which identifiers each accepts, the support agent still calls get_customer first even when the customer has already given an order number. The system prompt begins: \"Always start by reviewing the customer's account to personalize the conversation.\" What should the team do next?",
     "options": [
      "Add more sample order numbers and formats to the lookup_order description so that Claude recognizes order numbers more easily in customer messages.",
      "Reword the system prompt so it no longer requires an account review first, e.g. use lookup_order directly when an order number is given.",
      "Rename get_customer to get_customer_account_details_only so that the longer name discourages unnecessary calls to it.",
      "Remove get_customer from the agent's tools, since order records already contain the customer details most requests need."
     ],
     "answer": 1,
     "explain": "B đúng: câu mở đầu system prompt ra lệnh xem tài khoản trước, nên nó lấn át mô tả tool vừa sửa. Khi tool đã được mô tả rõ mà hành vi chưa đổi, cần tìm chỉ dẫn trong system prompt đang kéo lựa chọn tool lệch đi và sửa nó. A sai: mô tả đã rõ; thêm ví dụ không gỡ được mệnh lệnh \"luôn bắt đầu bằng tài khoản\". C sai: đổi tên vẫn thua một chỉ dẫn trực tiếp trong system prompt. D sai: get_customer vẫn cần cho các ca khác (khách chưa có mã đơn, xác minh danh tính); bỏ tool để né một xung đột là sửa sai chỗ.",
     "sc": "s1",
     "ts": [
      "2.1"
     ]
    },
    {
     "q": "The payment gateway behind the support agent's process_refund tool sometimes times out after the refund has actually gone through. The tool returns a generic error, the agent calls it again, and some customers are refunded twice. Which change BEST addresses this?",
     "options": [
      "Tell the agent in the system prompt never to call process_refund more than once per conversation, whatever result it returns.",
      "Use an idempotency key per refund request, and on a timeout return an error saying the outcome is unknown and must be checked before any retry.",
      "Return a successful result on every timeout so the agent does not retry, and reconcile any failed refunds at the end of the day.",
      "Raise the gateway timeout so that timeouts become rare enough that the occasional duplicate refund no longer matters much."
     ],
     "answer": 1,
     "explain": "B đúng: khóa idempotency bảo đảm một yêu cầu hoàn tiền dù gửi lại vẫn chỉ được thực hiện một lần, và thông báo lỗi nói rõ \"không biết kết quả, cần kiểm tra trước khi thử lại\" cho agent biết cách xử lý đúng thay vì một lỗi chung chung. Đây là lời khuyên thiết kế cho tool có tác dụng phụ. A sai: lời dặn không cưỡng chế, và còn chặn cả lần thử lại hợp lệ khi lần đầu thật sự thất bại. C sai: báo thành công giả khiến agent nói với khách là đã hoàn tiền khi có thể chưa. D sai: chỉ giảm tần suất, vấn đề hoàn tiền hai lần vẫn còn.",
     "sc": "s1",
     "ts": [
      "2.2"
     ]
    },
    {
     "q": "The support agent's MCP tools return structured errors with an error category and an isRetryable flag. For which TWO of these failures should isRetryable be false, so that the agent explains or escalates instead of trying again? (Choose TWO.)",
     "options": [
      "lookup_order: the order database did not respond within 10 seconds.",
      "get_customer: the CRM returned HTTP 503 Service Unavailable.",
      "process_refund: the order is outside the 30-day refund window set by policy.",
      "lookup_order: the API rate limit was exceeded; retry after 30 seconds.",
      "process_refund: the agent's service account lacks permission to refund gift-card purchases."
     ],
     "answer": [
      2,
      4
     ],
     "explain": "C và E đúng: vi phạm quy tắc nghiệp vụ (quá hạn hoàn tiền) và thiếu quyền là lỗi không tự hết khi thử lại; agent nên giải thích cho khách hoặc escalate. A, B, D sai: timeout, 503 và vượt rate limit là lỗi tạm thời, thử lại (có backoff, hoặc sau thời gian server gợi ý) thường thành công, nên đánh dấu retryable là đúng. Phân loại này giúp agent chọn hành động thay vì thử lại mù quáng hay bỏ cuộc ngay.",
     "sc": "s1",
     "ts": [
      "2.2"
     ]
    },
    {
     "q": "The support agent has an update_order tool that can change any order field, including price, items, and status. It was added so the agent could fix shipping addresses, but the agent has occasionally changed other fields when customers asked it to. What is the BEST redesign?",
     "options": [
      "Keep update_order, but add a paragraph to its description that lists which fields the agent may change and which fields it must never touch.",
      "Remove update_order and escalate every address change to a human, so that order data is never modified automatically by the agent.",
      "Keep update_order and add a confidence parameter, applying a change only when the agent reports a confidence above 0.9.",
      "Replace it with a narrow change_shipping_address tool that takes an order ID and new address and rejects orders that have shipped."
     ],
     "answer": 3,
     "explain": "D đúng: một tool phạm vi hẹp chỉ làm được đúng việc agent cần, và quy tắc (chưa giao hàng mới được đổi) nằm trong code của tool. Agent không thể sửa giá hay trạng thái vì không có tool nào cho phép. A sai: mô tả chỉ hướng dẫn; tool vẫn cho phép sửa mọi trường, nên khách nài nỉ vẫn có thể dẫn tới sửa sai. B sai: quá tay, biến một việc thường ngày, an toàn khi được giới hạn, thành việc tốn người. C sai: confidence do model tự báo không được hiệu chuẩn và không giới hạn được trường nào bị sửa.",
     "sc": "s1",
     "ts": [
      "2.3"
     ]
    },
    {
     "q": "The support team wants the first model response in every conversation to be a get_customer call that verifies the caller, using the email address captured by the chat widget. After that, Claude should choose freely among its tools or reply in text. The model in use supports forced tool use, and extended thinking is off. Which tool_choice setup fits BEST?",
     "options": [
      "{\"type\": \"tool\", \"name\": \"get_customer\"} on the first request, then {\"type\": \"auto\"} on later requests.",
      "{\"type\": \"any\"} on every request, so that each response is guaranteed to contain some tool call.",
      "{\"type\": \"tool\", \"name\": \"get_customer\"} on every request, so that identity is re-verified throughout the conversation.",
      "{\"type\": \"none\"} on the first request, so that Claude greets the customer before it calls any of its tools."
     ],
     "answer": 0,
     "explain": "A đúng: ép đúng tool get_customer ở request đầu bảo đảm bước xác minh chạy trước, rồi trả về auto để Claude tự quyết dùng tool nào hay trả lời bằng text. (Đề nêu rõ model hỗ trợ ép tool và thinking tắt; docs ghi với thinking thủ công hoặc trên một số model mới nhất, any/tool bị từ chối.) B sai: any bắt buộc gọi tool ở mọi lượt nên Claude không bao giờ trả lời khách bằng text, và lượt đầu vẫn có thể gọi tool khác. C sai: ép get_customer mọi lượt khiến agent không bao giờ dùng được tool khác. D sai: none cấm gọi tool ở lượt đầu, ngược với yêu cầu.",
     "sc": "s1",
     "ts": [
      "2.3"
     ]
    },
    {
     "q": "The support agent runs on a server with the Claude Agent SDK and connects to an MCP server named \"crm\". In production, Claude can see the CRM tools but is not permitted to call them, since nobody is present to answer permission prompts. The team wants only the read-only lookups, get_customer and lookup_order, to run without approval. What is the BEST configuration?",
     "options": [
      "Set permissionMode to \"bypassPermissions\" so that every tool call from the CRM server is approved automatically.",
      "Set permissionMode to \"acceptEdits\", which auto-approves MCP tool calls together with file edits.",
      "Add \"mcp__crm__get_customer\" and \"mcp__crm__lookup_order\" to allowedTools.",
      "Rename the tools on the MCP server to drop the mcp__ prefix, which is what triggers the permission checks."
     ],
     "answer": 2,
     "explain": "C đúng: docs Agent SDK ghi MCP tool cần quyền rõ ràng (không có thì Claude thấy tool nhưng không gọi được) và khuyên dùng allowedTools với tên đầy đủ mcp__<server>__<tool> để duyệt đúng những tool cần. A sai: docs ghi bypassPermissions duyệt cả MCP tool nhưng tắt gần hết các lời hỏi an toàn khác, rộng hơn mức cần, và sẽ duyệt luôn process_refund. B sai: docs ghi acceptEdits không tự duyệt MCP tool (chỉ sửa file và lệnh Bash thao tác file). D sai: tiền tố mcp__ do phía client đặt khi đặt tên tool, server không điều khiển được, và tên tool không phải thứ quyết định có cần duyệt hay không.",
     "sc": "s1",
     "ts": [
      "2.4"
     ]
    },
    {
     "q": "An analysis subagent in a multi-agent research system works over a local corpus of about 900 downloaded reports in Markdown, using the Read, Grep, and Glob tools. To find every passage that mentions \"capacity factor\", it currently reads each file in turn, and its context fills up before it finishes. What is the BEST approach?",
     "options": [
      "Use Glob with the pattern **/*capacity*factor*.md, then Read every file it returns from beginning to end.",
      "Use Grep to find the files and lines that mention the phrase, then Read only the relevant sections of those files.",
      "Read the files in larger batches per turn, so that fewer turns are needed to get through the entire corpus.",
      "Ask the coordinator to paste the full corpus into the subagent's prompt, so that no tool calls are needed at all during the analysis."
     ],
     "answer": 1,
     "explain": "B đúng: Grep tìm theo nội dung bên trong file, trả về file và dòng khớp; sau đó chỉ Read những đoạn liên quan. Đây là cách khám phá tăng dần (khoanh vùng trước, đọc có chọn lọc sau) giúp context không bị đầy. A sai: Glob khớp theo tên file, không theo nội dung; báo cáo nhắc tới \"capacity factor\" hiếm khi có cụm đó trong tên file. C sai: đọc theo lô lớn hơn vẫn đưa toàn bộ 900 file vào context, chỉ đầy nhanh hơn. D sai: dán cả kho vào prompt còn vượt context sớm hơn.",
     "sc": "s3",
     "ts": [
      "2.5"
     ]
    },
    {
     "q": "A data subagent in a research system, whose tools list includes Read, Grep, and Glob, must list every survey dataset in a shared workspace. The files follow the naming pattern <region>_survey_<year>.csv across many nested folders. It currently runs Grep for the word \"survey\" across all files and gets back thousands of matching lines from file contents. Which tool use fits this step BEST?",
     "options": [
      "Grep with a stricter regular expression, so that fewer lines inside the files match the search word.",
      "Read on the workspace's top-level folder, so that it returns the names of every file the folder contains.",
      "Write a temporary index file of all CSV paths first, then run Grep on that index to find the survey files.",
      "Glob with a pattern such as **/*_survey_*.csv, which matches file paths by name."
     ],
     "answer": 3,
     "explain": "D đúng: việc cần làm là tìm file theo mẫu tên, đúng chức năng của Glob; mẫu ** đi qua các thư mục lồng nhau. A sai: Grep tìm trong nội dung, nên dù regex chặt hơn vẫn trả về dòng trong file chứ không phải danh sách file theo tên. B sai: docs Tools reference ghi Read chỉ đọc file, không đọc thư mục; liệt kê thư mục là việc của lệnh shell như ls, còn tìm đệ quy theo mẫu tên là việc của Glob. C sai: Write chỉ ghi nội dung mà Claude đưa vào; để viết được danh sách đường dẫn thì trước đó vẫn phải tìm ra chúng, nên đây là một bước vòng vô ích.",
     "sc": "s3",
     "ts": [
      "2.5"
     ]
    },
    {
     "q": "A search subagent in a multi-agent research system has two tools, web_search and kb_search. kb_search is described as \"Searches the company's internal analyst-report archive by keyword.\" The archive is not on the public web and holds only reports published from 2021 onward. Asked for the company's 2018 market forecast, the subagent runs kb_search, gets zero results, and reports that the company never published a 2018 forecast. What should the team change FIRST?",
     "options": [
      "Make kb_search return isError: true whenever a search finds no documents, so that the subagent never treats zero results as a finding.",
      "Have the coordinator rerun every zero-result kb_search query three more times with reworded keywords before accepting the result.",
      "State in the kb_search description that the archive covers only 2021 onward, so older material cannot be found there.",
      "Set tool_choice to force web_search on every request that mentions a year before 2021, so that older questions go to a broader source."
     ],
     "answer": 2,
     "explain": "C đúng: docs Define tools ghi mô tả chi tiết là yếu tố quan trọng nhất cho hiệu quả tool, và mô tả nên nêu cả những lưu ý, giới hạn quan trọng (ví dụ thông tin mà tool không trả về). Mô tả hiện tại không cho Claude biết kho chỉ có báo cáo từ 2021, nên Claude hiểu \"0 kết quả\" là \"không tồn tại\". Biết phạm vi rồi, subagent có thể báo đúng là câu hỏi nằm ngoài phạm vi kho thay vì kết luận sai. A sai: với truy vấn trong phạm vi, 0 kết quả là một kết quả hợp lệ; biến nó thành lỗi làm mất sự phân biệt giữa \"không tìm thấy\" và \"không truy cập được\". B sai: đổi từ khóa không giúp được khi tài liệu nằm ngoài phạm vi kho, chỉ tốn thêm lượt gọi. D sai: báo cáo nội bộ không có trên web công khai, và một luật cứng theo năm không sửa được việc Claude hiểu sai ý nghĩa của kết quả rỗng.",
     "sc": "s3",
     "ts": [
      "2.1"
     ]
    },
    {
     "q": "In a multi-agent research system, the coordinator was given the same web_search and fetch_page tools as its subagents \"just in case.\" It now often runs long searches itself instead of delegating, its context fills with raw pages, and it loses track of the overall research plan. What is the BEST change?",
     "options": [
      "Keep the tools, but add a sentence to the coordinator's prompt asking it to prefer delegating searches to its subagents.",
      "Give the coordinator a model with a larger context window, so that the raw pages fit alongside its research plan.",
      "Set tool_choice to any for the coordinator, so that it always calls a tool instead of spending turns on planning.",
      "Remove search and fetch from the coordinator so that it plans, delegates through the Agent tool, and synthesizes."
     ],
     "answer": 3,
     "explain": "D đúng: mỗi agent chỉ nên cầm tool cần cho vai trò của nó. Coordinator lo lập kế hoạch, giao việc và tổng hợp; khi không có tool tìm kiếm, nó buộc phải giao việc cho subagent, và trang thô nằm trong context của subagent thay vì của coordinator. A sai: lời dặn chỉ là định hướng; tool vẫn ở đó và thói quen tự tìm vẫn tiếp diễn. B sai: context lớn hơn chỉ trì hoãn vấn đề, coordinator vẫn bị lấp bởi nội dung thô và vẫn lạc kế hoạch. C sai: any ép gọi tool ở mọi lượt, càng đẩy coordinator vào việc gọi tool tìm kiếm.",
     "sc": "s3",
     "ts": [
      "2.3"
     ]
    },
    {
     "q": "In an extraction pipeline, a coordinator sends each scanned invoice to an extraction subagent, which calls an MCP tool, get_document_text, to run OCR. The OCR backend sometimes returns brief HTTP 503 errors that succeed when retried a few seconds later. Today every 503 goes straight back to the coordinator as a failed document; the coordinator re-dispatches the whole invoice to a new subagent that starts over, and its context fills with failure reports. What is the BEST change?",
     "options": [
      "Have get_document_text return an empty string on a 503, so that the subagent can carry on and the coordinator never sees the failure.",
      "Have the coordinator dispatch every failed invoice to several new subagents at once, so that at least one of the attempts gets through.",
      "Retry 503s locally with backoff and a small limit; report only persistent failures upward, with the attempts made.",
      "Mark every OCR error as non-retryable and send the invoice straight to the human review queue, so that no compute is spent on retries."
     ],
     "answer": 2,
     "explain": "C đúng (lời khuyên thiết kế): lỗi tạm thời như 503 nên được xử lý gần nơi xảy ra nhất (trong tool hoặc subagent) bằng thử lại có backoff và giới hạn số lần. Chỉ lỗi không tự khắc phục được mới lan lên coordinator, kèm loại lỗi và những gì đã thử, để coordinator quyết định đổi hướng hay chuyển người. Coordinator không phải làm lại cả việc, và context của nó không bị lấp bởi những lỗi đã tự hết. A sai: giả lỗi thành kết quả rỗng khiến hóa đơn bị trích xuất như một tài liệu trống, đúng loại lỗi im lặng cần tránh. B sai: gửi song song cho nhiều subagent nhân chi phí và dồn thêm tải vào backend đang quá tải, trong khi thử lại cục bộ rẻ hơn nhiều. D sai: 503 thường tự hết sau vài giây; đẩy mọi lỗi tạm thời sang người là lãng phí công sức duyệt.",
     "sc": "s6",
     "ts": [
      "2.2",
      "5.3"
     ]
    },
    {
     "q": "An onboarding assistant built on the Claude Agent SDK explicitly enables the Read, Glob, and Grep tools. For a new hire it must (1) list every Dockerfile in the repository, including variants such as Dockerfile.dev, and (2) find which source files reference the environment variable PAYMENTS_API_URL. Which tool choice fits these two steps BEST?",
     "options": [
      "Grep for both steps, searching file contents for the word Dockerfile first and then for PAYMENTS_API_URL.",
      "Glob with a pattern such as **/Dockerfile* for step 1, and Grep for PAYMENTS_API_URL for step 2.",
      "Read every file in the repository once, then answer both questions from the file contents held in context.",
      "Glob for both steps, using a pattern such as **/*PAYMENTS_API_URL* to find the files needed for step 2."
     ],
     "answer": 1,
     "explain": "Theo tools reference: Glob tìm file theo mẫu tên/đường dẫn, Grep tìm nội dung bên trong file. Bước 1 hỏi về tên file nên dùng Glob; bước 2 hỏi về nội dung nên dùng Grep. Grep chữ \"Dockerfile\" trong nội dung sẽ trả về mọi file nhắc tới từ đó (README, script CI) và bỏ sót Dockerfile không tự nhắc tên mình. Đọc cả repo vào context tốn kém và không cần thiết. Glob theo tên biến môi trường chỉ tìm file có tên chứa chuỗi đó, không tìm được file tham chiếu biến trong nội dung. (Câu hỏi nêu rõ app bật Glob và Grep; trong Claude Code trên macOS/Linux/WSL hai tool này không có trong bộ mặc định.)",
     "sc": "s4",
     "ts": [
      "2.5"
     ]
    },
    {
     "q": "A developer-productivity agent answers questions such as \"Where do we retry failed webhook deliveries?\" in a 4,000-file repository. Logs show it reads files one directory at a time until it happens upon the answer, which is slow and fills its context. Which exploration strategy should its instructions describe?",
     "options": [
      "Read the whole repository at the start of each session, so every later question can be answered from what is already in context.",
      "Ask the user to name the exact file before doing any exploration, and refuse to search through the repository on its own.",
      "List all directories with Bash, pick the directory whose name sounds most relevant, and then read every single file inside it.",
      "Search file contents first for likely terms (retry, webhook, backoff), then read only the matching files and follow imports."
     ],
     "answer": 3,
     "explain": "Cách khám phá tăng dần là tìm nội dung trước (Grep hoặc grep qua Bash) để khoanh vùng, rồi chỉ Read các file khớp và lần theo import/lời gọi từ đó; vừa nhanh vừa giữ context gọn. Đọc cả repo mỗi phiên là đúng kiểu nạp thừa làm context đầy và chất lượng giảm. Bắt người dùng chỉ đúng file làm mất ý nghĩa của công cụ khám phá codebase. Đoán thư mục theo tên rồi đọc hết bên trong vẫn là đọc mù, dễ sai chỗ và tốn context.",
     "sc": "s4",
     "ts": [
      "2.5",
      "5.4"
     ]
    },
    {
     "q": "In a Claude Code session, an Edit call fails with an error saying old_string was not found, although the line Claude wanted to change is plainly in the file. The file is indented with tabs, and Claude's old_string used four spaces. What is the correct way to proceed?",
     "options": [
      "Retry the same Edit with a regular expression that treats tabs and spaces as equivalent whitespace.",
      "Re-read the relevant lines and copy their exact text, including the tab characters, into old_string.",
      "Switch to Write and regenerate the entire file, because Edit cannot work on files indented with tabs.",
      "Set replace_all to true, which relaxes matching so that near-identical strings are accepted as well."
     ],
     "answer": 1,
     "explain": "Tools reference ghi: Edit thay chuỗi chính xác, không dùng regex hay so khớp mờ; lệch một ký tự khoảng trắng hoặc thụt lề là đủ để không khớp. Cách đúng là đọc lại đoạn cần sửa và chép nguyên văn, kể cả tab. Edit không nhận regex. Edit làm việc bình thường với file thụt bằng tab; viết lại cả file bằng Write chỉ thêm rủi ro làm hỏng phần khác. replace_all chỉ quyết định thay một hay mọi lần xuất hiện của chuỗi khớp chính xác, không nới lỏng việc so khớp.",
     "sc": "s4",
     "ts": [
      "2.5"
     ]
    },
    {
     "q": "A build-diagnostics helper running in Claude Code is asked why last night's build failed. It calls Read on a 2 MB build log and receives an error instead of the file contents. What should it do next?",
     "options": [
      "Ask the user to paste the full log into the chat, because Claude Code has no way to read any file larger than 256 KB.",
      "Use Edit to delete the older half of the log, so that the remaining part of the file fits into one Read call.",
      "Give up on the log and infer the cause of the failure from the list of files changed in the most recent commits.",
      "Search the log for the relevant lines (such as error or FAILED), then Read only that region with offset and limit."
     ],
     "answer": 3,
     "explain": "Docs tools reference ghi: mặc định Read từ chối đọc nguyên một file trên 256 KB và trả lỗi hướng dẫn đọc từng phần bằng offset/limit hoặc tìm nội dung cụ thể bằng Grep. Vì vậy tìm dòng lỗi trước rồi đọc đúng vùng đó là đúng. Nói Claude Code \"không thể\" đọc file lớn là sai: file lớn vẫn đọc được theo trang (và từ v2.1.296 Read còn có allow_large: true để đọc cả file khi thật sự cần, nhưng ở đây chỉ cần vùng lỗi). Sửa xóa nội dung log để vừa một lần đọc là phá dữ liệu chẩn đoán. Bỏ qua log và đoán từ commit là bỏ đi bằng chứng trực tiếp nhất.",
     "sc": "s4",
     "ts": [
      "2.5"
     ]
    },
    {
     "q": "A platform team audits code searches in Claude Code with a PreToolUse hook whose matcher is \"Grep|Glob\". On developers' macOS and Linux machines the hook never fires, even though transcripts show Claude searching the code constantly. Why?",
     "options": [
      "On macOS, Linux, and WSL, Glob and Grep are off by default; Claude searches with find and grep in Bash, so hooks see Bash calls.",
      "PreToolUse hooks never run for read-only tools, so searches can be observed only by a PostToolUse hook configured for the same tool names.",
      "Hook matchers are case-sensitive and expect lowercase tool names, so the matcher has to be written as \"grep|glob\" before it can match.",
      "A matcher accepts only one tool name, so the team needs one hook entry for Grep and a second, separate hook entry for Glob."
     ],
     "answer": 0,
     "explain": "Docs tools reference (mục Glob tool behavior) ghi: trên macOS, Linux và WSL, Claude Code bỏ Glob và Grep khỏi bộ tool mặc định; Claude tìm bằng find và grep qua tool Bash, và các lần tìm đó tới hook và permission rule dưới dạng lời gọi Bash. Muốn bắt thì thêm Bash vào matcher, hoặc bật lại Glob/Grep bằng --tools/--allowedTools. PreToolUse chạy cho mọi tool, không loại trừ tool chỉ đọc. Tên tool là \"Grep\", \"Glob\" (chữ hoa đầu), viết thường sẽ không khớp. Matcher nhận được nhiều tên nối bằng | (như \"Write|Edit\").",
     "sc": "s4",
     "ts": [
      "2.5",
      "1.5"
     ]
    },
    {
     "q": "A release-notes agent built with the Agent SDK connects to a GitHub MCP server named github and runs in the default permission mode. Calls to the server's tools are denied, so the agent falls back to guessing. The team wants those tools to run without approval while leaving every other tool's permissions unchanged. Which TWO configurations achieve this? (Choose TWO.)",
     "options": [
      "allowedTools: [\"mcp__github__*\"]",
      "permissionMode: \"acceptEdits\"",
      "allowedTools: [\"mcp__*\"]",
      "allowedTools listing each needed tool by full name, such as \"mcp__github__list_issues\"",
      "permissionMode: \"bypassPermissions\""
     ],
     "answer": [
      0,
      3
     ],
     "explain": "Docs Agent SDK (MCP và permissions): tên tool MCP có dạng mcp__server__tool; trong allow rule, wildcard chỉ hợp lệ sau tiền tố mcp__<server>__, nên mcp__github__* hoặc liệt kê từng tool đầy đủ tên đều tự duyệt đúng server đó và không đụng tới tool khác. acceptEdits không tự duyệt tool MCP (chỉ sửa file và lệnh filesystem). mcp__* không neo vào server cụ thể nên bị bỏ qua, không duyệt gì. bypassPermissions có duyệt tool MCP nhưng duyệt luôn gần như mọi thứ khác, trái yêu cầu giữ nguyên quyền của tool khác; docs khuyên dùng allowedTools thay vì permission mode cho MCP.",
     "sc": "s4",
     "ts": [
      "2.4"
     ]
    },
    {
     "q": "A team building a developer-productivity agent wants Claude to read and update their Jira tickets. A well-maintained, widely used MCP server for Jira already exists. A teammate proposes writing an in-house MCP server that wraps the Jira REST API instead. What is the BEST recommendation?",
     "options": [
      "Write the in-house server, because a custom server is the only way to give Claude accurate and complete descriptions of the Jira tools.",
      "Skip MCP and let Claude call the Jira REST API with curl through Bash, passing the API token inside the prompt text.",
      "Use the existing server for the standard integration, and build custom tools only for team-specific workflows it does not cover.",
      "Export the tickets to Markdown every night and @-import the export from CLAUDE.md so that Claude always has them loaded."
     ],
     "answer": 2,
     "explain": "Lời khuyên thiết kế (khớp exam guide 2.4 và bài học của site): với tích hợp chuẩn, ưu tiên MCP server có sẵn, đáng tin, được bảo trì; chỉ tự viết tool cho logic riêng của nhóm. Server có sẵn cũng có mô tả tool, tự viết không phải \"cách duy nhất\" để có mô tả tốt, và tốn công bảo trì. Gọi REST bằng curl với token trong prompt làm lộ secret và mất cấu trúc tool. Xuất ticket ra Markdown rồi import vào CLAUDE.md chỉ cho dữ liệu cũ, chỉ đọc, tốn context mọi phiên và không cập nhật được ticket.",
     "sc": "s4",
     "ts": [
      "2.4"
     ]
    },
    {
     "q": "An internal MCP server offers a code_search tool backed by a semantic index of all company repositories. Its description reads only \"Searches code.\" Developers notice that Claude almost always runs grep through Bash instead, missing matches in other repositories. What should the server owner change FIRST?",
     "options": [
      "Remove the Bash tool from every developer's sessions, so that code_search becomes the only way left for Claude to search any code.",
      "Rename the tool to grep, so that Claude treats it as the familiar command and calls it without any hesitation at all.",
      "Add a sentence to every repository's CLAUDE.md telling Claude to prefer MCP tools over built-in tools in every situation it meets.",
      "Rewrite the description: what it covers that grep cannot (all repositories, semantic matches), when to prefer it, what it returns."
     ],
     "answer": 3,
     "explain": "Claude chọn tool dựa chủ yếu vào mô tả; exam guide 2.4 nêu đúng điểm này: mô tả phong phú để tool MCP được chọn thay cho built-in. Mô tả \"Searches code.\" không cho Claude lý do để bỏ grep quen thuộc, nên việc đầu tiên là nói rõ phạm vi (mọi repo, khớp ngữ nghĩa), khi nào nên dùng và trả về gì. Gỡ Bash khỏi mọi phiên là biện pháp thô, làm hỏng nhiều việc khác. Đặt tên trùng \"grep\" gây nhầm với lệnh thật và không nói gì về khả năng riêng. Câu chung chung trong CLAUDE.md ở mọi repo là vá ở nơi khác, quá rộng (\"mọi tình huống\") và vẫn không cho Claude biết tool này làm gì.",
     "sc": "s4",
     "ts": [
      "2.4",
      "2.1"
     ]
    },
    {
     "q": "A developer built a personal MCP server that searches her own notes using her private token. She wants it available in every repository she opens with Claude Code, but never visible to teammates or committed anywhere. Which setup fits?",
     "options": [
      "Add it to each repository's .mcp.json and supply her private token through ${NOTES_TOKEN} expansion.",
      "Add it with claude mcp add --scope user, which stores it in ~/.claude.json for all of her projects.",
      "Add it once with the default local scope, which makes it load in every project on the machine.",
      "Declare it in each project's committed .claude/settings.json so it loads when she starts a session."
     ],
     "answer": 1,
     "explain": "Docs MCP của Claude Code: scope user lưu trong ~/.claude.json, nạp ở mọi project của bạn và không chia sẻ với nhóm, đúng nhu cầu. .mcp.json là scope project, được commit và chia sẻ; dù token qua biến môi trường thì server vẫn hiện ra với cả nhóm. Scope local (mặc định) cũng nằm trong ~/.claude.json nhưng chỉ nạp ở project nơi bạn thêm nó, không phải mọi project. Đặt cấu hình vào .claude/settings.json được commit thì lại chia sẻ với cả nhóm, trái yêu cầu riêng tư.",
     "sc": "s4",
     "ts": [
      "2.4"
     ]
    },
    {
     "q": "Developers' Claude Code sessions connect to a dozen MCP servers with tool search on, which is the default. Claude rarely reaches for the tools of the team's deploy-tools server, even on deployment questions. What does the Claude Code documentation suggest the server's author do?",
     "options": [
      "Split the server into many small servers, so that each server's full tool definitions load into context at session start.",
      "Make every tool description as long as possible, since Claude reads the full description of every connected tool before each turn.",
      "Write server instructions saying which tasks its tools handle and when to search for them; put key terms early in descriptions.",
      "Ask developers to raise MAX_MCP_OUTPUT_TOKENS, so that more tool definitions fit into the context window at startup."
     ],
     "answer": 2,
     "explain": "Docs MCP (mục tool search): khi bật tool search, lúc khởi động chỉ nạp tên tool và server instructions; định nghĩa tool được nạp khi cần. Vì vậy docs khuyên tác giả server viết server instructions rõ: nhóm việc tool xử lý, khi nào nên tìm tới tool, năng lực chính; và đặt từ khóa quan trọng ở đầu mô tả, vì khi khớp truy vấn tool search chỉ đọc phần mô tả nằm trong giới hạn ngắn hơn. Chia nhỏ server không làm định nghĩa nạp sẵn (tool search vẫn hoãn chúng). Mô tả bị cắt theo giới hạn ký tự và Claude không đọc hết mọi mô tả mỗi lượt, nên kéo dài vô tội vạ không giúp. MAX_MCP_OUTPUT_TOKENS giới hạn kích thước output của lời gọi tool, không liên quan định nghĩa tool.",
     "sc": "s4",
     "ts": [
      "2.4",
      "2.1"
     ]
    },
    {
     "q": "A code-explainer tool built on the Agent SDK must never change files. The developer set allowedTools to [\"Read\", \"Grep\", \"Glob\"] and permissionMode to \"acceptEdits\", yet the agent sometimes edits files when a user asks for a quick fix. What is the BEST fix?",
     "options": [
      "Restrict the available tools, e.g. tools: [\"Read\", \"Grep\", \"Glob\"]; allowedTools only pre-approves, and acceptEdits approves edits.",
      "Add \"never edit files\" to the system prompt, since allowedTools already prevents every tool that is not on the list from being called at all.",
      "Switch permissionMode to \"bypassPermissions\", so that only the tools named in allowedTools are permitted to run in the session.",
      "Add Edit to allowedTools with an empty pattern, which tells the SDK that every Edit call must be denied without prompting."
     ],
     "answer": 0,
     "explain": "Docs Agent SDK permissions: allowedTools chỉ tự duyệt các tool được liệt kê, không giới hạn Claude vào các tool đó; tool khác vẫn tồn tại và rơi xuống permission mode. Ở acceptEdits, sửa file trong thư mục làm việc được tự duyệt, nên Edit chạy. Cách đúng là giới hạn chính bộ tool (tùy chọn tools liệt kê tool đọc, hoặc disallowedTools tên trần để gỡ tool ghi). Câu trong system prompt chỉ là hướng dẫn mềm, và tiền đề \"allowedTools chặn tool khác\" là sai. bypassPermissions duyệt cả tool không liệt kê, tức là tệ hơn. Không có cú pháp \"pattern rỗng\" để biến allow thành deny; chặn thì dùng deny rule.",
     "sc": "s4",
     "ts": [
      "2.3"
     ]
    },
    {
     "q": "A documentation assistant built with the Agent SDK has a coordinator and three subagents: an explorer that maps modules, a writer that drafts documentation pages, and a checker that runs the docs build to catch broken links. Every subagent currently inherits all tools, and the explorer has occasionally rewritten source files. Which tool assignment follows best practice?",
     "options": [
      "Explorer: Read, Grep, Glob. Writer: Read, Write, Edit. Checker: Bash, Read. Each role gets only the tools it needs.",
      "All three subagents keep every tool, and each subagent's prompt describes the limits of its role so it stays in its lane.",
      "Only the coordinator holds tools, and the subagents send it a request whenever they need to read or write a file.",
      "Explorer: Read, Write, Bash. Writer: Grep, Glob. Checker: Edit. No single subagent can both read and change files."
     ],
     "answer": 0,
     "explain": "Thực hành tốt (exam guide 2.3, docs SDK subagents): mỗi agent chỉ cầm tool cần cho vai trò, đặt qua trường tools của AgentDefinition; giới hạn này do harness cưỡng chế. Docs SDK còn có bảng gợi ý: phân tích chỉ đọc dùng Read/Grep/Glob, chạy test dùng Bash/Read/Grep, sửa code dùng Read/Edit/Write (kèm Grep/Glob). Để mọi subagent giữ mọi tool rồi dặn trong prompt chính là thiết kế đã để explorer sửa file. Dồn tool về coordinator biến nó thành nút cổ chai và làm mất lợi ích tách context. Phương án chia ngược (explorer có Write, writer không có quyền ghi) không khớp vai trò nào.",
     "sc": "s4",
     "ts": [
      "2.3",
      "1.3"
     ]
    },
    {
     "q": "In an Agent SDK release assistant, a coordinator delegates to a changelog-writer subagent whose tools are Read, Grep, and Glob. On almost every task the writer must check which pull requests were merged, so it hands the question back to the coordinator, which holds the GitHub MCP tools. This adds several round trips per run. Which change BEST follows tool-distribution guidance?",
     "options": [
      "Give the writer every tool from the GitHub server plus Bash, so it never has to go back to the coordinator for anything.",
      "Merge the coordinator and all of its subagents into one agent that holds every tool, removing delegation altogether.",
      "Tell the writer in its prompt to infer merge status from commit messages, so that it never needs any GitHub tools.",
      "Add only the one read-only tool it needs, such as mcp__github__list_pull_requests, to the writer's tools list."
     ],
     "answer": 3,
     "explain": "Lời khuyên thiết kế (exam guide 2.3): mỗi agent cầm bộ tool hẹp theo vai trò, cộng thêm vài tool xuyên vai trò có giới hạn cho nhu cầu lặp lại thường xuyên. Thêm đúng một tool chỉ đọc mà writer cần vào trường tools của AgentDefinition (trường này nhận tên tool, kể cả tool MCP) cắt các vòng hỏi qua coordinator mà vẫn giữ writer hẹp. Cấp cả server GitHub kèm Bash là quá rộng, writer có thêm cả tool ghi lẫn lệnh shell nó không cần. Gộp tất cả vào một agent mất lợi ích tách vai trò và tách context, và quay lại kiểu một agent cầm quá nhiều tool. Đoán trạng thái merge từ commit message là bỏ nguồn dữ liệu đúng để đoán mò.",
     "sc": "s4",
     "ts": [
      "2.3",
      "1.3"
     ]
    },
    {
     "q": "A CI review job runs claude -p with --allowedTools \"Read\" \"Bash(git diff *)\", and the team assumes the reviewer cannot edit files. During one run, Claude still attempted an Edit call. Which flag actually restricts which built-in tools are available in the run?",
     "options": [
      "--strict-mcp-config, which limits the run to exactly the tools that are named in --allowedTools",
      "--tools, for example --tools \"Read,Bash\", because --allowedTools only pre-approves the tools it lists",
      "--permission-mode acceptEdits, which limits Claude to the tools that are approved for editing",
      "--append-system-prompt \"read-only\", which removes all of the write tools from the run"
     ],
     "answer": 1,
     "explain": "Docs CLI reference: --allowedTools là các tool chạy không cần hỏi; muốn giới hạn tool nào có mặt thì dùng --tools (ví dụ \"Bash,Edit,Read\"); --disallowedTools với tên trần cũng gỡ tool. Trong -p ở mode mặc định, lời gọi Edit chưa được duyệt sẽ bị từ chối, nhưng tool vẫn có mặt và Claude vẫn thử gọi. --strict-mcp-config chỉ giới hạn server MCP vào những server trong --mcp-config. acceptEdits làm ngược lại: tự duyệt sửa file. Thêm chữ vào system prompt không gỡ tool nào.",
     "sc": "s5",
     "ts": [
      "2.3",
      "3.6"
     ]
    }
   ],
   "summary": [
    "Claude chỉ thấy name, description và input_schema của tool; mô tả là yếu tố quan trọng nhất, docs khuyên tối thiểu 3–4 câu: làm gì, khi nào dùng/không dùng, tham số, giới hạn.",
    "Agent chọn nhầm tool thì sửa mô tả trước (nói rõ input dạng nào, phân biệt với tool tương tự), trước khi nghĩ tới routing hay fine-tune; thêm tiền tố theo dịch vụ để giảm mơ hồ.",
    "Schema dùng type/enum/required và mô tả từng thuộc tính, thêm input_examples cho input phức tạp; response của tool chỉ trả trường cần thiết với định danh ổn định.",
    "Mỗi agent chỉ cầm tool cần cho vai trò của nó; vai trò khác cần chút năng lực thì cấp một tool phạm vi hẹp thay vì cả bộ tool.",
    "tool_choice: auto (mặc định), any (bắt buộc gọi một tool), tool (ép một tool cụ thể), none. any/tool khiến Claude không viết text trước tool_use; kết hợp strict: true để input đúng schema.",
    "Lỗi thực thi trả về bằng is_error: true (MCP: isError trong result) kèm thông điệp nói rõ nên làm gì; protocol error JSON-RPC dành cho tool không tồn tại, request sai schema, lỗi server.",
    "Phân loại lỗi transient / validation / business_rule / permission kèm cờ retryable; kết quả rỗng hợp lệ khác với thất bại, không bao giờ trả rỗng khi bị timeout; lỗi tạm thời thì retry cục bộ trước.",
    "MCP có ba primitive: Tools (model điều khiển), Resources (ứng dụng điều khiển, chỉ đọc, có URI, tham chiếu bằng @server:protocol://path) và Prompts (người dùng gọi, chạy bằng /mcp__server__prompt).",
    "Scope MCP trong Claude Code: local (mặc định, riêng tư), project (.mcp.json, commit, chia sẻ), user (mọi project, riêng tư). Secret trong .mcp.json dùng ${VAR} hoặc ${VAR:-default}, không commit.",
    "Built-in tool: Glob tìm file theo tên, Grep tìm nội dung, Edit thay chuỗi chính xác và duy nhất (trùng thì thêm ngữ cảnh hoặc dùng replace_all), Write ghi đè cả file. Tích hợp chuẩn thì ưu tiên MCP server có sẵn đáng tin, logic riêng mới tự viết tool."
   ]
  },
  {
   "id": "d3",
   "name": "Claude Code Configuration & Workflows",
   "weight": 20,
   "intro": "<p>Domain này hỏi cách cấu hình Claude Code cho <em>cả team</em> chứ không chỉ một người: CLAUDE.md đặt ở đâu và nạp thế nào, rule theo đường dẫn trong <code>.claude/rules/</code>, skill và slash command, subagent, plan mode, permission, hook trong settings, và chạy Claude Code không tương tác trong CI với output có cấu trúc.</p>\n<p>Ranh giới: thiết kế hook ở mức kiến trúc (vì sao cần cưỡng chế bằng code) đã nằm ở Domain 1. Cấu hình MCP server nằm ở Domain 2. Domain này tập trung vào <em>file nào, đặt ở đâu, ai thấy</em>.</p>",
   "lessons": [
    {
     "id": "l-3-0",
     "title": "Nền tảng: Claude Code là gì, đọc cấu hình từ đâu và nạp lúc nào",
     "minutes": 13,
     "html": "<p>Gần như mọi câu Domain 3 hỏi cùng một chuyện: <strong>đặt cái gì, ở file nào, để ai thấy, và khi nào nó được nạp</strong>. Bài này dựng bản đồ đó: Claude Code là gì, nó lấy thông tin từ đâu, các scope cấu hình, cây thư mục, và thứ gì vào context vào lúc nào.</p>\n<h4>1. Claude Code là một harness quanh model</h4>\n<p>Docs mô tả Claude Code là công cụ lập trình dạng agent: đọc codebase, sửa file, chạy lệnh, tích hợp với công cụ của bạn; chạy trong terminal, IDE, desktop app và trình duyệt. Bên trong là vòng lặp ba pha <strong>thu thập context → hành động → kiểm tra kết quả</strong>, lặp đến khi xong, và bạn có thể ngắt bất cứ lúc nào. Vòng lặp có hai thành phần: model để suy luận và tool để hành động. Docs gọi lớp bao quanh model (cung cấp tool, quản lý context model thấy) là <em>agentic harness</em>. Agent SDK dùng chính vòng lặp này (Domain 1).</p>\n<h4>2. Claude Code thấy được gì</h4>\n<ul>\n<li>File trong thư mục project và thư mục con (file ở nơi khác thì cần bạn cho phép).</li>\n<li>Terminal: mọi lệnh bạn chạy được, kể cả git, build, test.</li>\n<li>Trạng thái git: nhánh hiện tại, thay đổi chưa commit, lịch sử commit gần đây.</li>\n<li>CLAUDE.md (chỉ dẫn lâu dài do bạn viết) và <strong>auto memory</strong> (điều Claude tự ghi lại khi làm việc). Docs hiện ghi phần đầu của <code>MEMORY.md</code>, 200 dòng hoặc 25KB tùy cái nào đến trước, được nạp mỗi phiên.</li>\n<li>Phần mở rộng bạn cấu hình: MCP server, skill, subagent.</li>\n</ul>\n<h4>3. Hai loại chỉ dẫn</h4>\n<table>\n<thead><tr><th></th><th>Không xác định (Claude quyết)</th><th>Xác định (Claude Code cưỡng chế)</th></tr></thead>\n<tbody>\n<tr><td>Làm gì</td><td>Prompt, CLAUDE.md, skill Claude tự chọn</td><td>Hook; skill chỉ người dùng gọi được</td></tr>\n<tr><td>Được chạm vào đâu</td><td>Classifier của auto mode</td><td>Rule deny, sandbox ở strict mode, managed settings</td></tr>\n<tr><td>Khi nào là xong</td><td>Yêu cầu bằng chứng, review</td><td>Test, typecheck, hook <code>Stop</code>, CI</td></tr>\n<tr><td>Tiêu bao nhiêu</td><td>Effort, nhịp làm việc của Claude</td><td><code>--max-turns</code>, <code>--max-budget-usd</code> với <code>-p</code></td></tr>\n</tbody>\n</table>\n<p>Bảng trên tóm từ docs best practices. Docs khuyên để Claude tự quyết trong đa số trường hợp, và chỉ chuyển sang loại xác định cho những thứ <em>luôn</em> phải xảy ra hoặc <em>không bao giờ</em> được xảy ra.</p>\n<h4>4. Bốn scope</h4>\n<table>\n<thead><tr><th>Scope</th><th>Ai bị ảnh hưởng</th><th>Ví dụ file</th></tr></thead>\n<tbody>\n<tr><td>Managed</td><td>Mọi người tổ chức triển khai tới; không ai ghi đè được</td><td><code>managed-settings.json</code>, MDM, server-managed; CLAUDE.md managed</td></tr>\n<tr><td>User</td><td>Chỉ bạn, mọi project trên máy</td><td><code>~/.claude/settings.json</code>, <code>~/.claude/CLAUDE.md</code></td></tr>\n<tr><td>Project (shared)</td><td>Cả team, khi commit vào repo</td><td><code>.claude/settings.json</code>, <code>./CLAUDE.md</code>, <code>.mcp.json</code></td></tr>\n<tr><td>Local</td><td>Chỉ bạn, chỉ project này</td><td><code>.claude/settings.local.json</code>, <code>CLAUDE.local.md</code></td></tr>\n</tbody>\n</table>\n<p>Ngoài ra có <code>~/.claude.json</code> do Claude Code tự ghi: thông tin tài khoản, cấu hình MCP scope local/user, trạng thái theo project như quyết định trust. File này không chia sẻ với ai.</p>\n<h4>5. Cây thư mục cần thuộc</h4>\n<pre>repo/\n├── CLAUDE.md                 # chỉ dẫn chung cho team (hoặc .claude/CLAUDE.md)\n├── CLAUDE.local.md           # chỉ dẫn cá nhân, không commit\n├── .mcp.json                 # MCP server cho cả team\n└── .claude/\n    ├── settings.json         # permission, hook, env cho cả team (commit)\n    ├── settings.local.json   # ghi đè cá nhân (không commit)\n    ├── rules/*.md            # chỉ dẫn theo chủ đề; có paths: thì nạp theo file\n    ├── skills/&lt;tên&gt;/SKILL.md # quy trình gọi bằng /tên hoặc Claude tự nạp\n    ├── commands/&lt;tên&gt;.md     # dạng cũ của slash command, vẫn chạy\n    └── agents/&lt;tên&gt;.md       # subagent của project\n~/.claude/                    # bản cá nhân của settings.json, CLAUDE.md, rules/, skills/, agents/</pre>\n<h4>6. Thứ gì vào context, vào lúc nào</h4>\n<table>\n<thead><tr><th>Thời điểm</th><th>Nạp vào context</th></tr></thead>\n<tbody>\n<tr><td>Trước khi bạn gõ</td><td>CLAUDE.md ở thư mục làm việc và thư mục cha, rule không có <code>paths</code>, auto memory, tên MCP tool, mô tả skill</td></tr>\n<tr><td>Khi Claude làm việc</td><td>Nội dung mỗi file đọc; rule có <code>paths</code> khi chạm file khớp; CLAUDE.md thư mục con khi chạm file trong đó; nội dung đầy đủ của skill khi được dùng</td></tr>\n<tr><td>Khi giao subagent</td><td>Phần đọc file nằm trong context riêng của subagent; chỉ bản tóm tắt quay về</td></tr>\n<tr><td>Khi compact</td><td>Lịch sử thành bản tóm tắt; CLAUDE.md gốc project và rule không có <code>paths</code> được nạp lại từ đĩa (xem l-3-6)</td></tr>\n</tbody>\n</table>\n<p>Lệnh <code>/context</code> cho xem context hiện tại đang bị chiếm bởi những gì; <code>/memory</code> mở các file CLAUDE.md và auto memory đang dùng.</p>\n<h4>7. Tương tác hay không tương tác</h4>\n<p>Gõ <code>claude</code> là phiên tương tác: có hộp thoại xin quyền, có trust dialog cho project lạ. <code>claude -p \"…\"</code> chạy một lần rồi thoát, dùng cho script và CI (l-3-4). Cùng một bộ file cấu hình áp dụng cho cả hai, trừ khi dùng <code>--bare</code>.</p>\n<h4>Bản đồ Domain 3</h4>\n<table>\n<thead><tr><th>Bài</th><th>Phần nào của bản đồ</th></tr></thead>\n<tbody>\n<tr><td>l-3-1 CLAUDE.md, import, .claude/rules</td><td>Chỉ dẫn lâu dài: vị trí, thứ tự nạp, rule theo đường dẫn</td></tr>\n<tr><td>l-3-2 Skill, slash command, subagent</td><td><code>.claude/skills</code>, <code>.claude/commands</code>, <code>.claude/agents</code></td></tr>\n<tr><td>l-3-3 Plan mode, permission, settings</td><td>Chế độ làm việc, rule allow/ask/deny, thứ tự ưu tiên settings</td></tr>\n<tr><td>l-3-4 Claude Code trong CI</td><td><code>-p</code>, output JSON, <code>--json-schema</code>, <code>--bare</code></td></tr>\n<tr><td>l-3-5 Tinh chỉnh dần</td><td>Cách đưa yêu cầu: prompt cụ thể, ví dụ, phép kiểm, phỏng vấn</td></tr>\n<tr><td>l-3-6 Quản lý phiên và context</td><td><code>/clear</code>, <code>/compact</code>, <code>/rewind</code>, <code>/branch</code>, resume</td></tr>\n</tbody>\n</table>\n<div class=\"tip\">Câu hỏi “vì sao Claude của người A làm đúng mà của người B thì không” gần như luôn là chuyện scope: cấu hình nằm ở file user/local của A thay vì file project được commit.</div>",
     "keypoints": [
      "Claude Code là harness quanh model: vòng lặp thu thập context → hành động → kiểm tra, cùng vòng lặp với Agent SDK.",
      "Bốn scope: managed (tổ chức), user (~/.claude), project (.claude/ commit), local (settings.local.json, CLAUDE.local.md).",
      "Prompt/CLAUDE.md/skill là không xác định; hook, rule deny, managed settings là xác định.",
      "Lúc khởi động nạp CLAUDE.md, rule không paths, auto memory, tên MCP tool, mô tả skill; phần còn lại nạp theo nhu cầu.",
      "~/.claude.json do Claude Code tự ghi (MCP local/user, trust), không chia sẻ."
     ],
     "sources": [
      {
       "t": "Claude Code overview",
       "u": "https://code.claude.com/docs/en/overview"
      },
      {
       "t": "How Claude Code works",
       "u": "https://code.claude.com/docs/en/how-claude-code-works"
      },
      {
       "t": "Best practices for Claude Code",
       "u": "https://code.claude.com/docs/en/best-practices"
      },
      {
       "t": "Settings files and precedence",
       "u": "https://code.claude.com/docs/en/settings"
      },
      {
       "t": "Explore the context window",
       "u": "https://code.claude.com/docs/en/context-window"
      }
     ],
     "ts": [
      "3.1",
      "3.2",
      "3.3"
     ]
    },
    {
     "id": "l-3-1",
     "title": "Hệ thống CLAUDE.md, import và .claude/rules",
     "minutes": 13,
     "html": "<p>Mỗi phiên Claude Code bắt đầu với context trống. CLAUDE.md là file markdown chứa chỉ dẫn lâu dài (lệnh build/test, quy ước code, quyết định kiến trúc), được nạp vào đầu mỗi phiên. Câu hỏi thi hay xoay quanh: <strong>đặt file ở đâu thì ai thấy</strong>.</p>\n<h4>Các vị trí và phạm vi</h4>\n<table>\n<thead><tr><th>Loại</th><th>Vị trí</th><th>Ai thấy</th></tr></thead>\n<tbody>\n<tr><td>Managed policy</td><td>macOS: <code>/Library/Application Support/ClaudeCode/CLAUDE.md</code>; Linux/WSL: <code>/etc/claude-code/CLAUDE.md</code>; Windows: <code>C:\\Program Files\\ClaudeCode\\CLAUDE.md</code></td><td>Mọi người dùng trên máy (do IT triển khai)</td></tr>\n<tr><td>User</td><td><code>~/.claude/CLAUDE.md</code></td><td>Chỉ bạn, mọi project</td></tr>\n<tr><td>Project</td><td><code>./CLAUDE.md</code> hoặc <code>./.claude/CLAUDE.md</code></td><td>Cả team, qua version control</td></tr>\n<tr><td>Local</td><td><code>./CLAUDE.local.md</code> (thêm vào <code>.gitignore</code>)</td><td>Chỉ bạn, project này</td></tr>\n</tbody>\n</table>\n<div class=\"warn\">Tình huống kinh điển: một senior viết quy ước test vào <code>~/.claude/CLAUDE.md</code>, nên Claude của senior làm đúng còn Claude của người mới thì không. Lý do: file user không được chia sẻ. Hãy chuyển quy ước vào CLAUDE.md của project (hoặc <code>.claude/rules/</code>) và commit.</div>\n<h4>Cách nạp</h4>\n<ul>\n<li>Claude Code nạp <code>CLAUDE.md</code> và <code>CLAUDE.local.md</code> ở thư mục làm việc <strong>và mọi thư mục cha</strong> ngay lúc khởi động. Các file được <strong>nối lại</strong> chứ không ghi đè nhau, theo thứ tự từ gốc hệ thống file xuống thư mục hiện tại, nên chỉ dẫn gần chỗ bạn khởi động được đọc sau cùng. Trong cùng một thư mục, <code>CLAUDE.local.md</code> đứng sau <code>CLAUDE.md</code>.</li>\n<li>CLAUDE.md trong <strong>thư mục con</strong> không nạp lúc khởi động. Nó được nạp khi Claude đọc, ghi hoặc sửa một file trong thư mục con đó.</li>\n<li>Hai chỉ dẫn mâu thuẫn nhau thì Claude có thể chọn tùy ý một cái. Nên rà soát định kỳ.</li>\n<li>Docs khuyên giữ mỗi file <strong>dưới 200 dòng</strong>. File dài tốn context và giảm mức tuân thủ.</li>\n</ul>\n<h4>Import bằng <code>@path</code></h4>\n<pre># CLAUDE.md\nXem tổng quan ở @README.md và các lệnh npm ở @package.json.\nQuy trình git: @docs/git-workflow.md</pre>\n<ul>\n<li>Đường dẫn tương đối được tính từ <strong>file chứa lệnh import</strong>, không phải từ thư mục làm việc. Import lồng nhau được tối đa <strong>bốn tầng</strong>.</li>\n<li>Viết trong code span (dấu backtick) thì không bị import.</li>\n<li>Import giúp sắp xếp gọn nhưng <strong>không giảm chi phí context</strong>, vì file được import nạp cùng lúc với file chính.</li>\n<li>Import trỏ ra ngoài thư mục làm việc (ví dụ <code>@~/.claude/my-notes.md</code>) trong file project sẽ hiện hộp thoại xin phép ở lần đầu.</li>\n</ul>\n<h4><code>.claude/rules/</code>: chỉ dẫn theo chủ đề và theo đường dẫn</h4>\n<p>Với project lớn, tách chỉ dẫn thành nhiều file <code>.md</code> trong <code>.claude/rules/</code> (được tìm đệ quy, nên có thể chia <code>frontend/</code>, <code>backend/</code>). Rule <strong>không có</strong> frontmatter <code>paths</code> được nạp lúc khởi động, cùng mức ưu tiên với <code>.claude/CLAUDE.md</code>. Rule <strong>có</strong> <code>paths</code> chỉ nạp khi Claude làm việc với file khớp mẫu:</p>\n<pre>---\npaths:\n  - \"**/*.test.ts\"\n  - \"src/**/*.{ts,tsx}\"\n---\n# Quy ước test\n- Dùng factory trong tests/factories, không tạo dữ liệu tay\n- Mỗi test chỉ assert một hành vi</pre>\n<p>Rule theo đường dẫn được nạp khi Claude dùng Read/Write/Edit trên file khớp. Nó hợp với quy ước <strong>rải khắp repo</strong> (mọi file test, mọi migration), những thứ không gắn với một thư mục duy nhất. Muốn dùng CLAUDE.md theo thư mục thì phải đặt bản sao ở hàng chục chỗ. Rule cá nhân cho mọi project đặt ở <code>~/.claude/rules/</code>.</p>\n<h4>Công cụ hỗ trợ</h4>\n<ul>\n<li><code>/init</code>: phân tích codebase và tạo CLAUDE.md khởi đầu. Nếu file đã có thì gợi ý cải thiện chứ không ghi đè.</li>\n<li><code>/memory</code>: liệt kê các file CLAUDE.md, CLAUDE.local.md và vị trí memory đang dùng, mở để sửa, bật/tắt auto memory.</li>\n<li>Monorepo bị dính CLAUDE.md của team khác: dùng setting <code>claudeMdExcludes</code> (không loại được file managed).</li>\n</ul>\n<div class=\"tip\">Nhớ nhanh: <strong>cả team cần</strong> thì project CLAUDE.md hoặc <code>.claude/rules/</code>, commit vào repo. <strong>Chỉ mình tôi</strong> thì <code>~/.claude/CLAUDE.md</code> hoặc <code>CLAUDE.local.md</code>. <strong>Chỉ khi chạm loại file X</strong> thì rule có <code>paths</code>.</div>",
     "keypoints": [
      "User (~/.claude/CLAUDE.md) không chia sẻ; project (./CLAUDE.md hoặc ./.claude/CLAUDE.md) chia sẻ qua git; CLAUDE.local.md là cá nhân.",
      "File ở thư mục hiện tại và thư mục cha nạp lúc khởi động, nối lại; file ở thư mục con nạp khi Claude chạm file trong đó.",
      "@path import tính từ file chứa nó, tối đa bốn tầng, không giảm chi phí context.",
      ".claude/rules/ có frontmatter paths (glob) thì chỉ nạp khi làm việc với file khớp; hợp cho quy ước rải khắp repo.",
      "Mỗi CLAUDE.md nên dưới 200 dòng; chỉ dẫn mâu thuẫn làm Claude chọn tùy ý."
     ],
     "sources": [
      {
       "t": "How Claude remembers your project",
       "u": "https://code.claude.com/docs/en/memory"
      }
     ],
     "ts": [
      "3.1",
      "3.3"
     ]
    },
    {
     "id": "l-3-2",
     "title": "Skill, slash command và subagent",
     "minutes": 13,
     "html": "<h4>Slash command đã gộp vào skill</h4>\n<p>Docs hiện ghi: <strong>custom command đã được gộp vào skill</strong>. File <code>.claude/commands/deploy.md</code> và skill <code>.claude/skills/deploy/SKILL.md</code> đều tạo lệnh <code>/deploy</code> và hoạt động như nhau. File commands cũ vẫn chạy. Skill có thêm thư mục chứa file phụ trợ, frontmatter điều khiển ai được gọi, và khả năng để Claude tự nạp khi phù hợp.</p>\n<table>\n<thead><tr><th>Phạm vi</th><th>Đường dẫn</th></tr></thead>\n<tbody>\n<tr><td>Cá nhân (mọi project)</td><td><code>~/.claude/skills/&lt;tên&gt;/SKILL.md</code></td></tr>\n<tr><td>Project (commit cho team)</td><td><code>.claude/skills/&lt;tên&gt;/SKILL.md</code></td></tr>\n</tbody>\n</table>\n<pre>---\nname: release-notes\ndescription: Draft release notes from merged PRs for a given version tag\nargument-hint: [version]\ndisable-model-invocation: true\nallowed-tools: Bash(git log *), Bash(gh pr list *)\n---\nViết release notes cho phiên bản $ARGUMENTS:\n1. Liệt kê PR đã merge kể từ tag trước\n2. Nhóm theo Features / Fixes / Breaking changes\n3. Mỗi mục một dòng, kèm số PR</pre>\n<h4>Frontmatter cần nhớ</h4>\n<ul>\n<li><code>description</code>: Claude dựa vào đây để quyết định khi nào dùng skill.</li>\n<li><code>disable-model-invocation: true</code>: Claude <strong>không tự nạp</strong>, chỉ chạy khi người dùng gõ <code>/tên</code>. Hợp với quy trình có tác dụng phụ như deploy hay release.</li>\n<li><code>user-invocable: false</code>: ẩn khỏi menu <code>/</code>, chỉ Claude được gọi.</li>\n<li><code>allowed-tools</code>: tool được dùng không cần hỏi trong lượt gọi skill đó.</li>\n<li><code>context: fork</code> (kèm <code>agent</code>): chạy skill trong context subagent tách riêng, giữ output dài dòng ngoài hội thoại chính.</li>\n<li><code>argument-hint</code>, <code>model</code>; đối số qua <code>$ARGUMENTS</code>, <code>$ARGUMENTS[0]</code> hoặc viết tắt <code>$0</code>.</li>\n</ul>\n<p><strong>Nạp theo nhu cầu</strong>: ở phiên thường, chỉ <em>mô tả</em> skill nằm trong context. Nội dung đầy đủ chỉ nạp khi skill được dùng, nên tài liệu tham khảo dài gần như không tốn gì cho đến khi cần. Docs khuyên giữ <code>SKILL.md</code> dưới 500 dòng và tách tài liệu chi tiết ra file phụ.</p>\n<p><strong>Skill hay CLAUDE.md?</strong> Docs gợi ý: tạo skill khi bạn cứ phải dán lại cùng một checklist hoặc quy trình nhiều bước, hoặc khi một phần CLAUDE.md đã thành <em>quy trình</em> thay vì <em>sự thật</em>. CLAUDE.md luôn nằm trong context. Skill chỉ vào khi cần.</p>\n<h4>Subagent trong Claude Code</h4>\n<p>Subagent là file markdown có frontmatter, đặt ở <code>.claude/agents/</code> (project) hoặc <code>~/.claude/agents/</code> (user). Chỉ <code>name</code> và <code>description</code> là bắt buộc.</p>\n<pre>---\nname: security-reviewer\ndescription: Reviews diffs for injection, auth and secrets issues. Use proactively after code changes.\ntools: Read, Grep, Glob\nmodel: sonnet\n---\nYou are a security reviewer. Report each finding with file, line, severity and fix.</pre>\n<ul>\n<li>Mỗi subagent chạy trong <strong>context window riêng</strong>, với system prompt, quyền tool và permission riêng, rồi chỉ trả <strong>bản tóm tắt</strong> về hội thoại chính.</li>\n<li>Bỏ trống <code>tools</code> thì subagent thừa hưởng mọi tool dành cho subagent. Liệt kê thì chỉ có những tool đó.</li>\n<li>Claude dựa vào <code>description</code> để giao việc. Thêm cụm như “use proactively” để khuyến khích giao chủ động.</li>\n<li>Built-in: <strong>Explore</strong> (chỉ đọc, chuyên tìm kiếm và phân tích codebase), <strong>Plan</strong> (thu thập context trong plan mode), <strong>general-purpose</strong> (việc nhiều bước cần cả khám phá lẫn hành động).</li>\n</ul>\n<h4>Chọn đúng cơ chế</h4>\n<table>\n<thead><tr><th>Nhu cầu</th><th>Cơ chế</th></tr></thead>\n<tbody>\n<tr><td>Sự thật, quy ước luôn cần</td><td>CLAUDE.md</td></tr>\n<tr><td>Quy ước cho một loại file</td><td><code>.claude/rules/</code> với <code>paths</code></td></tr>\n<tr><td>Quy trình lặp lại, gọi theo yêu cầu</td><td>Skill / slash command</td></tr>\n<tr><td>Việc tốn context, cần cách ly hoặc quyền hạn chế</td><td>Subagent</td></tr>\n<tr><td>Bắt buộc 100%</td><td>Hook / permission</td></tr>\n<tr><td>Kết nối hệ thống ngoài</td><td>MCP server</td></tr>\n</tbody>\n</table>\n<div class=\"warn\">Skill đặt ở <code>~/.claude/skills/</code> thì chỉ máy bạn có. Muốn cả team có lệnh <code>/review</code> thì đặt ở <code>.claude/skills/</code> (hoặc <code>.claude/commands/</code>) trong repo.</div>",
     "keypoints": [
      "Custom command đã gộp vào skill: .claude/commands/x.md và .claude/skills/x/SKILL.md đều tạo /x.",
      "Project skill ở .claude/skills/ (commit), cá nhân ở ~/.claude/skills/.",
      "disable-model-invocation: true thì chỉ người dùng gọi được; context: fork chạy trong subagent; $ARGUMENTS nhận đối số.",
      "Skill chỉ nạp mô tả lúc đầu, nội dung đầy đủ khi dùng; CLAUDE.md thì luôn nạp.",
      "Subagent ở .claude/agents/ hoặc ~/.claude/agents/, context riêng, trả tóm tắt; built-in Explore, Plan, general-purpose."
     ],
     "sources": [
      {
       "t": "Extend Claude with skills",
       "u": "https://code.claude.com/docs/en/skills"
      },
      {
       "t": "Create custom subagents",
       "u": "https://code.claude.com/docs/en/sub-agents"
      }
     ],
     "ts": [
      "3.2"
     ]
    },
    {
     "id": "l-3-3",
     "title": "Plan mode, permission và settings",
     "minutes": 12,
     "html": "<h4>Plan mode hay làm thẳng?</h4>\n<p>Ở <strong>plan mode</strong>, Claude đọc file và đề xuất kế hoạch nhưng <strong>không sửa gì</strong> cho đến khi bạn duyệt. Vào plan mode bằng <code>Shift+Tab</code> (đến khi thanh trạng thái báo plan mode) hoặc <code>claude --permission-mode plan</code>.</p>\n<table>\n<thead><tr><th>Nên dùng plan mode</th><th>Làm thẳng là đủ</th></tr></thead>\n<tbody>\n<tr><td>Thay đổi nhiều file, nhiều module</td><td>Sửa lỗi một file, có stack trace rõ</td></tr>\n<tr><td>Có nhiều cách làm hợp lý, cần chọn hướng</td><td>Yêu cầu cụ thể, chỉ có một cách làm hiển nhiên</td></tr>\n<tr><td>Quyết định kiến trúc, migration lớn</td><td>Đổi tên biến, thêm một kiểm tra null</td></tr>\n<tr><td>Codebase lạ, cần khám phá trước</td><td>Việc nhỏ đã hiểu rõ</td></tr>\n</tbody>\n</table>\n<p>Kết hợp thường gặp: plan mode để khám phá và chốt hướng, rồi chuyển sang làm thẳng để triển khai. Khám phá sinh ra nhiều output thì giao cho subagent (như Explore) để context chính chỉ nhận bản tóm tắt.</p>\n<h4>Permission mode</h4>\n<table>\n<thead><tr><th>Mode</th><th>Hành vi</th></tr></thead>\n<tbody>\n<tr><td><code>default</code> (Manual)</td><td>Hỏi trước các thao tác cần duyệt</td></tr>\n<tr><td><code>acceptEdits</code></td><td>Tự chấp nhận sửa file và các lệnh file thông dụng (<code>mkdir</code>, <code>mv</code>, <code>cp</code>…) trong thư mục làm việc</td></tr>\n<tr><td><code>plan</code></td><td>Đọc file, chạy lệnh shell để khám phá và viết kế hoạch; không sửa source cho đến khi bạn duyệt kế hoạch (lệnh ngoài bộ lệnh chỉ đọc do classifier của auto mode duyệt nếu có, không thì phải hỏi)</td></tr>\n<tr><td><code>auto</code></td><td>Một classifier xem xét hành động thay cho việc hỏi bạn</td></tr>\n<tr><td><code>dontAsk</code></td><td>Tự từ chối mọi thứ lẽ ra phải hỏi; chỉ chạy những gì đã được cho phép trước</td></tr>\n<tr><td><code>bypassPermissions</code></td><td>Bỏ qua lời hỏi (trừ một số hành động không mode nào tự duyệt); chỉ dùng trong môi trường cô lập</td></tr>\n</tbody>\n</table>\n<p>Mode khởi động mặc định: docs hiện ghi (tháng 11/2026) phiên tương tác trong terminal và VS Code khởi động ở <code>auto</code> từ v2.1.283 (nếu auto mode khả dụng, không thì về Manual), còn <code>claude -p</code> và Agent SDK khởi động ở <code>default</code> (Manual). Đổi bằng <code>--permission-mode</code> hoặc <code>permissions.defaultMode</code>.</p>\n<h4>Permission rule</h4>\n<pre>{\n  \"permissions\": {\n    \"allow\": [\"Bash(npm run lint)\", \"Bash(npm run test *)\"],\n    \"ask\":   [\"Bash(git push *)\"],\n    \"deny\":  [\"Read(./.env)\", \"Read(./.env.*)\"]\n  }\n}</pre>\n<ul>\n<li>Thứ tự đánh giá: <strong>deny, rồi ask, rồi allow</strong>. Khớp đầu tiên theo thứ tự đó quyết định kết quả. Độ cụ thể của rule <em>không</em> thay đổi thứ tự này.</li>\n<li>Một rule <code>allow</code> <strong>không thể</strong> khoét ngoại lệ trong rule <code>deny</code>. Ví dụ <code>Bash(aws *)</code> trong deny chặn cả <code>aws s3 ls</code> dù có allow riêng.</li>\n<li><code>Bash(npm run *)</code> khớp <code>npm run build</code>, <code>npm run test --watch</code> nhưng không khớp <code>npm install</code>. Dấu cách trước <code>*</code> quan trọng.</li>\n</ul>\n<h4>File settings và thứ tự ưu tiên</h4>\n<table>\n<thead><tr><th>Mức (cao xuống thấp)</th><th>File</th></tr></thead>\n<tbody>\n<tr><td>1. Managed</td><td><code>managed-settings.json</code>, MDM, server-managed</td></tr>\n<tr><td>2. Command line</td><td><code>--settings &lt;file-or-json&gt;</code> (chỉ cho phiên đó)</td></tr>\n<tr><td>3. Project local</td><td><code>.claude/settings.local.json</code> (không commit)</td></tr>\n<tr><td>4. Shared project</td><td><code>.claude/settings.json</code> (commit cho team)</td></tr>\n<tr><td>5. User</td><td><code>~/.claude/settings.json</code></td></tr>\n</tbody>\n</table>\n<p>Key đơn lẻ thì mức cao hơn thắng. Riêng danh sách như <code>permissions.allow</code> thì được <strong>gộp</strong> qua các mức. Hook cũng khai báo trong các file này (cộng thêm plugin, frontmatter của skill hay subagent). Đặt hook trong <code>.claude/settings.json</code> nếu muốn cả team dùng.</p>\n<div class=\"tip\">Câu hỏi “chặn đọc file bí mật cho cả team” có đáp án là rule <code>deny</code> trong <code>.claude/settings.json</code> được commit (hoặc managed settings nếu là chính sách toàn công ty). Không phải dòng dặn trong CLAUDE.md.</div>\n<div class=\"warn\">Chọn “Yes, and don't ask again” chỉ lưu rule <code>allow</code> vào file local của bạn. Rule đó không vượt qua được rule <code>ask</code>/<code>deny</code> ở project hay managed.</div>",
     "keypoints": [
      "Plan mode: đọc và đề xuất, không sửa cho đến khi duyệt; dùng cho thay đổi lớn, nhiều cách làm, codebase lạ.",
      "Việc nhỏ, rõ ràng thì làm thẳng; khám phá tốn context thì giao subagent Explore.",
      "Permission rule đánh giá deny, rồi ask, rồi allow; allow không khoét được ngoại lệ trong deny.",
      "Ưu tiên settings từ cao xuống thấp: managed, --settings, .claude/settings.local.json, .claude/settings.json, ~/.claude/settings.json; danh sách thì gộp.",
      "Mode: default, acceptEdits, plan, auto, dontAsk, bypassPermissions (chỉ trong môi trường cô lập)."
     ],
     "sources": [
      {
       "t": "Common workflows",
       "u": "https://code.claude.com/docs/en/common-workflows"
      },
      {
       "t": "Permissions",
       "u": "https://code.claude.com/docs/en/permissions"
      },
      {
       "t": "Settings",
       "u": "https://code.claude.com/docs/en/settings"
      },
      {
       "t": "Permission modes",
       "u": "https://code.claude.com/docs/en/permission-modes"
      }
     ],
     "ts": [
      "3.4"
     ]
    },
    {
     "id": "l-3-4",
     "title": "Claude Code trong CI: chế độ -p và output có cấu trúc",
     "minutes": 13,
     "html": "<p>Trong CI không có ai ngồi trả lời câu hỏi. Claude Code phải chạy <strong>không tương tác</strong>, xong thì thoát, và trả output máy đọc được.</p>\n<h4>Chế độ không tương tác</h4>\n<pre>claude -p \"Find and fix the bug in auth.py\" --allowedTools \"Read,Edit,Bash\"</pre>\n<ul>\n<li><code>-p</code> / <code>--print</code>: chạy không tương tác rồi thoát. Thành công trả exit code 0, thất bại trả mã khác 0, nên script rẽ nhánh được.</li>\n<li>Đọc được stdin: <code>gh pr diff \"$1\" | claude -p \"...\"</code>. Pipe diff vào nghĩa là Claude không cần quyền Bash để tự đọc diff. Docs ghi stdin được pipe giới hạn 10MB.</li>\n<li><code>--allowedTools</code>: tool chạy không cần hỏi, theo cú pháp permission rule, ví dụ <code>\"Bash(git diff *),Read\"</code>. <code>-p</code> không đặt mode thì khởi động ở Manual mode (docs hiện ghi, từ v2.1.302); khi đó lời gọi cần duyệt mà không được cho phép sẽ bị từ chối.</li>\n<li><code>--permission-mode dontAsk</code>: docs mô tả là hữu ích cho CI bị khóa chặt (từ chối mọi thứ lẽ ra phải hỏi). <code>acceptEdits</code> cho phép sửa file mà không hỏi.</li>\n<li><code>--max-turns</code> giới hạn số lượt, <code>--max-budget-usd</code> giới hạn chi phí ước tính (cả hai chỉ dùng ở print mode).</li>\n<li><code>--append-system-prompt</code> thêm chỉ dẫn mà vẫn giữ hành vi mặc định. <code>--system-prompt</code> thay toàn bộ system prompt.</li>\n</ul>\n<h4>Output có cấu trúc</h4>\n<table>\n<thead><tr><th><code>--output-format</code></th><th>Kết quả</th></tr></thead>\n<tbody>\n<tr><td><code>text</code> (mặc định)</td><td>Văn bản thuần</td></tr>\n<tr><td><code>json</code></td><td>JSON có <code>result</code>, <code>session_id</code>, metadata (kể cả <code>total_cost_usd</code>)</td></tr>\n<tr><td><code>stream-json</code></td><td>JSON từng dòng để stream thời gian thực</td></tr>\n</tbody>\n</table>\n<pre>claude -p \"Review this diff. Report each issue.\" \\\n  --output-format json \\\n  --json-schema '{\"type\":\"object\",\"properties\":{\"findings\":{\"type\":\"array\",\"items\":{\"type\":\"object\",\"properties\":{\"file\":{\"type\":\"string\"},\"line\":{\"type\":\"integer\"},\"severity\":{\"type\":\"string\",\"enum\":[\"low\",\"medium\",\"high\"]},\"message\":{\"type\":\"string\"}},\"required\":[\"file\",\"line\",\"severity\",\"message\"]}}},\"required\":[\"findings\"]}' \\\n  | jq '.structured_output.findings'</pre>\n<ul>\n<li>Với <code>--json-schema</code>, kết quả theo schema nằm ở trường <strong><code>structured_output</code></strong>.</li>\n<li>Nếu lần chạy kết thúc mà không có output hợp lệ (ví dụ Claude từ chối), sẽ <strong>không có</strong> trường <code>structured_output</code>. Script phải kiểm tra trước khi dùng.</li>\n<li>Từ khóa <code>format</code> (như <code>\"format\": \"email\"</code>) chỉ là chú thích, không được cưỡng chế.</li>\n</ul>\n<h4>Tái lập được: <code>--bare</code></h4>\n<p>Không có <code>--bare</code>, <code>claude -p</code> tự phát hiện và nạp hook, skill, plugin, MCP server, auto memory và CLAUDE.md như phiên tương tác. Điều đó gồm cả <code>.claude/settings.json</code> và <code>.mcp.json</code> của project, mà không có hộp thoại trust. <code>--bare</code> bỏ qua tất cả để mọi máy cho cùng kết quả. Thứ cần dùng thì truyền tường minh qua cờ như <code>--append-system-prompt-file</code>, <code>--settings</code>, <code>--mcp-config</code>, <code>--agents</code>. Docs gọi đây là chế độ khuyên dùng cho lời gọi từ script và SDK. Lưu ý ở bare mode, hook không chạy, kể cả khi truyền qua <code>--settings</code>.</p>\n<div class=\"tip\">Muốn Claude trong CI hiểu chuẩn của project (tiêu chí review, quy ước test, fixture có sẵn) thì có hai cách: để phiên thường nạp CLAUDE.md của repo, hoặc ở bare mode thì truyền file chỉ dẫn bằng <code>--append-system-prompt-file</code>. Đừng để nó đoán.</div>\n<h4>Nhiều bước và review độc lập</h4>\n<ul>\n<li>Lấy <code>session_id</code> từ output JSON rồi <code>--resume \"$session_id\"</code> để nối các bước. <code>--continue</code> nối phiên gần nhất.</li>\n<li>Phiên đã <em>viết</em> code thường kém trong việc tự phát hiện lỗi của chính nó, vì nó mang theo lập luận lúc viết. Hãy chạy review bằng một lần gọi <strong>độc lập</strong> (phiên mới, không có lịch sử viết code).</li>\n<li>Khi review chạy lại sau mỗi commit, đưa danh sách phát hiện cũ vào prompt và yêu cầu chỉ báo vấn đề mới hoặc chưa sửa, để tránh bình luận trùng lặp.</li>\n</ul>\n<div class=\"warn\">Bẫy: chạy <code>claude</code> không có <code>-p</code> trong CI (treo chờ input), hoặc parse văn bản tự do bằng regex thay vì dùng <code>--output-format json</code> và <code>--json-schema</code>.</div>",
     "keypoints": [
      "-p chạy không tương tác rồi thoát, exit code 0 khi thành công; đọc được stdin.",
      "--output-format text | json | stream-json; json có result và session_id.",
      "--json-schema đưa kết quả vào structured_output; kiểm tra trường này có tồn tại trước khi dùng.",
      "--bare bỏ qua hook, skill, MCP, CLAUDE.md để tái lập; truyền context tường minh bằng cờ.",
      "Review bằng phiên độc lập; truyền phát hiện cũ để tránh bình luận trùng."
     ],
     "sources": [
      {
       "t": "Run Claude Code programmatically",
       "u": "https://code.claude.com/docs/en/headless"
      },
      {
       "t": "CLI reference",
       "u": "https://code.claude.com/docs/en/cli-reference"
      }
     ],
     "ts": [
      "3.6"
     ]
    },
    {
     "id": "l-3-5",
     "title": "Tinh chỉnh dần với Claude Code: prompt cụ thể, ví dụ, phép kiểm và phỏng vấn",
     "minutes": 12,
     "html": "<p>Bạn giao việc, Claude làm ra thứ gần đúng nhưng không phải thứ bạn muốn, bạn sửa, nó lại lệch kiểu khác. Đề thi gọi đây là <em>iterative refinement</em> và hỏi: kỹ thuật nào làm mỗi vòng sửa hiệu quả hơn? Docs best practices của Claude Code gợi ý bắt đầu bằng chẩn đoán.</p>\n<h4>Chẩn đoán trước khi sửa prompt</h4>\n<table>\n<thead><tr><th>Triệu chứng</th><th>Nguyên nhân docs nêu</th><th>Hướng sửa</th></tr></thead>\n<tbody>\n<tr><td>Làm ra thứ khác ý bạn; phiên nào cũng phải tìm lại cùng một sự thật</td><td>Thiếu thông tin không có trong repo</td><td>Prompt cụ thể hơn, đưa tài liệu, ghi vào CLAUDE.md</td></tr>\n<tr><td>Báo xong mà chưa xong</td><td>Không có cách tự kiểm tra</td><td>Cho một phép kiểm trả về đạt/không đạt</td></tr>\n<tr><td>Làm điều cấm, bỏ bước bắt buộc</td><td>Prompt không bảo đảm được</td><td>Hook, rule deny (Domain 1, l-3-3)</td></tr>\n<tr><td>Đúng nhưng tốn quá nhiều thời gian, token</td><td>Cấu hình mặc định chưa hợp</td><td>Đổi mode, model, effort</td></tr>\n</tbody>\n</table>\n<h4>1. Prompt cụ thể: nói thứ Claude không tự đọc ra</h4>\n<p>Docs khuyên nêu tên file, mô tả triệu chứng, và nói rõ “xong” trông thế nào ngay từ đầu. Ví dụ, thay vì “sửa lỗi xuất CSV”, hãy viết: “file CSV xuất từ <code>reports/export.py</code> bị lệch cột khi tên khách có dấu phẩy; viết test tái hiện với tên <code>Nguyễn, Văn A</code>, rồi sửa để test qua”. Nếu bạn thích một trong hai cách làm hợp lý, nói ra, vì Claude không đọc được sở thích đó từ code.</p>\n<p>Có sẵn thứ Claude cần thì đưa luôn thay vì mô tả: gõ <code>@</code> kèm đường dẫn để đính nội dung file, dán ảnh chụp thiết kế hoặc lỗi, hoặc pipe output vào (<code>cat build.log | claude -p \"vì sao build lỗi\"</code>).</p>\n<h4>2. Ví dụ input/output cụ thể</h4>\n<p>Khi yêu cầu là một phép biến đổi (định dạng lại dữ liệu, quy ước đặt tên, cấu trúc output), mô tả bằng lời dễ bị hiểu mỗi lần một kiểu. Docs prompting gọi ví dụ là một trong những cách đáng tin nhất để điều khiển định dạng và cấu trúc. Đưa hai ba cặp “đầu vào → kết quả mong muốn”, nhất là ca biên:</p>\n<pre>Chuẩn hóa số điện thoại theo mẫu sau:\n\"0912 345 678\"      -&gt; \"+84912345678\"\n\"+84 (0)912345678\"  -&gt; \"+84912345678\"\n\"912345678\"         -&gt; null   (thiếu đầu số, không đoán)</pre>\n<h4>3. Cho một phép kiểm: test trước, sửa sau</h4>\n<p>Docs nói Claude dừng khi việc <em>trông</em> đã xong; nếu không có gì để chạy, “trông xong” là tất cả những gì nó có. Cho nó thứ trả về đạt/không đạt (file test, exit code của build, linter, script so output với fixture) thì nó tự khép vòng: sửa, chạy kiểm tra, đọc lỗi, sửa tiếp. Mức chặt tăng dần:</p>\n<ul>\n<li><strong>Trong prompt</strong>: “chạy test auth sau khi sửa, làm tiếp đến khi qua”. Claude tự quyết khi nào hài lòng.</li>\n<li><strong>Hook <code>Stop</code></strong>: script chạy mỗi khi Claude định kết thúc lượt; exit 2 gửi Claude quay lại làm, và stderr trở thành lý do. Đây là cưỡng chế của harness. Docs ghi nếu hook chặn tám lần liên tiếp mà không có lời gọi tool nào ở giữa thì Claude Code cho lượt kết thúc.</li>\n<li><strong>Người không viết code review</strong>: một subagent hoặc phiên mới chưa thấy quá trình viết.</li>\n</ul>\n<p>Dù chọn cách nào, docs khuyên <strong>đòi bằng chứng</strong>: lệnh đã chạy và output của nó. Câu “tất cả test đều qua” một mình không nói được gì nhiều.</p>\n<h4>4. Chưa rõ mình muốn gì: để Claude phỏng vấn</h4>\n<p>Khi yêu cầu còn mơ hồ, docs gợi ý bảo Claude <strong>phỏng vấn bạn</strong> cho đến khi đủ thông tin viết spec, rồi ghi ra file như <code>SPEC.md</code>. Claude sẽ hỏi những điểm bạn chưa chốt (giới hạn theo user hay theo key, request vượt giới hạn thì sao, phần nào ngoài phạm vi). Sau đó mở <strong>phiên mới</strong> để xây theo spec: context sạch, có định nghĩa “xong” bằng văn bản, và spec cũng là thứ để reviewer đối chiếu.</p>\n<pre>Tôi muốn thêm cơ chế khóa tài khoản sau nhiều lần đăng nhập sai nhưng chưa nghĩ kỹ.\nHãy hỏi tôi từng câu cho đến khi đủ để viết spec, rồi ghi spec vào SPEC.md.</pre>\n<h4>5. Review theo spec, bỏ qua style</h4>\n<p>Docs gợi ý giao một subagent review diff <em>so với spec</em>: mọi yêu cầu đã làm chưa, ca biên đã có test chưa, chỉ báo lỗ hổng ảnh hưởng tính đúng và bỏ qua style. Docs giải thích: reviewer được bảo đi tìm vấn đề thì luôn tìm ra <em>cái gì đó</em>, và sửa hết mọi phát hiện dễ dẫn tới thêm lớp trừu tượng và test cho những ca không thể xảy ra.</p>\n<h4>6. Lái phiên khi nó lệch hướng</h4>\n<ul>\n<li><code>Esc</code>: dừng Claude giữa chừng, giữ phần đã làm, rồi chỉnh hướng.</li>\n<li><code>/rewind</code> (hoặc <code>Esc</code> hai lần khi ô nhập trống): quay code, hội thoại hoặc cả hai về một prompt trước đó. Nhờ vậy dám thử hướng táo bạo trước.</li>\n<li><strong>Sửa hai lần vẫn sai thì <code>/clear</code></strong> và viết một prompt mới gộp những gì đã học. Docs giải thích: lần sửa thứ ba chỉ thêm vào một cuộc hội thoại đã chứa hai lần thử hỏng mà Claude cứ phải đọc lại.</li>\n</ul>\n<h4>Một message hay nhiều message?</h4>\n<p>Đây là lời khuyên thiết kế, không phải quy tắc trong docs: các lỗi <em>liên quan nhau</em> (cùng một hàm, sửa cái này ảnh hưởng cái kia) nên gửi chung trong một message để Claude sửa nhất quán; các lỗi <em>độc lập</em> nên giải quyết lần lượt, mỗi lần kèm phép kiểm, để biết thay đổi nào sửa được gì.</p>\n<div class=\"warn\">Docs best practices hiện ghi một số mẹo cũ không còn cần với model hiện tại: viết hoa “IMPORTANT” cho chỉ dẫn hay bị bỏ qua (dễ khiến Claude áp dụng quá tay; quy tắc cứng thì chuyển thành hook), hay chêm “think harder” (đó chỉ là chữ thường; mức suy nghĩ điều khiển bằng effort). Đáp án dạng “nhấn mạnh hơn trong prompt” thường không phải cách sửa gốc.</div>\n<div class=\"tip\">Đề hỏi kỹ thuật nào giúp Claude hiểu đúng phép biến đổi thì chọn ví dụ input/output. Hỏi cách để Claude biết khi nào xong thì chọn test hoặc phép kiểm. Hỏi khi yêu cầu còn mơ hồ thì chọn để Claude phỏng vấn rồi viết spec.</div>",
     "keypoints": [
      "Chẩn đoán trước: thiếu thông tin, thiếu phép kiểm, hay quy tắc cần cưỡng chế.",
      "Prompt cụ thể: tên file, triệu chứng, định nghĩa 'xong'; đưa file bằng @, ảnh, output pipe vào.",
      "Phép biến đổi khó tả thì đưa vài cặp ví dụ input/output, gồm ca biên.",
      "Cho phép kiểm đạt/không đạt (test, build, Stop hook exit 2) và đòi bằng chứng là output đã chạy.",
      "Yêu cầu mơ hồ thì để Claude phỏng vấn, ghi SPEC.md, rồi xây trong phiên mới; sửa hai lần vẫn sai thì /clear."
     ],
     "sources": [
      {
       "t": "Best practices for Claude Code",
       "u": "https://code.claude.com/docs/en/best-practices"
      },
      {
       "t": "Common workflows",
       "u": "https://code.claude.com/docs/en/common-workflows"
      },
      {
       "t": "Prompting best practices (Use examples effectively)",
       "u": "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices"
      }
     ],
     "ts": [
      "3.5"
     ]
    },
    {
     "id": "l-3-6",
     "title": "Quản lý phiên và context trong Claude Code: /clear, /compact, /rewind, /branch",
     "minutes": 11,
     "html": "<p>Một ngày làm việc với Claude Code thường có nhiều việc nối nhau trong cùng terminal. Đề hay hỏi: khi nào xóa, khi nào tóm tắt, khi nào quay lui, khi nào rẽ nhánh? Bài này gom các công cụ đó lại.</p>\n<h4>Vì sao phải quản lý</h4>\n<p>Docs best practices nêu: mỗi request gửi lại cả cuộc hội thoại, nên một phiên đã gom ba việc không liên quan sẽ đọc lại cả ba ở mọi lượt của việc thứ tư. Docs cũng ghi phần lớn model hiện tại có context 1M token và tự compact, nên hiếm khi “hết chỗ”; nhưng context tập trung vẫn cho câu trả lời tốt hơn và rẻ hơn. Xem context đang bị chiếm bởi gì bằng <code>/context</code>.</p>\n<h4>Bốn lệnh chính</h4>\n<table>\n<thead><tr><th>Lệnh</th><th>Làm gì</th><th>Dùng khi</th></tr></thead>\n<tbody>\n<tr><td><code>/clear [tên]</code></td><td>Bắt đầu hội thoại mới với context trống. Phiên cũ được lưu, quay lại bằng <code>/resume</code>; truyền tên để đặt nhãn cho phiên vừa rời</td><td>Chuyển sang việc không liên quan; sửa hai lần vẫn sai</td></tr>\n<tr><td><code>/compact [chỉ dẫn]</code></td><td>Thay lịch sử bằng bản tóm tắt, có thể nói rõ cần giữ gì</td><td>Vẫn làm tiếp việc này nhưng lịch sử đã dài</td></tr>\n<tr><td><code>/rewind</code></td><td>Mở menu checkpoint: khôi phục code, hội thoại, hoặc cả hai; hoặc tóm tắt một đoạn</td><td>Hướng vừa thử hỏng; muốn thu gọn một đoạn debug dài</td></tr>\n<tr><td><code>/branch [tên]</code></td><td>Sao chép hội thoại đến điểm hiện tại và chuyển vào bản sao; bản gốc giữ nguyên</td><td>Muốn thử hướng khác mà vẫn giữ đường cũ</td></tr>\n</tbody>\n</table>\n<h4>Compact giữ lại gì</h4>\n<p>Claude Code tự compact khi gần chạm giới hạn; <code>/compact</code> làm việc đó chủ động, kèm trọng tâm, ví dụ <code>/compact giữ thay đổi API và lệnh chạy test</code>. Docs về context window liệt kê thứ còn lại sau compact:</p>\n<ul>\n<li>System prompt vẫn áp dụng; CLAUDE.md ở gốc project, rule không có <code>paths</code> và auto memory được <strong>nạp lại từ đĩa</strong>.</li>\n<li>Rule có <code>paths</code> và CLAUDE.md thư mục con được nạp lại <strong>khi cần</strong> (khi Claude chạm lại file khớp). Docs nói nếu một rule phải sống qua compact thì bỏ <code>paths</code> hoặc chuyển nó vào CLAUDE.md gốc.</li>\n<li>Claude Code đọc lại tối đa năm file đã đọc/sửa gần nhất.</li>\n<li>Nội dung skill đã dùng được đưa lại nhưng có giới hạn dung lượng, nên đặt chỉ dẫn quan trọng ở đầu <code>SKILL.md</code>.</li>\n<li>Context mà hook đã thêm trước đó bị tóm tắt cùng phần còn lại. Hook <code>SessionStart</code> khớp nguồn <code>compact</code> sẽ chạy lại và thêm output vào context sau compact.</li>\n</ul>\n<div class=\"tip\">Chỉ dẫn bạn gõ ở prompt đầu phiên không nằm trong danh sách được nạp lại; nó chỉ còn dưới dạng tóm tắt. Quy tắc phải sống qua compact thì đặt trong CLAUDE.md gốc.</div>\n<h4>Checkpoint và <code>/rewind</code></h4>\n<p>Mỗi prompt bắt đầu một lượt tạo một checkpoint, chụp trạng thái file trước lượt đó. Mở menu bằng <code>/rewind</code> hoặc nhấn <code>Esc</code> hai lần khi ô nhập trống. Các lựa chọn: khôi phục code và hội thoại, chỉ hội thoại, chỉ code, “tóm tắt từ đây”, “tóm tắt đến đây”. Hai lựa chọn tóm tắt giống một <code>/compact</code> có mục tiêu: nén một đoạn mà giữ phần còn lại.</p>\n<div class=\"warn\">Giới hạn docs nêu: checkpoint theo dõi file Claude sửa bằng tool sửa file của nó; file <strong>chỉ</strong> bị lệnh Bash thay đổi thì không được khôi phục. Sửa đổi của phần lớn subagent và thay đổi bạn làm bên ngoài Claude Code cũng không được ghi lại. Checkpoint dùng để hồi phục nhanh trong phiên, không thay git.</div>\n<h4>Rẽ nhánh và quay lại phiên</h4>\n<ul>\n<li><code>/branch</code> trong phiên, hoặc <code>claude --continue --fork-session</code> từ shell: tạo bản sao hội thoại, bản gốc nguyên vẹn trong session picker. Theo docs, rẽ nhánh bằng <code>--fork-session</code> chạy trong process mới nên quyền “allow for this session” không đi theo.</li>\n<li>Rẽ nhánh chỉ tách <em>hội thoại</em>; file trên đĩa vẫn dùng chung (xem l-1-4).</li>\n<li><code>claude --continue</code> mở phiên gần nhất trong thư mục hiện tại; <code>claude --resume &lt;tên hoặc ID&gt;</code> mở đúng phiên. Đặt tên bằng <code>/rename</code> để việc kéo dài nhiều ngày dễ tìm lại. Docs ghi phiên tạo bằng <code>claude -p</code> hoặc Agent SDK không hiện trong picker, nhưng vẫn resume được bằng session ID.</li>\n<li>Resume không phục hồi mọi cờ khởi động: docs ghi <code>--mcp-config</code>, <code>--settings</code>, <code>--add-dir</code>… phải truyền lại.</li>\n</ul>\n<h4>Câu hỏi nhanh không làm bẩn lịch sử</h4>\n<p><code>/btw &lt;câu hỏi&gt;</code> hỏi một câu bên lề về phiên hiện tại mà không thêm vào hội thoại.</p>\n<h4>Chọn công cụ</h4>\n<table>\n<thead><tr><th>Tình huống</th><th>Chọn</th></tr></thead>\n<tbody>\n<tr><td>Xong việc A, chuyển sang việc B không liên quan</td><td><code>/clear</code></td></tr>\n<tr><td>Phiên khám phá dài, sắp bắt đầu phần triển khai</td><td><code>/compact</code> kèm trọng tâm, hoặc ghi phát hiện ra file rồi phiên mới</td></tr>\n<tr><td>Claude vừa sửa hỏng một loạt file bằng Edit</td><td><code>/rewind</code> khôi phục code</td></tr>\n<tr><td>Muốn thử hai cách từ cùng một điểm</td><td><code>/branch</code> hoặc <code>--fork-session</code></td></tr>\n<tr><td>Đồng đội đã đổi file sau lần chạy trước</td><td>Resume và nói rõ file nào đổi, hoặc phiên mới kèm tóm tắt (l-1-4)</td></tr>\n</tbody>\n</table>",
     "keypoints": [
      "/clear: context trống, phiên cũ vẫn resume được; /compact: thay lịch sử bằng tóm tắt, có thể nêu trọng tâm.",
      "Sau compact, CLAUDE.md gốc, rule không paths và auto memory được nạp lại; rule có paths chỉ nạp lại khi chạm file.",
      "/rewind khôi phục code/hội thoại theo checkpoint; không khôi phục file chỉ bị Bash sửa; không thay git.",
      "/branch hoặc --continue --fork-session rẽ nhánh hội thoại; file trên đĩa vẫn dùng chung.",
      "/context xem context bị chiếm bởi gì; /btw hỏi bên lề không thêm vào lịch sử."
     ],
     "sources": [
      {
       "t": "Explore the context window (what survives compaction)",
       "u": "https://code.claude.com/docs/en/context-window"
      },
      {
       "t": "Checkpointing",
       "u": "https://code.claude.com/docs/en/checkpointing"
      },
      {
       "t": "Manage sessions",
       "u": "https://code.claude.com/docs/en/sessions"
      },
      {
       "t": "Commands reference",
       "u": "https://code.claude.com/docs/en/commands"
      },
      {
       "t": "Best practices for Claude Code",
       "u": "https://code.claude.com/docs/en/best-practices"
      }
     ],
     "ts": [
      "1.7",
      "5.4"
     ]
    }
   ],
   "cheat": [
    [
     "Quy ước cả team cần",
     "./CLAUDE.md hoặc ./.claude/CLAUDE.md, hoặc .claude/rules/; commit vào repo"
    ],
    [
     "~/.claude/CLAUDE.md",
     "Chỉ máy bạn, mọi project; không chia sẻ"
    ],
    [
     "CLAUDE.local.md",
     "Cá nhân, project hiện tại; thêm vào .gitignore"
    ],
    [
     "CLAUDE.md thư mục con",
     "Nạp khi Claude đọc/ghi/sửa file trong thư mục đó"
    ],
    [
     "@path import",
     "Tương đối theo file chứa nó; tối đa 4 tầng; không giảm context"
    ],
    [
     "Quy ước cho **/*.test.ts",
     ".claude/rules/x.md với frontmatter paths"
    ],
    [
     "/deploy cho cả team, chỉ gọi tay",
     ".claude/skills/deploy/SKILL.md với disable-model-invocation: true"
    ],
    [
     "Subagent",
     ".claude/agents/ (project) hoặc ~/.claude/agents/ (user); context riêng, trả tóm tắt"
    ],
    [
     "Plan mode",
     "Shift+Tab hoặc --permission-mode plan; cho thay đổi lớn hoặc nhiều hướng"
    ],
    [
     "Thứ tự permission",
     "deny, rồi ask, rồi allow; allow không khoét được deny"
    ],
    [
     "CI",
     "claude -p --output-format json --json-schema ... rồi đọc .structured_output"
    ],
    [
     "CI tái lập",
     "--bare cùng --append-system-prompt-file / --mcp-config / --settings"
    ],
    [
     "Yêu cầu còn mơ hồ",
     "Để Claude phỏng vấn, ghi SPEC.md, rồi xây trong phiên mới"
    ],
    [
     "Claude báo xong mà chưa xong",
     "Cho phép kiểm đạt/không đạt (test, Stop hook exit 2); đòi output đã chạy làm bằng chứng"
    ],
    [
     "/clear, /compact, /rewind, /branch",
     "Việc mới / tóm tắt lịch sử / quay lui code hoặc hội thoại / rẽ nhánh hội thoại"
    ],
    [
     "Rule phải sống qua compact",
     "Bỏ paths hoặc chuyển vào CLAUDE.md gốc; rule có paths chỉ nạp lại khi chạm file khớp"
    ]
   ],
   "quiz": [
    {
     "q": "A senior engineer's Claude Code sessions consistently follow the team's testing conventions, but a newly onboarded engineer's sessions in the same repository ignore them. The senior engineer wrote the conventions in ~/.claude/CLAUDE.md. What should the team do?",
     "options": [
      "Have the new engineer copy the senior engineer's ~/.claude/CLAUDE.md onto their own machine so both sessions load identical instructions.",
      "Move the conventions to a CLAUDE.local.md file at the repository root.",
      "Add the conventions to the project's .mcp.json so they load for everyone.",
      "Move the conventions into the project's CLAUDE.md (or a file in .claude/rules/) and commit it to the repository."
     ],
     "answer": 3,
     "explain": "~/.claude/CLAUDE.md là file cấp user, chỉ máy người viết có. Quy ước cả team cần phải nằm ở CLAUDE.md của project hoặc .claude/rules/ và được commit. A chạy được tạm thời nhưng không bền: người mới sau lại thiếu, sửa một nơi không đồng bộ nơi khác. B: CLAUDE.local.md là file cá nhân, nên bị gitignore. C: .mcp.json dùng để cấu hình MCP server, không chứa chỉ dẫn.",
     "sc": "s2",
     "ts": [
      "3.1"
     ]
    },
    {
     "q": "A repository has test files spread across dozens of directories (**/*.test.ts). The team wants specific testing conventions applied whenever Claude works on a test file, without adding those instructions to every session's context. What is the BEST approach?",
     "options": [
      "Place a CLAUDE.md containing the conventions in every directory that contains tests.",
      "Create a rule file in .claude/rules/ with paths frontmatter matching \"**/*.test.ts\".",
      "Add a Testing section to the root CLAUDE.md.",
      "Create a skill with disable-model-invocation: true and ask developers to run it before editing tests."
     ],
     "answer": 1,
     "explain": "Rule có paths chỉ nạp khi Claude làm việc với file khớp mẫu, nên hợp với quy ước rải khắp repo. A phải nhân bản file ở hàng chục chỗ, khó bảo trì. C luôn nạp vào mọi phiên, trái với yêu cầu. D bắt người dùng nhớ gọi tay, dễ quên.",
     "sc": "s2",
     "ts": [
      "3.3"
     ]
    },
    {
     "q": "A team wants a shared /release-notes command that takes a version number as an argument. It should run only when a developer explicitly types the command, never because Claude decides it is relevant. Where and how should it be defined?",
     "options": [
      "In ~/.claude/skills/release-notes/SKILL.md on each developer's machine.",
      "As a paragraph in the root CLAUDE.md describing how to write release notes when asked.",
      "Commit .claude/skills/release-notes/SKILL.md with disable-model-invocation: true, using $ARGUMENTS for the version.",
      "Define it as a subagent in .claude/agents/release-notes.md whose description tells Claude to use it proactively whenever release notes come up."
     ],
     "answer": 2,
     "explain": "Skill cấp project (.claude/skills/, commit) thì cả team có. disable-model-invocation: true ngăn Claude tự gọi. $ARGUMENTS nhận số phiên bản. A là skill cá nhân, không chia sẻ. B không tạo lệnh và luôn tốn context. D ngược yêu cầu: 'use proactively' khuyến khích Claude tự giao việc.",
     "sc": "s2",
     "ts": [
      "3.2"
     ]
    },
    {
     "q": "A developer asks Claude Code to migrate the project's logging library across roughly 45 files. There are several reasonable strategies (a wrapper module, direct replacement, or a phased rollout), and the team wants to agree on one before any file changes. How should the developer proceed?",
     "options": [
      "Start in plan mode: let Claude explore and propose a strategy for review, then execute the approved plan.",
      "Switch to acceptEdits mode so the migration can finish quickly without interruptions, and then review the complete diff once at the end.",
      "Ask Claude to start editing file by file and stop if the approach looks wrong.",
      "Run the migration with claude -p in CI so it does not consume the developer's session."
     ],
     "answer": 0,
     "explain": "Thay đổi lớn, nhiều file, nhiều hướng hợp lý: đúng trường hợp dùng plan mode để khám phá và chốt hướng trước khi sửa. B và C sửa trước rồi mới bàn hướng, dễ phải làm lại cả loạt file. D không giải quyết nhu cầu thống nhất hướng trước khi sửa.",
     "sc": "s2",
     "ts": [
      "3.4"
     ]
    },
    {
     "q": "A CI pipeline should run Claude Code on each pull request, then post its findings as inline review comments. The job must never hang waiting for input, and the posting script needs machine-parseable results. Which TWO choices meet these requirements? (Choose TWO.)",
     "options": [
      "Run claude interactively inside a tmux session on the CI runner.",
      "Use --continue on every run so Claude remembers all previous pull requests.",
      "Run Claude Code with -p (print mode) so it executes non-interactively and exits.",
      "Use --output-format json with --json-schema, and read the structured_output field.",
      "Capture plain-text output and extract findings with regular expressions."
     ],
     "answer": [
      2,
      3
     ],
     "explain": "-p chạy không tương tác rồi thoát. --output-format json kèm --json-schema cho kết quả theo schema trong structured_output. A vẫn là phiên tương tác, có thể treo. B làm context phình to và lẫn giữa các PR, không liên quan tới yêu cầu. E là cách parse dễ gãy.",
     "sc": "s5",
     "ts": [
      "3.6"
     ]
    },
    {
     "q": "A project's committed .claude/settings.json contains the permission rule deny: [\"Read(./.env)\"]. A developer adds allow: [\"Read(./.env)\"] to their own .claude/settings.local.json. What happens when Claude tries to read .env?",
     "options": [
      "The read is allowed, because .claude/settings.local.json has higher precedence than the shared .claude/settings.json file.",
      "The read is allowed, because allow rules are evaluated before deny rules.",
      "Claude prompts the developer each time, because conflicting rules fall back to ask.",
      "The read is still blocked: deny rules are checked first, and allow cannot override a matching deny."
     ],
     "answer": 3,
     "explain": "Permission rule được đánh giá theo thứ tự deny, rồi ask, rồi allow, và allow không khoét được ngoại lệ trong deny. Các danh sách rule được gộp qua các file. A nhầm giữa ưu tiên của key đơn lẻ và cách rule permission kết hợp. B sai thứ tự đánh giá. C: không có cơ chế 'xung đột thì hỏi'.",
     "sc": "s2",
     "ts": [
      "3.1"
     ]
    },
    {
     "q": "While investigating how token refresh works in a large monorepo, a developer's main Claude Code session fills up with dozens of file reads, and later answers become less precise. What is the BEST way to do this kind of investigation?",
     "options": [
      "Run /clear after each file read to keep the context small.",
      "Paste the findings into CLAUDE.md as you go so that they are always loaded and Claude never needs to re-read those files again.",
      "Have a subagent (e.g., Explore) do the investigation in its own context and return a summary.",
      "Increase MAX_MCP_OUTPUT_TOKENS so more file content fits in context."
     ],
     "answer": 2,
     "explain": "Subagent đọc file trong context riêng và chỉ trả bản tóm tắt, nên context chính sạch. Docs best practices vẫn nêu việc giữ output dài (như một lượt tìm kiếm rộng) ngoài hội thoại chính là lý do dùng subagent, và Claude Code tự giao tìm kiếm codebase rộng cho Explore (dù docs cũng ghi “hết context” nay hiếm khi là vấn đề chính). A mất luôn những gì vừa tìm được. B nhồi chi tiết tạm thời vào file luôn được nạp, tốn context mọi phiên. D không liên quan (đó là giới hạn output của tool MCP) và còn làm context đầy hơn.",
     "sc": "s4",
     "ts": [
      "3.4",
      "5.4"
     ]
    },
    {
     "q": "A team's nightly claude -p job produces different results on different runners. Investigation shows some runners load extra hooks and MCP servers from configuration lying around on the machine. The team wants every run to behave the same. What should they do?",
     "options": [
      "Add --verbose so differences between runners are logged.",
      "Run with --bare and pass the required context explicitly, for example with --append-system-prompt-file and --mcp-config.",
      "Add --continue so each run reuses the previous night's session.",
      "Add --fork-session so each run starts from a clean branch of the conversation."
     ],
     "answer": 1,
     "explain": "--bare bỏ qua việc tự phát hiện hook, skill, plugin, MCP, CLAUDE.md, nên mọi máy chạy giống nhau. Thứ cần dùng thì truyền tường minh qua cờ. A chỉ ghi log, không sửa. C và D liên quan tới lịch sử hội thoại, không liên quan tới cấu hình được nạp từ máy.",
     "sc": "s5",
     "ts": [
      "3.6"
     ]
    }
   ],
   "bank": [
    {
     "q": "A monorepo has a root CLAUDE.md and packages/payments/CLAUDE.md with payment-specific rules. A developer starts Claude Code at the repository root and asks a general question about payment retries; Claude's answer ignores the payment rules. Claude has not opened any file under packages/payments/ yet. What explains this?",
     "options": [
      "Only one CLAUDE.md is loaded per session, and the root file always takes precedence over nested files in subdirectories.",
      "Nested CLAUDE.md files are ignored unless they are imported from the root file with an @path import.",
      "Claude Code loads CLAUDE.md files only from directories above the working directory, never from below it.",
      "CLAUDE.md files in subdirectories load on demand, once Claude reads or edits a file in that directory."
     ],
     "answer": 3,
     "explain": "Đúng: docs Memory ghi CLAUDE.md ở các thư mục phía trên thư mục làm việc được nạp lúc khởi động; CLAUDE.md trong thư mục con được phát hiện nhưng chỉ nạp khi Claude đọc, ghi hoặc sửa một file trong thư mục con đó. Sai: các file được nối vào context chứ không loại trừ nhau. Không cần import để file lồng nhau được nạp. Phương án \"không bao giờ nạp từ bên dưới\" sai vì chúng vẫn được nạp theo nhu cầu.",
     "sc": "s2",
     "ts": [
      "3.1"
     ]
    },
    {
     "q": "A team's CLAUDE.md has grown to about 900 lines covering frontend, backend, infrastructure, and release procedures, and adherence to individual rules has dropped. A teammate proposes splitting it into several files pulled in with @imports. What is the BEST response?",
     "options": [
      "Imports aid organization but still load everything; move area-specific rules to path-scoped rules and procedures to skills.",
      "Approve the split, because imported files are loaded lazily and therefore stop consuming context until they are needed.",
      "Keep one file but put the most important rules in capital letters so that Claude weighs them more heavily.",
      "Move the whole file into ~/.claude/CLAUDE.md, since user-level instructions are followed more strictly."
     ],
     "answer": 0,
     "explain": "Đúng: docs Memory khuyên mỗi CLAUDE.md dưới khoảng 200 dòng vì file dài tốn context và giảm mức tuân thủ; chuyển chỉ dẫn chỉ áp dụng cho một phần codebase vào path-scoped rules (chỉ nạp khi làm việc với file khớp), và quy trình nhiều bước vào skill. Docs nói rõ import giúp tổ chức nhưng không giảm chi phí context vì file được import nạp cùng CLAUDE.md. Sai: import không nạp lười. Viết hoa: Best practices ghi cách này nay chủ yếu khiến Claude áp quy tắc quá đà; nếu dòng bị chìm trong file dài thì file cần ngắn lại. Chuyển sang file user không làm quy tắc được tuân thủ hơn và còn bỏ mất việc chia sẻ với team.",
     "sc": "s2",
     "ts": [
      "3.1",
      "3.3"
     ]
    },
    {
     "q": "The root CLAUDE.md contains the line @docs/guide.md, and docs/guide.md in turn contains the line @api-conventions.md. Which file does Claude Code try to load for the second import?",
     "options": [
      "api-conventions.md at the repository root, because every import resolves relative to the working directory.",
      "docs/api-conventions.md, because import paths resolve relative to the file that contains them.",
      "Neither file, because imports inside an imported file are ignored to prevent loops.",
      "~/.claude/api-conventions.md, because a relative import path without a directory resolves against the user's config folder."
     ],
     "answer": 1,
     "explain": "Đúng: docs Memory ghi đường dẫn tương đối được resolve tương đối với file chứa dòng import, không phải thư mục làm việc; file được import có thể import tiếp (docs hiện ghi tối đa bốn bước lồng nhau, tháng 11/2026). Sai: không resolve theo thư mục làm việc. Import lồng nhau được hỗ trợ (có giới hạn độ sâu). Không có quy tắc tìm trong ~/.claude cho import tương đối.",
     "sc": "s2",
     "ts": [
      "3.1"
     ]
    },
    {
     "q": "Early in a long Claude Code session, a developer told Claude \"always use the project's logger, never console.log.\" After an automatic compaction, Claude starts adding console.log calls again. What is the BEST way to make the instruction persist?",
     "options": [
      "Repeat the instruction in chat after every compaction, since conversation messages are protected from summarization.",
      "Disable auto-compaction so that the original instruction always remains in the raw conversation history.",
      "Add the rule to the project-root CLAUDE.md, which Claude Code re-reads and re-injects after compaction.",
      "Put the rule in a nested CLAUDE.md under src/, which is pinned to the context once it has been loaded."
     ],
     "answer": 2,
     "explain": "Đúng: docs Memory (Instructions seem lost after /compact): CLAUDE.md ở gốc project tồn tại qua compaction — sau /compact Claude đọc lại từ đĩa và đưa lại vào session; nếu một chỉ dẫn biến mất sau compaction thì có thể nó chỉ được nói trong hội thoại; thêm vào CLAUDE.md để nó bền vững. Sai: tin nhắn hội thoại chính là thứ bị tóm tắt, nhắc lại sau mỗi lần là thủ công và không đáng tin. Tắt compaction chỉ hoãn vấn đề và có thể làm cạn context. CLAUDE.md lồng nhau nạp lại theo nhu cầu sau compaction, không \"ghim\" cố định.",
     "sc": "s2",
     "ts": [
      "3.1"
     ]
    },
    {
     "q": "A repository already has an AGENTS.md used by several coding tools, and Claude Code was reading it as project instructions. A developer then commits a small CLAUDE.md with a few Claude-specific notes, and Claude stops following the AGENTS.md conventions. What is the simplest fix?",
     "options": [
      "Rename AGENTS.md to CLAUDE.local.md so that both files are loaded side by side for every developer.",
      "Add a sentence to CLAUDE.md telling Claude to open and read AGENTS.md before starting each task.",
      "Delete CLAUDE.md, since Claude Code can never load both an AGENTS.md and a CLAUDE.md in one session.",
      "Add an @AGENTS.md import at the top of CLAUDE.md, followed by the Claude-specific notes."
     ],
     "answer": 3,
     "explain": "Đúng: docs Memory (AGENTS.md) ghi mặc định Claude chỉ đọc AGENTS.md khi không có CLAUDE.md/CLAUDE.local.md ở thư mục làm việc trở lên; khi có CLAUDE.md, cách giữ một file chung cho mọi công cụ là đặt @AGENTS.md trong CLAUDE.md rồi viết phần riêng cho Claude bên dưới. (Docs hiện ghi việc đọc trực tiếp AGENTS.md cần Claude Code v2.1.277 trở lên, tháng 11/2026.) Sai: CLAUDE.local.md là file cá nhân nên gitignore, đổi tên làm các công cụ khác mất file. Câu dặn bằng lời chỉ khiến Claude thấy AGENTS.md nếu nó quyết định mở file. \"Không bao giờ nạp cả hai\" sai: import, hoặc đổi thiết lập Project instructions thành claude-md-and-agents-md, đều nạp cả hai.",
     "sc": "s2",
     "ts": [
      "3.1"
     ]
    },
    {
     "q": "A security team must make sure that every developer's Claude Code session, on every machine in the organization, receives the company's secure-coding guidance, and that \"never read files under /secrets\" is actually enforced. Which setup fits BEST?",
     "options": [
      "Deploy a managed-policy CLAUDE.md for the guidance, and enforce the rule with a deny rule in managed settings.",
      "Commit the guidance and the rule to each repository's CLAUDE.md and ask teams not to remove them.",
      "Ask every developer to paste both into ~/.claude/CLAUDE.md during onboarding and to keep the file up to date.",
      "Put both in a shared skill with user-invocable: false so that Claude loads it automatically when relevant."
     ],
     "answer": 0,
     "explain": "Đúng: docs Memory mô tả CLAUDE.md ở vị trí managed policy (ví dụ /Library/Application Support/ClaudeCode/CLAUDE.md trên macOS) áp dụng cho mọi người dùng trên máy và không bị loại bằng claudeMdExcludes; docs khuyên dùng file đó cho hướng dẫn, còn cưỡng chế quy tắc thì dùng managed settings như permissions.deny, thứ người dùng và project không ghi đè được. Sai: CLAUDE.md của repo chỉ phủ repo đó và chỉ là context. File user phụ thuộc từng người và không có cưỡng chế. Skill chỉ nạp khi Claude thấy liên quan và vẫn là lời dặn, không chặn được việc đọc file.",
     "sc": "s2",
     "ts": [
      "3.1"
     ]
    },
    {
     "q": "A developer has a deploy skill in ~/.claude/skills/deploy/ and the repository has its own deploy skill in .claude/skills/deploy/. Separately, she has a reviewer subagent in ~/.claude/agents/ and the repository defines a reviewer subagent in .claude/agents/. Which TWO statements are correct? (Choose TWO.)",
     "options": [
      "Typing /deploy runs the project skill, because committed project configuration always overrides personal configuration.",
      "Typing /deploy runs her personal skill, because personal skills take precedence over project skills with the same name.",
      "Delegating to reviewer uses the repository's subagent, because project subagents take precedence over user subagents.",
      "Both reviewer subagents load, and Claude merges their tool lists and prompts into one definition.",
      "Claude Code refuses to start when a skill or subagent name is defined at more than one level."
     ],
     "answer": [
      1,
      2
     ],
     "explain": "Đúng: docs Skills (Resolve skills that share a name): enterprise thắng personal, personal thắng project; ví dụ chính thức là deploy ở cả ~/.claude/skills/ và .claude/skills/ thì /deploy chạy bản personal. Docs Subagents (Choose the subagent scope): khi trùng tên dùng nơi ưu tiên cao hơn, thứ tự managed > --agents CLI > .claude/agents/ (project) > ~/.claude/agents/ (user) > plugin. Hai cơ chế có thứ tự ngược nhau, đây là bẫy hay gặp. Sai: project không phải lúc nào cũng thắng. Subagent không gộp định nghĩa. Trùng tên không làm Claude Code dừng.",
     "sc": "s2",
     "ts": [
      "3.2"
     ]
    },
    {
     "q": "A /analyze-dependencies skill scans the codebase and prints hundreds of lines of intermediate output into the main conversation, crowding out the actual task. The skill's instructions are self-contained and need nothing from the current conversation. Which frontmatter change BEST helps?",
     "options": [
      "disable-model-invocation: true, so that the skill's output is hidden from Claude's context window.",
      "context: fork, so the skill runs in a separate subagent and only its result returns.",
      "user-invocable: false, so that the skill runs silently in the background whenever Claude needs it.",
      "allowed-tools: Read Grep, so that the skill is limited to tools that produce shorter output."
     ],
     "answer": 1,
     "explain": "Đúng: docs Skills (Run skills in a subagent): context: fork chạy skill trong subagent riêng với nội dung skill làm prompt; subagent không thấy lịch sử hội thoại nên skill phải tự đủ — đúng trường hợp này — và kết quả trả về hội thoại chính khi xong. Sai: disable-model-invocation chỉ ngăn Claude tự gọi skill, không ẩn output. user-invocable: false chỉ ẩn khỏi menu /, không đổi nơi chạy. allowed-tools chỉ cấp quyền dùng tool không cần hỏi trong lượt gọi skill, không giới hạn tool hay độ dài output.",
     "sc": "s2",
     "ts": [
      "3.2"
     ]
    },
    {
     "q": "A team writes a /db-report skill with allowed-tools: Bash(psql *), intending to stop Claude from using any other tool while the skill runs. During a run Claude still calls Edit. Why, and what would restrict the tools?",
     "options": [
      "allowed-tools only applies to skills invoked by Claude; a skill typed as /db-report ignores the field entirely.",
      "The field must be named tools in SKILL.md, as in subagent files, or Claude Code ignores it without warning.",
      "allowed-tools only pre-approves the listed tools for that turn; disallowed-tools removes tools while the skill is active.",
      "Edit is a core tool that no frontmatter field can ever remove, so a PreToolUse hook is the only option."
     ],
     "answer": 2,
     "explain": "Đúng: docs Skills (Pre-approve tools for a skill): allowed-tools cấp quyền cho các tool liệt kê trong lượt gọi skill để Claude không phải hỏi; nó không hạn chế tool nào khả dụng. Muốn bỏ tool khỏi bộ tool khi skill đang hoạt động thì liệt kê trong disallowed-tools (hạn chế hết khi bạn gửi tin nhắn tiếp theo). Sai: allowed-tools áp dụng khi skill được gọi, dù do bạn hay Claude. Skill dùng allowed-tools, còn tools là trường của subagent. disallowed-tools bỏ được Edit (docs chỉ nêu ngoại lệ là EndConversation).",
     "sc": "s2",
     "ts": [
      "3.2"
     ]
    },
    {
     "q": "A team has a 40-step release checklist (version bumps, changelog, tagging, artifact verification) that is needed only a few times a month. It currently sits in CLAUDE.md. What is the BEST place for it?",
     "options": [
      "Keep it in CLAUDE.md, but move it to the end of the file so it has less effect on unrelated tasks.",
      "A path-scoped rule with paths: [\"**/*\"], so it loads whenever Claude touches any file in the repository.",
      "A managed-policy CLAUDE.md, so that the checklist is applied consistently across all repositories.",
      "A project skill, so only its short description is in context until someone invokes it."
     ],
     "answer": 3,
     "explain": "Đúng: docs Memory khuyên CLAUDE.md chỉ chứa thứ cần trong mọi session; mục là quy trình nhiều bước hoặc chỉ liên quan một phần codebase nên chuyển sang skill hoặc path-scoped rule. Docs Skills: mặc định chỉ mô tả skill nằm trong context, nội dung đầy đủ chỉ nạp khi được gọi. Sai: để cuối file vẫn tốn context mọi session. Rule với paths khớp mọi file thì gần như luôn được nạp. Managed CLAUDE.md nạp cho mọi session của mọi người, càng lãng phí.",
     "sc": "s2",
     "ts": [
      "3.2"
     ]
    },
    {
     "q": "A team's CLAUDE.md says \"never read or modify anything under vendor/.\" When Claude delegates a broad search to the built-in Explore subagent, the results include vendor/ files. Why?",
     "options": [
      "Explore starts without CLAUDE.md files, so the rule must be restated in the delegation prompt.",
      "Explore ignores CLAUDE.md only in plan mode; switching back to default mode makes it load the file again.",
      "Subagents only receive ~/.claude/CLAUDE.md and never the project's CLAUDE.md, whichever agent is used.",
      "The rule must be phrased as an @import of a vendor policy file before any subagent will read it."
     ],
     "answer": 0,
     "explain": "Đúng: docs Subagents (Built-in subagents, What loads at startup): Explore và Plan khởi động không có CLAUDE.md và git status để nghiên cứu nhanh, rẻ; docs khuyên nếu một quy tắc bắt buộc phải tới subagent, như \"bỏ qua thư mục vendor/\", thì nhắc lại trong prompt khi giao việc. (Muốn cưỡng chế thật thì dùng deny rule.) Sai: không phụ thuộc chế độ plan. Subagent khác (built-in khác và custom) có nạp đủ phân cấp CLAUDE.md, gồm cả project. Import không thay đổi việc Explore bỏ qua CLAUDE.md.",
     "sc": "s2",
     "ts": [
      "3.4"
     ]
    },
    {
     "q": "A developer pastes a stack trace showing a null check missing in one function and asks Claude Code to fix it. The fix is a single obvious line, and there is an existing unit test for the function. How should the developer proceed?",
     "options": [
      "Start in plan mode and ask for a written plan with alternatives, as every change benefits from an approved plan first.",
      "Let Claude make the fix directly and run the existing test, without a planning phase.",
      "Ask Claude to interview them about requirements and write a SPEC.md before touching the code.",
      "Delegate the fix to a subagent so that the change happens in an isolated context window."
     ],
     "answer": 1,
     "explain": "Đúng (lời khuyên thiết kế): plan mode (docs Permission modes) là để Claude nghiên cứu và đề xuất trước khi sửa, hữu ích khi có nhiều cách làm hợp lý hoặc thay đổi lớn; với lỗi rõ ràng, phạm vi một dòng và đã có test, làm thẳng rồi chạy test là đủ (Best practices: cho Claude một bài kiểm tra pass/fail để tự xác nhận). Sai: lập kế hoạch cho mọi thay đổi chỉ thêm chi phí. Phỏng vấn viết SPEC dành cho khi chưa rõ mình muốn gì. Subagent khởi đầu với context mới, phải tự thu thập lại ngữ cảnh; Best practices ghi giao cho subagent không làm câu trả lời tốt hơn.",
     "sc": "s2",
     "ts": [
      "3.4"
     ]
    },
    {
     "q": "A product manager wants Claude Code to add rate limiting to the public API but has not decided on per-user versus per-key limits, behavior over the limit, or scope. Which workflow does the Claude Code best-practices guide recommend?",
     "options": [
      "Tell Claude to implement the most common rate-limiting approach now and adjust it after code review.",
      "Run the task with claude -p in CI so that the implementation does not depend on the PM's availability.",
      "Ask Claude to interview them until it can write a SPEC.md, then build from it in a fresh session.",
      "Write every possible requirement into CLAUDE.md so that Claude can choose the right one by itself."
     ],
     "answer": 2,
     "explain": "Đúng: trang Best practices (Brainstorm with Claude first) gợi ý khi chưa rõ mình muốn gì, bảo Claude phỏng vấn cho đến khi viết được spec vào SPEC.md, rồi mở session mới để xây từ spec đó với context sạch và định nghĩa \"xong\" rõ ràng; SPEC.md cũng là thứ để reviewer đối chiếu sau. Sai: tự chọn cách phổ biến là đoán thay cho quyết định chỉ PM biết. Chạy -p không giải quyết việc thiếu yêu cầu. Nhồi mọi khả năng vào CLAUDE.md làm phình context và vẫn không chứa quyết định.",
     "sc": "s2",
     "ts": [
      "3.5"
     ]
    },
    {
     "q": "Claude Code keeps declaring a date-parsing bug \"fixed,\" but the developer finds it still broken each time. The repository has a test runner, but no test reproduces this bug. What is the MOST effective next step?",
     "options": [
      "Ask Claude to be more careful and to double-check its reasoning before it declares the bug fixed again.",
      "Raise the effort level to max so that Claude reasons more deeply about the date-parsing logic.",
      "Switch to acceptEdits mode so Claude can iterate faster without waiting for edit approvals.",
      "Ask Claude to write a failing test that reproduces the bug, then fix the code until that test passes."
     ],
     "answer": 3,
     "explain": "Đúng: Best practices (Give Claude a check to run): Claude dừng khi việc trông như đã xong; nếu có thứ trả về pass/fail, Claude tự đóng vòng lặp — sửa, chạy kiểm tra, đọc output và sửa tiếp; bảng ví dụ prompt tốt cũng có \"viết một test thất bại tái hiện lỗi rồi sửa\". Sai: dặn \"cẩn thận hơn\" không cho Claude cách xác minh. Effort cao hơn vẫn không có bằng chứng khách quan. acceptEdits chỉ bỏ bước duyệt sửa file, không xác minh gì.",
     "sc": "s2",
     "ts": [
      "3.5"
     ]
    },
    {
     "q": "A developer has corrected Claude twice in the same session about how to structure a migration, and the third attempt is still wrong. According to the Claude Code best-practices guide, what should she do next?",
     "options": [
      "Run /clear and start over with one better prompt that includes what she has learned.",
      "Send a third, more forceful correction in capital letters so that Claude finally gives it priority.",
      "Run /compact so that the two failed attempts are summarized and Claude focuses only on the latest correction.",
      "Fork the session twice and keep whichever branch eventually produces the right structure."
     ],
     "answer": 0,
     "explain": "Đúng: Best practices (Steer the session): sau hai lần sửa không thành, chạy /clear và viết prompt tốt hơn thay vì sửa lần thứ ba; lần sửa thứ ba chủ yếu thêm vào hội thoại vốn đã chứa hai lần thất bại mà Claude cứ đọc lại; /clear cộng một prompt mới gói những gì đã học hầu như luôn tốt hơn. Sai: viết hoa/nhấn mạnh không phải cách khắc phục (docs ghi nó dễ khiến áp quá đà). /compact vẫn giữ bản tóm tắt các lần thất bại. Fork vẫn mang theo lịch sử sai.",
     "sc": "s2",
     "ts": [
      "3.5"
     ]
    },
    {
     "q": "A nightly claude -p job on a shared build server refactors a module and opens a pull request. The server holds deployment credentials. Which TWO options keep the run bounded and limited to the actions the team pre-approved? (Choose TWO.)",
     "options": [
      "--allowedTools listing the needed tools, combined with --permission-mode dontAsk.",
      "--dangerously-skip-permissions, so the job never stalls waiting for an approval.",
      "--continue, so each night's run builds on the previous night's conversation.",
      "--max-turns (or --max-budget-usd) to cap how long the run can go on.",
      "--verbose, so every tool call is logged for review the next morning."
     ],
     "answer": [
      0,
      3
     ],
     "explain": "Đúng: docs Headless/Best practices: --allowedTools tự duyệt các tool liệt kê, còn --permission-mode dontAsk từ chối mọi thứ khác lẽ ra phải hỏi, hợp với CI bị khóa chặt; --max-turns và --max-budget-usd (chỉ ở print mode) là thứ \"dừng nó lại\" trong danh sách kiểm tra trước khi để run tự chạy. Sai: bỏ qua mọi quyền trên máy có credentials triển khai là rủi ro lớn; docs chỉ khuyên bypass trong môi trường cô lập. --continue nối hội thoại cũ, không giới hạn hay khoanh quyền. --verbose chỉ ghi log, không ngăn hành động nào.",
     "sc": "s5",
     "ts": [
      "3.6"
     ]
    },
    {
     "q": "A CI job runs a Claude review on every push to a pull request. After each new commit it posts the same findings again, so developers see duplicate comments on unchanged code. What is the BEST fix?",
     "options": [
      "Run the review only once per pull request, on the first push, and skip every later commit.",
      "Include the earlier findings in the prompt and ask Claude to report only new or still-unresolved issues.",
      "Use --continue in CI so that the reviewer automatically remembers what it commented last time.",
      "Raise the severity threshold so that fewer findings are posted on each run of the review."
     ],
     "answer": 1,
     "explain": "Đúng (lời khuyên thiết kế cho CI): mỗi run claude -p là một lần độc lập; đưa kết quả review trước vào context và yêu cầu chỉ báo vấn đề mới hoặc chưa được sửa là cách tránh lặp bình luận mà vẫn review code mới. Sai: chỉ review lần đầu sẽ bỏ sót lỗi ở commit sau. --continue mở hội thoại gần nhất trên máy đó; runner CI thường là máy tạm và file session nằm cục bộ, nên không đáng tin (docs Sessions). Nâng ngưỡng giảm số bình luận nhưng vẫn lặp lại những phát hiện cũ, còn có thể giấu lỗi thật.",
     "sc": "s5",
     "ts": [
      "3.6"
     ]
    },
    {
     "q": "A team's committed .claude/settings.json sets \"spinnerTipsEnabled\": true. A developer set it to false in ~/.claude/settings.json, but tips still appear in this project. How can she turn them off for herself in this project only, without affecting teammates?",
     "options": [
      "Set it to false again in ~/.claude/settings.json, but add it near the top of the file so that it is read first.",
      "Edit the committed .claude/settings.json and ask teammates who want tips to override it in their user settings.",
      "Set it to false in .claude/settings.local.json in this project.",
      "Pass the value in CLAUDE.md, since instructions in CLAUDE.md override values set in settings files."
     ],
     "answer": 2,
     "explain": "Đúng: docs Settings (Settings precedence) xếp từ cao xuống: managed, command line (--settings), project local (.claude/settings.local.json), shared project (.claude/settings.json), user; docs dùng đúng ví dụ spinnerTipsEnabled: team đặt true thì project thắng user, và đặt false trong settings.local.json sẽ lấy lại giá trị của bạn mà không đổi gì cho đồng đội. Sai: vị trí trong file không đổi thứ tự ưu tiên. Sửa file chung ảnh hưởng cả team, và user settings của đồng đội lại thấp hơn project. CLAUDE.md là chỉ dẫn cho mô hình, không phải cấu hình.",
     "sc": "s2",
     "ts": [
      "3.1"
     ]
    },
    {
     "q": "A CI script runs claude -p with --system-prompt \"You are a strict security reviewer...\" Reviews have become worse at using tools and ignore the repository's git context. What change keeps the reviewer persona while restoring Claude Code's normal behavior?",
     "options": [
      "Add the persona to the repository's CLAUDE.md and also keep the --system-prompt flag for emphasis.",
      "Pass --verbose so that Claude Code prints the full system prompt and loads the missing defaults.",
      "Use --model with a larger model, which compensates for the missing parts of the system prompt.",
      "Use --append-system-prompt instead, which adds the text to the end of the default system prompt."
     ],
     "answer": 3,
     "explain": "Đúng: CLI reference: --system-prompt thay toàn bộ system prompt mặc định; --append-system-prompt nối thêm vào cuối prompt mặc định, giữ hành vi mặc định của Claude Code. Docs Headless còn ghi nếu thay prompt thì run cũng khởi động không có git status snapshot. Sai: giữ --system-prompt thì prompt mặc định vẫn bị thay. --verbose chỉ tăng log, không khôi phục gì. Model lớn hơn không bù được phần system prompt đã mất.",
     "sc": "s5",
     "ts": [
      "3.6"
     ]
    },
    {
     "q": "A CI step runs claude -p --output-format json --json-schema '...' and then reads the structured_output field. Most runs work, but occasionally the script crashes because structured_output is missing. What should the script do?",
     "options": [
      "Check that structured_output is present before using it, and handle runs that ended without valid structured output.",
      "Add \"required\" to every property in the schema, which guarantees that structured_output is always present in the output.",
      "Switch to --output-format text and parse the JSON from the plain text output with a regular expression.",
      "Retry the run with --continue, which always returns the structured_output of the previous run."
     ],
     "answer": 0,
     "explain": "Đúng: docs Headless (Get structured output): kết quả theo schema nằm ở trường structured_output; nếu run kết thúc mà không có structured output hợp lệ, ví dụ Claude từ chối yêu cầu, response không có trường structured_output, nên kiểm tra trường đó tồn tại trước khi dùng. Sai: required chỉ ràng buộc nội dung khi có output, không ngăn trường hợp run không tạo được output. Parse text bằng regex kém tin cậy hơn. --continue không có hành vi trả lại output cũ.",
     "sc": "s5",
     "ts": [
      "3.6"
     ]
    },
    {
     "q": "A team wants claude -p to run git diff commands without prompting and adds --allowedTools \"Bash(git diff*)\". Later they notice Claude also ran git diff-index without being asked to approve it. Why, and how should the rule be written?",
     "options": [
      "Bash rules use regular expressions, so the rule must be written \"Bash(^git diff$)\" to match exactly.",
      "Without a space before *, the prefix also matches git diff-index; write \"Bash(git diff *)\".",
      "--allowedTools ignores arguments and allows every git command, so a PreToolUse hook is the only option.",
      "The rule needs quotes around the command, as in \"Bash('git diff')\", to stop prefix matching."
     ],
     "answer": 1,
     "explain": "Đúng: docs Headless (Create a commit): --allowedTools dùng cú pháp permission rule; dấu \" *\" ở cuối bật khớp tiền tố, nên Bash(git diff *) cho mọi lệnh bắt đầu bằng \"git diff\"; khoảng trắng trước * là quan trọng, thiếu nó thì Bash(git diff*) khớp cả git diff-index. Sai: Bash rule dùng mẫu wildcard, không phải regex. --allowedTools không bỏ qua đối số; rule có specifier chỉ khớp lệnh tương ứng. Không có cú pháp dấu nháy như vậy.",
     "sc": "s5",
     "ts": [
      "3.6"
     ]
    },
    {
     "q": "A team connects an MCP server named \"github\" in Claude Code. Which TWO statements about referring to its tools are correct? (Choose TWO.)",
     "options": [
      "In permission rules, tools are referenced as github:tool_name, the same form used for MCP resources.",
      "In permission rules, \"mcp__github\" matches every tool from the github server, as does \"mcp__github__*\".",
      "Hook matchers and permission rules both treat \"mcp__github\" as a regular expression matching any tool name containing it.",
      "MCP tools cannot be referenced in permission rules at all and can only be controlled with hooks.",
      "In a hook matcher, \"mcp__github\" matches no tool; the matcher must be \"mcp__github__.*\"."
     ],
     "answer": [
      1,
      4
     ],
     "explain": "Đúng: docs Permissions (MCP): \"mcp__puppeteer\" khớp mọi tool của server puppeteer, \"mcp__puppeteer__*\" cũng vậy. Hooks reference: matcher chỉ gồm ký tự khớp-chính-xác được so sánh nguyên chuỗi, nên \"mcp__memory\" không khớp tool nào; cần \"mcp__memory__.*\". Cùng một chuỗi nhưng hai cơ chế hiểu khác nhau, đây là bẫy hay gặp. Sai: dạng server:path là cú pháp @ tham chiếu resource, không phải permission rule. Không phải regex ở cả hai nơi (matcher chỉ thành regex khi có ký tự khác). Permission rule hỗ trợ MCP tool.",
     "ts": [
      "2.4"
     ]
    },
    {
     "q": "A security reviewer notes that a nightly claude -p job runs inside arbitrary contributor branches. Because -p sessions show no approval prompt, any MCP server a branch adds to .mcp.json would connect automatically. The job itself needs exactly one approved server. Which option addresses this?",
     "options": [
      "Run claude mcp reset-project-choices before each job so that the approval prompt appears again.",
      "Rely on the workspace trust dialog, which -p sessions show before connecting to project servers.",
      "Run with --strict-mcp-config and pass only the approved server via --mcp-config.",
      "Set MCP_TIMEOUT to 0 so that project-scoped servers never have time to connect during the run."
     ],
     "answer": 2,
     "explain": "Đúng: docs MCP (Project scope) ghi trong claude -p, Agent SDK và một số phiên cloud, Claude Code không hiện prompt duyệt nên nạp server project-scoped mà không hỏi; cách chặn gồm disabledMcpjsonServers, loại project settings bằng --setting-sources, hoặc --strict-mcp-config để chỉ dùng server truyền qua --mcp-config. (--bare cũng bỏ qua .mcp.json.) Sai: reset-project-choices chỉ đặt lại lựa chọn duyệt cho phiên tương tác, -p vẫn không hiện prompt. Docs Headless ghi -p không hiện hộp thoại workspace trust. MCP_TIMEOUT là thời gian chờ khởi động, đặt 0 không phải cơ chế bảo mật được docs hỗ trợ.",
     "sc": "s5",
     "ts": [
      "3.6",
      "2.4"
     ]
    },
    {
     "q": "Before complex refactors, a developer prefixes every prompt with \"think very hard, step by step\" expecting Claude Code to reason more deeply. According to the Claude Code best-practices guide, what is accurate?",
     "options": [
      "The phrase is a reserved keyword that permanently raises the session's effort level to max.",
      "Claude Code strips these phrases from prompts, so they have no effect at all on the response.",
      "The phrase only works when written in CLAUDE.md, where it applies to every prompt in the session.",
      "Such phrases are ordinary prompt text; the effort level is the main control for how hard Claude thinks."
     ],
     "answer": 3,
     "explain": "Đúng: Best practices (Write a specific prompt, What you can stop doing): các cụm như \"think step by step\", \"be thorough\" là chữ bình thường trong prompt, không phải từ khóa; điều khiển chính là effort level; những cụm đó chỉ đẩy nhẹ trong phạm vi effort hiện tại. Docs ghi riêng \"ultrathink\" vẫn yêu cầu suy luận sâu hơn cho đúng lượt đó mà không đổi thiết lập effort. Sai: không có từ khóa nào nâng effort vĩnh viễn. Claude Code không xóa các cụm này. Đặt trong CLAUDE.md không biến nó thành điều khiển effort.",
     "sc": "s2",
     "ts": [
      "3.5"
     ]
    },
    {
     "q": "A team that uses Claude Code for daily feature work copied rule files from another editor into .claude/rules/. Their testing.md starts with the frontmatter line globs: \"**/*.test.ts\". The testing conventions now show up in every session, even sessions that never touch a test file. What is the cause, and what is the fix?",
     "options": [
      "Every file in .claude/rules/ loads at launch whatever its frontmatter says; move the conventions into a CLAUDE.md file placed inside each test directory.",
      "The pattern is wrapped in quotes, which makes it match every file in the project; remove the quotes so that only test files match the pattern.",
      "Claude Code reads only paths in rule frontmatter and ignores other fields, so the rule is unscoped and loads at launch; rename globs to paths.",
      "Rule patterns must be absolute paths from the filesystem root; rewrite the pattern as /**/*.test.ts so that it is anchored correctly."
     ],
     "answer": 2,
     "explain": "Docs memory ghi: paths là trường duy nhất Claude Code đọc trong frontmatter của rule, trường khác bị bỏ qua không báo lỗi; rule không có paths được nạp lúc khởi động như .claude/CLAUDE.md. Vì vậy globs: khiến rule thành rule không phạm vi; đổi thành paths: là đúng. \"Mọi rule đều nạp lúc khởi động\" sai: rule có paths chỉ nạp khi Claude đọc/ghi/sửa file khớp; rải CLAUDE.md vào từng thư mục test cũng là cách vụng cho quy ước rải khắp repo. Dấu nháy không sao: chính ví dụ trong docs viết pattern trong dấu nháy. Pattern tính tương đối từ thư mục chứa .claude; dấu / ở đầu nghĩa là \"ngay trong thư mục gốc đó\", không phải gốc hệ thống file.",
     "sc": "s2",
     "ts": [
      "3.3"
     ]
    },
    {
     "q": "In a React repository where the team generates components with Claude Code, .claude/rules/components.md has the frontmatter paths: [\"src/components/*.tsx\"]. The conventions load when Claude edits src/components/Button.tsx, but not when it edits src/components/forms/DatePicker.tsx. What should the team change?",
     "options": [
      "Change the pattern to src/components/**/*.tsx, because a single * does not match across directory levels.",
      "Move the rule into src/components/CLAUDE.md, because path-scoped rules can never match files in nested folders.",
      "Rename the rule file to components-forms.md so that the loader associates the rule with the forms folder too.",
      "Run /memory after every edit, which forces path-scoped rules to reload for files deeper in the directory tree."
     ],
     "answer": 0,
     "explain": "Theo bảng pattern trong docs memory, src/components/*.tsx chỉ khớp file .tsx nằm trực tiếp trong src/components/, không khớp thư mục con; muốn khớp mọi cấp thì dùng ** (ví dụ src/components/**/*.tsx). Rule theo đường dẫn hoàn toàn khớp được thư mục lồng nhau (**/*.ts là ví dụ trong docs), nên chuyển sang CLAUDE.md con là không cần. Tên file rule chỉ để người đọc dễ hiểu, không ảnh hưởng việc khớp. /memory dùng để xem và sửa file memory đã nạp, không làm pattern khớp thêm file.",
     "sc": "s2",
     "ts": [
      "3.3"
     ]
    },
    {
     "q": "A developer's long Claude Code session works on the payments package. Its conventions come from the project-root CLAUDE.md, from packages/payments/CLAUDE.md, and from a rule in .claude/rules/ with paths: [\"packages/payments/**\"]. The session then compacts. Which TWO statements describe what happens to these instructions? (Choose TWO.)",
     "options": [
      "The project-root CLAUDE.md is re-read from disk and re-injected into the compacted session.",
      "The path-scoped rule is re-injected right away, because Claude Code tracks every rule that had loaded before compaction.",
      "The path-scoped rule and packages/payments/CLAUDE.md load again on demand, when Claude next reads, writes, or edits a file there.",
      "packages/payments/CLAUDE.md is merged into the root CLAUDE.md on disk so that its content can never be lost again.",
      "All instructions stay lost until the developer restarts Claude Code, because compaction clears every memory file."
     ],
     "answer": [
      0,
      2
     ],
     "explain": "Docs (memory và context-window) ghi: sau compaction, CLAUDE.md ở gốc project và rule không có paths được đọc lại từ đĩa và đưa lại vào; còn CLAUDE.md lồng trong thư mục con và rule có paths chỉ nạp lại theo nhu cầu, khi Claude đọc/ghi/sửa file khớp (chúng nằm trong lịch sử nên bị tóm tắt cùng phần còn lại). Vì vậy \"rule theo đường dẫn được đưa lại ngay\" sai. Claude Code không gộp file CLAUDE.md trên đĩa. Compaction cũng không xóa sạch chỉ dẫn, không cần khởi động lại. Docs gợi ý: rule nào phải sống qua compaction thì bỏ paths hoặc chuyển vào CLAUDE.md gốc.",
     "sc": "s2",
     "ts": [
      "3.3",
      "3.1"
     ]
    },
    {
     "q": "A developer asks Claude Code to change a shared TypeScript type in packages/core and update every call site across six packages. The session will be long and is expected to compact several times, and the team worries that later edits will drift from decisions made at the start. Which approach BEST keeps the change consistent?",
     "options": [
      "Split the work into six separate sessions, one per package, and tell each session only to fix the call sites inside its own package directory.",
      "Turn off automatic compaction and keep working in the same session until the context window is completely full.",
      "Paste the full list of decisions into the prompt again after every few edits, written in capital letters and marked IMPORTANT.",
      "Plan first in plan mode, so Claude writes the plan to a file, and approve it; Claude Code re-injects that plan file after each compaction."
     ],
     "answer": 3,
     "explain": "Trang large-codebases của Claude Code khuyên với thay đổi xuyên nhiều package: giao trọn thay đổi trong một phiên và lập kế hoạch trước bằng plan mode; Claude ghi plan ra file và Claude Code đưa lại file plan sau mỗi lần compaction (bảng \"What survives compaction\" cũng ghi plan được re-inject từ đĩa), nên quyết định ban đầu không mất. Chia sáu phiên làm mỗi phiên tự suy lại quyết định, docs nói rõ giao một phiên giữ quyết định nhất quán hơn. Tắt compaction rồi chạy tới đầy context thì phiên không đi tiếp được. Dán lại bằng chữ hoa là mẹo cũ; best practices nói thêm IMPORTANT/ALL CAPS không còn là cách đúng.",
     "sc": "s2",
     "ts": [
      "3.4",
      "5.4"
     ]
    },
    {
     "q": "A developer asks Claude Code to write a function that normalizes customer names from a legacy import, so that \"MCDONALD, ronald j.\" becomes \"Ronald J. McDonald\". After two rounds of prose explanations, the output is still wrong for name prefixes, suffixes such as Jr., and initials. What is the MOST effective next step?",
     "options": [
      "Describe the rules again in more detail, putting extra emphasis on the parts of the rules that Claude got wrong in the earlier attempts.",
      "Give several input/output pairs covering the prefix, suffix, and initial cases, and have Claude turn them into tests it must pass.",
      "Ask Claude to think harder about naming conventions in general before it writes the next version of the function.",
      "Switch to plan mode so that Claude presents a plan for the function before it writes any more of the code."
     ],
     "answer": 1,
     "explain": "Với phép biến đổi khó tả bằng lời, cách hiệu quả là đưa vài cặp ví dụ input/output cụ thể, gồm cả ca biên, và biến chúng thành test để Claude có phép kiểm đạt/không đạt mà tự lặp đến khi đúng (best practices: \"Give Claude a check to run\"). Đây là lời khuyên thực hành, khớp với phần tinh chỉnh dần trong exam guide. Viết lại mô tả dài hơn, nhấn mạnh hơn vẫn là cùng một kênh đã thất bại hai lần; docs còn khuyên sau hai lần sửa không được thì viết prompt tốt hơn thay vì sửa lần ba. \"Think harder\" chỉ là chữ thường trong prompt, không phải từ khóa nâng mức suy nghĩ. Plan mode hợp cho thay đổi lớn nhiều hướng; ở đây vấn đề là thiếu đặc tả, không phải thiếu kế hoạch.",
     "sc": "s2",
     "ts": [
      "3.5"
     ]
    },
    {
     "q": "A team has a /scaffold-endpoint command defined in .claude/commands/scaffold-endpoint.md. They now want the workflow to use a template file and a helper script that live next to the instructions and are versioned with them. What is the BEST way to set this up?",
     "options": [
      "Convert it into a skill at .claude/skills/scaffold-endpoint/SKILL.md and keep the template and script in that directory.",
      "Keep the command file as it is and paste the full template and script into the project CLAUDE.md, so that they are always loaded.",
      "Move the command file into ~/.claude/commands/ so that the command can read supporting files from the developer's home directory.",
      "Replace the command with a PreToolUse hook that runs the helper script whenever Claude is about to create a new file."
     ],
     "answer": 0,
     "explain": "Docs skills ghi: file trong .claude/commands/ là định dạng cũ, vẫn chạy, nhưng nên dùng skill cho việc mới vì skill hỗ trợ supporting files; thư mục .claude/skills/<tên>/ chứa SKILL.md cùng template, script và vẫn tạo lệnh /scaffold-endpoint, commit được để cả nhóm dùng. Dán template và script vào CLAUDE.md làm chúng chiếm context ở mọi phiên dù không liên quan. Chuyển sang ~/.claude/commands/ biến lệnh thành của riêng một người, không còn chia sẻ qua repo, và không giải quyết chuyện file đi kèm. Hook PreToolUse dùng để chặn hoặc kiểm tra lời gọi tool, không phải nơi đặt một quy trình người dùng chủ động gọi.",
     "sc": "s2",
     "ts": [
      "3.2"
     ]
    },
    {
     "q": "A developer starts Claude Code at the root of a large monorepo. As Claude touches files across the tree, CLAUDE.md files from packages owned by other teams, which she never works on, load and add conflicting conventions. She wants those files skipped in her own sessions without changing anything for her teammates. What should she do?",
     "options": [
      "Delete the other teams' CLAUDE.md files in her checkout and never commit the deletion.",
      "Add a line to ~/.claude/CLAUDE.md telling Claude to ignore other teams' instructions.",
      "Add those packages' paths to claudeMdExcludes in .claude/settings.local.json.",
      "Start every session with --bare, so that no CLAUDE.md file loads, not even the root one."
     ],
     "answer": 2,
     "explain": "Docs memory và large-codebases mô tả đúng tình huống này: trong monorepo, dùng claudeMdExcludes để bỏ qua CLAUDE.md của nhóm khác, và đặt nó trong .claude/settings.local.json để thay đổi chỉ áp dụng trên máy mình. Xóa file trong bản checkout là thao tác dễ lỡ commit và phải làm lại mỗi lần pull. Một dòng trong CLAUDE.md cá nhân chỉ là chỉ dẫn mềm, các file kia vẫn được nạp vào context và vẫn mâu thuẫn. --bare bỏ luôn CLAUDE.md gốc và cả hook, skill, MCP, nên mất cả những quy ước cô cần.",
     "sc": "s2",
     "ts": [
      "3.1"
     ]
    },
    {
     "q": "A developer reviews a pagination module that Claude Code just generated and finds four problems. The cursor is encoded in a format the API client cannot decode, and the client's retry logic depends on that same cursor format. Separately, a log message has a typo and an unrelated helper lacks a docstring. How should she give this feedback?",
     "options": [
      "Describe the two cursor problems together in one message, since a fix to one changes the other; the typo and docstring can follow separately.",
      "Report the four problems strictly one at a time, waiting for each fix before mentioning the next, so Claude only ever has one thing to think about.",
      "Ask Claude to regenerate the whole module without naming any specific problems, because pointing out details biases the next attempt.",
      "Fix the cursor format by hand and leave only the typo and docstring to Claude, because Claude cannot handle changes that depend on each other."
     ],
     "answer": 0,
     "explain": "Lời khuyên thực hành (exam guide 3.5): vấn đề tương tác với nhau thì gom vào một tin nhắn, vấn đề độc lập thì xử lý tuần tự cũng được. Định dạng cursor và logic retry phụ thuộc nhau; nêu riêng từng cái thì bản sửa đầu có thể làm hỏng cái sau và phải sửa đi sửa lại. Lỗi chính tả và docstring độc lập nên tách ra không gây xung đột. Báo từng vấn đề một kể cả vấn đề tương tác là đúng kiểu dễ sinh vòng sửa qua lại. Tạo lại cả module mà không nêu lỗi cụ thể bỏ mất thông tin quý nhất. Claude làm được thay đổi phụ thuộc nhau khi được mô tả cùng lúc; tự sửa tay không cần thiết.",
     "sc": "s2",
     "ts": [
      "3.5"
     ]
    },
    {
     "q": "A developer wants her personal Python preferences (type hints on every public function, pathlib instead of os.path) applied whenever Claude works on .py files, in every repository on her machine, without committing anything to those repositories. What should she create?",
     "options": [
      ".claude/rules/python.md with paths: [\"**/*.py\"] in each repository",
      "A paths line in ~/.claude/CLAUDE.md that limits it to Python files",
      "A \"rules\" key in ~/.claude/settings.json listing the preferences",
      "~/.claude/rules/python.md with paths: [\"**/*.py\"]"
     ],
     "answer": 3,
     "explain": "Docs memory: rule cá nhân trong ~/.claude/rules/ áp dụng cho mọi project trên máy; với rule cấp user, pattern trong paths tính từ thư mục làm việc chính của phiên, nên **/*.py khớp file Python ở bất kỳ repo nào. Đặt rule trong .claude/rules/ của từng repo là đổi repo của người khác và phải commit. CLAUDE.md không có cơ chế paths; trường này chỉ có ở rule (và skill). Settings không có khóa \"rules\" chứa chỉ dẫn; chỉ dẫn cho model nằm trong CLAUDE.md và rule, còn settings là cấu hình harness.",
     "sc": "s4",
     "ts": [
      "3.3"
     ]
    },
    {
     "q": "An internal code-review assistant built with the TypeScript Agent SDK sets settingSources: [\"user\"] so that each engineer's personal settings apply. Its reviews ignore the conventions in the repository's CLAUDE.md, even though the agent runs with cwd set to the repository. What explains this?",
     "options": [
      "The SDK never reads CLAUDE.md files at all, so their content always has to be passed in through the systemPrompt option instead.",
      "CLAUDE.md loads only together with the claude_code system prompt preset, which this assistant does not set.",
      "Project CLAUDE.md and rules load only with the \"project\" source, and an explicit settingSources list must include it.",
      "The user source overrides the project source, so each engineer's personal CLAUDE.md hides the project's file."
     ],
     "answer": 2,
     "explain": "Docs SDK (Use Claude Code features, modifying system prompts): bỏ trống settingSources tương đương [\"user\", \"project\", \"local\"]; khi đặt danh sách tường minh thì chỉ nạp các nguồn có trong đó, và CLAUDE.md/rule của project thuộc nguồn \"project\". Danh sách chỉ có \"user\" nên CLAUDE.md của repo không nạp. SDK có đọc CLAUDE.md khi nguồn tương ứng bật. Docs nói rõ việc nạp CLAUDE.md do setting sources điều khiển, không phải preset claude_code. Các file CLAUDE.md được nối lại chứ không ghi đè nhau.",
     "sc": "s4",
     "ts": [
      "3.1"
     ]
    },
    {
     "q": "After a long design discussion in Claude Code, a developer runs /write-adr, a project skill whose SKILL.md says \"Write an ADR recording the decisions made in this conversation\" and whose frontmatter sets context: fork. The ADR comes back generic and names none of the decisions. What explains this, and what is the fix?",
     "options": [
      "context: fork removes every tool from the skill, so it cannot open the session transcript; add Read to the skill's allowed-tools.",
      "Add agent: Plan to the frontmatter, because Plan is the one agent type that receives the parent conversation when a skill forks.",
      "A context: fork skill runs in a subagent that doesn't see the conversation; drop context: fork, or fork the conversation instead.",
      "Project skills cannot see conversation history in any mode, so the decisions must first be copied into the project's CLAUDE.md."
     ],
     "answer": 2,
     "explain": "Docs skills (Run skills in a subagent): với context: fork, Claude Code khởi động subagent mới thuộc loại ghi trong agent và đưa nội dung SKILL.md làm prompt; subagent không thấy lịch sử hội thoại, nên skill phải tự đủ. Docs nói rõ dù tên là fork, skill context: fork không phải fork của hội thoại hiện tại; khi task phụ thuộc lịch sử, hãy fork hội thoại thay vì dùng context: fork. Bỏ context: fork thì nội dung skill được nạp vào chính hội thoại đang có các quyết định. Fork không gỡ tool của subagent, và allowed-tools chỉ tự duyệt tool chứ không cấp quyền đọc hội thoại. Không loại agent nào nhận lịch sử khi skill fork; Plan còn khởi động không có CLAUDE.md. Skill chạy trong phiên chính (không fork) thấy hội thoại, nên \"không bao giờ\" là sai.",
     "sc": "s4",
     "ts": [
      "3.2"
     ]
    },
    {
     "q": "A migration assistant built on the Agent SDK starts each session with permissionMode \"plan\" so users approve a plan before anything changes. Its implementer subagent's AgentDefinition sets permissionMode \"acceptEdits\". A tester worries the subagent could edit source files while the session is still planning. What happens?",
     "options": [
      "The subagent's acceptEdits setting wins, so it edits files during planning, and the plan only constrains what the main agent may do.",
      "It still runs in plan mode, so its Edit and Write calls on source files go to the canUseTool callback instead of being auto-approved.",
      "Subagents cannot be started at all while the main session is in plan mode, so the implementer is simply never invoked by the agent.",
      "Plan mode applies only to Bash commands, so file edits by any agent are approved automatically for as long as that mode is active."
     ],
     "answer": 1,
     "explain": "Docs SDK permissions (Subagent inheritance): nếu phiên chính ở plan mode, subagent có AgentDefinition đặt acceptEdits vẫn chạy ở plan mode; lời gọi Edit/Write lên file nguồn của nó vẫn đi tới canUseTool. Plan mode giữ cho cả subagent để việc giao việc không lách được bước duyệt plan. Vì vậy \"acceptEdits thắng\" sai. Subagent vẫn được gọi trong plan mode (ví dụ Plan subagent dùng để nghiên cứu). Plan mode chặn sửa source cho đến khi plan được duyệt, không phải chỉ áp dụng cho Bash.",
     "sc": "s4",
     "ts": [
      "3.4",
      "1.3"
     ]
    },
    {
     "q": "A CI step runs claude -p \"Review this diff\" --json-schema '<schema>' and pipes stdout into a script that reads the structured_output field. The script fails because stdout is plain text, not a JSON object with a structured_output field. What is missing from the command?",
     "options": [
      "--verbose, which must be present before Claude Code will validate the final output against the supplied JSON Schema",
      "--bare, because Claude Code produces structured output only in runs that skip hooks, skills, and CLAUDE.md",
      "--max-turns 1, because structured output is available only for single-turn runs that make no tool calls at all",
      "--output-format json, which --json-schema needs so the result is a JSON object containing structured_output"
     ],
     "answer": 3,
     "explain": "Docs headless: muốn output theo schema thì dùng --output-format json cùng --json-schema; response JSON chứa metadata và kết quả trong trường structured_output. Thiếu --output-format json thì định dạng output là mặc định (text), nên script không có object JSON để đọc. --verbose chỉ bật log chi tiết từng lượt (hay đi kèm stream-json), không phải điều kiện validate. --bare chỉ bỏ auto-discovery để tái lập, không liên quan structured output. --json-schema trả JSON hợp lệ sau khi agent làm xong workflow, tức là vẫn dùng tool được, không giới hạn một lượt.",
     "sc": "s5",
     "ts": [
      "3.6"
     ]
    },
    {
     "q": "A CI job runs claude -p \"Run the unit tests and fix any failures\" with no permission-related flags. The log shows that Claude's attempts to run npm test were denied, and the job ends with a note that it could not run the tests. Which TWO changes would let Claude run the tests and apply fixes in this non-interactive job? (Choose TWO.)",
     "options": [
      "Add \"You have permission to run npm test\" to the prompt text of the job",
      "Add --allowedTools \"Bash(npm test *)\" \"Edit\" so those calls are pre-approved",
      "Add --permission-mode plan so that Claude can work through the fix while it plans",
      "Add --permission-mode auto so a classifier reviews each action instead of a person",
      "Add --output-format stream-json so that approval prompts appear in the job log"
     ],
     "answer": [
      1,
      3
     ],
     "explain": "Docs permission-modes: từ v2.1.302, claude -p không đặt mode sẽ chạy ở Manual mode (giá trị cấu hình default); lời gọi cần duyệt bị từ chối trừ khi có allow rule, hook, --permission-prompt-tool. Docs đưa hai cách: thêm allow rule qua --allowedTools, hoặc chạy --permission-mode auto để classifier xét từng hành động (auto mode cần model được hỗ trợ và tổ chức không tắt nó). Câu trong prompt không phải permission. Plan mode chặn sửa source cho đến khi plan được duyệt, nên không áp dụng được bản sửa. Định dạng output không tạo ra lời nhắc duyệt nào; ở -p không có người để duyệt.",
     "sc": "s5",
     "ts": [
      "3.6"
     ]
    },
    {
     "q": "A team's claude -p CI job relies on a PostToolUse hook in the repository's .claude/settings.json that runs the formatter after every edit. To stop runner-specific configuration from changing results, they add --bare. Now the formatter never runs. What should they do?",
     "options": [
      "Keep --bare and pass the hook in a --settings file, which bare mode loads in place of the project's own settings file.",
      "Keep --bare and load the hook from a plugin with --plugin-dir, because bare mode still runs hooks from plugins given by flag.",
      "Drop --bare for this job, since bare mode runs no hooks at all, and narrow what loads in another way, e.g. --setting-sources.",
      "Keep --bare and add --append-system-prompt \"run the formatter after each edit\", which bare mode treats as a hook."
     ],
     "answer": 2,
     "explain": "Docs headless (Start faster with bare mode): --bare bỏ auto-discovery hook, skill, plugin, MCP, CLAUDE.md…; và hook vẫn không chạy trong bare mode kể cả khi truyền qua --settings hay qua hooks/hooks.json của plugin nạp bằng cờ; docs ghi rõ đừng dùng bare mode cho run cần hook. Vì vậy phải bỏ --bare cho job này. Muốn giảm khác biệt giữa các runner thì dùng cách khác, ví dụ --setting-sources project để không đọc settings cấp user/local trên máy runner (lời khuyên; hook của project vẫn chạy). Hai phương án --settings và --plugin-dir trái với docs. Câu trong system prompt chỉ là lời dặn cho model, không phải hook do harness chạy.",
     "sc": "s5",
     "ts": [
      "3.6"
     ]
    },
    {
     "q": "A CI job asks claude -p to generate unit tests for each module a pull request changes. Reviewers find that many generated tests repeat scenarios already covered by the existing test files, while edge cases remain untested. What is the BEST improvement?",
     "options": [
      "Ask for twice as many tests per module, so that the number of new cases outweighs the duplicated ones in the end.",
      "Include each module's existing tests in the job's context and ask only for behaviors and edge cases those tests do not cover yet.",
      "Delete the existing test files before the job starts, so that Claude cannot possibly repeat any scenario that they already cover.",
      "Raise --max-turns for the job, so that Claude spends more turns on each module while it generates the tests."
     ],
     "answer": 1,
     "explain": "Exam guide 3.6 nêu đúng kỹ thuật này: đưa test hiện có vào context để test sinh ra không trùng, và chỉ định rõ phần cần bổ sung (hành vi, ca biên chưa được phủ). Tăng số lượng chỉ thêm nhiều test trùng hơn. Xóa test hiện có làm mất bảo vệ hồi quy và thật ra không loại được việc viết lại cùng kịch bản. Thêm lượt cho Claude không cho nó biết test nào đã có.",
     "sc": "s5",
     "ts": [
      "3.6"
     ]
    },
    {
     "q": "A team's CI runs claude -p on the head branch of every pull request, including PRs from forks. A security review points out that a contributor could add a hook to the branch's .claude/settings.json, and a -p run shows no workspace trust dialog. The job itself needs nothing from the repository's settings files. Which TWO options keep such hooks from running? (Choose TWO.)",
     "options": [
      "Set disableAllHooks to true in the runner's ~/.claude/settings.json, which overrides whatever a branch adds",
      "Rely on the workspace trust dialog, which a -p run shows before it runs hooks from an unfamiliar folder",
      "Run with --bare, which reads no hooks, skills, subagents, plugins, or .mcp.json servers from the project",
      "Run with --setting-sources user, so Claude Code reads neither the project's settings files nor its .mcp.json",
      "Add --output-format json, which disables hooks because hooks cannot write to stdout in JSON mode"
     ],
     "answer": [
      2,
      3
     ],
     "explain": "Docs permissions (mục What runs before you trust a folder): claude -p và SDK không bao giờ hiện trust dialog, và hook trong settings file của repo vẫn được dùng. Trước khi chạy -p trên repo mình không viết, docs liệt kê các cách: --setting-sources user (không đọc settings file lẫn .mcp.json của project), --bare (không đọc hook, skill, subagent, plugin, server .mcp.json của project), hoặc truyền --settings '{\"disableAllHooks\": true}' cho lần chạy đó. Docs nói rõ đặt disableAllHooks chỉ trong user settings là không đủ, vì project settings ưu tiên hơn và có thể đặt lại thành false. Phương án dựa vào trust dialog trái docs. Định dạng output không tắt hook.",
     "sc": "s5",
     "ts": [
      "3.6"
     ]
    },
    {
     "q": "A team uses the Claude Code GitHub Action to run a review skill that should post findings as inline pull-request comments. The skill's allowed-tools frontmatter names mcp__github_inline_comment__create_inline_comment, but no inline comments appear. According to the Action's documentation, what is needed?",
     "options": [
      "List that tool in --allowedTools inside claude_args; the Action starts the inline-comment MCP server only when it is named there.",
      "Mention the tool in the repository's CLAUDE.md, which the Action reads to decide which MCP servers it should start for a run.",
      "Set --output-format json in claude_args, because inline comments can be posted only from runs that return structured results.",
      "Rename the skill to code-review, which is the only skill name that the Action allows to post inline comments on a pull request."
     ],
     "answer": 0,
     "explain": "Docs GitHub Actions (mục Run a skill) ghi rõ: giữ dòng claude_args có --allowedTools \"mcp__github_inline_comment__create_inline_comment\" dù frontmatter allowed-tools của skill đã nêu cùng tool, vì Action chỉ khởi động MCP server đăng bình luận inline khi --allowedTools trong claude_args nêu tên nó. CLAUDE.md là chỉ dẫn cho model, không điều khiển Action khởi động server nào. Định dạng output không quyết định việc đăng bình luận. Không có giới hạn tên skill như vậy.",
     "sc": "s5",
     "ts": [
      "3.6",
      "2.4"
     ]
    },
    {
     "q": "A CI job generates tests for new code, but about a third of the generated tests fail to compile or fail on their first run, so developers fix them by hand. The job's prompt only says \"write thorough tests.\" Which change BEST improves the result?",
     "options": [
      "Pre-approve the test command with --allowedTools and have Claude run it, iterating until the new tests compile and pass.",
      "Add \"make sure the tests compile\" to the prompt, while still not allowing Claude to run any commands during the job.",
      "Request fewer tests per module, since a smaller number of generated tests is less likely to contain mistakes.",
      "Generate the tests in plan mode, so that Claude writes a detailed test plan that a developer later turns into working test code by hand."
     ],
     "answer": 0,
     "explain": "Best practices: Claude dừng khi việc trông có vẻ xong; cho nó một phép kiểm trả về đạt/không đạt (test, build) thì nó tự chạy, đọc lỗi, sửa và chạy lại, và nên đòi bằng chứng là output lệnh đã chạy. Trong -p, lệnh test phải được duyệt trước (ví dụ --allowedTools). Dặn \"đảm bảo compile\" mà không cho chạy lệnh thì Claude không có cách kiểm. Giảm số test không sửa nguyên nhân. Plan mode chỉ tạo kế hoạch, không tạo test chạy được, và đẩy việc lại cho developer.",
     "sc": "s5",
     "ts": [
      "3.5",
      "3.6"
     ]
    }
   ],
   "summary": [
    "Quy ước cả team đặt trong ./CLAUDE.md hoặc ./.claude/CLAUDE.md (hoặc .claude/rules/) và commit; ~/.claude/CLAUDE.md chỉ có trên máy bạn, CLAUDE.local.md là ghi chú cá nhân cho project hiện tại.",
    "CLAUDE.md ở thư mục hiện tại và thư mục cha nạp lúc khởi động; CLAUDE.md ở thư mục con chỉ nạp khi Claude chạm file trong thư mục đó. @path import tính từ file chứa nó, tối đa bốn tầng, không giảm chi phí context.",
    "Quy ước rải khắp repo (vd. **/*.test.ts) dùng file .claude/rules/ có frontmatter paths: chỉ nạp khi làm việc với file khớp. Mỗi CLAUDE.md nên dưới 200 dòng; chỉ dẫn mâu thuẫn làm Claude chọn tùy ý.",
    "Custom command đã gộp vào skill: .claude/commands/x.md và .claude/skills/x/SKILL.md đều tạo /x. Skill project ở .claude/skills/ (commit), skill cá nhân ở ~/.claude/skills/.",
    "Frontmatter skill: disable-model-invocation: true để chỉ người dùng gọi được, context: fork để chạy trong subagent, $ARGUMENTS nhận đối số. Skill chỉ nạp mô tả lúc đầu còn CLAUDE.md luôn nạp, nên quy trình ít dùng nên làm thành skill.",
    "Plan mode (đọc và đề xuất, không sửa cho đến khi duyệt) dành cho thay đổi lớn, nhiều cách làm, codebase lạ; việc nhỏ, rõ ràng thì làm thẳng; khám phá tốn context thì giao subagent Explore.",
    "Permission rule đánh giá deny, rồi ask, rồi allow; allow không khoét được ngoại lệ trong deny. Settings ưu tiên từ cao xuống: managed, --settings, .claude/settings.local.json, .claude/settings.json, ~/.claude/settings.json.",
    "Trong CI: claude -p chạy không tương tác rồi thoát; --output-format json cùng --json-schema đưa kết quả vào structured_output (kiểm tra trường này tồn tại trước khi dùng); --bare để tái lập, truyền context tường minh bằng cờ.",
    "Review trong CI bằng phiên độc lập với phiên viết code; truyền các phát hiện cũ vào để tránh bình luận trùng.",
    "Tinh chỉnh dần: prompt cụ thể, vài cặp ví dụ input/output gồm ca biên, phép kiểm đạt/không đạt (test, Stop hook exit 2); yêu cầu mơ hồ thì để Claude phỏng vấn, ghi SPEC.md rồi xây trong phiên mới; sửa hai lần vẫn sai thì /clear."
   ]
  },
  {
   "id": "d4",
   "name": "Prompt Engineering & Structured Output",
   "weight": 20,
   "intro": "<p>Domain này hỏi cách viết prompt cho hệ thống chạy thật: tiêu chí rõ ràng thay cho lời dặn mơ hồ, few-shot đúng chỗ, cấu trúc prompt bằng XML, ép output có cấu trúc bằng tool hoặc JSON schema, vòng lặp validate rồi retry, đánh đổi khi dùng Message Batches API, và review nhiều lượt.</p>\n<p>Ranh giới: viết mô tả tool để Claude <em>chọn đúng tool</em> thuộc Domain 2. Ở đây tool được dùng như một <em>khuôn output</em>. Độ tin cậy khi context dài và hiệu chuẩn confidence thuộc Domain 5.</p>",
   "lessons": [
    {
     "id": "l-4-0",
     "title": "Nền tảng: prompt trong hệ thống thật, output máy đọc được và vòng kiểm tra",
     "minutes": 13,
     "html": "<p>Đề Domain 4 hiếm khi hỏi “prompt hay là gì”. Nó kể một hệ thống: pipeline trích xuất hóa đơn, bot review PR trong CI, bộ phân loại ticket. Bạn phải biết Claude nằm ở đâu trong hệ thống, request gửi đi gồm gì, output quay về được kiểm tra ra sao. Bài này dựng khung đó.</p>\n<h4>1. Một hệ thống điển hình</h4>\n<pre>tài liệu / diff / ticket\n      |\n      v\n[1] code dựng request  --&gt;  [2] Claude  --&gt;  [3] output có cấu trúc\n                                                  |\n                         [5] retry kèm lỗi &lt;-- [4] validator trong code\n                                                  |\n                                    hợp lệ --&gt; lưu / đăng bình luận\n                                    hết lượt --&gt; hàng đợi người xem</pre>\n<p>Mỗi bài trong domain sửa một ô: tiêu chí và ví dụ trong request (ô 1), cách ép cấu trúc (ô 3), validate và retry (ô 4–5), chạy hàng loạt bằng batch, và ai kiểm lại output.</p>\n<h4>2. Request gửi những gì</h4>\n<table>\n<thead><tr><th>Phần</th><th>Đặt gì vào</th></tr></thead>\n<tbody>\n<tr><td><code>system</code></td><td>Vai trò, tiêu chí, quy tắc định dạng; áp dụng cho cả hội thoại</td></tr>\n<tr><td><code>messages</code></td><td>Dữ liệu của lần này (tài liệu, diff) và câu hỏi. Tài liệu dài đặt trước, câu hỏi sau</td></tr>\n<tr><td><code>tools</code>, <code>tool_choice</code></td><td>Tool để hành động hoặc làm khuôn output</td></tr>\n<tr><td><code>output_config.format</code></td><td>JSON schema cho câu trả lời (structured outputs)</td></tr>\n<tr><td><code>thinking</code>, <code>output_config.effort</code></td><td>Mức suy nghĩ trước khi trả lời</td></tr>\n</tbody>\n</table>\n<p>Docs prompting nói một câu vai trò trong system prompt đã đủ tạo khác biệt về hành vi và giọng điệu, ví dụ “Bạn là kỹ sư review bảo mật cho dịch vụ thanh toán”.</p>\n<h4>3. Bốn đòn bẩy khi Claude trả sai ý</h4>\n<ol>\n<li><strong>Tiêu chí tường minh và lý do</strong>: thay “chỉ báo cái quan trọng” bằng danh sách báo gì, bỏ gì, mức độ; nói vì sao (l-4-1).</li>\n<li><strong>Ví dụ</strong>: vài ví dụ liên quan, đa dạng, đặt ở ca mơ hồ (l-4-1).</li>\n<li><strong>Cấu trúc bằng thẻ XML</strong>: tách chỉ dẫn, bối cảnh, dữ liệu; tài liệu dài lên đầu (l-4-2).</li>\n<li><strong>Chia bước</strong>: một lời gọi làm một việc, có kiểm tra giữa các bước (l-1-5).</li>\n</ol>\n<div class=\"warn\">Prefill (điền sẵn đầu câu trả lời của assistant, ví dụ mở sẵn dấu <code>{</code> để ép JSON) là mẹo cũ. Docs hiện ghi (tháng 11/2026): từ các model Claude 4.6 trở đi, prefill ở lượt assistant cuối không còn được hỗ trợ và trả lỗi 400. Docs đề nghị dùng structured outputs để ép định dạng, và chỉ dẫn trực tiếp trong system prompt để bỏ câu dẫn. Gặp đáp án “prefill dấu ngoặc nhọn” trong tình huống dùng model mới thì cảnh giác.</div>\n<h4>4. Ba cách lấy JSON, ba mức bảo đảm</h4>\n<table>\n<thead><tr><th>Cách</th><th>Bảo đảm gì</th><th>Khi nào dùng</th></tr></thead>\n<tbody>\n<tr><td>Dặn trong prompt “chỉ trả JSON theo mẫu”</td><td>Không bảo đảm; thỉnh thoảng thiếu trường, thừa câu dẫn</td><td>Prototype, không có code nào phụ thuộc</td></tr>\n<tr><td>JSON outputs: <code>output_config.format</code> với <code>type: \"json_schema\"</code></td><td>Constrained decoding: parse được, đúng kiểu, đủ trường bắt buộc</td><td>Câu trả lời có một khuôn cố định</td></tr>\n<tr><td>Strict tool use: tool có <code>input_schema</code> và <code>strict: true</code></td><td>Input của lời gọi tool khớp schema</td><td>Đã có kiến trúc tool, hoặc chọn giữa nhiều khuôn</td></tr>\n</tbody>\n</table>\n<p>Ngoại lệ docs nêu cho structured outputs: <code>stop_reason: \"refusal\"</code>, bị cắt ở <code>max_tokens</code>, và chữ hoa/thường của giá trị <code>enum</code> không được bảo đảm. Schema cũng có giới hạn (không hỗ trợ <code>minimum</code>, <code>maxLength</code>, schema đệ quy…), xem l-4-3.</p>\n<h4>5. Cú pháp khác ngữ nghĩa</h4>\n<p>Schema bảo đảm <em>hình dạng</em>, không bảo đảm <em>đúng</em>. JSON hợp lệ vẫn có thể có tổng các dòng khác tổng in trên hóa đơn, ngày điền vào nhầm trường, số đọc sai. Vì thế ô 4 là code kiểm tra quy tắc nghiệp vụ, và ô 5 gửi lại tài liệu, output cũ và lỗi cụ thể. Retry vô ích khi dữ liệu không có trong tài liệu: khi đó trả <code>null</code> và chuyển người xem.</p>\n<h4>6. Cho Claude suy nghĩ</h4>\n<p>Docs hiện ghi (tháng 11/2026): các model 4.6 trở đi dùng <strong>adaptive thinking</strong> (<code>thinking: {type: \"adaptive\"}</code>), Claude tự quyết khi nào và nghĩ bao nhiêu, dựa trên tham số effort và độ phức tạp câu hỏi; một số model mới nhất luôn bật thinking. Thinking thủ công với <code>budget_tokens</code> là cách cũ, trả lỗi 400 trên Claude 4.7 trở đi. Docs Claude Code cũng ghi các cụm như “think step by step” chỉ là chữ thường trong prompt, không phải từ khóa nâng mức suy nghĩ.</p>\n<div class=\"tip\">Với structured outputs, docs cảnh báo một trường yêu cầu model ghi “suy luận từng bước” có thể gây từ chối loại <code>reasoning_extraction</code>. Nếu cần, xin một lời giải thích ngắn thay vì toàn bộ chuỗi suy luận.</div>\n<h4>7. Thời gian thực hay hàng loạt</h4>\n<p>Gọi Messages API bình thường thì có kết quả ngay. <strong>Message Batches API</strong> nhận cả lô, rẻ 50%, phần lớn lô xong dưới 1 giờ nhưng có thể tới 24 giờ, kết quả không theo thứ tự nên khớp bằng <code>custom_id</code> (l-4-4). Quy tắc: có người hoặc hệ thống đang chờ thì không dùng batch.</p>\n<h4>8. Ai kiểm lại output</h4>\n<p>Phiên đã tạo ra kết quả mang theo lập luận của chính nó nên dễ bỏ sót lỗi của mình. Kiểm tra nên do một <strong>instance độc lập</strong> làm, và việc lớn thì chia lượt (theo file, rồi một lượt tích hợp).</p>\n<h4>Bản đồ Domain 4</h4>\n<table>\n<thead><tr><th>Bài</th><th>Ô trong hệ thống</th></tr></thead>\n<tbody>\n<tr><td>l-4-1 Tiêu chí rõ ràng và few-shot</td><td>Ô 1: nội dung chỉ dẫn và ví dụ</td></tr>\n<tr><td>l-4-2 Cấu trúc prompt bằng XML, tài liệu dài</td><td>Ô 1: bố cục request</td></tr>\n<tr><td>l-4-3 Output có cấu trúc, validate rồi retry</td><td>Ô 3–5: ép schema, kiểm tra, gọi lại kèm lỗi</td></tr>\n<tr><td>l-4-4 Batches API và review nhiều lượt</td><td>Chạy hàng loạt; ai kiểm lại</td></tr>\n<tr><td>l-4-5 Trích xuất nhiều loại tài liệu</td><td>Ô 1–4 cho pipeline trích xuất: chọn schema, chuẩn hóa, trường tự kiểm</td></tr>\n<tr><td>l-4-6 Thiết kế bot review tự động</td><td>Ô 3–5 cho bot review: finding có cấu trúc, đo false positive, lượt xác minh</td></tr>\n</tbody>\n</table>",
     "keypoints": [
      "Khung hệ thống: dựng request → Claude → output có cấu trúc → validator trong code → retry kèm lỗi hoặc chuyển người.",
      "Đòn bẩy prompt: tiêu chí tường minh kèm lý do, ví dụ ở ca mơ hồ, thẻ XML, chia bước.",
      "Docs hiện ghi prefill ở lượt assistant cuối trả lỗi 400 từ model 4.6; dùng structured outputs để ép định dạng.",
      "Structured outputs bảo đảm cú pháp và kiểu, không bảo đảm ngữ nghĩa; ngoại lệ refusal, max_tokens, chữ hoa enum.",
      "Model mới dùng adaptive thinking điều khiển bằng effort; 'think step by step' không phải từ khóa."
     ],
     "sources": [
      {
       "t": "Prompting best practices",
       "u": "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices"
      },
      {
       "t": "Structured outputs",
       "u": "https://platform.claude.com/docs/en/build-with-claude/structured-outputs"
      },
      {
       "t": "Batch processing",
       "u": "https://platform.claude.com/docs/en/build-with-claude/batch-processing"
      },
      {
       "t": "Best practices for Claude Code (prompt wording vs effort)",
       "u": "https://code.claude.com/docs/en/best-practices"
      }
     ],
     "ts": [
      "4.1",
      "4.2",
      "4.3",
      "4.4"
     ]
    },
    {
     "id": "l-4-1",
     "title": "Tiêu chí rõ ràng và few-shot",
     "minutes": 12,
     "html": "<h4>“Hãy thận trọng” không phải là tiêu chí</h4>\n<p>Một bot review code được dặn “be conservative, only report important issues” vẫn đăng hàng chục bình luận về đặt tên biến. Dev bắt đầu phớt lờ bot, kể cả khi nó bắt được lỗi thật. Gốc rễ: “quan trọng” chưa được định nghĩa. Model phải tự đoán ranh giới, và mỗi lần đoán một kiểu.</p>\n<p>Cách sửa là viết <strong>tiêu chí tường minh</strong>: báo gì, bỏ gì, và mức nghiêm trọng nghĩa là gì, kèm ví dụ cụ thể.</p>\n<pre>&lt;review_criteria&gt;\nBÁO CÁO:\n- Lỗi logic làm sai kết quả (điều kiện đảo ngược, off-by-one, thiếu xử lý null)\n- Lỗ hổng bảo mật (SQL injection, lộ secret, thiếu kiểm tra quyền)\n- Thay đổi phá vỡ API công khai\n\nBỎ QUA:\n- Style, format, đặt tên (linter đã lo)\n- Gợi ý refactor \"cho đẹp\" không đổi hành vi\n\nMỨC ĐỘ:\n- high: gây lỗi dữ liệu hoặc bảo mật ở production. Ví dụ: query ghép chuỗi từ input người dùng\n- medium: sai ở edge case. Ví dụ: chia cho 0 khi danh sách rỗng\n&lt;/review_criteria&gt;</pre>\n<p>Docs prompting cũng khuyên <strong>giải thích lý do</strong> đằng sau chỉ dẫn. Ví dụ thay vì “không dùng dấu ba chấm”, hãy nói “output sẽ được đọc bằng text-to-speech nên đừng dùng dấu ba chấm”. Claude khái quát được từ lời giải thích. Với hệ review, nói rõ “bình luận sai làm dev mất niềm tin vào công cụ” giúp model cân nhắc false positive.</p>\n<div class=\"tip\">Một danh mục cứ sinh false positive thì tạm tắt nó trong khi cải thiện prompt cho danh mục đó. Đừng để nó làm mất niềm tin vào các danh mục đang chạy tốt.</div>\n<div class=\"warn\">Đáp án nhiễu hay gặp: “chỉ báo khi confidence &gt; 90%”. Ngưỡng tự tin do model tự báo không định nghĩa được <em>loại</em> vấn đề cần báo, và theo exam guide CCAR-F, điểm tự tin do model tự báo thường hiệu chuẩn kém (đây là nguyên tắc thiết kế, không phải giới hạn ghi trong docs API).</div>\n<h4>Few-shot: khi mô tả bằng lời chưa đủ</h4>\n<p>Theo docs, ví dụ là một trong những cách đáng tin nhất để điều khiển <strong>định dạng, giọng điệu và cấu trúc</strong> output. Vài ví dụ tốt (few-shot, multishot) tăng độ chính xác và tính nhất quán. Ví dụ nên:</p>\n<ul>\n<li><strong>Liên quan</strong>: sát với tình huống thật.</li>\n<li><strong>Đa dạng</strong>: phủ edge case, khác nhau đủ để Claude không bắt chước một mẫu ngoài ý muốn.</li>\n<li><strong>Có cấu trúc</strong>: bọc trong <code>&lt;example&gt;</code> (nhiều ví dụ thì trong <code>&lt;examples&gt;</code>) để tách khỏi chỉ dẫn.</li>\n<li>Docs gợi ý <strong>3–5 ví dụ</strong> cho kết quả tốt nhất.</li>\n</ul>\n<h4>Đặt ví dụ vào chỗ mơ hồ</h4>\n<p>Ví dụ có giá trị nhất khi nằm ở <strong>ranh giới khó phân định</strong>, không phải trường hợp hiển nhiên. Phân loại ticket “billing” hay “account”: thêm ví dụ cho ca rõ ràng gần như vô ích. Ví dụ cho ca lưng chừng, kèm một câu giải thích <em>vì sao</em> chọn nhãn đó, giúp model khái quát sang ca mới thay vì chỉ bắt chước bề mặt.</p>\n<pre>&lt;examples&gt;\n&lt;example&gt;\nTicket: \"Tôi bị trừ tiền hai lần sau khi đổi email đăng nhập\"\nLabel: billing\nLý do: vấn đề cốt lõi là giao dịch trùng; đổi email chỉ là bối cảnh.\n&lt;/example&gt;\n&lt;example&gt;\nTicket: \"Không đăng nhập được nên không xem được hóa đơn\"\nLabel: account\nLý do: cần khôi phục quyền truy cập trước; hóa đơn không có lỗi.\n&lt;/example&gt;\n&lt;/examples&gt;</pre>\n<h4>Few-shot trong trích xuất dữ liệu</h4>\n<ul>\n<li>Thêm ví dụ tài liệu <strong>thiếu</strong> một trường, với output mong đợi là <code>null</code>. Ví dụ này dạy model không bịa giá trị.</li>\n<li>Thêm ví dụ cho các <strong>định dạng khác nhau</strong> của cùng một thông tin (ngày viết kiểu Mỹ và kiểu châu Âu, số tiền có hoặc không có ký hiệu tiền tệ) cùng output đã chuẩn hóa.</li>\n</ul>",
     "keypoints": [
      "Thay lời dặn mơ hồ ('thận trọng', 'quan trọng') bằng tiêu chí tường minh: báo gì, bỏ gì, mức độ, kèm ví dụ.",
      "Giải thích lý do đằng sau chỉ dẫn để Claude khái quát được.",
      "Few-shot nên liên quan, đa dạng, bọc trong thẻ example; docs gợi ý 3–5 ví dụ.",
      "Ví dụ có giá trị nhất ở ca mơ hồ, kèm lý do chọn nhãn.",
      "Trích xuất: ví dụ có trường thiếu thì ra null; ví dụ cho các định dạng khác nhau."
     ],
     "sources": [
      {
       "t": "Prompting best practices",
       "u": "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices"
      }
     ],
     "ts": [
      "4.1",
      "4.2"
     ]
    },
    {
     "id": "l-4-2",
     "title": "Cấu trúc prompt bằng XML và tài liệu dài",
     "minutes": 11,
     "html": "<p>Prompt trong hệ thống thật thường trộn nhiều loại nội dung: chỉ dẫn, bối cảnh, ví dụ, dữ liệu đầu vào biến đổi theo từng request. Docs cho biết thẻ XML giúp Claude phân tích các prompt như vậy <strong>không mơ hồ</strong>: bọc mỗi loại nội dung trong một thẻ riêng (<code>&lt;instructions&gt;</code>, <code>&lt;context&gt;</code>, <code>&lt;input&gt;</code>) giảm hiểu nhầm.</p>\n<h4>Nguyên tắc dùng thẻ</h4>\n<ul>\n<li>Tên thẻ <strong>nhất quán, mô tả rõ</strong> nội dung, dùng giống nhau giữa các prompt.</li>\n<li><strong>Lồng thẻ</strong> khi nội dung có thứ bậc tự nhiên (các <code>&lt;document&gt;</code> nằm trong <code>&lt;documents&gt;</code>).</li>\n<li>Mẹo thêm (danh sách best practices của docs hiện chỉ có hai ý trên): nhắc tới thẻ trong chỉ dẫn: “dựa vào hợp đồng trong thẻ <code>&lt;contract&gt;</code>…”.</li>\n<li>Tách rõ <em>chỉ dẫn</em> với <em>dữ liệu</em>. Nội dung từ nguồn không tin cậy (email khách gửi, trang web) chỉ là dữ liệu cần xử lý, không phải lệnh. Docs tool use khuyên giữ nội dung không tin cậy trong khối <code>tool_result</code>, đừng đưa vào system prompt.</li>\n</ul>\n<h4>Tài liệu dài: đặt dữ liệu lên đầu</h4>\n<p>Với input lớn, docs khuyên:</p>\n<ol>\n<li><strong>Đặt tài liệu dài ở đầu prompt</strong>, phía trên câu hỏi, chỉ dẫn và ví dụ. Docs ghi trong thử nghiệm, đặt câu hỏi ở cuối có thể cải thiện chất lượng tới khoảng 30%, nhất là với input nhiều tài liệu phức tạp.</li>\n<li><strong>Bọc mỗi tài liệu</strong> trong <code>&lt;document&gt;</code> với thẻ con <code>&lt;source&gt;</code> và <code>&lt;document_content&gt;</code> (và metadata khác).</li>\n<li><strong>Yêu cầu trích dẫn trước</strong>: bảo Claude trích các đoạn liên quan ra trước, rồi mới làm nhiệm vụ. Việc này giúp tập trung vào phần liên quan và bỏ qua phần còn lại.</li>\n</ol>\n<pre>&lt;documents&gt;\n  &lt;document index=\"1\"&gt;\n    &lt;source&gt;master_services_agreement_2024.pdf&lt;/source&gt;\n    &lt;document_content&gt;\n      {{CONTRACT_TEXT}}\n    &lt;/document_content&gt;\n  &lt;/document&gt;\n  &lt;document index=\"2\"&gt;\n    &lt;source&gt;amendment_03.pdf&lt;/source&gt;\n    &lt;document_content&gt;\n      {{AMENDMENT_TEXT}}\n    &lt;/document_content&gt;\n  &lt;/document&gt;\n&lt;/documents&gt;\n\n&lt;instructions&gt;\n1. Trích nguyên văn mọi điều khoản về chấm dứt hợp đồng và phạt vi phạm vào thẻ &lt;quotes&gt;,\n   ghi rõ tài liệu nguồn và số điều.\n2. Dựa CHỈ trên các trích dẫn đó, trả lời câu hỏi trong &lt;question&gt;.\n3. Nếu bản sửa đổi thay thế điều khoản gốc, nói rõ điều này.\n&lt;/instructions&gt;\n\n&lt;question&gt;Bên mua có thể chấm dứt sớm không mất phí trong trường hợp nào?&lt;/question&gt;</pre>\n<h4>Điều khiển định dạng output</h4>\n<p>Docs nêu vài cách hiệu quả:</p>\n<ul>\n<li><strong>Nói điều cần làm thay vì điều cấm</strong>: thay “đừng dùng markdown” bằng “viết thành các đoạn văn liền mạch”.</li>\n<li><strong>Dùng thẻ XML làm chỉ báo định dạng</strong>: yêu cầu đặt phần kết luận trong <code>&lt;answer&gt;</code> để code dễ tách.</li>\n<li><strong>Cho phong cách prompt khớp với output mong muốn</strong>: prompt đầy markdown dễ kéo theo output đầy markdown.</li>\n</ul>\n<div class=\"tip\">Hệ thống cần <em>code</em> đọc output thì thẻ XML là bước đệm tốt. Nhưng nếu cần bảo đảm cấu trúc thì dùng tool/JSON schema (bài sau). XML trong prompt giúp tổ chức, không bảo đảm output đúng khuôn.</div>\n<div class=\"warn\">Chia tài liệu dài thành nhiều lời gọi song song rồi nối kết quả nghe có vẻ hay, nhưng dễ làm mất liên kết chéo (bản sửa đổi ở tài liệu 2 thay thế điều 7 ở tài liệu 1). Nếu tài liệu vừa context, sắp xếp prompt cho tốt thường là bước đầu tiên đúng.</div>",
     "keypoints": [
      "Bọc từng loại nội dung (chỉ dẫn, bối cảnh, ví dụ, input) trong thẻ XML riêng, tên nhất quán, lồng khi có thứ bậc.",
      "Tài liệu dài đặt ở đầu prompt, câu hỏi và chỉ dẫn ở cuối.",
      "Mỗi tài liệu bọc trong thẻ document, kèm thẻ con source và document_content.",
      "Yêu cầu trích dẫn đoạn liên quan trước khi trả lời để tập trung và có căn cứ.",
      "Nói điều cần làm thay vì điều cấm; XML giúp tổ chức nhưng không bảo đảm cấu trúc output."
     ],
     "sources": [
      {
       "t": "Prompting best practices",
       "u": "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices"
      },
      {
       "t": "Handle tool calls (untrusted content)",
       "u": "https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls"
      }
     ],
     "ts": [
      "4.1",
      "5.1"
     ]
    },
    {
     "id": "l-4-3",
     "title": "Output có cấu trúc: tool_use, JSON schema và vòng validate rồi retry",
     "minutes": 14,
     "html": "<p>Pipeline trích xuất hóa đơn cần JSON đúng schema cho <em>mọi</em> tài liệu. Dặn “chỉ trả về JSON” trong prompt chạy được phần lớn thời gian, nhưng thỉnh thoảng có câu dẫn thừa, thiếu dấu ngoặc, hoặc thiếu trường. Ở quy mô lớn, “thỉnh thoảng” nghĩa là hàng trăm lỗi parse mỗi ngày.</p>\n<h4>Hai cách bảo đảm cấu trúc</h4>\n<table>\n<thead><tr><th>Cách</th><th>Cơ chế</th><th>Dùng khi</th></tr></thead>\n<tbody>\n<tr><td><strong>Tool làm khuôn output</strong></td><td>Định nghĩa tool (ví dụ <code>record_invoice</code>) có <code>input_schema</code> là schema mong muốn; dữ liệu nằm trong <code>input</code> của khối <code>tool_use</code>. Thêm <code>strict: true</code> để bảo đảm input khớp schema</td><td>Đã có kiến trúc tool, cần chọn giữa nhiều schema</td></tr>\n<tr><td><strong>JSON outputs</strong></td><td><code>output_config.format</code> với <code>type: \"json_schema\"</code>; response chính là JSON theo schema</td><td>Chỉ cần câu trả lời theo một khuôn cố định</td></tr>\n</tbody>\n</table>\n<p>Docs gọi chung hai tính năng này là <strong>structured outputs</strong>: dùng constrained decoding nên output “luôn hợp lệ” để parse, đúng kiểu và đủ trường bắt buộc, không cần retry vì lỗi schema. Docs cũng nêu các ngoại lệ: <code>stop_reason: \"refusal\"</code>, bị cắt do <code>max_tokens</code>, và chữ hoa/thường của giá trị <code>enum</code> không được bảo đảm.</p>\n<pre>\"output_config\": {\n  \"format\": {\n    \"type\": \"json_schema\",\n    \"schema\": {\n      \"type\": \"object\",\n      \"properties\": {\n        \"invoice_number\": {\"type\": \"string\"},\n        \"po_number\":      {\"anyOf\": [{\"type\": \"string\"}, {\"type\": \"null\"}]},\n        \"currency\":       {\"type\": \"string\", \"enum\": [\"USD\", \"EUR\", \"VND\", \"OTHER\"]},\n        \"line_items\": {\n          \"type\": \"array\",\n          \"items\": {\n            \"type\": \"object\",\n            \"properties\": {\"description\": {\"type\": \"string\"}, \"amount\": {\"type\": \"number\"}},\n            \"required\": [\"description\", \"amount\"],\n            \"additionalProperties\": false\n          }\n        },\n        \"stated_total\":   {\"type\": \"number\"}\n      },\n      \"required\": [\"invoice_number\", \"po_number\", \"currency\", \"line_items\", \"stated_total\"],\n      \"additionalProperties\": false\n    }\n  }\n}</pre>\n<h4>Giới hạn schema cần biết</h4>\n<p>Theo docs, structured outputs <strong>không hỗ trợ</strong>: schema đệ quy, <code>$ref</code> ngoài, ràng buộc số (<code>minimum</code>, <code>maximum</code>), ràng buộc chuỗi (<code>minLength</code>, <code>maxLength</code>), ràng buộc mảng ngoài <code>minItems</code> bằng 0 hoặc 1, và <code>additionalProperties</code> khác <code>false</code>. Dùng tính năng không hỗ trợ sẽ nhận lỗi 400. Những ràng buộc kiểu “số tiền phải dương” phải kiểm tra trong code.</p>\n<h4>Thiết kế schema để giảm bịa đặt</h4>\n<ul>\n<li>Trường có thể <strong>không có trong tài liệu</strong> thì cho phép <code>null</code>. Nếu bắt buộc là chuỗi, model buộc phải điền một thứ gì đó, và đó là lúc nó bịa.</li>\n<li>Enum nên có lối thoát như <code>\"OTHER\"</code> hoặc <code>\"unclear\"</code>, kèm trường mô tả chi tiết, để model không phải nhét giá trị lạ vào nhãn sai.</li>\n<li>Muốn phát hiện mâu thuẫn thì trích cả <code>stated_total</code> (số in trên hóa đơn) để code so với tổng các dòng.</li>\n</ul>\n<div class=\"warn\">Schema bảo đảm <strong>cú pháp</strong>, không bảo đảm <strong>ngữ nghĩa</strong>. JSON hợp lệ vẫn có thể có tổng các dòng khác tổng in, ngày đặt sai trường, hoặc giá trị bị đọc nhầm. Phải có bước kiểm tra nghiệp vụ trong code.</div>\n<h4>Vòng validate rồi retry</h4>\n<pre>result = extract(document)\nfor attempt in range(MAX_RETRIES):\n    errors = validate_business_rules(result)   # tổng tiền, định dạng ngày, mã hợp lệ...\n    if not errors:\n        break\n    result = extract(document,\n                     previous_output=result,\n                     feedback=f\"Validation failed: {errors}. Re-read the document and fix only these fields.\")\nelse:\n    send_to_human_review(document, result, errors)</pre>\n<ul>\n<li>Retry hiệu quả nhất khi gửi lại <strong>tài liệu gốc, output lỗi và lỗi cụ thể</strong>. Câu “thử lại” chung chung thường cho ra cùng lỗi.</li>\n<li>Retry <strong>có tác dụng</strong> với lỗi định dạng, đặt nhầm trường, tính sai. Retry <strong>vô ích</strong> khi thông tin <em>không có</em> trong tài liệu: hỏi lại bao nhiêu lần cũng không tạo ra dữ liệu. Khi đó trả <code>null</code> và đánh dấu cho người xem.</li>\n<li>Agent SDK có subtype kết quả <code>error_max_structured_output_retries</code> cho trường hợp hết lượt retry mà vẫn chưa có output hợp lệ.</li>\n</ul>\n<div class=\"tip\">Câu hỏi “làm sao bảo đảm JSON luôn parse được” thường có đáp án là structured outputs hoặc tool kèm <code>strict: true</code>. Câu hỏi “JSON đúng cú pháp nhưng số liệu sai” thường có đáp án là validate nghiệp vụ trong code rồi retry kèm lỗi cụ thể.</div>",
     "keypoints": [
      "Dặn 'chỉ trả JSON' trong prompt không bảo đảm; dùng tool có input_schema (strict: true) hoặc output_config.format.",
      "Structured outputs bảo đảm parse được và đúng schema, trừ refusal, max_tokens, chữ hoa/thường của enum.",
      "Không hỗ trợ minimum/maximum, minLength, schema đệ quy...; ràng buộc nghiệp vụ phải kiểm tra trong code.",
      "Trường có thể thiếu thì cho null; enum có lối thoát 'OTHER'/'unclear'; schema không bảo đảm ngữ nghĩa.",
      "Retry kèm tài liệu, output lỗi và lỗi cụ thể; vô ích khi dữ liệu không có trong tài liệu."
     ],
     "sources": [
      {
       "t": "Structured outputs",
       "u": "https://platform.claude.com/docs/en/build-with-claude/structured-outputs"
      },
      {
       "t": "Define tools",
       "u": "https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools"
      },
      {
       "t": "How the agent loop works (result subtypes)",
       "u": "https://code.claude.com/docs/en/agent-sdk/agent-loop"
      }
     ],
     "ts": [
      "4.3",
      "4.4"
     ]
    },
    {
     "id": "l-4-4",
     "title": "Message Batches API và review nhiều lượt",
     "minutes": 12,
     "html": "<h4>Message Batches API: rẻ hơn, đổi lại phải chờ</h4>\n<p>Batches API xử lý <strong>bất đồng bộ</strong> một lượng lớn request Messages. Các con số docs nêu:</p>\n<table>\n<thead><tr><th>Đặc điểm</th><th>Giá trị</th></tr></thead>\n<tbody>\n<tr><td>Chi phí</td><td>Giảm 50% so với gọi thường</td></tr>\n<tr><td>Thời gian</td><td>Phần lớn batch xong dưới 1 giờ; kết quả có khi mọi request xong hoặc sau 24 giờ, tùy cái nào đến trước; request chưa xử lý xong sau 24 giờ thì hết hạn</td></tr>\n<tr><td>Giới hạn</td><td>100.000 request hoặc 256 MB mỗi batch, tùy cái nào chạm trước</td></tr>\n<tr><td>Lưu kết quả</td><td>29 ngày sau khi tạo</td></tr>\n<tr><td>Thứ tự</td><td>Kết quả có thể trả về <strong>không theo thứ tự</strong> gửi, nên phải khớp bằng <code>custom_id</code></td></tr>\n<tr><td>Loại kết quả</td><td><code>succeeded</code>, <code>errored</code>, <code>canceled</code>, <code>expired</code> (ba loại sau không bị tính phí)</td></tr>\n</tbody>\n</table>\n<p>Gần như mọi request gửi được tới Messages API đều đưa được vào batch, gồm tool use và hội thoại nhiều lượt. Nhưng mỗi request vẫn chỉ là <strong>một</strong> lời gọi Messages. Nếu response dừng ở <code>tool_use</code>, code của bạn phải chạy tool rồi gửi request tiếp theo. Vì vậy vòng lặp agent cần nhiều lượt qua lại với tool thực thi phía bạn không chạy trọn trong một request batch.</p>\n<h4>Chọn đúng workload</h4>\n<table>\n<thead><tr><th>Hợp với batch</th><th>Không hợp</th></tr></thead>\n<tbody>\n<tr><td>Audit hằng đêm hàng chục nghìn transcript</td><td>Kiểm tra pre-merge mà dev đang ngồi chờ</td></tr>\n<tr><td>Trích xuất lại kho tài liệu cũ (backfill)</td><td>Chat với khách hàng</td></tr>\n<tr><td>Chạy bộ đánh giá (eval) lớn</td><td>Bất kỳ luồng nào có người hoặc hệ thống bị chặn chờ kết quả</td></tr>\n</tbody>\n</table>\n<p>Xử lý lỗi: đọc kết quả theo <code>custom_id</code>, rồi chỉ gửi lại những request <code>errored</code>/<code>expired</code>, có thể kèm chỉnh sửa (chẳng hạn chia nhỏ tài liệu quá dài). Khi tính lịch chạy, nhớ rằng batch có thể mất tới 24 giờ. Job có hạn chót sáng mai thì đừng gửi sát giờ. Prompt caching dùng được với batch, nhưng docs ghi cache hit chỉ ở mức “best-effort” vì request có thể được xử lý đồng thời và không theo thứ tự.</p>\n<div class=\"warn\">Bẫy: chọn batch cho luồng cần phản hồi nhanh chỉ vì rẻ hơn 50%. “Phần lớn xong dưới 1 giờ” không phải cam kết, và giới hạn thật là 24 giờ.</div>\n<h4>Review nhiều lượt</h4>\n<p><strong>Tự review trong cùng phiên</strong> có điểm yếu: phiên đã viết code hoặc đã trích xuất vẫn mang theo lập luận của chính nó, nên dễ bỏ qua lỗi của mình. Tốt hơn là dùng một <strong>instance độc lập</strong> (lời gọi mới, không có lịch sử tạo ra kết quả) để review. Đây là tinh thần của mẫu <em>evaluator-optimizer</em> trong “Building effective agents”: một LLM tạo, một LLM khác đánh giá theo tiêu chí rõ ràng, lặp lại khi việc lặp có giá trị đo được.</p>\n<p>Với PR lớn (vài chục file), một lượt review duy nhất dễ bị “loãng”: file đầu được xem kỹ, file sau sơ sài, và lỗi xuyên file bị bỏ sót. Chia thành:</p>\n<ol>\n<li><strong>Lượt theo từng file</strong>: tìm lỗi cục bộ, mỗi lượt tập trung một file.</li>\n<li><strong>Lượt tích hợp</strong>: chỉ nhìn giao diện giữa các file (chữ ký hàm, hợp đồng API, luồng dữ liệu) để bắt lỗi xuyên file.</li>\n</ol>\n<p>Bài viết về hệ nghiên cứu của Anthropic cũng mô tả dùng <strong>LLM làm giám khảo</strong> chấm theo rubric để đánh giá output, kèm kiểm thử bởi người để bắt lỗi mà giám khảo bỏ sót.</p>\n<div class=\"tip\">“Model lớn hơn, context dài hơn, review một lượt” thường là đáp án nhiễu. Chia lượt theo trọng tâm và dùng reviewer độc lập mới là cách sửa đúng gốc.</div>",
     "keypoints": [
      "Batches: rẻ 50%, phần lớn xong dưới 1 giờ nhưng tối đa 24 giờ; 100.000 request hoặc 256 MB; kết quả giữ 29 ngày.",
      "Kết quả không theo thứ tự nên phải khớp bằng custom_id; gửi lại chỉ những request errored/expired.",
      "Batch hợp việc không ai chờ (audit đêm, backfill, eval); không hợp kiểm tra chặn hay chat.",
      "Mỗi request batch là một lời gọi; vòng lặp agent cần chạy tool phía bạn thì không chạy trọn trong một request.",
      "Review bằng instance độc lập; PR lớn thì chia lượt theo file cộng một lượt tích hợp xuyên file."
     ],
     "sources": [
      {
       "t": "Batch processing",
       "u": "https://platform.claude.com/docs/en/build-with-claude/batch-processing"
      },
      {
       "t": "Building effective agents",
       "u": "https://www.anthropic.com/engineering/building-effective-agents"
      },
      {
       "t": "How we built our multi-agent research system",
       "u": "https://www.anthropic.com/engineering/multi-agent-research-system"
      }
     ],
     "ts": [
      "4.5",
      "4.6"
     ]
    },
    {
     "id": "l-4-5",
     "title": "Trích xuất nhiều loại tài liệu: chọn schema, chuẩn hóa và trường tự kiểm",
     "minutes": 12,
     "html": "<p>Tình huống: hộp thư kế toán nhận lẫn lộn hóa đơn, biên lai và hợp đồng dịch vụ, dạng PDF và ảnh chụp. Pipeline phải trích dữ liệu đúng khuôn cho từng loại, phát hiện số liệu mâu thuẫn, và chỉ đẩy cho người những ca thật sự cần. Bài l-4-3 đã nói cách ép một schema; bài này xử lý chuyện <strong>nhiều schema</strong> và chuyện <strong>tự kiểm</strong>.</p>\n<h4>Bước 1: chọn khuôn cho tài liệu chưa biết loại</h4>\n<table>\n<thead><tr><th>Cách</th><th>Cách chạy</th><th>Lưu ý</th></tr></thead>\n<tbody>\n<tr><td>Phân loại trước, trích sau (routing)</td><td>Lời gọi 1 trả nhãn loại bằng một enum có lối thoát <code>\"other\"</code>; lời gọi 2 dùng <code>output_config.format</code> với schema của loại đó</td><td>Hai lời gọi, nhưng mỗi bước đơn giản và kiểm tra được; nhãn <code>\"other\"</code> đi thẳng tới người</td></tr>\n<tr><td>Một tool trích xuất cho mỗi loại</td><td>Khai báo <code>extract_invoice</code>, <code>extract_receipt</code>, <code>extract_contract</code> với <code>strict: true</code>; Claude chọn tool phù hợp</td><td>Muốn bắt buộc có lời gọi tool thì dùng <code>tool_choice: {\"type\": \"any\"}</code>, nhưng chỉ trên model hỗ trợ ép tool</td></tr>\n</tbody>\n</table>\n<div class=\"warn\">Docs define-tools hiện ghi (tháng 11/2026): với thinking thủ công, <code>any</code> và <code>tool</code> gây lỗi; và một số model mới nhất (như Claude Opus 5.5, Sonnet 5.5) trả lỗi 400 với hai giá trị này bất kể cấu hình thinking. Docs đề nghị dùng <code>auto</code> kèm strict tool use, hoặc structured outputs. Trên các model đó, cách “phân loại trước, trích sau” là lựa chọn an toàn.</div>\n<h4>Bước 2: thiết kế từng schema</h4>\n<pre>{\n  \"type\": \"object\",\n  \"properties\": {\n    \"invoice_number\": {\"type\": \"string\"},\n    \"issue_date\":     {\"anyOf\": [{\"type\": \"string\", \"format\": \"date\"}, {\"type\": \"null\"}]},\n    \"currency\":       {\"type\": \"string\", \"enum\": [\"VND\", \"USD\", \"EUR\", \"other\"]},\n    \"currency_raw\":   {\"anyOf\": [{\"type\": \"string\"}, {\"type\": \"null\"}]},\n    \"line_items\": {\"type\": \"array\", \"items\": {\n        \"type\": \"object\",\n        \"properties\": {\"description\": {\"type\": \"string\"}, \"amount\": {\"type\": \"number\"}},\n        \"required\": [\"description\", \"amount\"], \"additionalProperties\": false}},\n    \"stated_total\":   {\"anyOf\": [{\"type\": \"number\"}, {\"type\": \"null\"}]},\n    \"total_evidence\": {\"anyOf\": [{\"type\": \"string\"}, {\"type\": \"null\"}]}\n  },\n  \"required\": [\"invoice_number\", \"issue_date\", \"currency\", \"currency_raw\",\n               \"line_items\", \"stated_total\", \"total_evidence\"],\n  \"additionalProperties\": false\n}</pre>\n<ul>\n<li><strong>Có thể thiếu thì cho <code>null</code></strong>, và vẫn để trong <code>required</code>: trường luôn xuất hiện, model được phép nói “không có” thay vì bịa.</li>\n<li><strong>Enum có lối thoát</strong>: <code>\"other\"</code> kèm <code>currency_raw</code> ghi nguyên văn, để giá trị lạ không bị nhét vào nhãn sai.</li>\n<li><strong>Thứ tự thuộc tính</strong>: docs ghi structured outputs giữ thứ tự trong schema nhưng đưa thuộc tính required lên trước thuộc tính tùy chọn. Đánh dấu mọi trường là required nếu thứ tự quan trọng.</li>\n<li><strong>Giới hạn độ phức tạp</strong>: docs hiện ghi tối đa 20 strict tool mỗi request, tổng 24 tham số tùy chọn và 16 tham số dùng union type (<code>anyOf</code> hoặc mảng kiểu) trên mọi strict schema của request. Ba schema nhiều trường nullable cộng lại có thể chạm giới hạn này; đó cũng là một lý do để tách thành hai lời gọi.</li>\n</ul>\n<h4>Bước 3: chuẩn hóa</h4>\n<p>Schema không diễn đạt hết quy tắc định dạng: docs liệt kê ràng buộc số (<code>minimum</code>, <code>maximum</code>) và ràng buộc độ dài chuỗi là không hỗ trợ, trong khi một số <code>format</code> chuỗi như <code>date</code>, <code>date-time</code> được hỗ trợ. Phần còn lại ghi thành quy tắc trong prompt, kèm ví dụ cho các dạng đầu vào khác nhau:</p>\n<pre>&lt;normalization_rules&gt;\n- Số tiền: số thuần, dấu chấm thập phân. \"1.250.000 ₫\" -&gt; 1250000, currency \"VND\".\n- Ngày: YYYY-MM-DD. Chỉ chuyển khi chắc thứ tự ngày/tháng; nếu \"03/04/2025\"\n  không có dấu hiệu nào khác thì để null và ghi vào total_evidence lý do.\n- Không tự tính stated_total; chỉ ghi số in trên chứng từ.\n&lt;/normalization_rules&gt;</pre>\n<h4>Bước 4: trường tự kiểm và validator</h4>\n<p>Ý tưởng: trích <strong>cả số in trên giấy lẫn dữ liệu chi tiết</strong>, rồi để code so. Model không được bảo tự cộng; code cộng. Exam guide CCAR-F mô tả một biến thể: schema có thêm <code>calculated_total</code> (model cộng các dòng) và cờ <code>conflict_detected</code> cạnh <code>stated_total</code>. Biến thể này cũng gắn cờ được chênh lệch, nhưng code vẫn nên tự cộng lại vì phép cộng của model không phải kiểm tra tất định.</p>\n<pre>errors = []\ncomputed = round(sum(i[\"amount\"] for i in doc[\"line_items\"]), 2)\nif doc[\"stated_total\"] is not None and abs(computed - doc[\"stated_total\"]) &gt; 0.01:\n    errors.append(f\"line items sum to {computed}, stated_total is {doc['stated_total']}\")\nif doc[\"currency\"] == \"other\" or doc[\"issue_date\"] is None:\n    route_to_human(doc, reason=\"missing or unrecognized field\")\nelif errors:\n    doc = extract(document, previous=doc, feedback=errors)   # retry kèm lỗi cụ thể</pre>\n<p>Trường <code>total_evidence</code> (đoạn trích ngắn chỗ in tổng tiền) giúp người duyệt kiểm tra nhanh. Docs structured outputs cảnh báo trường yêu cầu “suy luận từng bước” có thể gây từ chối; trường bằng chứng nên là đoạn trích hoặc giải thích <em>ngắn</em>.</p>\n<h4>Bước 5: đưa ai xem cái gì</h4>\n<ul>\n<li>Lệch tổng sau retry, trường bắt buộc là <code>null</code>, nhãn <code>\"other\"</code>: vào hàng đợi người, kèm lý do có cấu trúc.</li>\n<li>Đo độ chính xác <strong>theo loại tài liệu và theo trường</strong> trước khi giảm review (l-5-2). Biên lai chụp mờ có thể kém hơn hẳn hóa đơn PDF.</li>\n<li>Chạy lại kho cũ thì dùng Batches API; thử prompt trên một mẫu nhỏ trước để lượt chạy lớn ít lỗi (docs batch cũng khuyên chạy thử một request bằng Messages API để tránh lỗi validate).</li>\n</ul>\n<div class=\"tip\">Đề hỏi “làm sao phát hiện hóa đơn bị trích sai số mà không review hết” thì tìm đáp án trích cả <code>stated_total</code> lẫn từng dòng rồi so bằng code. Đáp án “hỏi model độ tự tin” không phải tín hiệu xác định.</div>",
     "keypoints": [
      "Tài liệu chưa biết loại: phân loại trước (enum có 'other') rồi trích bằng schema riêng, hoặc mỗi loại một strict tool.",
      "tool_choice any/tool bị từ chối trên một số model mới và với thinking thủ công; khi đó dùng auto + strict hoặc structured outputs.",
      "Trường có thể thiếu thì nullable nhưng vẫn required; enum có lối thoát kèm trường nguyên văn.",
      "Quy tắc định dạng schema không diễn đạt được thì ghi trong prompt kèm ví dụ; code kiểm tra lại.",
      "Trích cả stated_total và từng dòng, để code so; trường bằng chứng nên ngắn, không đòi suy luận từng bước."
     ],
     "sources": [
      {
       "t": "Structured outputs",
       "u": "https://platform.claude.com/docs/en/build-with-claude/structured-outputs"
      },
      {
       "t": "Define tools (Forcing tool use)",
       "u": "https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools"
      },
      {
       "t": "Batch processing (best practices)",
       "u": "https://platform.claude.com/docs/en/build-with-claude/batch-processing"
      },
      {
       "t": "Building effective agents (routing)",
       "u": "https://www.anthropic.com/engineering/building-effective-agents"
      }
     ],
     "ts": [
      "4.3",
      "4.4"
     ]
    },
    {
     "id": "l-4-6",
     "title": "Thiết kế bot review tự động: finding có cấu trúc, đo false positive và lượt xác minh",
     "minutes": 12,
     "html": "<p>Tình huống: team gắn Claude vào CI để review mỗi pull request. Tuần đầu bot bắt được vài lỗi thật, nhưng cũng đăng hàng chục bình luận vô ích; sang tuần thứ ba dev bắt đầu bỏ qua mọi bình luận của bot. Bài này ghép các mảnh của l-4-1 (tiêu chí), l-4-4 (review nhiều lượt) và l-3-4 (chạy trong CI) thành một thiết kế hoàn chỉnh, và thêm phần đo lường.</p>\n<h4>1. Tiêu chí trước, rồi mới đến model</h4>\n<p>Bot ồn gần như luôn do tiêu chí mơ hồ (l-4-1). Viết rõ báo gì, bỏ gì, và mức độ nghiêm trọng kèm ví dụ code cho từng mức. Thêm lý do: “bình luận sai làm dev mất niềm tin vào công cụ”. Docs best practices của Claude Code cũng lưu ý reviewer được bảo đi tìm vấn đề thì luôn tìm ra <em>cái gì đó</em>, nên prompt review nên nói rõ bỏ qua style và chỉ báo vấn đề ảnh hưởng tính đúng.</p>\n<h4>2. Finding phải là dữ liệu, không phải đoạn văn</h4>\n<pre>{\n  \"findings\": [{\n    \"file\": \"payments/refund.py\",\n    \"line\": 88,\n    \"category\": \"logic_error\",        // enum: logic_error | security | api_break | other\n    \"severity\": \"high\",               // enum: high | medium | low\n    \"rule_id\": \"null-check-missing\",  // quy tắc nào trong tiêu chí kích hoạt finding\n    \"evidence\": \"if order.refund_amount > order.total:\",\n    \"explanation\": \"refund_amount có thể là None khi đơn chưa thanh toán\",\n    \"suggested_fix\": \"Kiểm tra None trước khi so sánh\"\n  }]\n}</pre>\n<ul>\n<li>Lấy output này bằng <code>--output-format json</code> kèm <code>--json-schema</code> khi chạy <code>claude -p</code> (kết quả ở <code>structured_output</code>), hoặc bằng structured outputs nếu gọi API trực tiếp. Script CI đăng bình luận theo <code>file</code>/<code>line</code>.</li>\n<li><code>rule_id</code> (hoặc một trường kiểu <code>detected_pattern</code>) ghi <em>vì sao</em> finding được tạo. Đây là chìa khóa để đo: bạn biết quy tắc nào sinh nhiều bình luận bị bỏ qua.</li>\n<li><code>evidence</code> là đoạn code trích nguyên văn, giúp lượt xác minh và người đọc kiểm tra nhanh. Giữ <code>explanation</code> ngắn (docs structured outputs cảnh báo trường đòi suy luận từng bước có thể gây từ chối).</li>\n</ul>\n<h4>3. Đo false positive theo từng quy tắc</h4>\n<p>Đây là lời khuyên thiết kế: ghi lại phản ứng của dev với mỗi finding (sửa theo, đánh dấu “không phải lỗi”, bỏ qua), rồi tổng hợp theo <code>category</code> và <code>rule_id</code>.</p>\n<table>\n<thead><tr><th>Quan sát</th><th>Hành động</th></tr></thead>\n<tbody>\n<tr><td>Một quy tắc có tỉ lệ bị bác bỏ cao</td><td>Tạm tắt quy tắc đó trong khi sửa tiêu chí và thêm ví dụ ở ca ranh giới (l-4-1)</td></tr>\n<tr><td>Bị bác bỏ vì thiếu ngữ cảnh (code đã được kiểm tra ở tầng khác)</td><td>Bổ sung ngữ cảnh vào prompt, ví dụ quy ước của repo trong CLAUDE.md</td></tr>\n<tr><td>Lỗi thật lọt qua review</td><td>Thêm ví dụ tương tự vào tiêu chí; xem có cần lượt tích hợp xuyên file không</td></tr>\n</tbody>\n</table>\n<h4>4. Nhiều lượt, mỗi lượt một trọng tâm</h4>\n<ol>\n<li><strong>Lượt theo file</strong>: mỗi lần chỉ xem một file hoặc một nhóm nhỏ, tìm lỗi cục bộ. Có thể chạy song song.</li>\n<li><strong>Lượt tích hợp</strong>: chỉ nhìn giao diện giữa các file (chữ ký hàm đổi, hợp đồng API, luồng dữ liệu) để bắt lỗi xuyên file.</li>\n<li><strong>Lượt xác minh</strong>: một instance <em>độc lập</em> nhận từng finding cùng đoạn code liên quan và trả <code>confirmed</code>/<code>rejected</code> kèm lý do ngắn. Chỉ finding được xác nhận mới được đăng.</li>\n</ol>\n<p>Lượt xác minh hiệu quả vì nó không mang lập luận của lượt tạo finding, đúng tinh thần của reviewer độc lập (l-4-4) và của <code>/code-review</code> trong Claude Code, vốn review diff trong một subagent mới chưa thấy cuộc hội thoại.</p>\n<div class=\"warn\">Đừng lọc finding bằng “confidence” do model tự báo mà không hiệu chuẩn. Con số đó không tương ứng sẵn với tỉ lệ đúng thật (l-5-2). Nếu muốn dùng, đo trên tập finding đã có nhãn của chính repo để chọn ngưỡng, và vẫn ưu tiên tín hiệu xác định như test thất bại hay quy tắc rõ ràng.</div>\n<h4>5. Chạy lại sau mỗi commit mà không lặp bình luận</h4>\n<ul>\n<li>Đưa danh sách finding đã đăng (kèm trạng thái) vào prompt, yêu cầu chỉ báo vấn đề mới hoặc chưa được sửa (l-3-4).</li>\n<li>Khớp finding mới với cũ bằng code (file, <code>rule_id</code>, đoạn evidence) trước khi đăng, đừng chỉ dựa vào lời dặn.</li>\n<li>Review chạy trong phiên mới, không resume phiên đã viết code.</li>\n</ul>\n<h4>6. Chọn đúng nhịp chạy</h4>\n<p>Review pre-merge có dev đang chờ thì chạy đồng bộ. Quét lại toàn bộ repo hằng đêm để tìm một loại lỗi mới thì hợp với Batches API: rẻ 50%, chấp nhận chờ tới 24 giờ.</p>\n<div class=\"tip\">Câu hỏi “bot review quá ồn, dev mất niềm tin” có đáp án theo thứ tự: tiêu chí tường minh, tạm tắt quy tắc ồn, đo theo quy tắc. Câu hỏi “bot bỏ sót lỗi xuyên file trong PR lớn” có đáp án là chia lượt theo file cộng lượt tích hợp. Đáp án “đổi model lớn hơn” hay “chỉ đăng khi confidence &gt; 0.9” thường là nhiễu.</div>",
     "keypoints": [
      "Bot ồn thì sửa tiêu chí trước: báo gì, bỏ gì, mức độ kèm ví dụ; dặn bỏ qua style.",
      "Finding là JSON có file, line, category, severity, rule_id/detected_pattern, evidence ngắn; lấy bằng --json-schema hoặc structured outputs.",
      "Đo phản ứng của dev theo rule_id để biết quy tắc nào sinh false positive; tạm tắt quy tắc ồn.",
      "Lượt theo file, lượt tích hợp, lượt xác minh bằng instance độc lập trước khi đăng.",
      "Confidence tự báo chưa hiệu chuẩn không phải bộ lọc tốt; chống lặp bình luận bằng danh sách finding cũ và khớp bằng code."
     ],
     "sources": [
      {
       "t": "Best practices for Claude Code (review against spec, independent reviewer)",
       "u": "https://code.claude.com/docs/en/best-practices"
      },
      {
       "t": "Run Claude Code programmatically (--json-schema)",
       "u": "https://code.claude.com/docs/en/headless"
      },
      {
       "t": "Structured outputs",
       "u": "https://platform.claude.com/docs/en/build-with-claude/structured-outputs"
      },
      {
       "t": "Prompting best practices",
       "u": "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices"
      },
      {
       "t": "Building effective agents (parallelization, evaluator-optimizer)",
       "u": "https://www.anthropic.com/engineering/building-effective-agents"
      }
     ],
     "ts": [
      "4.1",
      "4.6",
      "4.4"
     ]
    }
   ],
   "cheat": [
    [
     "'Be conservative' / 'chỉ báo cái quan trọng'",
     "Thay bằng tiêu chí tường minh: báo gì, bỏ gì, mức độ, ví dụ"
    ],
    [
     "Giải thích lý do",
     "Nói vì sao cần chỉ dẫn, Claude khái quát được"
    ],
    [
     "Few-shot",
     "3–5 ví dụ liên quan, đa dạng, trong thẻ example; tập trung ca mơ hồ, kèm lý do"
    ],
    [
     "Thẻ XML",
     "Tách chỉ dẫn / bối cảnh / ví dụ / input; tên nhất quán; lồng khi có thứ bậc"
    ],
    [
     "Tài liệu dài",
     "Đặt ở đầu, câu hỏi ở cuối; thẻ document kèm source; yêu cầu trích dẫn trước"
    ],
    [
     "JSON luôn parse được",
     "Structured outputs: output_config.format hoặc tool + strict: true"
    ],
    [
     "Schema không hỗ trợ",
     "minimum/maximum, minLength/maxLength, đệ quy, $ref ngoài; additionalProperties phải là false"
    ],
    [
     "Trường có thể thiếu",
     "Cho phép null để tránh bịa; enum có 'OTHER'/'unclear'"
    ],
    [
     "JSON đúng mà số sai",
     "Schema không bảo đảm ngữ nghĩa; validate trong code, retry kèm lỗi cụ thể"
    ],
    [
     "Retry vô ích khi",
     "Dữ liệu không có trong tài liệu nên trả null và gửi người xem"
    ],
    [
     "Batches API",
     "-50% chi phí, tối đa 24 giờ, custom_id, không theo thứ tự, giữ 29 ngày"
    ],
    [
     "Review",
     "Instance độc lập; PR lớn chia lượt theo file cộng lượt tích hợp"
    ],
    [
     "Prefill trên model mới",
     "Docs hiện ghi lỗi 400 từ model 4.6; dùng structured outputs hoặc chỉ dẫn trực tiếp"
    ],
    [
     "Nhiều loại tài liệu",
     "Phân loại (enum có 'other') rồi trích bằng schema riêng; tool_choice any/tool chỉ trên model hỗ trợ ép tool"
    ],
    [
     "Phát hiện trích sai số",
     "Trích cả stated_total lẫn từng dòng; code tự cộng và so"
    ],
    [
     "Bot review ồn",
     "Tiêu chí tường minh; rule_id để đo bác bỏ theo quy tắc; tạm tắt quy tắc ồn; lượt xác minh độc lập"
    ]
   ],
   "quiz": [
    {
     "q": "An automated code-review bot is instructed to \"be conservative and only report important issues.\" It still posts many comments about naming and formatting, and developers have started ignoring it, including its valid bug reports. What is the BEST improvement?",
     "options": [
      "Replace it with explicit criteria: which categories to report (logic, security), which to skip (style), with an example of each.",
      "Add \"be even more conservative\" to the prompt and require the model to report only the issues it rates above 90% confidence on its own.",
      "Move the review to a larger model that better understands what \"important\" means.",
      "Run the review twice and post only issues that appear in both runs."
     ],
     "answer": 0,
     "explain": "Gốc rễ là 'quan trọng' chưa được định nghĩa. Tiêu chí tường minh (báo gì, bỏ gì, kèm ví dụ) giải quyết trực tiếp. B vẫn mơ hồ, và ngưỡng tự tin do model tự báo không được hiệu chuẩn. C không định nghĩa lại tiêu chí. D có thể giảm nhiễu ngẫu nhiên nhưng hai lần chạy vẫn cùng đồng ý báo lỗi style, vì vấn đề nằm ở tiêu chí.",
     "sc": "s5",
     "ts": [
      "4.1"
     ]
    },
    {
     "q": "An invoice-extraction prompt returns \"N/A\", \"none\", or an empty string for missing purchase-order numbers, and occasionally invents a plausible-looking PO number when none exists. What is the BEST fix?",
     "options": [
      "Add a firm instruction to the system prompt: \"Never hallucinate or invent values; if you are not sure about a field, leave it out.\"",
      "Make po_number a required string in the schema so the model always provides a value.",
      "Allow null for po_number, tell the model to return null when it is absent, and add an example whose expected output is null.",
      "Post-process the output to delete the strings \"N/A\" and \"none\"."
     ],
     "answer": 2,
     "explain": "Cho phép null cùng ví dụ minh họa vừa chuẩn hóa cách biểu diễn 'không có', vừa bỏ áp lực phải điền giá trị (nguyên nhân bịa). A là lời dặn chung chung, ít tác dụng. B làm tệ hơn: bắt buộc chuỗi thì model phải điền một thứ gì đó. D chỉ vá biểu hiện, không xử lý được giá trị bịa đặt.",
     "sc": "s6",
     "ts": [
      "4.3",
      "4.2"
     ]
    },
    {
     "q": "A pipeline asks Claude to \"respond only with JSON matching this schema.\" About 3% of outputs fail JSON.parse because of extra prose or missing brackets. What is the MOST reliable fix?",
     "options": [
      "Add several few-shot examples of correctly formatted JSON responses.",
      "Use schema-constrained structured outputs: either JSON outputs via output_config.format, or a tool with strict: true whose input_schema is the target schema.",
      "Retry up to five times whenever parsing fails.",
      "Set temperature to zero to make the output deterministic."
     ],
     "answer": 1,
     "explain": "Structured outputs dùng constrained decoding, bảo đảm output parse được và đúng schema (trừ các ngoại lệ như refusal hay max_tokens). A giúp tăng tỉ lệ đúng nhưng không bảo đảm. C tốn chi phí và vẫn có thể thất bại. D không bảo đảm định dạng.",
     "sc": "s6",
     "ts": [
      "4.3"
     ]
    },
    {
     "q": "After moving invoice extraction to structured outputs, every response parses and matches the schema. However, in some results the line-item amounts do not add up to the stated total printed on the invoice. What should the team do?",
     "options": [
      "Revert to prompt-based JSON generation, because structured outputs is evidently corrupting numeric values during constrained decoding.",
      "Add minimum and maximum constraints to each amount field in the JSON schema.",
      "Increase max_tokens so the model has room to compute totals accurately.",
      "Schema compliance doesn't guarantee correct values; check the sums in code and retry with the specific discrepancy."
     ],
     "answer": 3,
     "explain": "Schema bảo đảm cú pháp, không bảo đảm ngữ nghĩa. Kiểm tra tổng tiền là việc của code, và retry kèm lỗi cụ thể giúp model sửa đúng chỗ. A đổ lỗi sai chỗ. B: structured outputs không hỗ trợ minimum/maximum (sẽ lỗi 400), và dù có cũng không kiểm tra được tổng. C không liên quan, vì response không bị cắt.",
     "sc": "s6",
     "ts": [
      "4.4"
     ]
    },
    {
     "q": "A team is evaluating the Message Batches API for two workloads: (1) a pre-merge check that developers wait on before merging, and (2) a nightly audit of 40,000 support transcripts. Which TWO statements are correct? (Choose TWO.)",
     "options": [
      "The nightly audit is a good fit: batch requests cost 50% less, and the job can tolerate results arriving hours later.",
      "The pre-merge check is a good fit, because batches typically complete within a few seconds.",
      "Each request should carry a unique custom_id, because results may be returned in a different order than they were submitted.",
      "A single batch request can run a full multi-turn agent loop, executing your own tools between turns.",
      "Batches are guaranteed to finish within one hour."
     ],
     "answer": [
      0,
      2
     ],
     "explain": "Audit hằng đêm không ai chờ nên tận dụng được giảm 50%. Kết quả batch có thể không theo thứ tự, nên phải khớp bằng custom_id. B sai: batch có thể mất tới 24 giờ, không hợp luồng chặn. D sai: mỗi request là một lời gọi Messages, tool phía bạn phải chạy giữa các request. E sai: phần lớn xong dưới 1 giờ nhưng không có cam kết, và giới hạn thật là 24 giờ.",
     "ts": [
      "4.5"
     ]
    },
    {
     "q": "A legal-analysis prompt contains, in order: detailed instructions, a 150-page contract, and the question. Answers often miss relevant clauses deep in the contract. Which change is MOST likely to help first?",
     "options": [
      "Put the contract first in XML document tags, the question last, and ask Claude to quote relevant clauses before answering.",
      "Split the contract into ten chunks, send each chunk with the question as a separate parallel call, and concatenate the ten answers.",
      "Repeat the instructions three times throughout the prompt.",
      "First ask Claude to summarize the contract, then answer the question from the summary."
     ],
     "answer": 0,
     "explain": "Docs khuyên đặt tài liệu dài lên đầu, câu hỏi ở cuối, bọc bằng thẻ XML, và yêu cầu trích dẫn trước để tập trung vào phần liên quan. B làm mất liên kết chéo giữa các điều khoản. C không giải quyết cách tổ chức. D đánh mất chi tiết, vì bản tóm tắt dễ bỏ chính các điều khoản nhỏ mà câu hỏi cần.",
     "ts": [
      "5.1"
     ]
    },
    {
     "q": "A single-pass review of a 30-file pull request produces detailed comments on the first few files, shallow comments on the rest, and misses an interface mismatch between two services. What is the BEST redesign?",
     "options": [
      "Use a model with a much larger context window so the entire pull request fits comfortably, and keep the single comprehensive review pass.",
      "Ask the session that generated the changes to review its own work once more.",
      "Review only the five largest files, since they carry most of the risk.",
      "Run a focused pass per file plus a separate cross-file integration pass, using a reviewer independent of the author session."
     ],
     "answer": 3,
     "explain": "Chia lượt theo trọng tâm chống 'loãng' sự chú ý. Lượt tích hợp riêng bắt lỗi xuyên file, và reviewer độc lập không mang lập luận của phiên viết code. A không sửa vấn đề phân bổ chú ý. B: phiên tác giả dễ bỏ qua lỗi của chính nó. C bỏ sót có chủ đích.",
     "sc": "s5",
     "ts": [
      "4.6"
     ]
    },
    {
     "q": "A ticket classifier assigns one of six categories. It is consistent on clear cases but flips between \"billing\" and \"account\" on borderline tickets, such as double charges after an email change. What is the MOST effective improvement?",
     "options": [
      "Ask the model for a confidence score on every ticket and automatically route low-confidence tickets to a separate \"other\" category for later triage.",
      "Add more fine-grained categories so borderline tickets have their own label.",
      "Add 3–5 diverse examples of billing-versus-account borderline tickets, each with a brief rationale for its label.",
      "Add \"think very carefully before choosing a category\" to the prompt."
     ],
     "answer": 2,
     "explain": "Ví dụ có giá trị nhất ở ranh giới mơ hồ. Kèm lý do giúp model khái quát quy tắc thay vì bắt chước bề mặt. A né vấn đề bằng điểm tự tin không được hiệu chuẩn. B tạo thêm nhiều ranh giới mơ hồ mới. D là lời dặn chung chung, không cung cấp quy tắc phân định.",
     "ts": [
      "4.2"
     ]
    }
   ],
   "bank": [
    {
     "q": "An automated review bot reports findings in five categories. Developers say two categories (naming and \"possible performance issue\") are wrong most of the time, and they have started ignoring the bot entirely, including its accurate security findings. What should the team do FIRST?",
     "options": [
      "Temporarily turn off the two high false-positive categories while refining their criteria and examples.",
      "Keep every category but add \"only report findings you are highly confident about\" to the system prompt.",
      "Have the bot attach a self-reported confidence score to each finding and let developers filter the list themselves.",
      "Run the review three times and post only findings that appear in at least two of the three runs."
     ],
     "answer": 0,
     "explain": "Đúng (lời khuyên thiết kế): false positive ở vài nhóm làm mất niềm tin vào cả những nhóm chính xác; tạm tắt các nhóm nhiễu để khôi phục niềm tin, đồng thời viết lại tiêu chí rõ ràng kèm ví dụ cho các nhóm đó trước khi bật lại. Sai: \"chỉ báo khi rất tự tin\" là chỉ dẫn mơ hồ, docs Prompting best practices khuyên nói cụ thể thứ mình muốn. Điểm tự tin tự khai báo không được hiệu chuẩn và đẩy việc lọc sang dev. Chạy ba lần tăng chi phí gấp ba và không sửa tiêu chí sai gốc.",
     "sc": "s5",
     "ts": [
      "4.1"
     ]
    },
    {
     "q": "A code-review prompt asks Claude to rate each issue as critical, high, medium, or low. The same missing-authorization bug is rated critical in one pull request and low in another. What is the MOST effective fix?",
     "options": [
      "Reduce the scale to two levels, important and unimportant, so there are fewer boundaries to disagree about.",
      "Define each severity level with explicit criteria and a concrete code example of each.",
      "Ask Claude to think carefully and stay consistent with the severities it assigned earlier in the same review.",
      "Average the severities from several independent runs and post the rounded value as the final rating."
     ],
     "answer": 1,
     "explain": "Đúng: docs Prompting best practices khuyên cụ thể về output và ràng buộc mong muốn, và ví dụ là một trong những cách đáng tin nhất để điều hướng output; định nghĩa từng mức bằng tiêu chí rõ và ví dụ code cụ thể giúp cùng một loại lỗi luôn vào cùng mức. Sai: bớt mức không loại bỏ sự mơ hồ, chỉ dời ranh giới. \"Nhất quán với lần trước trong cùng review\" không giúp giữa các PR khác nhau. Lấy trung bình nhiều lần tốn kém và vẫn dựa trên tiêu chí không xác định.",
     "sc": "s5",
     "ts": [
      "4.1"
     ]
    },
    {
     "q": "A pipeline extracts citations from research papers. It works on papers with a bibliography section but returns empty or malformed results for papers that use inline footnote citations or numbered endnotes. What is the BEST prompt improvement?",
     "options": [
      "Add the instruction \"extract all citations regardless of their format\" in capital letters at the start of the prompt.",
      "Pre-filter out every paper that does not have a bibliography section before it reaches the extraction step.",
      "Add a few examples covering each citation style, with the expected extraction for each one.",
      "Increase max_tokens so that the model has more room to process papers with many citations."
     ],
     "answer": 2,
     "explain": "Đúng: docs Prompting best practices: ví dụ (few-shot) là cách đáng tin để điều hướng định dạng và cấu trúc output; ví dụ nên sát use case thật và đa dạng, phủ edge case — ở đây là các kiểu trích dẫn khác nhau. Sai: một câu chỉ dẫn chung chung không chỉ cho mô hình cách xử lý từng định dạng; viết hoa không thay được ví dụ. Lọc bỏ tài liệu là né vấn đề và mất dữ liệu. max_tokens không phải nguyên nhân khi output rỗng hoặc sai định dạng.",
     "sc": "s6",
     "ts": [
      "4.2"
     ]
    },
    {
     "q": "A support-reply generator uses four few-shot examples, all with the same three-paragraph layout and the same opening phrase. Outputs now copy that phrase and layout even when a one-line answer would fit. Which TWO changes BEST follow Anthropic's guidance on examples? (Choose TWO.)",
     "options": [
      "Make the examples diverse in length, structure, and edge cases so Claude doesn't copy unintended patterns.",
      "Remove all examples and rely only on a long description of the desired tone and format.",
      "Wrap each example in <example> tags (and the set in <examples>) so they are clearly separated from instructions.",
      "Add ten more examples with the same three-paragraph layout so the pattern is applied more consistently.",
      "Move the examples after the customer's message so that Claude reads them last and weighs them more."
     ],
     "answer": [
      0,
      2
     ],
     "explain": "Đúng: docs Prompting best practices (Use examples effectively): ví dụ nên Relevant, Diverse (đủ khác nhau và phủ edge case để Claude không bắt chước mẫu ngoài ý muốn) và Structured (bọc trong <example>, nhiều ví dụ trong <examples>, để phân biệt với chỉ dẫn); docs gợi ý 3–5 ví dụ. Sai: bỏ hết ví dụ là bỏ một trong những công cụ đáng tin nhất để điều khiển định dạng. Thêm nhiều ví dụ giống hệt càng củng cố đúng thứ đang muốn tránh. Dời ví dụ ra sau tin nhắn khách không giải quyết việc thiếu đa dạng, và docs không khuyến nghị điều đó.",
     "ts": [
      "4.2"
     ]
    },
    {
     "q": "A product-description generator's system prompt says \"Do not use markdown. Do not use bullet points.\" Outputs still contain headers and lists. Which change does Anthropic's prompting guidance suggest?",
     "options": [
      "Repeat the prohibitions three times and add \"THIS IS CRITICAL\" to make them stand out more clearly.",
      "Keep the prompt as is and strip markdown from outputs with a regular expression after generation.",
      "Write the system prompt itself as a heavily formatted markdown list so the rules are easier to scan.",
      "Say what to do instead, e.g. \"Write the description as smoothly flowing prose paragraphs.\""
     ],
     "answer": 3,
     "explain": "Đúng: docs Prompting best practices (Control the format of responses): bảo Claude làm gì thay vì không làm gì, ví dụ thay \"Do not use markdown\" bằng yêu cầu viết văn xuôi trôi chảy; docs cũng nói phong cách prompt ảnh hưởng phong cách output. Sai: lặp lại và viết hoa không phải cách docs khuyên, và Claude Code Best practices ghi nhấn mạnh quá đà dễ phản tác dụng. Lọc bằng regex là chữa cháy, có thể làm hỏng nội dung. Viết prompt dày markdown còn đẩy output về phía markdown, ngược mục tiêu.",
     "ts": [
      "4.1"
     ]
    },
    {
     "q": "A voice assistant's prompt says \"NEVER use ellipses.\" Claude follows it in most cases but still uses them in some unusual situations. Which revision BEST applies Anthropic's guidance on adding context?",
     "options": [
      "Explain the reason: the text is read aloud by a text-to-speech engine that cannot pronounce ellipses.",
      "Add a list of every punctuation mark that is allowed in the response so ellipses are excluded implicitly.",
      "Increase the emphasis by placing the rule both at the start and at the end of the system prompt.",
      "Lower the temperature so that rarely used punctuation such as ellipses is sampled less often."
     ],
     "answer": 0,
     "explain": "Đúng: docs Prompting best practices (Add context to improve performance) dùng gần đúng ví dụ này: thay \"NEVER use ellipses\" bằng giải thích phản hồi sẽ được đọc bằng text-to-speech không phát âm được dấu ba chấm; Claude khái quát hóa từ lời giải thích, nên xử lý được cả trường hợp lạ. Sai: danh sách dấu được phép dài dòng và vẫn thiếu lý do. Nhấn mạnh hai lần không giúp mô hình hiểu mục đích. Giảm temperature không phải cơ chế tuân thủ quy tắc.",
     "ts": [
      "4.1"
     ]
    },
    {
     "q": "A team migrates a JSON-extraction prompt to a newer Claude model. Their old technique, prefilling the assistant turn with \"{\" to force JSON, now returns a 400 error. What is the recommended replacement?",
     "options": [
      "Prefill with a longer string such as {\"result\": so that the request is no longer treated as a prefill.",
      "Use structured outputs (output_config.format with a JSON schema) to constrain the response.",
      "Move the \"{\" into the system prompt and tell Claude to continue from it as if it were the start of its own reply.",
      "Switch to streaming and discard every token before the first \"{\" that appears in the response."
     ],
     "answer": 1,
     "explain": "Đúng: docs Prompting best practices (Migrating away from prefilled responses): từ các model Claude 4.6 (và Mythos Preview), prefill ở lượt assistant cuối không còn được hỗ trợ và trả lỗi 400; để ép định dạng như JSON, docs chỉ sang structured outputs, tính năng được thiết kế để ràng buộc response theo schema. Docs Structured outputs cũng ghi prefill không tương thích với JSON outputs. Sai: prefill dài hơn vẫn là prefill. Bảo mô hình \"tiếp tục\" từ system prompt không đảm bảo JSON hợp lệ. Bỏ token trước dấu { là chữa cháy, không đảm bảo phần sau hợp lệ.",
     "sc": "s6",
     "ts": [
      "4.3"
     ]
    },
    {
     "q": "With structured outputs, a schema lists properties in the order id, notes, amount, currency, where only id and amount are required. A downstream parser that reads values by position breaks because the output order differs from the schema. Why, and what is the fix?",
     "options": [
      "Structured outputs sorts properties alphabetically, so the parser should sort keys before reading them.",
      "Property order is random on every request, so a strict: true flag on the schema is needed to fix it.",
      "Required properties are emitted first; mark all properties required (nullable if needed) or parse by key.",
      "The parser is fine; the model ignored the schema, so the request should be retried until the order matches."
     ],
     "answer": 2,
     "explain": "Đúng: docs Structured outputs (Property ordering): thuộc tính giữ thứ tự trong schema, với ngoại lệ quan trọng là thuộc tính required xuất hiện trước, rồi đến optional; nếu thứ tự quan trọng thì đánh dấu mọi thuộc tính là required, hoặc xử lý việc sắp lại trong logic parse. Sai: không sắp theo bảng chữ cái. Thứ tự không ngẫu nhiên (strict: true là thuộc tính của tool definition, không phải cách sửa việc này). Mô hình không bỏ qua schema; đây là hành vi đã được mô tả trong docs.",
     "sc": "s6",
     "ts": [
      "4.3"
     ]
    },
    {
     "q": "A ticket classifier uses structured outputs with an enum of labels such as \"account access\" and \"billing dispute.\" Occasionally the output contains \"Billing Dispute,\" and an exact string comparison downstream fails, even though the response completed normally. What is the correct handling?",
     "options": [
      "Treat it as a schema violation and report it as a bug, since structured outputs guarantee exact enum strings.",
      "Add \"minLength\" and \"pattern\" constraints to the enum so that only lowercase values can be generated.",
      "Retry until the label matches exactly, since a mismatched value is always accompanied by a refusal stop_reason.",
      "Compare enum values case-insensitively; capitalization of enum values is not guaranteed."
     ],
     "answer": 3,
     "explain": "Đúng: docs Structured outputs (Invalid outputs, Enum value casing): structured outputs không đảm bảo chữ hoa/thường của giá trị enum và const; output có thể khác schema chỉ ở chữ hoa (thường chữ cái đầu của từ sau khoảng trắng), response vẫn hoàn tất bình thường, không lỗi, không stop_reason đặc biệt; docs khuyên so sánh không phân biệt hoa thường và tránh enum chỉ khác nhau ở chữ hoa. Sai: đây là giới hạn đã được docs ghi, không phải bug. minLength không được hỗ trợ trong structured outputs. Không có stop_reason refusal đi kèm.",
     "ts": [
      "4.3"
     ]
    },
    {
     "q": "An extraction request with output_config.format fails with a 400 error. The schema includes \"minLength\": 3 on a name field and \"maximum\": 100 on a quantity field. What is the BEST way forward?",
     "options": [
      "Drop the unsupported constraints from the sent schema (or let the SDK move them into descriptions) and validate them in code.",
      "Wrap the constrained fields in an anyOf with an unconstrained alternative so that the API accepts the schema.",
      "Switch the request to strict tool use, which supports the full JSON Schema specification without limitations.",
      "Keep the constraints and add a retry loop, since the 400 error is caused by temporary grammar compilation load."
     ],
     "answer": 0,
     "explain": "Đúng: docs Structured outputs (JSON Schema limitations): ràng buộc số (minimum, maximum, multipleOf) và chuỗi (minLength, maxLength) không được hỗ trợ; dùng tính năng không hỗ trợ sẽ nhận lỗi 400. SDK helper có thể biến đổi schema: bỏ ràng buộc không hỗ trợ, thêm chúng vào description, và kiểm tra lại response theo schema gốc trong code. Sai: anyOf không làm minLength/maximum được hỗ trợ. Strict tool use dùng chung giới hạn schema với JSON outputs (docs: \"Both JSON outputs and strict tool use share these limitations\"). Lỗi 400 do schema không hợp lệ, retry không giải quyết.",
     "sc": "s6",
     "ts": [
      "4.3"
     ]
    },
    {
     "q": "A team uses structured outputs and is told that responses are \"guaranteed\" to match the schema. In which TWO situations can a response still fail to match the schema? (Choose TWO.)",
     "options": [
      "The schema has more than five required properties at the top level.",
      "The request is sent through the Message Batches API rather than synchronously.",
      "Claude refuses for safety reasons, returning stop_reason \"refusal\".",
      "The temperature is set above 0.7 for that request.",
      "The response is cut off at the max_tokens limit, returning stop_reason \"max_tokens\"."
     ],
     "answer": [
      2,
      4
     ],
     "explain": "Đúng: docs Structured outputs (Invalid outputs) nêu hai trường hợp: refusal (HTTP 200, vẫn tính phí token, refusal được ưu tiên hơn ràng buộc schema) và max_tokens (output có thể không hoàn chỉnh; thử lại với max_tokens cao hơn). Sai: không có giới hạn \"năm thuộc tính required\" (giới hạn docs nêu là về số tool strict, tham số optional, tham số union). Docs ghi structured outputs hoạt động với Batch processing. Temperature không phải trường hợp được docs nêu là phá vỡ schema.",
     "ts": [
      "4.3"
     ]
    },
    {
     "q": "An agent must call internal tools with guaranteed-valid parameters and then return its final answer as JSON matching a fixed schema for downstream code. How should the request be configured?",
     "options": [
      "Use only output_config.format, because it also constrains the inputs Claude passes to every tool it calls.",
      "Use strict: true on the tool definitions and output_config.format for the final response together.",
      "Use only strict: true, and ask Claude in the prompt to format its final answer as JSON matching the schema.",
      "Choose one of the two, since JSON outputs and strict tool use cannot be enabled in the same request."
     ],
     "answer": 1,
     "explain": "Đúng: docs Structured outputs (Using both features together): JSON outputs điều khiển định dạng câu trả lời của Claude, strict tool use kiểm tham số tool; kết hợp cả hai cho tool call đúng schema VÀ câu trả lời JSON có cấu trúc, hữu ích cho workflow agent. Sai: output_config.format không ràng buộc tool input (docs: grammar chỉ áp cho output trực tiếp của Claude, không cho tool use call). Chỉ dặn bằng prompt thì JSON cuối không được đảm bảo. Docs nói rõ hai tính năng dùng chung một request được.",
     "ts": [
      "4.3"
     ]
    },
    {
     "q": "A document classifier's schema has category: enum [\"invoice\", \"receipt\", \"contract\"]. New document types (purchase orders, credit notes) keep getting forced into one of the three, corrupting downstream reports. What schema change is BEST?",
     "options": [
      "Remove the enum and make category a free-text string so that the model can write any label it wants.",
      "Keep the three values and instruct the model to pick whichever is closest when unsure.",
      "Add an \"other\" value plus a free-text category_detail field to capture what the document actually is.",
      "Make category optional so that the model can omit it for unfamiliar document types."
     ],
     "answer": 2,
     "explain": "Đúng (lời khuyên thiết kế schema): enum đóng ép mô hình chọn sai khi gặp loại mới; thêm \"other\" kèm trường chi tiết dạng chuỗi giữ được tính có cấu trúc cho loại đã biết mà vẫn ghi nhận loại lạ để xem xét và mở rộng enum sau. Sai: bỏ enum hoàn toàn làm nhãn trôi nổi (cùng loại viết nhiều kiểu), downstream khó gộp. \"Chọn cái gần nhất\" chính là nguồn gốc dữ liệu sai. Để optional thì mất phân loại, và docs Structured outputs còn ghi thuộc tính optional bị đưa xuống cuối và tính vào giới hạn độ phức tạp.",
     "sc": "s6",
     "ts": [
      "4.3"
     ]
    },
    {
     "q": "An extraction pipeline validates each result and retries with the error message when a field fails validation. For some contracts the governing-law field is never filled even after three retries; investigation shows those contracts reference a separate master agreement that the pipeline does not include. What should the pipeline do?",
     "options": [
      "Increase the retry limit to ten, since the model eventually fills required fields if asked often enough.",
      "Make the field required in the schema so that the model is forced to produce a value on the first attempt.",
      "Add an example to the prompt showing a typical governing-law clause so the model can infer the missing value.",
      "Stop retrying for that field, record it as null or missing-source, and route the document for review if needed."
     ],
     "answer": 3,
     "explain": "Đúng (lời khuyên thiết kế): retry kèm thông báo lỗi giúp khi lỗi là định dạng hay cấu trúc; nhưng khi thông tin không có trong tài liệu đầu vào, thử lại không thể tạo ra nó. Ghi nhận rõ là thiếu (null hoặc missing-source) và chuyển người xem là cách trung thực. Sai: tăng số lần thử chỉ tốn tiền hoặc dẫn đến bịa. Bắt buộc trường là đẩy mô hình bịa giá trị. Ví dụ điều khoản điển hình khuyến khích suy đoán thay vì trích xuất.",
     "sc": "s6",
     "ts": [
      "4.4"
     ]
    },
    {
     "q": "Invoice extraction occasionally returns line items that do not sum to the invoice total, and downstream systems cannot tell whether the invoice itself is inconsistent or the extraction is wrong. Which schema design BEST supports automatic detection?",
     "options": [
      "Extract both the stated total and a calculated sum of line items, plus a flag for when they disagree.",
      "Extract only the calculated total so that the output is always internally consistent by construction.",
      "Extract only the stated total, since the printed figure on the invoice is authoritative by definition.",
      "Add a confidence field from 0 to 1 for the total and auto-approve anything above 0.9."
     ],
     "answer": 0,
     "explain": "Đúng (lời khuyên thiết kế): lấy cả số in trên hóa đơn và tổng tính từ dòng hàng, kèm cờ mâu thuẫn, cho phép code phát hiện chênh lệch (exam guide CCAR-F mô tả đúng mẫu calculated_total, stated_total và cờ conflict_detected; code vẫn nên tự cộng lại để kiểm tra, xem l-4-5) và phân biệt hóa đơn tự mâu thuẫn với lỗi trích xuất; structured outputs đảm bảo đúng schema chứ không đảm bảo giá trị đúng. Sai: chỉ giữ một con số là giấu đi đúng tín hiệu cần để phát hiện lỗi. Điểm tự tin tự khai báo không được hiệu chuẩn, không thay được phép kiểm tra số học tất định.",
     "sc": "s6",
     "ts": [
      "4.4"
     ]
    },
    {
     "q": "A contract-analysis service must return results within 30 hours of a document arriving. The team wants the 50% cost saving of the Message Batches API and accumulates incoming documents before each submission. What is the longest gap they can safely leave between batch submissions?",
     "options": [
      "About 24 hours, because most batches finish in under an hour, which leaves plenty of margin.",
      "About 6 hours, because a batch can take up to 24 hours before it completes or expires.",
      "About 29 hours, because batch results remain available for 29 days after the batch is created.",
      "It doesn't matter, because batch requests are processed in the order submitted and finish within minutes."
     ],
     "answer": 1,
     "explain": "Đúng: docs Batch processing ghi phần lớn batch xong trong dưới 1 giờ nhưng kết quả có thể chỉ có khi mọi request xong hoặc sau 24 giờ, và batch hết hạn nếu chưa xong trong 24 giờ. Tài liệu đến ngay sau một lần nộp phải chờ tới lần nộp kế (khoảng cách N giờ) cộng tối đa 24 giờ xử lý: N + 24 ≤ 30 nên N ≤ 6. Sai: \"phần lớn dưới 1 giờ\" không phải đảm bảo, phải tính trường hợp xấu nhất. 29 ngày là thời gian giữ kết quả, không phải thời gian xử lý. Docs không đảm bảo thứ tự hay thời gian vài phút.",
     "sc": "s6",
     "ts": [
      "4.5"
     ]
    },
    {
     "q": "A nightly batch of 20,000 extraction requests ends with most results succeeded, but some errored (invalid requests) and some expired. What is the correct way to recover?",
     "options": [
      "Resubmit the entire original batch, since a batch with any failed requests is billed and processed as a unit.",
      "Edit the existing batch to replace the failed requests, then let it continue processing the corrected ones.",
      "Identify those requests by custom_id, fix the invalid ones, and submit only them in a new batch.",
      "Match the failed results to inputs by their position in the results file, which mirrors the submission order."
     ],
     "answer": 2,
     "explain": "Đúng: docs Batch processing: mỗi request có custom_id duy nhất; kết quả có bốn loại succeeded, errored, canceled, expired; errored và expired không bị tính phí; lỗi của một request không ảnh hưởng request khác; kết quả có thể không theo thứ tự nộp nên luôn dùng custom_id để ghép. Sai: không cần nộp lại cả batch (và sẽ trả tiền lại cho phần đã thành công). Docs FAQ ghi batch đã nộp không sửa được; muốn đổi thì hủy và nộp batch mới. Ghép theo vị trí sai vì thứ tự không được đảm bảo.",
     "sc": "s6",
     "ts": [
      "4.5"
     ]
    },
    {
     "q": "Which TWO statements about Message Batches API results are correct? (Choose TWO.)",
     "options": [
      "If any single request in a batch fails validation, the whole batch is rejected and nothing is processed.",
      "Results may come back in a different order than the requests, so each must be matched by its custom_id.",
      "Results stay downloadable indefinitely, as long as the workspace that created the batch still exists.",
      "Requests that end as errored or expired are not billed.",
      "A submitted batch can be edited to add new requests until its processing_status becomes \"ended\"."
     ],
     "answer": [
      1,
      3
     ],
     "explain": "Đúng: docs Batch processing có tip \"Batch results may not match input order\" và khuyên luôn dùng custom_id; bảng result types ghi errored, canceled và expired đều không bị tính phí. Sai: docs ghi lỗi của một request không ảnh hưởng xử lý các request khác (validation params còn diễn ra bất đồng bộ, lỗi trả về khi cả batch kết thúc). Kết quả chỉ có trong 29 ngày kể từ lúc tạo. Batch đã nộp không sửa được.",
     "ts": [
      "4.5"
     ]
    },
    {
     "q": "A team builds a 50,000-request batch with a new request shape. Several hours later, when processing ends, a large share of results are errored because of an invalid parameter. How could they have caught this earlier?",
     "options": [
      "Set \"validate_only\": true on the batch so that the API checks every request before processing begins.",
      "Submit the batch with stream: true so that validation errors are streamed back as soon as they occur.",
      "Nothing could have caught it, since batch requests use a different parameter format than the Messages API.",
      "Send one request with the same shape to the Messages API first, because batch validation happens asynchronously."
     ],
     "answer": 3,
     "explain": "Đúng: docs Batch processing: việc kiểm tra object params của từng request diễn ra bất đồng bộ, lỗi được trả về khi cả batch xử lý xong; docs khuyên kiểm tra hình dạng request bằng Messages API trước (\"dry run a single request shape\"). Sai: không có tham số validate_only. stream: true không được hỗ trợ trong batch và gây lỗi validation (kết quả batch trả về dưới dạng một file). Params của mỗi request batch chính là tham số chuẩn của Messages API.",
     "ts": [
      "4.5"
     ]
    },
    {
     "q": "A marketing team generates product descriptions and wants each draft checked against a brand-voice rubric and then improved, with the ability to log and inspect each stage. Which approach fits BEST?",
     "options": [
      "Chain separate calls: generate a draft, have Claude review it against the rubric, then refine using that review.",
      "Put the rubric, the drafting instructions, and the revision instructions into one prompt and take the first output.",
      "Generate ten drafts in parallel and choose the longest one, since longer drafts usually cover more of the rubric.",
      "Fine-tune the prompt by adding \"follow the brand voice perfectly\" until the first draft passes review."
     ],
     "answer": 0,
     "explain": "Đúng: docs Prompting best practices (Chain complex prompts): chaining vẫn hữu ích khi cần kiểm tra output trung gian hoặc ép cấu trúc pipeline; mẫu phổ biến nhất là self-correction: tạo bản nháp → Claude review theo tiêu chí → Claude chỉnh theo review, mỗi bước là một API call riêng để log, đánh giá hoặc rẽ nhánh. Sai: gộp một prompt mất khả năng kiểm tra từng bước. Chọn bản dài nhất không liên quan đến rubric. Thêm câu \"hoàn hảo\" là chỉ dẫn mơ hồ, không phải quy trình kiểm tra.",
     "ts": [
      "1.6",
      "4.6"
     ]
    },
    {
     "q": "A classifier is asked to answer with one label from a fixed list, but it returns variants such as \"Billing\", \"billing issue\", and \"Billing - refund\", which break downstream routing. Which approach BEST guarantees a valid label?",
     "options": [
      "Add a sentence listing the valid labels and asking Claude to copy one of them exactly as written.",
      "Return the label via structured outputs (or a strict tool) whose schema has an enum of valid labels.",
      "Post-process the text with fuzzy string matching to map each variant to its closest valid label.",
      "Lower the temperature to 0 so that Claude always produces exactly the same spelling of each label."
     ],
     "answer": 1,
     "explain": "Đúng: docs Prompting best practices (migrating away from prefill) nêu với tác vụ phân loại, dùng tool có trường enum chứa nhãn hợp lệ hoặc dùng structured outputs; với structured outputs hoặc strict tool use, constrained decoding giữ output trong tập giá trị (chỉ lưu ý chữ hoa/thường của enum không được đảm bảo, nên so sánh không phân biệt hoa thường). Sai: liệt kê nhãn trong prompt giúp nhưng không đảm bảo. Fuzzy matching có thể ánh xạ sai và che lỗi. Temperature 0 không giới hạn tập giá trị.",
     "ts": [
      "4.3"
     ]
    },
    {
     "q": "A nightly batch sends 10,000 requests that each begin with the same 60,000-token policy manual followed by a different short case. Cache hits are rare. What does the documentation recommend to improve them?",
     "options": [
      "Split the batch into 10,000 separate batches of one request each so that every request can reuse the cache.",
      "Place the varying case text before the policy manual so the cached portion stays at the end of each request.",
      "Put identical cache_control blocks on the shared prefix in every request, and consider the 1-hour cache duration.",
      "Enable streaming on each request, since cache hits are only recorded for streamed batch responses."
     ],
     "answer": 2,
     "explain": "Đúng: docs Batch processing (Using prompt caching with Message Batches): batch hỗ trợ prompt caching và giảm giá cộng dồn; cache hit là best-effort vì request chạy bất đồng bộ và đồng thời; để tăng khả năng hit, đặt khối cache_control giống hệt nhau trong mọi request và chia sẻ càng nhiều nội dung càng tốt; docs cũng gợi ý dùng cache 1 giờ vì batch có thể chạy lâu hơn 5 phút. Sai: tách ra hàng nghìn batch không giúp cache và rất khó quản lý. Cache là theo prefix (tools → system → messages), nội dung thay đổi phải đặt sau phần tĩnh. stream: true không được hỗ trợ trong batch.",
     "ts": [
      "4.5"
     ]
    },
    {
     "q": "A pipeline submits extraction requests to the Message Batches API with stream: true copied over from its synchronous code path. What happens?",
     "options": [
      "The batch streams each result back over the open connection as soon as that request finishes.",
      "stream is ignored silently, and the batch completes normally with results in the usual file.",
      "The batch is processed at standard price instead of the 50% batch discount.",
      "The requests fail validation, because streaming is not supported inside batch requests."
     ],
     "answer": 3,
     "explain": "Đúng: docs Batch processing (What can be batched) có bảng tham số không được hỗ trợ trong batch: stream: true (kết quả batch trả về dạng một file, không phải stream), speed, fallbacks, max_tokens: 0; đưa vào sẽ nhận lỗi validation. Sai: batch không giữ kết nối để stream. Docs nói rõ là lỗi chứ không bỏ qua lặng lẽ. Không có quy tắc đổi sang giá thường.",
     "sc": "s6",
     "ts": [
      "4.5"
     ]
    },
    {
     "q": "Developers dismiss many findings from an automated review bot, and the team wants to learn which kinds of findings get dismissed so it can improve the prompt systematically. Which change to the bot's output schema BEST supports this analysis?",
     "options": [
      "Add a detected_pattern field naming the code construct that triggered each finding.",
      "Add a free-text \"notes\" field where the model can describe its findings in its own words.",
      "Remove the category field so that developers judge each finding on its own merits instead.",
      "Add a self-reported confidence field and drop every finding under 0.5 before posting."
     ],
     "answer": 0,
     "explain": "Đúng (lời khuyên thiết kế): ghi lại mẫu mã nào kích hoạt mỗi phát hiện (ví dụ \"nested ternary\", \"unchecked array index\") cho phép thống kê mẫu nào hay bị dismiss, từ đó sửa tiêu chí hoặc ví dụ trong prompt một cách có hệ thống. Sai: ghi chú tự do khó gộp và phân tích. Bỏ category làm mất thông tin phân tích. Lọc theo điểm tự tin tự khai báo che giấu dữ liệu, không giải thích vì sao bị dismiss.",
     "sc": "s5",
     "ts": [
      "4.4"
     ]
    },
    {
     "q": "In a research system, the synthesis agent writes a draft report and is then asked, in the same conversation, to \"double-check every claim against its sources.\" It almost always confirms its own claims, yet reviewers keep finding statements that the cited excerpts do not support. What is the BEST change?",
     "options": [
      "Use a separate verifier instance that gets each claim with its cited excerpt, but not the drafting conversation, and marks it supported or not.",
      "Ask the synthesis agent to double-check twice, with stronger wording telling it to be highly critical of its own draft.",
      "Have the synthesis agent attach a confidence score to each claim, and drop every claim scored below 0.7 before publishing.",
      "Lower the synthesis agent's temperature so that its first draft contains fewer unsupported statements to begin with."
     ],
     "answer": 0,
     "explain": "A đúng: tự review trong cùng phiên yếu vì phiên đó vẫn mang lập luận đã dẫn tới claim. Một instance độc lập, chỉ thấy claim và đoạn trích được dẫn, đánh giá đúng câu hỏi \"đoạn này có ủng hộ claim không\" mà không bị neo vào bản nháp. B sai: lời lẽ mạnh hơn không gỡ được thiên lệch của chính phiên đã viết. C sai: confidence do model tự báo chưa được hiệu chuẩn, nên ngưỡng 0.7 không tương ứng với việc claim có được nguồn ủng hộ hay không. D sai: temperature không giải quyết chuyện claim vượt quá nội dung nguồn, và không thay được một bước kiểm tra.",
     "sc": "s3",
     "ts": [
      "4.6"
     ]
    },
    {
     "q": "A research report has twelve sections, each written from a different subagent's findings. Reviewers find every section accurate on its own, but the executive summary says the market grew 12% while section 7 says 8%, and two sections define \"small business\" differently. Which review design BEST catches problems like these?",
     "options": [
      "Re-run the per-section reviews with a stricter rubric, since each section's accuracy check evidently missed these errors.",
      "Have one reviewer read the entire report in a single pass and comment on anything that looks wrong to it.",
      "Keep the per-section checks and add a separate cross-section pass that compares figures, definitions, and conclusions.",
      "Assign all twelve sections to a single subagent next time, so that only one author writes the whole report."
     ],
     "answer": 2,
     "explain": "C đúng: lỗi ở đây nằm giữa các phần (con số và định nghĩa không khớp nhau), nên cần một lượt tích hợp chuyên so sánh xuyên phần, bên cạnh lượt kiểm tra từng phần. Đây là mẫu review nhiều lượt: lượt cục bộ cộng lượt tích hợp. A sai: từng phần vốn đã đúng khi xét riêng; rubric chặt hơn cho từng phần vẫn không nhìn thấy mâu thuẫn giữa các phần. B sai: một lượt đọc toàn bộ dễ bị loãng sự chú ý trên báo cáo dài, và không có trọng tâm rõ vào tính nhất quán. D sai: bỏ lợi ích chia việc song song, và một tác giả viết báo cáo dài vẫn có thể tự mâu thuẫn.",
     "sc": "s3",
     "ts": [
      "4.6"
     ]
    },
    {
     "q": "An invoice pipeline uses structured outputs, with invoice_date defined as {\"type\": \"string\", \"format\": \"date\"}. Every response matches the schema, yet audits find that some invoices from European suppliers printed as \"03/04/2026\" (3 April) are stored as 2026-03-04. What is the BEST fix?",
     "options": [
      "Add a regex pattern to invoice_date that requires the YYYY-MM-DD form, so that the model can no longer put the day and month in the wrong order.",
      "Retry every extraction whose date fails schema validation, and include the validation error in the retry request.",
      "Add prompt rules and examples for reading day-first vs month-first dates, and return null with a flag when still ambiguous.",
      "Replace structured outputs with a strict tool that has the same schema, since strict tool use also checks that dates are plausible."
     ],
     "answer": 2,
     "explain": "C đúng: schema chỉ bảo đảm cú pháp. Docs structured outputs liệt kê date trong các format chuỗi được hỗ trợ, và 2026-03-04 là một ngày hợp lệ về cú pháp. Chọn đúng thứ tự ngày/tháng là chuyện ngữ nghĩa, nên phải nằm trong quy tắc chuẩn hóa của prompt (dựa vào dấu hiệu như quốc gia nhà cung cấp, kèm ví dụ); khi vẫn mơ hồ thì để null kèm cờ cho người hoặc code xử lý thay vì đoán (lời khuyên thiết kế). A sai: output vốn đã đúng dạng YYYY-MM-DD; pattern không biết đâu là ngày, đâu là tháng. B sai: các ngày sai này vẫn hợp lệ với schema, nên không có lỗi validation nào để kích hoạt retry. D sai: docs ghi strict tool use dùng chung pipeline grammar và chung giới hạn JSON Schema với structured outputs; nó cũng chỉ ràng buộc cú pháp, không kiểm tra ngày có hợp lý hay không.",
     "sc": "s6",
     "ts": [
      "4.3"
     ]
    },
    {
     "q": "An independent verifier instance reviews each extracted contract against its source document, but it returns one free-text critique per document, so the team cannot decide automatically which fields need a human. What change BEST supports routing?",
     "options": [
      "Ask the verifier for a single overall score per document and send every document scoring below 0.5 to human review.",
      "Have the extraction instance read the verifier's critique and decide by itself which fields need to be changed.",
      "Make the critique longer and more detailed, so that human reviewers can scan it for problems more easily.",
      "Return a per-field verdict (confirmed, incorrect, not found in source) with the supporting excerpt, and route non-confirmed fields."
     ],
     "answer": 3,
     "explain": "D đúng: kết quả review ở dạng có cấu trúc theo từng trường cho phép code định tuyến tất định: trường được xác nhận thì đi tiếp, trường sai hoặc không tìm thấy nguồn thì vào hàng đợi người, kèm đoạn trích để người duyệt kiểm tra nhanh. A sai: một điểm cho cả tài liệu che mất trường nào có vấn đề, và ngưỡng chưa được hiệu chuẩn. B sai: để chính phiên trích xuất tự phán xử lại đưa thiên lệch quay về, và vẫn không có quyết định nào máy đọc được. C sai: văn bản dài hơn vẫn là văn bản tự do, không định tuyến tự động được.",
     "sc": "s6",
     "ts": [
      "4.6",
      "5.5"
     ]
    },
    {
     "q": "An extraction service uses output_config.format with a JSON schema. Auditors now require every extracted value to point to the exact passage in the source contract. A developer enables citations on the document blocks in the same request, and the API returns a 400 error. Which approach do the docs suggest?",
     "options": [
      "Keep output_config.format and add a source_quote string to each field, which the API then checks against the document text before returning.",
      "Keep citations, ask for one \"field: value\" line per field, and parse the lines and their citations into structured data in code.",
      "Retry the request, because the 400 error comes from temporary load when citations and schemas are compiled together.",
      "Enable citations on only one copy of the contract and send a second copy without citations alongside it in the request."
     ],
     "answer": 1,
     "explain": "B đúng: docs structured outputs ghi citations không tương thích với output_config.format (API trả 400), và docs citations hướng dẫn xin mỗi trường một dòng dạng \"field: value\" rồi để code ghép các dòng cùng citations thành dữ liệu có cấu trúc. A sai: trường source_quote chỉ là text do model sinh ra; API không đối chiếu nó với tài liệu, nên không có bảo đảm như citations. C sai: đây là lỗi do kết hợp tính năng không được hỗ trợ, thử lại vẫn lỗi. D sai: docs ghi citations phải bật trên tất cả hoặc không tài liệu nào trong một request, và output_config.format vẫn xung đột.",
     "sc": "s6",
     "ts": [
      "4.3",
      "5.6"
     ]
    },
    {
     "q": "An extraction pipeline used tool_choice {\"type\": \"tool\", \"name\": \"record_invoice\"} to force a strict extraction tool. After switching to Claude Opus 5.5, every request returns a 400 error. Which change keeps schema-guaranteed output?",
     "options": [
      "Switch to tool_choice {\"type\": \"any\"}, which still forces a tool call without naming one particular tool.",
      "Prefill the assistant turn with the start of a record_invoice call, so that the model simply continues the call.",
      "Remove strict: true from the tool definition, since strict mode is what the newer model rejects together with forcing.",
      "Use output_config.format with the invoice schema, or tool_choice auto with the strict tool."
     ],
     "answer": 3,
     "explain": "D đúng: docs define-tools hiện ghi (tháng 11/2026) Claude Opus 5.5 trả lỗi 400 với tool_choice any và tool, và đề nghị dùng auto kèm strict tool use (input tool đúng schema) hoặc structured outputs khi cần response theo một khuôn JSON cố định. A sai: any cũng là ép tool, bị từ chối giống tool. B sai: docs prompting ghi bắt đầu từ các model Claude 4.6, prefill ở lượt assistant cuối không còn được hỗ trợ và trả lỗi 400. C sai: lỗi do ép tool chứ không do strict; bỏ strict chỉ làm mất bảo đảm schema. (Lưu ý: với auto, Claude có thể không gọi tool; nếu mọi response đều phải là JSON theo schema thì output_config.format là lựa chọn chắc hơn.)",
     "sc": "s6",
     "ts": [
      "4.3"
     ]
    },
    {
     "q": "An extraction request includes five strict tools, one per document type, each with many optional and nullable fields. It fails with a 400 error about schema complexity. Which TWO changes follow the documented ways to reduce schema complexity? (Choose TWO.)",
     "options": [
      "Retry the same request with exponential backoff, since grammar compilation errors are usually transient.",
      "Increase max_tokens so that the compiled grammar has more room to fit all five schemas.",
      "Classify the document first, then send only the matching schema in a separate request.",
      "Make parameters required where a sensible default exists, and have Claude fill in that default explicitly.",
      "Move the five tools' descriptions into the system prompt so that each tool definition becomes shorter."
     ],
     "answer": [
      2,
      3
     ],
     "explain": "C và D đúng: docs structured outputs liệt kê các cách giảm độ phức tạp, trong đó có tách thành nhiều request (mỗi request chỉ mang schema cần dùng) và giảm tham số tùy chọn bằng cách để required khi có giá trị mặc định hợp lý. Giới hạn tính trên tổng mọi strict schema trong một request (docs hiện ghi 24 tham số tùy chọn, 16 tham số union). A sai: đây là giới hạn của schema, không phải lỗi tạm thời. B sai: max_tokens là giới hạn output, không liên quan tới kích thước grammar. E sai: các giới hạn độ phức tạp trong docs tính theo cấu trúc schema (số tool strict, tham số tùy chọn, tham số union, cấu trúc lồng nhau), không theo độ dài mô tả; dời mô tả đi không giảm các con số đó.",
     "sc": "s6",
     "ts": [
      "4.3"
     ]
    },
    {
     "q": "When an extracted invoice fails validation (for example, a due_date earlier than its issue_date), the pipeline re-sends the original request with \"Your previous answer was invalid. Try again.\" appended. Most retries fail the same way. What should the retry request contain instead?",
     "options": [
      "The same request sent again at a higher temperature, so that the model is more likely to produce a different answer the second time.",
      "Only the failed extraction and an instruction to fix it, leaving out the source document to save input tokens.",
      "The source document, the failed extraction, and the specific validation errors, such as which fields conflict and why.",
      "A stronger warning that invalid answers will be rejected, repeated at both the start and the end of the prompt."
     ],
     "answer": 2,
     "explain": "C đúng: retry hiệu quả khi model biết chính xác sai ở đâu (trường nào, quy tắc nào) và vẫn có tài liệu gốc để đọc lại giá trị đúng. A sai: khác đi một cách ngẫu nhiên không đồng nghĩa với đúng hơn; model vẫn không biết lỗi là gì. B sai: thiếu tài liệu gốc thì model chỉ có thể đoán hoặc sửa cho khớp quy tắc, dễ bịa ngày. D sai: lời cảnh báo không cung cấp thông tin mới nào về lỗi.",
     "sc": "s6",
     "ts": [
      "4.4"
     ]
    },
    {
     "q": "An extraction pipeline checks each result by asking a second Claude call, \"Is this extraction valid?\" It has approved results in which the VAT amount does not equal the rate times the net amount, and in which the currency code is not a real ISO 4217 code. What is the BEST improvement?",
     "options": [
      "Implement these rules as deterministic validators in code, and send failures back for retry with the specific rule that failed.",
      "Ask the second call to work through its reasoning step by step and write all of it out in the response before it gives its final verdict.",
      "Replace the second call with a larger model, which is better at arithmetic and at recognizing currency codes.",
      "Add the rules to the extraction prompt in capital letters, and remove the validation step to save cost."
     ],
     "answer": 0,
     "explain": "A đúng: phép nhân VAT và danh sách mã tiền tệ là quy tắc tất định, kiểm tra bằng code thì đúng 100% và rẻ; khi sai, gửi lại kèm quy tắc cụ thể để retry có thông tin. B sai: dù viết lập luận dài, đó vẫn là phán đoán xác suất của model cho một việc mà code kiểm tra chắc chắn được. C sai: model lớn hơn giảm lỗi nhưng không bảo đảm; vẫn là kiểm tra không tất định. D sai: lời dặn ở bước trích xuất không thay được bước kiểm tra, và bỏ validate thì lỗi đi thẳng xuống hệ thống sau.",
     "sc": "s6",
     "ts": [
      "4.4"
     ]
    },
    {
     "q": "A pipeline maps payment terms on supplier invoices to an enum: NET_30, NET_60, EOM_30, DUE_ON_RECEIPT, OTHER. Clear phrases work, but wordings such as \"30 days end of month\", \"payable within thirty days of month-end\", and \"30 days EOM\" are mapped inconsistently. What is the MOST effective improvement?",
     "options": [
      "Remove the OTHER value so that the model must always choose one of the specific payment terms.",
      "Add a few examples of these ambiguous wordings, each with the correct enum value and a one-line reason.",
      "Lower the temperature to 0 so that each wording is always mapped to the same enum value.",
      "Add the instruction \"Be consistent when mapping payment terms\" at the top of the system prompt and repeat it at the end."
     ],
     "answer": 1,
     "explain": "B đúng: few-shot nhắm đúng các ca mơ hồ, kèm lý do ngắn, dạy model ranh giới giữa EOM_30 và NET_30 và giúp nó khái quát sang cách viết khác. A sai: bỏ lối thoát OTHER buộc các điều khoản lạ bị nhét vào nhãn sai. C sai: temperature thấp không dạy model ánh xạ đúng; các cách viết khác nhau vẫn có thể bị ánh xạ khác nhau. D sai: \"hãy nhất quán\" không nói nhất quán theo quy tắc nào.",
     "sc": "s6",
     "ts": [
      "4.2"
     ]
    },
    {
     "q": "A team re-extracts 150,000 archived invoices with the Message Batches API. After each batch ends, a validator finds that about 4% of the succeeded results have specific errors, such as totals that do not match. What is the BEST way to handle these within the batch workflow?",
     "options": [
      "Resubmit the whole original batch with a stricter prompt, since a 4% error rate means the batch as a whole has failed.",
      "Have each batch request run the team's validator between turns and retry inside that same request until the output passes.",
      "Send the failed items to the synchronous Messages API one at a time, since the Batches API cannot accept retried requests.",
      "Collect the failed items by custom_id and submit a follow-up batch that includes the document, failed output, and specific errors."
     ],
     "answer": 3,
     "explain": "D đúng: kết quả batch được khớp bằng custom_id, nên dễ lọc ra các mục validate thất bại và gửi một batch tiếp theo chỉ cho chúng, kèm lỗi cụ thể để retry có thông tin, vẫn giữ mức giá batch. A sai: chạy lại toàn bộ lãng phí 96% kết quả đã tốt. B sai: docs ghi batch nhận được request nhiều lượt và có tool use, nhưng \"nhiều lượt\" nghĩa là lịch sử hội thoại gửi sẵn trong messages; mỗi request được xử lý độc lập và trả về một kết quả, nên validator chạy ở phía bạn không thể chen vào giữa các lượt bên trong request. C sai: Batches API nhận request mới bất kỳ lúc nào; gửi đồng bộ thì được nhưng mất mức giảm 50% mà không có lý do.",
     "sc": "s6",
     "ts": [
      "4.5"
     ]
    },
    {
     "q": "A contract pipeline extracts \"material obligations\" for a legal team. The prompt says: \"Only include important obligations; be selective.\" Outputs mix trivial items (\"send notices to the address above\") with key ones, and the selection varies from run to run. What is the BEST improvement?",
     "options": [
      "Define which categories to include (payment, delivery, liability caps, termination rights) and which to skip, with an example of each.",
      "Add \"be even more selective\" and tell the model to include only those obligations that it is very confident are material to the legal team.",
      "Ask for at most five obligations per contract, so that only the most important ones make it into the output.",
      "Run the extraction three times and keep only the obligations that appear in every one of the runs."
     ],
     "answer": 0,
     "explain": "A đúng: \"quan trọng\" và \"chọn lọc\" là tiêu chí mơ hồ; liệt kê cụ thể loại cần lấy và loại bỏ qua, kèm ví dụ, cho model một ranh giới rõ nên kết quả vừa chính xác hơn vừa ổn định hơn. B sai: vẫn mơ hồ, và dựa vào độ tự tin model tự đánh giá. C sai: giới hạn số lượng tùy tiện có thể cắt mất nghĩa vụ quan trọng ở hợp đồng có nhiều nghĩa vụ. D sai: lấy giao của nhiều lần chạy giảm dao động nhưng không định nghĩa \"material\", và có thể loại bỏ nghĩa vụ quan trọng chỉ xuất hiện ở một số lần.",
     "sc": "s6",
     "ts": [
      "4.1"
     ]
    },
    {
     "q": "A CI pipeline has Claude Code implement a small feature on a branch, then sends the same session \"Now review your changes for bugs\" and posts that review on the PR. The reviews rarely find the problems that human reviewers later catch. What is the BEST change?",
     "options": [
      "Ask the same session to review its changes three times in a row, and post only the issues that appear in all three reviews.",
      "Add \"be extremely critical of your own work\" to the review prompt that the implementing session receives after coding.",
      "Run the review in a separate, fresh instance that sees the diff and the requirements but not the session that wrote the code.",
      "Drop the review step, because a model can never find bugs in code that the same model has just finished generating."
     ],
     "answer": 2,
     "explain": "Tự review trong cùng phiên yếu vì phiên đó mang theo lập luận đã tạo ra code. Best practices nói reviewer mới giúp ích vì nó chưa thấy lập luận của bạn; /code-review chạy trong subagent mới chưa từng thấy hội thoại, và một phiên thứ hai là reviewer độc lập dễ có nhất (exam guide 4.6: dùng instance độc lập). Lặp lại ba lần trong cùng phiên vẫn cùng một góc nhìn bị neo. Câu \"hãy thật khắt khe\" không xóa được ngữ cảnh tác giả. Bỏ review là kết luận sai: model khác phiên, không thấy lập luận cũ, vẫn bắt được lỗi.",
     "sc": "s5",
     "ts": [
      "4.6"
     ]
    },
    {
     "q": "A CI review runs several reviewer instances in parallel on each pull request. Developers report many plausible-sounding findings that turn out to be wrong once someone checks the code. Which addition BEST reduces these false positives before comments are posted?",
     "options": [
      "Posting every finding immediately and letting developers dismiss the wrong ones, which teaches the reviewers to improve over time.",
      "Adding more parallel reviewer instances and posting the union of all their findings, so that fewer real issues slip through.",
      "Asking each reviewer to rate its own confidence and posting everything rated above 0.5, without checking how accurate those scores are.",
      "A verification step where an independent instance checks each candidate finding against the code and drops what it cannot confirm."
     ],
     "answer": 3,
     "explain": "Docs Code Review của Claude Code mô tả đúng kiến trúc này: nhiều agent tìm lỗi song song, rồi một bước xác minh đối chiếu từng phát hiện với code để loại false positive trước khi báo, sau đó gộp trùng và xếp mức độ. Đăng hết rồi để dev bác bỏ là đẩy chi phí sang người và làm dev mất tin vào bot; reviewer cũng không tự học từ việc bị bác. Thêm reviewer và lấy hợp các phát hiện làm tăng số báo nhầm. Confidence tự báo chưa hiệu chuẩn không phải bộ lọc đáng tin.",
     "sc": "s5",
     "ts": [
      "4.6",
      "4.1"
     ]
    },
    {
     "q": "A team sets up an independent Claude review instance in CI for pull requests that another Claude session wrote. Which TWO inputs should the reviewer receive? (Choose TWO.)",
     "options": [
      "The diff, together with enough surrounding code to judge each change in its context",
      "The authoring session's full transcript, including its reasoning for each decision",
      "A note that the author already tested everything carefully, so the review can be brief",
      "The authoring session's own self-review, so the reviewer can confirm it instead of starting over",
      "The spec or acceptance criteria that the change was supposed to satisfy"
     ],
     "answer": [
      0,
      4
     ],
     "explain": "Reviewer độc lập cần thứ để đánh giá: diff kèm code xung quanh để hiểu từng thay đổi, và spec/tiêu chí chấp nhận để kiểm tra yêu cầu đã được đáp ứng (best practices có mẫu \"review the diff against SPEC.md\"). Giá trị của reviewer độc lập là chưa thấy lập luận của tác giả; đưa transcript, lời trấn an \"đã test kỹ\" hay bản tự review của tác giả đều kéo reviewer neo theo kết luận sẵn có, làm mất chính lợi ích của việc review độc lập.",
     "sc": "s5",
     "ts": [
      "4.6"
     ]
    },
    {
     "q": "A CI review uses one prompt that asks a single instance to check each pull request for security flaws, correctness bugs, performance problems, and missing tests. On large PRs, security issues are often missed while the other categories get most of the attention. Which redesign is BEST?",
     "options": [
      "Keep the single pass and move security to the top of the prompt, so that it gets attention before any of the other three categories.",
      "Remove the performance and missing-test checks from the review, so that the single pass has fewer things it needs to examine.",
      "Run separate focused passes, including one dedicated to security, in parallel, then merge and deduplicate findings before posting.",
      "Review only files whose names contain auth or crypto, since security issues are concentrated in files with those names."
     ],
     "answer": 2,
     "explain": "Một lượt ôm nhiều mối quan tâm trên PR lớn làm chú ý bị chia mỏng. Thiết kế nhiều lượt/nhiều instance tập trung (một lượt riêng cho bảo mật) chạy song song rồi gộp, khử trùng là cách exam guide 4.6 và docs SDK gợi ý (ví dụ chạy song song style-checker, security-scanner, test-coverage). Đổi thứ tự trong prompt không tăng chiều sâu cho từng loại. Bỏ bớt hạng mục là bỏ yêu cầu. Lọc theo tên file bỏ sót lỗi bảo mật nằm ở chỗ khác (SQL injection trong handler, lộ secret trong config).",
     "sc": "s5",
     "ts": [
      "4.6"
     ]
    },
    {
     "q": "An automated CI reviewer posts at least two or three comments on every pull request, including one-line documentation fixes. On small PRs most of its comments are speculative, along the lines of \"this might cause issues if...\". Which prompt change BEST addresses this?",
     "options": [
      "Say that an empty findings list is a valid result, and require each finding to describe a concrete failure in the changed code.",
      "Tell the reviewer to post exactly one comment on every pull request, choosing the most important issue that it can find.",
      "Tell the reviewer to be conservative, and to report only the issues that seem important enough to be worth mentioning.",
      "Raise the model's effort level, so that the reviewer thinks for longer before it writes each one of its speculative review comments."
     ],
     "answer": 0,
     "explain": "Best practices cảnh báo: reviewer được yêu cầu tìm vấn đề thì luôn tìm ra \"cái gì đó\". Cần nói rõ không có phát hiện là kết quả hợp lệ và đặt tiêu chí cụ thể: mỗi phát hiện phải nêu kịch bản lỗi cụ thể trong code đã đổi (tool ReportFindings của Claude Code cũng yêu cầu một failure scenario cho mỗi phát hiện). Ép đúng một bình luận mỗi PR vẫn tạo bình luận khi không có gì. \"Be conservative\" là chỉ dẫn mơ hồ mà exam guide 4.1 nói không hiệu quả. Tăng effort không đổi việc prompt ngầm đòi phải có bình luận.",
     "sc": "s5",
     "ts": [
      "4.1"
     ]
    },
    {
     "q": "A CI reviewer receives the full pull-request diff. Developers complain that it comments on package-lock.json churn and on files under src/generated/ that a code generator produces. What is the BEST fix?",
     "options": [
      "Tell the reviewer to use its own judgment about which files matter, without naming any specific paths or file types to skip.",
      "Raise the severity threshold for every comment, so that comments on these particular files are less likely to clear it.",
      "Ask developers to stop committing lock files and generated code, so that the reviewer never sees those files in a diff.",
      "Filter those paths out of the diff before it reaches Claude, and state in the prompt which files are out of scope and why."
     ],
     "answer": 3,
     "explain": "Tiêu chí tường minh (exam guide 4.1): nói rõ loại file nằm ngoài phạm vi và lý do (lock file, code sinh tự động không sửa tay), và với quy tắc chắc chắn như vậy thì lọc luôn bằng code trước khi gửi, vừa chính xác vừa đỡ token. \"Dùng phán đoán của mình\" là chỉ dẫn mơ hồ đang thất bại. Nâng ngưỡng mức độ ảnh hưởng mọi bình luận, có thể chặn cả phát hiện thật mà vẫn không loại đúng hai nhóm file. Bỏ commit lock file là thực hành xấu (mất build tái lập) để vá lỗi của bot.",
     "sc": "s5",
     "ts": [
      "4.1"
     ]
    },
    {
     "q": "A CI reviewer's findings vary in shape: some name the file and line, some quote the code, some give only a vague description, and borderline style nits still appear. The team already lists explicit report and skip criteria in the prompt. What should they add to make the findings consistent?",
     "options": [
      "A longer list of adjectives describing a good finding, such as precise, actionable, concise, specific, and well-grounded.",
      "One example finding, repeated several times throughout the prompt to emphasize the exact wording the reviewer should copy.",
      "Two or three example findings in the required format, plus a borderline case marked as not to be reported, with the reason.",
      "A rule that every finding must be at least 200 words long, so that it has room for the file, the line, and a code quote."
     ],
     "answer": 2,
     "explain": "Few-shot (exam guide 4.2, docs prompting best practices): vài ví dụ liên quan, đa dạng cho thấy định dạng mong muốn rõ hơn mô tả, và ví dụ ở ca mơ hồ (kèm lý do không báo) giúp model khái quát ranh giới. Thêm tính từ vẫn là mô tả trừu tượng. Một ví dụ lặp lại nhiều lần khiến model chép máy móc thay vì khái quát. Ép tối thiểu 200 từ làm bình luận dài dòng mà không bảo đảm có file, dòng, trích code.",
     "sc": "s5",
     "ts": [
      "4.2"
     ]
    },
    {
     "q": "A CI review job returns findings as JSON with file and line fields. Some findings point at line numbers outside the lines the pull request changed, so the comment-posting API rejects them. What should the pipeline do?",
     "options": [
      "Check each finding against the diff's changed line ranges in code; re-ask Claude about failures with the valid ranges and the error.",
      "Post every out-of-range finding at line 1 of its file instead, so that no finding is ever lost because of a rejected position.",
      "Lower the sampling temperature, since line numbers outside the diff are random noise that a lower temperature will remove.",
      "Ask Claude in the prompt to double-check all of its line numbers carefully, and keep posting every result without validating it first."
     ],
     "answer": 0,
     "explain": "Vòng validate rồi retry (exam guide 4.4): code kiểm tra từng phát hiện với các khoảng dòng thay đổi của diff; phát hiện không hợp lệ thì hỏi lại kèm chính phát hiện đó, khoảng hợp lệ và lỗi cụ thể để Claude sửa vị trí (hoặc chuyển vào phần tóm tắt nếu nó thật sự nói về dòng không đổi). Dồn về dòng 1 làm bình luận sai chỗ, gây nhiễu. Nhiệt độ không phải nguyên nhân; số dòng sai thường do model suy vị trí từ diff, không phải ngẫu nhiên. Chỉ dặn trong prompt mà không kiểm tra thì lỗi vẫn lọt tới API.",
     "sc": "s5",
     "ts": [
      "4.4"
     ]
    },
    {
     "q": "A CI job runs claude -p --output-format json --json-schema with a findings schema in which doc_link is declared with \"format\": \"uri\". Occasionally doc_link holds a value that is not a valid URL, and the comment formatter crashes. What explains this, and what should the team do?",
     "options": [
      "The format keyword makes the schema invalid, so Claude Code silently ignores the whole schema and returns unvalidated output.",
      "Claude Code treats format as an annotation and does not enforce it, so the formatter should validate doc_link before using it.",
      "Structured output is validated only on the first turn, so values produced in later turns may freely ignore the schema.",
      "The format keyword applies only to strings shorter than 100 characters, so long URLs skip the check entirely."
     ],
     "answer": 1,
     "explain": "Docs headless và CLI reference ghi: Claude Code chấp nhận schema dùng từ khóa format (như \"format\": \"email\") nhưng coi nó là chú thích, không kiểm tra phía client. Vì vậy giá trị vẫn đúng kiểu string nhưng có thể không phải URL hợp lệ; code downstream phải tự validate. Schema có format không bị coi là không hợp lệ (schema không hợp lệ thì claude thoát với lỗi, không im lặng bỏ qua). Không có quy tắc \"chỉ validate ở lượt đầu\": kết quả được kiểm tra khi agent hoàn tất. Giới hạn 100 ký tự là bịa.",
     "sc": "s5",
     "ts": [
      "4.3",
      "3.6"
     ]
    }
   ],
   "summary": [
    "Thay lời dặn mơ hồ ('be conservative', 'chỉ báo cái quan trọng') bằng tiêu chí tường minh: báo gì, bỏ gì, mức độ, kèm ví dụ; giải thích lý do đằng sau chỉ dẫn để Claude khái quát được.",
    "Few-shot: 3–5 ví dụ liên quan, đa dạng, bọc trong thẻ example; giá trị nhất ở ca mơ hồ, kèm lý do chọn nhãn. Với trích xuất, có ví dụ trường thiếu ra null và ví dụ cho từng định dạng tài liệu.",
    "Tài liệu dài đặt ở đầu prompt (mỗi tài liệu trong thẻ document kèm source), câu hỏi và chỉ dẫn ở cuối; yêu cầu trích dẫn đoạn liên quan trước khi trả lời. Nói điều cần làm thay vì điều cấm.",
    "Dặn 'chỉ trả JSON' trong prompt không bảo đảm gì; dùng structured outputs (output_config.format) hoặc tool có input_schema với strict: true. Docs hiện ghi prefill ở lượt assistant cuối trả lỗi 400 từ model 4.6.",
    "Structured outputs bảo đảm parse được và đúng schema (trừ refusal, max_tokens, chữ hoa/thường của enum) nhưng không bảo đảm ngữ nghĩa; ràng buộc như minimum/maximum, minLength phải kiểm tra trong code.",
    "Thiết kế schema: trường có thể thiếu thì nullable (vẫn required) để tránh bịa; enum có lối thoát 'other'/'unclear' kèm trường nguyên văn; trích cả stated_total lẫn từng dòng để code tự cộng và so.",
    "Retry kèm tài liệu, output lỗi và lỗi cụ thể; retry vô ích khi dữ liệu không có trong tài liệu, khi đó trả null và gửi người xem.",
    "Message Batches API: rẻ 50%, tối đa 24 giờ, kết quả không theo thứ tự nên khớp bằng custom_id, chỉ gửi lại request errored/expired. Hợp việc không ai chờ (audit đêm, backfill), không hợp kiểm tra chặn hay chat; vòng lặp agent chạy tool phía bạn không chạy trọn trong một request.",
    "Review bằng instance độc lập; PR lớn chia lượt theo file cộng một lượt tích hợp xuyên file, thêm lượt xác minh trước khi đăng.",
    "Bot review ồn: sửa tiêu chí trước, finding là JSON có rule_id/detected_pattern để đo dev bác bỏ theo quy tắc, tạm tắt quy tắc ồn; confidence tự báo chưa hiệu chuẩn không phải bộ lọc tốt."
   ]
  },
  {
   "id": "d5",
   "name": "Context Management & Reliability",
   "weight": 15,
   "intro": "<p>Domain này hỏi cách giữ hệ thống <em>đáng tin</em> khi chạy lâu và chạy thật: context dài làm chất lượng giảm, chi tiết quan trọng bị tóm tắt mất, lỗi lan qua nhiều agent, model tự tin sai, nguồn trích dẫn bị rơi, và agent “lạc” khi khám phá codebase lớn. Domain này cũng hỏi khi nào cần đưa người vào vòng lặp.</p>\n<p>Ranh giới: cơ chế session (resume, fork) và thiết kế escalation ở mức kiến trúc nằm ở Domain 1. Ở đây trọng tâm là <em>độ tin cậy của thông tin</em> chảy qua hệ thống.</p>",
   "lessons": [
    {
     "id": "l-5-0",
     "title": "Nền tảng: context window, token và vì sao hệ thống chạy lâu thì bắt đầu sai",
     "minutes": 13,
     "html": "<p>Mọi bài Domain 5 trả lời cùng một câu: <em>vì sao hệ thống chạy tốt lúc đầu lại sai dần, và sửa ở đâu</em>. Bài này dựng các khái niệm nền: token, context window, vì sao context dài làm chất lượng giảm, các đòn bẩy để giữ context gọn, và các điểm thông tin có thể hỏng khi chảy qua nhiều bước.</p>\n<h4>1. Token và context window</h4>\n<p>Model đọc và viết theo đơn vị <strong>token</strong> (mảnh chữ). <strong>Context window</strong> là toàn bộ văn bản model tham chiếu được khi sinh câu trả lời, gồm cả chính câu trả lời. Docs gọi nó là “bộ nhớ làm việc” của model, khác với dữ liệu huấn luyện.</p>\n<p>Docs liệt kê thứ <strong>tính vào context</strong>: system prompt, mọi message trong <code>messages</code> (gồm kết quả tool, ảnh, tài liệu), định nghĩa tool, và output của lượt hiện tại kể cả thinking. Mỗi response báo số token đã dùng trong trường <code>usage</code>. Muốn biết trước khi gửi thì dùng API token counting: docs ghi nó miễn phí (có giới hạn số request mỗi phút) và cho kết quả <em>ước lượng</em>.</p>\n<p>Kích thước: docs hiện ghi (tháng 11/2026) nhiều model hiện hành có context 1M token và một request sinh tối đa 128k token output; các model khác có 200k. Con số này đổi theo model, nên khi thi hãy tập trung vào nguyên lý hơn là con số.</p>\n<h4>2. Vì sao context dài làm chất lượng giảm</h4>\n<p>Docs gọi hiện tượng này là <strong>context rot</strong>: khi số token tăng, độ chính xác và khả năng nhớ lại thông tin trong context giảm. Bài “Effective context engineering” giải thích model có một “ngân sách chú ý” hữu hạn; mỗi token mới tiêu một phần ngân sách đó. Đây là dốc thoai thoải, không phải vách đứng: model vẫn giỏi ở context dài nhưng kém chính xác hơn khi truy xuất chi tiết và suy luận tầm xa. Kết luận của bài viết: tìm <strong>tập token nhỏ nhất mà giàu tín hiệu nhất</strong> cho kết quả mong muốn. Nhiều context hơn không tự động tốt hơn.</p>\n<h4>3. Hệ thống chạy lâu hỏng ở đâu</h4>\n<table>\n<thead><tr><th>Điểm hỏng</th><th>Triệu chứng</th><th>Bài</th></tr></thead>\n<tbody>\n<tr><td>Lịch sử cộng dồn, compaction tóm tắt mất chi tiết</td><td>Quên số tiền, mã đơn, lời hứa với khách</td><td>l-5-1</td></tr>\n<tr><td>Quyết định chuyển người dựa trên tín hiệu sai</td><td>Chuyển vì khách bực; không chuyển khi khách đòi gặp người</td><td>l-5-2</td></tr>\n<tr><td>Lỗi bị nuốt hoặc làm sập cả luồng</td><td>Báo cáo khẳng định “không có dữ liệu” trong khi thực ra là timeout</td><td>l-5-3</td></tr>\n<tr><td>Context đầy output khám phá</td><td>Câu trả lời chuyển từ cụ thể sang chung chung</td><td>l-5-4</td></tr>\n<tr><td>Nguồn bị rơi qua các bước tóm tắt</td><td>Claim không kiểm chứng được, nguồn mâu thuẫn bị chọn bừa</td><td>l-5-3, l-5-5</td></tr>\n<tr><td>Model tự tin sai</td><td>Điểm tự tin cao nhưng sai; độ chính xác tổng che phân khúc yếu</td><td>l-5-2</td></tr>\n</tbody>\n</table>\n<h4>4. Các đòn bẩy giữ context gọn</h4>\n<p>Bài “Effective context engineering” và docs nêu các kỹ thuật chính:</p>\n<ul>\n<li><strong>Chọn lọc đầu vào</strong>: tool trả ít trường cần thiết; bộ tool tối thiểu, không chồng chéo; ví dụ ít mà tiêu biểu.</li>\n<li><strong>Truy xuất đúng lúc (just-in-time)</strong>: giữ định danh nhẹ (đường dẫn file, câu truy vấn, link) và chỉ nạp dữ liệu khi cần. Bài viết lấy Claude Code làm ví dụ: CLAUDE.md nạp sẵn từ đầu, còn file thì tìm bằng glob/grep khi cần.</li>\n<li><strong>Compaction</strong>: tóm tắt cuộc hội thoại gần đầy rồi tiếp tục với bản tóm tắt. Docs Claude API hiện ghi compaction phía server là chiến lược chính cho hội thoại dài (l-5-6).</li>\n<li><strong>Xóa kết quả tool cũ</strong>: bài viết gọi đây là dạng compaction nhẹ và an toàn nhất, vì kết quả thô nằm sâu trong lịch sử hiếm khi cần xem lại.</li>\n<li><strong>Ghi chú có cấu trúc</strong> (agentic memory): agent ghi tiến độ ra ngoài context (file ghi chú, memory tool) rồi đọc lại khi cần.</li>\n<li><strong>Kiến trúc subagent</strong>: subagent khám phá trong context riêng, chỉ trả bản tóm tắt cô đọng về agent chính.</li>\n</ul>\n<h4>5. Độ tin cậy của thông tin</h4>\n<p>Giữ context gọn mới là một nửa. Nửa còn lại là thông tin <em>đúng</em> khi đi qua hệ thống:</p>\n<ul>\n<li><strong>Lỗi phải được nói ra</strong>: truy cập thất bại khác với kết quả rỗng hợp lệ; báo lỗi kèm ngữ cảnh để bên trên quyết định.</li>\n<li><strong>Người ở đúng chỗ</strong>: checkpoint ở hành động rủi ro, khi agent bế tắc, khi chính sách không bao quát.</li>\n<li><strong>Đừng tin con số tự báo</strong>: confidence của model phải được hiệu chuẩn trên dữ liệu có nhãn trước khi dùng để định tuyến.</li>\n<li><strong>Nguồn đi cùng claim</strong> từ lúc thu thập đến báo cáo cuối.</li>\n</ul>\n<h4>Bản đồ Domain 5</h4>\n<table>\n<thead><tr><th>Bài</th><th>Phần nào</th></tr></thead>\n<tbody>\n<tr><td>l-5-1 Context dài, tóm tắt, case facts</td><td>Giữ dữ kiện quan trọng qua hội thoại dài</td></tr>\n<tr><td>l-5-2 Human-in-the-loop, hiệu chuẩn confidence</td><td>Khi nào chuyển người, review theo phân khúc</td></tr>\n<tr><td>l-5-3 Lan truyền lỗi, giữ nguồn</td><td>Lỗi qua nhiều agent; ánh xạ claim và nguồn</td></tr>\n<tr><td>l-5-4 Khám phá codebase lớn</td><td>Giữ context sạch khi đọc nhiều file</td></tr>\n<tr><td>l-5-5 Trích dẫn kiểm chứng được</td><td>Citations API, search_result, tổng hợp khi bất định</td></tr>\n<tr><td>l-5-6 Công cụ quản lý context trên API</td><td>Compaction, xóa kết quả tool, memory tool, đếm token</td></tr>\n</tbody>\n</table>\n<div class=\"tip\">Đáp án “dùng model có context lớn hơn” hiếm khi là cách sửa gốc cho lỗi Domain 5. Context lớn hơn vẫn bị context rot; vấn đề thường là đưa sai thứ vào context hoặc để thông tin quan trọng trôi đi.</div>",
     "keypoints": [
      "Mọi thứ trong request tính vào context: system, messages (kể cả tool result), định nghĩa tool, output và thinking.",
      "Context rot: càng nhiều token, nhớ lại và chính xác càng giảm; mục tiêu là tập token nhỏ nhất giàu tín hiệu nhất.",
      "Đòn bẩy: chọn lọc đầu vào, truy xuất đúng lúc, compaction, xóa kết quả tool cũ, ghi chú ngoài context, subagent.",
      "Token counting API cho ước lượng, miễn phí nhưng có giới hạn tần suất.",
      "Độ tin cậy: không nuốt lỗi, người ở đúng chỗ, hiệu chuẩn confidence, nguồn đi cùng claim."
     ],
     "sources": [
      {
       "t": "Context windows",
       "u": "https://platform.claude.com/docs/en/build-with-claude/context-windows"
      },
      {
       "t": "Token counting",
       "u": "https://platform.claude.com/docs/en/build-with-claude/token-counting"
      },
      {
       "t": "Effective context engineering for AI agents",
       "u": "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents"
      },
      {
       "t": "Compaction overview",
       "u": "https://platform.claude.com/docs/en/build-with-claude/compaction"
      }
     ],
     "ts": [
      "5.1",
      "5.3",
      "5.5",
      "5.6"
     ]
    },
    {
     "id": "l-5-1",
     "title": "Context dài: suy giảm, tóm tắt và khối case facts",
     "minutes": 12,
     "html": "<h4>Context tích lũy như thế nào</h4>\n<p>Theo docs Agent SDK, context window <strong>không reset giữa các lượt</strong> trong một session. Mọi thứ cộng dồn: system prompt, định nghĩa tool, lịch sử hội thoại, input và output của tool. Một lần đọc file lớn hoặc một lệnh in nhiều log có thể tốn hàng nghìn token. Session càng dài, càng nhiều lời gọi tool, context càng phình.</p>\n<p>Khi gần chạm giới hạn, SDK (và Claude Code) <strong>tự động compact</strong>: tóm tắt lịch sử cũ để giải phóng chỗ, giữ lại các trao đổi gần nhất. Docs cảnh báo: compaction thay message cũ bằng bản tóm tắt, nên <strong>chỉ dẫn cụ thể từ đầu hội thoại có thể không được giữ lại</strong>.</p>\n<h4>Triệu chứng trong agent chăm sóc khách hàng</h4>\n<p>Đầu hội thoại, khách cung cấp mã đơn <code>#88412</code>, số tiền <code>186,40 USD</code>, và agent hứa gọi lại vào thứ Năm. Bốn mươi lượt sau, qua một lần tóm tắt, agent chỉ còn biết “khách muốn hoàn tiền cho đơn gần đây”. Kết quả: hỏi lại thông tin đã có, sai số tiền, quên lời hứa. Đó là cách tóm tắt dạng văn xuôi làm rơi <strong>giá trị cụ thể</strong>.</p>\n<h4>Khối case facts: dữ kiện nằm ngoài lịch sử bị tóm tắt</h4>\n<p>Giải pháp kiến trúc là để <strong>code ứng dụng</strong> duy trì một khối dữ kiện có cấu trúc, cập nhật mỗi khi có thông tin mới (từ kết quả tool, từ lời khách đã xác nhận), và đưa khối này vào <em>mọi</em> request, tách khỏi phần lịch sử có thể bị tóm tắt:</p>\n<pre>&lt;case_facts&gt;\ncustomer_id: C-20931 (verified 2025-03-10 09:14)\norders:\n  - id: #88412, amount: 186.40 USD, status: delivered_damaged\n  - id: #88507, amount: 42.00 USD, status: in_transit\nrequested: refund #88412 (full), replacement not wanted\ncommitments: callback Thursday 2025-03-13 before 17:00 (promised by agent)\nopen_questions: none\n&lt;/case_facts&gt;</pre>\n<ul>\n<li>Dữ kiện lấy từ tool nên được <strong>trích gọn</strong> vào khối này (5 trường cần thiết), thay vì để nguyên output 40 trường trong lịch sử.</li>\n<li>Khách có <strong>nhiều vấn đề</strong> cùng lúc thì mỗi vấn đề một mục riêng có trạng thái, tránh trộn lẫn.</li>\n</ul>\n<h4>Các công cụ khác để giữ context sạch</h4>\n<ul>\n<li><strong>Quy tắc lâu dài để trong CLAUDE.md</strong>, không để trong prompt đầu tiên. Docs SDK giải thích CLAUDE.md được đưa lại vào mọi request, nên không bị compaction làm mất.</li>\n<li><strong>Chỉ dẫn tóm tắt trong CLAUDE.md</strong>: compactor đọc CLAUDE.md như context bình thường, nên bạn có thể thêm một mục nói cần giữ gì khi tóm tắt (mục tiêu, file đã sửa, kết quả test, quyết định).</li>\n<li><strong>Hook <code>PreCompact</code></strong> để lưu nguyên transcript trước khi tóm tắt. Lệnh <code>/compact</code> để chủ động compact.</li>\n<li><strong>Subagent cho việc con</strong>: subagent chỉ trả câu trả lời cuối, nên context chính chỉ tăng thêm một bản tóm tắt.</li>\n<li><strong>Chọn lọc tool</strong>: mỗi định nghĩa tool tốn context. Thu hẹp bộ tool cho từng agent.</li>\n</ul>\n<h4>Vị trí thông tin trong prompt dài</h4>\n<p>Docs prompting khuyên đặt tài liệu dài ở đầu và câu hỏi ở cuối (Domain 4). Khi tổng hợp nhiều kết quả, đặt <strong>bản tóm tắt các phát hiện chính ở đầu</strong> và dùng tiêu đề rõ cho từng phần. Như vậy thông tin quan trọng không bị chôn giữa một khối dài.</p>\n<div class=\"tip\">Câu hỏi kiểu “agent quên số tiền, mã đơn sau hội thoại dài” có đáp án là khối case facts có cấu trúc do code duy trì. Không phải “dùng model context lớn hơn” hay “dặn model nhớ kỹ”.</div>\n<div class=\"warn\">Tắt hẳn tóm tắt và luôn gửi toàn bộ transcript không phải lời giải. Context sẽ tràn, và lượng thông tin thừa khổng lồ cũng làm chất lượng giảm.</div>",
     "keypoints": [
      "Context cộng dồn qua các lượt; output tool lớn tốn nhiều token; compaction có thể làm mất chỉ dẫn và chi tiết sớm.",
      "Tóm tắt dạng văn xuôi làm rơi giá trị cụ thể (số tiền, ngày, mã đơn).",
      "Khối case facts có cấu trúc do code duy trì, đưa vào mọi request, tách khỏi lịch sử bị tóm tắt.",
      "Quy tắc lâu dài để trong CLAUDE.md (được đưa lại mỗi request); có thể thêm chỉ dẫn cho compactor.",
      "Trích gọn output tool, dùng subagent cho việc con, tóm tắt phát hiện chính đặt ở đầu."
     ],
     "sources": [
      {
       "t": "How the agent loop works (context window, compaction)",
       "u": "https://code.claude.com/docs/en/agent-sdk/agent-loop"
      },
      {
       "t": "Prompting best practices (long context)",
       "u": "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices"
      }
     ],
     "ts": [
      "5.1"
     ]
    },
    {
     "id": "l-5-2",
     "title": "Human-in-the-loop, escalation và hiệu chuẩn confidence",
     "minutes": 12,
     "html": "<h4>Khi nào cần người trong vòng lặp</h4>\n<p>“Building effective agents” khuyên agent nên <strong>dừng lại chờ phản hồi của người</strong> ở các checkpoint hoặc khi bị chặn, đồng thời kiểm tra “ground truth” từ môi trường (kết quả tool) ở mỗi bước. Đặc tả MCP cũng nói nên luôn có người trong vòng lặp với khả năng từ chối lời gọi tool, vì lý do an toàn. Câu hỏi thiết kế là đặt checkpoint ở đâu để người <em>chỉ</em> phải xem những gì đáng xem.</p>\n<h4>97% chính xác chưa có nghĩa là tự động hóa được</h4>\n<p>Một hệ trích xuất báo độ chính xác tổng là 97%, và team muốn bỏ review thủ công cho kết quả “tự tin cao”. Trước khi làm vậy:</p>\n<ol>\n<li><strong>Chia nhỏ độ chính xác theo loại tài liệu và theo trường.</strong> Con số tổng có thể che một loại tài liệu (chẳng hạn hóa đơn viết tay) chỉ đúng 70%, hoặc một trường (ngày đáo hạn) sai nhiều.</li>\n<li><strong>Chỉ giảm review cho phân khúc đã được chứng minh</strong> là đạt ngưỡng.</li>\n<li><strong>Giữ lấy mẫu ngẫu nhiên phân tầng</strong> (stratified sampling) trên các kết quả đã tự duyệt, để phát hiện mẫu lỗi mới khi dữ liệu đầu vào thay đổi.</li>\n</ol>\n<h4>Confidence: đừng tin con số model tự báo</h4>\n<p>Một con số “confidence: 0.92” do model tự viết ra vẫn chỉ là output của model, không tự động được <strong>hiệu chuẩn</strong> (calibrate) với tỉ lệ đúng thật. Exam guide CCAR-F coi confidence tự báo là tín hiệu kém tin cậy và đề xuất hiệu chuẩn ngưỡng theo trường trên tập có nhãn; đây là nguyên tắc thiết kế, không phải tính năng của API. Nếu muốn dùng confidence để định tuyến:</p>\n<ul>\n<li>Yêu cầu confidence <strong>theo từng trường</strong> thay vì một con số cho cả tài liệu.</li>\n<li><strong>Hiệu chuẩn ngưỡng trên tập dữ liệu có nhãn</strong>: đo xem ở mỗi mức confidence, tỉ lệ đúng thật là bao nhiêu, rồi mới chọn ngưỡng chuyển người.</li>\n<li>Ưu tiên các <strong>tín hiệu xác định</strong> khi có: lỗi validate, tổng tiền lệch, thiếu trường bắt buộc, hai nguồn mâu thuẫn, quy tắc nghiệp vụ.</li>\n</ul>\n<table>\n<thead><tr><th>Tín hiệu chuyển người</th><th>Độ tin cậy</th></tr></thead>\n<tbody>\n<tr><td>Validate nghiệp vụ thất bại sau retry</td><td>Cao (xác định)</td></tr>\n<tr><td>Nguồn mâu thuẫn, thiếu dữ liệu bắt buộc</td><td>Cao</td></tr>\n<tr><td>Khách yêu cầu gặp người; chính sách không bao quát</td><td>Cao</td></tr>\n<tr><td>Confidence theo trường, đã hiệu chuẩn trên tập có nhãn</td><td>Trung bình đến cao</td></tr>\n<tr><td>Confidence model tự báo, chưa hiệu chuẩn</td><td>Thấp</td></tr>\n<tr><td>Cảm xúc tiêu cực của khách (đứng riêng)</td><td>Thấp</td></tr>\n</tbody>\n</table>\n<h4>Escalation trong hội thoại thực tế</h4>\n<ul>\n<li><strong>Khách bực nhưng vấn đề nằm trong khả năng của agent</strong> (đổi địa chỉ, tra cứu đơn): ghi nhận cảm xúc, giải quyết, và nói rõ có thể chuyển người nếu khách muốn. Không tự chuyển chỉ vì giọng điệu.</li>\n<li><strong>Khách yêu cầu gặp người</strong>: chuyển ngay, không cố thuyết phục ở lại.</li>\n<li><strong>Tra cứu ra nhiều khách hàng khớp</strong>: hỏi thêm thông tin định danh. Không chọn theo phỏng đoán.</li>\n<li><strong>Chính sách im lặng</strong> (khách đòi khớp giá đối thủ mà chính sách không nói tới): chuyển người, không tự bịa chính sách.</li>\n</ul>\n<p>Viết các tiêu chí này thành lời trong system prompt, kèm vài ví dụ ranh giới (nên chuyển và không nên chuyển). Đi kèm là gói bàn giao có cấu trúc (Domain 1) để người nhận không phải đọc lại toàn bộ transcript.</p>\n<div class=\"tip\">Gặp đáp án dùng “sentiment score” hay “confidence do model tự báo” làm cổng duy nhất thì gần như chắc chắn là đáp án nhiễu. Tìm đáp án dựa trên tiêu chí tường minh, tín hiệu xác định, hoặc ngưỡng đã hiệu chuẩn.</div>",
     "keypoints": [
      "Đặt checkpoint người ở chỗ rủi ro hoặc khi agent bị chặn; kiểm tra ground truth từ kết quả tool.",
      "Độ chính xác tổng có thể che phân khúc yếu; đo theo loại tài liệu và theo trường trước khi giảm review.",
      "Giữ lấy mẫu ngẫu nhiên phân tầng trên kết quả tự duyệt để bắt mẫu lỗi mới.",
      "Confidence model tự báo không được hiệu chuẩn; nếu dùng thì theo từng trường và hiệu chuẩn trên tập có nhãn.",
      "Khách bực mà vấn đề agent giải quyết được thì giải quyết; khách đòi gặp người thì chuyển ngay."
     ],
     "sources": [
      {
       "t": "Building effective agents",
       "u": "https://www.anthropic.com/engineering/building-effective-agents"
      },
      {
       "t": "MCP specification: Tools (human in the loop)",
       "u": "https://modelcontextprotocol.io/specification/2026-07-28/server/tools"
      },
      {
       "t": "CCAR-F exam guide (task 5.5: human review và hiệu chuẩn confidence)",
       "u": "https://anthropic-partners.skilljar.com/claude-certified-architect-foundations-certification"
      }
     ],
     "ts": [
      "5.5",
      "5.2"
     ]
    },
    {
     "id": "l-5-3",
     "title": "Lan truyền lỗi trong hệ nhiều agent và giữ nguồn trích dẫn",
     "minutes": 13,
     "html": "<h4>Subagent lỗi: báo lên thế nào?</h4>\n<p>Trong hệ nghiên cứu, một subagent tìm kiếm web bị timeout ở một trong năm truy vấn. Có hai thái cực sai:</p>\n<ul>\n<li><strong>Nuốt lỗi</strong>: trả danh sách rỗng đánh dấu “thành công”. Coordinator tưởng chủ đề đó không có tài liệu, và báo cáo cuối khẳng định sai “chưa có nghiên cứu nào về X”.</li>\n<li><strong>Làm sập cả luồng</strong>: một lỗi nhỏ dừng toàn bộ pipeline, mất hết kết quả của bốn truy vấn đã thành công.</li>\n</ul>\n<p>Cách đúng là subagent tự <strong>xử lý cục bộ</strong> lỗi tạm thời (retry có giới hạn). Khi không tự khắc phục được, nó trả về <strong>ngữ cảnh lỗi có cấu trúc</strong> để coordinator quyết định:</p>\n<pre>{\n  \"status\": \"partial_failure\",\n  \"failure_type\": \"timeout\",\n  \"attempted\": {\"query\": \"sodium-ion grid storage 2024 deployment\", \"retries\": 2},\n  \"partial_results\": [\n    {\"claim\": \"...\", \"source_url\": \"https://...\", \"published\": \"2024-06\"}\n  ],\n  \"suggested_alternatives\": [\"thử nguồn báo cáo cơ quan năng lượng\", \"thu hẹp khoảng thời gian\"]\n}</pre>\n<p>Coordinator có thể giao lại với truy vấn khác, dùng kết quả một phần, hoặc đi tiếp nhưng <strong>ghi chú lỗ hổng</strong> trong báo cáo (“mục này ít nguồn vì không truy cập được X”). Phân biệt quan trọng (đã gặp ở Domain 2): <em>truy cập thất bại</em> khác với <em>truy vấn hợp lệ không có kết quả</em>.</p>\n<h4>Chạy lâu: tiếp tục từ chỗ lỗi</h4>\n<p>Bài viết về hệ nghiên cứu nhiều agent của Anthropic mô tả việc xây hệ thống có thể <strong>tiếp tục từ chỗ agent đang dừng</strong> khi gặp lỗi, thay vì chạy lại từ đầu. Agent dẫn dắt còn lưu kế hoạch vào bộ nhớ để không mất khi context bị cắt. Áp dụng thực tế: mỗi agent ghi trạng thái (việc con đã xong, kết quả, việc còn lại) ra một vị trí đã biết. Khi khởi động lại, coordinator nạp trạng thái đó và chỉ giao phần còn thiếu.</p>\n<h4>Provenance: giữ liên kết claim và nguồn qua mọi bước</h4>\n<p>Mỗi lần tóm tắt là một cơ hội để mất nguồn. Subagent viết “thị trường đạt 6,3 tỷ USD”, coordinator tóm lại thành “thị trường tăng mạnh”, và báo cáo cuối không còn ai kiểm chứng được. Để giữ nguồn:</p>\n<ul>\n<li>Yêu cầu subagent trả <strong>ánh xạ claim và nguồn có cấu trúc</strong>: claim, URL hoặc tên tài liệu, đoạn trích, ngày xuất bản.</li>\n<li>Bước tổng hợp phải <strong>mang theo</strong> các ánh xạ đó, không viết lại thành văn xuôi mất nguồn.</li>\n<li>Hệ nghiên cứu của Anthropic có một <strong>CitationAgent</strong> riêng: sau khi nghiên cứu xong, nó xử lý tài liệu và báo cáo để xác định vị trí trích dẫn cụ thể, bảo đảm mỗi claim được gắn với nguồn.</li>\n</ul>\n<h4>Hai nguồn đáng tin nói khác nhau</h4>\n<p>Báo cáo năm 2022 ghi thị trường 4,1 tỷ USD, báo cáo năm 2024 ghi 6,3 tỷ USD. Agent tổng hợp lặng lẽ chọn một con số là sai, lấy trung bình càng sai. Cách đúng: <strong>giữ cả hai, ghi rõ nguồn và ngày</strong>, và để báo cáo giải thích chênh lệch (có thể do mốc thời gian khác nhau, hoặc cách đo khác nhau). Ngày xuất bản giúp người đọc phân biệt “mâu thuẫn” với “số liệu cập nhật”.</p>\n<pre>| Chỉ số         | Giá trị     | Nguồn                         | Ngày    |\n|----------------|-------------|-------------------------------|---------|\n| Quy mô thị trường | 4,1 tỷ USD | Báo cáo ngành A (trang 12)    | 2022-09 |\n| Quy mô thị trường | 6,3 tỷ USD | Khảo sát B (mục 3.1)          | 2024-05 |\nGhi chú: hai số đo ở hai thời điểm khác nhau; B dùng phạm vi rộng hơn (gồm cả châu Á).</pre>\n<div class=\"tip\">Đáp án tốt về lỗi trong hệ nhiều agent thường có: retry cục bộ, báo lên kèm ngữ cảnh (đã thử gì, kết quả một phần, gợi ý thay thế), coordinator quyết định, báo cáo ghi chú lỗ hổng.</div>\n<div class=\"warn\">Thêm trích dẫn “sau khi viết xong” bằng cách tìm nguồn ủng hộ từng câu rất dễ dẫn tới gán nguồn sai. Nguồn phải đi cùng claim từ lúc thu thập.</div>",
     "keypoints": [
      "Không nuốt lỗi (trả rỗng như thành công) và không làm sập cả luồng vì một lỗi.",
      "Subagent retry cục bộ lỗi tạm thời; không khắc phục được thì trả loại lỗi, truy vấn đã thử, kết quả một phần, gợi ý thay thế.",
      "Coordinator quyết định: giao lại, dùng kết quả một phần, hoặc đi tiếp và ghi chú lỗ hổng.",
      "Ghi trạng thái để tiếp tục từ chỗ lỗi thay vì chạy lại từ đầu.",
      "Giữ ánh xạ claim và nguồn (URL, đoạn trích, ngày) qua tổng hợp; nguồn mâu thuẫn thì giữ cả hai kèm ngày."
     ],
     "sources": [
      {
       "t": "How we built our multi-agent research system",
       "u": "https://www.anthropic.com/engineering/multi-agent-research-system"
      },
      {
       "t": "MCP specification: Tools (error handling)",
       "u": "https://modelcontextprotocol.io/specification/2026-07-28/server/tools"
      }
     ],
     "ts": [
      "5.3",
      "5.6"
     ]
    },
    {
     "id": "l-5-4",
     "title": "Khám phá codebase lớn mà không làm hỏng context",
     "minutes": 11,
     "html": "<p>Khi dùng Claude Code để hiểu một codebase lớn (monorepo, hệ thống cũ không có tài liệu), vấn đề chính không phải Claude “không đủ thông minh” mà là <strong>context bị lấp đầy</strong> bởi hàng chục lần đọc file. Docs Claude Code tóm gọn: khám phá codebase lớn làm đầy context của bạn bằng các lần đọc file.</p>\n<p>Sắc thái quan trọng (docs hiện ghi, tháng 11/2026): phần lớn model hiện hành có context 1M token và Claude Code tự compact, nên hiếm khi thật sự <em>hết</em> context. Trang Best practices xếp “dùng subagent để bảo vệ context window” vào nhóm lời khuyên đã lỗi thời. Lý do để giữ context gọn bây giờ là chất lượng: context tập trung cho câu trả lời tốt hơn và rẻ hơn (context rot, l-5-0). Subagent vẫn hữu ích để chạy song song, giữ output ồn ào ra khỏi phiên chính và review độc lập, đổi lại tốn thêm token.</p>\n<h4>Dấu hiệu context đã xuống cấp</h4>\n<ul>\n<li>Câu trả lời chuyển từ cụ thể (“<code>TokenRefresher.scheduleNext()</code> trong <code>auth/refresh.ts</code>”) sang chung chung (“thông thường các hệ thống như vậy sẽ…”).</li>\n<li>Claude hỏi lại hoặc đọc lại file đã đọc từ trước.</li>\n<li>Kết luận mâu thuẫn với phát hiện lúc đầu phiên.</li>\n</ul>\n<h4>Chiến lược</h4>\n<ol>\n<li><strong>Khoanh vùng trước, đọc sau</strong>: dùng tìm kiếm theo tên file (Glob) và theo nội dung (Grep) để định vị điểm vào và nơi gọi hàm, rồi mới đọc có chọn lọc. Lần theo luồng từ điểm vào (route, handler) thay vì đọc cả thư mục. Docs cũng gợi ý cài plugin code intelligence cho ngôn ngữ của bạn để có “go to definition” và “find references” chính xác.</li>\n<li><strong>Giao phần khám phá dài dòng cho subagent</strong>: “dùng subagent điều tra cách hệ thống auth xử lý token refresh”. Subagent (như Explore, chỉ đọc) đọc file trong context riêng và chỉ trả tóm tắt. Context chính giữ vai trò điều phối và ra quyết định.</li>\n<li><strong>Ghi phát hiện ra file</strong>: yêu cầu Claude ghi các phát hiện chính (đường dẫn, tên class, quyết định, câu hỏi còn mở) vào một file ghi chú trong repo. Sau <code>/compact</code> hoặc ở phiên mới, chỉ cần tham chiếu file đó thay vì khám phá lại. Docs prompting cũng nói rằng với harness có compact context hoặc cho lưu context ra file ngoài (như Claude Code), nên cho Claude biết điều đó để nó hành xử phù hợp, và gợi ý cho model theo dõi trạng thái bằng file có cấu trúc (ví dụ <code>tests.json</code>).</li>\n<li><strong>Chia giai đoạn</strong>: khám phá, rồi tóm tắt, rồi mới triển khai. Khi sang giai đoạn mới, đưa bản tóm tắt có cấu trúc vào prompt của subagent hoặc phiên mới, đừng kéo theo toàn bộ lịch sử khám phá.</li>\n<li><strong>Cấu hình cho monorepo</strong>: CLAUDE.md theo thư mục (nạp khi chạm file trong thư mục đó) và rule có <code>paths</code> giúp chỉ dẫn đúng chỗ. Dùng <code>claudeMdExcludes</code> để bỏ CLAUDE.md của team khác không liên quan.</li>\n</ol>\n<h4>Ví dụ file ghi chú</h4>\n<pre># notes/auth-investigation.md\n## Đã xác nhận\n- Điểm vào refresh: src/auth/refresh.ts → TokenRefresher.scheduleNext()\n- Token lưu ở RedisSessionStore (src/session/redis.ts), TTL 15 phút\n- Retry khi refresh lỗi: 3 lần, backoff cố định 2s (src/auth/retry.ts:41)\n## Chưa rõ\n- Ai gọi revokeAll()? Mới thấy trong admin/, cần kiểm tra jobs/\n## Quyết định\n- Sửa backoff thành exponential trong retry.ts, không đụng RedisSessionStore</pre>\n<h4>Khi hệ nhiều agent khám phá song song</h4>\n<p>Mỗi subagent nên trả kết quả <strong>có cấu trúc</strong> (file, ký hiệu, quan hệ gọi) để coordinator gộp được, và ghi trạng thái ra file nếu việc dài, để có thể tiếp tục nếu bị gián đoạn (bài trước). Giao phạm vi rõ ràng (“chỉ thư mục <code>billing/</code> và <code>invoices/</code>”) để tránh hai subagent đọc trùng cùng một vùng.</p>\n<div class=\"tip\">Câu hỏi “phiên khám phá dài, câu trả lời bắt đầu chung chung” có đáp án là giao subagent, ghi phát hiện ra file, compact hoặc phiên mới kèm tóm tắt. Không phải “dán thêm code vào prompt” hay “dặn Claude cụ thể hơn”.</div>",
     "keypoints": [
      "Khám phá codebase lớn làm đầy context bằng các lần đọc file; câu trả lời chung chung là dấu hiệu xuống cấp.",
      "Khoanh vùng bằng tìm kiếm theo tên và nội dung trước, đọc có chọn lọc sau, lần theo luồng từ điểm vào.",
      "Giao khám phá dài dòng cho subagent (như Explore) để context chính chỉ nhận tóm tắt.",
      "Ghi phát hiện chính ra file ghi chú để dùng lại sau /compact hoặc ở phiên mới.",
      "Monorepo: CLAUDE.md theo thư mục, rule có paths, claudeMdExcludes; giao phạm vi rõ cho từng subagent."
     ],
     "sources": [
      {
       "t": "Common workflows (delegate research to subagents)",
       "u": "https://code.claude.com/docs/en/common-workflows"
      },
      {
       "t": "Create custom subagents (Explore)",
       "u": "https://code.claude.com/docs/en/sub-agents"
      },
      {
       "t": "How Claude remembers your project (claudeMdExcludes)",
       "u": "https://code.claude.com/docs/en/memory"
      },
      {
       "t": "Claude Code best practices (outdated advice)",
       "u": "https://code.claude.com/docs/en/best-practices"
      },
      {
       "t": "Prompting best practices (long-horizon tasks)",
       "u": "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices"
      }
     ],
     "ts": [
      "5.4",
      "2.5"
     ]
    },
    {
     "id": "l-5-5",
     "title": "Trích dẫn kiểm chứng được: Citations API, search_result và tổng hợp khi bất định",
     "minutes": 12,
     "html": "<p>Bài l-5-3 nói nguyên tắc: nguồn phải đi cùng claim từ lúc thu thập. Bài này nói <em>công cụ</em>: Claude API có tính năng citations trả về chính xác đoạn văn hỗ trợ từng câu, và khối <code>search_result</code> để tool RAG của bạn được trích dẫn như kết quả web search. Phần cuối bàn cách tổng hợp khi các nguồn không chắc chắn hoặc mâu thuẫn.</p>\n<h4>Vì sao không chỉ dặn “hãy trích nguồn”</h4>\n<p>Bảo model tự viết trích dẫn trong văn bản thì trích dẫn cũng chỉ là output của model: có thể sai chỗ, sai chữ. Docs citations nêu ba lợi thế của tính năng so với cách dựa vào prompt:</p>\n<ul>\n<li><strong>Độ tin cậy</strong>: API phân tích trích dẫn và lấy <code>cited_text</code> trực tiếp từ tài liệu, nên trích dẫn được bảo đảm trỏ hợp lệ vào tài liệu bạn đưa.</li>\n<li><strong>Chất lượng</strong>: theo đánh giá của Anthropic, tính năng này trích đúng đoạn liên quan nhất thường xuyên hơn đáng kể.</li>\n<li><strong>Chi phí</strong>: <code>cited_text</code> không tính vào output token (và khi gửi lại ở lượt sau cũng không tính vào input token). Bật citations làm input token tăng nhẹ.</li>\n</ul>\n<h4>Bật citations cho tài liệu</h4>\n<pre>{\"role\": \"user\", \"content\": [\n  {\"type\": \"document\",\n   \"source\": {\"type\": \"text\", \"media_type\": \"text/plain\",\n              \"data\": \"Gói Pro có hạn hoàn tiền 30 ngày. Gói Basic không hoàn tiền.\"},\n   \"title\": \"Chính sách hoàn tiền 2025\",\n   \"context\": \"{\\\"owner\\\": \\\"billing\\\", \\\"effective\\\": \\\"2025-01-01\\\"}\",\n   \"citations\": {\"enabled\": true}},\n  {\"type\": \"text\", \"text\": \"Khách dùng gói Basic có được hoàn tiền không?\"}\n]}</pre>\n<ul>\n<li>Bật <code>citations.enabled</code> trên <strong>tất cả hoặc không tài liệu nào</strong> trong một request.</li>\n<li>Văn bản thuần và PDF được tự chia theo câu; tài liệu <em>custom content</em> giữ nguyên các khối bạn đưa (hợp với transcript, gạch đầu dòng, hoặc chunk RAG không muốn chia thêm).</li>\n<li><code>title</code> và <code>context</code> được đưa cho model nhưng <strong>không được trích dẫn</strong>; <code>context</code> hợp để chứa metadata như ngày hiệu lực.</li>\n</ul>\n<h4>Response trông thế nào</h4>\n<p>Response gồm nhiều khối text; khối nào chứa một claim thì có mảng <code>citations</code>. Kiểu vị trí phụ thuộc loại tài liệu:</p>\n<table>\n<thead><tr><th>Loại tài liệu</th><th>Kiểu citation</th><th>Vị trí</th></tr></thead>\n<tbody>\n<tr><td>Văn bản thuần</td><td><code>char_location</code></td><td>Chỉ số ký tự, đếm từ 0, đầu cuối không bao gồm</td></tr>\n<tr><td>PDF</td><td><code>page_location</code></td><td>Số trang, đếm từ 1, trang cuối không bao gồm</td></tr>\n<tr><td>Custom content</td><td><code>content_block_location</code></td><td>Chỉ số khối, đếm từ 0</td></tr>\n<tr><td>Search result</td><td><code>search_result_location</code></td><td><code>source</code>, <code>title</code>, chỉ số khối trong <code>content</code></td></tr>\n</tbody>\n</table>\n<p>Mỗi citation có <code>cited_text</code> và <code>document_index</code> (đếm từ 0 trên mọi tài liệu của request), nên code của bạn hiển thị được “câu này lấy từ trang 5 của báo cáo X”.</p>\n<h4>Tool RAG trả <code>search_result</code></h4>\n<p>Khi tool tìm kiếm nội bộ của bạn trả kết quả, đóng gói mỗi kết quả thành khối <code>search_result</code> trong <code>tool_result</code>. Claude sẽ trích dẫn chúng giống kết quả web search, mỗi trích dẫn mang <code>source</code> và <code>title</code> bạn đặt:</p>\n<pre>{\"type\": \"search_result\",\n \"source\": \"kb://refund-policy/v7\",\n \"title\": \"Chính sách hoàn tiền - bản 7\",\n \"content\": [{\"type\": \"text\", \"text\": \"Gói Pro được hoàn tiền trong 30 ngày...\"}],\n \"citations\": {\"enabled\": true}}</pre>\n<p><code>source</code> là chuỗi ổn định bất kỳ (URL hoặc định danh nội bộ). Docs ghi citations cho search result mặc định tắt, mọi search result trong một request phải cùng thiết lập, và khối text là đơn vị trích dẫn nhỏ nhất, nên muốn trích mịn hơn thì chia nội dung thành nhiều khối.</p>\n<h4>Citations và JSON không đi cùng nhau</h4>\n<div class=\"warn\">Docs ghi citations <strong>không tương thích</strong> với structured outputs: bật citations trên tài liệu hoặc search result mà kèm <code>output_config.format</code> thì API trả lỗi 400. Dặn “chỉ trả JSON” thì request vẫn chạy nhưng có thể có rất ít hoặc không có trích dẫn. Muốn mỗi trường trích xuất có trích dẫn, docs gợi ý yêu cầu mỗi trường một dòng dạng “field: value”, rồi code ghép các khối text thành dòng, gắn citations vào dòng tương ứng, và kiểm tra mỗi trường có giá trị và ít nhất một trích dẫn (API không bảo đảm điều này).</div>\n<h4>Tổng hợp khi bất định</h4>\n<p>Citations giải quyết “câu này từ đâu”. Khi tổng hợp nhiều nguồn trong hệ nghiên cứu, còn ba việc là lời khuyên thiết kế:</p>\n<ul>\n<li><strong>Giữ ánh xạ claim–nguồn qua mọi tầng</strong>: subagent trả claim kèm citation có cấu trúc; coordinator gộp mà không viết lại thành văn xuôi mất nguồn. Hệ nghiên cứu của Anthropic dùng một CitationAgent riêng để gắn trích dẫn sau khi nghiên cứu xong; giám khảo LLM của họ chấm cả độ chính xác trích dẫn (nguồn có khớp claim không).</li>\n<li><strong>Nói rõ mức chắc chắn</strong>: tách phần được nhiều nguồn độc lập xác nhận khỏi phần chỉ có một nguồn hoặc đang tranh cãi; ghi lỗ hổng (“không truy cập được nguồn X”) thay vì im lặng.</li>\n<li><strong>Nguồn mâu thuẫn thì giữ cả hai</strong>, kèm ngày và phạm vi đo; không chọn bừa, không lấy trung bình (l-5-3).</li>\n</ul>\n<div class=\"tip\">Đề hỏi “bảo đảm mỗi câu trả lời của trợ lý tài liệu nội bộ trỏ tới đúng đoạn nguồn” thì chọn citations (document có <code>citations.enabled</code>, hoặc tool trả <code>search_result</code>). Đề kèm yêu cầu output JSON nghiêm ngặt thì nhớ hai thứ này không bật cùng lúc được.</div>",
     "keypoints": [
      "Citations API bảo đảm trích dẫn trỏ hợp lệ vào tài liệu; cited_text không tính vào output token.",
      "Bật citations.enabled trên tất cả hoặc không tài liệu nào; title và context không được trích dẫn.",
      "Kiểu vị trí: char_location (text, từ 0), page_location (PDF, từ 1), content_block_location, search_result_location.",
      "Tool RAG trả khối search_result (source, title, content) để Claude trích dẫn nội dung của bạn.",
      "Citations không dùng cùng output_config.format (lỗi 400); muốn dữ liệu có trích dẫn thì xin mỗi trường một dòng rồi parse."
     ],
     "sources": [
      {
       "t": "Citations",
       "u": "https://platform.claude.com/docs/en/build-with-claude/citations"
      },
      {
       "t": "Search results",
       "u": "https://platform.claude.com/docs/en/build-with-claude/search-results"
      },
      {
       "t": "Structured outputs (feature compatibility)",
       "u": "https://platform.claude.com/docs/en/build-with-claude/structured-outputs"
      },
      {
       "t": "How we built our multi-agent research system",
       "u": "https://www.anthropic.com/engineering/multi-agent-research-system"
      }
     ],
     "ts": [
      "5.6"
     ]
    },
    {
     "id": "l-5-6",
     "title": "Công cụ quản lý context trên Claude API: compaction, xóa kết quả tool, memory tool",
     "minutes": 12,
     "html": "<p>Claude Code và Agent SDK tự compact cho bạn. Khi tự viết vòng lặp trên Messages API (agent hỗ trợ khách chạy hàng trăm lượt, agent xử lý ticket cả ngày), bạn phải chọn công cụ. Bài này đặt các công cụ của nền tảng cạnh nhau. Nhiều tính năng ở đây đang beta và hay đổi, nên hãy nhớ <strong>vai trò</strong> của từng cái hơn là tên tham số.</p>\n<h4>Ba chiến lược của “context engineering”</h4>\n<p>Bài “Effective context engineering” nêu ba kỹ thuật cho việc chạy dài hơn một context window, và khi nào hợp:</p>\n<table>\n<thead><tr><th>Kỹ thuật</th><th>Ý tưởng</th><th>Hợp với</th></tr></thead>\n<tbody>\n<tr><td>Compaction</td><td>Tóm tắt lịch sử gần đầy, tiếp tục với bản tóm tắt</td><td>Việc cần nhiều trao đổi qua lại liên tục</td></tr>\n<tr><td>Ghi chú có cấu trúc</td><td>Agent ghi tiến độ ra ngoài context, đọc lại sau</td><td>Việc lặp nhiều bước có mốc rõ ràng</td></tr>\n<tr><td>Kiến trúc nhiều agent</td><td>Subagent làm sâu trong context riêng, trả tóm tắt</td><td>Nghiên cứu, phân tích cần khám phá song song</td></tr>\n</tbody>\n</table>\n<h4>1. Compaction phía server</h4>\n<p>Docs context windows hiện ghi (tháng 11/2026) compaction phía server là chiến lược chính cho hội thoại dài và workflow agent. Compaction thay các lượt cũ bằng một bản tóm tắt do Claude viết trên server, nên bạn không cần tự viết code tóm tắt. Docs mô tả hai kiểu, đều đang beta: <strong>theo yêu cầu</strong> (bạn quyết định khi nào, gửi request xin bản tóm tắt rồi thay vào lịch sử) và <strong>theo ngưỡng token</strong> (API tự compact khi input chạm ngưỡng bạn đặt). Lựa chọn thứ ba là tự viết bộ tóm tắt phía client.</p>\n<div class=\"warn\">Compaction nào cũng là tóm tắt, và tóm tắt có thể làm rơi giá trị cụ thể. Số tiền, mã đơn, cam kết với khách nên nằm trong khối case facts do code duy trì và đưa vào mọi request (l-5-1), không phụ thuộc vào việc bản tóm tắt có giữ chúng hay không.</div>\n<h4>2. Context editing: xóa theo quy tắc thay vì tóm tắt</h4>\n<p>Context editing (beta, bật bằng beta header <code>context-management-2025-06-27</code> theo docs hiện tại) cho phép xóa có chọn lọc:</p>\n<ul>\n<li><strong>Xóa kết quả tool</strong> (<code>clear_tool_uses_20250919</code>): khi context vượt ngưỡng bạn cấu hình, API xóa các kết quả tool <em>cũ nhất</em> trước, thay mỗi kết quả bằng một đoạn placeholder báo cho Claude biết nó đã bị xóa. Mặc định chỉ xóa kết quả; đặt <code>clear_tool_inputs</code> là <code>true</code> để xóa cả tham số của lời gọi. Docs nói cách này hợp với workflow dùng tool nhiều, nơi nội dung file hay kết quả tìm kiếm cũ không còn cần sau khi Claude đã xử lý.</li>\n<li><strong>Xóa thinking block cũ</strong> (<code>clear_thinking_20251015</code>): chọn giữ bao nhiêu thinking của các lượt trước.</li>\n</ul>\n<p>Docs gọi đây là công cụ tinh chỉnh cho tình huống cụ thể; trong đa số trường hợp, compaction phía server vẫn là lựa chọn chính.</p>\n<h4>3. Memory tool: nhớ qua nhiều phiên</h4>\n<p>Memory tool (<code>{\"type\": \"memory_20250818\", \"name\": \"memory\"}</code>) cho Claude tạo, đọc, sửa, xóa file trong thư mục <code>/memories</code> để giữ kiến thức qua các cuộc hội thoại. Docs mô tả:</p>\n<ul>\n<li>Tool chạy <strong>phía client</strong>: Claude chỉ yêu cầu thao tác, ứng dụng của bạn thực hiện trên kho lưu trữ bạn kiểm soát (thư mục theo user, database…).</li>\n<li>Khi bật, Claude tự kiểm tra thư mục memory trước khi bắt đầu việc, và đọc lại ở các phiên sau để làm tiếp.</li>\n<li>Handler <strong>phải từ chối mọi đường dẫn ngoài <code>/memories</code></strong> để chống path traversal.</li>\n<li>Đây là cách “truy xuất đúng lúc”: không nạp hết mọi thứ từ đầu mà ghi lại rồi đọc khi cần.</li>\n</ul>\n<h4>4. Đếm token trước khi gửi</h4>\n<p>API token counting cho biết một request sẽ tốn bao nhiêu input token trước khi gửi, để quyết định có cần compact, cắt bớt tài liệu, hay chọn model khác. Docs ghi kết quả là ước lượng, có thể lệch một chút so với khi gửi thật; API miễn phí nhưng có giới hạn số request mỗi phút, tách riêng với giới hạn của việc tạo message.</p>\n<h4>So với Claude Code / Agent SDK</h4>\n<table>\n<thead><tr><th>Nhu cầu</th><th>Claude API tự viết vòng lặp</th><th>Claude Code / Agent SDK</th></tr></thead>\n<tbody>\n<tr><td>Tóm tắt khi gần đầy</td><td>Compaction phía server, hoặc tự tóm tắt</td><td>Tự động compact; <code>/compact</code>; hook <code>PreCompact</code></td></tr>\n<tr><td>Quy tắc không được mất</td><td>Đưa vào system prompt / khối facts mỗi request</td><td>CLAUDE.md gốc được nạp lại sau compact</td></tr>\n<tr><td>Bỏ output tool cũ</td><td>Context editing xóa kết quả tool</td><td>Giao việc đọc nhiều cho subagent</td></tr>\n<tr><td>Nhớ qua phiên</td><td>Memory tool</td><td>Auto memory, file ghi chú, CLAUDE.md</td></tr>\n</tbody>\n</table>\n<h4>Chọn công cụ theo tình huống</h4>\n<ul>\n<li>Agent hỗ trợ khách hội thoại rất dài, cần giữ mạch: compaction, cộng khối case facts do code giữ.</li>\n<li>Agent gọi tool đọc file/tìm kiếm liên tục, kết quả cũ vô dụng: xóa kết quả tool cũ.</li>\n<li>Agent làm việc qua nhiều ngày, cần nhớ quyết định và tiến độ: memory tool hoặc file ghi chú có cấu trúc.</li>\n<li>Prompt có tài liệu rất dài và không chắc có vừa: đếm token trước.</li>\n</ul>\n<div class=\"tip\">Đề mô tả “agent chạy lâu, kết quả tool cũ chiếm phần lớn context” thì xóa kết quả tool là cách nhẹ nhất; “cần nhớ giữa các phiên” thì memory tool; “quên số liệu cụ thể sau khi tóm tắt” thì case facts do code duy trì.</div>",
     "keypoints": [
      "Ba chiến lược: compaction (hội thoại liên tục), ghi chú có cấu trúc (việc có mốc), nhiều agent (khám phá song song).",
      "Docs hiện ghi compaction phía server là chiến lược chính; có kiểu theo yêu cầu và theo ngưỡng token, đang beta.",
      "Context editing xóa kết quả tool cũ nhất khi vượt ngưỡng, thay bằng placeholder; clear_tool_inputs xóa cả tham số.",
      "Memory tool chạy phía client trong /memories; handler phải chặn đường dẫn ngoài /memories.",
      "Token counting cho ước lượng trước khi gửi; tóm tắt có thể làm rơi số liệu nên vẫn cần case facts."
     ],
     "sources": [
      {
       "t": "Context windows",
       "u": "https://platform.claude.com/docs/en/build-with-claude/context-windows"
      },
      {
       "t": "Compaction overview",
       "u": "https://platform.claude.com/docs/en/build-with-claude/compaction"
      },
      {
       "t": "Context editing",
       "u": "https://platform.claude.com/docs/en/build-with-claude/context-editing"
      },
      {
       "t": "Memory tool",
       "u": "https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool"
      },
      {
       "t": "Token counting",
       "u": "https://platform.claude.com/docs/en/build-with-claude/token-counting"
      },
      {
       "t": "Effective context engineering for AI agents",
       "u": "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents"
      }
     ],
     "ts": [
      "5.1",
      "5.4"
     ]
    }
   ],
   "cheat": [
    [
     "Context dài",
     "Cộng dồn qua các lượt; compaction có thể làm mất chỉ dẫn và chi tiết sớm"
    ],
    [
     "Quên số tiền, mã đơn, ngày",
     "Khối case facts có cấu trúc do code duy trì, đưa vào mọi request"
    ],
    [
     "Quy tắc lâu dài",
     "Để trong CLAUDE.md (được đưa lại mỗi request), không để trong prompt đầu"
    ],
    [
     "Output tool quá dài",
     "Trích gọn các trường cần thiết trước khi đưa vào context"
    ],
    [
     "Bỏ review vì 97%",
     "Đo theo loại tài liệu và theo trường; giữ lấy mẫu phân tầng"
    ],
    [
     "Confidence model tự báo",
     "Không được hiệu chuẩn; nếu dùng thì theo trường và hiệu chuẩn trên tập có nhãn"
    ],
    [
     "Khách bực",
     "Giải quyết nếu trong khả năng; chuyển người khi khách yêu cầu"
    ],
    [
     "Subagent lỗi",
     "Retry cục bộ, rồi báo lên kèm loại lỗi, truy vấn đã thử, kết quả một phần, gợi ý"
    ],
    [
     "Rỗng và lỗi",
     "Không bao giờ trả rỗng khi truy cập thất bại"
    ],
    [
     "Provenance",
     "Ánh xạ claim và nguồn (URL, đoạn trích, ngày) đi qua mọi bước tổng hợp"
    ],
    [
     "Nguồn mâu thuẫn",
     "Giữ cả hai, ghi nguồn và ngày, giải thích chênh lệch"
    ],
    [
     "Codebase lớn",
     "Tìm kiếm rồi đọc chọn lọc; subagent Explore; file ghi chú; /compact"
    ],
    [
     "Context rot",
     "Càng nhiều token càng nhớ lại kém; giữ tập token nhỏ, giàu tín hiệu"
    ],
    [
     "Citations API",
     "document có citations.enabled; cited_text không tính output token; không dùng cùng output_config.format"
    ],
    [
     "Tool RAG muốn được trích dẫn",
     "Trả khối search_result (source, title, content) trong tool_result"
    ],
    [
     "Kết quả tool cũ chiếm context",
     "Context editing xóa kết quả tool cũ (beta); nhớ qua phiên thì memory tool trong /memories"
    ]
   ],
   "quiz": [
    {
     "q": "Forty turns into a support conversation, after the history has been summarized, the agent refers to \"your recent order\" and quotes the wrong refund amount. Earlier, the customer had confirmed order #88412, an amount of $186.40, and the agent had promised a Thursday callback. What is the BEST architectural fix?",
     "options": [
      "Switch to a model with a larger context window so that summarization happens less often and earlier details stay in the raw transcript longer.",
      "Keep a structured case-facts block (IDs, amounts, dates, commitments) outside the summarized history and send it with every request.",
      "Add \"Always remember every detail the customer mentions\" to the system prompt.",
      "Disable summarization and always send the full transcript."
     ],
     "answer": 1,
     "explain": "Tóm tắt dạng văn xuôi làm rơi giá trị cụ thể. Khối dữ kiện có cấu trúc do code duy trì và đưa vào mọi request giữ được chúng bất kể lịch sử bị tóm tắt thế nào. A chỉ trì hoãn vấn đề. C là lời dặn, không thay đổi được việc dữ liệu bị tóm tắt mất. D cuối cùng sẽ tràn context, và hội thoại rất dài cũng làm chất lượng giảm.",
     "sc": "s1",
     "ts": [
      "5.1"
     ]
    },
    {
     "q": "A document-extraction system reports 97% overall field accuracy. The team proposes removing human review for all outputs the model marks as high confidence. What should the architect recommend FIRST?",
     "options": [
      "Remove human review entirely, since 97% exceeds the 95% target.",
      "Auto-approve every output whose model-reported confidence is above 0.9.",
      "Review only outputs whose explanation contains words like \"unsure\" or \"unclear.\"",
      "Break accuracy down by document type and by field before reducing review, then keep stratified random sampling of auto-approved outputs to catch new error patterns."
     ],
     "answer": 3,
     "explain": "Con số tổng có thể che phân khúc yếu (một loại tài liệu hoặc một trường sai nhiều). Phải đo theo phân khúc, chỉ giảm review ở phân khúc đã được chứng minh, và giữ lấy mẫu để phát hiện thay đổi. A bỏ qua rủi ro phân khúc. B dựa vào confidence chưa hiệu chuẩn. C dựa vào từ ngữ, không đáng tin.",
     "sc": "s6",
     "ts": [
      "5.5"
     ]
    },
    {
     "q": "In a research system, a web-search subagent times out on one of its five queries. It currently returns an empty result list marked as success, and the final report states that \"no research exists\" on that subtopic. How should failures be handled?",
     "options": [
      "Retry locally, then return a structured error (failure type, query, partial results, alternatives) so the coordinator can decide.",
      "Terminate the entire research workflow whenever any subagent reports a failure, so that no report is ever produced from incomplete research.",
      "Have the subagent retry indefinitely until the query succeeds.",
      "Have the coordinator silently drop failed subagents' sections from the report."
     ],
     "answer": 0,
     "explain": "Truy cập thất bại phải được báo là thất bại, kèm ngữ cảnh để coordinator quyết định (giao lại, dùng kết quả một phần, hoặc ghi chú lỗ hổng). B bỏ phí bốn truy vấn đã thành công. C có thể treo vô hạn. D vẫn khiến người đọc tưởng báo cáo đầy đủ.",
     "sc": "s3",
     "ts": [
      "5.3"
     ]
    },
    {
     "q": "During synthesis, two credible sources disagree: an industry report from 2022 sizes the market at $4.1B, while a 2024 survey reports $6.3B. The synthesis agent currently picks one figure without comment. What is the BEST behavior?",
     "options": [
      "Report the average of the two figures to balance the sources.",
      "Always keep the most recent figure and silently discard the older one.",
      "Report both values with their sources and dates, noting the gap may reflect each study's period or scope.",
      "Keep searching until a third credible source agrees with one of the two figures, then report only the figure that has majority support."
     ],
     "answer": 2,
     "explain": "Giữ cả hai kèm nguồn và ngày giúp người đọc thấy chênh lệch có thể do mốc thời gian hay phạm vi. Không được tự ý chọn một số. A tạo ra con số không nguồn nào nói. B làm mất thông tin, và có thể hai nghiên cứu đo khác phạm vi chứ không phải cập nhật của nhau. D là bỏ phiếu theo số đông, vẫn che mất chênh lệch.",
     "sc": "s3",
     "ts": [
      "5.6"
     ]
    },
    {
     "q": "After a long Claude Code session exploring a legacy codebase, answers drift from specific references (exact classes and files found earlier) to generic statements like \"typically, systems like this...\". Which TWO actions are MOST effective? (Choose TWO.)",
     "options": [
      "Stay in the same session and ask Claude to be more specific in its answers.",
      "Delegate verbose investigations to subagents that return concise summaries to the main session.",
      "Paste the full source of the key modules into the prompt to refresh Claude's memory.",
      "Have Claude record key findings (file paths, class names, decisions) in a notes file and reference it after /compact or in a fresh session.",
      "Increase MAX_MCP_OUTPUT_TOKENS so more file content fits in context."
     ],
     "answer": [
      1,
      3
     ],
     "explain": "Câu trả lời chung chung là dấu hiệu context xuống cấp. Giao khám phá cho subagent giữ output đọc file ồn ào ra khỏi phiên chính, nên context chính gọn và tập trung (docs hiện nhấn mạnh lợi ích này hơn là chuyện sợ hết context). Ghi phát hiện ra file giữ được kết quả qua compact hoặc phiên mới. A không đổi được tình trạng context. C nhồi thêm context, làm tệ hơn. E không liên quan (giới hạn output tool MCP) và còn làm context đầy hơn.",
     "sc": "s4",
     "ts": [
      "5.4"
     ]
    },
    {
     "q": "A six-hour multi-agent document-processing job crashed in hour four. Restarting from the beginning wastes the completed work and costs. What design change BEST addresses this?",
     "options": [
      "Increase every agent's max_turns and max_budget_usd limits so the job is far less likely to stop before all documents are processed.",
      "Run all agents with bypassPermissions to avoid interruptions.",
      "Have each agent persist its progress to a known location so a restart reloads state and re-delegates only unfinished work.",
      "Use a larger model so the whole job finishes before failures occur."
     ],
     "answer": 2,
     "explain": "Ghi trạng thái ra ngoài cho phép tiếp tục từ chỗ dừng thay vì chạy lại, đúng với cách tiếp cận mà bài viết về hệ nghiên cứu nhiều agent của Anthropic mô tả. A, B và D không giải quyết việc mất tiến độ khi process sập.",
     "ts": [
      "5.4"
     ]
    },
    {
     "q": "A customer writes: \"I'm really frustrated, this is the third time I'm contacting you,\" and asks to update the shipping address on an order that has not shipped yet. The agent has a tool that can make this change. What should the agent do?",
     "options": [
      "Escalate to a human agent immediately, because negative sentiment combined with repeated contact indicates the automated agent has already failed.",
      "Acknowledge the frustration, complete the address change, and make clear that a human is available if the customer wants one.",
      "Ask the customer to rate their frustration from 1 to 10 and escalate if the score is above 7.",
      "Ignore the emotional content and reply only with the steps of the address-change procedure."
     ],
     "answer": 1,
     "explain": "Cảm xúc tiêu cực đứng riêng không phải lý do chuyển người khi vấn đề nằm trong khả năng của agent. Ghi nhận, giải quyết, và để ngỏ lựa chọn gặp người. A chuyển không cần thiết, khách còn phải chờ thêm. C máy móc và gây khó chịu. D bỏ qua trải nghiệm khách hàng.",
     "sc": "s1",
     "ts": [
      "5.2"
     ]
    },
    {
     "q": "Reviewers of a multi-agent research report cannot verify many of its claims: by the time findings pass through synthesis, the links between statements and their sources are gone. What is the BEST fix?",
     "options": [
      "Have subagents return structured claim–source mappings (claim, source, excerpt, date) and carry them through synthesis.",
      "Ask the synthesis agent to add citations from memory once the report is written.",
      "Drop sources from intermediate steps to save tokens, and append a general reading list at the end.",
      "After the report is written, run a new round of searches to find a supporting source for each sentence and attach the best match as its citation."
     ],
     "answer": 0,
     "explain": "Nguồn phải đi cùng claim từ lúc thu thập, qua mọi bước tổng hợp. Hệ của Anthropic còn có CitationAgent để gắn trích dẫn cụ thể. B dễ gán sai hoặc bịa nguồn. C không cho biết claim nào đến từ đâu. D là gán nguồn sau khi viết, dễ chọn nguồn 'trông có vẻ ủng hộ' mà không phải nguồn gốc thật.",
     "sc": "s3",
     "ts": [
      "5.6"
     ]
    }
   ],
   "bank": [
    {
     "q": "In a long support conversation, every lookup_order call returns about 40 fields (warehouse codes, carrier internals, audit timestamps), and only five matter for returns. Context fills quickly and the agent starts missing details the customer gave earlier. What is the BEST fix?",
     "options": [
      "Switch to a model with a larger context window so that all 40 fields of every lookup can stay in the history.",
      "Trim each tool result to the fields relevant to the task before it is added to the conversation history.",
      "Ask the agent in the system prompt to ignore irrelevant fields when it reads the lookup results.",
      "Call lookup_order only once at the start of the conversation and never refresh the data afterward."
     ],
     "answer": 1,
     "explain": "Đúng: docs Define tools (best practices) và bài \"Writing effective tools for agents\" khuyên tool chỉ trả thông tin tín hiệu cao, chỉ những trường Claude cần cho bước tiếp theo; response phình làm tốn context và khó trích điều quan trọng. Bài \"Effective context engineering\" gọi context là tài nguyên hữu hạn với \"attention budget\". Sai: context lớn hơn chỉ hoãn vấn đề, các trường nhiễu vẫn tranh sự chú ý. Dặn bỏ qua không làm token biến mất khỏi context. Không làm mới dữ liệu thì agent trả lời theo trạng thái cũ.",
     "sc": "s1",
     "ts": [
      "5.1"
     ]
    },
    {
     "q": "A team adds prompt caching to an agent whose system prompt starts with \"Current time: <timestamp>\" followed by 30,000 tokens of static policy text, with cache_control on the last system block. Which TWO statements are correct? (Choose TWO.)",
     "options": [
      "The cache prefix covers tools, then system, then messages, so a change early in the system prompt invalidates everything after it.",
      "Cached prefixes live for 24 hours by default, so the timestamp only causes one cache miss per day.",
      "Prompts shorter than the model's minimum cacheable length return an error when they are marked with cache_control.",
      "Changing only the final user message invalidates the cached system prompt as well as the messages.",
      "Moving the timestamp after the static text and putting cache_control on the last static block lets requests share the cached prefix."
     ],
     "answer": [
      0,
      4
     ],
     "explain": "Đúng: docs Prompt caching: cache tham chiếu cả prompt theo thứ tự tools → system → messages tới khối có cache_control; thay đổi ở một cấp làm mất cache cấp đó và mọi cấp sau; docs khuyên đặt nội dung tĩnh ở đầu và đặt cache_control ở khối cuối cùng còn giống nhau giữa các request (ví dụ timestamp thay đổi làm hash prefix khác ở mỗi request). Sai: TTL mặc định là 5 phút (có tùy chọn 1 giờ giá cao hơn), không phải 24 giờ. Prompt dưới ngưỡng tối thiểu chỉ không được cache, không báo lỗi. Đổi tin nhắn cuối không làm mất cache phần system đứng trước nó.",
     "ts": [
      "5.1"
     ]
    },
    {
     "q": "An Agent SDK application passes its persistent rules (\"never promise delivery dates,\" \"always cite the order ID\") in the initial prompt of each long session. After automatic compaction, the agent sometimes breaks those rules. What does the SDK documentation recommend?",
     "options": [
      "Disable automatic compaction for the session so that the initial prompt can never be summarized away.",
      "Repeat the rules at the end of every tool result so that they are always the most recent content.",
      "Put persistent rules in CLAUDE.md loaded via settingSources, which is re-injected on every request.",
      "Raise max_turns, since compaction only happens when a session approaches its turn limit."
     ],
     "answer": 2,
     "explain": "Đúng: trang Agent loop (Automatic compaction): compaction thay tin nhắn cũ bằng bản tóm tắt nên chỉ dẫn cụ thể ở đầu hội thoại có thể không được giữ; quy tắc bền vững nên nằm trong CLAUDE.md (nạp qua settingSources) thay vì prompt ban đầu, vì nội dung CLAUDE.md được đưa lại ở mỗi request. Sai: tắt compaction không phải khuyến nghị và có thể làm cạn context. Chèn quy tắc vào mọi tool result làm nhiễu và tốn token. Compaction kích hoạt khi context gần giới hạn, không phải theo số turn.",
     "ts": [
      "5.1"
     ]
    },
    {
     "q": "An autonomous coding agent works on a large feature across many context windows. Each time it starts a fresh window, it repeats setup work and loses track of which tests were already fixed. Which practice from Anthropic's prompting guide BEST addresses this?",
     "options": [
      "Paste the full transcript of the previous window into the first message of each new window.",
      "Ask the agent to finish the entire feature within one context window by working faster.",
      "Delete the test suite at the start of each window so the agent only has to track current failures.",
      "Keep state outside the context: a structured tests file, free-form progress notes, and git history to read on start."
     ],
     "answer": 3,
     "explain": "Đúng: docs Prompting best practices (Workflows across multiple context windows, State management): dùng định dạng có cấu trúc (ví dụ tests.json) cho dữ liệu trạng thái, ghi chú tiến độ tự do (progress.txt), dùng git để theo dõi trạng thái và checkpoint; có thể bắt đầu cửa sổ mới và bảo Claude đọc progress.txt, tests.json, git log, vì model mới rất giỏi khám phá trạng thái từ filesystem. Sai: dán cả transcript cũ làm đầy cửa sổ mới ngay từ đầu. \"Làm nhanh hơn\" không khả thi với việc dài. Xóa test đúng là điều docs cảnh báo (\"không chấp nhận được việc xóa hoặc sửa test\").",
     "ts": [
      "5.4"
     ]
    },
    {
     "q": "A research agent's conversation is dominated by raw search results and page contents from dozens of earlier tool calls that it has already summarized in its notes. Quality drops as the context grows. According to Anthropic's context-engineering guidance, what is one of the safest, lightest-touch remedies?",
     "options": [
      "Clear old tool results from the history, since the agent no longer needs the raw content.",
      "Re-run all earlier searches so that the most recent copies of each result appear later in the context.",
      "Ask the agent to quote every earlier tool result in its next answer so it keeps the information fresh.",
      "Move the raw results into the system prompt so that they are treated as more authoritative."
     ],
     "answer": 0,
     "explain": "Đúng: bài \"Effective context engineering for AI agents\" nêu tool call và kết quả nằm sâu trong lịch sử thường không cần xem lại nguyên văn; xóa tool result (tool result clearing) là một trong những dạng compaction an toàn và nhẹ nhất, và đã có trên Claude Developer Platform (context editing). Sai: chạy lại tìm kiếm còn thêm token. Trích lại mọi kết quả nhân đôi lượng nội dung. Đưa nội dung thô vào system prompt vừa không giảm token vừa trao quyền cao cho nội dung không đáng tin.",
     "ts": [
      "5.1"
     ]
    },
    {
     "q": "A customer gives only the name \"Maria Garcia\" when asking about an order, and get_customer returns four accounts with that name. What should the agent do?",
     "options": [
      "Pick the account with the most recent order, since that customer is the most likely to be contacting support.",
      "Ask for an additional identifier, such as an email address or order number, before acting on any account.",
      "Show the customer the details of all four accounts so she can point out which one is hers.",
      "Escalate immediately to a human, because ambiguous identity always requires manual handling."
     ],
     "answer": 1,
     "explain": "Đúng (lời khuyên thiết kế): khi tra cứu trả về nhiều kết quả khớp, agent nên hỏi thêm định danh để xác định đúng khách thay vì đoán theo heuristic; thao tác nhầm tài khoản là lỗi nghiêm trọng. Sai: chọn theo đơn gần nhất là đoán, có thể lộ hoặc sửa dữ liệu của người khác. Hiện dữ liệu cả bốn tài khoản là lộ thông tin cá nhân của người khác. Escalate ngay là không cần thiết khi một câu hỏi đơn giản giải quyết được.",
     "sc": "s1",
     "ts": [
      "5.2"
     ]
    },
    {
     "q": "A claims-extraction system outputs a confidence score per field, and the team wants to send only low-confidence fields to human reviewers. Spot checks show many fields scored 0.95 are wrong. What should the team do before using the scores for routing?",
     "options": [
      "Raise the auto-approval threshold to 0.99, since the problem is only that 0.95 is too permissive.",
      "Ask the model to be more honest about its uncertainty when it assigns each confidence score.",
      "Calibrate the scores against a labeled validation set and set routing thresholds from that data.",
      "Average field-level scores into one document score so that individual errors cancel out."
     ],
     "answer": 2,
     "explain": "Đúng (lời khuyên thiết kế): điểm tự tin do mô hình tự báo không tự động phản ánh xác suất đúng; cần đối chiếu với tập có nhãn (theo loại tài liệu, theo trường) để biết ngưỡng nào thực sự tương ứng độ chính xác mong muốn, rồi mới dùng để định tuyến. Sai: nâng ngưỡng mà không có dữ liệu hiệu chuẩn vẫn là đoán, có thể vẫn sai ở 0.99. Yêu cầu \"trung thực hơn\" không phải hiệu chuẩn. Lấy trung bình che mất lỗi ở từng trường.",
     "sc": "s6",
     "ts": [
      "5.5"
     ]
    },
    {
     "q": "During a market report, one subagent could not access a paywalled industry database, so one of five requested regions has no primary data. The current report presents all five regions in the same confident tone. What is the BEST behavior?",
     "options": [
      "Omit the region from the report without comment, since partial data could mislead readers.",
      "Fill in the region using the average of the other four so the report stays complete and consistent.",
      "Fail the whole report and ask the user to resubmit once the database becomes accessible.",
      "Mark the gap in the report: say which region lacks primary data and why, and qualify those conclusions."
     ],
     "answer": 3,
     "explain": "Đúng (lời khuyên thiết kế, khớp tinh thần bài multi-agent research về đánh giá độ đầy đủ và độ chính xác trích dẫn): khi một phần thiếu nguồn, báo cáo nên ghi chú phạm vi phủ — phần nào được hỗ trợ đầy đủ, phần nào thiếu và vì sao — để người đọc biết mức tin cậy. Sai: lặng lẽ bỏ vùng đó khiến người đọc tưởng đã được nghiên cứu hoặc không quan trọng. Lấy trung bình là bịa số liệu. Hủy cả báo cáo bỏ phí bốn phần có dữ liệu tốt.",
     "sc": "s3",
     "ts": [
      "5.3",
      "5.6"
     ]
    },
    {
     "q": "A team runs long-lived research agents that may be mid-task for many minutes. Each deployment of updated prompts and tool code breaks some agents that were in the middle of their work. What deployment approach does Anthropic describe for this situation?",
     "options": [
      "Rainbow deployments: shift traffic gradually from old to new versions while both keep running.",
      "Deploy all updates at once during a short maintenance window, terminating every agent that is still running.",
      "Pin every agent to the version it started with forever, never migrating any traffic to new versions.",
      "Hot-patch the prompts of running agents in place so that they pick up the new version mid-task."
     ],
     "answer": 0,
     "explain": "Đúng: bài multi-agent research ghi hệ agent là mạng trạng thái chạy gần như liên tục, agent có thể ở bất kỳ bước nào khi deploy; vì không thể cập nhật mọi agent cùng lúc, họ dùng rainbow deployment, chuyển dần lưu lượng từ bản cũ sang bản mới trong khi cả hai cùng chạy. Sai: dừng mọi agent đang chạy chính là thứ gây lỗi và bắt khởi động lại tốn kém. Ghim mãi bản cũ nghĩa là không bao giờ cập nhật. Vá nóng giữa chừng tạo trạng thái không nhất quán, đúng nguyên nhân làm hỏng agent.",
     "sc": "s3",
     "ts": [
      "5.4"
     ]
    },
    {
     "q": "A team building a multi-agent research system struggles to evaluate and debug it: identical prompts produce different tool sequences, and users report that agents \"missed obvious information.\" Which TWO practices does Anthropic recommend? (Choose TWO.)",
     "options": [
      "Require every run to follow the same predefined tool-call sequence and fail any run that deviates.",
      "Postpone evaluation until a suite of several hundred test cases is ready, since small samples are noise.",
      "Add full production tracing of agent decisions so failures can be diagnosed systematically.",
      "Judge whether the agent reached the right outcome or end state instead of checking for one prescribed sequence of steps.",
      "Set temperature to zero so that runs become deterministic and step-by-step comparison works."
     ],
     "answer": [
      2,
      3
     ],
     "explain": "Đúng: bài multi-agent research: agent ra quyết định động và không tất định giữa các lần chạy; thêm tracing đầy đủ trong production giúp chẩn đoán nguyên nhân (truy vấn tồi, nguồn kém, lỗi tool); và vì có nhiều đường đi hợp lệ, cần đánh giá kết quả/trạng thái cuối thay vì kiểm tra các bước định sẵn (end-state evaluation cho agent thay đổi trạng thái). Sai: ép một chuỗi tool cố định ngược với bản chất agent. Bài viết khuyên bắt đầu đánh giá ngay với mẫu nhỏ (khoảng 20 truy vấn). Temperature 0 không biến hệ agent nhiều bước, nhiều tool thành tất định và không phải điều bài viết đề xuất.",
     "sc": "s3",
     "ts": [
      "1.2"
     ]
    },
    {
     "q": "Early in development of a new agent, a team delays building any evaluation because they believe only a suite of hundreds of test cases would be meaningful. What does Anthropic's experience suggest?",
     "options": [
      "Wait until the agent is feature-complete, because evaluating an unfinished agent produces misleading results.",
      "Start right away with a small set (around 20 realistic queries), since early changes often have large effects.",
      "Rely only on manual spot checks, since automated evaluation of free-form output is not possible.",
      "Use a single test query repeated many times, which measures variance more precisely than many queries."
     ],
     "answer": 1,
     "explain": "Đúng: bài multi-agent research (Start evaluating immediately with small samples): giai đoạn đầu có nhiều \"quả ngọt dễ hái\", một chỉnh prompt có thể nâng tỉ lệ thành công từ 30% lên 80%, nên vài test case là thấy rõ; họ bắt đầu với khoảng 20 truy vấn đại diện cho cách dùng thật. Sai: chờ hoàn thiện là trì hoãn đúng thứ bài viết khuyên tránh. Bài viết dùng LLM-as-judge để đánh giá output tự do, kèm kiểm tra thủ công. Một truy vấn lặp lại không đại diện cho cách dùng thật.",
     "ts": [
      "5.5"
     ]
    },
    {
     "q": "A team wants automated grading of free-form research reports for factual accuracy, citation accuracy, completeness, source quality, and tool efficiency. Which setup matches what Anthropic found most consistent with human judgment?",
     "options": [
      "A separate judge model for each criterion, with the final grade computed as the minimum of the five scores.",
      "Exact string matching of each report against a reference answer written by a human expert.",
      "One LLM judge call with a rubric covering all criteria, outputting 0.0–1.0 scores and a pass/fail grade.",
      "Counting the number of citations per report, since citation count is a reliable proxy for quality."
     ],
     "answer": 2,
     "explain": "Đúng: bài multi-agent research ghi họ dùng LLM judge chấm theo rubric (độ chính xác dữ kiện, độ chính xác trích dẫn, độ đầy đủ, chất lượng nguồn, hiệu quả dùng tool); họ thử nhiều judge cho từng thành phần nhưng thấy một lần gọi LLM với một prompt, cho điểm 0.0–1.0 và pass/fail, là nhất quán và khớp đánh giá con người nhất. Sai: nhiều judge riêng là cách họ đã thử và thấy kém nhất quán hơn. Output nghiên cứu hiếm khi có một đáp án đúng duy nhất nên so khớp chuỗi không dùng được. Số trích dẫn không đo độ chính xác.",
     "sc": "s3",
     "ts": [
      "5.5"
     ]
    },
    {
     "q": "A web-research subagent returns the full text of every page it read (about 15,000 tokens per task) to the coordinator, which then struggles to synthesize across subagents. What should the subagent return instead?",
     "options": [
      "The full page text, but split across several smaller messages so that no single message is too large.",
      "Only a one-line conclusion without sources, to minimize the tokens the coordinator must process.",
      "The raw search engine response so that the coordinator can decide for itself which pages to read.",
      "A condensed set of the most relevant findings, each with its source."
     ],
     "answer": 3,
     "explain": "Đúng: bài multi-agent research mô tả bản chất tìm kiếm là nén: subagent làm việc song song trong context riêng rồi cô đọng những token quan trọng nhất cho lead agent, đóng vai \"bộ lọc thông minh\"; giữ nguồn cho từng phát hiện để còn trích dẫn và kiểm chứng. Sai: chia nhỏ tin nhắn không giảm tổng token. Kết luận một dòng không nguồn làm mất khả năng kiểm chứng và tổng hợp. Trả kết quả tìm kiếm thô đẩy toàn bộ việc lọc ngược về coordinator.",
     "sc": "s3",
     "ts": [
      "5.1",
      "5.6"
     ]
    },
    {
     "q": "Mid-conversation, while the support agent is investigating a delivery problem it could likely solve, the customer writes: \"Stop. I want to talk to a human, now.\" What should the agent do?",
     "options": [
      "Honor the request and hand off to a human, passing along a summary of what it has found so far.",
      "Finish the investigation first and offer the solution, escalating only if the customer asks a third time.",
      "Ask the customer to explain why they want a human so the agent can try to address that concern instead.",
      "Reply that human agents are only available for complex cases and continue troubleshooting the issue."
     ],
     "answer": 0,
     "explain": "Đúng (lời khuyên thiết kế về escalation): yêu cầu gặp người một cách rõ ràng là tín hiệu escalate đáng tin nhất; agent nên tôn trọng ngay, không cố điều tra tiếp, và bàn giao kèm tóm tắt để khách không phải kể lại. Sai: cố hoàn tất trước khi chuyển là phớt lờ yêu cầu rõ ràng. Bắt khách giải thích lý do là cản trở. Từ chối và tiếp tục xử lý đi ngược mong muốn của khách và làm mất niềm tin.",
     "sc": "s1",
     "ts": [
      "5.2"
     ]
    },
    {
     "q": "A synthesis agent combines subagent findings that include quarterly revenue figures by segment and a narrative of recent news events. It renders everything as uniform bullet points, and readers find the financial comparison hard to follow. What is the BEST guidance?",
     "options": [
      "Convert all content to a single table, including the news events, so the report has one consistent format.",
      "Let content type drive format: tables for the financial figures, prose for the news narrative.",
      "Keep the bullet format but add more bullets, since more granular points make comparisons easier.",
      "Remove the financial figures and summarize them in words, since numbers are hard to read in reports."
     ],
     "answer": 1,
     "explain": "Đúng (lời khuyên thiết kế): dữ liệu số cần so sánh đọc tốt nhất ở dạng bảng, còn diễn biến tin tức cần văn xuôi; ép một định dạng duy nhất làm mất cấu trúc của từng loại nội dung. Docs Prompting best practices cũng khuyên nói cụ thể định dạng output mong muốn. Sai: biến tin tức thành bảng làm mất mạch kể. Thêm bullet càng phân mảnh. Bỏ số liệu là mất thông tin cốt lõi.",
     "sc": "s3",
     "ts": [
      "5.6"
     ]
    },
    {
     "q": "An agent runs inside a harness that compacts context automatically when it approaches the limit. As the context fills, the agent often wraps up early with a partial summary instead of continuing the task. What does Anthropic's prompting guide suggest?",
     "options": [
      "Lower the compaction threshold so that compaction happens before the agent notices the context filling up.",
      "Remove all tools from the agent near the context limit so that it can only produce its final answer.",
      "Tell the agent in its prompt that context will be compacted, so it should save progress and keep working.",
      "Instruct the agent to always finish the whole task within its first context window."
     ],
     "answer": 2,
     "explain": "Đúng: docs Prompting best practices (Context awareness and multiwindow workflows): nếu agent chạy trong harness tự compact hoặc cho lưu context ra file ngoài (như Claude Code), nên nói điều đó trong prompt; nếu không, Claude đôi khi tự kết thúc công việc khi gần giới hạn context; docs đưa prompt mẫu: context sẽ được compact tự động, đừng dừng sớm vì lo token, lưu tiến độ và trạng thái trước khi cửa sổ làm mới. Sai: đổi ngưỡng không cho agent biết rằng nó có thể tiếp tục. Bỏ tool ép kết thúc, ngược mục tiêu. Hoàn tất trong một cửa sổ không khả thi với việc dài.",
     "ts": [
      "5.4"
     ]
    },
    {
     "q": "A data-analysis agent loads entire database tables and all log files into context at the start of each task \"so it has everything.\" It frequently runs out of context and loses focus. Which approach does Anthropic's context-engineering guidance describe?",
     "options": [
      "Preload even more data but compress it into base64 so that it uses fewer tokens.",
      "Load all the data, then ask the agent to summarize it before it starts working on the task.",
      "Split each table into chunks and load every chunk into the system prompt so it is always visible.",
      "Keep lightweight references (paths, queries, links) and load data just in time with tools when needed."
     ],
     "answer": 3,
     "explain": "Đúng: bài \"Effective context engineering for AI agents\" mô tả chiến lược \"just in time\": agent giữ định danh nhẹ (đường dẫn file, truy vấn đã lưu, link) và dùng tool để nạp dữ liệu vào context lúc cần; Claude Code dùng cách này cho phân tích dữ liệu lớn (viết truy vấn có mục tiêu, dùng head/tail). Sai: base64 tốn nhiều token hơn và khó đọc. Nạp hết rồi tóm tắt vẫn làm tràn context ngay từ đầu. Nhồi vào system prompt không giảm token, còn tốn ở mọi request.",
     "ts": [
      "5.1"
     ]
    },
    {
     "q": "A compliance team requires a verbatim record of every long Agent SDK session, but automatic compaction replaces older messages with a summary. What is the BEST way to satisfy the requirement without disabling compaction?",
     "options": [
      "Register a PreCompact hook that archives the full transcript before each compaction runs.",
      "Ask the agent to quote the entire conversation in its final message so that nothing is lost.",
      "Use a PostToolUse hook to copy each tool result, since tool results are the only content compaction removes.",
      "Rely on the compact_boundary system message, which contains the full text of the removed messages."
     ],
     "answer": 0,
     "explain": "Đúng: trang Agent loop (Automatic compaction) liệt kê PreCompact hook để chạy logic tùy chỉnh trước khi compaction diễn ra, với ví dụ lưu trữ toàn bộ transcript; hook nhận trường trigger (manual hoặc auto). Sai: bắt agent trích lại cả hội thoại tốn token và vẫn có thể thiếu phần đã bị compact trước đó. Compaction tóm tắt cả lịch sử cũ, không chỉ tool result, nên chép tool result là không đủ. compact_boundary chỉ là sự kiện báo compaction đã xảy ra, docs không nói nó chứa toàn văn tin nhắn bị thay.",
     "ts": [
      "5.1"
     ]
    },
    {
     "q": "A customer asks the support agent for a refund on an annual software subscription paid eight months ago, saying she has used it only once. The company's refund policy covers physical orders only and says nothing about subscriptions. What should the agent do?",
     "options": [
      "Apply the 30-day rule for physical orders by analogy and deny the refund, since eight months is far beyond that window.",
      "Approve a prorated refund for the unused months, since prorating is the fairest outcome for both sides.",
      "Tell the customer that subscriptions cannot be refunded, since they are not listed anywhere in the policy.",
      "Escalate to a human with a summary of the request, since the policy does not cover subscription refunds."
     ],
     "answer": 3,
     "explain": "D đúng: đây là khoảng trống chính sách. Agent không có căn cứ để quyết, nên chuyển người kèm bản tóm tắt (khách, gói, ngày thanh toán, yêu cầu) để người có thẩm quyền quyết định. A sai: suy diễn quy tắc của hàng vật lý sang gói đăng ký là tự tạo chính sách. B sai: tự đưa ra cách hoàn tiền theo tỉ lệ cũng là tự tạo chính sách, và có thể gây thiệt hại tài chính. C sai: \"không được liệt kê\" không có nghĩa là \"bị cấm\"; khẳng định như vậy là bịa chính sách theo hướng ngược lại.",
     "sc": "s1",
     "ts": [
      "5.2"
     ]
    },
    {
     "q": "After launch, the support agent escalates about 40% of conversations to humans, including routine requests such as resending a tracking link. Its system prompt says only: \"Escalate when the situation is complex or you are unsure.\" What is the MOST effective fix?",
     "options": [
      "Have the agent rate its own confidence from 1 to 10 on every request, and escalate only when that self-rating comes out at 4 or lower.",
      "Escalate only when sentiment analysis shows the customer is angry, since angry customers are the ones who need humans.",
      "Replace the vague rule with explicit escalation criteria, plus a few examples of cases to resolve and cases to escalate.",
      "Set a hard cap so that the agent may escalate no more than 10% of conversations on any given day."
     ],
     "answer": 2,
     "explain": "C đúng: \"phức tạp\" và \"không chắc\" là tiêu chí mơ hồ nên agent escalate cả việc thường ngày. Tiêu chí tường minh (khách yêu cầu gặp người, chính sách không bao quát, không thể tiến triển) cùng vài ví dụ ranh giới cho agent biết khi nào tự xử lý. A sai: confidence model tự báo không được hiệu chuẩn, nên ngưỡng 4 không tương ứng với độ khó thật. B sai: cảm xúc tiêu cực không phải tiêu chí escalate; khách bực vì đơn chậm vẫn có thể được agent giải quyết. D sai: hạn mức tùy tiện sẽ chặn cả những ca thật sự cần người khi đã hết hạn mức.",
     "sc": "s1",
     "ts": [
      "5.2"
     ]
    },
    {
     "q": "A customer says a package marked as delivered never arrived. The support agent calls lookup_order (status: delivered) and a carrier-tracking tool (status: in transit) several times; the two systems keep disagreeing, and none of the agent's tools can resolve the conflict. The customer has been waiting ten minutes. What should the agent do?",
     "options": [
      "Keep re-querying both tools until they agree, since the carrier data may simply be catching up with the order system.",
      "Escalate with a structured summary of the conflicting statuses and what was checked, since it cannot progress with its tools.",
      "Tell the customer the package was delivered, since the order system is the company's official system of record.",
      "Issue a refund right away, since a refund settles the customer's problem regardless of which of the two systems turns out to be right."
     ],
     "answer": 1,
     "explain": "B đúng: agent đã thử hết công cụ mà không tiến triển được, đó là một tiêu chí escalate rõ ràng. Bản tóm tắt có cấu trúc (mã đơn, hai trạng thái mâu thuẫn, những gì đã kiểm tra) giúp người tiếp nhận không phải hỏi lại khách. A sai: gọi lặp lại vô ích, khách tiếp tục chờ mà không có hướng giải quyết. C sai: khẳng định một bên khi dữ liệu mâu thuẫn là đưa thông tin có thể sai cho khách. D sai: hoàn tiền khi chưa xác minh vượt quá những gì chính sách cho phép agent tự quyết, và có thể trùng nếu sau đó gói hàng tới.",
     "sc": "s1",
     "ts": [
      "5.2"
     ]
    },
    {
     "q": "The support agent resolves 92% of conversations without a human, and QA reviews a random 2% of all conversations. Complaints suggest that refunds on international orders are often handled wrongly, but those orders are only about 3% of volume. What should the team change FIRST?",
     "options": [
      "Measure accuracy per category and sample enough conversations from each one, including small ones like international refunds.",
      "Double the overall random sample to 4%, since a bigger sample will surface the problems with international orders all on its own over time.",
      "Review only the conversations in which the customer expressed negative sentiment, since that is where errors tend to show up.",
      "Trust the 92% figure, since an error rate concentrated in 3% of the volume barely affects the overall quality of service."
     ],
     "answer": 0,
     "explain": "A đúng: con số tổng có thể che một phân khúc yếu. Đo theo từng loại và lấy mẫu phân tầng bảo đảm phân khúc nhỏ như hoàn tiền quốc tế có đủ mẫu để đánh giá. B sai: mẫu ngẫu nhiên 4% trên tổng vẫn chỉ có rất ít ca quốc tế, khó kết luận. C sai: lỗi xử lý không phải lúc nào cũng đi kèm cảm xúc tiêu cực; nhiều ca sai trôi qua lặng lẽ. D sai: 3% lượng đơn vẫn là rất nhiều khách bị xử lý sai, và vấn đề có thể lan rộng nếu không ai đo.",
     "sc": "s1",
     "ts": [
      "5.5"
     ]
    },
    {
     "q": "In a multi-agent research system, a search subagent gets HTTP 403 \"subscription required\" from a journal site. It reports only a generic \"search failed\", and the coordinator re-dispatches the same query to a new subagent three times, hitting the same 403 each time. What is the BEST fix?",
     "options": [
      "Have the coordinator retry every failed query with exponential backoff, up to a fixed number of attempts per query.",
      "Report a structured error (access denied, not retryable, the source, any partial results) so the coordinator picks another source or notes the gap.",
      "Have the subagent return an empty result marked as success, so the coordinator moves on without wasting more attempts.",
      "Give the search subagent more turns, so that it can keep retrying the journal site itself until it finally gets through."
     ],
     "answer": 1,
     "explain": "B đúng: lỗi thiếu quyền truy cập không tự hết khi thử lại. Báo loại lỗi, cờ không nên retry, nguồn đã thử và kết quả một phần cho coordinator đủ thông tin để đổi nguồn hoặc ghi chú lỗ hổng trong báo cáo. A sai: backoff chỉ hợp với lỗi tạm thời; với 403 thì chỉ lặp lại thất bại chậm hơn. C sai: nuốt lỗi thành kết quả rỗng khiến báo cáo có thể kết luận sai là chủ đề không có tài liệu. D sai: thêm lượt cho subagent tự thử lại vẫn đụng cùng bức tường 403, chỉ tốn thêm chi phí.",
     "sc": "s3",
     "ts": [
      "5.3"
     ]
    },
    {
     "q": "A research subagent was asked to collect 2023–2025 deployment figures for five countries. It found sourced figures for three, then hit repeated timeouts for the other two, and returned only an error. The coordinator discards the whole subtask and re-runs it from scratch. What is the BEST design?",
     "options": [
      "Have the subagent keep retrying the two failing countries until all five succeed, so that it never hands back incomplete work to the coordinator.",
      "Have the coordinator re-run the subtask from scratch, but on a larger model that is less likely to time out.",
      "Have the subagent estimate the two missing figures from regional averages, so that the table is complete.",
      "Return the three sourced figures as partial results with the failure details, and re-dispatch only the two missing countries."
     ],
     "answer": 3,
     "explain": "D đúng: trả kết quả một phần kèm chi tiết lỗi giữ lại phần việc đã xong, và coordinator chỉ giao lại đúng phần còn thiếu. A sai: thử lại vô hạn có thể không bao giờ kết thúc, và coordinator không biết chuyện gì đang xảy ra. B sai: timeout nằm ở nguồn dữ liệu, không do model; chạy lại từ đầu còn bỏ phí ba kết quả đã có nguồn. C sai: số ước lượng trình bày như số liệu thật là bịa dữ liệu trong báo cáo nghiên cứu.",
     "sc": "s3",
     "ts": [
      "5.3"
     ]
    },
    {
     "q": "A subagent in a multi-agent research system could not complete its assigned search. Which TWO items are MOST useful to include in the failure report it returns to the coordinator? (Choose TWO.)",
     "options": [
      "The exact queries and sources it tried, and the type of failure for each (timeout, access denied, no matches).",
      "The full stack trace from its HTTP client library, so that the coordinator can debug the network code.",
      "Any partial findings it did obtain, with their sources, plus suggested alternative sources or queries.",
      "A short apology addressed to the end user, which the coordinator can paste into the final report.",
      "Only a boolean success: false, so that the coordinator's context stays as small as possible."
     ],
     "answer": [
      0,
      2
     ],
     "explain": "A và C đúng: coordinator cần biết đã thử gì và hỏng kiểu gì (để quyết định thử lại, đổi nguồn hay bỏ qua), cùng kết quả một phần và gợi ý thay thế (để không mất việc đã làm và có hướng đi tiếp). B sai: stack trace là chi tiết kỹ thuật vô ích cho việc ra quyết định nghiên cứu, chỉ làm đầy context. D sai: lời xin lỗi không giúp coordinator quyết định gì, và báo cáo không phải chỗ cho nó. E sai: một cờ thất bại trần trụi buộc coordinator đoán mò hoặc chạy lại mù quáng.",
     "sc": "s3",
     "ts": [
      "5.3"
     ]
    },
    {
     "q": "A research subagent searched a scholarly database for field trials of a niche battery chemistry. The queries ran successfully and returned zero matches, but the subagent reported this as an error, so the coordinator retried with new subagents several times and finally labeled the subtopic \"failed\" in the report. What should change?",
     "options": [
      "Report a successful zero-match search as a finding (e.g. \"no trials found in database X\"), distinct from an access failure.",
      "Have the coordinator keep retrying zero-result searches with new subagents until at least one matching document finally turns up somewhere.",
      "Drop any subtopic with zero results from the report, since an empty search tells the reader nothing useful.",
      "Mark every zero-result search as a timeout, so that the coordinator's existing retry logic is applied consistently."
     ],
     "answer": 0,
     "explain": "A đúng: truy vấn chạy thành công mà không có kết quả là một phát hiện có giá trị (chưa có thử nghiệm nào được công bố trong nguồn đó), khác hẳn với việc không truy cập được nguồn. Hai trường hợp phải được báo khác nhau. B sai: thử lại một truy vấn đã thành công chỉ tốn chi phí, kết quả vẫn rỗng. C sai: việc không tìm thấy bằng chứng là thông tin người đọc cần biết; bỏ đi khiến báo cáo trông như chưa ai xem tới chủ đề. D sai: gắn nhãn sai loại lỗi làm hỏng cả cơ chế xử lý lỗi và khiến báo cáo ghi sai sự thật.",
     "sc": "s3",
     "ts": [
      "5.3",
      "2.2"
     ]
    },
    {
     "q": "A research subagent's fetch_page tool returns HTTP 200 for paywalled articles, but the body is the site's login page. The subagent summarizes that page, and the final report cites the article as saying \"subscribe to continue reading.\" Which change BEST fixes the error handling?",
     "options": [
      "Ask the synthesis agent to delete any sentences that look like website navigation text before it writes the report.",
      "Increase the fetch timeout so that the tool waits longer for the full article to load behind the paywall.",
      "Have fetch_page detect login, paywall, or CAPTCHA pages and return them as an access failure, so the source is reported as unavailable.",
      "Have the subagent retry the fetch five times, since paywalls often disappear when the same request is repeated."
     ],
     "answer": 2,
     "explain": "C đúng: trang đăng nhập là một thất bại truy cập trá hình dưới mã 200. Tool nên nhận diện và trả nó như lỗi truy cập, để subagent báo nguồn không đọc được (và coordinator có thể đổi nguồn hoặc ghi chú lỗ hổng) thay vì coi nội dung rác là phát hiện. A sai: lọc ở bước cuối là chữa triệu chứng; bài báo vẫn bị coi là đã đọc và nguồn vẫn bị trích sai. B sai: paywall không phải vấn đề thời gian chờ. D sai: gửi lại cùng request vẫn nhận cùng trang đăng nhập.",
     "sc": "s3",
     "ts": [
      "5.3",
      "2.2"
     ]
    },
    {
     "q": "A research report states that \"40% of mid-size firms use the technology\" next to 2025 adoption figures from other sources. The 40% figure came from a 2019 survey, but the subagent's findings did not record publication or data-collection dates, so readers took it as current. Which change BEST prevents this?",
     "options": [
      "Have the synthesis agent drop every statistic older than two years, so that only recent figures appear in the report.",
      "Require each finding to carry its publication and data-collection dates, and show them in the report next to the statistic.",
      "Have the synthesis agent average older and newer figures for the same metric, to smooth out the differences between the various sources.",
      "Ask the synthesis agent to judge from each source's wording whether it is recent, and mention that in the report."
     ],
     "answer": 1,
     "explain": "B đúng: ngày là một phần của nguồn gốc dữ liệu. Ghi ngày ngay từ lúc thu thập và hiển thị cạnh số liệu giúp người đọc phân biệt số cũ với số mới, và hiểu chênh lệch có thể do thời điểm. A sai: số cũ vẫn có thể hữu ích (làm mốc so sánh); vấn đề là thiếu ngày, không phải tuổi của số. C sai: lấy trung bình hai số đo ở hai thời điểm tạo ra một con số không nguồn nào nói. D sai: đoán độ mới qua câu chữ không đáng tin; ngày phải là dữ liệu được ghi lại.",
     "sc": "s3",
     "ts": [
      "5.6"
     ]
    },
    {
     "q": "An invoice-extraction pipeline auto-posts results to the ERP and sends the rest to a human review queue. Which TWO signals are the MOST reliable reasons to route an invoice to a human? (Choose TWO.)",
     "options": [
      "The line items still do not sum to the stated total after a retry that included the specific error.",
      "The model's self-reported confidence for the document is below 0.8, using an uncalibrated score.",
      "The document is longer than three pages, since longer invoices are harder to read.",
      "A required field such as the supplier tax ID is null because it could not be found in the document.",
      "The extraction took longer than usual, which suggests the model struggled with the document."
     ],
     "answer": [
      0,
      3
     ],
     "explain": "A và D đúng: đây là tín hiệu xác định, kiểm tra được bằng code. Tổng không khớp sau retry nghĩa là hoặc trích sai hoặc chứng từ có vấn đề, và trường bắt buộc bị trống nghĩa là không thể ghi sổ an toàn. B sai: confidence model tự báo chưa hiệu chuẩn không tương ứng với tỉ lệ đúng thật. C sai: độ dài không phải bằng chứng có lỗi; nhiều hóa đơn dài vẫn trích đúng. E sai: thời gian xử lý phụ thuộc nhiều yếu tố hạ tầng, không nói lên chất lượng trích xuất.",
     "sc": "s6",
     "ts": [
      "5.5"
     ]
    },
    {
     "q": "In a large TypeScript monorepo, a developer's Claude Code sessions spend many turns and file reads working out where a symbol is defined and which code calls it. What does Claude Code's large-codebase guidance suggest to cut down these reads?",
     "options": [
      "Install a code intelligence plugin, so Claude finds definitions and references through the language server.",
      "List every symbol with its file location in the root CLAUDE.md, so Claude never has to search for any of them.",
      "Raise MAX_MCP_OUTPUT_TOKENS so each search returns more results and Claude needs fewer search calls in total.",
      "Disable the Explore subagent, so the main session does all of the searching and keeps every result for itself."
     ],
     "answer": 0,
     "explain": "Trang large-codebases (mục Reduce file reads with code intelligence): code intelligence plugin nối Claude với language server để nhảy tới định nghĩa, tìm tham chiếu và báo lỗi kiểu trực tiếp, thay vì quét cây thư mục; trang best practices cũng nhắc điều này cho ngôn ngữ có kiểu. Liệt kê mọi symbol vào CLAUDE.md làm file phình to, chiếm context mọi phiên và nhanh lỗi thời; best practices còn khuyên không mô tả cấu trúc file trong CLAUDE.md. MAX_MCP_OUTPUT_TOKENS chỉ áp dụng cho output tool MCP, không giảm số lần đọc file. Tắt Explore khiến output tìm kiếm dồn vào phiên chính, ngược với mục tiêu.",
     "sc": "s4",
     "ts": [
      "5.4",
      "2.5"
     ]
    },
    {
     "q": "Claude Code sessions in a repository keep opening committed generated code under src/gen/ and a vendored SDK under third_party/, spending context on files nobody edits by hand. Both directories are checked in, so .gitignore does not cover them. What should the team do?",
     "options": [
      "Add a note to CLAUDE.md asking Claude to avoid those folders whenever it reasonably can.",
      "Add the two paths to claudeMdExcludes, which stops Claude from reading files under them.",
      "Ask developers to run /compact after any session that has opened files in those folders.",
      "Add Read deny rules for those paths to permissions.deny in the committed .claude/settings.json."
     ],
     "answer": 3,
     "explain": "Trang large-codebases: tìm kiếm nội dung của Claude đã tôn trọng .gitignore; với đường dẫn được commit như SDK vendored hay code sinh ra, thêm deny rule Read(...) vào permissions.deny, commit trong .claude/settings.json để áp dụng cho cả nhóm. Đây là cấu hình do harness áp dụng, phủ tool đọc file built-in (Grep/Glob theo kiểu best-effort) và các lệnh Bash đọc file mà Claude Code nhận ra như cat, head; docs lưu ý nó không phủ lệnh đọc file mà không nêu tên file (như grep -r từ thư mục cha) hay script tự mở file. Ghi chú trong CLAUDE.md chỉ là lời khuyên. claudeMdExcludes chỉ bỏ qua file CLAUDE.md/rule, không chặn đọc file code. /compact chỉ dọn sau khi context đã bị tốn, không ngăn việc mở file.",
     "sc": "s4",
     "ts": [
      "5.4"
     ]
    },
    {
     "q": "A team lead is updating her team's Claude Code habits and asks which uses of subagents the current Claude Code best-practices guide still recommends. Which TWO are recommended? (Choose TWO.)",
     "options": [
      "Routing every file read through a subagent, because the context window is the main constraint",
      "Running independent pieces of work, such as researching three unrelated modules, at the same time",
      "Handing a hard task to a subagent because a subagent produces a smarter answer than the main session",
      "Making a rule that can't have exceptions, such as never editing src/gen/, reliable through a subagent's prompt",
      "Keeping long output, such as a full test run or a wide search, out of the main conversation"
     ],
     "answer": [
      1,
      4
     ],
     "explain": "Best practices hiện tại (mục Know what subagents cost) liệt kê subagent đáng dùng khi: chạy song song các phần việc độc lập; giữ output dài (chạy test đầy đủ, tìm kiếm rộng) khỏi hội thoại chính; có reviewer chưa thấy cách code được viết; giới hạn tool. Bảng \"What you can stop doing\" gọi \"dùng subagent để bảo vệ context window\" là lời khuyên cũ, vì hết context hiếm khi còn là vấn đề; và \"giao cho subagent để có câu trả lời tốt hơn\" cũng bị bỏ: cùng model, cùng task thì không thông minh hơn. Quy tắc không có ngoại lệ phải cưỡng chế bằng hook hoặc deny rule; prompt của subagent vẫn là chỉ dẫn không xác định.",
     "sc": "s4",
     "ts": [
      "5.4",
      "1.3"
     ]
    }
   ],
   "summary": [
    "Mọi thứ trong request đều tính vào context (system, messages kể cả tool result, định nghĩa tool, output, thinking). Context rot: càng nhiều token càng nhớ lại kém, nên giữ tập token nhỏ nhất, giàu tín hiệu nhất.",
    "Tóm tắt văn xuôi làm rơi số tiền, ngày, mã đơn: giữ khối case facts có cấu trúc do code duy trì, đưa vào mọi request, tách khỏi lịch sử bị tóm tắt.",
    "Output tool dài thì trích gọn các trường cần thiết trước khi đưa vào context; quy tắc lâu dài để trong CLAUDE.md (được đưa lại mỗi request) thay vì chỉ ở prompt đầu.",
    "Khám phá codebase lớn: tìm theo tên và nội dung trước, đọc chọn lọc sau; giao khám phá dài dòng cho subagent (như Explore); ghi phát hiện chính ra file ghi chú để dùng lại sau /compact hoặc ở phiên mới.",
    "Khách đòi gặp người thì chuyển ngay; khách bực mà vấn đề nằm trong khả năng của agent thì giải quyết; đặt checkpoint người ở chỗ rủi ro hoặc khi agent bị chặn.",
    "Độ chính xác tổng (vd. 97%) có thể che phân khúc yếu: đo theo loại tài liệu và theo trường trước khi giảm review, và giữ lấy mẫu ngẫu nhiên phân tầng trên kết quả tự duyệt để bắt mẫu lỗi mới.",
    "Confidence model tự báo không được hiệu chuẩn; nếu dùng thì lấy theo từng trường và hiệu chuẩn trên tập có nhãn.",
    "Lỗi trong hệ nhiều agent: không nuốt lỗi (trả rỗng như thành công) và không làm sập cả luồng; subagent retry cục bộ, không được thì báo loại lỗi, truy vấn đã thử, kết quả một phần, gợi ý thay thế; coordinator quyết định và ghi chú lỗ hổng. Ghi trạng thái để chạy tiếp từ chỗ lỗi.",
    "Provenance: giữ ánh xạ claim–nguồn (URL, đoạn trích, ngày) qua mọi bước tổng hợp; nguồn mâu thuẫn thì giữ cả hai, ghi nguồn và ngày.",
    "Citations API bảo đảm trích dẫn trỏ hợp lệ vào tài liệu nhưng không dùng cùng output_config.format; context editing xóa kết quả tool cũ, memory tool lưu ghi chú qua phiên trong /memories."
   ]
  }
 ],
 "scenarios": [
  {
   "id": "s1",
   "name": "Customer Support Resolution Agent",
   "desc": "Một agent chăm sóc khách hàng dùng tool để tra cứu đơn hàng, hoàn tiền và chuyển cho nhân viên khi cần. Trọng tâm: vòng lặp agent, luật nghiệp vụ phải được cưỡng chế bằng code, thiết kế tool và lỗi tool, giữ đúng các dữ kiện của ca (số tiền, mã đơn) trong hội thoại dài, và lúc nào thì escalate."
  },
  {
   "id": "s2",
   "name": "Code Generation with Claude Code",
   "desc": "Một nhóm dùng Claude Code để viết và sửa code hằng ngày. Trọng tâm: CLAUDE.md và rule theo đường dẫn, skill và slash command, plan mode hay làm thẳng, cách cho ví dụ, test và tiêu chí để Claude làm đúng ý."
  },
  {
   "id": "s3",
   "name": "Multi-Agent Research System",
   "desc": "Một coordinator chia câu hỏi nghiên cứu cho nhiều subagent tìm kiếm, phân tích rồi tổng hợp báo cáo có trích dẫn. Trọng tâm: chia việc, truyền context cho subagent, báo lỗi từ subagent lên coordinator, giữ liên kết giữa nhận định và nguồn."
  },
  {
   "id": "s4",
   "name": "Developer Productivity with Claude",
   "desc": "Xây công cụ giúp lập trình viên khám phá codebase lạ, sinh tài liệu, tự động hóa việc lặp lại bằng Agent SDK và MCP. Trọng tâm: chọn built-in tool và MCP server, phạm vi tool cho mỗi agent, khám phá codebase lớn mà không làm hỏng context."
  },
  {
   "id": "s5",
   "name": "Claude Code for Continuous Integration",
   "desc": "Đưa Claude Code vào pipeline CI/CD để review pull request, sinh test và góp ý tự động. Trọng tâm: chạy không tương tác với -p, output có cấu trúc, context nào đưa vào CI, giảm báo nhầm (false positive), review nhiều lượt và review độc lập."
  },
  {
   "id": "s6",
   "name": "Structured Data Extraction",
   "desc": "Một luồng trích xuất dữ liệu có cấu trúc từ tài liệu không đồng nhất (hóa đơn, hợp đồng, biểu mẫu). Trọng tâm: JSON schema qua tool use hoặc structured outputs, validate rồi retry, trường tự kiểm, Message Batches API cho khối lượng lớn, và khi nào cần người duyệt."
  }
 ],
 "guide": {
  "title": "Chiến lược thi",
  "intro": "<p>Phần này không dạy thêm kiến thức. Nó trả lời ba câu hỏi: đề CCAR-F chấm cái gì, nên chọn đáp án theo những nguyên tắc nào, và ôn thế nào cho đủ trong vài tuần. Các bài trong phần này dẫn ngược về bài học của từng domain (ví dụ <a href=\"#l-1-3\">bài 1.3</a>) thay vì giảng lại.</p>\n<p>Số liệu về đề thi (số câu, thời gian, điểm đậu, lệ phí, chính sách thi lại) lấy từ exam guide v1.0 (hiệu lực tháng 7/2026) và các trang FAQ, Policies trên Anthropic Partner Academy, đọc vào tháng 11/2026. Những thông tin này có thể thay đổi. Trước khi đăng ký, hãy mở lại trang chính thức để kiểm tra.</p>",
  "lessons": [
   {
    "id": "g-1",
    "title": "Đề thi chấm gì: định dạng, điểm và cách đọc tỉ trọng",
    "minutes": 10,
    "html": "<p>Biết rõ đề được dựng thế nào thì bạn sẽ ôn đúng chỗ và chia thời gian hợp lý. Mọi con số dưới đây lấy từ exam guide CCAR-F (bản 1.0, hiệu lực tháng 7/2026) và trang FAQ chứng chỉ trên Partner Academy.</p>\n<h4>Định dạng đề</h4>\n<table>\n<thead><tr><th>Mục</th><th>Exam guide / FAQ ghi</th></tr></thead>\n<tbody>\n<tr><td>Số câu</td><td>60</td></tr>\n<tr><td>Thời gian làm bài</td><td>120 phút. FAQ khuyên dự trù khoảng 135 phút có mặt, tính cả check-in, hướng dẫn và một khảo sát ngắn sau bài thi.</td></tr>\n<tr><td>Dạng câu</td><td>Chọn một đáp án (multiple choice) và chọn nhiều đáp án (multiple response). Mỗi câu ghi rõ cần chọn bao nhiêu đáp án.</td></tr>\n<tr><td>Cấu trúc</td><td>Đề có 4 kịch bản (scenario), rút ngẫu nhiên từ bộ 6 kịch bản công bố trong guide.</td></tr>\n<tr><td>Điểm</td><td>Điểm quy đổi (scaled score) thang 100–1.000, đậu từ <strong>720</strong>.</td></tr>\n<tr><td>Hình thức</td><td>Có giám thị, thi online hoặc tại trung tâm khảo thí của Pearson VUE.</td></tr>\n<tr><td>Ngôn ngữ</td><td>FAQ ghi đề và tài liệu ôn có bản tiếng Anh và tiếng Nhật.</td></tr>\n</tbody>\n</table>\n<p>Lệ phí, thời hạn chứng chỉ và thủ tục đăng ký nằm ở <a href=\"#g-7\">bài G7</a>.</p>\n<h4>Điểm 720 không có nghĩa là đúng 72%</h4>\n<p>Guide mô tả đây là bài thi <em>tham chiếu tiêu chí</em> (criterion-referenced): bạn được so với một chuẩn cố định do hội đồng chuyên gia đặt ra, không so với thí sinh khác. Điểm được quy đổi để cân bằng giữa các bộ đề có độ khó hơi khác nhau. Anthropic không công bố bảng đổi từ số câu đúng sang điểm 100–1.000. Trang thi thử của site dùng mốc khoảng 72% câu đúng chỉ để tham khảo, đừng coi đó là ngưỡng thật.</p>\n<h4>Phiếu điểm cho biết gì</h4>\n<ul>\n<li>Kết quả đậu/trượt và điểm quy đổi 100–1.000.</li>\n<li>Tỉ lệ phần trăm câu đúng trong từng domain. Guide nói rõ các tỉ lệ này chỉ để bạn biết mình yếu ở đâu. Đậu hay trượt chỉ dựa trên tổng điểm quy đổi.</li>\n<li>FAQ ghi điểm hiện trên màn hình ngay khi làm xong. Thi ở trung tâm thì được phát thêm phiếu điểm in. Bản phiếu điểm được gửi qua email, và xem lại được bất cứ lúc nào trong tài khoản Pearson VUE.</li>\n</ul>\n<h4>Từ tỉ trọng domain ra số câu (ước lượng)</h4>\n<p>Guide ghi tỉ trọng là tỉ lệ <em>xấp xỉ</em> số câu được chấm điểm thuộc mỗi domain. Nhân với 60 câu thì ra con số dưới đây. Đây là phép tính của site, không phải con số Anthropic công bố.</p>\n<table>\n<thead><tr><th>Domain</th><th>Tỉ trọng</th><th>≈ số câu</th></tr></thead>\n<tbody>\n<tr><td><a href=\"#d1\">1. Agentic Architecture &amp; Orchestration</a></td><td>27%</td><td>~16</td></tr>\n<tr><td><a href=\"#d2\">2. Tool Design &amp; MCP Integration</a></td><td>18%</td><td>~11</td></tr>\n<tr><td><a href=\"#d3\">3. Claude Code Configuration &amp; Workflows</a></td><td>20%</td><td>~12</td></tr>\n<tr><td><a href=\"#d4\">4. Prompt Engineering &amp; Structured Output</a></td><td>20%</td><td>~12</td></tr>\n<tr><td><a href=\"#d5\">5. Context Management &amp; Reliability</a></td><td>15%</td><td>~9</td></tr>\n</tbody>\n</table>\n<p>Thực tế, số câu của từng domain trong đề bạn gặp còn tùy vào 4 kịch bản được rút. Ví dụ, đề có cả kịch bản Claude Code lẫn CI sẽ nghiêng về Domain 3. Mỗi kịch bản có nhóm \"primary domains\" riêng, xem <a href=\"#g-2\">bài G2</a>.</p>\n<h4>Đề dựng quanh kịch bản</h4>\n<p>Mỗi kịch bản mô tả một bối cảnh sản xuất (một agent chăm sóc khách hàng, một pipeline CI…), rồi một loạt câu hỏi bám vào bối cảnh đó. Có ba hệ quả khi làm bài:</p>\n<ol>\n<li><strong>Đọc kỹ phần mô tả kịch bản một lần.</strong> Tên tool, mục tiêu (ví dụ tỉ lệ giải quyết ngay lần đầu), ràng buộc sẽ được dùng lại trong nhiều câu.</li>\n<li><strong>Mỗi câu vẫn độc lập.</strong> Tình huống cụ thể nằm trong thân câu, như log, số liệu, triệu chứng. Đáp án đúng phải khớp với triệu chứng đó, không chỉ khớp với kịch bản chung.</li>\n<li><strong>Câu hỏi thường không hỏi định nghĩa.</strong> Guide nói thí sinh phải thể hiện khả năng phán đoán về kiến trúc, cấu hình và đánh đổi, không chỉ thuộc khái niệm. Phần lớn câu yêu cầu chọn cách <em>tốt nhất</em> trong vài cách đều \"chạy được\". Cách chọn nằm ở <a href=\"#g-3\">bài G3</a>.</li>\n</ol>\n<h4>Những gì guide nói sẽ không ra</h4>\n<p>Phụ lục guide liệt kê các chủ đề nằm ngoài phạm vi thi. Một số mục đáng chú ý: fine-tuning, xác thực/billing/tài khoản API, computer use, xử lý ảnh (vision), triển khai streaming/SSE, rate limit và tính giá, chi tiết cài đặt prompt caching (chỉ cần biết nó tồn tại), thuật toán đếm token, cấu hình riêng của từng cloud, embedding và vector database, hạ tầng để host MCP server. Lời khuyên của site: phương án nào dựa chủ yếu vào những thứ này thì nhiều khả năng là phương án gây nhiễu.</p>\n<div class=\"tip\">Ngân sách thời gian (gợi ý của site): 120 phút cho 60 câu là 2 phút/câu. Đi một lượt trả lời hết, câu nào phân vân thì chọn tạm một đáp án rồi để dành thời gian quay lại, nếu giao diện thi cho phép xem lại câu trước (các trang chính thức không mô tả chi tiết này). Câu chọn nhiều đáp án tốn thời gian hơn, vì phải xét từng phương án riêng.</div>",
    "keypoints": [
     "60 câu, 120 phút, 4 kịch bản rút từ 6; câu chọn một hoặc chọn nhiều (đề ghi rõ số đáp án).",
     "Điểm quy đổi 100–1.000, đậu 720; không có bảng đổi công khai sang % câu đúng.",
     "Phiếu điểm: đậu/trượt, điểm quy đổi, % đúng theo domain (chỉ để tham khảo, không quyết định kết quả).",
     "Tỉ trọng 27/18/20/20/15 ≈ 16/11/12/12/9 câu, nhưng thực tế lệch theo 4 kịch bản được rút.",
     "Guide liệt kê chủ đề ngoài phạm vi (fine-tuning, vision, computer use, pricing…), phương án dựa vào chúng thường là nhiễu."
    ],
    "sources": [
     {
      "t": "Claude Certified Architect – Foundations: trang chứng chỉ (link Exam Guide PDF v1.0)",
      "u": "https://anthropic-partners.skilljar.com/claude-certified-architect-foundations-certification"
     },
     {
      "t": "Certification FAQ (định dạng, thời gian có mặt, điểm, phiếu điểm, ngôn ngữ)",
      "u": "https://anthropic-partners.skilljar.com/page/faq-certifications"
     }
    ]
   },
   {
    "id": "g-2",
    "title": "Sáu kịch bản: mỗi kịch bản hỏi gì và ôn bài nào",
    "minutes": 12,
    "html": "<p>Exam guide công bố sẵn 6 kịch bản. Mỗi đề rút 4 trong số đó. Bạn không biết trước sẽ gặp kịch bản nào, nên phải ôn đủ cả 6. Tin tốt là các kịch bản dùng chung nhiều kiến thức. Cột \"Primary domains\" dưới đây chép theo guide. Cột task statement và bài cần ôn là phân tích của site, dựa trên nội dung từng task statement.</p>\n<h4>Bảng tổng quan</h4>\n<table>\n<thead><tr><th>Kịch bản</th><th>Primary domains (guide)</th><th>Task statement hay gặp (site phân tích)</th><th>Ôn bài</th></tr></thead>\n<tbody>\n<tr><td><strong>S1</strong> Customer Support Resolution Agent</td><td>D1, D2, D5</td><td>1.1, 1.4, 1.5, 2.1, 2.2, 5.1, 5.2</td><td><a href=\"#l-1-1\">1.1</a>, <a href=\"#l-1-3\">1.3</a>, <a href=\"#l-1-7\">1.7</a>, <a href=\"#l-2-1\">2.1</a>, <a href=\"#l-2-3\">2.3</a>, <a href=\"#l-5-1\">5.1</a>, <a href=\"#l-5-2\">5.2</a></td></tr>\n<tr><td><strong>S2</strong> Code Generation with Claude Code</td><td>D3, D5</td><td>3.1–3.5, 5.4</td><td><a href=\"#l-3-1\">3.1</a>, <a href=\"#l-3-2\">3.2</a>, <a href=\"#l-3-3\">3.3</a>, <a href=\"#l-3-5\">3.5</a>, <a href=\"#l-3-6\">3.6</a>, <a href=\"#l-5-4\">5.4</a></td></tr>\n<tr><td><strong>S3</strong> Multi-Agent Research System</td><td>D1, D2, D5</td><td>1.2, 1.3, 1.6, 2.2, 2.3, 5.3, 5.6</td><td><a href=\"#l-1-2\">1.2</a>, <a href=\"#l-1-5\">1.5</a>, <a href=\"#l-1-6\">1.6</a>, <a href=\"#l-2-2\">2.2</a>, <a href=\"#l-5-3\">5.3</a>, <a href=\"#l-5-5\">5.5</a></td></tr>\n<tr><td><strong>S4</strong> Developer Productivity with Claude</td><td>D2, D3, D1</td><td>2.1, 2.4, 2.5, 3.2, 3.4, 1.3, 1.7, 5.4</td><td><a href=\"#l-2-2\">2.2</a>, <a href=\"#l-2-4\">2.4</a>, <a href=\"#l-2-5\">2.5</a>, <a href=\"#l-1-4\">1.4</a>, <a href=\"#l-1-6\">1.6</a>, <a href=\"#l-5-4\">5.4</a></td></tr>\n<tr><td><strong>S5</strong> Claude Code for Continuous Integration</td><td>D3, D4</td><td>3.6, 4.1, 4.2, 4.5, 4.6, 1.6</td><td><a href=\"#l-3-4\">3.4</a>, <a href=\"#l-4-1\">4.1</a>, <a href=\"#l-4-4\">4.4</a>, <a href=\"#l-4-6\">4.6</a>, <a href=\"#l-1-5\">1.5</a></td></tr>\n<tr><td><strong>S6</strong> Structured Data Extraction</td><td>D4, D5</td><td>4.2, 4.3, 4.4, 4.5, 5.5</td><td><a href=\"#l-4-3\">4.3</a>, <a href=\"#l-4-5\">4.5</a>, <a href=\"#l-4-4\">4.4</a>, <a href=\"#l-4-1\">4.1</a>, <a href=\"#l-5-2\">5.2</a></td></tr>\n</tbody>\n</table>\n<p>Lưu ý: số thứ tự task statement (như 1.4) là của exam guide, còn số bài (như bài 1.4) là của site. Hai hệ đánh số này không trùng nhau.</p>\n<h4>S1: Agent chăm sóc khách hàng</h4>\n<p>Hệ thống: một agent viết bằng Agent SDK, xử lý đổi trả, tranh chấp thanh toán, vấn đề tài khoản qua các MCP tool nối vào backend (tra khách hàng, tra đơn, hoàn tiền, chuyển nhân viên). Mục tiêu guide đặt ra: giải quyết ngay lần liên hệ đầu tiên từ 80% ca trở lên, nhưng biết lúc nào phải chuyển người.</p>\n<ul>\n<li>Vòng lặp agent và <code>stop_reason</code>: <a href=\"#l-1-1\">bài 1.1</a>.</li>\n<li>Quy tắc tiền bạc, thứ tự bước bắt buộc: dùng hook hoặc điều kiện tiên quyết trong code, xem <a href=\"#l-1-3\">bài 1.3</a> và <a href=\"#l-1-7\">bài 1.7</a>.</li>\n<li>Tool bị chọn nhầm vì mô tả sơ sài, lỗi tool trả về chung chung: <a href=\"#l-2-1\">bài 2.1</a>, <a href=\"#l-2-3\">bài 2.3</a>.</li>\n<li>Hội thoại dài làm mất số tiền và mã đơn, khi nào escalate và cách bàn giao: <a href=\"#l-5-1\">bài 5.1</a>, <a href=\"#l-5-2\">bài 5.2</a>, <a href=\"#l-1-4\">bài 1.4</a>.</li>\n</ul>\n<h4>S2: Sinh code với Claude Code</h4>\n<p>Hệ thống: một nhóm dùng Claude Code hằng ngày để viết, refactor, debug, viết tài liệu. Câu hỏi xoay quanh việc cấu hình cho cả team và chọn cách làm việc.</p>\n<ul>\n<li>Thứ bậc CLAUDE.md (user / project / thư mục con), <code>@import</code>, <code>.claude/rules/</code> có <code>paths</code>: <a href=\"#l-3-1\">bài 3.1</a>.</li>\n<li>Skill và slash command, phạm vi project hay cá nhân, frontmatter: <a href=\"#l-3-2\">bài 3.2</a>.</li>\n<li>Plan mode hay làm thẳng: <a href=\"#l-3-3\">bài 3.3</a>. Cho ví dụ, test, phỏng vấn: <a href=\"#l-3-5\">bài 3.5</a>.</li>\n<li>Context đầy dần trong phiên dài: <a href=\"#l-3-6\">bài 3.6</a>, <a href=\"#l-5-4\">bài 5.4</a>.</li>\n</ul>\n<h4>S3: Hệ nghiên cứu nhiều agent</h4>\n<p>Hệ thống: một coordinator giao việc cho các subagent chuyên trách (tìm web, phân tích tài liệu, tổng hợp, viết báo cáo), đầu ra là báo cáo có trích dẫn.</p>\n<ul>\n<li>Coordinator chia việc, truyền context, gọi song song: <a href=\"#l-1-2\">bài 1.2</a>, <a href=\"#l-1-6\">bài 1.6</a>, <a href=\"#l-1-5\">bài 1.5</a>.</li>\n<li>Mỗi subagent chỉ có tool đúng vai trò: <a href=\"#l-2-2\">bài 2.2</a>.</li>\n<li>Lỗi từ subagent báo lên thế nào, kết quả rỗng khác thất bại ra sao: <a href=\"#l-5-3\">bài 5.3</a>, <a href=\"#l-2-3\">bài 2.3</a>.</li>\n<li>Giữ liên kết nhận định ↔ nguồn, xử lý số liệu mâu thuẫn: <a href=\"#l-5-5\">bài 5.5</a>, <a href=\"#l-5-3\">bài 5.3</a>.</li>\n</ul>\n<h4>S4: Công cụ năng suất cho developer</h4>\n<p>Hệ thống: một agent viết bằng Agent SDK giúp kỹ sư khám phá codebase lạ, hiểu hệ thống cũ, sinh boilerplate, tự động hóa việc lặp lại. Agent dùng built-in tool (Read, Write, Bash, Grep, Glob) và nối thêm MCP server.</p>\n<ul>\n<li>Chọn đúng built-in tool, tool_choice: <a href=\"#l-2-2\">bài 2.2</a>.</li>\n<li>Cấu hình MCP server (.mcp.json, biến môi trường), resources: <a href=\"#l-2-4\">bài 2.4</a>, <a href=\"#l-2-5\">bài 2.5</a>.</li>\n<li>Khám phá codebase lớn từng bước, scratchpad, subagent Explore: <a href=\"#l-5-4\">bài 5.4</a>.</li>\n<li>Resume hay mở phiên mới, fork phiên: <a href=\"#l-1-4\">bài 1.4</a>. Cấu hình subagent trong SDK: <a href=\"#l-1-6\">bài 1.6</a>.</li>\n</ul>\n<div class=\"warn\">Danh sách built-in tool trong kịch bản S4 có Grep và Glob. Docs Claude Code hiện ghi rằng trên macOS, Linux và WSL, hai tool này không nằm trong bộ tool mặc định (tháng 11/2026). Câu hỏi thi vẫn kiểm tra cách phân biệt Grep (tìm nội dung) với Glob (tìm theo tên file). Chi tiết ở <a href=\"#g-5\">bài G5</a>.</div>\n<h4>S5: Claude Code trong CI</h4>\n<p>Hệ thống: Claude Code chạy trong pipeline CI/CD để review pull request, sinh test và góp ý. Kịch bản nhấn mạnh việc góp ý phải dùng được và ít báo nhầm.</p>\n<ul>\n<li>Chạy không tương tác (<code>-p</code>), output JSON theo schema: <a href=\"#l-3-4\">bài 3.4</a>.</li>\n<li>Tiêu chí review cụ thể, few-shot, đo false positive: <a href=\"#l-4-1\">bài 4.1</a>, <a href=\"#l-4-6\">bài 4.6</a>.</li>\n<li>Batch hay đồng bộ, review nhiều lượt, review độc lập: <a href=\"#l-4-4\">bài 4.4</a>. Chia review theo file rồi thêm lượt tích hợp: <a href=\"#l-1-5\">bài 1.5</a>.</li>\n</ul>\n<h4>S6: Trích xuất dữ liệu có cấu trúc</h4>\n<p>Hệ thống: trích thông tin từ tài liệu không có cấu trúc, kiểm tra bằng JSON schema, giữ độ chính xác cao, xử lý ổn các ca biên và nối với hệ thống phía sau.</p>\n<ul>\n<li>Tool use / structured outputs, thiết kế schema (nullable, enum có \"other\"): <a href=\"#l-4-3\">bài 4.3</a>, <a href=\"#l-4-5\">bài 4.5</a>.</li>\n<li>Vòng validate rồi retry, khi nào retry vô ích: <a href=\"#l-4-3\">bài 4.3</a>.</li>\n<li>Message Batches API cho khối lượng lớn: <a href=\"#l-4-4\">bài 4.4</a>. Few-shot cho tài liệu đa dạng: <a href=\"#l-4-1\">bài 4.1</a>.</li>\n<li>Người duyệt, confidence, lấy mẫu phân tầng: <a href=\"#l-5-2\">bài 5.2</a>.</li>\n</ul>\n<div class=\"tip\">Theo cột primary domains của guide: Domain 1 và 2 cùng có mặt ở S1, S3, S4; Domain 3 ở S2, S4, S5; Domain 4 ở S5, S6; Domain 5 ở bốn kịch bản S1, S2, S3, S6. Nếu thời gian ôn ít, gợi ý của site là nắm chắc <a href=\"#l-1-3\">bài 1.3</a> (cưỡng chế bằng code), <a href=\"#l-2-1\">bài 2.1</a> (mô tả tool) và <a href=\"#l-4-3\">bài 4.3</a> (output có cấu trúc), vì đây là ba nguyên tắc được dùng lại nhiều nhất khi chọn đáp án (xem <a href=\"#g-3\">bài G3</a>).</div>",
    "keypoints": [
     "Guide công bố 6 kịch bản, mỗi đề rút 4, nên phải ôn cả 6.",
     "Primary domains theo guide: S1 D1/D2/D5, S2 D3/D5, S3 D1/D2/D5, S4 D2/D3/D1, S5 D3/D4, S6 D4/D5.",
     "Mô tả kịch bản cố định (tên tool, mục tiêu), còn chi tiết quyết định đáp án nằm trong từng câu.",
     "Số task statement của guide (1.1–5.6) khác với số bài của site."
    ],
    "sources": [
     {
      "t": "Claude Certified Architect – Foundations: trang chứng chỉ (Exam Guide PDF, mục 5–6: kịch bản và task statement)",
      "u": "https://anthropic-partners.skilljar.com/claude-certified-architect-foundations-certification"
     },
     {
      "t": "Claude Code tools reference (Glob/Grep trên macOS, Linux, WSL)",
      "u": "https://code.claude.com/docs/en/tools-reference"
     }
    ]
   },
   {
    "id": "g-3",
    "title": "Cách chọn đáp án: nguyên tắc cho câu hỏi “tốt nhất”",
    "minutes": 13,
    "html": "<p>Phần lớn câu CCAR-F đưa ra 4 cách đều có lý. Sai lầm thường gặp là chọn cách \"nghe xịn nhất\" thay vì cách đúng với triệu chứng. Các nguyên tắc dưới đây do site rút ra từ phần mô tả kiến thức và kỹ năng trong exam guide (mục 6) cùng phần giải thích của các câu mẫu. Đây là cách diễn đạt và ví dụ của site, không phải câu chữ của guide.</p>\n<h4>0. Đọc xem câu hỏi tối ưu cho cái gì</h4>\n<p>Trước khi đọc phương án, gạch chân cụm từ quyết định trong câu hỏi:</p>\n<ul>\n<li><strong>\"first step\", \"bước đầu tiên\"</strong>: chọn thay đổi rẻ nhất mà vẫn nhắm đúng nguyên nhân, không chọn giải pháp tổng thể.</li>\n<li><strong>\"most reliable\", \"guarantee\"</strong>: ưu tiên cơ chế xác định (code, schema, cấu hình) hơn cơ chế xác suất (lời dặn).</li>\n<li><strong>\"reduce cost\", \"latency\"</strong>: so sánh theo chi phí và độ trễ, không theo độ chính xác.</li>\n<li><strong>\"team-wide\", \"shared\"</strong>: chọn cấu hình cấp project được commit, không chọn cấu hình cá nhân.</li>\n</ul>\n<h4>1. Quy tắc cứng thì cưỡng chế bằng code</h4>\n<p>Khi sai một lần là mất tiền, lộ dữ liệu hoặc sai thứ tự nghiệp vụ, lời dặn trong prompt không đủ, vì model tuân theo lời dặn với xác suất cao nhưng không phải 100%. Hãy chọn hook, điều kiện tiên quyết trong tool, hoặc deny rule. Docs Claude Code cũng khuyên: quy tắc không được phép uốn thì biến thành hook hoặc deny rule.</p>\n<p><em>Ví dụ của site:</em> một agent kế toán tuyệt đối không được tạo giao dịch chuyển khoản tới tài khoản chưa có trong danh bạ đã duyệt. Thêm dòng \"IMPORTANT\" vào system prompt hay thêm few-shot đều chỉ giảm tỉ lệ sai. Một hook trước lời gọi tool <code>create_transfer</code>, kiểm tra tài khoản nhận và chặn nếu không hợp lệ, mới bảo đảm được. Xem <a href=\"#l-1-3\">bài 1.3</a>, <a href=\"#l-1-7\">bài 1.7</a>.</p>\n<p>Ngược lại, với hành vi mang tính phán đoán (giọng văn, khi nào hỏi lại khách), prompt và few-shot là công cụ đúng. Viết hook cho mấy chuyện này là thừa.</p>\n<h4>2. Tìm nguyên nhân gốc trong thân câu, rồi sửa đúng chỗ đó</h4>\n<p>Thân câu thường cài sẵn bằng chứng: log, số liệu, một mô tả tool sơ sài, một bước chia việc thiếu. Đáp án đúng sửa đúng chỗ bằng chứng chỉ ra. Phương án gây nhiễu thường sửa ở tầng khác, nghe hợp lý nhưng không chạm vào nguyên nhân.</p>\n<p><em>Ví dụ của site:</em> báo cáo nghiên cứu về \"năng lượng tái tạo ở Đông Nam Á\" chỉ nói về Việt Nam và Thái Lan. Log cho thấy coordinator chỉ tạo hai nhiệm vụ con cho hai nước đó. Nguyên nhân nằm ở bước chia việc của coordinator, nên sửa ở đó. Chỉnh các subagent phía sau không bù được phần việc chưa từng được giao. Xem <a href=\"#l-1-2\">bài 1.2</a>.</p>\n<h4>3. Sửa đơn giản trước khi thêm tầng phức tạp</h4>\n<p>Nếu một thay đổi nhỏ (viết lại mô tả tool, thêm tiêu chí cụ thể, chuyển file cấu hình sang đúng phạm vi) đủ giải quyết triệu chứng, thì đó thường là đáp án. Thêm bộ phân loại, router, model thứ hai hay gộp tool là những phương án nặng nề. Phần giải thích câu mẫu trong guide cũng xếp kiểu phương án này vào nhóm sai khi cách đơn giản chưa được thử. Xem <a href=\"#l-2-1\">bài 2.1</a>.</p>\n<h4>4. Quyền tối thiểu, công cụ cụ thể nhất</h4>\n<ul>\n<li>Mỗi agent chỉ nhận tool đúng vai trò. Nếu cần thêm khả năng cho một agent, cấp một tool hẹp cho nhu cầu hay gặp, đừng cấp cả bộ tool của agent khác. Xem <a href=\"#l-2-2\">bài 2.2</a>.</li>\n<li>Một tool chung chung (đọc mọi URL, chạy mọi lệnh) kém hơn một tool có ràng buộc rõ, kiểm tra đầu vào.</li>\n<li>Cấu hình cũng vậy: cái gì cả team cần thì để ở project, cái gì thử nghiệm cá nhân thì để ở user. Xem <a href=\"#l-3-1\">bài 3.1</a>, <a href=\"#l-2-4\">bài 2.4</a>.</li>\n</ul>\n<h4>5. Loại phương án \"to hơn\" khi nguyên nhân ở chỗ khác</h4>\n<p>Các phương án như đổi sang model lớn hơn, mở context window rộng hơn, tăng <code>max_tokens</code>, retry nhiều lần hơn hay bật suy luận sâu hơn là phương án nhiễu điển hình. Chúng hấp dẫn vì có vẻ \"nâng cấp\". Hãy tự hỏi: triệu chứng có thật sự do thiếu năng lực hay thiếu chỗ chứa không?</p>\n<ul>\n<li>Review bỏ sót lỗi khi đưa quá nhiều file vào một lượt: vấn đề là sự chú ý bị loãng. Cách đúng là chia lượt (<a href=\"#l-1-5\">bài 1.5</a>). Context lớn hơn không chữa được.</li>\n<li>Trích xuất ra <code>null</code> vì tài liệu thật sự không chứa thông tin đó: retry bao nhiêu lần cũng vô ích (<a href=\"#l-4-3\">bài 4.3</a>).</li>\n<li>Model tự review code của chính nó trong cùng phiên: dù bật suy luận sâu, nó vẫn mang theo lập luận cũ. Cần một instance độc lập (<a href=\"#l-4-6\">bài 4.6</a>).</li>\n</ul>\n<h4>6. Tiêu chí cụ thể và ví dụ thắng lời dặn chung chung</h4>\n<p>\"Hãy cẩn thận\", \"chỉ báo khi chắc chắn\", \"be conservative\" là những lời dặn không đo được, và guide nêu rõ chúng không cải thiện precision (tỉ lệ finding báo ra là đúng) bằng tiêu chí phân loại cụ thể. Phương án tốt định nghĩa rõ cái gì cần báo, cái gì bỏ qua, kèm 2–4 ví dụ cho các ca mập mờ. Xem <a href=\"#l-4-1\">bài 4.1</a>.</p>\n<h4>7. Biết mỗi cơ chế bảo đảm được gì</h4>\n<table>\n<thead><tr><th>Cơ chế</th><th>Bảo đảm</th><th>Không bảo đảm</th></tr></thead>\n<tbody>\n<tr><td>JSON schema qua tool use / structured outputs</td><td>Đúng cú pháp, đúng cấu trúc</td><td>Đúng nghĩa (tổng có khớp không, giá trị có đặt đúng trường không)</td></tr>\n<tr><td>Hook / gate trong code</td><td>Hành động bị chặn hoặc cho qua một cách xác định</td><td>Model hiểu vì sao bị chặn (phải trả thông điệp rõ)</td></tr>\n<tr><td>Prompt, few-shot</td><td>Định hướng phán đoán</td><td>Tuân thủ 100%</td></tr>\n<tr><td>Subagent</td><td>Context riêng, tách output dài khỏi luồng chính</td><td>Tự biết những gì coordinator biết</td></tr>\n<tr><td>Message Batches API</td><td>Rẻ hơn cho việc không gấp</td><td>Thời gian xong có cam kết (docs: phần lớn batch xong dưới 1 giờ, nhưng có thể tới 24 giờ)</td></tr>\n</tbody>\n</table>\n<h4>8. Escalation: theo tiêu chí, không theo cảm xúc</h4>\n<p>Khách yêu cầu gặp người thật thì chuyển ngay. Chính sách không nói gì về trường hợp của khách thì escalate. Mức độ bực bội của khách hay điểm tự tin model tự báo không phải thước đo tốt cho độ khó của ca. Xem <a href=\"#l-5-2\">bài 5.2</a>.</p>\n<h4>Kỹ thuật làm câu</h4>\n<ol>\n<li>Đọc câu hỏi trước, rồi mới đọc lại thân câu để tìm bằng chứng.</li>\n<li>Loại ngay phương án không chạm vào triệu chứng, hoặc dựa vào chủ đề ngoài phạm vi thi.</li>\n<li>Còn hai phương án thì so theo nguyên tắc 1–3: cái nào xác định hơn, sửa gốc hơn, đơn giản hơn.</li>\n<li>Câu chọn nhiều đáp án: xét từng phương án như một câu đúng/sai riêng, và chọn đúng số lượng đề yêu cầu.</li>\n<li>Trả lời theo \"thế giới của đề\": dùng khái niệm và tên gọi như trong exam guide. Nếu sản phẩm hiện tại đã đổi tên hay đổi hành vi, xem <a href=\"#g-5\">bài G5</a> để biết cách xử lý.</li>\n</ol>",
    "keypoints": [
     "Gạch chân thứ câu hỏi tối ưu (first step, most reliable, cost, team-wide) trước khi đọc phương án.",
     "Quy tắc cứng (tiền, bảo mật, thứ tự bước) dùng hook/gate trong code; prompt chỉ cho hành vi mang tính phán đoán.",
     "Tìm nguyên nhân trong thân câu và sửa đúng chỗ; thay đổi đơn giản trước khi thêm router, classifier hay model khác.",
     "Loại phương án “to hơn” (model lớn hơn, context rộng hơn, retry nhiều hơn) khi nguyên nhân là chú ý bị loãng, thiếu dữ liệu hoặc tự review.",
     "Tiêu chí cụ thể + ví dụ thắng lời dặn chung; schema bảo đảm cú pháp chứ không bảo đảm đúng nghĩa."
    ],
    "sources": [
     {
      "t": "Claude Certified Architect – Foundations: trang chứng chỉ (Exam Guide PDF, mục 6 và 9)",
      "u": "https://anthropic-partners.skilljar.com/claude-certified-architect-foundations-certification"
     },
     {
      "t": "Claude Code best practices (quy tắc không được uốn thì dùng hook hoặc deny rule)",
      "u": "https://code.claude.com/docs/en/best-practices"
     }
    ]
   },
   {
    "id": "g-4",
    "title": "Bẫy theo từng kịch bản",
    "minutes": 14,
    "html": "<p>Mỗi kịch bản có vài kiểu phương án sai lặp đi lặp lại. Nhận ra kiểu bẫy giúp loại phương án nhanh hơn. Đây là phân tích của site dựa trên task statement trong exam guide. Câu thật có thể khác.</p>\n<h4>S1: Agent chăm sóc khách hàng</h4>\n<table>\n<thead><tr><th>Bẫy</th><th>Vì sao sai</th><th>Ôn</th></tr></thead>\n<tbody>\n<tr><td>Ép quy tắc nghiệp vụ (giới hạn hoàn tiền, xác minh danh tính trước) chỉ bằng system prompt hoặc few-shot</td><td>Lời dặn có tỉ lệ thất bại khác 0. Với thao tác tài chính, phải chặn bằng hook hoặc điều kiện tiên quyết trong code.</td><td><a href=\"#l-1-3\">1.3</a>, <a href=\"#l-1-7\">1.7</a></td></tr>\n<tr><td>Escalate theo cảm xúc của khách hoặc theo điểm tự tin model tự báo</td><td>Đó là những thước đo kém cho độ khó của ca. Nên dùng tiêu chí rõ: khách đòi gặp người, chính sách không nói tới, không tiến triển được.</td><td><a href=\"#l-5-2\">5.2</a></td></tr>\n<tr><td>Khách đã đòi gặp người mà agent vẫn cố điều tra thêm, hoặc tool trả về nhiều khách trùng tên mà agent tự chọn một</td><td>Yêu cầu gặp người thì làm ngay. Nhiều kết quả khớp thì phải hỏi thêm thông tin định danh, không đoán.</td><td><a href=\"#l-5-2\">5.2</a></td></tr>\n<tr><td>Tóm tắt dần lịch sử hội thoại dài, để số tiền và mã đơn bị nhòe đi</td><td>Dữ kiện giao dịch nên tách thành khối \"case facts\" đưa vào mỗi lượt, nằm ngoài phần tóm tắt.</td><td><a href=\"#l-5-1\">5.1</a></td></tr>\n</tbody>\n</table>\n<h4>S2: Sinh code với Claude Code</h4>\n<table>\n<thead><tr><th>Bẫy</th><th>Vì sao sai</th><th>Ôn</th></tr></thead>\n<tbody>\n<tr><td>Đặt quy ước cho cả team trong <code>~/.claude/CLAUDE.md</code></td><td>File cấp user chỉ áp dụng cho một người, không đi theo git. Quy ước team phải nằm ở CLAUDE.md cấp project.</td><td><a href=\"#l-3-1\">3.1</a></td></tr>\n<tr><td>Dùng CLAUDE.md trong thư mục con cho quy ước áp dụng cho file rải khắp repo (ví dụ mọi file test)</td><td>CLAUDE.md thư mục con gắn với một cây thư mục. Rule trong <code>.claude/rules/</code> có <code>paths</code> dạng glob thì bắt theo loại file, ở thư mục nào cũng được.</td><td><a href=\"#l-3-1\">3.1</a></td></tr>\n<tr><td>Bật plan mode cho sửa một dòng có stack trace rõ, hoặc làm thẳng một cuộc di chuyển kiến trúc lớn</td><td>Plan mode dành cho việc lớn, nhiều cách làm, ảnh hưởng nhiều file. Việc nhỏ và rõ phạm vi thì làm thẳng.</td><td><a href=\"#l-3-3\">3.3</a></td></tr>\n<tr><td>Viết thêm đoạn mô tả dài khi Claude hiểu sai phép biến đổi mong muốn</td><td>2–3 ví dụ input/output cụ thể, hoặc test viết trước, truyền đạt rõ hơn văn xuôi.</td><td><a href=\"#l-3-5\">3.5</a></td></tr>\n<tr><td>Nhét quy trình dùng thỉnh thoảng vào CLAUDE.md</td><td>CLAUDE.md luôn được nạp. Quy trình theo nhu cầu nên làm thành skill để gọi khi cần.</td><td><a href=\"#l-3-2\">3.2</a></td></tr>\n</tbody>\n</table>\n<h4>S3: Hệ nghiên cứu nhiều agent</h4>\n<table>\n<thead><tr><th>Bẫy</th><th>Vì sao sai</th><th>Ôn</th></tr></thead>\n<tbody>\n<tr><td>Cho rằng subagent tự biết những gì coordinator đã thấy</td><td>Subagent bắt đầu với context riêng (docs hiện tại có ngoại lệ là fork, xem <a href=\"#g-5\">bài G5</a>). Kết quả của bước trước phải được đưa thẳng vào prompt giao việc.</td><td><a href=\"#l-1-2\">1.2</a>, <a href=\"#l-1-6\">1.6</a></td></tr>\n<tr><td>Đổ lỗi cho subagent khi báo cáo thiếu mảng, trong khi coordinator chia việc quá hẹp</td><td>Đọc log của coordinator trước. Nếu bước phân rã đã thiếu, sửa ở đó.</td><td><a href=\"#l-1-2\">1.2</a>, <a href=\"#l-1-5\">1.5</a></td></tr>\n<tr><td>Subagent lỗi thì trả về rỗng như thành công, hoặc dừng cả pipeline</td><td>Cả hai đều là anti-pattern. Nên báo lỗi có cấu trúc: loại lỗi, đã thử gì, kết quả một phần, hướng thay thế. Coordinator quyết định tiếp.</td><td><a href=\"#l-5-3\">5.3</a>, <a href=\"#l-2-3\">2.3</a></td></tr>\n<tr><td>Cấp mọi tool cho mọi subagent \"cho linh hoạt\"</td><td>Nhiều tool làm việc chọn tool kém tin cậy hơn, và agent dễ làm việc ngoài vai trò. Chỉ cấp tool đúng vai trò, thêm tool hẹp nếu cần.</td><td><a href=\"#l-2-2\">2.2</a></td></tr>\n<tr><td>Gặp hai nguồn uy tín cho số liệu khác nhau thì chọn một, hoặc tóm tắt làm mất nguồn</td><td>Giữ cả hai giá trị kèm nguồn và ngày, ghi chú mâu thuẫn. Giữ ánh xạ nhận định ↔ nguồn qua mọi bước.</td><td><a href=\"#l-5-5\">5.5</a>, <a href=\"#l-5-3\">5.3</a></td></tr>\n</tbody>\n</table>\n<h4>S4: Công cụ năng suất cho developer</h4>\n<table>\n<thead><tr><th>Bẫy</th><th>Vì sao sai</th><th>Ôn</th></tr></thead>\n<tbody>\n<tr><td>Đọc hết các file ngay từ đầu để \"hiểu toàn bộ\" codebase</td><td>Làm đầy context bằng thứ không cần. Nên tìm điểm vào bằng tìm kiếm nội dung, rồi đọc lần theo import.</td><td><a href=\"#l-5-4\">5.4</a></td></tr>\n<tr><td>Nhầm Grep và Glob</td><td>Grep tìm <em>nội dung</em> trong file (tên hàm, thông báo lỗi). Glob tìm <em>đường dẫn</em> theo mẫu tên.</td><td><a href=\"#l-2-2\">2.2</a></td></tr>\n<tr><td>Tự viết MCP server cho tích hợp phổ biến, hoặc ghi token thẳng vào <code>.mcp.json</code></td><td>Tích hợp chuẩn nên dùng server có sẵn. Bí mật nên dùng biến môi trường trong <code>.mcp.json</code> (dạng <code>${TOKEN}</code>), không commit giá trị thật.</td><td><a href=\"#l-2-4\">2.4</a>, <a href=\"#l-2-5\">2.5</a></td></tr>\n<tr><td>Agent cứ dùng built-in tool thay cho MCP tool mạnh hơn, và phương án đề xuất thêm luật cấm trong prompt</td><td>Gốc rễ thường là mô tả MCP tool quá sơ sài. Viết rõ tool làm được gì, trả về gì.</td><td><a href=\"#l-2-4\">2.4</a>, <a href=\"#l-2-1\">2.1</a></td></tr>\n<tr><td>Resume phiên cũ khi code đã đổi nhiều</td><td>Kết quả tool cũ đã lỗi thời. Hoặc báo cho phiên biết file nào đã đổi, hoặc mở phiên mới kèm bản tóm tắt.</td><td><a href=\"#l-1-4\">1.4</a></td></tr>\n</tbody>\n</table>\n<h4>S5: Claude Code trong CI</h4>\n<table>\n<thead><tr><th>Bẫy</th><th>Vì sao sai</th><th>Ôn</th></tr></thead>\n<tbody>\n<tr><td>Chạy <code>claude</code> trong pipeline mà không có <code>-p</code>, hoặc tìm cách \"giả lập bàn phím\"</td><td><code>-p</code> (<code>--print</code>) là chế độ không tương tác được tài liệu hóa. Muốn output máy đọc được thì thêm <code>--output-format json</code> với <code>--json-schema</code>.</td><td><a href=\"#l-3-4\">3.4</a></td></tr>\n<tr><td>Giảm báo nhầm bằng \"be conservative\" hoặc \"chỉ báo khi chắc chắn\"</td><td>Cần tiêu chí cụ thể theo loại lỗi. Có thể tạm tắt hạng mục hay báo nhầm trong lúc sửa prompt.</td><td><a href=\"#l-4-1\">4.1</a>, <a href=\"#l-4-6\">4.6</a></td></tr>\n<tr><td>Dùng Message Batches API cho kiểm tra chặn merge</td><td>Batch không có cam kết độ trễ, chỉ hợp với việc chờ được (chạy đêm, chạy hằng tuần).</td><td><a href=\"#l-4-4\">4.4</a></td></tr>\n<tr><td>Để chính phiên đã sinh code tự review</td><td>Phiên đó mang theo lập luận của chính nó. Review bằng một instance độc lập.</td><td><a href=\"#l-4-4\">4.4</a>, <a href=\"#l-4-6\">4.6</a></td></tr>\n<tr><td>Chạy lại review sau commit mới và đăng lại toàn bộ góp ý</td><td>Đưa các finding cũ vào context, chỉ báo lỗi mới hoặc lỗi chưa sửa.</td><td><a href=\"#l-4-6\">4.6</a></td></tr>\n</tbody>\n</table>\n<h4>S6: Trích xuất dữ liệu có cấu trúc</h4>\n<table>\n<thead><tr><th>Bẫy</th><th>Vì sao sai</th><th>Ôn</th></tr></thead>\n<tbody>\n<tr><td>Để trường \"bắt buộc\" cho thông tin tài liệu có thể không có</td><td>Model dễ bịa giá trị cho đủ schema. Trường đó nên cho phép null.</td><td><a href=\"#l-4-3\">4.3</a>, <a href=\"#l-4-5\">4.5</a></td></tr>\n<tr><td>Tin rằng schema chặt thì dữ liệu chắc đúng</td><td>Schema chỉ chặn lỗi cú pháp. Lỗi nghĩa (tổng không khớp, giá trị sai trường) cần validate thêm, ví dụ so tổng tự tính với tổng ghi trên tài liệu.</td><td><a href=\"#l-4-3\">4.3</a></td></tr>\n<tr><td>Retry khi thông tin không có trong tài liệu</td><td>Retry kèm lỗi validate có tác dụng với lỗi định dạng hay cấu trúc. Thiếu dữ liệu nguồn thì retry vô ích.</td><td><a href=\"#l-4-3\">4.3</a></td></tr>\n<tr><td>Thấy độ chính xác tổng 9x% là bỏ bớt người duyệt</td><td>Con số tổng có thể che một loại tài liệu hoặc một trường rất kém. Đo theo từng loại và từng trường, lấy mẫu phân tầng.</td><td><a href=\"#l-5-2\">5.2</a></td></tr>\n<tr><td>Batch lỗi thì gửi lại cả lô</td><td>Dùng <code>custom_id</code> để gửi lại đúng những request lỗi, có điều chỉnh (ví dụ chia nhỏ tài liệu quá dài).</td><td><a href=\"#l-4-4\">4.4</a></td></tr>\n</tbody>\n</table>\n<div class=\"warn\">Bẫy chung cho mọi kịch bản: phương án viết rất dài, nhiều thuật ngữ, đề xuất kiến trúc mới. Độ dài không phải dấu hiệu đúng. Hỏi lại: nó có sửa đúng triệu chứng trong thân câu không?</div>",
    "keypoints": [
     "S1: quy tắc tiền bạc phải nằm trong code; escalate theo tiêu chí, không theo cảm xúc hay tự tin; giữ case facts ngoài phần tóm tắt.",
     "S2: quy ước team ở cấp project; quy ước theo loại file dùng .claude/rules với paths; plan mode chỉ cho việc lớn.",
     "S3: subagent không thừa hưởng context; lỗi báo có cấu trúc kèm kết quả một phần; giữ nguồn và giữ cả số liệu mâu thuẫn.",
     "S4/S5: tìm rồi mới đọc; không commit bí mật; CI dùng -p; batch không dùng cho kiểm tra chặn merge; review bằng instance độc lập.",
     "S6: trường có thể thiếu thì nullable; schema không bảo đảm đúng nghĩa; retry vô ích khi nguồn không có dữ liệu."
    ],
    "sources": [
     {
      "t": "Claude Certified Architect – Foundations: trang chứng chỉ (Exam Guide PDF, mục 6: task statement)",
      "u": "https://anthropic-partners.skilljar.com/claude-certified-architect-foundations-certification"
     },
     {
      "t": "Run Claude Code programmatically (-p, --output-format json, --json-schema)",
      "u": "https://code.claude.com/docs/en/headless"
     }
    ]
   },
   {
    "id": "g-5",
    "title": "Exam guide và docs hiện tại khác nhau ở đâu",
    "minutes": 13,
    "html": "<p>Exam guide CCAR-F bản 1.0 có hiệu lực từ tháng 7/2026. Claude Code, Agent SDK, Claude API và MCP thay đổi nhanh hơn thế. Bảng dưới đây liệt kê những chỗ docs chính thức hiện tại (đọc tháng 11/2026) khác với cách exam guide hoặc tài liệu ôn cũ mô tả. Khi bài nói \"guide ghi\" thì đó là nội dung có trong exam guide. Khi bài nói \"tài liệu ôn cũ thường giả định\" thì đó là giả định phổ biến mà guide không nói thẳng.</p>\n<h4>Nguyên tắc chung</h4>\n<ul>\n<li><strong>Trong phòng thi:</strong> câu hỏi được viết theo task statement của guide. Hãy trả lời theo khái niệm mà guide kiểm tra. Đừng loại một phương án chỉ vì nó dùng tên cũ.</li>\n<li><strong>Ngoài phòng thi:</strong> khi viết code hoặc cấu hình thật, làm theo docs hiện tại.</li>\n<li>Nếu thấy một câu hỏi có nhiều hơn một đáp án bảo vệ được vì sản phẩm đã đổi, trang Policies cho phép báo lỗi câu hỏi với Pearson (xem <a href=\"#g-7\">bài G7</a>).</li>\n</ul>\n<h4>Bảng khác biệt</h4>\n<table>\n<thead><tr><th>Chủ đề</th><th>Guide / tài liệu ôn cũ</th><th>Docs hiện ghi (tháng 11/2026)</th><th>Trả lời thế nào</th></tr></thead>\n<tbody>\n<tr><td>Tên tool tạo subagent</td><td>Guide gọi là <strong>Task tool</strong> và ghi <code>allowedTools</code> của coordinator phải có <code>\"Task\"</code>.</td><td>Từ Claude Code v2.1.63, tool được đổi tên thành <code>Agent</code>. Trong khối <code>tool_use</code> tên là <code>\"Agent\"</code>, nhưng trong danh sách tool của message <code>system:init</code> vẫn là <code>\"Task\"</code>. Tham chiếu <code>Task(...)</code> cũ trong settings và định nghĩa agent vẫn chạy như alias. Code phát hiện subagent nên khớp cả hai tên. <a href=\"https://code.claude.com/docs/en/agent-sdk/subagents\">Agent SDK: Subagents</a>, <a href=\"https://code.claude.com/docs/en/sub-agents\">Claude Code: Subagents</a></td><td>Coi \"Task tool\" và \"Agent tool\" là một. Câu hỏi kiểm tra ý: coordinator phải được cấp tool này mới tạo được subagent.</td></tr>\n<tr><td>Subagent lồng nhau</td><td>Tài liệu ôn cũ thường giả định subagent không tự tạo subagent con.</td><td>Mặc định một subagent được tạo subagent của riêng nó, tối đa 3 tầng dưới hội thoại chính. Biến <code>CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH</code> đổi giới hạn, đặt <code>1</code> thì tắt lồng nhau. <a href=\"https://code.claude.com/docs/en/sub-agents\">Claude Code: Subagents</a></td><td>Guide vẫn kiểm tra mô hình hub-and-spoke: mọi giao tiếp đi qua coordinator để dễ quan sát và xử lý lỗi thống nhất. Nếu câu hỏi nói về khả năng quan sát hay kiểm soát luồng thông tin, chọn phương án đi qua coordinator.</td></tr>\n<tr><td>Subagent có thừa hưởng context của cha không</td><td>Guide (task statement 1.2, 1.3) ghi subagent không tự động thừa hưởng lịch sử hội thoại hay context của coordinator, nên phải đưa đủ thông tin vào prompt.</td><td>Subagent thường vẫn bắt đầu với context mới, chỉ nhận chuỗi prompt của tool Agent. Ngoại lệ là <em>fork</em>: một subagent sao chép toàn bộ hội thoại đến thời điểm đó. Fork mode bật mặc định từ v2.1.302 (phiên terminal tương tác từ v2.1.232), khi đó Claude có thể tự mở fork. Tắt bằng <code>CLAUDE_CODE_FORK_SUBAGENT=0</code>, hoặc trong Agent SDK bằng deny rule <code>Agent(fork)</code>. <a href=\"https://code.claude.com/docs/en/sub-agents\">Claude Code: Subagents</a>, <a href=\"https://code.claude.com/docs/en/agent-sdk/subagents\">Agent SDK: Subagents</a></td><td>Trả lời theo guide: muốn subagent biết kết quả của bước trước thì đưa thẳng vào prompt giao việc. Đừng nhầm fork subagent với <code>fork_session</code> mà guide nhắc ở task statement 1.7 (tách nhánh một session).</td></tr>\n<tr><td>Ép gọi tool bằng <code>tool_choice</code></td><td>Guide dạy dùng <code>\"any\"</code> hoặc ép một tool cụ thể để bảo đảm có output có cấu trúc.</td><td><code>any</code> và <code>tool</code> trả lỗi 400 trên Claude Fable 5.2, Mythos 5.2, Opus 5.5, Sonnet 5.5, Fable 5.1, Mythos 5.1. Khi bật extended thinking thủ công (<code>thinking: {type: \"enabled\"}</code>), <code>any</code> và <code>tool</code> cũng lỗi. Docs khuyên dùng <code>auto</code> kèm strict tool use, hoặc structured outputs. <a href=\"https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools\">Define tools</a>, <a href=\"https://platform.claude.com/docs/en/api/errors\">API errors</a></td><td>Trong đề, phân biệt <code>auto</code> / <code>any</code> / ép tool đúng như guide. Ngoài đời, kiểm tra model trước khi dùng forced tool use.</td></tr>\n<tr><td>Prefill câu trả lời của assistant</td><td>Tài liệu ôn cũ thường dạy prefill (ví dụ mở sẵn <code>{</code>) để ép JSON.</td><td>Claude 4.6 trở về sau và Claude Mythos Preview không hỗ trợ prefill. Request kết thúc bằng message assistant được điền sẵn sẽ nhận lỗi 400 <code>invalid_request_error</code>. Thay bằng structured outputs hoặc lời dặn trong system prompt. <a href=\"https://platform.claude.com/docs/en/api/errors\">API errors</a></td><td>Guide không dựa vào prefill. Câu hỏi về JSON tin cậy thì chọn schema (tool use / structured outputs).</td></tr>\n<tr><td>Grep và Glob</td><td>Kịch bản S4 và task statement 2.5 coi Read, Write, Edit, Bash, Grep, Glob là built-in tool.</td><td>Trên macOS, Linux và WSL, Claude Code bỏ Glob và Grep khỏi bộ tool mặc định. Claude tìm bằng <code>find</code> và <code>grep</code> qua Bash. Hai tool này quay lại nếu bạn ghi tên chúng trong <code>--tools</code> / <code>--allowedTools</code> (hoặc option tương đương của Agent SDK), hoặc khi một subagent liệt kê chúng mà không có Bash. Trên Windows chúng vẫn mặc định có. <a href=\"https://code.claude.com/docs/en/tools-reference\">Tools reference</a></td><td>Đề vẫn hỏi: tìm nội dung dùng Grep, tìm theo tên file dùng Glob. Trả lời theo phân biệt đó.</td></tr>\n<tr><td>Custom slash command</td><td>Guide tách riêng <code>.claude/commands/</code> (command) và <code>.claude/skills/</code> (skill).</td><td>Custom command đã được gộp vào skill. <code>.claude/commands/deploy.md</code> và <code>.claude/skills/deploy/SKILL.md</code> đều tạo <code>/deploy</code>. File command cũ vẫn chạy. Nếu trùng tên, skill được ưu tiên. <a href=\"https://code.claude.com/docs/en/skills\">Skills</a></td><td>Điều đề kiểm tra là phạm vi: thư mục trong project (commit lên git, cả team dùng) hay trong <code>~/.claude/</code> (cá nhân).</td></tr>\n<tr><td><code>allowed-tools</code> trong frontmatter skill</td><td>Guide mô tả <code>allowed-tools</code> là cách giới hạn tool khi skill chạy.</td><td>Docs ghi <code>allowed-tools</code> <em>cấp quyền trước</em> cho các tool liệt kê trong lượt gọi skill, để khỏi hỏi lại. Nó không giới hạn tool nào được gọi. Muốn bỏ tool khỏi tầm dùng khi skill chạy thì dùng <code>disallowed-tools</code>, hoặc deny rule trong settings. <a href=\"https://code.claude.com/docs/en/skills\">Skills</a></td><td>Đề viết theo guide, nên nếu câu hỏi coi <code>allowed-tools</code> là cách giới hạn tool cho skill thì hiểu theo nghĩa đó. Khi cấu hình thật, nhớ khác biệt này.</td></tr>\n<tr><td>Lỗi kiểm tra input của MCP tool</td><td>Tài liệu ôn dựa trên spec cũ hơn thường coi tham số sai là protocol error (lỗi JSON-RPC).</td><td>Từ spec 2025-11-25, lỗi kiểm tra input được trả như tool execution error trong kết quả (<code>isError: true</code>) để model tự sửa. Spec hiện tại 2026-07-28 vẫn giữ cách này. <a href=\"https://modelcontextprotocol.io/specification/2025-11-25/changelog\">MCP changelog 2025-11-25</a>, <a href=\"https://modelcontextprotocol.io/specification/2026-07-28/server/tools\">MCP Tools (2026-07-28)</a></td><td>Khớp với guide (mẫu cờ <code>isError</code>). Chọn phương án trả lỗi có cấu trúc trong kết quả tool.</td></tr>\n<tr><td>Chế độ quyền khi khởi động Claude Code</td><td>Tài liệu ôn cũ thường giả định Claude Code luôn hỏi trước từng thao tác.</td><td>Từ v2.1.283, phiên tương tác trong terminal và VS Code mặc định khởi động ở auto mode (một classifier quyết định phần lớn yêu cầu cấp quyền), nếu phiên đủ điều kiện dùng auto mode. <code>claude -p</code> và Agent SDK không đặt chế độ thì khởi động ở <code>default</code> (tên hiển thị là Manual; docs ghi rõ từ v2.1.302). Ở chế độ này, lời gọi cần duyệt bị từ chối nếu không có allow rule, hook hay cơ chế duyệt khác. <a href=\"https://code.claude.com/docs/en/permission-modes\">Permission modes</a></td><td>Guide không kiểm tra chế độ quyền. Khi dựng CI thật, nhớ rằng <code>-p</code> không tự vào auto mode. Lời khuyên của site: khai báo tường minh tool và quyền mà job cần.</td></tr>\n<tr><td>\"Dùng subagent để bảo vệ context window\"</td><td>Guide (task statement 3.4, 5.4) coi việc tách khám phá dài dòng sang subagent (như Explore) là cách tránh cạn context.</td><td>Trang best practices của Claude Code xếp \"Use subagents to protect your context window\" vào mục lời khuyên cũ có thể bỏ: phần lớn model hiện tại có cửa sổ 1M token và tự compact, nên hiếm khi cạn context. Subagent vẫn tốt cho việc song song, cho việc tách output ồn ào, và cho review độc lập, nhưng tốn thêm token. <a href=\"https://code.claude.com/docs/en/best-practices\">Best practices</a></td><td>Trong đề, phương án \"giao phần khám phá dài cho subagent, nhận lại bản tóm tắt\" vẫn đúng theo guide. Khi làm thật, cân nhắc chi phí token.</td></tr>\n<tr><td>Các giá trị <code>stop_reason</code></td><td>Guide chỉ nêu hai giá trị <code>\"tool_use\"</code> (chạy tiếp) và <code>\"end_turn\"</code> (dừng). Phụ lục có nhắc <code>max_tokens</code>, nhưng như một khái niệm API riêng, không liệt kê là giá trị <code>stop_reason</code>.</td><td>Docs liệt kê thêm <code>stop_sequence</code>, <code>pause_turn</code>, <code>refusal</code>, <code>model_context_window_exceeded</code>. Khi <code>refusal</code>, trường <code>stop_details</code> cho biết nhóm chính sách đã kích hoạt (với các stop reason khác thì là <code>null</code>). Docs gợi ý thử lại trên model dự phòng. <a href=\"https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons\">Handling stop reasons</a></td><td>Đề hỏi logic vòng lặp: tiếp tục khi <code>tool_use</code>, kết thúc khi <code>end_turn</code>, không dựa vào việc đọc chữ trong câu trả lời. Code thật cần xử lý đủ các giá trị.</td></tr>\n</tbody>\n</table>\n<div class=\"warn\">Đừng mang tên model hay số phiên bản Claude Code vào câu trả lời nếu đề không hỏi. Guide đưa \"so sánh benchmark, so sánh model\" vào danh sách ngoài phạm vi. Những khác biệt ở trên giúp bạn khỏi bối rối khi đọc docs mới, chứ không phải để \"bắt lỗi\" đề.</div>",
    "keypoints": [
     "Task tool = Agent tool (đổi tên ở v2.1.63; tool_use ghi \"Agent\", system:init vẫn ghi \"Task\").",
     "Subagent lồng được tối đa 3 tầng theo mặc định; fork subagent thừa hưởng cả hội thoại (subagent thường thì không); tool_choice any/tool lỗi 400 trên một số model mới và khi bật extended thinking thủ công; prefill lỗi 400 từ Claude 4.6.",
     "Glob/Grep vắng mặc định trên macOS/Linux/WSL; command đã gộp vào skill; allowed-tools cấp quyền trước chứ không giới hạn tool.",
     "MCP: lỗi kiểm tra input là tool execution error (isError) từ spec 2025-11-25; Claude Code tương tác mặc định auto mode từ v2.1.283, -p/SDK vẫn default.",
     "Trong phòng thi trả lời theo khái niệm guide kiểm tra; ngoài đời làm theo docs hiện tại."
    ],
    "sources": [
     {
      "t": "Agent SDK: Subagents (Agent vs Task, giới hạn depth, fork)",
      "u": "https://code.claude.com/docs/en/agent-sdk/subagents"
     },
     {
      "t": "Claude Code: Subagents (đổi tên Task → Agent, subagent lồng nhau, fork)",
      "u": "https://code.claude.com/docs/en/sub-agents"
     },
     {
      "t": "Define tools (forcing tool use)",
      "u": "https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools"
     },
     {
      "t": "Claude API errors (prefill not supported, forced tool use not supported)",
      "u": "https://platform.claude.com/docs/en/api/errors"
     },
     {
      "t": "Claude Code tools reference (Glob/Grep)",
      "u": "https://code.claude.com/docs/en/tools-reference"
     },
     {
      "t": "Claude Code skills (custom commands merged, allowed-tools)",
      "u": "https://code.claude.com/docs/en/skills"
     },
     {
      "t": "MCP specification 2025-11-25 changelog",
      "u": "https://modelcontextprotocol.io/specification/2025-11-25/changelog"
     },
     {
      "t": "MCP specification 2026-07-28: Tools",
      "u": "https://modelcontextprotocol.io/specification/2026-07-28/server/tools"
     },
     {
      "t": "Claude Code permission modes",
      "u": "https://code.claude.com/docs/en/permission-modes"
     },
     {
      "t": "Claude Code best practices (What you can stop doing)",
      "u": "https://code.claude.com/docs/en/best-practices"
     },
     {
      "t": "Handling stop reasons",
      "u": "https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons"
     },
     {
      "t": "Claude Certified Architect – Foundations: trang chứng chỉ (Exam Guide PDF)",
      "u": "https://anthropic-partners.skilljar.com/claude-certified-architect-foundations-certification"
     }
    ]
   },
   {
    "id": "g-6",
    "title": "Kế hoạch ôn và cách dùng site này",
    "minutes": 10,
    "html": "<p>Guide mô tả ứng viên lý tưởng là người đã có khoảng 6 tháng trở lên làm thực tế với Claude API, Agent SDK, Claude Code và MCP. Phần còn lại của bài là gợi ý của site: nếu bạn đã có nền đó, khoảng 2 tuần là đủ để hệ thống lại; nếu còn mới, hãy dành 4 tuần và tự tay làm các bài thực hành.</p>\n<h4>Vòng học trên site</h4>\n<ol>\n<li><strong>Bài học:</strong> đọc theo domain, bắt đầu từ bài nền tảng (<code>N.0</code>) của mỗi domain. Đánh dấu bài đã học. Tiến độ được lưu trong trình duyệt.</li>\n<li><strong>Quiz cuối domain:</strong> làm ngay sau khi đọc xong domain. Đọc phần giải thích cho cả câu đúng lẫn câu sai.</li>\n<li><strong>Luyện tập</strong> (nút Thi thử ở thanh trên cùng): lọc câu theo domain hoặc theo kịch bản. Đáp án hiện ngay sau mỗi câu và không tính giờ. Dùng để vá chỗ yếu.</li>\n<li><strong>Thi thử đầy đủ:</strong> đúng khuôn đề thật, 4 kịch bản × 15 câu, 120 phút, không xem đáp án cho tới khi nộp. Lưu ý: chia đều 15 câu mỗi kịch bản là cách site dựng đề, guide không công bố số câu cho từng kịch bản.</li>\n<li><strong>Sổ câu sai:</strong> mọi câu bạn trả lời sai (ở quiz, luyện tập hay thi thử) đều được ghi vào sổ, kèm số lần sai. Bạn có thể lọc và làm lại riêng những câu này. Câu sẽ rời sổ khi bạn trả lời đúng liên tiếp đủ số lần, hoặc khi bạn tự đánh dấu đã thuộc.</li>\n<li><strong>Đọc lại bài liên quan:</strong> với mỗi câu sai, mở lại bài học được dẫn tới và đọc phần ý chính. Sai cùng một kiểu từ hai lần trở lên thì đọc lại cả bài và đối chiếu bảng bẫy ở <a href=\"#g-4\">bài G4</a>.</li>\n</ol>\n<h4>Lịch 4 tuần (rút xuống 2 tuần nếu đã có kinh nghiệm)</h4>\n<table>\n<thead><tr><th>Tuần</th><th>Việc chính</th><th>Mốc kiểm tra</th></tr></thead>\n<tbody>\n<tr><td>1</td><td>Đọc <a href=\"#g-1\">G1</a>–<a href=\"#g-3\">G3</a>. Học <a href=\"#d1\">Domain 1</a> (nặng nhất, 27%) và <a href=\"#d2\">Domain 2</a>. Dựng một agent nhỏ có vòng lặp tool, hook chặn một quy tắc, lỗi tool có cấu trúc.</td><td>Quiz D1, D2 đạt trên 80%</td></tr>\n<tr><td>2</td><td>Học <a href=\"#d3\">Domain 3</a>. Cấu hình Claude Code cho một repo thật: CLAUDE.md cấp project, một rule có <code>paths</code>, một skill, một MCP server, thử chạy <code>-p</code>.</td><td>Quiz D3. Luyện tập theo kịch bản S2, S4, S5</td></tr>\n<tr><td>3</td><td>Học <a href=\"#d4\">Domain 4</a> và <a href=\"#d5\">Domain 5</a>. Làm một pipeline trích xuất nhỏ có schema nullable, vòng validate rồi retry, thử Message Batches API.</td><td>Quiz D4, D5. Luyện tập S1, S3, S6</td></tr>\n<tr><td>4</td><td>Đọc <a href=\"#g-4\">G4</a>, <a href=\"#g-5\">G5</a>. Làm 2–3 đề thi thử đầy đủ, cách nhau ít nhất một ngày. Sau mỗi đề, xử lý hết Sổ câu sai và đọc lại bảng cheat của từng domain.</td><td>Thi thử ổn định quanh mốc tham khảo trở lên ở cả 5 domain</td></tr>\n</tbody>\n</table>\n<div class=\"tip\">Kết quả thi thử chỉ có ý nghĩa với câu bạn chưa từng thấy. Khi bắt đầu thuộc đáp án, hãy dựa nhiều hơn vào phần luyện theo kịch bản và vào việc tự giải thích vì sao từng phương án sai.</div>\n<h4>Tài nguyên chính thức</h4>\n<ul>\n<li><strong>Exam guide</strong> (link trên <a href=\"https://anthropic-partners.skilljar.com/claude-certified-architect-foundations-certification\">trang chứng chỉ CCAR-F</a>): FAQ gọi đây là nguồn chính thức về phạm vi thi. Guide có danh sách task statement, 4 bài thực hành (agent nhiều tool có escalation, cấu hình Claude Code cho team, pipeline trích xuất, hệ nghiên cứu nhiều agent) và 12 câu hỏi mẫu. Hãy làm các bài thực hành: theo nhận định của site, chúng gần với các kịch bản S1, S2, S6 và S3.</li>\n<li><strong>Đề thi thử chính thức:</strong> FAQ ghi đề thi thử trên nền tảng cũ đã bị gỡ khi chuyển sang Pearson, và chỉ dẫn tới các câu mẫu trong guide để xem định dạng và văn phong của đề.</li>\n<li><strong>Khóa ôn trên Anthropic Partner Academy</strong> (<a href=\"https://anthropic-partners.skilljar.com/page/claude-certified-architect-foundations-prep-courses\">trang khóa ôn CCAR-F</a>, ghi là miễn phí): AI Fluency: Framework &amp; Foundations, Building with the Claude API, Claude on Google Cloud, <a href=\"https://anthropic-partners.skilljar.com/claude-code-in-action\">Claude Code in Action</a>, Claude 101, Claude with Amazon Bedrock, <a href=\"https://anthropic-partners.skilljar.com/introduction-to-model-context-protocol\">Introduction to Model Context Protocol</a> (danh sách tháng 11/2026).</li>\n<li><strong>Claude Academy</strong> (<a href=\"https://academy.claude.com/\">academy.claude.com</a>, công khai, trang chủ ghi là khóa học miễn phí): có các khóa liên quan như <a href=\"https://academy.claude.com/courses/claude-code-in-action\">Claude Code in action</a>, <a href=\"https://academy.claude.com/courses/building-with-the-claude-api\">Building with the Claude API</a>, <a href=\"https://academy.claude.com/courses/introduction-to-model-context-protocol\">Introduction to Model Context Protocol</a>, <a href=\"https://academy.claude.com/courses/introduction-to-agent-skills\">Introduction to agent skills</a>, <a href=\"https://academy.claude.com/courses/introduction-to-subagents\">Introduction to subagents</a>. Đây là chứng nhận hoàn thành khóa học, không phải chứng chỉ.</li>\n<li><strong>Docs chính thức:</strong> platform.claude.com/docs (API), code.claude.com/docs (Claude Code, Agent SDK), modelcontextprotocol.io (MCP). Mỗi bài học trên site đều dẫn tới trang gốc.</li>\n</ul>\n<div class=\"warn\">Không học từ \"đề rò rỉ\". Exam Policy cấm tìm kiếm hay sử dụng nội dung đề bị công bố trái phép. Vi phạm có thể dẫn tới hủy kết quả và cấm thi.</div>",
    "keypoints": [
     "Vòng học: bài học → quiz domain → luyện tập theo domain/kịch bản → thi thử 4 × 15 câu, 120 phút → Sổ câu sai → đọc lại bài liên quan.",
     "Guide nhắm tới người có khoảng 6 tháng trở lên làm thực tế; ôn 2 tuần nếu đã có nền, 4 tuần nếu còn mới.",
     "Đề thi thử chính thức đã bị gỡ khi chuyển sang Pearson; FAQ chỉ dẫn tới câu mẫu trong guide, guide còn có 4 bài thực hành.",
     "Khóa ôn miễn phí: trang khóa ôn CCAR-F trên Partner Academy; Claude Academy (academy.claude.com) công khai.",
     "Không dùng đề rò rỉ: Exam Policy cấm, có thể bị hủy kết quả."
    ],
    "sources": [
     {
      "t": "Claude Certified Architect – Foundations: trang chứng chỉ (Exam Guide PDF mục 2, 7, 8, 9; Exam Policy PDF)",
      "u": "https://anthropic-partners.skilljar.com/claude-certified-architect-foundations-certification"
     },
     {
      "t": "Claude Certified Architect – Foundations Prep Courses",
      "u": "https://anthropic-partners.skilljar.com/page/claude-certified-architect-foundations-prep-courses"
     },
     {
      "t": "Certification FAQ (practice exam, how to prepare)",
      "u": "https://anthropic-partners.skilljar.com/page/faq-certifications"
     },
     {
      "t": "Claude Academy",
      "u": "https://academy.claude.com/"
     },
     {
      "t": "Who can take a Claude certification exam (certificate of completion vs certification)",
      "u": "https://anthropic-partners.skilljar.com/page/certification-eligibility"
     }
    ]
   },
   {
    "id": "g-7",
    "title": "Đăng ký, đặt lịch và ngày thi",
    "minutes": 11,
    "html": "<p>Mọi thông tin dưới đây lấy từ trang chứng chỉ, FAQ, Policies và trang \"Who can take an exam\" trên Anthropic Partner Academy, cùng exam guide và Exam Policy (PDF) được link từ trang chứng chỉ. Đọc vào tháng 11/2026. Chính sách có thể đổi, nên hãy kiểm tra lại trước khi đăng ký.</p>\n<h4>Ai được thi</h4>\n<ul>\n<li>Chỉ người làm việc tại tổ chức thuộc <strong>Claude Partner Network</strong>. Phải đăng nhập bằng email công ty, trên domain có trong hồ sơ đối tác của tổ chức. Email cá nhân không dùng được.</li>\n<li>Từ <strong>18 tuổi</strong> trở lên. Tuổi được kiểm tra lúc check-in theo giấy tờ tùy thân.</li>\n<li>Nếu đăng nhập báo email không được nhận, nguyên nhân thường là domain chưa có trong hồ sơ đối tác. Gửi email cho partner-support@anthropic.com. Trang ghi việc thêm domain mất 7–10 ngày.</li>\n<li>Tổ chức không thuộc mạng lưới đối tác thì không đăng ký được. Claude Academy công khai, nhưng chỉ cấp chứng nhận hoàn thành khóa học, không phải chứng chỉ.</li>\n</ul>\n<h4>Lệ phí (docs hiện ghi, tháng 11/2026)</h4>\n<ul>\n<li>CCAR-F: <strong>125 USD</strong>, trước chiết khấu theo hạng đối tác. FAQ ghi giá tăng từ 99 lên 125 USD kể từ 30/6/2026.</li>\n<li>Đối tác hạng Registered trả đủ giá. Hạng Select, Preferred và Global Premier được giảm 50%, tự áp dụng khi thanh toán. Đến hết 31/12/2026, Global Premier được giảm 100%.</li>\n<li>Thanh toán bằng thẻ tín dụng trên Partner Academy trước khi được chuyển sang Pearson để đặt lịch. Mỗi lần thi lại tính phí đủ, chiết khấu hạng đối tác vẫn áp dụng.</li>\n</ul>\n<h4>Quy trình đăng ký</h4>\n<ol>\n<li>Mở trang chứng chỉ CCAR-F trên Partner Academy. Tải exam guide, đọc Certification Terms and Conditions và Exam Policy.</li>\n<li>Bấm đăng ký, đăng nhập bằng email công ty, rồi thanh toán. Giá hiển thị đã gồm chiết khấu theo hạng.</li>\n<li>Pearson VUE gửi email tài khoản. Đăng nhập Pearson, chấp nhận Candidate Agreement, rồi chọn lịch thi online (OnVUE) hoặc tại trung tâm Pearson.</li>\n<li>FAQ ghi lượt đăng ký có hiệu lực 5 năm, còn trang Policies ghi không có hạn chót để thi. Hai trang diễn đạt khác nhau; để an toàn, hãy coi mốc 5 năm là giới hạn. Trong khoảng đó, bạn đặt lịch khi đã sẵn sàng.</li>\n</ol>\n<h4>Đổi lịch, hủy, vắng mặt</h4>\n<ul>\n<li>FAQ và trang Policies hiện ghi: đổi lịch hoặc hủy phải làm <strong>trước ít nhất 48 giờ</strong>. Đổi hoặc hủy trong vòng 48 giờ, hoặc vắng mặt, thì mất lệ phí. Trang Policies ghi thêm: đổi lịch hay hủy trong khung hợp lệ là miễn phí, và hủy thì được hoàn tiền đủ.</li>\n<li>Exam guide bản 1.0 lại ghi mốc 24 giờ. Các nguồn chính thức đang lệch nhau; lời khuyên của site là theo mốc 48 giờ cho an toàn.</li>\n<li>Hủy lịch trên Pearson không tự hoàn tiền. Muốn hoàn tiền thì gửi email cho certifications-support@anthropic.com.</li>\n<li>Đổi lịch xong phải nhận được email xác nhận. Nếu không có, đăng nhập Pearson kiểm tra lại.</li>\n</ul>\n<h4>Thi online hay tại trung tâm</h4>\n<table>\n<thead><tr><th></th><th>Online (OnVUE)</th><th>Trung tâm Pearson</th></tr></thead>\n<tbody>\n<tr><td>Chuẩn bị máy</td><td>Chạy system test của Pearson trên đúng máy và mạng sẽ dùng. Mạng phải truy cập được các domain Pearson yêu cầu. Tắt các ứng dụng chặn bài thi (trang setup liệt kê nhiều app điều khiển từ xa, họp trực tuyến, kể cả ứng dụng Claude desktop trên Windows). Với máy hoặc mạng công ty, trang setup khuyên nhờ IT mở domain và tắt ứng dụng từ sớm; nếu vẫn không được thì dùng máy cá nhân trên mạng cá nhân, hoặc thi tại trung tâm.</td><td>Thiết bị do trung tâm cung cấp.</td></tr>\n<tr><td>Môi trường</td><td>Phòng riêng, mạng ổn định, luôn ở trong khung hình webcam và tầm quan sát của giám thị.</td><td>Theo quy định của trung tâm.</td></tr>\n<tr><td>Hạn chế quốc gia</td><td>FAQ ghi người dùng giấy tờ tùy thân của một số quốc gia và vùng không được thi online và phải thi tại trung tâm. Riêng cư dân Iran: Pearson tạm ngừng tổ chức thi cả online lẫn tại trung tâm từ 8/9/2026.</td><td>Xem FAQ.</td></tr>\n</tbody>\n</table>\n<h4>Giấy tờ tùy thân</h4>\n<ul>\n<li>Giấy tờ tùy thân có ảnh do chính phủ cấp, còn hạn. Tên phải khớp <strong>chính xác</strong> với tên trong hồ sơ thi. Danh sách giấy tờ được chấp nhận nằm trên trang của Pearson.</li>\n<li>Tên tự sửa trong mục <em>Update Exam Profile</em> trên Partner Academy, nhập bằng chữ Latin, có dấu đúng như trên giấy tờ. Mỗi năm chỉ tự sửa được một lần, và tên bị khóa ngay khi bạn xác nhận hồ sơ. Thi tại trung tâm thì sửa trước ít nhất 24 giờ. Đã dùng hết lượt tự sửa thì gửi yêu cầu tới certifications-support@anthropic.com (exam guide chỉ nêu cách liên hệ email này, trước khi đặt lịch).</li>\n<li>Lệch tên lúc check-in thì không được thi và mất lệ phí.</li>\n</ul>\n<h4>Quy định trong phòng thi</h4>\n<ul>\n<li>Thi đóng tài liệu. Không ghi chú, không tài liệu, không công cụ dịch trên trình duyệt, không trợ lý AI. Exam Policy cấm dùng sản phẩm hay dịch vụ AI để hỗ trợ trong lúc thi.</li>\n<li>Guide liệt kê vật bị cấm: điện thoại, đồng hồ thông minh, tai nghe, tài liệu học, thiết bị ghi âm ghi hình, màn hình phụ. Giấy nháp (nếu có) do Pearson quy định.</li>\n<li>Không nói chuyện với ai, không chụp hay chép nội dung đề. Exam Policy cấm nghỉ giữa giờ ngoài lịch, trừ khi đã xin và được duyệt trước.</li>\n<li>Trước khi vào bài phải chấp nhận thỏa thuận bảo mật (NDA). Không chấp nhận thì phiên thi kết thúc và không hoàn tiền. Không được chia sẻ câu hỏi dưới mọi hình thức, kể cả trong nhóm học hay diễn đàn.</li>\n<li>Gian lận có thể dẫn tới hủy kết quả, thu hồi chứng chỉ, cấm thi về sau.</li>\n<li>Cần hỗ trợ đặc biệt (accommodation) thì phải xin qua Pearson và được duyệt <em>trước khi</em> đặt lịch. FAQ khuyên gửi yêu cầu sớm ít nhất 10 ngày.</li>\n</ul>\n<h4>Sau khi thi</h4>\n<ul>\n<li>Điểm hiện trên màn hình ngay khi làm xong. Đậu thì nhận email từ Credly để nhận badge.</li>\n<li><strong>Thi lại:</strong> phải chờ 14 ngày sau lần trượt thứ nhất, 30 ngày sau lần thứ hai, 90 ngày sau lần thứ ba. Tối đa 4 lần cho cùng một bài thi trong 12 tháng cuốn chiếu. Giới hạn tính riêng cho từng bài thi. Trang Policies ghi thời gian chờ và số lần thi được đặt lại khi bài thi lên phiên bản mới, và đã đậu thì không được thi lại để nâng điểm.</li>\n<li><strong>Hiệu lực:</strong> 12 tháng kể từ ngày đạt. Gia hạn miễn phí trước khi hết hạn bằng một bài đánh giá online không giám thị (trang Policies ghi là mở tài liệu, làm lại bao nhiêu lần cũng được), được thêm 12 tháng tính từ ngày hết hạn hiện tại. Để chứng chỉ hết hạn thì phải thi lại đầy đủ với giá đủ. FAQ ghi chi tiết gia hạn sẽ được công bố trước khi những chứng chỉ đầu tiên đến hạn. Guide và trang Policies cũng ghi: nếu đề thi được cập nhật lớn, người đang giữ chứng chỉ có thể phải thi bản hiện hành.</li>\n<li><strong>Phúc khảo:</strong> trong vòng 14 ngày (tính từ ngày được thông báo quyết định, hoặc từ ngày thi nếu khiếu nại kết quả), gửi qua Pearson. Trang Policies ghi phúc khảo bao gồm cả kết quả trượt mà bạn cho là do câu hỏi lỗi; nếu xác nhận câu hỏi lỗi và lỗi đó ảnh hưởng tới kết quả, bạn được thi lại miễn phí chứ không được sửa điểm. Exam guide thì ghi điểm chuẩn và nội dung từng câu hỏi không thuộc diện phúc khảo. Hai nguồn đang diễn đạt khác nhau.</li>\n<li><strong>Báo lỗi câu hỏi</strong> (sai, mơ hồ, có hơn một đáp án bảo vệ được, lệch exam guide) là việc riêng với phúc khảo: gửi cho Pearson, ai cũng báo được dù đậu hay trượt, và việc báo không ảnh hưởng kết quả.</li>\n</ul>\n<div class=\"tip\">Ba việc nên làm một tuần trước ngày thi: kiểm tra tên trong hồ sơ thi khớp giấy tờ, chạy system test của Pearson trên đúng máy và mạng sẽ dùng, xác nhận lịch thi vẫn còn trong tài khoản Pearson.</div>",
    "keypoints": [
     "Chỉ dành cho người thuộc Claude Partner Network, từ 18 tuổi, đăng ký bằng email công ty; 125 USD trước chiết khấu (docs hiện ghi, tháng 11/2026).",
     "Đăng ký và trả phí trên Partner Academy, đặt lịch trên Pearson VUE (OnVUE hoặc trung tâm); đổi hay hủy trước 48 giờ theo FAQ/Policies (guide v1.0 ghi 24 giờ, các nguồn đang lệch nhau).",
     "Giấy tờ tùy thân còn hạn, tên khớp chính xác; thi đóng tài liệu, cấm công cụ dịch và trợ lý AI; phải chấp nhận NDA.",
     "Thi lại: chờ 14/30/90 ngày, tối đa 4 lần trong 12 tháng cho mỗi bài; đậu rồi không thi lại để nâng điểm.",
     "Hiệu lực 12 tháng; gia hạn miễn phí bằng bài đánh giá online trước khi hết hạn; phúc khảo trong 14 ngày qua Pearson."
    ],
    "sources": [
     {
      "t": "Claude Certified Architect – Foundations: trang chứng chỉ (Exam Guide PDF mục 11–16, Exam Policy PDF)",
      "u": "https://anthropic-partners.skilljar.com/claude-certified-architect-foundations-certification"
     },
     {
      "t": "Certification FAQ",
      "u": "https://anthropic-partners.skilljar.com/page/faq-certifications"
     },
     {
      "t": "Certification policies",
      "u": "https://anthropic-partners.skilljar.com/page/policies-certifications"
     },
     {
      "t": "Who can take a Claude certification exam",
      "u": "https://anthropic-partners.skilljar.com/page/certification-eligibility"
     },
     {
      "t": "Earn your Claude certification (bảng giá)",
      "u": "https://anthropic-partners.skilljar.com/page/partner-certifications"
     },
     {
      "t": "Computer and network setup (OnVUE)",
      "u": "https://anthropic-partners.skilljar.com/page/computer-and-network-setup"
     }
    ]
   }
  ]
 }
};
