window.CERT_DATA = {
  code: "CCAR-F",
  title: "Claude Certified Architect – Foundations",
  storageKey: "ccarf-notes-v1",
  exam: { questions: 60, minutes: 120, passScaled: 720 },
  intro: `<p><strong>Claude Certified Architect – Foundations (CCAR-F)</strong> kiểm tra khả năng <em>thiết kế</em> hệ thống dùng Claude: agent chạy vòng lặp tool, hệ nhiều agent, tích hợp MCP, cấu hình Claude Code cho cả team và CI, prompt cho output có cấu trúc, và giữ hệ thống đáng tin khi context dài. Đề có <strong>60 câu trong 120 phút</strong>, điểm quy đổi thang 1000 và cần <strong>720</strong> để đậu.</p>
<p>Câu hỏi thật gần như đều theo <strong>tình huống</strong>: một agent chăm sóc khách hàng, một hệ nghiên cứu nhiều agent, Claude Code dùng trong team hoặc pipeline CI, một luồng trích xuất dữ liệu có cấu trúc, một công cụ tăng năng suất cho developer. Đề hiếm khi hỏi thuộc lòng. Thường bạn phải chọn cách <em>đúng nhất</em> giữa vài cách đều “chạy được”. Mẫu hay gặp:</p>
<ul>
<li>Quy tắc bắt buộc (tiền, bảo mật, thứ tự bước) thì cưỡng chế bằng code (hook, kiểm tra trong tool), không chỉ dặn trong prompt.</li>
<li>Agent chọn sai tool thì sửa mô tả tool trước. Đừng vội thêm tầng phức tạp.</li>
<li>Muốn JSON đúng schema thì dùng tool/JSON schema (structured outputs), không năn nỉ trong prompt.</li>
<li>Subagent không tự biết gì, mọi context phải nằm trong lời giao việc.</li>
<li>Cấu hình cả team cần thấy thì đặt ở file cấp project được commit, không đặt ở file cá nhân.</li>
</ul>
<h4>Cách dùng trang này</h4>
<ol>
<li>Đọc từng domain theo thứ tự. Trọng số (%) cho biết domain chiếm bao nhiêu phần đề. Domain 1 nặng nhất.</li>
<li>Mỗi bài học có phần <em>ý chính</em> để ôn nhanh và link tới tài liệu chính thức. Gặp chi tiết kỹ thuật (tên flag, đường dẫn file, giá trị <code>stop_reason</code>) thì nên mở docs đối chiếu, vì sản phẩm cập nhật thường xuyên.</li>
<li>Đánh dấu bài đã học. Tiến độ lưu trong trình duyệt của bạn.</li>
<li>Bảng <em>cheat</em> cuối mỗi domain dùng để ôn trước giờ thi.</li>
<li>Làm quiz của từng domain (câu hỏi tiếng Anh như đề thật, giải thích tiếng Việt), rồi làm bài thi thử tổng hợp.</li>
</ol>
<div class="tip">Khi hai đáp án đều đúng về kỹ thuật, chọn cách giải quyết <strong>gốc rễ</strong> với ít thay đổi nhất, và cách có tính <strong>xác định</strong> (deterministic) khi rủi ro cao.</div>`,
  domains: [
    {
      id: "d1",
      name: "Agentic Architecture & Orchestration",
      weight: 27,
      intro: `<p>Domain nặng nhất. Nó hỏi cách bạn dựng một agent chạy đúng: vòng lặp dựa trên <code>stop_reason</code>, mô hình coordinator–subagent, cách chia việc và truyền context cho subagent, khi nào dùng hook/code thay cho lời dặn trong prompt, cách resume hoặc fork session, và cách thiết kế escalation sang người.</p>
<p>Ranh giới: cách <em>viết</em> từng tool và cấu hình MCP thuộc Domain 2. Cách giữ context sạch và lan truyền lỗi khi hệ thống chạy lâu thuộc Domain 5. Domain 1 tập trung vào <em>kiến trúc điều phối</em>.</p>`,
      lessons: [
        {
          id: "l-1-1",
          title: "Vòng lặp agent và stop_reason",
          minutes: 12,
          html: `<p>Agent chăm sóc khách hàng, agent review code hay hệ nghiên cứu nhiều agent đều chạy chung một vòng lặp trên Messages API: gửi request, đọc response, nếu Claude muốn gọi tool thì chạy tool rồi gửi kết quả về, lặp lại đến khi xong. Đề thi ít hỏi cú pháp. Câu hỏi thường là: <em>code của bạn dựa vào tín hiệu nào để biết chạy tiếp hay dừng?</em></p>
<h4>Tín hiệu điều khiển: <code>stop_reason</code></h4>
<p>Mỗi response có trường <code>stop_reason</code> cho biết vì sao Claude ngừng sinh. Các giá trị docs liệt kê:</p>
<table>
<thead><tr><th>Giá trị</th><th>Ý nghĩa</th><th>Code nên làm gì</th></tr></thead>
<tbody>
<tr><td><code>tool_use</code></td><td>Claude đang yêu cầu gọi tool</td><td>Chạy tool, gửi <code>tool_result</code>, lặp tiếp</td></tr>
<tr><td><code>end_turn</code></td><td>Claude trả lời xong một cách tự nhiên</td><td>Kết thúc vòng lặp, trả kết quả</td></tr>
<tr><td><code>max_tokens</code></td><td>Chạm giới hạn <code>max_tokens</code> bạn đặt</td><td>Tăng giới hạn hoặc cho viết tiếp. Nếu bị cắt giữa một khối tool_use thì gửi lại với <code>max_tokens</code> cao hơn</td></tr>
<tr><td><code>stop_sequence</code></td><td>Gặp một chuỗi trong <code>stop_sequences</code></td><td>Đọc trường <code>stop_sequence</code> xem chuỗi nào</td></tr>
<tr><td><code>pause_turn</code></td><td>Vòng lặp server tool chạm giới hạn lượt</td><td>Gửi nguyên nội dung assistant trở lại để tiếp tục</td></tr>
<tr><td><code>refusal</code></td><td>Claude từ chối trả lời</td><td>Xử lý như một kết quả bình thường (HTTP 200, không phải lỗi)</td></tr>
<tr><td><code>model_context_window_exceeded</code></td><td>Response làm đầy context window</td><td>Coi như bị cắt cụt</td></tr>
</tbody>
</table>
<h4>Khung vòng lặp chuẩn</h4>
<pre>messages = [{"role": "user", "content": user_input}]
for _ in range(MAX_ITERATIONS):          # lưới an toàn, không phải tín hiệu chính
    resp = client.messages.create(model=MODEL, max_tokens=4096,
                                  tools=TOOLS, messages=messages)
    messages.append({"role": "assistant", "content": resp.content})

    if resp.stop_reason != "tool_use":
        break                             # end_turn, max_tokens, refusal... xử lý riêng

    results = []
    for block in resp.content:
        if block.type == "tool_use":
            output, failed = run_tool(block.name, block.input)
            results.append({"type": "tool_result",
                            "tool_use_id": block.id,
                            "content": output,
                            "is_error": failed})
    messages.append({"role": "user", "content": results})</pre>
<p>Những chi tiết hay bị hỏi:</p>
<ul>
<li><strong>Thêm nguyên nội dung assistant vào lịch sử</strong>, gồm cả khối text lẫn khối <code>tool_use</code>. Mỗi <code>tool_result</code> phải trỏ đúng <code>tool_use_id</code>.</li>
<li><strong>Một response có thể chứa nhiều khối <code>tool_use</code></strong> (gọi song song). Trả tất cả kết quả trong <em>một</em> message user.</li>
<li><strong>Thứ tự trong message user</strong>: các khối <code>tool_result</code> phải đứng đầu, text (nếu có) đứng sau. Message chứa kết quả phải nằm ngay sau message assistant gọi tool. Docs còn khuyên đừng chèn khối text ngay sau tool_result, vì Claude có thể học theo mẫu đó và kết thúc lượt với response rỗng.</li>
<li><strong>Báo lỗi bằng <code>is_error: true</code></strong> kèm thông điệp rõ ràng. Nếu nuốt lỗi và trả chuỗi rỗng, Claude sẽ tưởng tool đã chạy thành công.</li>
</ul>
<h4>Các anti-pattern đề hay đưa làm đáp án nhiễu</h4>
<ul>
<li><strong>Dừng khi response có text.</strong> Sai, vì Claude thường viết một câu như “Để tôi kiểm tra đơn hàng” <em>rồi</em> mới gọi tool trong cùng response. Có text không có nghĩa là xong.</li>
<li><strong>Dò chữ “done”, “hoàn thành” trong câu trả lời.</strong> Dễ gãy, phụ thuộc cách diễn đạt. Tín hiệu có cấu trúc là <code>stop_reason</code>.</li>
<li><strong>Dùng số vòng cố định làm điều kiện dừng chính.</strong> Bài “Building effective agents” của Anthropic khuyên đặt giới hạn số vòng như một điều kiện dừng để giữ quyền kiểm soát. Giới hạn đó là lưới an toàn chống chạy vô hạn, không thay được việc đọc <code>stop_reason</code>.</li>
</ul>
<div class="tip">Câu hỏi về vòng lặp thường có đáp án: “tiếp tục khi <code>stop_reason</code> là <code>tool_use</code>, kết thúc khi là <code>end_turn</code>; giới hạn số vòng chỉ để phòng hờ”.</div>
<h4>Khi dùng Claude Agent SDK</h4>
<p>Agent SDK chạy sẵn vòng lặp này (cùng vòng lặp với Claude Code). Theo docs, mỗi lượt Claude có thể gọi tool, SDK chạy tool rồi đưa kết quả về, và vòng lặp kết thúc khi Claude trả một response không còn lời gọi tool nào. Cuối cùng SDK trả một <code>ResultMessage</code> có <code>subtype</code>:</p>
<ul>
<li><code>success</code>: xong bình thường, có trường <code>result</code>.</li>
<li><code>error_max_turns</code>, <code>error_max_budget_usd</code>: chạm giới hạn <code>max_turns</code> / <code>max_budget_usd</code>.</li>
<li><code>error_during_execution</code>: lỗi làm gián đoạn vòng lặp.</li>
</ul>
<p>Luôn kiểm tra <code>subtype</code> trước khi đọc <code>result</code>, vì <code>result</code> chỉ có ở biến thể <code>success</code>. Mọi subtype đều có <code>session_id</code>, nên kể cả khi chạm giới hạn bạn vẫn resume được.</p>
<div class="warn">Model chỉ <em>đề xuất</em> lời gọi tool. Code của bạn (permission, hook, logic trong tool) mới quyết định có thực thi hay không. Đây là chỗ đặt các rào chắn cứng.</div>`,
          keypoints: [
            "Điều khiển vòng lặp bằng stop_reason: tool_use thì chạy tool rồi lặp, end_turn thì dừng.",
            "Có text trong response không có nghĩa là xong; Claude hay viết text trước khi gọi tool.",
            "tool_result đứng đầu message user, khớp tool_use_id; nhiều tool_use thì trả hết trong một message.",
            "Lỗi tool trả về với is_error: true và thông điệp rõ ràng; giới hạn số vòng chỉ là lưới an toàn.",
            "Agent SDK: kiểm tra ResultMessage.subtype (success, error_max_turns, error_max_budget_usd, error_during_execution)."
          ],
          sources: [
            { t: "Handling stop reasons", u: "https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons" },
            { t: "Handle tool calls", u: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls" },
            { t: "How the agent loop works (Agent SDK)", u: "https://code.claude.com/docs/en/agent-sdk/agent-loop" },
            { t: "Building effective agents", u: "https://www.anthropic.com/engineering/building-effective-agents" }
          ]
        },
        {
          id: "l-1-2",
          title: "Coordinator–subagent: chia việc và truyền context",
          minutes: 14,
          html: `<p>Khi một agent đơn không đủ (việc quá rộng, cần chạy song song, hoặc context của một agent bị đầy), ta chuyển sang mô hình <strong>coordinator–subagent</strong>: một agent điều phối chia việc, giao cho các subagent, rồi gom và tổng hợp kết quả. Bài viết về hệ nghiên cứu nhiều agent của Anthropic gọi đây là mẫu <em>orchestrator-worker</em>.</p>
<h4>Workflow hay agent? Bắt đầu từ đơn giản</h4>
<p>“Building effective agents” phân biệt <strong>workflow</strong> (LLM và tool được điều phối theo đường đi định sẵn trong code) với <strong>agent</strong> (LLM tự quyết quy trình và cách dùng tool). Các mẫu workflow:</p>
<table>
<thead><tr><th>Mẫu</th><th>Dùng khi</th></tr></thead>
<tbody>
<tr><td>Prompt chaining</td><td>Việc tách gọn thành các bước cố định, bước sau dùng output bước trước</td></tr>
<tr><td>Routing</td><td>Đầu vào chia rõ thành loại, mỗi loại xử lý riêng</td></tr>
<tr><td>Parallelization</td><td>Các phần độc lập chạy cùng lúc (sectioning) hoặc chạy nhiều lần để lấy đa số (voting)</td></tr>
<tr><td>Orchestrator-workers</td><td>Không đoán trước được cần những việc con nào</td></tr>
<tr><td>Evaluator-optimizer</td><td>Có tiêu chí đánh giá rõ và lặp sửa mang lại giá trị đo được</td></tr>
</tbody>
</table>
<p>Lời khuyên chung: chọn giải pháp đơn giản nhất chạy được, chỉ thêm độ phức tạp khi nó <em>cải thiện kết quả rõ ràng</em>. Review mã theo checklist cố định thì prompt chaining là đủ. Nghiên cứu mở thì cần coordinator lập kế hoạch thích ứng.</p>
<h4>Coordinator là trung tâm (hub-and-spoke)</h4>
<p>Trong thiết kế khuyến nghị, subagent báo cáo về coordinator, và coordinator quyết định bước tiếp theo: giao thêm, sửa hướng, hay tổng hợp. Lợi ích là có một chỗ duy nhất để quan sát luồng, xử lý lỗi và kiểm soát chất lượng. Khi báo cáo cuối <strong>thiếu cả một mảng</strong> mà log cho thấy từng subagent làm đúng phần được giao, lỗi nằm ở <strong>bước chia việc của coordinator</strong>. Ví dụ: chủ đề “tác động của AI lên ngành sáng tạo” chỉ được chia thành các việc con về hội họa và thiết kế, nên âm nhạc và văn chương không ai làm.</p>
<h4>Subagent không biết gì ngoài lời giao việc</h4>
<p>Theo docs Agent SDK, subagent (trừ loại fork) bắt đầu với context mới: <strong>không có lịch sử hội thoại</strong> và không có kết quả tool của agent cha. Thứ duy nhất truyền từ cha sang con là chuỗi prompt của lời gọi tool <code>Agent</code> (trước đây tên là <code>Task</code>). Vì vậy đường dẫn file, thông báo lỗi, quyết định đã chốt đều phải được viết thẳng vào prompt đó.</p>
<p>Bài viết về hệ nghiên cứu của Anthropic nêu bốn thứ một lời giao việc cần có: <strong>mục tiêu</strong>, <strong>định dạng output</strong>, <strong>hướng dẫn về tool/nguồn nên dùng</strong>, và <strong>ranh giới nhiệm vụ</strong>. Thiếu chúng, các subagent làm trùng việc của nhau.</p>
<pre>Mục tiêu: Tìm các nghiên cứu 2023–2025 về pin natri-ion cho lưu trữ lưới điện.
Phạm vi: CHỈ natri-ion. Lithium-ion và pin dòng chảy đã có agent khác lo.
Nguồn: ưu tiên bài peer-reviewed và báo cáo của cơ quan năng lượng; bỏ qua blog bán hàng.
Output: danh sách JSON, mỗi mục gồm
  {"claim": ..., "source_url": ..., "published": "YYYY-MM", "excerpt": ...}
Nếu không tìm được nguồn cho một ý, ghi rõ "chưa có nguồn", đừng đoán.</pre>
<p>Yêu cầu subagent trả <strong>kết quả có cấu trúc kèm nguồn</strong> (claim, URL, ngày) giúp coordinator tổng hợp mà vẫn giữ được nguồn gốc (xem Domain 5).</p>
<h4>Chạy song song và điều chỉnh mức đầu tư</h4>
<ul>
<li>Coordinator có thể phát <strong>nhiều lời gọi tool <code>Agent</code> trong cùng một response</strong>, và các subagent chạy đồng thời. Theo docs SDK, các việc con độc lập khi đó xong trong thời gian của việc chậm nhất chứ không phải tổng thời gian.</li>
<li>Bài viết về hệ nghiên cứu cho biết họ ghi quy tắc “đầu tư theo độ khó” vào prompt: câu hỏi tra cứu đơn giản chỉ dùng một agent với vài lời gọi tool, câu hỏi phức tạp mới chia cho nhiều subagent. Cũng theo bài viết, hệ nhiều agent tốn token hơn nhiều so với chat thường, nên chỉ đáng dùng cho việc có giá trị cao.</li>
<li>Sau khi tổng hợp, coordinator nên tự kiểm tra lỗ hổng (mảng nào chưa có nguồn, chỗ nào mâu thuẫn) rồi giao thêm việc có mục tiêu hẹp. Đừng coi lượt đầu là kết quả cuối.</li>
</ul>
<h4>Định nghĩa subagent trong Agent SDK</h4>
<pre>options = ClaudeAgentOptions(
    allowed_tools=["Read", "Grep", "Glob", "Agent"],   # tự duyệt cả tool Agent
    agents={
        "contract-reviewer": AgentDefinition(
            description="Reviews contracts for legal risk. Use for clause-level analysis.",
            prompt="You are a contract analyst. Report each risk with clause and severity.",
            tools=["Read", "Grep", "Glob"],            # chỉ đọc
            model="sonnet",
        )
    },
)</pre>
<p><code>description</code> là thứ Claude dựa vào để quyết định giao việc cho subagent nào. <code>tools</code> giới hạn quyền của subagent. Muốn chắc chắn dùng một subagent cụ thể thì gọi tên nó trong prompt.</p>
<div class="warn">Bẫy hay gặp: subagent trả kết quả chung chung, và đáp án nhiễu đề xuất “đổi model lớn hơn” hoặc “cho thêm tool”. Gốc rễ thường là lời giao việc thiếu context (“phân tích các hợp đồng ta vừa bàn”), mà subagent không hề thấy cuộc trao đổi đó.</div>`,
          keypoints: [
            "Bắt đầu đơn giản; workflow cố định cho việc đoán trước được, orchestrator-workers khi việc con không đoán trước được.",
            "Coordinator là trung tâm: chia việc, giao, tổng hợp; báo cáo thiếu mảng thì xem lại bước chia việc.",
            "Subagent không thấy lịch sử của agent cha; mọi context phải nằm trong prompt của lời gọi tool Agent.",
            "Lời giao việc tốt có mục tiêu, định dạng output, hướng dẫn nguồn/tool và ranh giới.",
            "Nhiều lời gọi Agent trong một response thì chạy song song; mức đầu tư nên tương xứng độ khó."
          ],
          sources: [
            { t: "Building effective agents", u: "https://www.anthropic.com/engineering/building-effective-agents" },
            { t: "How we built our multi-agent research system", u: "https://www.anthropic.com/engineering/multi-agent-research-system" },
            { t: "Subagents in the SDK", u: "https://code.claude.com/docs/en/agent-sdk/subagents" }
          ]
        },
        {
          id: "l-1-3",
          title: "Hook và cưỡng chế bằng code so với lời dặn trong prompt",
          minutes: 13,
          html: `<p>Prompt là hướng dẫn mang tính <em>xác suất</em>: Claude làm theo phần lớn thời gian, nhưng không phải lúc nào cũng vậy. Docs Claude Code nói thẳng rằng CLAUDE.md là <strong>context, không phải cấu hình bị cưỡng chế</strong>, và muốn chặn một hành động bất kể Claude quyết định gì thì dùng hook <code>PreToolUse</code>. Đề thi rất thích tình huống “quy tắc trong prompt được tuân thủ 97%, nhưng 3% còn lại gây thiệt hại”.</p>
<h4>Khi nào prompt là đủ, khi nào phải dùng code</h4>
<table>
<thead><tr><th>Prompt/CLAUDE.md là đủ</th><th>Phải cưỡng chế bằng code</th></tr></thead>
<tbody>
<tr><td>Giọng văn, cách trình bày, quy ước đặt tên</td><td>Giới hạn tiền (hoàn tiền trên ngưỡng cần người duyệt)</td></tr>
<tr><td>Ưu tiên thư viện A hơn B</td><td>Thứ tự bắt buộc (xác minh danh tính trước khi sửa tài khoản)</td></tr>
<tr><td>Gợi ý cách tiếp cận</td><td>Bảo mật: chặn lệnh phá hoại, chặn đọc file bí mật</td></tr>
<tr><td>Sai một lần không gây hại lớn</td><td>Tuân thủ pháp lý, dữ liệu cá nhân</td></tr>
</tbody>
</table>
<h4>Ba chỗ đặt rào chắn cứng</h4>
<ol>
<li><strong>Trong chính tool</strong> (điều kiện tiên quyết). Ví dụ <code>process_refund</code> kiểm tra trạng thái phiên: nếu <code>verify_customer</code> chưa thành công thì từ chối và trả lỗi có cấu trúc giải thích lý do. Model không thể “quên” bước này, vì tool không cho đi tiếp.</li>
<li><strong>Hook <code>PreToolUse</code></strong>: chạy trước khi tool thực thi, đọc tên tool và input, rồi cho phép, từ chối, hoặc hỏi người dùng. Hợp với chính sách áp lên nhiều tool, hoặc khi bạn không sửa được tool (ví dụ tool MCP của bên thứ ba).</li>
<li><strong>Permission rule</strong> trong Claude Code (<code>deny</code>/<code>ask</code>/<code>allow</code>), xem Domain 3.</li>
</ol>
<h4>Hook trong Claude Code</h4>
<p>Hook khai báo trong file settings, lồng ba cấp: sự kiện, nhóm matcher, rồi handler.</p>
<pre>{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command",
            "command": "\${CLAUDE_PROJECT_DIR}/.claude/hooks/block-prod.sh" }
        ]
      }
    ]
  }
}</pre>
<ul>
<li><strong>Matcher</strong>: chuỗi chính xác hoặc danh sách cách nhau bởi <code>|</code> (ví dụ <code>Edit|Write</code>). Chuỗi có ký tự khác thì được hiểu là regex, ví dụ <code>mcp__memory__.*</code> khớp mọi tool của server <code>memory</code>.</li>
<li><strong>Exit code</strong>: <code>0</code> là thành công, các trường JSON (nếu có) được áp dụng. <code>2</code> là <strong>chặn</strong>, và nội dung stderr trở thành lý do gửi cho Claude. Mã khác (kể cả <code>1</code>) là lỗi <em>không chặn</em>, hành động vẫn chạy. Hook dùng để thực thi chính sách phải dùng <code>exit 2</code>.</li>
<li><strong>Quyết định bằng JSON</strong>: <code>PreToolUse</code> có thể trả <code>hookSpecificOutput.permissionDecision</code> (<code>allow</code>, <code>deny</code>, <code>ask</code>, <code>defer</code>) kèm <code>permissionDecisionReason</code>, và có thể sửa input qua <code>updatedInput</code>.</li>
<li>Hook trả “allow” <strong>không vượt qua</strong> được rule <code>deny</code>/<code>ask</code>. Ngược lại, hook chặn bằng exit 2 thắng cả rule <code>allow</code>.</li>
<li>Kiểu handler: <code>command</code>, <code>http</code>, <code>mcp_tool</code>, <code>prompt</code>, <code>agent</code>.</li>
</ul>
<h4><code>PostToolUse</code>: sau khi tool đã chạy</h4>
<p><code>PostToolUse</code> không ngăn được hành động, vì tool đã chạy rồi. Nó dùng để phản hồi hoặc chuẩn hóa thứ Claude nhìn thấy. Docs Claude Code cho phép thêm <code>additionalContext</code>, hoặc thay output bằng <code>updatedToolOutput</code> trước khi gửi cho Claude. Ví dụ: chuẩn hóa định dạng ngày hay mã trạng thái từ nhiều nguồn khác nhau, hoặc che dữ liệu nhạy cảm. Lưu ý docs nhấn mạnh: thay output chỉ đổi thứ Claude <em>thấy</em>, còn file đã ghi hay request đã gửi thì đã xảy ra. Muốn ngăn thì phải dùng <code>PreToolUse</code>.</p>
<h4>Hook trong Agent SDK</h4>
<p>Agent SDK có các hook như <code>PreToolUse</code>, <code>PostToolUse</code>, <code>UserPromptSubmit</code>, <code>Stop</code>, <code>SubagentStart</code>/<code>SubagentStop</code>, <code>PreCompact</code>, dưới dạng callback chạy trong process ứng dụng của bạn. Theo docs, chúng <strong>không tốn context</strong>. Hook <code>PreToolUse</code> từ chối một lời gọi thì tool không chạy, và Claude nhận thông điệp từ chối để đổi hướng.</p>
<div class="tip">Gặp tình huống có hậu quả tài chính, bảo mật hay pháp lý mà đáp án đưa ra “viết prompt mạnh hơn / thêm few-shot / nhắc lại quy tắc”, hãy tìm đáp án cưỡng chế bằng code (hook, kiểm tra trong tool, permission).</div>
<div class="warn">Đừng dùng “điểm tự tin do model tự báo” làm cổng chặn. Đó vẫn là output của model, không phải kiểm tra xác định.</div>`,
          keypoints: [
            "Prompt và CLAUDE.md là hướng dẫn xác suất; quy tắc bắt buộc phải cưỡng chế bằng code.",
            "Ba chỗ đặt rào chắn: kiểm tra trong tool, hook PreToolUse, permission rule.",
            "Hook Claude Code: exit 2 là chặn (stderr thành lý do); exit 1 và mã khác không chặn.",
            "PreToolUse có thể deny/ask/allow và sửa input; allow của hook không vượt qua rule deny.",
            "PostToolUse không ngăn được hành động, chỉ thêm context hoặc thay output Claude thấy."
          ],
          sources: [
            { t: "Hooks reference", u: "https://code.claude.com/docs/en/hooks" },
            { t: "How Claude remembers your project (CLAUDE.md)", u: "https://code.claude.com/docs/en/memory" },
            { t: "Configure permissions", u: "https://code.claude.com/docs/en/permissions" },
            { t: "How the agent loop works (hooks)", u: "https://code.claude.com/docs/en/agent-sdk/agent-loop" }
          ]
        },
        {
          id: "l-1-4",
          title: "Session (resume, fork) và thiết kế escalation",
          minutes: 13,
          html: `<h4>Session là gì</h4>
<p>Trong Agent SDK và Claude Code, <strong>session</strong> là lịch sử hội thoại tích lũy khi agent làm việc: prompt, mọi lời gọi tool, kết quả tool, câu trả lời. SDK tự ghi xuống đĩa để quay lại sau. Docs nhấn mạnh một điểm hay bị hỏi: session lưu <strong>hội thoại, không lưu hệ thống file</strong>. Muốn chụp và hoàn tác thay đổi file thì dùng file checkpointing.</p>
<h4>Continue, resume, fork</h4>
<table>
<thead><tr><th>Cách</th><th>Làm gì</th><th>CLI / SDK</th></tr></thead>
<tbody>
<tr><td>Continue</td><td>Nối vào session gần nhất trong thư mục hiện tại, không cần ID</td><td><code>claude -c</code> / <code>continue: true</code> (TS), <code>continue_conversation=True</code> (Python)</td></tr>
<tr><td>Resume</td><td>Nối vào một session cụ thể theo ID</td><td><code>claude -r &lt;id&gt;</code> / <code>resume=session_id</code></td></tr>
<tr><td>Fork</td><td>Tạo session mới (ID mới) bắt đầu bằng bản sao lịch sử; bản gốc giữ nguyên</td><td><code>--resume &lt;id&gt; --fork-session</code> / <code>fork_session=True</code>, <code>forkSession: true</code></td></tr>
</tbody>
</table>
<p>Lấy <code>session_id</code> từ <code>ResultMessage</code> (có ở mọi kết quả, kể cả lỗi), hoặc từ message <code>init</code>. Với CLI, <code>--output-format json</code> trả về <code>session_id</code> để script resume tiếp.</p>
<h4>Chọn cách nào</h4>
<ul>
<li><strong>Hỏi tiếp trên cùng phân tích</strong> (đã đọc code, giờ muốn sửa): resume, vì agent còn nguyên context, không phải đọc lại.</li>
<li><strong>Thử hai hướng khác nhau từ cùng một điểm</strong>: fork mỗi hướng. Lưu ý fork chỉ rẽ nhánh <em>hội thoại</em>. Nếu nhánh fork sửa file thì thay đổi đó là thật và mọi session cùng thư mục đều thấy.</li>
<li><strong>Chạm <code>error_max_turns</code></strong>: docs gợi ý resume với giới hạn cao hơn.</li>
<li><strong>Context cũ đã lỗi thời hoặc session quá dài</strong>: bắt đầu session mới và đưa vào một bản tóm tắt có cấu trúc các phát hiện chính. Docs nói khi chạy trên nhiều máy, việc lưu kết quả cần thiết (phân tích, quyết định, diff) làm state của ứng dụng rồi đưa vào prompt của session mới “thường bền hơn” so với chuyển file transcript.</li>
</ul>
<div class="warn">Resume sau khi đồng đội đã sửa file: kết quả tool cũ trong lịch sử (nội dung file, chữ ký hàm) giờ đã sai. Hãy nói rõ cho agent <em>file nào đã đổi</em> để nó đọc lại, hoặc mở session mới với bản tóm tắt. Fork không “làm mới” hệ thống file.</div>
<h4>Thiết kế escalation sang người</h4>
<p>Với agent chăm sóc khách hàng, câu hỏi kiến trúc là <em>khi nào</em> chuyển cho nhân viên và <em>chuyển cái gì</em>. Các tín hiệu đáng tin:</p>
<ul>
<li><strong>Khách yêu cầu rõ ràng được gặp người.</strong> Tôn trọng ngay, đừng cố níu kéo tự giải quyết.</li>
<li><strong>Chính sách không bao quát trường hợp này</strong> (ngoại lệ, chính sách im lặng). Agent không nên tự bịa chính sách.</li>
<li><strong>Không tiến triển được</strong> sau vài lần thử hợp lý, hoặc thiếu quyền/thiếu dữ liệu.</li>
<li><strong>Hành động vượt ngưỡng rủi ro</strong>. Ngưỡng này nên được cưỡng chế bằng code (bài trước), không chỉ dặn trong prompt.</li>
</ul>
<p>Các tín hiệu kém tin cậy hay xuất hiện làm đáp án nhiễu: <strong>chỉ dựa vào cảm xúc</strong> (khách bực không có nghĩa là việc vượt khả năng agent), <strong>điểm tự tin model tự báo</strong> (không được hiệu chuẩn), <strong>số lượt hội thoại</strong> cố định. Khi tra cứu khách hàng ra <em>nhiều</em> kết quả khớp, agent nên hỏi thêm thông tin định danh thay vì tự chọn theo phỏng đoán.</p>
<p>Viết tiêu chí escalation <strong>rõ ràng trong system prompt</strong>, kèm vài ví dụ ranh giới (nên chuyển / không nên chuyển), thường cải thiện quyết định hơn là thêm một mô hình phân loại riêng.</p>
<h4>Gói bàn giao</h4>
<p>Nhân viên nhận việc thường không đọc lại toàn bộ transcript, nên agent cần tạo một bản tóm tắt có cấu trúc:</p>
<pre>{
  "customer_id": "C-20931",
  "verified": true,
  "issue": "Yêu cầu hoàn 720 USD cho đơn #88412, vượt ngưỡng tự duyệt",
  "facts": {"order_date": "2025-03-02", "amount": 720.00, "status": "delivered_damaged"},
  "actions_taken": ["Đã xác minh danh tính", "Đã kiểm tra ảnh hư hỏng"],
  "reason_for_escalation": "amount_above_threshold",
  "recommended_next_step": "Duyệt hoàn tiền đầy đủ hoặc đổi hàng"
}</pre>`,
          keypoints: [
            "Session lưu hội thoại, không lưu file; fork chỉ rẽ nhánh lịch sử.",
            "Resume để làm tiếp trên cùng phân tích; fork để thử hướng khác mà giữ bản gốc; continue lấy session gần nhất.",
            "File đã đổi sau lần chạy trước: báo agent file nào đổi, hoặc mở session mới kèm bản tóm tắt.",
            "Escalate khi khách yêu cầu người, chính sách không bao quát, không tiến triển được, hoặc vượt ngưỡng rủi ro.",
            "Cảm xúc hay điểm tự tin model tự báo không phải tiêu chí escalation đáng tin; bàn giao bằng tóm tắt có cấu trúc."
          ],
          sources: [
            { t: "Work with sessions (Agent SDK)", u: "https://code.claude.com/docs/en/agent-sdk/sessions" },
            { t: "CLI reference", u: "https://code.claude.com/docs/en/cli-reference" },
            { t: "Run Claude Code programmatically", u: "https://code.claude.com/docs/en/headless" }
          ]
        }
      ],
      cheat: [
        ["stop_reason = tool_use", "Chạy tool, gửi tool_result (đứng đầu message user, đúng tool_use_id), lặp tiếp"],
        ["stop_reason = end_turn", "Claude xong, thoát vòng lặp"],
        ["max_tokens / pause_turn / refusal", "Tăng max_tokens hoặc viết tiếp / gửi lại nội dung để tiếp tục / xử lý như kết quả bình thường"],
        ["Dừng khi thấy text hoặc chữ 'done'", "Anti-pattern; text thường đi trước tool_use"],
        ["Giới hạn số vòng", "Lưới an toàn, không phải tín hiệu dừng chính"],
        ["Subagent ra kết quả chung chung", "Lời giao việc thiếu context; subagent không thấy lịch sử của agent cha"],
        ["Lời giao việc tốt", "Mục tiêu + định dạng output + nguồn/tool nên dùng + ranh giới"],
        ["Báo cáo thiếu cả một mảng", "Xem lại bước chia việc của coordinator"],
        ["Chạy song song", "Nhiều lời gọi Agent trong một response"],
        ["Quy tắc tiền/bảo mật/thứ tự bước", "Cưỡng chế bằng code: kiểm tra trong tool, PreToolUse hook, permission"],
        ["Hook chặn", "exit 2 (stderr thành lý do) hoặc permissionDecision: deny; exit 1 không chặn"],
        ["Resume / fork / session mới", "Làm tiếp / thử hướng khác / context cũ lỗi thời thì mở mới kèm tóm tắt"]
      ],
      quiz: [
        {
          q: "A customer-support agent built on the Messages API sometimes ends the conversation right after replying \"Let me look up that order for you,\" without ever calling the lookup tool. The loop exits whenever the response contains a text block. What is the BEST fix?",
          options: [
            "Increase max_tokens so Claude can finish its reasoning before it replies.",
            "Continue the loop while stop_reason is \"tool_use\" and exit when it is \"end_turn\".",
            "Add a system prompt rule telling Claude never to write any explanatory text before it calls a tool, so that text always signals a final answer.",
            "Stop the loop after a fixed number of iterations instead of inspecting the response content."
          ],
          answer: 1,
          explain: "Claude hay viết một câu dẫn rồi mới gọi tool trong cùng response, nên dùng 'có text' làm điều kiện dừng là sai. Tín hiệu đúng là stop_reason: tool_use thì chạy tool rồi lặp, end_turn thì dừng. A không liên quan, vì response không bị cắt. C là vá bằng prompt, dễ gãy và không xử lý gốc. D biến lưới an toàn thành điều kiện dừng chính, vừa có thể dừng sớm vừa phí lượt."
        },
        {
          q: "An airline support agent may issue refunds through a process_refund tool. Policy says refunds above $500 require a human supervisor. The rule is in the system prompt and is followed about 97% of the time, but several large refunds were issued automatically last month. What should the architect do?",
          options: [
            "Move the refund rule to the very top of the system prompt, restate it at the end, and mark it as CRITICAL so the model weighs it more heavily.",
            "Add few-shot examples in which the agent declines refunds above $500.",
            "Have the model output a confidence score and block refunds when the score is below 0.8.",
            "Enforce the limit in code, e.g. a PreToolUse hook or a check inside process_refund that routes amounts above $500 to a human."
          ],
          answer: 3,
          explain: "Quy tắc tài chính bắt buộc cần cơ chế xác định. Chặn trong code (hook hoặc kiểm tra trong tool) đảm bảo 100% lời gọi vượt ngưỡng đi tới người duyệt. A và B chỉ tăng xác suất tuân thủ, vẫn có thể sót. C dựa vào điểm tự tin do model tự báo, vốn không được hiệu chuẩn và không liên quan tới số tiền."
        },
        {
          q: "A multi-agent research system is asked to report on \"grid-scale energy storage.\" The final report discusses only lithium-ion batteries. Logs show each subagent completed its assigned search thoroughly and returned well-sourced findings. What is the MOST likely root cause?",
          options: [
            "The coordinator decomposed the topic too narrowly, so no subagent was assigned the other storage technologies.",
            "The web-search subagent's tool description is too short, causing poor query selection.",
            "The synthesis step dropped findings because its context window overflowed.",
            "Subagents need access to the coordinator's full conversation history so they can see the overall goal and broaden their searches on their own."
          ],
          answer: 0,
          explain: "Từng subagent làm tốt phần được giao, vậy mà cả mảng bị thiếu. Lỗi nằm ở bước chia việc của coordinator. B sẽ làm chất lượng tìm kiếm kém, không giải thích được việc thiếu mảng khi log cho thấy kết quả tốt. C không có dấu hiệu gì trong log. D không đúng hướng: phạm vi do lời giao việc quyết định, lịch sử hội thoại không mở rộng được nó."
        },
        {
          q: "A coordinator agent delegates with the prompt \"Review the contracts we discussed and flag any risky clauses.\" The subagent returns a generic list of common contract risks unrelated to the actual files. What is the BEST change?",
          options: [
            "Switch the subagent to a larger model so it can infer which contracts were meant.",
            "Give the subagent the same full toolset as the coordinator.",
            "Include the contract file paths, the risk criteria, and the expected output format directly in the delegation prompt, because the subagent does not see the coordinator's conversation.",
            "Raise the subagent's maximum turn count so it has time to search for the earlier discussion."
          ],
          answer: 2,
          explain: "Subagent bắt đầu với context mới. Thứ duy nhất nó nhận là prompt giao việc, nên 'các hợp đồng ta vừa bàn' là vô nghĩa với nó. Phải ghi rõ đường dẫn, tiêu chí và định dạng. A và B không cung cấp được thông tin còn thiếu. D cũng vậy: subagent không có cách nào 'tìm' cuộc trao đổi của agent cha."
        },
        {
          q: "You are designing escalation rules for an e-commerce support agent. Which TWO conditions are the MOST appropriate triggers for handing the case to a human? (Choose TWO.)",
          options: [
            "The customer explicitly asks to speak with a human agent.",
            "Sentiment analysis flags the customer's latest message as frustrated.",
            "The model's self-reported confidence for its answer falls below 0.7.",
            "The request is not covered by documented policy, such as a price-match request the policy does not address.",
            "The conversation has exceeded five turns."
          ],
          answer: [0, 3],
          explain: "Yêu cầu rõ ràng của khách và trường hợp chính sách không bao quát là hai tín hiệu đáng tin: agent không được tự bịa chính sách và phải tôn trọng mong muốn của khách. B: khách bực không có nghĩa là agent không giải quyết được. C: điểm tự tin model tự báo không được hiệu chuẩn. E: số lượt là ngưỡng tùy tiện, không phản ánh độ khó của vấn đề."
        },
        {
          q: "Using the Claude Agent SDK, a developer has a session in which the agent analyzed a legacy payment module. She wants to explore two different refactoring strategies from that same analysis without either attempt polluting the original session. What should she do?",
          options: [
            "Start two fresh sessions and paste the full original transcript into each prompt so that both attempts begin with exactly the same analysis.",
            "Resume the original session with forking enabled for each strategy, leaving the original history unchanged.",
            "Use continue twice in a row, once for each strategy.",
            "Resume the same session ID from two processes at once so both strategies share one history."
          ],
          answer: 1,
          explain: "Fork tạo session mới có bản sao lịch sử, còn bản gốc giữ nguyên. Đây đúng là trường hợp 'thử hướng khác từ cùng một điểm'. A tốn token và dễ thiếu sót. C nối tiếp vào cùng một session, nên hai hướng trộn vào nhau. D làm hai hướng ghi chồng lên cùng một lịch sử. Lưu ý: fork chỉ rẽ nhánh hội thoại, còn file sửa thì vẫn là thật."
        },
        {
          q: "A developer resumes yesterday's Claude Code session about a service's API layer. Overnight, teammates merged changes to four of the files the agent had read. The agent now references function signatures that no longer exist. What is the BEST next step?",
          options: [
            "Tell the agent which files changed and have it re-read them, or start a fresh session seeded with a summary of prior findings.",
            "Fork the session, because forking refreshes the agent's snapshot of the filesystem.",
            "Switch to a model with a larger context window so older tool results are weighted less.",
            "Run /compact so that outdated tool results are automatically discarded and replaced with the current contents of the files on disk."
          ],
          answer: 0,
          explain: "Kết quả tool cũ trong lịch sử đã lỗi thời. Phải chỉ rõ file nào đã đổi để agent đọc lại, hoặc mở session mới với bản tóm tắt có cấu trúc. B sai vì session và fork lưu hội thoại, không lưu hệ thống file. C không làm dữ liệu cũ đúng trở lại. D: compaction chỉ tóm tắt lịch sử, không đọc lại file."
        },
        {
          q: "A team adds a PreToolUse hook in .claude/settings.json to stop Claude Code from running Bash commands that touch production config. The script detects the pattern, prints an error, and exits with code 1, but the commands still run. Why?",
          options: [
            "The matcher \"Bash\" must be written as a regular expression to match anything.",
            "PreToolUse hooks can only observe and log tool calls; to actually block a command, the policy must be moved into a PostToolUse hook.",
            "Hooks in .claude/settings.json are ignored unless they are also defined in ~/.claude/settings.json.",
            "Exit code 1 is a non-blocking error; blocking requires exit code 2 or a deny permission decision."
          ],
          answer: 3,
          explain: "Theo docs hooks, exit 2 là mã chặn (stderr thành lý do). Các mã khác như 1 là lỗi không chặn, hành động vẫn chạy. A sai: 'Bash' là chuỗi khớp chính xác hợp lệ. B ngược: PreToolUse mới chặn được, còn PostToolUse chạy khi tool đã xong. C sai: .claude/settings.json là vị trí cấp project hợp lệ."
        }
      ]
    },
    {
      id: "d2",
      name: "Tool Design & MCP Integration",
      weight: 18,
      intro: `<p>Domain này hỏi cách thiết kế <em>giao diện</em> giữa Claude và thế giới bên ngoài: viết mô tả tool và input schema để Claude chọn đúng tool, giới hạn số tool cho mỗi agent, thiết kế lỗi trả về để agent biết retry hay dừng, và tích hợp MCP (tools/resources/prompts, cấu hình trong Claude Code). Domain này cũng bao gồm các built-in tool của Claude Code.</p>
<p>Ranh giới: dùng tool để <em>ép output có cấu trúc</em> được hỏi ở Domain 4. Cách coordinator xử lý lỗi lan từ subagent lên thuộc Domain 5.</p>`,
      lessons: [
        {
          id: "l-2-1",
          title: "Viết mô tả tool và input schema",
          minutes: 12,
          html: `<p>Docs tool use của Anthropic nói rõ: mô tả tool chi tiết là <strong>yếu tố quan trọng nhất, hơn hẳn mọi yếu tố khác</strong> quyết định hiệu quả dùng tool. Claude không đọc code của tool. Nó chỉ thấy <code>name</code>, <code>description</code> và <code>input_schema</code>. Nếu hai tool có mô tả mơ hồ và chồng lấn nhau, Claude sẽ chọn nhầm.</p>
<h4>Một mô tả tốt gồm gì</h4>
<p>Docs khuyên mỗi tool nên có <strong>ít nhất 3–4 câu</strong> (nhiều hơn nếu tool phức tạp), nói rõ:</p>
<ul>
<li>Tool làm gì, trả về dữ liệu gì.</li>
<li><strong>Khi nào nên dùng, và khi nào không nên dùng.</strong></li>
<li>Từng tham số có nghĩa gì, ảnh hưởng thế nào tới kết quả.</li>
<li>Giới hạn và lưu ý, ví dụ thông tin nào tool <em>không</em> trả về.</li>
</ul>
<pre>// Kém: hai tool gần như trùng nghĩa
{"name": "get_customer", "description": "Retrieves customer information."}
{"name": "lookup_order", "description": "Retrieves order information."}

// Tốt hơn
{
  "name": "lookup_order",
  "description": "Looks up a single order by its order number (format: '#' followed by
    digits, e.g. #48213). Returns status, items, shipping carrier, tracking number and
    refund eligibility. Use this whenever the customer mentions an order number or asks
    where a package is. Does NOT return the customer's profile or payment methods; use
    get_customer for account questions.",
  "input_schema": {
    "type": "object",
    "properties": {
      "order_number": {"type": "string",
                       "description": "Order number including '#', e.g. '#48213'"}
    },
    "required": ["order_number"]
  }
}</pre>
<h4>Input schema: để cấu trúc gánh bớt việc cho mô tả</h4>
<ul>
<li>Dùng <code>type</code>, <code>enum</code>, <code>required</code> để giới hạn giá trị hợp lệ. Thêm <code>description</code> cho từng thuộc tính, ghi rõ định dạng (ví dụ “ngày theo ISO 8601”).</li>
<li>Docs có trường tùy chọn <code>input_examples</code>: một mảng ví dụ input hợp lệ, hữu ích cho input lồng nhau hoặc nhạy định dạng. Mỗi ví dụ phải hợp lệ theo schema (nếu không, API trả lỗi 400) và tốn thêm token prompt.</li>
<li>Tên tool phải khớp <code>^[a-zA-Z0-9_-]{1,128}$</code>. Khi có nhiều dịch vụ, docs khuyên thêm tiền tố theo dịch vụ (ví dụ <code>github_list_prs</code>, <code>slack_send_message</code>) để tránh mơ hồ.</li>
</ul>
<h4>Gộp hay tách?</h4>
<p>Mục tiêu là <strong>giảm mơ hồ khi chọn tool</strong>. Docs khuyên gộp các thao tác liên quan trên cùng một đối tượng vào một tool có tham số <code>action</code>, thay vì tạo <code>create_pr</code>, <code>review_pr</code>, <code>merge_pr</code> riêng. Ít tool mạnh hơn thì Claude bớt phân vân. Ngược lại, khi một tool “làm đủ thứ” với mô tả chung chung khiến Claude không biết lúc nào nên gọi, đổi tên và viết mô tả theo đúng mục đích sẽ giúp ích. Hãy tự hỏi: <em>nhìn mô tả, một người mới có biết chắc nên gọi tool nào không?</em></p>
<h4>Thiết kế response của tool</h4>
<p>Docs khuyên tool chỉ trả về <strong>thông tin có giá trị cao</strong>: định danh ổn định, có ý nghĩa (slug, UUID) thay cho tham chiếu nội bộ khó hiểu, và chỉ những trường Claude cần cho bước tiếp theo. Response phình to vừa tốn context vừa khiến Claude khó tìm thứ quan trọng. Ví dụ API đơn hàng trả 40 trường thì tool chỉ nên trả khoảng 6 trường liên quan.</p>
<div class="tip">Agent chọn nhầm giữa hai tool thì việc <strong>đầu tiên</strong> là viết lại mô tả cho rõ (định dạng input, ví dụ, ranh giới “dùng tool kia khi…”). Thêm bộ phân loại định tuyến, fine-tune hay đổi model đều tốn hơn và không giải quyết gốc rễ.</div>
<div class="warn">Đừng ép chọn tool bằng <code>tool_choice</code> để chữa mô tả kém. Ép một tool cụ thể chỉ hợp khi bạn chắc chắn bước đó luôn là bước đúng, ví dụ bước trích xuất trong pipeline.</div>`,
          keypoints: [
            "Mô tả tool là yếu tố quan trọng nhất; tối thiểu 3–4 câu: làm gì, khi nào dùng/không dùng, tham số, giới hạn.",
            "Dùng type/enum/required và mô tả từng thuộc tính; input_examples cho input phức tạp.",
            "Thêm tiền tố theo dịch vụ; gộp thao tác liên quan vào một tool có tham số action để giảm mơ hồ.",
            "Response của tool chỉ trả trường cần thiết, định danh ổn định.",
            "Chọn nhầm tool thì sửa mô tả trước, trước khi nghĩ tới routing hay fine-tune."
          ],
          sources: [
            { t: "Define tools", u: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools" },
            { t: "Writing tools for agents", u: "https://www.anthropic.com/engineering/writing-tools-for-agents" }
          ]
        },
        {
          id: "l-2-2",
          title: "Phạm vi tool cho mỗi agent, tool_choice và built-in tools",
          minutes: 13,
          html: `<h4>Mỗi agent bao nhiêu tool?</h4>
<p>Không có con số thần kỳ, nhưng nguyên tắc rõ: <strong>mỗi agent chỉ cầm những tool cần cho vai trò của nó</strong>. Theo docs Agent SDK, mỗi định nghĩa tool tốn chỗ trong context, và giới hạn tool cho subagent giảm rủi ro hành động ngoài ý muốn. Ví dụ: một subagent review tài liệu chỉ cần <code>Read</code> và <code>Grep</code>. Agent cầm quá nhiều tool chồng chéo sẽ hay chọn nhầm, hoặc “lạc đề”: agent tổng hợp có tool tìm kiếm web sẽ có xu hướng đi tìm thêm thay vì tổng hợp.</p>
<p>Khi một vai trò thỉnh thoảng cần một chút năng lực của vai trò khác (agent tổng hợp cần kiểm chứng một con số), cách hợp lý là cho nó một tool <strong>phạm vi hẹp</strong> (chẳng hạn <code>verify_fact</code>). Yêu cầu nghiên cứu lớn hơn thì đẩy về coordinator. Không nên trao cả bộ tool tìm kiếm.</p>
<p>Trong Claude Code, <strong>tool search</strong> bật mặc định: định nghĩa tool MCP được hoãn lại và chỉ nạp khi cần, nên thêm MCP server không làm phình context ngay từ đầu.</p>
<h4><code>tool_choice</code></h4>
<table>
<thead><tr><th>Giá trị</th><th>Hành vi</th></tr></thead>
<tbody>
<tr><td><code>{"type": "auto"}</code></td><td>Claude tự quyết có gọi tool hay không (mặc định khi có <code>tools</code>)</td></tr>
<tr><td><code>{"type": "any"}</code></td><td>Bắt buộc gọi <em>một</em> tool nào đó trong danh sách</td></tr>
<tr><td><code>{"type": "tool", "name": "..."}</code></td><td>Bắt buộc gọi đúng tool đã chỉ định</td></tr>
<tr><td><code>{"type": "none"}</code></td><td>Không cho gọi tool (mặc định khi không có <code>tools</code>)</td></tr>
</tbody>
</table>
<ul>
<li>Với <code>any</code>/<code>tool</code>, API điền sẵn đầu message assistant để ép gọi tool, nên Claude <strong>không viết lời giải thích</strong> trước khối <code>tool_use</code>. Muốn có lời giải thích thì dùng <code>auto</code> và dặn trong message user.</li>
<li>Dùng <code>any</code> khi pipeline <em>bắt buộc</em> phải ra một lời gọi tool (ví dụ chọn một trong vài schema trích xuất). Dùng <code>tool</code> để ép một bước cụ thể chạy trước (ví dụ <code>extract_metadata</code>), rồi các lượt sau trả về <code>auto</code>.</li>
<li>Docs gợi ý kết hợp <code>any</code> với <code>strict: true</code> trên định nghĩa tool để vừa chắc chắn có lời gọi, vừa chắc chắn input đúng schema.</li>
</ul>
<div class="warn">Docs hiện ghi rằng ép tool (<code>any</code>/<code>tool</code>) <strong>không dùng được</strong> với extended thinking bật thủ công, và một số model mới nhất trả lỗi 400 với hai giá trị này. Docs khuyên dùng <code>auto</code> kèm strict tool use, hoặc structured outputs. Khi đề hỏi “ép model luôn gọi tool”, hiểu là trong bối cảnh model hỗ trợ.</div>
<h4>Built-in tools của Claude Code</h4>
<table>
<thead><tr><th>Tool</th><th>Dùng để</th><th>Cần quyền?</th></tr></thead>
<tbody>
<tr><td><code>Read</code></td><td>Đọc nội dung file</td><td>Không</td></tr>
<tr><td><code>Write</code></td><td>Tạo mới hoặc ghi đè toàn bộ file</td><td>Có</td></tr>
<tr><td><code>Edit</code></td><td>Sửa có mục tiêu bằng thay chuỗi chính xác</td><td>Có</td></tr>
<tr><td><code>Glob</code></td><td>Tìm file theo mẫu tên (ví dụ <code>**/*.test.ts</code>)</td><td>Không</td></tr>
<tr><td><code>Grep</code></td><td>Tìm theo nội dung trong file (dựa trên ripgrep, cú pháp regex của ripgrep)</td><td>Không</td></tr>
<tr><td><code>Bash</code></td><td>Chạy lệnh shell</td><td>Có</td></tr>
<tr><td><code>Agent</code></td><td>Sinh subagent có context riêng</td><td>Không</td></tr>
<tr><td><code>WebFetch</code> / <code>WebSearch</code></td><td>Lấy trang web / tìm kiếm web</td><td>Có</td></tr>
</tbody>
</table>
<p>Phân biệt cho đúng: <strong>Glob tìm file theo tên</strong>, còn <strong>Grep tìm dòng bên trong file</strong>. Muốn tìm mọi nơi gọi hàm <code>processPayment</code> thì dùng Grep. Muốn liệt kê mọi file test thì dùng Glob. Docs tools reference hiện ghi rằng trên macOS/Linux/WSL, Glob và Grep không nằm trong bộ tool mặc định (Claude tìm bằng <code>find</code>/<code>grep</code> qua Bash), và có lại khi bạn chỉ định chúng trong <code>--tools</code> hoặc <code>--allowedTools</code>. Về khái niệm, vai trò của hai tool không đổi.</p>
<p><strong>Edit</strong> thay chuỗi chính xác, không dùng regex hay khớp mờ. <code>old_string</code> phải xuất hiện <strong>đúng một lần</strong>. Nếu xuất hiện nhiều lần, cần đưa chuỗi dài hơn kèm ngữ cảnh xung quanh để chỉ đúng một chỗ, hoặc đặt <code>replace_all: true</code> nếu muốn thay hết. Khi cần viết lại phần lớn file, <code>Write</code> cả file thường hợp lý hơn nhiều lần Edit.</p>
<div class="tip">Chiến lược khám phá code hiệu quả: Glob/Grep để khoanh vùng, rồi Read có chọn lọc. Đừng Read toàn bộ thư mục ngay từ đầu.</div>`,
          keypoints: [
            "Mỗi agent chỉ cầm tool cần cho vai trò; vai trò khác cần chút năng lực thì cho tool phạm vi hẹp.",
            "tool_choice: auto (mặc định), any (bắt buộc một tool), tool (ép tool cụ thể), none.",
            "any/tool khiến Claude không viết text trước tool_use; kết hợp strict: true để input đúng schema.",
            "Glob tìm file theo tên, Grep tìm nội dung, Edit thay chuỗi chính xác và duy nhất, Write ghi đè cả file.",
            "Edit lỗi vì chuỗi trùng thì thêm ngữ cảnh cho duy nhất hoặc dùng replace_all."
          ],
          sources: [
            { t: "Define tools (tool_choice)", u: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools" },
            { t: "Tools reference (Claude Code)", u: "https://code.claude.com/docs/en/tools-reference" },
            { t: "Subagents in the SDK (tool restrictions)", u: "https://code.claude.com/docs/en/agent-sdk/subagents" },
            { t: "Connect Claude Code to tools via MCP (tool search)", u: "https://code.claude.com/docs/en/mcp" }
          ]
        },
        {
          id: "l-2-3",
          title: "Thiết kế lỗi trả về từ tool",
          minutes: 11,
          html: `<p>Agent chỉ phản ứng đúng khi nó <em>hiểu</em> chuyện gì đã xảy ra. Một tool trả về “Operation failed” buộc Claude phải đoán: thử lại? đổi tham số? báo khách? Thiết kế lỗi tốt là phần quan trọng của thiết kế tool.</p>
<h4>Trong Messages API: <code>is_error</code></h4>
<pre>{
  "type": "tool_result",
  "tool_use_id": "toolu_01A09q90qw90lq917835lq9",
  "content": "Rate limit exceeded on inventory service. Retry after 60 seconds.",
  "is_error": true
}</pre>
<ul>
<li>Docs khuyên viết thông điệp lỗi <strong>có tính hướng dẫn</strong>: nói rõ chuyện gì sai và nên làm gì tiếp, thay vì “failed”.</li>
<li>Khi Claude gọi tool thiếu tham số hoặc sai tham số, docs mô tả rằng nếu bạn trả lỗi qua <code>tool_result</code>, Claude sẽ thử lại khoảng 2–3 lần với bản sửa trước khi xin lỗi người dùng. Muốn loại bỏ hẳn lời gọi sai schema thì dùng <code>strict: true</code>.</li>
<li>Lỗi của <em>server tool</em> (ví dụ web search) do Claude tự xử lý, bạn không cần trả <code>is_error</code>.</li>
</ul>
<h4>Trong MCP: hai cơ chế lỗi</h4>
<table>
<thead><tr><th>Loại</th><th>Dùng cho</th><th>Cách trả</th></tr></thead>
<tbody>
<tr><td>Protocol error</td><td>Tool không tồn tại, tham số không hợp lệ, lỗi server</td><td>Lỗi JSON-RPC chuẩn (trường <code>error</code>)</td></tr>
<tr><td>Tool execution error</td><td>API bên ngoài lỗi, dữ liệu đầu vào không hợp lệ, vi phạm quy tắc nghiệp vụ</td><td>Trong <code>result</code> với <code>isError: true</code> và nội dung mô tả</td></tr>
</tbody>
</table>
<p>Lỗi thực thi nằm trong kết quả nên model đọc được và có thể tự sửa hướng. Đây là kênh để truyền thông tin lỗi có ý nghĩa cho agent.</p>
<h4>Phân loại lỗi để agent chọn hành động</h4>
<p>Một cách thiết kế hay dùng là trả payload lỗi có cấu trúc thay vì chuỗi tự do:</p>
<pre>{
  "error_category": "transient",       // transient | validation | business_rule | permission
  "retryable": true,
  "message": "Payment gateway timed out after 10s",
  "suggested_action": "Retry once; if it fails again, tell the customer the payment
                       is pending and do not charge twice"
}</pre>
<table>
<thead><tr><th>Loại</th><th>Ví dụ</th><th>Agent nên</th></tr></thead>
<tbody>
<tr><td>Tạm thời (transient)</td><td>Timeout, dịch vụ quá tải</td><td>Retry (tốt nhất là tool/subagent tự retry có backoff trước khi báo lên)</td></tr>
<tr><td>Validation</td><td>Sai định dạng mã đơn</td><td>Sửa input hoặc hỏi lại người dùng</td></tr>
<tr><td>Quy tắc nghiệp vụ</td><td>Đơn quá hạn hoàn tiền</td><td>Không retry; giải thích cho khách hoặc escalate</td></tr>
<tr><td>Quyền</td><td>Không đủ quyền truy cập</td><td>Không retry; escalate</td></tr>
</tbody>
</table>
<h4>“Không có kết quả” khác với “thất bại”</h4>
<p>Đây là bẫy kinh điển. Truy vấn chạy xong và trả về rỗng (“không có đơn nào cho email này”) là một <strong>kết quả thành công</strong> mang thông tin hữu ích. Truy vấn bị timeout là <strong>thất bại</strong>. Nếu tool trả mảng rỗng khi database timeout, agent sẽ kết luận sai (“hết hàng”, “không có dữ liệu”), và coordinator trong hệ nhiều agent sẽ tổng hợp như thể chủ đề đó không có thông tin.</p>
<div class="tip">Đáp án tốt thường có ba ý: (1) phân biệt lỗi tạm thời với lỗi vĩnh viễn, (2) retry cục bộ cho lỗi tạm thời, (3) chỉ báo lên khi không tự khắc phục được, kèm ngữ cảnh: đã thử gì, có kết quả một phần nào không.</div>
<div class="warn">Hai thái cực đều sai: nuốt lỗi rồi trả “thành công” rỗng, và ném lỗi chung chung làm dừng cả pipeline. Nên trả lỗi có cấu trúc để bên trên quyết định.</div>`,
          keypoints: [
            "Messages API: báo lỗi bằng tool_result với is_error: true và thông điệp hướng dẫn.",
            "MCP: protocol error (JSON-RPC) cho tool không tồn tại, tham số sai; lỗi thực thi trong result với isError: true.",
            "Phân loại lỗi (transient / validation / business_rule / permission) kèm cờ retryable để agent chọn hành động.",
            "Kết quả rỗng hợp lệ khác với thất bại; đừng trả rỗng khi bị timeout.",
            "Lỗi tạm thời thì retry cục bộ trước, chỉ báo lên kèm ngữ cảnh khi không tự xử lý được."
          ],
          sources: [
            { t: "Handle tool calls (is_error)", u: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls" },
            { t: "MCP specification: Tools (error handling)", u: "https://modelcontextprotocol.io/specification/2025-06-18/server/tools" }
          ]
        },
        {
          id: "l-2-4",
          title: "MCP: tools, resources, prompts và cấu hình trong Claude Code",
          minutes: 14,
          html: `<p><strong>Model Context Protocol (MCP)</strong> là giao thức mở để ứng dụng AI kết nối tới hệ thống bên ngoài qua các <em>MCP server</em>. Một server cung cấp ba loại khối xây dựng, mỗi loại do một bên khác nhau điều khiển:</p>
<table>
<thead><tr><th>Primitive</th><th>Là gì</th><th>Ai điều khiển</th><th>Method</th></tr></thead>
<tbody>
<tr><td><strong>Tools</strong></td><td>Hàm mà model chủ động gọi để hành động (ghi DB, gọi API, sửa file)</td><td>Model</td><td><code>tools/list</code>, <code>tools/call</code></td></tr>
<tr><td><strong>Resources</strong></td><td>Nguồn dữ liệu thụ động, chỉ đọc, định danh bằng URI (nội dung file, schema DB, tài liệu API). Có resource cố định và resource template có tham số</td><td>Ứng dụng</td><td><code>resources/list</code>, <code>resources/templates/list</code>, <code>resources/read</code></td></tr>
<tr><td><strong>Prompts</strong></td><td>Mẫu chỉ dẫn dựng sẵn, có tham số, người dùng gọi rõ ràng</td><td>Người dùng</td><td><code>prompts/list</code>, <code>prompts/get</code></td></tr>
</tbody>
</table>
<p>Về thiết kế: cung cấp danh mục, schema hay tài liệu dưới dạng <strong>resource</strong> giúp agent có sẵn bối cảnh mà không phải tốn nhiều lời gọi tool thăm dò. Hành động có tác dụng phụ thì phải là <strong>tool</strong>.</p>
<h4>Ba scope cấu hình trong Claude Code</h4>
<table>
<thead><tr><th>Scope</th><th>Áp dụng</th><th>Chia sẻ với team</th><th>Lưu ở</th></tr></thead>
<tbody>
<tr><td>Local (mặc định)</td><td>Chỉ project hiện tại</td><td>Không</td><td><code>~/.claude.json</code> (dưới đường dẫn project)</td></tr>
<tr><td>Project</td><td>Chỉ project hiện tại</td><td>Có, qua version control</td><td><code>.mcp.json</code> ở thư mục gốc project</td></tr>
<tr><td>User</td><td>Mọi project của bạn</td><td>Không</td><td><code>~/.claude.json</code></td></tr>
</tbody>
</table>
<p>Khi một server được khai báo ở nhiều scope, Claude Code dùng <em>nguyên</em> mục từ một nguồn (không trộn trường), theo thứ tự ưu tiên local, rồi project, rồi user.</p>
<h4><code>.mcp.json</code> và biến môi trường</h4>
<pre>{
  "mcpServers": {
    "github": {
      "type": "http",
      "url": "https://mcp.example.com/github",
      "headers": { "Authorization": "Bearer \${GITHUB_TOKEN}" }
    },
    "internal-docs": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@acme/docs-mcp"],
      "env": { "DOCS_API_URL": "\${DOCS_API_URL:-https://docs.internal.example}" }
    }
  }
}</pre>
<ul>
<li>Cú pháp <code>\${VAR}</code> và <code>\${VAR:-default}</code> dùng được trong <code>command</code>, <code>args</code>, <code>env</code>, <code>url</code>, <code>headers</code>.</li>
<li>Biến chưa đặt và không có default thì cấu hình vẫn nạp, Claude Code cảnh báo và giữ nguyên chuỗi <code>\${VAR}</code>.</li>
<li>Commit <code>.mcp.json</code> để cả team có cùng server, nhưng <strong>không bao giờ</strong> ghi token thật vào đó. Mỗi người tự đặt biến môi trường của mình.</li>
</ul>
<h4>Thêm server bằng CLI</h4>
<pre>claude mcp add --transport http github https://mcp.example.com/github
claude mcp add --transport http shared-docs --scope project https://example.com/mcp
claude mcp add --env AIRTABLE_API_KEY=YOUR_KEY --transport stdio airtable \\
  -- npx -y airtable-mcp-server</pre>
<p><code>--transport</code> nhận <code>http</code> (khuyên dùng), <code>sse</code> (đã lỗi thời) hoặc <code>stdio</code>. <code>--scope</code> nhận <code>local</code> (mặc định), <code>project</code>, <code>user</code>. Mọi thứ sau <code>--</code> là lệnh khởi động server.</p>
<p>Vì lý do bảo mật, trong phiên tương tác Claude Code <strong>hỏi xác nhận</strong> trước khi dùng server project-scope từ <code>.mcp.json</code>. Trong <code>claude -p</code> không có ai trả lời, nên server được nạp mà không hỏi. Muốn chặn thì dùng <code>disabledMcpjsonServers</code> hoặc <code>--strict-mcp-config</code>.</p>
<h4>Dùng resources và prompts trong Claude Code</h4>
<ul>
<li><strong>Resource</strong>: gõ <code>@</code> để thấy danh sách, tham chiếu theo dạng <code>@server:protocol://resource/path</code>, ví dụ <code>@github:issue://123</code>. Resource được tự động lấy và đính kèm.</li>
<li><strong>Prompt</strong>: xuất hiện như lệnh, hiển thị dạng <code>/servername:promptname (MCP)</code>. Gõ <code>/mcp__servername__promptname</code> cũng chạy được.</li>
<li><strong>Tool</strong> MCP có tên đầy đủ dạng <code>mcp__&lt;server&gt;__&lt;tool&gt;</code>, dùng trong permission rule và matcher của hook.</li>
<li>Output lớn: Claude Code cảnh báo khi output một tool MCP vượt 10.000 token. Giới hạn mặc định là 25.000 token, chỉnh bằng biến <code>MAX_MCP_OUTPUT_TOKENS</code>.</li>
</ul>
<div class="tip">Server cả team cần thì dùng project scope (<code>.mcp.json</code> commit vào repo, secret qua <code>\${VAR}</code>). Server thử nghiệm cá nhân thì dùng local hoặc user scope.</div>
<div class="warn">Nhầm lẫn hay gặp: tưởng <code>~/.claude.json</code> được chia sẻ với team (không phải), hoặc tưởng prompt của MCP do model tự gọi (không, prompt do người dùng gọi).</div>`,
          keypoints: [
            "MCP có ba primitive: Tools (model điều khiển), Resources (ứng dụng điều khiển, chỉ đọc, có URI), Prompts (người dùng gọi).",
            "Scope: local (mặc định, riêng tư), project (.mcp.json, commit, chia sẻ), user (mọi project, riêng tư).",
            ".mcp.json hỗ trợ ${VAR} và ${VAR:-default}; không commit secret.",
            "Resource tham chiếu bằng @server:protocol://path; prompt chạy bằng /mcp__server__prompt.",
            "Server project-scope cần xác nhận trong phiên tương tác; với -p thì được nạp không hỏi."
          ],
          sources: [
            { t: "Understanding MCP servers", u: "https://modelcontextprotocol.io/docs/learn/server-concepts" },
            { t: "Connect Claude Code to tools via MCP", u: "https://code.claude.com/docs/en/mcp" }
          ]
        }
      ],
      cheat: [
        ["Agent chọn nhầm tool", "Viết lại mô tả: làm gì, input dạng nào, khi nào dùng/không dùng, phân biệt với tool kia"],
        ["Độ dài mô tả", "Docs khuyên tối thiểu 3–4 câu mỗi tool"],
        ["input_examples", "Ví dụ input hợp lệ theo schema; cho input phức tạp; tốn token"],
        ["Quá nhiều tool", "Chỉ cấp tool cần cho vai trò; cần thêm thì cho tool phạm vi hẹp"],
        ["tool_choice", "auto (mặc định) / any (bắt buộc một tool) / tool (ép tool cụ thể) / none"],
        ["any + strict: true", "Vừa chắc có lời gọi tool, vừa chắc input đúng schema (trên model hỗ trợ ép tool)"],
        ["Lỗi tool (API)", "tool_result + is_error: true + thông điệp nói rõ nên làm gì"],
        ["Lỗi MCP", "Protocol error (JSON-RPC) với lỗi thực thi (result.isError: true)"],
        ["Rỗng và lỗi", "Kết quả rỗng là thành công; timeout là lỗi retryable, không được trả rỗng"],
        ["MCP scopes", "local (mặc định, ~/.claude.json) / project (.mcp.json) / user (~/.claude.json)"],
        ["Secret trong .mcp.json", "Dùng ${VAR} hoặc ${VAR:-default}, mỗi dev tự đặt biến"],
        ["Resource / prompt MCP trong Claude Code", "@server:protocol://path / /mcp__server__prompt"]
      ],
      quiz: [
        {
          q: "A support agent has two tools: get_customer (\"Retrieves customer information\") and lookup_order (\"Retrieves order information\"). When users ask \"Where is my order #48213?\", the agent frequently calls get_customer first and then asks for an email address. What should you do FIRST?",
          options: [
            "Add a lightweight routing classifier in front of the agent that inspects each message and decides which of the two tools should be called.",
            "Merge both tools into a single generic lookup tool that accepts any identifier.",
            "Rewrite both descriptions: what each returns, which identifiers it accepts, and when to use the other one instead.",
            "Set tool_choice to force lookup_order whenever the user's message contains a number."
          ],
          answer: 2,
          explain: "Mô tả tool là yếu tố quan trọng nhất trong việc chọn tool. Ở đây hai mô tả quá ngắn và chồng lấn, nên sửa mô tả là bước đầu tiên, rẻ nhất và đúng gốc rễ. A thêm hạ tầng mà chưa chữa nguyên nhân. B gộp hai đối tượng khác nhau vào một tool mơ hồ hơn. D là luật cứng dễ sai (số điện thoại, số lượng hàng cũng là số)."
        },
        {
          q: "An invoice-extraction pipeline must produce a call to the extract_invoice tool for every document, never a free-text reply. The model in use supports forced tool use. Which configuration BEST meets this requirement?",
          options: [
            "Set tool_choice to {\"type\": \"tool\", \"name\": \"extract_invoice\"} and enable strict: true on the tool definition.",
            "Keep tool_choice as auto and add a strongly worded instruction to the system prompt telling Claude it must always respond by calling extract_invoice.",
            "Set tool_choice to none and parse the JSON from the text response.",
            "Lower the temperature to zero so the model reliably chooses the tool."
          ],
          answer: 0,
          explain: "Ép đúng tool bằng tool_choice dạng tool bảo đảm mỗi response là một lời gọi extract_invoice. strict: true bảo đảm input khớp schema. B vẫn chỉ là xác suất. C bỏ mất cơ chế bảo đảm cấu trúc. D không bảo đảm gì về việc có gọi tool hay không."
        },
        {
          q: "An MCP server's check_inventory tool returns a successful, empty item list whenever its upstream database query times out. The agent then tells customers that products are out of stock. What is the BEST fix?",
          options: [
            "Add a system prompt rule telling the agent that whenever the inventory list comes back empty it should call the tool two more times before answering.",
            "Make the server process exit on timeouts so the client restarts it automatically.",
            "Raise the database timeout to 60 seconds so timeouts become rarer.",
            "Return the timeout as a tool execution error (isError: true) marked retryable, distinct from a genuine empty result."
          ],
          answer: 3,
          explain: "Gốc rễ là tool trộn lẫn 'thất bại' với 'không có kết quả'. Trả lỗi thực thi có cấu trúc (isError, có thể retry) giúp agent biết retry hoặc báo đúng tình trạng. A bắt cả trường hợp hết hàng thật cũng phải gọi lại, và vẫn không phân biệt được hai trường hợp. B làm mất kết nối, không mang thông tin. C chỉ làm lỗi hiếm hơn, khi xảy ra vẫn sai như cũ."
        },
        {
          q: "A platform team wants every developer's Claude Code to connect to the company GitHub MCP server when working in the monorepo. Each developer has a personal access token. Which setup is BEST?",
          options: [
            "Ask each developer to run claude mcp add with --scope user on their own machine.",
            "Commit a .mcp.json at the repository root whose server entry uses \"Authorization\": \"Bearer ${GITHUB_TOKEN}\", and have each developer export their own token.",
            "Commit a .mcp.json at the repository root containing a shared service-account token so setup is automatic.",
            "Add the server to ~/.claude.json on the CI runner so it propagates to developers."
          ],
          answer: 1,
          explain: ".mcp.json ở project scope được commit nên cả team có cùng cấu hình. Biến môi trường ${GITHUB_TOKEN} giữ secret ngoài repo. A làm được nhưng mỗi người tự cấu hình, dễ lệch nhau và không gắn với repo. C lộ secret trong version control. D sai: ~/.claude.json là cấu hình riêng của từng máy, không lan sang ai."
        },
        {
          q: "Which TWO statements about MCP server primitives are correct? (Choose TWO.)",
          options: [
            "Resources are model-controlled functions that Claude invokes to change external state.",
            "Resources provide read-only context identified by URIs, such as a database schema or documentation pages.",
            "Prompts are triggered automatically by the model whenever they seem relevant.",
            "Each tool must be listed individually in .mcp.json before Claude can use it.",
            "Prompts are user-invoked templates, and Claude Code surfaces them as slash commands."
          ],
          answer: [1, 4],
          explain: "Resource là dữ liệu chỉ đọc có URI, do ứng dụng điều khiển. Prompt là mẫu do người dùng gọi, và Claude Code hiển thị chúng như lệnh /mcp__server__prompt. A mô tả tool chứ không phải resource. C sai vì prompt cần người dùng gọi rõ ràng. D sai: client khám phá tool qua tools/list, còn .mcp.json chỉ khai báo server."
        },
        {
          q: "In a multi-agent research system, the synthesis agent has 18 tools, including web search, page fetch, database query, and file operations. It often launches new web searches instead of synthesizing the findings it was given, and sometimes calls the wrong tool. What is the BEST change?",
          options: [
            "Expand the descriptions of all 18 tools with detailed usage guidance so the synthesis agent understands exactly when each one should be used.",
            "Set tool_choice to any so the synthesis agent always calls a tool.",
            "Give it only the tools its role needs (plus a narrow fact-check tool) and route new research through the coordinator.",
            "Move the synthesis agent to a larger model that can manage more tools."
          ],
          answer: 2,
          explain: "Agent cầm quá nhiều tool ngoài vai trò sẽ dễ lạc đề và chọn nhầm. Thu hẹp bộ tool theo vai trò, thêm một tool kiểm chứng phạm vi hẹp, và đẩy nghiên cứu mới về coordinator. A không giải quyết việc agent có quyền làm việc ngoài vai trò. B còn ép nó gọi tool nhiều hơn. D tốn hơn mà không sửa thiết kế."
        },
        {
          q: "Claude Code's Edit tool fails on a file because the old_string Claude chose appears in three places. Which response is CORRECT?",
          options: [
            "Use a longer old_string that matches exactly one location, or set replace_all to change every occurrence.",
            "Escape all regex metacharacters in old_string, because the Edit tool performs regular-expression matching and treats some characters specially.",
            "Use the Grep tool, which can modify matching lines in place.",
            "Disable the uniqueness check in settings.json."
          ],
          answer: 0,
          explain: "Edit thay chuỗi chính xác và yêu cầu old_string xuất hiện đúng một lần. Cách xử lý là thêm ngữ cảnh cho duy nhất, hoặc dùng replace_all khi muốn thay hết. B sai: Edit không dùng regex. C sai: Grep chỉ tìm, không sửa. D: không có thiết lập như vậy."
        },
        {
          q: "A developer wants Claude Code to use the users table schema that the connected MCP server named \"postgres\" exposes as a resource. How should the developer include it in the prompt?",
          options: [
            "Run /mcp__postgres__users to insert the schema.",
            "Reference the resource with an @ mention such as @postgres:schema://users.",
            "Paste the schema into CLAUDE.md before every session so that it is always loaded into Claude's context automatically.",
            "Ask Claude to run claude mcp get postgres to read the schema."
          ],
          answer: 1,
          explain: "Resource của MCP được tham chiếu bằng @server:protocol://resource/path và được tự động lấy về đính kèm. A là cú pháp chạy prompt của MCP, không phải resource. C là thao tác thủ công, dễ lỗi thời. D chỉ hiển thị cấu hình server, không đọc resource."
        }
      ]
    },
    {
      id: "d3",
      name: "Claude Code Configuration & Workflows",
      weight: 20,
      intro: `<p>Domain này hỏi cách cấu hình Claude Code cho <em>cả team</em> chứ không chỉ một người: CLAUDE.md đặt ở đâu và nạp thế nào, rule theo đường dẫn trong <code>.claude/rules/</code>, skill và slash command, subagent, plan mode, permission, hook trong settings, và chạy Claude Code không tương tác trong CI với output có cấu trúc.</p>
<p>Ranh giới: thiết kế hook ở mức kiến trúc (vì sao cần cưỡng chế bằng code) đã nằm ở Domain 1. Cấu hình MCP server nằm ở Domain 2. Domain này tập trung vào <em>file nào, đặt ở đâu, ai thấy</em>.</p>`,
      lessons: [
        {
          id: "l-3-1",
          title: "Hệ thống CLAUDE.md, import và .claude/rules",
          minutes: 13,
          html: `<p>Mỗi phiên Claude Code bắt đầu với context trống. CLAUDE.md là file markdown chứa chỉ dẫn lâu dài (lệnh build/test, quy ước code, quyết định kiến trúc), được nạp vào đầu mỗi phiên. Câu hỏi thi hay xoay quanh: <strong>đặt file ở đâu thì ai thấy</strong>.</p>
<h4>Các vị trí và phạm vi</h4>
<table>
<thead><tr><th>Loại</th><th>Vị trí</th><th>Ai thấy</th></tr></thead>
<tbody>
<tr><td>Managed policy</td><td>macOS: <code>/Library/Application Support/ClaudeCode/CLAUDE.md</code>; Linux/WSL: <code>/etc/claude-code/CLAUDE.md</code>; Windows: <code>C:\\Program Files\\ClaudeCode\\CLAUDE.md</code></td><td>Mọi người dùng trên máy (do IT triển khai)</td></tr>
<tr><td>User</td><td><code>~/.claude/CLAUDE.md</code></td><td>Chỉ bạn, mọi project</td></tr>
<tr><td>Project</td><td><code>./CLAUDE.md</code> hoặc <code>./.claude/CLAUDE.md</code></td><td>Cả team, qua version control</td></tr>
<tr><td>Local</td><td><code>./CLAUDE.local.md</code> (thêm vào <code>.gitignore</code>)</td><td>Chỉ bạn, project này</td></tr>
</tbody>
</table>
<div class="warn">Tình huống kinh điển: một senior viết quy ước test vào <code>~/.claude/CLAUDE.md</code>, nên Claude của senior làm đúng còn Claude của người mới thì không. Lý do: file user không được chia sẻ. Hãy chuyển quy ước vào CLAUDE.md của project (hoặc <code>.claude/rules/</code>) và commit.</div>
<h4>Cách nạp</h4>
<ul>
<li>Claude Code nạp <code>CLAUDE.md</code> và <code>CLAUDE.local.md</code> ở thư mục làm việc <strong>và mọi thư mục cha</strong> ngay lúc khởi động. Các file được <strong>nối lại</strong> chứ không ghi đè nhau, theo thứ tự từ gốc hệ thống file xuống thư mục hiện tại, nên chỉ dẫn gần chỗ bạn khởi động được đọc sau cùng. Trong cùng một thư mục, <code>CLAUDE.local.md</code> đứng sau <code>CLAUDE.md</code>.</li>
<li>CLAUDE.md trong <strong>thư mục con</strong> không nạp lúc khởi động. Nó được nạp khi Claude đọc, ghi hoặc sửa một file trong thư mục con đó.</li>
<li>Hai chỉ dẫn mâu thuẫn nhau thì Claude có thể chọn tùy ý một cái. Nên rà soát định kỳ.</li>
<li>Docs khuyên giữ mỗi file <strong>dưới 200 dòng</strong>. File dài tốn context và giảm mức tuân thủ.</li>
</ul>
<h4>Import bằng <code>@path</code></h4>
<pre># CLAUDE.md
Xem tổng quan ở @README.md và các lệnh npm ở @package.json.
Quy trình git: @docs/git-workflow.md</pre>
<ul>
<li>Đường dẫn tương đối được tính từ <strong>file chứa lệnh import</strong>, không phải từ thư mục làm việc. Import lồng nhau được tối đa <strong>bốn tầng</strong>.</li>
<li>Viết trong code span (dấu backtick) thì không bị import.</li>
<li>Import giúp sắp xếp gọn nhưng <strong>không giảm chi phí context</strong>, vì file được import nạp cùng lúc với file chính.</li>
<li>Import trỏ ra ngoài thư mục làm việc (ví dụ <code>@~/.claude/my-notes.md</code>) trong file project sẽ hiện hộp thoại xin phép ở lần đầu.</li>
</ul>
<h4><code>.claude/rules/</code>: chỉ dẫn theo chủ đề và theo đường dẫn</h4>
<p>Với project lớn, tách chỉ dẫn thành nhiều file <code>.md</code> trong <code>.claude/rules/</code> (được tìm đệ quy, nên có thể chia <code>frontend/</code>, <code>backend/</code>). Rule <strong>không có</strong> frontmatter <code>paths</code> được nạp lúc khởi động, cùng mức ưu tiên với <code>.claude/CLAUDE.md</code>. Rule <strong>có</strong> <code>paths</code> chỉ nạp khi Claude làm việc với file khớp mẫu:</p>
<pre>---
paths:
  - "**/*.test.ts"
  - "src/**/*.{ts,tsx}"
---
# Quy ước test
- Dùng factory trong tests/factories, không tạo dữ liệu tay
- Mỗi test chỉ assert một hành vi</pre>
<p>Rule theo đường dẫn được nạp khi Claude dùng Read/Write/Edit trên file khớp. Nó hợp với quy ước <strong>rải khắp repo</strong> (mọi file test, mọi migration), những thứ không gắn với một thư mục duy nhất. Muốn dùng CLAUDE.md theo thư mục thì phải đặt bản sao ở hàng chục chỗ. Rule cá nhân cho mọi project đặt ở <code>~/.claude/rules/</code>.</p>
<h4>Công cụ hỗ trợ</h4>
<ul>
<li><code>/init</code>: phân tích codebase và tạo CLAUDE.md khởi đầu. Nếu file đã có thì gợi ý cải thiện chứ không ghi đè.</li>
<li><code>/memory</code>: liệt kê các file CLAUDE.md, CLAUDE.local.md và vị trí memory đang dùng, mở để sửa, bật/tắt auto memory.</li>
<li>Monorepo bị dính CLAUDE.md của team khác: dùng setting <code>claudeMdExcludes</code> (không loại được file managed).</li>
</ul>
<div class="tip">Nhớ nhanh: <strong>cả team cần</strong> thì project CLAUDE.md hoặc <code>.claude/rules/</code>, commit vào repo. <strong>Chỉ mình tôi</strong> thì <code>~/.claude/CLAUDE.md</code> hoặc <code>CLAUDE.local.md</code>. <strong>Chỉ khi chạm loại file X</strong> thì rule có <code>paths</code>.</div>`,
          keypoints: [
            "User (~/.claude/CLAUDE.md) không chia sẻ; project (./CLAUDE.md hoặc ./.claude/CLAUDE.md) chia sẻ qua git; CLAUDE.local.md là cá nhân.",
            "File ở thư mục hiện tại và thư mục cha nạp lúc khởi động, nối lại; file ở thư mục con nạp khi Claude chạm file trong đó.",
            "@path import tính từ file chứa nó, tối đa bốn tầng, không giảm chi phí context.",
            ".claude/rules/ có frontmatter paths (glob) thì chỉ nạp khi làm việc với file khớp; hợp cho quy ước rải khắp repo.",
            "Mỗi CLAUDE.md nên dưới 200 dòng; chỉ dẫn mâu thuẫn làm Claude chọn tùy ý."
          ],
          sources: [
            { t: "How Claude remembers your project", u: "https://code.claude.com/docs/en/memory" }
          ]
        },
        {
          id: "l-3-2",
          title: "Skill, slash command và subagent",
          minutes: 13,
          html: `<h4>Slash command đã gộp vào skill</h4>
<p>Docs hiện ghi: <strong>custom command đã được gộp vào skill</strong>. File <code>.claude/commands/deploy.md</code> và skill <code>.claude/skills/deploy/SKILL.md</code> đều tạo lệnh <code>/deploy</code> và hoạt động như nhau. File commands cũ vẫn chạy. Skill có thêm thư mục chứa file phụ trợ, frontmatter điều khiển ai được gọi, và khả năng để Claude tự nạp khi phù hợp.</p>
<table>
<thead><tr><th>Phạm vi</th><th>Đường dẫn</th></tr></thead>
<tbody>
<tr><td>Cá nhân (mọi project)</td><td><code>~/.claude/skills/&lt;tên&gt;/SKILL.md</code></td></tr>
<tr><td>Project (commit cho team)</td><td><code>.claude/skills/&lt;tên&gt;/SKILL.md</code></td></tr>
</tbody>
</table>
<pre>---
name: release-notes
description: Draft release notes from merged PRs for a given version tag
argument-hint: [version]
disable-model-invocation: true
allowed-tools: Bash(git log *), Bash(gh pr list *)
---
Viết release notes cho phiên bản $ARGUMENTS:
1. Liệt kê PR đã merge kể từ tag trước
2. Nhóm theo Features / Fixes / Breaking changes
3. Mỗi mục một dòng, kèm số PR</pre>
<h4>Frontmatter cần nhớ</h4>
<ul>
<li><code>description</code>: Claude dựa vào đây để quyết định khi nào dùng skill.</li>
<li><code>disable-model-invocation: true</code>: Claude <strong>không tự nạp</strong>, chỉ chạy khi người dùng gõ <code>/tên</code>. Hợp với quy trình có tác dụng phụ như deploy hay release.</li>
<li><code>user-invocable: false</code>: ẩn khỏi menu <code>/</code>, chỉ Claude được gọi.</li>
<li><code>allowed-tools</code>: tool được dùng không cần hỏi trong lượt gọi skill đó.</li>
<li><code>context: fork</code> (kèm <code>agent</code>): chạy skill trong context subagent tách riêng, giữ output dài dòng ngoài hội thoại chính.</li>
<li><code>argument-hint</code>, <code>model</code>; đối số qua <code>$ARGUMENTS</code>, <code>$ARGUMENTS[0]</code> hoặc viết tắt <code>$0</code>.</li>
</ul>
<p><strong>Nạp theo nhu cầu</strong>: ở phiên thường, chỉ <em>mô tả</em> skill nằm trong context. Nội dung đầy đủ chỉ nạp khi skill được dùng, nên tài liệu tham khảo dài gần như không tốn gì cho đến khi cần. Docs khuyên giữ <code>SKILL.md</code> dưới 500 dòng và tách tài liệu chi tiết ra file phụ.</p>
<p><strong>Skill hay CLAUDE.md?</strong> Docs gợi ý: tạo skill khi bạn cứ phải dán lại cùng một checklist hoặc quy trình nhiều bước, hoặc khi một phần CLAUDE.md đã thành <em>quy trình</em> thay vì <em>sự thật</em>. CLAUDE.md luôn nằm trong context. Skill chỉ vào khi cần.</p>
<h4>Subagent trong Claude Code</h4>
<p>Subagent là file markdown có frontmatter, đặt ở <code>.claude/agents/</code> (project) hoặc <code>~/.claude/agents/</code> (user). Chỉ <code>name</code> và <code>description</code> là bắt buộc.</p>
<pre>---
name: security-reviewer
description: Reviews diffs for injection, auth and secrets issues. Use proactively after code changes.
tools: Read, Grep, Glob
model: sonnet
---
You are a security reviewer. Report each finding with file, line, severity and fix.</pre>
<ul>
<li>Mỗi subagent chạy trong <strong>context window riêng</strong>, với system prompt, quyền tool và permission riêng, rồi chỉ trả <strong>bản tóm tắt</strong> về hội thoại chính.</li>
<li>Bỏ trống <code>tools</code> thì subagent thừa hưởng mọi tool dành cho subagent. Liệt kê thì chỉ có những tool đó.</li>
<li>Claude dựa vào <code>description</code> để giao việc. Thêm cụm như “use proactively” để khuyến khích giao chủ động.</li>
<li>Built-in: <strong>Explore</strong> (chỉ đọc, chuyên tìm kiếm và phân tích codebase), <strong>Plan</strong> (thu thập context trong plan mode), <strong>general-purpose</strong> (việc nhiều bước cần cả khám phá lẫn hành động).</li>
</ul>
<h4>Chọn đúng cơ chế</h4>
<table>
<thead><tr><th>Nhu cầu</th><th>Cơ chế</th></tr></thead>
<tbody>
<tr><td>Sự thật, quy ước luôn cần</td><td>CLAUDE.md</td></tr>
<tr><td>Quy ước cho một loại file</td><td><code>.claude/rules/</code> với <code>paths</code></td></tr>
<tr><td>Quy trình lặp lại, gọi theo yêu cầu</td><td>Skill / slash command</td></tr>
<tr><td>Việc tốn context, cần cách ly hoặc quyền hạn chế</td><td>Subagent</td></tr>
<tr><td>Bắt buộc 100%</td><td>Hook / permission</td></tr>
<tr><td>Kết nối hệ thống ngoài</td><td>MCP server</td></tr>
</tbody>
</table>
<div class="warn">Skill đặt ở <code>~/.claude/skills/</code> thì chỉ máy bạn có. Muốn cả team có lệnh <code>/review</code> thì đặt ở <code>.claude/skills/</code> (hoặc <code>.claude/commands/</code>) trong repo.</div>`,
          keypoints: [
            "Custom command đã gộp vào skill: .claude/commands/x.md và .claude/skills/x/SKILL.md đều tạo /x.",
            "Project skill ở .claude/skills/ (commit), cá nhân ở ~/.claude/skills/.",
            "disable-model-invocation: true thì chỉ người dùng gọi được; context: fork chạy trong subagent; $ARGUMENTS nhận đối số.",
            "Skill chỉ nạp mô tả lúc đầu, nội dung đầy đủ khi dùng; CLAUDE.md thì luôn nạp.",
            "Subagent ở .claude/agents/ hoặc ~/.claude/agents/, context riêng, trả tóm tắt; built-in Explore, Plan, general-purpose."
          ],
          sources: [
            { t: "Extend Claude with skills", u: "https://code.claude.com/docs/en/skills" },
            { t: "Create custom subagents", u: "https://code.claude.com/docs/en/sub-agents" }
          ]
        },
        {
          id: "l-3-3",
          title: "Plan mode, permission và settings",
          minutes: 12,
          html: `<h4>Plan mode hay làm thẳng?</h4>
<p>Ở <strong>plan mode</strong>, Claude đọc file và đề xuất kế hoạch nhưng <strong>không sửa gì</strong> cho đến khi bạn duyệt. Vào plan mode bằng <code>Shift+Tab</code> (đến khi thanh trạng thái báo plan mode) hoặc <code>claude --permission-mode plan</code>.</p>
<table>
<thead><tr><th>Nên dùng plan mode</th><th>Làm thẳng là đủ</th></tr></thead>
<tbody>
<tr><td>Thay đổi nhiều file, nhiều module</td><td>Sửa lỗi một file, có stack trace rõ</td></tr>
<tr><td>Có nhiều cách làm hợp lý, cần chọn hướng</td><td>Yêu cầu cụ thể, chỉ có một cách làm hiển nhiên</td></tr>
<tr><td>Quyết định kiến trúc, migration lớn</td><td>Đổi tên biến, thêm một kiểm tra null</td></tr>
<tr><td>Codebase lạ, cần khám phá trước</td><td>Việc nhỏ đã hiểu rõ</td></tr>
</tbody>
</table>
<p>Kết hợp thường gặp: plan mode để khám phá và chốt hướng, rồi chuyển sang làm thẳng để triển khai. Khám phá sinh ra nhiều output thì giao cho subagent (như Explore) để context chính chỉ nhận bản tóm tắt.</p>
<h4>Permission mode</h4>
<table>
<thead><tr><th>Mode</th><th>Hành vi</th></tr></thead>
<tbody>
<tr><td><code>default</code> (Manual)</td><td>Hỏi trước các thao tác cần duyệt</td></tr>
<tr><td><code>acceptEdits</code></td><td>Tự chấp nhận sửa file và các lệnh file thông dụng (<code>mkdir</code>, <code>mv</code>, <code>cp</code>…) trong thư mục làm việc</td></tr>
<tr><td><code>plan</code></td><td>Chỉ đọc và chạy lệnh shell chỉ đọc để khám phá, không sửa source</td></tr>
<tr><td><code>auto</code></td><td>Một classifier xem xét hành động thay cho việc hỏi bạn</td></tr>
<tr><td><code>dontAsk</code></td><td>Tự từ chối mọi thứ lẽ ra phải hỏi; chỉ chạy những gì đã được cho phép trước</td></tr>
<tr><td><code>bypassPermissions</code></td><td>Bỏ qua lời hỏi (trừ một số hành động không mode nào tự duyệt); chỉ dùng trong môi trường cô lập</td></tr>
</tbody>
</table>
<h4>Permission rule</h4>
<pre>{
  "permissions": {
    "allow": ["Bash(npm run lint)", "Bash(npm run test *)"],
    "ask":   ["Bash(git push *)"],
    "deny":  ["Read(./.env)", "Read(./.env.*)"]
  }
}</pre>
<ul>
<li>Thứ tự đánh giá: <strong>deny, rồi ask, rồi allow</strong>. Khớp đầu tiên theo thứ tự đó quyết định kết quả. Độ cụ thể của rule <em>không</em> thay đổi thứ tự này.</li>
<li>Một rule <code>allow</code> <strong>không thể</strong> khoét ngoại lệ trong rule <code>deny</code>. Ví dụ <code>Bash(aws *)</code> trong deny chặn cả <code>aws s3 ls</code> dù có allow riêng.</li>
<li><code>Bash(npm run *)</code> khớp <code>npm run build</code>, <code>npm run test --watch</code> nhưng không khớp <code>npm install</code>. Dấu cách trước <code>*</code> quan trọng.</li>
</ul>
<h4>File settings và thứ tự ưu tiên</h4>
<table>
<thead><tr><th>Mức (cao xuống thấp)</th><th>File</th></tr></thead>
<tbody>
<tr><td>1. Managed</td><td><code>managed-settings.json</code>, MDM, server-managed</td></tr>
<tr><td>2. Command line</td><td><code>--settings &lt;file-or-json&gt;</code> (chỉ cho phiên đó)</td></tr>
<tr><td>3. Project local</td><td><code>.claude/settings.local.json</code> (không commit)</td></tr>
<tr><td>4. Shared project</td><td><code>.claude/settings.json</code> (commit cho team)</td></tr>
<tr><td>5. User</td><td><code>~/.claude/settings.json</code></td></tr>
</tbody>
</table>
<p>Key đơn lẻ thì mức cao hơn thắng. Riêng danh sách như <code>permissions.allow</code> thì được <strong>gộp</strong> qua các mức. Hook cũng khai báo trong các file này (cộng thêm plugin, frontmatter của skill hay subagent). Đặt hook trong <code>.claude/settings.json</code> nếu muốn cả team dùng.</p>
<div class="tip">Câu hỏi “chặn đọc file bí mật cho cả team” có đáp án là rule <code>deny</code> trong <code>.claude/settings.json</code> được commit (hoặc managed settings nếu là chính sách toàn công ty). Không phải dòng dặn trong CLAUDE.md.</div>
<div class="warn">Chọn “Yes, and don't ask again” chỉ lưu rule <code>allow</code> vào file local của bạn. Rule đó không vượt qua được rule <code>ask</code>/<code>deny</code> ở project hay managed.</div>`,
          keypoints: [
            "Plan mode: đọc và đề xuất, không sửa cho đến khi duyệt; dùng cho thay đổi lớn, nhiều cách làm, codebase lạ.",
            "Việc nhỏ, rõ ràng thì làm thẳng; khám phá tốn context thì giao subagent Explore.",
            "Permission rule đánh giá deny, rồi ask, rồi allow; allow không khoét được ngoại lệ trong deny.",
            "Ưu tiên settings từ cao xuống thấp: managed, --settings, .claude/settings.local.json, .claude/settings.json, ~/.claude/settings.json; danh sách thì gộp.",
            "Mode: default, acceptEdits, plan, auto, dontAsk, bypassPermissions (chỉ trong môi trường cô lập)."
          ],
          sources: [
            { t: "Common workflows (plan mode)", u: "https://code.claude.com/docs/en/common-workflows" },
            { t: "Configure permissions", u: "https://code.claude.com/docs/en/permissions" },
            { t: "Settings files and precedence", u: "https://code.claude.com/docs/en/settings" }
          ]
        },
        {
          id: "l-3-4",
          title: "Claude Code trong CI: chế độ -p và output có cấu trúc",
          minutes: 13,
          html: `<p>Trong CI không có ai ngồi trả lời câu hỏi. Claude Code phải chạy <strong>không tương tác</strong>, xong thì thoát, và trả output máy đọc được.</p>
<h4>Chế độ không tương tác</h4>
<pre>claude -p "Find and fix the bug in auth.py" --allowedTools "Read,Edit,Bash"</pre>
<ul>
<li><code>-p</code> / <code>--print</code>: chạy không tương tác rồi thoát. Thành công trả exit code 0, thất bại trả mã khác 0, nên script rẽ nhánh được.</li>
<li>Đọc được stdin: <code>gh pr diff "$1" | claude -p "..."</code>. Pipe diff vào nghĩa là Claude không cần quyền Bash để tự đọc diff. Docs ghi stdin được pipe giới hạn 10MB.</li>
<li><code>--allowedTools</code>: tool chạy không cần hỏi, theo cú pháp permission rule, ví dụ <code>"Bash(git diff *),Read"</code>. Trong <code>-p</code> ở Manual mode, lời gọi cần duyệt mà không được cho phép sẽ bị từ chối.</li>
<li><code>--permission-mode dontAsk</code>: docs mô tả là hữu ích cho CI bị khóa chặt (từ chối mọi thứ lẽ ra phải hỏi). <code>acceptEdits</code> cho phép sửa file mà không hỏi.</li>
<li><code>--max-turns</code> giới hạn số lượt, <code>--max-budget-usd</code> giới hạn chi phí ước tính (cả hai chỉ dùng ở print mode).</li>
<li><code>--append-system-prompt</code> thêm chỉ dẫn mà vẫn giữ hành vi mặc định. <code>--system-prompt</code> thay toàn bộ system prompt.</li>
</ul>
<h4>Output có cấu trúc</h4>
<table>
<thead><tr><th><code>--output-format</code></th><th>Kết quả</th></tr></thead>
<tbody>
<tr><td><code>text</code> (mặc định)</td><td>Văn bản thuần</td></tr>
<tr><td><code>json</code></td><td>JSON có <code>result</code>, <code>session_id</code>, metadata (kể cả <code>total_cost_usd</code>)</td></tr>
<tr><td><code>stream-json</code></td><td>JSON từng dòng để stream thời gian thực</td></tr>
</tbody>
</table>
<pre>claude -p "Review this diff. Report each issue." \\
  --output-format json \\
  --json-schema '{"type":"object","properties":{"findings":{"type":"array","items":{"type":"object","properties":{"file":{"type":"string"},"line":{"type":"integer"},"severity":{"type":"string","enum":["low","medium","high"]},"message":{"type":"string"}},"required":["file","line","severity","message"]}}},"required":["findings"]}' \\
  | jq '.structured_output.findings'</pre>
<ul>
<li>Với <code>--json-schema</code>, kết quả theo schema nằm ở trường <strong><code>structured_output</code></strong>.</li>
<li>Nếu lần chạy kết thúc mà không có output hợp lệ (ví dụ Claude từ chối), sẽ <strong>không có</strong> trường <code>structured_output</code>. Script phải kiểm tra trước khi dùng.</li>
<li>Từ khóa <code>format</code> (như <code>"format": "email"</code>) chỉ là chú thích, không được cưỡng chế.</li>
</ul>
<h4>Tái lập được: <code>--bare</code></h4>
<p>Không có <code>--bare</code>, <code>claude -p</code> tự phát hiện và nạp hook, skill, plugin, MCP server, auto memory và CLAUDE.md như phiên tương tác. Điều đó gồm cả <code>.claude/settings.json</code> và <code>.mcp.json</code> của project, mà không có hộp thoại trust. <code>--bare</code> bỏ qua tất cả để mọi máy cho cùng kết quả. Thứ cần dùng thì truyền tường minh qua cờ như <code>--append-system-prompt-file</code>, <code>--settings</code>, <code>--mcp-config</code>, <code>--agents</code>. Docs gọi đây là chế độ khuyên dùng cho lời gọi từ script và SDK. Lưu ý ở bare mode, hook không chạy, kể cả khi truyền qua <code>--settings</code>.</p>
<div class="tip">Muốn Claude trong CI hiểu chuẩn của project (tiêu chí review, quy ước test, fixture có sẵn) thì có hai cách: để phiên thường nạp CLAUDE.md của repo, hoặc ở bare mode thì truyền file chỉ dẫn bằng <code>--append-system-prompt-file</code>. Đừng để nó đoán.</div>
<h4>Nhiều bước và review độc lập</h4>
<ul>
<li>Lấy <code>session_id</code> từ output JSON rồi <code>--resume "$session_id"</code> để nối các bước. <code>--continue</code> nối phiên gần nhất.</li>
<li>Phiên đã <em>viết</em> code thường kém trong việc tự phát hiện lỗi của chính nó, vì nó mang theo lập luận lúc viết. Hãy chạy review bằng một lần gọi <strong>độc lập</strong> (phiên mới, không có lịch sử viết code).</li>
<li>Khi review chạy lại sau mỗi commit, đưa danh sách phát hiện cũ vào prompt và yêu cầu chỉ báo vấn đề mới hoặc chưa sửa, để tránh bình luận trùng lặp.</li>
</ul>
<div class="warn">Bẫy: chạy <code>claude</code> không có <code>-p</code> trong CI (treo chờ input), hoặc parse văn bản tự do bằng regex thay vì dùng <code>--output-format json</code> và <code>--json-schema</code>.</div>`,
          keypoints: [
            "-p chạy không tương tác rồi thoát, exit code 0 khi thành công; đọc được stdin.",
            "--output-format text | json | stream-json; json có result và session_id.",
            "--json-schema đưa kết quả vào structured_output; kiểm tra trường này có tồn tại trước khi dùng.",
            "--bare bỏ qua hook, skill, MCP, CLAUDE.md để tái lập; truyền context tường minh bằng cờ.",
            "Review bằng phiên độc lập; truyền phát hiện cũ để tránh bình luận trùng."
          ],
          sources: [
            { t: "Run Claude Code programmatically", u: "https://code.claude.com/docs/en/headless" },
            { t: "CLI reference", u: "https://code.claude.com/docs/en/cli-reference" }
          ]
        }
      ],
      cheat: [
        ["Quy ước cả team cần", "./CLAUDE.md hoặc ./.claude/CLAUDE.md, hoặc .claude/rules/; commit vào repo"],
        ["~/.claude/CLAUDE.md", "Chỉ máy bạn, mọi project; không chia sẻ"],
        ["CLAUDE.local.md", "Cá nhân, project hiện tại; thêm vào .gitignore"],
        ["CLAUDE.md thư mục con", "Nạp khi Claude đọc/ghi/sửa file trong thư mục đó"],
        ["@path import", "Tương đối theo file chứa nó; tối đa 4 tầng; không giảm context"],
        ["Quy ước cho **/*.test.ts", ".claude/rules/x.md với frontmatter paths"],
        ["/deploy cho cả team, chỉ gọi tay", ".claude/skills/deploy/SKILL.md với disable-model-invocation: true"],
        ["Subagent", ".claude/agents/ (project) hoặc ~/.claude/agents/ (user); context riêng, trả tóm tắt"],
        ["Plan mode", "Shift+Tab hoặc --permission-mode plan; cho thay đổi lớn hoặc nhiều hướng"],
        ["Thứ tự permission", "deny, rồi ask, rồi allow; allow không khoét được deny"],
        ["CI", "claude -p --output-format json --json-schema ... rồi đọc .structured_output"],
        ["CI tái lập", "--bare cùng --append-system-prompt-file / --mcp-config / --settings"]
      ],
      quiz: [
        {
          q: "A senior engineer's Claude Code sessions consistently follow the team's testing conventions, but a newly onboarded engineer's sessions in the same repository ignore them. The senior engineer wrote the conventions in ~/.claude/CLAUDE.md. What should the team do?",
          options: [
            "Have the new engineer copy the senior engineer's ~/.claude/CLAUDE.md onto their own machine so both sessions load identical instructions.",
            "Move the conventions to a CLAUDE.local.md file at the repository root.",
            "Add the conventions to the project's .mcp.json so they load for everyone.",
            "Move the conventions into the project's CLAUDE.md (or a file in .claude/rules/) and commit it to the repository."
          ],
          answer: 3,
          explain: "~/.claude/CLAUDE.md là file cấp user, chỉ máy người viết có. Quy ước cả team cần phải nằm ở CLAUDE.md của project hoặc .claude/rules/ và được commit. A chạy được tạm thời nhưng không bền: người mới sau lại thiếu, sửa một nơi không đồng bộ nơi khác. B: CLAUDE.local.md là file cá nhân, nên bị gitignore. C: .mcp.json dùng để cấu hình MCP server, không chứa chỉ dẫn."
        },
        {
          q: "A repository has test files spread across dozens of directories (**/*.test.ts). The team wants specific testing conventions applied whenever Claude works on a test file, without adding those instructions to every session's context. What is the BEST approach?",
          options: [
            "Place a CLAUDE.md containing the conventions in every directory that contains tests.",
            "Create a rule file in .claude/rules/ with paths frontmatter matching \"**/*.test.ts\".",
            "Add a Testing section to the root CLAUDE.md.",
            "Create a skill with disable-model-invocation: true and ask developers to run it before editing tests."
          ],
          answer: 1,
          explain: "Rule có paths chỉ nạp khi Claude làm việc với file khớp mẫu, nên hợp với quy ước rải khắp repo. A phải nhân bản file ở hàng chục chỗ, khó bảo trì. C luôn nạp vào mọi phiên, trái với yêu cầu. D bắt người dùng nhớ gọi tay, dễ quên."
        },
        {
          q: "A team wants a shared /release-notes command that takes a version number as an argument. It should run only when a developer explicitly types the command, never because Claude decides it is relevant. Where and how should it be defined?",
          options: [
            "In ~/.claude/skills/release-notes/SKILL.md on each developer's machine.",
            "As a paragraph in the root CLAUDE.md describing how to write release notes when asked.",
            "Commit .claude/skills/release-notes/SKILL.md with disable-model-invocation: true, using $ARGUMENTS for the version.",
            "Define it as a subagent in .claude/agents/release-notes.md whose description tells Claude to use it proactively whenever release notes come up."
          ],
          answer: 2,
          explain: "Skill cấp project (.claude/skills/, commit) thì cả team có. disable-model-invocation: true ngăn Claude tự gọi. $ARGUMENTS nhận số phiên bản. A là skill cá nhân, không chia sẻ. B không tạo lệnh và luôn tốn context. D ngược yêu cầu: 'use proactively' khuyến khích Claude tự giao việc."
        },
        {
          q: "A developer asks Claude Code to migrate the project's logging library across roughly 45 files. There are several reasonable strategies (a wrapper module, direct replacement, or a phased rollout), and the team wants to agree on one before any file changes. How should the developer proceed?",
          options: [
            "Start in plan mode: let Claude explore and propose a strategy for review, then execute the approved plan.",
            "Switch to acceptEdits mode so the migration can finish quickly without interruptions, and then review the complete diff once at the end.",
            "Ask Claude to start editing file by file and stop if the approach looks wrong.",
            "Run the migration with claude -p in CI so it does not consume the developer's session."
          ],
          answer: 0,
          explain: "Thay đổi lớn, nhiều file, nhiều hướng hợp lý: đúng trường hợp dùng plan mode để khám phá và chốt hướng trước khi sửa. B và C sửa trước rồi mới bàn hướng, dễ phải làm lại cả loạt file. D không giải quyết nhu cầu thống nhất hướng trước khi sửa."
        },
        {
          q: "A CI pipeline should run Claude Code on each pull request, then post its findings as inline review comments. The job must never hang waiting for input, and the posting script needs machine-parseable results. Which TWO choices meet these requirements? (Choose TWO.)",
          options: [
            "Run claude interactively inside a tmux session on the CI runner.",
            "Use --continue on every run so Claude remembers all previous pull requests.",
            "Run Claude Code with -p (print mode) so it executes non-interactively and exits.",
            "Use --output-format json with --json-schema, and read the structured_output field.",
            "Capture plain-text output and extract findings with regular expressions."
          ],
          answer: [2, 3],
          explain: "-p chạy không tương tác rồi thoát. --output-format json kèm --json-schema cho kết quả theo schema trong structured_output. A vẫn là phiên tương tác, có thể treo. B làm context phình to và lẫn giữa các PR, không liên quan tới yêu cầu. E là cách parse dễ gãy."
        },
        {
          q: "A project's committed .claude/settings.json contains the permission rule deny: [\"Read(./.env)\"]. A developer adds allow: [\"Read(./.env)\"] to their own .claude/settings.local.json. What happens when Claude tries to read .env?",
          options: [
            "The read is allowed, because .claude/settings.local.json has higher precedence than the shared .claude/settings.json file.",
            "The read is allowed, because allow rules are evaluated before deny rules.",
            "Claude prompts the developer each time, because conflicting rules fall back to ask.",
            "The read is still blocked: deny rules are checked first, and allow cannot override a matching deny."
          ],
          answer: 3,
          explain: "Permission rule được đánh giá theo thứ tự deny, rồi ask, rồi allow, và allow không khoét được ngoại lệ trong deny. Các danh sách rule được gộp qua các file. A nhầm giữa ưu tiên của key đơn lẻ và cách rule permission kết hợp. B sai thứ tự đánh giá. C: không có cơ chế 'xung đột thì hỏi'."
        },
        {
          q: "While investigating how token refresh works in a large monorepo, a developer's main Claude Code session fills up with dozens of file reads, and later answers become less precise. What is the BEST way to do this kind of investigation?",
          options: [
            "Run /clear after each file read to keep the context small.",
            "Paste the findings into CLAUDE.md as you go so that they are always loaded and Claude never needs to re-read those files again.",
            "Have a subagent (e.g., Explore) do the investigation in its own context and return a summary.",
            "Increase MAX_MCP_OUTPUT_TOKENS so more file content fits in context."
          ],
          answer: 2,
          explain: "Subagent đọc file trong context riêng và chỉ trả bản tóm tắt, nên context chính sạch. A mất luôn những gì vừa tìm được. B nhồi chi tiết tạm thời vào file luôn được nạp, tốn context mọi phiên. D không liên quan (đó là giới hạn output của tool MCP) và còn làm context đầy hơn."
        },
        {
          q: "A team's nightly claude -p job produces different results on different runners. Investigation shows some runners load extra hooks and MCP servers from configuration lying around on the machine. The team wants every run to behave the same. What should they do?",
          options: [
            "Add --verbose so differences between runners are logged.",
            "Run with --bare and pass the required context explicitly, for example with --append-system-prompt-file and --mcp-config.",
            "Add --continue so each run reuses the previous night's session.",
            "Add --fork-session so each run starts from a clean branch of the conversation."
          ],
          answer: 1,
          explain: "--bare bỏ qua việc tự phát hiện hook, skill, plugin, MCP, CLAUDE.md, nên mọi máy chạy giống nhau. Thứ cần dùng thì truyền tường minh qua cờ. A chỉ ghi log, không sửa. C và D liên quan tới lịch sử hội thoại, không liên quan tới cấu hình được nạp từ máy."
        }
      ]
    },
    {
      id: "d4",
      name: "Prompt Engineering & Structured Output",
      weight: 20,
      intro: `<p>Domain này hỏi cách viết prompt cho hệ thống chạy thật: tiêu chí rõ ràng thay cho lời dặn mơ hồ, few-shot đúng chỗ, cấu trúc prompt bằng XML, ép output có cấu trúc bằng tool hoặc JSON schema, vòng lặp validate rồi retry, đánh đổi khi dùng Message Batches API, và review nhiều lượt.</p>
<p>Ranh giới: viết mô tả tool để Claude <em>chọn đúng tool</em> thuộc Domain 2. Ở đây tool được dùng như một <em>khuôn output</em>. Độ tin cậy khi context dài và hiệu chuẩn confidence thuộc Domain 5.</p>`,
      lessons: [
        {
          id: "l-4-1",
          title: "Tiêu chí rõ ràng và few-shot",
          minutes: 12,
          html: `<h4>“Hãy thận trọng” không phải là tiêu chí</h4>
<p>Một bot review code được dặn “be conservative, only report important issues” vẫn đăng hàng chục bình luận về đặt tên biến. Dev bắt đầu phớt lờ bot, kể cả khi nó bắt được lỗi thật. Gốc rễ: “quan trọng” chưa được định nghĩa. Model phải tự đoán ranh giới, và mỗi lần đoán một kiểu.</p>
<p>Cách sửa là viết <strong>tiêu chí tường minh</strong>: báo gì, bỏ gì, và mức nghiêm trọng nghĩa là gì, kèm ví dụ cụ thể.</p>
<pre>&lt;review_criteria&gt;
BÁO CÁO:
- Lỗi logic làm sai kết quả (điều kiện đảo ngược, off-by-one, thiếu xử lý null)
- Lỗ hổng bảo mật (SQL injection, lộ secret, thiếu kiểm tra quyền)
- Thay đổi phá vỡ API công khai

BỎ QUA:
- Style, format, đặt tên (linter đã lo)
- Gợi ý refactor "cho đẹp" không đổi hành vi

MỨC ĐỘ:
- high: gây lỗi dữ liệu hoặc bảo mật ở production. Ví dụ: query ghép chuỗi từ input người dùng
- medium: sai ở edge case. Ví dụ: chia cho 0 khi danh sách rỗng
&lt;/review_criteria&gt;</pre>
<p>Docs prompting cũng khuyên <strong>giải thích lý do</strong> đằng sau chỉ dẫn. Ví dụ thay vì “không dùng dấu ba chấm”, hãy nói “output sẽ được đọc bằng text-to-speech nên đừng dùng dấu ba chấm”. Claude khái quát được từ lời giải thích. Với hệ review, nói rõ “bình luận sai làm dev mất niềm tin vào công cụ” giúp model cân nhắc false positive.</p>
<div class="tip">Một danh mục cứ sinh false positive thì tạm tắt nó trong khi cải thiện prompt cho danh mục đó. Đừng để nó làm mất niềm tin vào các danh mục đang chạy tốt.</div>
<div class="warn">Đáp án nhiễu hay gặp: “chỉ báo khi confidence &gt; 90%”. Ngưỡng tự tin do model tự báo không định nghĩa được <em>loại</em> vấn đề cần báo, và cũng không được hiệu chuẩn.</div>
<h4>Few-shot: khi mô tả bằng lời chưa đủ</h4>
<p>Theo docs, ví dụ là một trong những cách đáng tin nhất để điều khiển <strong>định dạng, giọng điệu và cấu trúc</strong> output. Vài ví dụ tốt (few-shot, multishot) tăng độ chính xác và tính nhất quán. Ví dụ nên:</p>
<ul>
<li><strong>Liên quan</strong>: sát với tình huống thật.</li>
<li><strong>Đa dạng</strong>: phủ edge case, khác nhau đủ để Claude không bắt chước một mẫu ngoài ý muốn.</li>
<li><strong>Có cấu trúc</strong>: bọc trong <code>&lt;example&gt;</code> (nhiều ví dụ thì trong <code>&lt;examples&gt;</code>) để tách khỏi chỉ dẫn.</li>
<li>Docs gợi ý <strong>3–5 ví dụ</strong> cho kết quả tốt nhất.</li>
</ul>
<h4>Đặt ví dụ vào chỗ mơ hồ</h4>
<p>Ví dụ có giá trị nhất khi nằm ở <strong>ranh giới khó phân định</strong>, không phải trường hợp hiển nhiên. Phân loại ticket “billing” hay “account”: thêm ví dụ cho ca rõ ràng gần như vô ích. Ví dụ cho ca lưng chừng, kèm một câu giải thích <em>vì sao</em> chọn nhãn đó, giúp model khái quát sang ca mới thay vì chỉ bắt chước bề mặt.</p>
<pre>&lt;examples&gt;
&lt;example&gt;
Ticket: "Tôi bị trừ tiền hai lần sau khi đổi email đăng nhập"
Label: billing
Lý do: vấn đề cốt lõi là giao dịch trùng; đổi email chỉ là bối cảnh.
&lt;/example&gt;
&lt;example&gt;
Ticket: "Không đăng nhập được nên không xem được hóa đơn"
Label: account
Lý do: cần khôi phục quyền truy cập trước; hóa đơn không có lỗi.
&lt;/example&gt;
&lt;/examples&gt;</pre>
<h4>Few-shot trong trích xuất dữ liệu</h4>
<ul>
<li>Thêm ví dụ tài liệu <strong>thiếu</strong> một trường, với output mong đợi là <code>null</code>. Ví dụ này dạy model không bịa giá trị.</li>
<li>Thêm ví dụ cho các <strong>định dạng khác nhau</strong> của cùng một thông tin (ngày viết kiểu Mỹ và kiểu châu Âu, số tiền có hoặc không có ký hiệu tiền tệ) cùng output đã chuẩn hóa.</li>
</ul>`,
          keypoints: [
            "Thay lời dặn mơ hồ ('thận trọng', 'quan trọng') bằng tiêu chí tường minh: báo gì, bỏ gì, mức độ, kèm ví dụ.",
            "Giải thích lý do đằng sau chỉ dẫn để Claude khái quát được.",
            "Few-shot nên liên quan, đa dạng, bọc trong thẻ example; docs gợi ý 3–5 ví dụ.",
            "Ví dụ có giá trị nhất ở ca mơ hồ, kèm lý do chọn nhãn.",
            "Trích xuất: ví dụ có trường thiếu thì ra null; ví dụ cho các định dạng khác nhau."
          ],
          sources: [
            { t: "Prompting best practices", u: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" }
          ]
        },
        {
          id: "l-4-2",
          title: "Cấu trúc prompt bằng XML và tài liệu dài",
          minutes: 11,
          html: `<p>Prompt trong hệ thống thật thường trộn nhiều loại nội dung: chỉ dẫn, bối cảnh, ví dụ, dữ liệu đầu vào biến đổi theo từng request. Docs cho biết thẻ XML giúp Claude phân tích các prompt như vậy <strong>không mơ hồ</strong>: bọc mỗi loại nội dung trong một thẻ riêng (<code>&lt;instructions&gt;</code>, <code>&lt;context&gt;</code>, <code>&lt;input&gt;</code>) giảm hiểu nhầm.</p>
<h4>Nguyên tắc dùng thẻ</h4>
<ul>
<li>Tên thẻ <strong>nhất quán, mô tả rõ</strong> nội dung, dùng giống nhau giữa các prompt.</li>
<li><strong>Lồng thẻ</strong> khi nội dung có thứ bậc tự nhiên (các <code>&lt;document&gt;</code> nằm trong <code>&lt;documents&gt;</code>).</li>
<li>Nhắc tới thẻ trong chỉ dẫn: “dựa vào hợp đồng trong thẻ <code>&lt;contract&gt;</code>…”.</li>
<li>Tách rõ <em>chỉ dẫn</em> với <em>dữ liệu</em>. Nội dung từ nguồn không tin cậy (email khách gửi, trang web) chỉ là dữ liệu cần xử lý, không phải lệnh. Docs tool use khuyên giữ nội dung không tin cậy trong khối <code>tool_result</code>, đừng đưa vào system prompt.</li>
</ul>
<h4>Tài liệu dài: đặt dữ liệu lên đầu</h4>
<p>Với input lớn, docs khuyên:</p>
<ol>
<li><strong>Đặt tài liệu dài ở đầu prompt</strong>, phía trên câu hỏi, chỉ dẫn và ví dụ. Docs ghi trong thử nghiệm, đặt câu hỏi ở cuối có thể cải thiện chất lượng tới khoảng 30%, nhất là với input nhiều tài liệu phức tạp.</li>
<li><strong>Bọc mỗi tài liệu</strong> trong <code>&lt;document&gt;</code> với thẻ con <code>&lt;source&gt;</code> và <code>&lt;document_content&gt;</code> (và metadata khác).</li>
<li><strong>Yêu cầu trích dẫn trước</strong>: bảo Claude trích các đoạn liên quan ra trước, rồi mới làm nhiệm vụ. Việc này giúp tập trung vào phần liên quan và bỏ qua phần còn lại.</li>
</ol>
<pre>&lt;documents&gt;
  &lt;document index="1"&gt;
    &lt;source&gt;master_services_agreement_2024.pdf&lt;/source&gt;
    &lt;document_content&gt;
      {{CONTRACT_TEXT}}
    &lt;/document_content&gt;
  &lt;/document&gt;
  &lt;document index="2"&gt;
    &lt;source&gt;amendment_03.pdf&lt;/source&gt;
    &lt;document_content&gt;
      {{AMENDMENT_TEXT}}
    &lt;/document_content&gt;
  &lt;/document&gt;
&lt;/documents&gt;

&lt;instructions&gt;
1. Trích nguyên văn mọi điều khoản về chấm dứt hợp đồng và phạt vi phạm vào thẻ &lt;quotes&gt;,
   ghi rõ tài liệu nguồn và số điều.
2. Dựa CHỈ trên các trích dẫn đó, trả lời câu hỏi trong &lt;question&gt;.
3. Nếu bản sửa đổi thay thế điều khoản gốc, nói rõ điều này.
&lt;/instructions&gt;

&lt;question&gt;Bên mua có thể chấm dứt sớm không mất phí trong trường hợp nào?&lt;/question&gt;</pre>
<h4>Điều khiển định dạng output</h4>
<p>Docs nêu vài cách hiệu quả:</p>
<ul>
<li><strong>Nói điều cần làm thay vì điều cấm</strong>: thay “đừng dùng markdown” bằng “viết thành các đoạn văn liền mạch”.</li>
<li><strong>Dùng thẻ XML làm chỉ báo định dạng</strong>: yêu cầu đặt phần kết luận trong <code>&lt;answer&gt;</code> để code dễ tách.</li>
<li><strong>Cho phong cách prompt khớp với output mong muốn</strong>: prompt đầy markdown dễ kéo theo output đầy markdown.</li>
</ul>
<div class="tip">Hệ thống cần <em>code</em> đọc output thì thẻ XML là bước đệm tốt. Nhưng nếu cần bảo đảm cấu trúc thì dùng tool/JSON schema (bài sau). XML trong prompt giúp tổ chức, không bảo đảm output đúng khuôn.</div>
<div class="warn">Chia tài liệu dài thành nhiều lời gọi song song rồi nối kết quả nghe có vẻ hay, nhưng dễ làm mất liên kết chéo (bản sửa đổi ở tài liệu 2 thay thế điều 7 ở tài liệu 1). Nếu tài liệu vừa context, sắp xếp prompt cho tốt thường là bước đầu tiên đúng.</div>`,
          keypoints: [
            "Bọc từng loại nội dung (chỉ dẫn, bối cảnh, ví dụ, input) trong thẻ XML riêng, tên nhất quán, lồng khi có thứ bậc.",
            "Tài liệu dài đặt ở đầu prompt, câu hỏi và chỉ dẫn ở cuối.",
            "Mỗi tài liệu bọc trong thẻ document, kèm thẻ con source và document_content.",
            "Yêu cầu trích dẫn đoạn liên quan trước khi trả lời để tập trung và có căn cứ.",
            "Nói điều cần làm thay vì điều cấm; XML giúp tổ chức nhưng không bảo đảm cấu trúc output."
          ],
          sources: [
            { t: "Prompting best practices", u: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" },
            { t: "Handle tool calls (untrusted content)", u: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls" }
          ]
        },
        {
          id: "l-4-3",
          title: "Output có cấu trúc: tool_use, JSON schema và vòng validate rồi retry",
          minutes: 14,
          html: `<p>Pipeline trích xuất hóa đơn cần JSON đúng schema cho <em>mọi</em> tài liệu. Dặn “chỉ trả về JSON” trong prompt chạy được phần lớn thời gian, nhưng thỉnh thoảng có câu dẫn thừa, thiếu dấu ngoặc, hoặc thiếu trường. Ở quy mô lớn, “thỉnh thoảng” nghĩa là hàng trăm lỗi parse mỗi ngày.</p>
<h4>Hai cách bảo đảm cấu trúc</h4>
<table>
<thead><tr><th>Cách</th><th>Cơ chế</th><th>Dùng khi</th></tr></thead>
<tbody>
<tr><td><strong>Tool làm khuôn output</strong></td><td>Định nghĩa tool (ví dụ <code>record_invoice</code>) có <code>input_schema</code> là schema mong muốn; dữ liệu nằm trong <code>input</code> của khối <code>tool_use</code>. Thêm <code>strict: true</code> để bảo đảm input khớp schema</td><td>Đã có kiến trúc tool, cần chọn giữa nhiều schema</td></tr>
<tr><td><strong>JSON outputs</strong></td><td><code>output_config.format</code> với <code>type: "json_schema"</code>; response chính là JSON theo schema</td><td>Chỉ cần câu trả lời theo một khuôn cố định</td></tr>
</tbody>
</table>
<p>Docs gọi chung hai tính năng này là <strong>structured outputs</strong>: dùng constrained decoding nên output “luôn hợp lệ” để parse, đúng kiểu và đủ trường bắt buộc, không cần retry vì lỗi schema. Docs cũng nêu các ngoại lệ: <code>stop_reason: "refusal"</code>, bị cắt do <code>max_tokens</code>, và chữ hoa/thường của giá trị <code>enum</code> không được bảo đảm.</p>
<pre>"output_config": {
  "format": {
    "type": "json_schema",
    "schema": {
      "type": "object",
      "properties": {
        "invoice_number": {"type": "string"},
        "po_number":      {"anyOf": [{"type": "string"}, {"type": "null"}]},
        "currency":       {"type": "string", "enum": ["USD", "EUR", "VND", "OTHER"]},
        "line_items": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {"description": {"type": "string"}, "amount": {"type": "number"}},
            "required": ["description", "amount"],
            "additionalProperties": false
          }
        },
        "stated_total":   {"type": "number"}
      },
      "required": ["invoice_number", "po_number", "currency", "line_items", "stated_total"],
      "additionalProperties": false
    }
  }
}</pre>
<h4>Giới hạn schema cần biết</h4>
<p>Theo docs, structured outputs <strong>không hỗ trợ</strong>: schema đệ quy, <code>$ref</code> ngoài, ràng buộc số (<code>minimum</code>, <code>maximum</code>), ràng buộc chuỗi (<code>minLength</code>, <code>maxLength</code>), ràng buộc mảng ngoài <code>minItems</code> bằng 0 hoặc 1, và <code>additionalProperties</code> khác <code>false</code>. Dùng tính năng không hỗ trợ sẽ nhận lỗi 400. Những ràng buộc kiểu “số tiền phải dương” phải kiểm tra trong code.</p>
<h4>Thiết kế schema để giảm bịa đặt</h4>
<ul>
<li>Trường có thể <strong>không có trong tài liệu</strong> thì cho phép <code>null</code>. Nếu bắt buộc là chuỗi, model buộc phải điền một thứ gì đó, và đó là lúc nó bịa.</li>
<li>Enum nên có lối thoát như <code>"OTHER"</code> hoặc <code>"unclear"</code>, kèm trường mô tả chi tiết, để model không phải nhét giá trị lạ vào nhãn sai.</li>
<li>Muốn phát hiện mâu thuẫn thì trích cả <code>stated_total</code> (số in trên hóa đơn) để code so với tổng các dòng.</li>
</ul>
<div class="warn">Schema bảo đảm <strong>cú pháp</strong>, không bảo đảm <strong>ngữ nghĩa</strong>. JSON hợp lệ vẫn có thể có tổng các dòng khác tổng in, ngày đặt sai trường, hoặc giá trị bị đọc nhầm. Phải có bước kiểm tra nghiệp vụ trong code.</div>
<h4>Vòng validate rồi retry</h4>
<pre>result = extract(document)
for attempt in range(MAX_RETRIES):
    errors = validate_business_rules(result)   # tổng tiền, định dạng ngày, mã hợp lệ...
    if not errors:
        break
    result = extract(document,
                     previous_output=result,
                     feedback=f"Validation failed: {errors}. Re-read the document and fix only these fields.")
else:
    send_to_human_review(document, result, errors)</pre>
<ul>
<li>Retry hiệu quả nhất khi gửi lại <strong>tài liệu gốc, output lỗi và lỗi cụ thể</strong>. Câu “thử lại” chung chung thường cho ra cùng lỗi.</li>
<li>Retry <strong>có tác dụng</strong> với lỗi định dạng, đặt nhầm trường, tính sai. Retry <strong>vô ích</strong> khi thông tin <em>không có</em> trong tài liệu: hỏi lại bao nhiêu lần cũng không tạo ra dữ liệu. Khi đó trả <code>null</code> và đánh dấu cho người xem.</li>
<li>Agent SDK có subtype kết quả <code>error_max_structured_output_retries</code> cho trường hợp hết lượt retry mà vẫn chưa có output hợp lệ.</li>
</ul>
<div class="tip">Câu hỏi “làm sao bảo đảm JSON luôn parse được” thường có đáp án là structured outputs hoặc tool kèm <code>strict: true</code>. Câu hỏi “JSON đúng cú pháp nhưng số liệu sai” thường có đáp án là validate nghiệp vụ trong code rồi retry kèm lỗi cụ thể.</div>`,
          keypoints: [
            "Dặn 'chỉ trả JSON' trong prompt không bảo đảm; dùng tool có input_schema (strict: true) hoặc output_config.format.",
            "Structured outputs bảo đảm parse được và đúng schema, trừ refusal, max_tokens, chữ hoa/thường của enum.",
            "Không hỗ trợ minimum/maximum, minLength, schema đệ quy...; ràng buộc nghiệp vụ phải kiểm tra trong code.",
            "Trường có thể thiếu thì cho null; enum có lối thoát 'OTHER'/'unclear'; schema không bảo đảm ngữ nghĩa.",
            "Retry kèm tài liệu, output lỗi và lỗi cụ thể; vô ích khi dữ liệu không có trong tài liệu."
          ],
          sources: [
            { t: "Structured outputs", u: "https://platform.claude.com/docs/en/build-with-claude/structured-outputs" },
            { t: "Define tools", u: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools" },
            { t: "How the agent loop works (result subtypes)", u: "https://code.claude.com/docs/en/agent-sdk/agent-loop" }
          ]
        },
        {
          id: "l-4-4",
          title: "Message Batches API và review nhiều lượt",
          minutes: 12,
          html: `<h4>Message Batches API: rẻ hơn, đổi lại phải chờ</h4>
<p>Batches API xử lý <strong>bất đồng bộ</strong> một lượng lớn request Messages. Các con số docs nêu:</p>
<table>
<thead><tr><th>Đặc điểm</th><th>Giá trị</th></tr></thead>
<tbody>
<tr><td>Chi phí</td><td>Giảm 50% so với gọi thường</td></tr>
<tr><td>Thời gian</td><td>Phần lớn batch xong dưới 1 giờ; kết quả có khi mọi request xong hoặc sau 24 giờ, tùy cái nào đến trước; request chưa xử lý xong sau 24 giờ thì hết hạn</td></tr>
<tr><td>Giới hạn</td><td>100.000 request hoặc 256 MB mỗi batch, tùy cái nào chạm trước</td></tr>
<tr><td>Lưu kết quả</td><td>29 ngày sau khi tạo</td></tr>
<tr><td>Thứ tự</td><td>Kết quả có thể trả về <strong>không theo thứ tự</strong> gửi, nên phải khớp bằng <code>custom_id</code></td></tr>
<tr><td>Loại kết quả</td><td><code>succeeded</code>, <code>errored</code>, <code>canceled</code>, <code>expired</code> (ba loại sau không bị tính phí)</td></tr>
</tbody>
</table>
<p>Gần như mọi request gửi được tới Messages API đều đưa được vào batch, gồm tool use và hội thoại nhiều lượt. Nhưng mỗi request vẫn chỉ là <strong>một</strong> lời gọi Messages. Nếu response dừng ở <code>tool_use</code>, code của bạn phải chạy tool rồi gửi request tiếp theo. Vì vậy vòng lặp agent cần nhiều lượt qua lại với tool thực thi phía bạn không chạy trọn trong một request batch.</p>
<h4>Chọn đúng workload</h4>
<table>
<thead><tr><th>Hợp với batch</th><th>Không hợp</th></tr></thead>
<tbody>
<tr><td>Audit hằng đêm hàng chục nghìn transcript</td><td>Kiểm tra pre-merge mà dev đang ngồi chờ</td></tr>
<tr><td>Trích xuất lại kho tài liệu cũ (backfill)</td><td>Chat với khách hàng</td></tr>
<tr><td>Chạy bộ đánh giá (eval) lớn</td><td>Bất kỳ luồng nào có người hoặc hệ thống bị chặn chờ kết quả</td></tr>
</tbody>
</table>
<p>Xử lý lỗi: đọc kết quả theo <code>custom_id</code>, rồi chỉ gửi lại những request <code>errored</code>/<code>expired</code>, có thể kèm chỉnh sửa (chẳng hạn chia nhỏ tài liệu quá dài). Khi tính lịch chạy, nhớ rằng batch có thể mất tới 24 giờ. Job có hạn chót sáng mai thì đừng gửi sát giờ. Prompt caching dùng được với batch, nhưng docs ghi cache hit chỉ ở mức “best-effort” vì request có thể được xử lý đồng thời và không theo thứ tự.</p>
<div class="warn">Bẫy: chọn batch cho luồng cần phản hồi nhanh chỉ vì rẻ hơn 50%. “Phần lớn xong dưới 1 giờ” không phải cam kết, và giới hạn thật là 24 giờ.</div>
<h4>Review nhiều lượt</h4>
<p><strong>Tự review trong cùng phiên</strong> có điểm yếu: phiên đã viết code hoặc đã trích xuất vẫn mang theo lập luận của chính nó, nên dễ bỏ qua lỗi của mình. Tốt hơn là dùng một <strong>instance độc lập</strong> (lời gọi mới, không có lịch sử tạo ra kết quả) để review. Đây là tinh thần của mẫu <em>evaluator-optimizer</em> trong “Building effective agents”: một LLM tạo, một LLM khác đánh giá theo tiêu chí rõ ràng, lặp lại khi việc lặp có giá trị đo được.</p>
<p>Với PR lớn (vài chục file), một lượt review duy nhất dễ bị “loãng”: file đầu được xem kỹ, file sau sơ sài, và lỗi xuyên file bị bỏ sót. Chia thành:</p>
<ol>
<li><strong>Lượt theo từng file</strong>: tìm lỗi cục bộ, mỗi lượt tập trung một file.</li>
<li><strong>Lượt tích hợp</strong>: chỉ nhìn giao diện giữa các file (chữ ký hàm, hợp đồng API, luồng dữ liệu) để bắt lỗi xuyên file.</li>
</ol>
<p>Bài viết về hệ nghiên cứu của Anthropic cũng mô tả dùng <strong>LLM làm giám khảo</strong> chấm theo rubric để đánh giá output, kèm kiểm thử bởi người để bắt lỗi mà giám khảo bỏ sót.</p>
<div class="tip">“Model lớn hơn, context dài hơn, review một lượt” thường là đáp án nhiễu. Chia lượt theo trọng tâm và dùng reviewer độc lập mới là cách sửa đúng gốc.</div>`,
          keypoints: [
            "Batches: rẻ 50%, phần lớn xong dưới 1 giờ nhưng tối đa 24 giờ; 100.000 request hoặc 256 MB; kết quả giữ 29 ngày.",
            "Kết quả không theo thứ tự nên phải khớp bằng custom_id; gửi lại chỉ những request errored/expired.",
            "Batch hợp việc không ai chờ (audit đêm, backfill, eval); không hợp kiểm tra chặn hay chat.",
            "Mỗi request batch là một lời gọi; vòng lặp agent cần chạy tool phía bạn thì không chạy trọn trong một request.",
            "Review bằng instance độc lập; PR lớn thì chia lượt theo file cộng một lượt tích hợp xuyên file."
          ],
          sources: [
            { t: "Batch processing", u: "https://platform.claude.com/docs/en/build-with-claude/batch-processing" },
            { t: "Building effective agents", u: "https://www.anthropic.com/engineering/building-effective-agents" },
            { t: "How we built our multi-agent research system", u: "https://www.anthropic.com/engineering/multi-agent-research-system" }
          ]
        }
      ],
      cheat: [
        ["'Be conservative' / 'chỉ báo cái quan trọng'", "Thay bằng tiêu chí tường minh: báo gì, bỏ gì, mức độ, ví dụ"],
        ["Giải thích lý do", "Nói vì sao cần chỉ dẫn, Claude khái quát được"],
        ["Few-shot", "3–5 ví dụ liên quan, đa dạng, trong thẻ example; tập trung ca mơ hồ, kèm lý do"],
        ["Thẻ XML", "Tách chỉ dẫn / bối cảnh / ví dụ / input; tên nhất quán; lồng khi có thứ bậc"],
        ["Tài liệu dài", "Đặt ở đầu, câu hỏi ở cuối; thẻ document kèm source; yêu cầu trích dẫn trước"],
        ["JSON luôn parse được", "Structured outputs: output_config.format hoặc tool + strict: true"],
        ["Schema không hỗ trợ", "minimum/maximum, minLength/maxLength, đệ quy, $ref ngoài; additionalProperties phải là false"],
        ["Trường có thể thiếu", "Cho phép null để tránh bịa; enum có 'OTHER'/'unclear'"],
        ["JSON đúng mà số sai", "Schema không bảo đảm ngữ nghĩa; validate trong code, retry kèm lỗi cụ thể"],
        ["Retry vô ích khi", "Dữ liệu không có trong tài liệu nên trả null và gửi người xem"],
        ["Batches API", "-50% chi phí, tối đa 24 giờ, custom_id, không theo thứ tự, giữ 29 ngày"],
        ["Review", "Instance độc lập; PR lớn chia lượt theo file cộng lượt tích hợp"]
      ],
      quiz: [
        {
          q: "An automated code-review bot is instructed to \"be conservative and only report important issues.\" It still posts many comments about naming and formatting, and developers have started ignoring it, including its valid bug reports. What is the BEST improvement?",
          options: [
            "Replace it with explicit criteria: which categories to report (logic, security), which to skip (style), with an example of each.",
            "Add \"be even more conservative\" to the prompt and require the model to report only the issues it rates above 90% confidence on its own.",
            "Move the review to a larger model that better understands what \"important\" means.",
            "Run the review twice and post only issues that appear in both runs."
          ],
          answer: 0,
          explain: "Gốc rễ là 'quan trọng' chưa được định nghĩa. Tiêu chí tường minh (báo gì, bỏ gì, kèm ví dụ) giải quyết trực tiếp. B vẫn mơ hồ, và ngưỡng tự tin do model tự báo không được hiệu chuẩn. C không định nghĩa lại tiêu chí. D có thể giảm nhiễu ngẫu nhiên nhưng hai lần chạy vẫn cùng đồng ý báo lỗi style, vì vấn đề nằm ở tiêu chí."
        },
        {
          q: "An invoice-extraction prompt returns \"N/A\", \"none\", or an empty string for missing purchase-order numbers, and occasionally invents a plausible-looking PO number when none exists. What is the BEST fix?",
          options: [
            "Add a firm instruction to the system prompt: \"Never hallucinate or invent values; if you are not sure about a field, leave it out.\"",
            "Make po_number a required string in the schema so the model always provides a value.",
            "Allow null for po_number, tell the model to return null when it is absent, and add an example whose expected output is null.",
            "Post-process the output to delete the strings \"N/A\" and \"none\"."
          ],
          answer: 2,
          explain: "Cho phép null cùng ví dụ minh họa vừa chuẩn hóa cách biểu diễn 'không có', vừa bỏ áp lực phải điền giá trị (nguyên nhân bịa). A là lời dặn chung chung, ít tác dụng. B làm tệ hơn: bắt buộc chuỗi thì model phải điền một thứ gì đó. D chỉ vá biểu hiện, không xử lý được giá trị bịa đặt."
        },
        {
          q: "A pipeline asks Claude to \"respond only with JSON matching this schema.\" About 3% of outputs fail JSON.parse because of extra prose or missing brackets. What is the MOST reliable fix?",
          options: [
            "Add several few-shot examples of correctly formatted JSON responses.",
            "Use schema-constrained structured outputs: either JSON outputs via output_config.format, or a tool with strict: true whose input_schema is the target schema.",
            "Retry up to five times whenever parsing fails.",
            "Set temperature to zero to make the output deterministic."
          ],
          answer: 1,
          explain: "Structured outputs dùng constrained decoding, bảo đảm output parse được và đúng schema (trừ các ngoại lệ như refusal hay max_tokens). A giúp tăng tỉ lệ đúng nhưng không bảo đảm. C tốn chi phí và vẫn có thể thất bại. D không bảo đảm định dạng."
        },
        {
          q: "After moving invoice extraction to structured outputs, every response parses and matches the schema. However, in some results the line-item amounts do not add up to the stated total printed on the invoice. What should the team do?",
          options: [
            "Revert to prompt-based JSON generation, because structured outputs is evidently corrupting numeric values during constrained decoding.",
            "Add minimum and maximum constraints to each amount field in the JSON schema.",
            "Increase max_tokens so the model has room to compute totals accurately.",
            "Schema compliance doesn't guarantee correct values; check the sums in code and retry with the specific discrepancy."
          ],
          answer: 3,
          explain: "Schema bảo đảm cú pháp, không bảo đảm ngữ nghĩa. Kiểm tra tổng tiền là việc của code, và retry kèm lỗi cụ thể giúp model sửa đúng chỗ. A đổ lỗi sai chỗ. B: structured outputs không hỗ trợ minimum/maximum (sẽ lỗi 400), và dù có cũng không kiểm tra được tổng. C không liên quan, vì response không bị cắt."
        },
        {
          q: "A team is evaluating the Message Batches API for two workloads: (1) a pre-merge check that developers wait on before merging, and (2) a nightly audit of 40,000 support transcripts. Which TWO statements are correct? (Choose TWO.)",
          options: [
            "The nightly audit is a good fit: batch requests cost 50% less, and the job can tolerate results arriving hours later.",
            "The pre-merge check is a good fit, because batches typically complete within a few seconds.",
            "Each request should carry a unique custom_id, because results may be returned in a different order than they were submitted.",
            "A single batch request can run a full multi-turn agent loop, executing your own tools between turns.",
            "Batches are guaranteed to finish within one hour."
          ],
          answer: [0, 2],
          explain: "Audit hằng đêm không ai chờ nên tận dụng được giảm 50%. Kết quả batch có thể không theo thứ tự, nên phải khớp bằng custom_id. B sai: batch có thể mất tới 24 giờ, không hợp luồng chặn. D sai: mỗi request là một lời gọi Messages, tool phía bạn phải chạy giữa các request. E sai: phần lớn xong dưới 1 giờ nhưng không có cam kết, và giới hạn thật là 24 giờ."
        },
        {
          q: "A legal-analysis prompt contains, in order: detailed instructions, a 150-page contract, and the question. Answers often miss relevant clauses deep in the contract. Which change is MOST likely to help first?",
          options: [
            "Put the contract first in XML document tags, the question last, and ask Claude to quote relevant clauses before answering.",
            "Split the contract into ten chunks, send each chunk with the question as a separate parallel call, and concatenate the ten answers.",
            "Repeat the instructions three times throughout the prompt.",
            "First ask Claude to summarize the contract, then answer the question from the summary."
          ],
          answer: 0,
          explain: "Docs khuyên đặt tài liệu dài lên đầu, câu hỏi ở cuối, bọc bằng thẻ XML, và yêu cầu trích dẫn trước để tập trung vào phần liên quan. B làm mất liên kết chéo giữa các điều khoản. C không giải quyết cách tổ chức. D đánh mất chi tiết, vì bản tóm tắt dễ bỏ chính các điều khoản nhỏ mà câu hỏi cần."
        },
        {
          q: "A single-pass review of a 30-file pull request produces detailed comments on the first few files, shallow comments on the rest, and misses an interface mismatch between two services. What is the BEST redesign?",
          options: [
            "Use a model with a much larger context window so the entire pull request fits comfortably, and keep the single comprehensive review pass.",
            "Ask the session that generated the changes to review its own work once more.",
            "Review only the five largest files, since they carry most of the risk.",
            "Run a focused pass per file plus a separate cross-file integration pass, using a reviewer independent of the author session."
          ],
          answer: 3,
          explain: "Chia lượt theo trọng tâm chống 'loãng' sự chú ý. Lượt tích hợp riêng bắt lỗi xuyên file, và reviewer độc lập không mang lập luận của phiên viết code. A không sửa vấn đề phân bổ chú ý. B: phiên tác giả dễ bỏ qua lỗi của chính nó. C bỏ sót có chủ đích."
        },
        {
          q: "A ticket classifier assigns one of six categories. It is consistent on clear cases but flips between \"billing\" and \"account\" on borderline tickets, such as double charges after an email change. What is the MOST effective improvement?",
          options: [
            "Ask the model for a confidence score on every ticket and automatically route low-confidence tickets to a separate \"other\" category for later triage.",
            "Add more fine-grained categories so borderline tickets have their own label.",
            "Add 3–5 diverse examples of billing-versus-account borderline tickets, each with a brief rationale for its label.",
            "Add \"think very carefully before choosing a category\" to the prompt."
          ],
          answer: 2,
          explain: "Ví dụ có giá trị nhất ở ranh giới mơ hồ. Kèm lý do giúp model khái quát quy tắc thay vì bắt chước bề mặt. A né vấn đề bằng điểm tự tin không được hiệu chuẩn. B tạo thêm nhiều ranh giới mơ hồ mới. D là lời dặn chung chung, không cung cấp quy tắc phân định."
        }
      ]
    },
    {
      id: "d5",
      name: "Context Management & Reliability",
      weight: 15,
      intro: `<p>Domain này hỏi cách giữ hệ thống <em>đáng tin</em> khi chạy lâu và chạy thật: context dài làm chất lượng giảm, chi tiết quan trọng bị tóm tắt mất, lỗi lan qua nhiều agent, model tự tin sai, nguồn trích dẫn bị rơi, và agent “lạc” khi khám phá codebase lớn. Domain này cũng hỏi khi nào cần đưa người vào vòng lặp.</p>
<p>Ranh giới: cơ chế session (resume, fork) và thiết kế escalation ở mức kiến trúc nằm ở Domain 1. Ở đây trọng tâm là <em>độ tin cậy của thông tin</em> chảy qua hệ thống.</p>`,
      lessons: [
        {
          id: "l-5-1",
          title: "Context dài: suy giảm, tóm tắt và khối case facts",
          minutes: 12,
          html: `<h4>Context tích lũy như thế nào</h4>
<p>Theo docs Agent SDK, context window <strong>không reset giữa các lượt</strong> trong một session. Mọi thứ cộng dồn: system prompt, định nghĩa tool, lịch sử hội thoại, input và output của tool. Một lần đọc file lớn hoặc một lệnh in nhiều log có thể tốn hàng nghìn token. Session càng dài, càng nhiều lời gọi tool, context càng phình.</p>
<p>Khi gần chạm giới hạn, SDK (và Claude Code) <strong>tự động compact</strong>: tóm tắt lịch sử cũ để giải phóng chỗ, giữ lại các trao đổi gần nhất. Docs cảnh báo: compaction thay message cũ bằng bản tóm tắt, nên <strong>chỉ dẫn cụ thể từ đầu hội thoại có thể không được giữ lại</strong>.</p>
<h4>Triệu chứng trong agent chăm sóc khách hàng</h4>
<p>Đầu hội thoại, khách cung cấp mã đơn <code>#88412</code>, số tiền <code>186,40 USD</code>, và agent hứa gọi lại vào thứ Năm. Bốn mươi lượt sau, qua một lần tóm tắt, agent chỉ còn biết “khách muốn hoàn tiền cho đơn gần đây”. Kết quả: hỏi lại thông tin đã có, sai số tiền, quên lời hứa. Đó là cách tóm tắt dạng văn xuôi làm rơi <strong>giá trị cụ thể</strong>.</p>
<h4>Khối case facts: dữ kiện nằm ngoài lịch sử bị tóm tắt</h4>
<p>Giải pháp kiến trúc là để <strong>code ứng dụng</strong> duy trì một khối dữ kiện có cấu trúc, cập nhật mỗi khi có thông tin mới (từ kết quả tool, từ lời khách đã xác nhận), và đưa khối này vào <em>mọi</em> request, tách khỏi phần lịch sử có thể bị tóm tắt:</p>
<pre>&lt;case_facts&gt;
customer_id: C-20931 (verified 2025-03-10 09:14)
orders:
  - id: #88412, amount: 186.40 USD, status: delivered_damaged
  - id: #88507, amount: 42.00 USD, status: in_transit
requested: refund #88412 (full), replacement not wanted
commitments: callback Thursday 2025-03-13 before 17:00 (promised by agent)
open_questions: none
&lt;/case_facts&gt;</pre>
<ul>
<li>Dữ kiện lấy từ tool nên được <strong>trích gọn</strong> vào khối này (5 trường cần thiết), thay vì để nguyên output 40 trường trong lịch sử.</li>
<li>Khách có <strong>nhiều vấn đề</strong> cùng lúc thì mỗi vấn đề một mục riêng có trạng thái, tránh trộn lẫn.</li>
</ul>
<h4>Các công cụ khác để giữ context sạch</h4>
<ul>
<li><strong>Quy tắc lâu dài để trong CLAUDE.md</strong>, không để trong prompt đầu tiên. Docs SDK giải thích CLAUDE.md được đưa lại vào mọi request, nên không bị compaction làm mất.</li>
<li><strong>Chỉ dẫn tóm tắt trong CLAUDE.md</strong>: compactor đọc CLAUDE.md như context bình thường, nên bạn có thể thêm một mục nói cần giữ gì khi tóm tắt (mục tiêu, file đã sửa, kết quả test, quyết định).</li>
<li><strong>Hook <code>PreCompact</code></strong> để lưu nguyên transcript trước khi tóm tắt. Lệnh <code>/compact</code> để chủ động compact.</li>
<li><strong>Subagent cho việc con</strong>: subagent chỉ trả câu trả lời cuối, nên context chính chỉ tăng thêm một bản tóm tắt.</li>
<li><strong>Chọn lọc tool</strong>: mỗi định nghĩa tool tốn context. Thu hẹp bộ tool cho từng agent.</li>
</ul>
<h4>Vị trí thông tin trong prompt dài</h4>
<p>Docs prompting khuyên đặt tài liệu dài ở đầu và câu hỏi ở cuối (Domain 4). Khi tổng hợp nhiều kết quả, đặt <strong>bản tóm tắt các phát hiện chính ở đầu</strong> và dùng tiêu đề rõ cho từng phần. Như vậy thông tin quan trọng không bị chôn giữa một khối dài.</p>
<div class="tip">Câu hỏi kiểu “agent quên số tiền, mã đơn sau hội thoại dài” có đáp án là khối case facts có cấu trúc do code duy trì. Không phải “dùng model context lớn hơn” hay “dặn model nhớ kỹ”.</div>
<div class="warn">Tắt hẳn tóm tắt và luôn gửi toàn bộ transcript không phải lời giải. Context sẽ tràn, và lượng thông tin thừa khổng lồ cũng làm chất lượng giảm.</div>`,
          keypoints: [
            "Context cộng dồn qua các lượt; output tool lớn tốn nhiều token; compaction có thể làm mất chỉ dẫn và chi tiết sớm.",
            "Tóm tắt dạng văn xuôi làm rơi giá trị cụ thể (số tiền, ngày, mã đơn).",
            "Khối case facts có cấu trúc do code duy trì, đưa vào mọi request, tách khỏi lịch sử bị tóm tắt.",
            "Quy tắc lâu dài để trong CLAUDE.md (được đưa lại mỗi request); có thể thêm chỉ dẫn cho compactor.",
            "Trích gọn output tool, dùng subagent cho việc con, tóm tắt phát hiện chính đặt ở đầu."
          ],
          sources: [
            { t: "How the agent loop works (context window, compaction)", u: "https://code.claude.com/docs/en/agent-sdk/agent-loop" },
            { t: "Prompting best practices (long context)", u: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" }
          ]
        },
        {
          id: "l-5-2",
          title: "Human-in-the-loop, escalation và hiệu chuẩn confidence",
          minutes: 12,
          html: `<h4>Khi nào cần người trong vòng lặp</h4>
<p>“Building effective agents” khuyên agent nên <strong>dừng lại chờ phản hồi của người</strong> ở các checkpoint hoặc khi bị chặn, đồng thời kiểm tra “ground truth” từ môi trường (kết quả tool) ở mỗi bước. Đặc tả MCP cũng nói nên luôn có người trong vòng lặp với khả năng từ chối lời gọi tool, vì lý do an toàn. Câu hỏi thiết kế là đặt checkpoint ở đâu để người <em>chỉ</em> phải xem những gì đáng xem.</p>
<h4>97% chính xác chưa có nghĩa là tự động hóa được</h4>
<p>Một hệ trích xuất báo độ chính xác tổng là 97%, và team muốn bỏ review thủ công cho kết quả “tự tin cao”. Trước khi làm vậy:</p>
<ol>
<li><strong>Chia nhỏ độ chính xác theo loại tài liệu và theo trường.</strong> Con số tổng có thể che một loại tài liệu (chẳng hạn hóa đơn viết tay) chỉ đúng 70%, hoặc một trường (ngày đáo hạn) sai nhiều.</li>
<li><strong>Chỉ giảm review cho phân khúc đã được chứng minh</strong> là đạt ngưỡng.</li>
<li><strong>Giữ lấy mẫu ngẫu nhiên phân tầng</strong> (stratified sampling) trên các kết quả đã tự duyệt, để phát hiện mẫu lỗi mới khi dữ liệu đầu vào thay đổi.</li>
</ol>
<h4>Confidence: đừng tin con số model tự báo</h4>
<p>Một con số “confidence: 0.92” do model tự viết ra vẫn chỉ là output của model, không tự động được <strong>hiệu chuẩn</strong> (calibrate) với tỉ lệ đúng thật. Nếu muốn dùng confidence để định tuyến:</p>
<ul>
<li>Yêu cầu confidence <strong>theo từng trường</strong> thay vì một con số cho cả tài liệu.</li>
<li><strong>Hiệu chuẩn ngưỡng trên tập dữ liệu có nhãn</strong>: đo xem ở mỗi mức confidence, tỉ lệ đúng thật là bao nhiêu, rồi mới chọn ngưỡng chuyển người.</li>
<li>Ưu tiên các <strong>tín hiệu xác định</strong> khi có: lỗi validate, tổng tiền lệch, thiếu trường bắt buộc, hai nguồn mâu thuẫn, quy tắc nghiệp vụ.</li>
</ul>
<table>
<thead><tr><th>Tín hiệu chuyển người</th><th>Độ tin cậy</th></tr></thead>
<tbody>
<tr><td>Validate nghiệp vụ thất bại sau retry</td><td>Cao (xác định)</td></tr>
<tr><td>Nguồn mâu thuẫn, thiếu dữ liệu bắt buộc</td><td>Cao</td></tr>
<tr><td>Khách yêu cầu gặp người; chính sách không bao quát</td><td>Cao</td></tr>
<tr><td>Confidence theo trường, đã hiệu chuẩn trên tập có nhãn</td><td>Trung bình đến cao</td></tr>
<tr><td>Confidence model tự báo, chưa hiệu chuẩn</td><td>Thấp</td></tr>
<tr><td>Cảm xúc tiêu cực của khách (đứng riêng)</td><td>Thấp</td></tr>
</tbody>
</table>
<h4>Escalation trong hội thoại thực tế</h4>
<ul>
<li><strong>Khách bực nhưng vấn đề nằm trong khả năng của agent</strong> (đổi địa chỉ, tra cứu đơn): ghi nhận cảm xúc, giải quyết, và nói rõ có thể chuyển người nếu khách muốn. Không tự chuyển chỉ vì giọng điệu.</li>
<li><strong>Khách yêu cầu gặp người</strong>: chuyển ngay, không cố thuyết phục ở lại.</li>
<li><strong>Tra cứu ra nhiều khách hàng khớp</strong>: hỏi thêm thông tin định danh. Không chọn theo phỏng đoán.</li>
<li><strong>Chính sách im lặng</strong> (khách đòi khớp giá đối thủ mà chính sách không nói tới): chuyển người, không tự bịa chính sách.</li>
</ul>
<p>Viết các tiêu chí này thành lời trong system prompt, kèm vài ví dụ ranh giới (nên chuyển và không nên chuyển). Đi kèm là gói bàn giao có cấu trúc (Domain 1) để người nhận không phải đọc lại toàn bộ transcript.</p>
<div class="tip">Gặp đáp án dùng “sentiment score” hay “confidence do model tự báo” làm cổng duy nhất thì gần như chắc chắn là đáp án nhiễu. Tìm đáp án dựa trên tiêu chí tường minh, tín hiệu xác định, hoặc ngưỡng đã hiệu chuẩn.</div>`,
          keypoints: [
            "Đặt checkpoint người ở chỗ rủi ro hoặc khi agent bị chặn; kiểm tra ground truth từ kết quả tool.",
            "Độ chính xác tổng có thể che phân khúc yếu; đo theo loại tài liệu và theo trường trước khi giảm review.",
            "Giữ lấy mẫu ngẫu nhiên phân tầng trên kết quả tự duyệt để bắt mẫu lỗi mới.",
            "Confidence model tự báo không được hiệu chuẩn; nếu dùng thì theo từng trường và hiệu chuẩn trên tập có nhãn.",
            "Khách bực mà vấn đề agent giải quyết được thì giải quyết; khách đòi gặp người thì chuyển ngay."
          ],
          sources: [
            { t: "Building effective agents", u: "https://www.anthropic.com/engineering/building-effective-agents" },
            { t: "MCP specification: Tools (human in the loop)", u: "https://modelcontextprotocol.io/specification/2025-06-18/server/tools" }
          ]
        },
        {
          id: "l-5-3",
          title: "Lan truyền lỗi trong hệ nhiều agent và giữ nguồn trích dẫn",
          minutes: 13,
          html: `<h4>Subagent lỗi: báo lên thế nào?</h4>
<p>Trong hệ nghiên cứu, một subagent tìm kiếm web bị timeout ở một trong năm truy vấn. Có hai thái cực sai:</p>
<ul>
<li><strong>Nuốt lỗi</strong>: trả danh sách rỗng đánh dấu “thành công”. Coordinator tưởng chủ đề đó không có tài liệu, và báo cáo cuối khẳng định sai “chưa có nghiên cứu nào về X”.</li>
<li><strong>Làm sập cả luồng</strong>: một lỗi nhỏ dừng toàn bộ pipeline, mất hết kết quả của bốn truy vấn đã thành công.</li>
</ul>
<p>Cách đúng là subagent tự <strong>xử lý cục bộ</strong> lỗi tạm thời (retry có giới hạn). Khi không tự khắc phục được, nó trả về <strong>ngữ cảnh lỗi có cấu trúc</strong> để coordinator quyết định:</p>
<pre>{
  "status": "partial_failure",
  "failure_type": "timeout",
  "attempted": {"query": "sodium-ion grid storage 2024 deployment", "retries": 2},
  "partial_results": [
    {"claim": "...", "source_url": "https://...", "published": "2024-06"}
  ],
  "suggested_alternatives": ["thử nguồn báo cáo cơ quan năng lượng", "thu hẹp khoảng thời gian"]
}</pre>
<p>Coordinator có thể giao lại với truy vấn khác, dùng kết quả một phần, hoặc đi tiếp nhưng <strong>ghi chú lỗ hổng</strong> trong báo cáo (“mục này ít nguồn vì không truy cập được X”). Phân biệt quan trọng (đã gặp ở Domain 2): <em>truy cập thất bại</em> khác với <em>truy vấn hợp lệ không có kết quả</em>.</p>
<h4>Chạy lâu: tiếp tục từ chỗ lỗi</h4>
<p>Bài viết về hệ nghiên cứu nhiều agent của Anthropic mô tả việc xây hệ thống có thể <strong>tiếp tục từ chỗ agent đang dừng</strong> khi gặp lỗi, thay vì chạy lại từ đầu. Agent dẫn dắt còn lưu kế hoạch vào bộ nhớ để không mất khi context bị cắt. Áp dụng thực tế: mỗi agent ghi trạng thái (việc con đã xong, kết quả, việc còn lại) ra một vị trí đã biết. Khi khởi động lại, coordinator nạp trạng thái đó và chỉ giao phần còn thiếu.</p>
<h4>Provenance: giữ liên kết claim và nguồn qua mọi bước</h4>
<p>Mỗi lần tóm tắt là một cơ hội để mất nguồn. Subagent viết “thị trường đạt 6,3 tỷ USD”, coordinator tóm lại thành “thị trường tăng mạnh”, và báo cáo cuối không còn ai kiểm chứng được. Để giữ nguồn:</p>
<ul>
<li>Yêu cầu subagent trả <strong>ánh xạ claim và nguồn có cấu trúc</strong>: claim, URL hoặc tên tài liệu, đoạn trích, ngày xuất bản.</li>
<li>Bước tổng hợp phải <strong>mang theo</strong> các ánh xạ đó, không viết lại thành văn xuôi mất nguồn.</li>
<li>Hệ nghiên cứu của Anthropic có một <strong>CitationAgent</strong> riêng: sau khi nghiên cứu xong, nó xử lý tài liệu và báo cáo để xác định vị trí trích dẫn cụ thể, bảo đảm mỗi claim được gắn với nguồn.</li>
</ul>
<h4>Hai nguồn đáng tin nói khác nhau</h4>
<p>Báo cáo năm 2022 ghi thị trường 4,1 tỷ USD, báo cáo năm 2024 ghi 6,3 tỷ USD. Agent tổng hợp lặng lẽ chọn một con số là sai, lấy trung bình càng sai. Cách đúng: <strong>giữ cả hai, ghi rõ nguồn và ngày</strong>, và để báo cáo giải thích chênh lệch (có thể do mốc thời gian khác nhau, hoặc cách đo khác nhau). Ngày xuất bản giúp người đọc phân biệt “mâu thuẫn” với “số liệu cập nhật”.</p>
<pre>| Chỉ số         | Giá trị     | Nguồn                         | Ngày    |
|----------------|-------------|-------------------------------|---------|
| Quy mô thị trường | 4,1 tỷ USD | Báo cáo ngành A (trang 12)    | 2022-09 |
| Quy mô thị trường | 6,3 tỷ USD | Khảo sát B (mục 3.1)          | 2024-05 |
Ghi chú: hai số đo ở hai thời điểm khác nhau; B dùng phạm vi rộng hơn (gồm cả châu Á).</pre>
<div class="tip">Đáp án tốt về lỗi trong hệ nhiều agent thường có: retry cục bộ, báo lên kèm ngữ cảnh (đã thử gì, kết quả một phần, gợi ý thay thế), coordinator quyết định, báo cáo ghi chú lỗ hổng.</div>
<div class="warn">Thêm trích dẫn “sau khi viết xong” bằng cách tìm nguồn ủng hộ từng câu rất dễ dẫn tới gán nguồn sai. Nguồn phải đi cùng claim từ lúc thu thập.</div>`,
          keypoints: [
            "Không nuốt lỗi (trả rỗng như thành công) và không làm sập cả luồng vì một lỗi.",
            "Subagent retry cục bộ lỗi tạm thời; không khắc phục được thì trả loại lỗi, truy vấn đã thử, kết quả một phần, gợi ý thay thế.",
            "Coordinator quyết định: giao lại, dùng kết quả một phần, hoặc đi tiếp và ghi chú lỗ hổng.",
            "Ghi trạng thái để tiếp tục từ chỗ lỗi thay vì chạy lại từ đầu.",
            "Giữ ánh xạ claim và nguồn (URL, đoạn trích, ngày) qua tổng hợp; nguồn mâu thuẫn thì giữ cả hai kèm ngày."
          ],
          sources: [
            { t: "How we built our multi-agent research system", u: "https://www.anthropic.com/engineering/multi-agent-research-system" },
            { t: "MCP specification: Tools (error handling)", u: "https://modelcontextprotocol.io/specification/2025-06-18/server/tools" }
          ]
        },
        {
          id: "l-5-4",
          title: "Khám phá codebase lớn mà không làm hỏng context",
          minutes: 11,
          html: `<p>Khi dùng Claude Code để hiểu một codebase lớn (monorepo, hệ thống cũ không có tài liệu), vấn đề chính không phải Claude “không đủ thông minh” mà là <strong>context bị lấp đầy</strong> bởi hàng chục lần đọc file. Docs Claude Code tóm gọn: khám phá codebase lớn làm đầy context của bạn bằng các lần đọc file.</p>
<h4>Dấu hiệu context đã xuống cấp</h4>
<ul>
<li>Câu trả lời chuyển từ cụ thể (“<code>TokenRefresher.scheduleNext()</code> trong <code>auth/refresh.ts</code>”) sang chung chung (“thông thường các hệ thống như vậy sẽ…”).</li>
<li>Claude hỏi lại hoặc đọc lại file đã đọc từ trước.</li>
<li>Kết luận mâu thuẫn với phát hiện lúc đầu phiên.</li>
</ul>
<h4>Chiến lược</h4>
<ol>
<li><strong>Khoanh vùng trước, đọc sau</strong>: dùng tìm kiếm theo tên file (Glob) và theo nội dung (Grep) để định vị điểm vào và nơi gọi hàm, rồi mới đọc có chọn lọc. Lần theo luồng từ điểm vào (route, handler) thay vì đọc cả thư mục. Docs cũng gợi ý cài plugin code intelligence cho ngôn ngữ của bạn để có “go to definition” và “find references” chính xác.</li>
<li><strong>Giao phần khám phá dài dòng cho subagent</strong>: “dùng subagent điều tra cách hệ thống auth xử lý token refresh”. Subagent (như Explore, chỉ đọc) đọc file trong context riêng và chỉ trả tóm tắt. Context chính giữ vai trò điều phối và ra quyết định.</li>
<li><strong>Ghi phát hiện ra file</strong>: yêu cầu Claude ghi các phát hiện chính (đường dẫn, tên class, quyết định, câu hỏi còn mở) vào một file ghi chú trong repo. Sau <code>/compact</code> hoặc ở phiên mới, chỉ cần tham chiếu file đó thay vì khám phá lại. Docs prompting cũng nói rằng với harness có compact context hoặc cho lưu context ra file ngoài (như Claude Code), nên cho Claude biết điều đó để nó hành xử phù hợp, và gợi ý cho model theo dõi trạng thái bằng file có cấu trúc (ví dụ <code>tests.json</code>).</li>
<li><strong>Chia giai đoạn</strong>: khám phá, rồi tóm tắt, rồi mới triển khai. Khi sang giai đoạn mới, đưa bản tóm tắt có cấu trúc vào prompt của subagent hoặc phiên mới, đừng kéo theo toàn bộ lịch sử khám phá.</li>
<li><strong>Cấu hình cho monorepo</strong>: CLAUDE.md theo thư mục (nạp khi chạm file trong thư mục đó) và rule có <code>paths</code> giúp chỉ dẫn đúng chỗ. Dùng <code>claudeMdExcludes</code> để bỏ CLAUDE.md của team khác không liên quan.</li>
</ol>
<h4>Ví dụ file ghi chú</h4>
<pre># notes/auth-investigation.md
## Đã xác nhận
- Điểm vào refresh: src/auth/refresh.ts → TokenRefresher.scheduleNext()
- Token lưu ở RedisSessionStore (src/session/redis.ts), TTL 15 phút
- Retry khi refresh lỗi: 3 lần, backoff cố định 2s (src/auth/retry.ts:41)
## Chưa rõ
- Ai gọi revokeAll()? Mới thấy trong admin/, cần kiểm tra jobs/
## Quyết định
- Sửa backoff thành exponential trong retry.ts, không đụng RedisSessionStore</pre>
<h4>Khi hệ nhiều agent khám phá song song</h4>
<p>Mỗi subagent nên trả kết quả <strong>có cấu trúc</strong> (file, ký hiệu, quan hệ gọi) để coordinator gộp được, và ghi trạng thái ra file nếu việc dài, để có thể tiếp tục nếu bị gián đoạn (bài trước). Giao phạm vi rõ ràng (“chỉ thư mục <code>billing/</code> và <code>invoices/</code>”) để tránh hai subagent đọc trùng cùng một vùng.</p>
<div class="tip">Câu hỏi “phiên khám phá dài, câu trả lời bắt đầu chung chung” có đáp án là giao subagent, ghi phát hiện ra file, compact hoặc phiên mới kèm tóm tắt. Không phải “dán thêm code vào prompt” hay “dặn Claude cụ thể hơn”.</div>`,
          keypoints: [
            "Khám phá codebase lớn làm đầy context bằng các lần đọc file; câu trả lời chung chung là dấu hiệu xuống cấp.",
            "Khoanh vùng bằng tìm kiếm theo tên và nội dung trước, đọc có chọn lọc sau, lần theo luồng từ điểm vào.",
            "Giao khám phá dài dòng cho subagent (như Explore) để context chính chỉ nhận tóm tắt.",
            "Ghi phát hiện chính ra file ghi chú để dùng lại sau /compact hoặc ở phiên mới.",
            "Monorepo: CLAUDE.md theo thư mục, rule có paths, claudeMdExcludes; giao phạm vi rõ cho từng subagent."
          ],
          sources: [
            { t: "Common workflows (delegate research to subagents)", u: "https://code.claude.com/docs/en/common-workflows" },
            { t: "Create custom subagents (Explore)", u: "https://code.claude.com/docs/en/sub-agents" },
            { t: "How Claude remembers your project (claudeMdExcludes)", u: "https://code.claude.com/docs/en/memory" },
            { t: "Prompting best practices (long-horizon tasks)", u: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" }
          ]
        }
      ],
      cheat: [
        ["Context dài", "Cộng dồn qua các lượt; compaction có thể làm mất chỉ dẫn và chi tiết sớm"],
        ["Quên số tiền, mã đơn, ngày", "Khối case facts có cấu trúc do code duy trì, đưa vào mọi request"],
        ["Quy tắc lâu dài", "Để trong CLAUDE.md (được đưa lại mỗi request), không để trong prompt đầu"],
        ["Output tool quá dài", "Trích gọn các trường cần thiết trước khi đưa vào context"],
        ["Bỏ review vì 97%", "Đo theo loại tài liệu và theo trường; giữ lấy mẫu phân tầng"],
        ["Confidence model tự báo", "Không được hiệu chuẩn; nếu dùng thì theo trường và hiệu chuẩn trên tập có nhãn"],
        ["Khách bực", "Giải quyết nếu trong khả năng; chuyển người khi khách yêu cầu"],
        ["Subagent lỗi", "Retry cục bộ, rồi báo lên kèm loại lỗi, truy vấn đã thử, kết quả một phần, gợi ý"],
        ["Rỗng và lỗi", "Không bao giờ trả rỗng khi truy cập thất bại"],
        ["Provenance", "Ánh xạ claim và nguồn (URL, đoạn trích, ngày) đi qua mọi bước tổng hợp"],
        ["Nguồn mâu thuẫn", "Giữ cả hai, ghi nguồn và ngày, giải thích chênh lệch"],
        ["Codebase lớn", "Tìm kiếm rồi đọc chọn lọc; subagent Explore; file ghi chú; /compact"]
      ],
      quiz: [
        {
          q: "Forty turns into a support conversation, after the history has been summarized, the agent refers to \"your recent order\" and quotes the wrong refund amount. Earlier, the customer had confirmed order #88412, an amount of $186.40, and the agent had promised a Thursday callback. What is the BEST architectural fix?",
          options: [
            "Switch to a model with a larger context window so that summarization happens less often and earlier details stay in the raw transcript longer.",
            "Keep a structured case-facts block (IDs, amounts, dates, commitments) outside the summarized history and send it with every request.",
            "Add \"Always remember every detail the customer mentions\" to the system prompt.",
            "Disable summarization and always send the full transcript."
          ],
          answer: 1,
          explain: "Tóm tắt dạng văn xuôi làm rơi giá trị cụ thể. Khối dữ kiện có cấu trúc do code duy trì và đưa vào mọi request giữ được chúng bất kể lịch sử bị tóm tắt thế nào. A chỉ trì hoãn vấn đề. C là lời dặn, không thay đổi được việc dữ liệu bị tóm tắt mất. D cuối cùng sẽ tràn context, và hội thoại rất dài cũng làm chất lượng giảm."
        },
        {
          q: "A document-extraction system reports 97% overall field accuracy. The team proposes removing human review for all outputs the model marks as high confidence. What should the architect recommend FIRST?",
          options: [
            "Remove human review entirely, since 97% exceeds the 95% target.",
            "Auto-approve every output whose model-reported confidence is above 0.9.",
            "Review only outputs whose explanation contains words like \"unsure\" or \"unclear.\"",
            "Break accuracy down by document type and by field before reducing review, then keep stratified random sampling of auto-approved outputs to catch new error patterns."
          ],
          answer: 3,
          explain: "Con số tổng có thể che phân khúc yếu (một loại tài liệu hoặc một trường sai nhiều). Phải đo theo phân khúc, chỉ giảm review ở phân khúc đã được chứng minh, và giữ lấy mẫu để phát hiện thay đổi. A bỏ qua rủi ro phân khúc. B dựa vào confidence chưa hiệu chuẩn. C dựa vào từ ngữ, không đáng tin."
        },
        {
          q: "In a research system, a web-search subagent times out on one of its five queries. It currently returns an empty result list marked as success, and the final report states that \"no research exists\" on that subtopic. How should failures be handled?",
          options: [
            "Retry locally, then return a structured error (failure type, query, partial results, alternatives) so the coordinator can decide.",
            "Terminate the entire research workflow whenever any subagent reports a failure, so that no report is ever produced from incomplete research.",
            "Have the subagent retry indefinitely until the query succeeds.",
            "Have the coordinator silently drop failed subagents' sections from the report."
          ],
          answer: 0,
          explain: "Truy cập thất bại phải được báo là thất bại, kèm ngữ cảnh để coordinator quyết định (giao lại, dùng kết quả một phần, hoặc ghi chú lỗ hổng). B bỏ phí bốn truy vấn đã thành công. C có thể treo vô hạn. D vẫn khiến người đọc tưởng báo cáo đầy đủ."
        },
        {
          q: "During synthesis, two credible sources disagree: an industry report from 2022 sizes the market at $4.1B, while a 2024 survey reports $6.3B. The synthesis agent currently picks one figure without comment. What is the BEST behavior?",
          options: [
            "Report the average of the two figures to balance the sources.",
            "Always keep the most recent figure and silently discard the older one.",
            "Report both values with their sources and dates, noting the gap may reflect each study's period or scope.",
            "Keep searching until a third credible source agrees with one of the two figures, then report only the figure that has majority support."
          ],
          answer: 2,
          explain: "Giữ cả hai kèm nguồn và ngày giúp người đọc thấy chênh lệch có thể do mốc thời gian hay phạm vi. Không được tự ý chọn một số. A tạo ra con số không nguồn nào nói. B làm mất thông tin, và có thể hai nghiên cứu đo khác phạm vi chứ không phải cập nhật của nhau. D là bỏ phiếu theo số đông, vẫn che mất chênh lệch."
        },
        {
          q: "After a long Claude Code session exploring a legacy codebase, answers drift from specific references (exact classes and files found earlier) to generic statements like \"typically, systems like this...\". Which TWO actions are MOST effective? (Choose TWO.)",
          options: [
            "Stay in the same session and ask Claude to be more specific in its answers.",
            "Delegate verbose investigations to subagents that return concise summaries to the main session.",
            "Paste the full source of the key modules into the prompt to refresh Claude's memory.",
            "Have Claude record key findings (file paths, class names, decisions) in a notes file and reference it after /compact or in a fresh session.",
            "Increase MAX_MCP_OUTPUT_TOKENS so more file content fits in context."
          ],
          answer: [1, 3],
          explain: "Câu trả lời chung chung là dấu hiệu context xuống cấp. Giao khám phá cho subagent giữ context chính gọn. Ghi phát hiện ra file giữ được kết quả qua compact hoặc phiên mới. A không đổi được tình trạng context. C nhồi thêm context, làm tệ hơn. E không liên quan (giới hạn output tool MCP) và còn làm context đầy hơn."
        },
        {
          q: "A six-hour multi-agent document-processing job crashed in hour four. Restarting from the beginning wastes the completed work and costs. What design change BEST addresses this?",
          options: [
            "Increase every agent's max_turns and max_budget_usd limits so the job is far less likely to stop before all documents are processed.",
            "Run all agents with bypassPermissions to avoid interruptions.",
            "Have each agent persist its progress to a known location so a restart reloads state and re-delegates only unfinished work.",
            "Use a larger model so the whole job finishes before failures occur."
          ],
          answer: 2,
          explain: "Ghi trạng thái ra ngoài cho phép tiếp tục từ chỗ dừng thay vì chạy lại, đúng với cách tiếp cận mà bài viết về hệ nghiên cứu nhiều agent của Anthropic mô tả. A, B và D không giải quyết việc mất tiến độ khi process sập."
        },
        {
          q: "A customer writes: \"I'm really frustrated, this is the third time I'm contacting you,\" and asks to update the shipping address on an order that has not shipped yet. The agent has a tool that can make this change. What should the agent do?",
          options: [
            "Escalate to a human agent immediately, because negative sentiment combined with repeated contact indicates the automated agent has already failed.",
            "Acknowledge the frustration, complete the address change, and make clear that a human is available if the customer wants one.",
            "Ask the customer to rate their frustration from 1 to 10 and escalate if the score is above 7.",
            "Ignore the emotional content and reply only with the steps of the address-change procedure."
          ],
          answer: 1,
          explain: "Cảm xúc tiêu cực đứng riêng không phải lý do chuyển người khi vấn đề nằm trong khả năng của agent. Ghi nhận, giải quyết, và để ngỏ lựa chọn gặp người. A chuyển không cần thiết, khách còn phải chờ thêm. C máy móc và gây khó chịu. D bỏ qua trải nghiệm khách hàng."
        },
        {
          q: "Reviewers of a multi-agent research report cannot verify many of its claims: by the time findings pass through synthesis, the links between statements and their sources are gone. What is the BEST fix?",
          options: [
            "Have subagents return structured claim–source mappings (claim, source, excerpt, date) and carry them through synthesis.",
            "Ask the synthesis agent to add citations from memory once the report is written.",
            "Drop sources from intermediate steps to save tokens, and append a general reading list at the end.",
            "After the report is written, run a new round of searches to find a supporting source for each sentence and attach the best match as its citation."
          ],
          answer: 0,
          explain: "Nguồn phải đi cùng claim từ lúc thu thập, qua mọi bước tổng hợp. Hệ của Anthropic còn có CitationAgent để gắn trích dẫn cụ thể. B dễ gán sai hoặc bịa nguồn. C không cho biết claim nào đến từ đâu. D là gán nguồn sau khi viết, dễ chọn nguồn 'trông có vẻ ủng hộ' mà không phải nguồn gốc thật."
        }
      ]
    }
  ]
};
