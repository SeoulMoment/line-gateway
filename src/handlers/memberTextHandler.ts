import { createEmailGuideFlex } from "../builders/flex/emailGuide";
import { createVerifyGuideFlex } from "../builders/flex/verifyGuide";
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

  if (!session) {
    return false;
  }

  switch (session.state) {
    case MEMBER_STATE.WAIT_EMAIL: {
      if (!MEMBER_REGEX.EMAIL.test(text)) {
        await line.reply(event.replyToken, [createEmailGuideFlex()]);

        return true;
      }

      // TODO
      // send email verification api

      await member.update({
        lineUserId,
        state: MEMBER_STATE.WAIT_VERIFY,
        email: text,
      });

      await line.reply(event.replyToken, [createVerifyGuideFlex()]);

      return true;
    }

    case MEMBER_STATE.WAIT_VERIFY: {
      // TODO
      // verify api

      await line.reply(event.replyToken, [
        {
          type: "text",
          text: "目前 Email 驗證 API 尚未串接。\n\n之後將於此驗證 6 碼驗證碼。",
        },
      ]);

      return true;
    }

    default:
      return false;
  }
}
