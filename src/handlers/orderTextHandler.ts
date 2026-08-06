import { createOrderConfirmationFlex } from "../builders/flex/orderConfirmation";
import { createTextMessage } from "../builders/message/text";
import type { LineService } from "../services/line";
import { OrderSessionService } from "../services/orderSession";
import type { MessageEvent } from "../types/line/webhook";

export async function orderTextHandler(
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

  const orderSession = new OrderSessionService(db);
  const session = await orderSession.get(lineUserId);

  if (!session) {
    return false;
  }

  switch (session.step) {
    case "externalOrderId":
      await orderSession.updateField(
        lineUserId,
        "external_order_id",
        text,
        "customerName",
      );

      await line.reply(event.replyToken, [
        createTextMessage(
          "✅ Shopee 訂單編號已登記\n\n" +
            "② 請輸入訂購人姓名。\n\n" +
            "請輸入與 Shopee 訂單相同的姓名，以便我們確認您的訂單。",
        ),
      ]);

      return true;

    case "customerName":
      await orderSession.updateField(
        lineUserId,
        "customer_name",
        text,
        "productName",
      );

      await line.reply(event.replyToken, [
        createTextMessage(
          "✅ 姓名已登記\n\n" + "接下來，請輸入您要訂購的商品名稱。",
        ),
      ]);

      return true;

    case "productName":
      await orderSession.updateField(lineUserId, "product_name", text, "size");

      await line.reply(event.replyToken, [
        createTextMessage(
          "📏 請輸入商品尺寸。\n\n" +
            "例如：S / M / L / XL / FREE\n\n" +
            "如果商品沒有尺寸選項，請輸入「無」。",
        ),
      ]);

      return true;

    case "size":
      await orderSession.updateField(lineUserId, "size", text, "color");

      await line.reply(event.replyToken, [
        createTextMessage(
          "🎨 請輸入商品顏色。\n\n" + "例如：Black / White / Beige",
        ),
      ]);

      return true;

    case "color":
      await orderSession.updateField(lineUserId, "color", text, "phone");

      await line.reply(event.replyToken, [
        createTextMessage(
          "📱 請輸入聯絡電話。\n\n" + "此電話將用於訂單及配送聯絡。",
        ),
      ]);

      return true;

    case "phone":
      await orderSession.updateField(
        lineUserId,
        "phone",
        text,
        "convenienceStore",
      );

      await line.reply(event.replyToken, [
        createTextMessage("🏪 請輸入取貨超商。\n\n" + "例如：7-ELEVEN / 全家"),
      ]);

      return true;

    case "convenienceStore":
      await orderSession.updateField(
        lineUserId,
        "convenience_store",
        text,
        "storeName",
      );

      await line.reply(event.replyToken, [
        createTextMessage(
          "📍 最後一步\n\n" +
            "請輸入取貨門市資訊。\n\n" +
            "請提供門市名稱，若方便也可以一起提供門市地址。",
        ),
      ]);

      return true;

    case "storeName": {
      await orderSession.updateField(
        lineUserId,
        "store_name",
        text,
        "confirmation",
      );

      const updatedSession = await orderSession.get(lineUserId);

      if (!updatedSession) {
        throw new Error("Order session not found after update.");
      }

      await line.reply(event.replyToken, [
        createOrderConfirmationFlex(updatedSession),
      ]);

      return true;
    }

    case "confirmation":
      return true;

    default:
      return false;
  }
}
