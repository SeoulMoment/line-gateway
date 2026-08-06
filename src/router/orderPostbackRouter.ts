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

    default:
      return false;
  }
}
