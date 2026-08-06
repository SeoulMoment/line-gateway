import { createTextMessage } from "../builders/message/text";
import type { LineService } from "../services/line";
import { OrderSessionService } from "../services/orderSession";
import type { PostbackEvent } from "../types/line/webhook";

export async function orderPostbackRouter(
  event: PostbackEvent,
  line: LineService,
  db: D1Database,
): Promise<boolean> {
  const data = event.postback.data;

  const lineUserId = event.source.userId;

  if (!lineUserId) {
    return false;
  }

  const orderSession = new OrderSessionService(db);

  switch (data) {
    case "order:platform:line":
      await orderSession.create(lineUserId, "line", "customerName");

      await line.reply(event.replyToken, [
        createTextMessage(
          "🛍️ LINE 訂購\n\n" +
            "接下來將一步一步協助您完成商品訂購。\n\n" +
            "① 請輸入訂購人姓名。",
        ),
      ]);

      return true;

    case "order:platform:shopee":
      await orderSession.create(lineUserId, "shopee", "externalOrderId");

      await line.reply(event.replyToken, [
        createTextMessage(
          "🛒 Shopee 訂單確認\n\n" +
            "為了確認您的訂單身分，請輸入您的 Shopee 訂單編號。",
        ),
      ]);

      return true;

    case "order:cancel":
      await orderSession.delete(lineUserId);

      await line.reply(event.replyToken, [
        createTextMessage(
          "已取消本次訂購。\n\n如需重新訂購，請再次點選「商品訂購」。",
        ),
      ]);

      return true;

    case "order:restart": {
      const session = await orderSession.get(lineUserId);

      if (!session) {
        await line.reply(event.replyToken, [
          createTextMessage("目前沒有進行中的訂單，請重新開始訂購。"),
        ]);

        return true;
      }

      if (session.platform === "shopee") {
        await orderSession.create(lineUserId, "shopee", "externalOrderId");

        await line.reply(event.replyToken, [
          createTextMessage(
            "🔄 已重新開始填寫\n\n請重新輸入您的 Shopee 訂單編號。",
          ),
        ]);

        return true;
      }

      await orderSession.create(lineUserId, "line", "customerName");

      await line.reply(event.replyToken, [
        createTextMessage("🔄 已重新開始填寫\n\n① 請輸入訂購人姓名。"),
      ]);

      return true;
    }

    case "order:confirm": {
      const session = await orderSession.get(lineUserId);

      if (!session) {
        await line.reply(event.replyToken, [
          createTextMessage("找不到訂購資料，請重新開始訂購。"),
        ]);

        return true;
      }

      await line.reply(event.replyToken, [
        createTextMessage(
          "✅ 資料確認完成\n\n" +
            "您的訂購資料已完成確認。\n" +
            "請稍候 Seoul Moment 工作人員確認訂單。",
        ),
      ]);

      return true;
    }

    default:
      return false;
  }
}
