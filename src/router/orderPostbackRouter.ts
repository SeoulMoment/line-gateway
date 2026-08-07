import { createOrderCompleteFlex } from "../builders/flex/orderComplete";
import { createOrderInputStepFlex } from "../builders/flex/orderInputStep";
import { createPaymentInfoFlex } from "../builders/flex/paymentInfo";
import { createTextMessage } from "../builders/message/text";
import type { LineService } from "../services/line";
import { OrderService } from "../services/order";
import { OrderEmailService } from "../services/orderEmail";
import { OrderSessionService } from "../services/orderSession";
import type { PostbackEvent } from "../types/line/webhook";

export async function orderPostbackRouter(
  event: PostbackEvent,
  line: LineService,
  db: D1Database,
  resendApiKey: string,
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
        createOrderInputStepFlex({
          section: "訂購人資訊",
          subtitle: "填寫訂購人的基本資料",
          step: "01 / 04",
          title: "訂購人姓名",
          description: "請輸入訂購人的真實姓名。",
          hint: "請填寫與匯款帳戶相同的姓名，方便我們確認您的付款。",
        }),
      ]);

      return true;

    // Shopee 주문 확인 시작
    case "order:platform:shopee":
      await orderSession.create(lineUserId, "shopee", "externalOrderId");

      await line.reply(event.replyToken, [
        createOrderInputStepFlex({
          section: "Shopee 訂單確認",
          title: "Shopee 訂單編號",
          description: "請輸入您的 Shopee 訂單編號。",
          hint: "我們將透過訂單編號確認您的訂購資訊。",
        }),
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
        createOrderInputStepFlex({
          section: "取貨資訊",
          subtitle: "填寫您的取貨門市",
          step: "04 / 04",
          title: "7-ELEVEN 取貨門市",
          description: "請輸入您希望取貨的 7-ELEVEN 門市名稱。",
          hint: "例如：信義門市\n" + "請依照 7-ELEVEN 顯示的完整門市名稱填寫。",
          completed: "7-ELEVEN 已選擇",
        }),
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
        createOrderInputStepFlex({
          section: "取貨資訊",
          subtitle: "填寫您的取貨門市",
          step: "04 / 04",
          title: "全家取貨門市",
          description: "請輸入您希望取貨的全家門市名稱。",
          hint: "例如：台北信義店\n" + "請依照全家顯示的完整門市名稱填寫。",
          completed: "全家 FamilyMart 已選擇",
        }),
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
          createOrderInputStepFlex({
            section: "Shopee 訂單確認",
            title: "Shopee 訂單編號",
            description: "請重新輸入您的 Shopee 訂單編號。",
            hint: "我們將透過訂單編號確認您的訂購資訊。",
            completed: "已重新開始填寫",
          }),
        ]);

        return true;
      }

      await orderSession.create(lineUserId, "line", "customerName");

      await line.reply(event.replyToken, [
        createOrderInputStepFlex({
          section: "訂購人資訊",
          title: "訂購人姓名",
          description: "請重新輸入訂購人的真實姓名。",
          hint: "請填寫與匯款帳戶相同的姓名，方便我們確認您的付款。",
          completed: "已重新開始填寫",
        }),
      ]);
      return true;
    }

    // 주문 취소
    case "order:cancel":
      await orderSession.delete(lineUserId);

      await line.reply(event.replyToken, [
        createTextMessage(
          "ORDER · 已取消\n\n" +
            "本次訂購已取消。\n\n" +
            "如需重新訂購，請再次點選「商品訂購」。",
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

      // 1. 주문을 D1 orders 테이블에 저장
      const orderService = new OrderService(db);

      const order = await orderService.createFromSession(session);

      console.log("Order created successfully:", order.orderNumber);

      // 2. Resend를 통해 관리자 이메일 발송
      // 이메일 발송이 실패해도 저장된 주문은 유지
      try {
        const orderEmail = new OrderEmailService(resendApiKey);

        await orderEmail.sendNewOrder(order);

        console.log("Order email sent successfully:", order.orderNumber);
      } catch (error) {
        console.error("Failed to send order notification email:", error);
      }

      // 3. 임시 주문 세션 삭제
      await orderSession.delete(lineUserId);

      // 4. 고객에게 주문 완료 + 결제정보 안내
      await line.reply(event.replyToken, [
        createOrderCompleteFlex(order.orderNumber),
        createPaymentInfoFlex(),
      ]);

      return true;
    }

    default:
      return false;
  }
}
