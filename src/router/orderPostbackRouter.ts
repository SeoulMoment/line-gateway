import { createTextMessage } from "../builders/message/text";
import type { LineService } from "../services/line";
import { OrderService } from "../services/order";
import { OrderEmailService } from "../services/orderEmail";
import { OrderSessionService } from "../services/orderSession";
import { EmailBinding } from "../types/email";
import type { PostbackEvent } from "../types/line/webhook";

export async function orderPostbackRouter(
  event: PostbackEvent,
  line: LineService,
  db: D1Database,
  email: EmailBinding,
): Promise<boolean> {
  const data = event.postback.data;
  const lineUserId = event.source.userId;

  if (!lineUserId) {
    return false;
  }

  const orderSession = new OrderSessionService(db);

  switch (data) {
    // LINE 주문 시작
    case "order:platform:line":
      await orderSession.create(lineUserId, "line", "customerName");

      await line.reply(event.replyToken, [
        createTextMessage(
          "🛍️ LINE 訂購\n\n" +
            "接下來將一步一步協助您完成商品訂購。\n\n" +
            "① 請輸入訂購人姓名\n\n" +
            "請填寫與匯款帳戶相同的真實姓名，以便我們確認付款。",
        ),
      ]);

      return true;

    // Shopee 주문 확인 시작
    case "order:platform:shopee":
      await orderSession.create(lineUserId, "shopee", "externalOrderId");

      await line.reply(event.replyToken, [
        createTextMessage(
          "🛒 Shopee 訂單確認\n\n" +
            "為了確認您的訂單身分，請輸入您的 Shopee 訂單編號。",
        ),
      ]);

      return true;

    // 7-ELEVEN 선택
    case "order:store:seven": {
      const session = await orderSession.get(lineUserId);

      if (!session) {
        await line.reply(event.replyToken, [
          createTextMessage("找不到進行中的訂購資料。\n\n請重新開始訂購。"),
        ]);

        return true;
      }

      if (session.step !== "convenienceStore") {
        await line.reply(event.replyToken, [
          createTextMessage(
            "目前無法選擇取貨超商。\n\n請依照訂購步驟完成資料填寫。",
          ),
        ]);

        return true;
      }

      await orderSession.updateField(
        lineUserId,
        "convenience_store",
        "7-ELEVEN",
        "storeName",
      );

      await line.reply(event.replyToken, [
        createTextMessage(
          "📍 取貨門市\n\n" +
            "您已選擇：7-ELEVEN\n\n" +
            "請輸入取貨門市名稱。\n\n" +
            "例如：信義門市",
        ),
      ]);

      return true;
    }

    // FamilyMart 선택
    case "order:store:familymart": {
      const session = await orderSession.get(lineUserId);

      if (!session) {
        await line.reply(event.replyToken, [
          createTextMessage("找不到進行中的訂購資料。\n\n請重新開始訂購。"),
        ]);

        return true;
      }

      if (session.step !== "convenienceStore") {
        await line.reply(event.replyToken, [
          createTextMessage(
            "目前無法選擇取貨超商。\n\n請依照訂購步驟完成資料填寫。",
          ),
        ]);

        return true;
      }

      await orderSession.updateField(
        lineUserId,
        "convenience_store",
        "全家 FamilyMart",
        "storeName",
      );

      await line.reply(event.replyToken, [
        createTextMessage(
          "📍 取貨門市\n\n" +
            "您已選擇：全家 FamilyMart\n\n" +
            "請輸入取貨門市名稱。\n\n" +
            "例如：台北信義店",
        ),
      ]);

      return true;
    }

    // 주문 다시 작성
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
            "🔄 已重新開始填寫\n\n" + "請重新輸入您的 Shopee 訂單編號。",
          ),
        ]);

        return true;
      }

      await orderSession.create(lineUserId, "line", "customerName");

      await line.reply(event.replyToken, [
        createTextMessage(
          "🔄 已重新開始填寫\n\n" +
            "① 請輸入訂購人姓名。\n\n" +
            "請填寫與匯款帳戶相同的真實姓名。",
        ),
      ]);

      return true;
    }

    // 주문 취소
    case "order:cancel":
      await orderSession.delete(lineUserId);

      await line.reply(event.replyToken, [
        createTextMessage(
          "已取消本次訂購。\n\n" + "如需重新訂購，請再次點選「商品訂購」。",
        ),
      ]);

      return true;

    // 주문 최종 확인
    case "order:confirm": {
      const session = await orderSession.get(lineUserId);

      if (!session) {
        await line.reply(event.replyToken, [
          createTextMessage("找不到訂購資料，請重新開始訂購。"),
        ]);

        return true;
      }

      if (session.step !== "confirmation") {
        await line.reply(event.replyToken, [
          createTextMessage(
            "訂購資料尚未填寫完成。\n\n" + "請完成所有訂購步驟後再送出。",
          ),
        ]);

        return true;
      }

      const orderService = new OrderService(db);

      const order = await orderService.createFromSession(session);

      // 주문은 이미 DB에 저장됨.
      // 이메일 실패가 주문 자체를 삭제시키면 안 됨.
      try {
        const orderEmail = new OrderEmailService(email);

        await orderEmail.sendNewOrder(order);
      } catch (error) {
        console.error("Failed to send order notification email:", error);
      }

      // 정식 주문 저장 후 임시 세션 삭제
      await orderSession.delete(lineUserId);

      await line.reply(event.replyToken, [
        createTextMessage(
          "✅ 訂單已成功送出\n\n" +
            `您的訂單編號：\n${order.orderNumber}\n\n` +
            "我們已收到您的訂購資料。\n\n" +
            "Seoul Moment 工作人員確認商品、庫存及付款資訊後，" +
            "將透過 LINE 與您聯絡。\n\n" +
            "請保留您的訂單編號，以便後續查詢。\n\n" +
            "感謝您的訂購 🤍",
        ),
      ]);

      return true;
    }

    default:
      return false;
  }
}
