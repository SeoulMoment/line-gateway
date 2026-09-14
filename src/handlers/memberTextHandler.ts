import { createEmailGuideFlex } from "../builders/flex/emailGuide";
import { createOrderPlatformMenuFlex } from "../builders/flex/orderPlatformMenu";
import { MEMBER_REGEX, MEMBER_STATE } from "../constants/member";
import type { LineService } from "../services/line";
import { MemberSessionService } from "../services/memberSession";
import type { MessageEvent } from "../types/line/webhook";

export async function memberTextHandler(
  event: MessageEvent,
  line: LineService,
  db: D1Database,
): Promise<boolean> {
  const lineUserId = event.source.userId;

  if (!lineUserId) {
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

  // 회원가입 진행 중이 아니면 OrderHandler에게 넘긴다.
  if (!session || session.state === MEMBER_STATE.NONE) {
    return false;
  }

  switch (session.state) {
    case MEMBER_STATE.WAIT_EMAIL: {
      if (!MEMBER_REGEX.EMAIL.test(text)) {
        await line.reply(event.replyToken, [createEmailGuideFlex()]);
        return true;
      }

      // TODO(v1.0)
      // Send Email Verification API

      await member.update({
        lineUserId,
        state: MEMBER_STATE.NONE,
        email: text,
      });

      await line.reply(event.replyToken, [createOrderPlatformMenuFlex()]);

      return true;
    }

    case MEMBER_STATE.WAIT_VERIFY: {
      // TODO(v1.0)
      // Verify Email API

      await line.reply(event.replyToken, [
        {
          type: "text",
          text: "目前 Email 驗證 API 尚未串接。",
        },
      ]);

      return true;
    }

    default:
      return false;
  }
}
