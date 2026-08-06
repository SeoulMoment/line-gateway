import { createTextMessage } from "../builders/message/text";
import type { LineService } from "../services/line";
import type { PostbackEvent } from "../types/line/webhook";

export async function orderPostbackRouter(
  event: PostbackEvent,
  line: LineService,
): Promise<boolean> {
  const data = event.postback.data;

  switch (data) {
    case "order:platform:line":
      await line.reply(event.replyToken, [
        createTextMessage(
          "🛍️ LINE 訂購\n\n" +
            "接下來將協助您完成商品訂購。\n\n" +
            "① 請先輸入訂購人姓名。",
        ),
      ]);

      return true;

    case "order:platform:shopee":
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
