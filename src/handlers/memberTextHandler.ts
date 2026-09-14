import { createEmailGuideFlex } from "../builders/flex/emailGuide";
import { MEMBER_REGEX, MEMBER_STATE } from "../constants/member";
import { BackendApiService } from "../services/backendApi";
import type { LineService } from "../services/line";
import { MemberSessionService } from "../services/memberSession";
import type { MessageEvent } from "../types/line/webhook";

export async function memberTextHandler(
  event: MessageEvent,
  line: LineService,
  db: D1Database,
  backendApi: BackendApiService,
): Promise<boolean> {
  const lineUserId = event.source.userId;

  if (!lineUserId) {
    console.log("[Member] No Line User ID");
    return false;
  }

  if (event.message.type !== "text") {
    return false;
  }

  const text = event.message.text.trim();

  if (!text) {
    return false;
  }

  const member = new MemberSessionService(db);

  const session = await member.get(lineUserId);

  console.log("[Member] Session:", session);

  // 회원가입 진행 중이 아니면 주문 Handler로 넘김
  if (!session || session.state === MEMBER_STATE.NONE) {
    console.log("[Member] Session not found or NONE");
    return false;
  }

  console.log("[Member] Current State:", session.state);

  switch (session.state) {
    case MEMBER_STATE.WAIT_EMAIL: {
      console.log("[Member] WAIT_EMAIL");

      // 이메일 형식 체크
      if (!MEMBER_REGEX.EMAIL.test(text)) {
        console.log("[Member] Invalid Email:", text);

        await line.reply(event.replyToken, [createEmailGuideFlex()]);
        return true;
      }

      console.log("[Member] Valid Email:", text);

      // 이메일 인증코드 발송
      try {
        console.log("[Backend] sendEmailCode START");

        const result = await backendApi.sendEmailCode(text);

        console.log("[Backend] sendEmailCode SUCCESS");
        console.log(result);
      } catch (error) {
        console.error("[Backend] sendEmailCode ERROR");
        console.error(error);

        await line.reply(event.replyToken, [
          {
            type: "text",
            text:
              "❌ Email 驗證碼發送失敗。\n\n" +
              "請稍後再試一次，若問題持續發生請聯絡客服。",
          },
        ]);

        return true;
      }

      console.log("[Member] Update Session -> WAIT_VERIFY");

      await member.update({
        lineUserId,
        email: text,
        state: MEMBER_STATE.WAIT_VERIFY,
      });

      console.log("[Member] Reply Verify Message");

      await line.reply(event.replyToken, [
        {
          type: "text",
          text: "📧 驗證碼已寄出！\n\n" + "請輸入 Email 收到的 6 位數驗證碼。",
        },
      ]);

      return true;
    }

    case MEMBER_STATE.WAIT_VERIFY: {
      console.log("[Member] WAIT_VERIFY");

      await line.reply(event.replyToken, [
        {
          type: "text",
          text: "🚧 Email 驗證 API 開發中。",
        },
      ]);

      return true;
    }

    default:
      console.log("[Member] Unknown State:", session.state);
      return false;
  }
}
