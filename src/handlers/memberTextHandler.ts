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

  if (!session || session.state === MEMBER_STATE.NONE) {
    return false;
  }

  switch (session.state) {
    /**
     * 이메일 입력 단계
     */
    case MEMBER_STATE.WAIT_EMAIL: {
      if (!MEMBER_REGEX.EMAIL.test(text)) {
        await line.reply(event.replyToken, [createEmailGuideFlex()]);
        return true;
      }

      try {
        await backendApi.sendLineBotEmailCode(lineUserId, text);
      } catch (error) {
        console.error("[Member] Email code error:", error);

        const message = error instanceof Error ? error.message : String(error);

        if (message.includes("(401)")) {
          await line.reply(event.replyToken, [
            {
              type: "text",
              text:
                "❌ 會員 Email 不一致\n\n" +
                "請確認您輸入的是 Seoul Moment 會員帳號所使用的 Email。",
            },
          ]);
          return true;
        }

        if (message.includes("(404)")) {
          await line.reply(event.replyToken, [
            {
              type: "text",
              text:
                "❌ 找不到已連結的會員帳號\n\n" +
                "請確認您的 LINE 帳號是否已與 Seoul Moment 會員連結。",
            },
          ]);
          return true;
        }

        await line.reply(event.replyToken, [
          {
            type: "text",
            text:
              "❌ 驗證碼發送失敗\n\n" + "系統暫時無法發送驗證碼，請稍後再試。",
          },
        ]);

        return true;
      }

      await member.update({
        lineUserId,
        state: MEMBER_STATE.WAIT_VERIFY,
      });

      await line.reply(event.replyToken, [
        {
          type: "text",
          text:
            "📧 驗證碼已寄出！\n\n" +
            "請輸入 Email 收到的 6 位數驗證碼。\n" +
            "驗證碼有效時間為 5 分鐘。",
        },
      ]);

      return true;
    }

    /**
     * 인증번호 입력 단계
     */
    case MEMBER_STATE.WAIT_VERIFY: {
      if (!MEMBER_REGEX.CODE.test(text)) {
        await line.reply(event.replyToken, [
          {
            type: "text",
            text: "請輸入 Email 收到的 6 位數驗證碼。",
          },
        ]);
        return true;
      }

      try {
        const result = await backendApi.verifyLineBotEmail(lineUserId, text);

        console.log("[Member] Verify success:", {
          lineUserId,
          userId: result.userId,
          email: result.email,
          nickname: result.nickname,
        });

        /**
         * 다음 단계에서 여기에서
         * lineUserId ↔ userId 매핑을 D1에 저장한다.
         */

        await member.clear(lineUserId);

        await line.reply(event.replyToken, [
          {
            type: "text",
            text:
              `✅ Email 驗證成功！\n\n` +
              `歡迎 ${result.nickname || "會員"}！\n` +
              `即將開始會員訂購流程。`,
          },
        ]);

        return true;
      } catch (error) {
        console.error("[Member] Email verify error:", error);

        const message = error instanceof Error ? error.message : String(error);

        if (message.includes("(401)")) {
          await line.reply(event.replyToken, [
            {
              type: "text",
              text: "❌ 驗證碼錯誤或已過期\n\n" + "請確認驗證碼後重新輸入。",
            },
          ]);
          return true;
        }

        if (message.includes("(404)")) {
          await line.reply(event.replyToken, [
            {
              type: "text",
              text: "❌ 找不到已連結的會員帳號\n\n" + "請重新進行會員驗證。",
            },
          ]);
          return true;
        }

        await line.reply(event.replyToken, [
          {
            type: "text",
            text: "❌ 驗證失敗\n\n系統暫時發生錯誤，請稍後再試。",
          },
        ]);

        return true;
      }
    }

    default:
      return false;
  }
}
