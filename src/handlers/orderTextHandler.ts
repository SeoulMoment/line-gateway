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
    // Shopee 주문번호
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
            "② 請輸入訂購人姓名\n\n" +
            "請輸入與 Shopee 訂單相同的真實姓名，以便我們確認您的訂單。",
        ),
      ]);

      return true;

    // 주문자 실명
    case "customerName":
      await orderSession.updateField(
        lineUserId,
        "customer_name",
        text,
        "productName",
      );

      await line.reply(event.replyToken, [
        createTextMessage(
          "✅ 姓名已登記\n\n" +
            "接下來，請輸入您要訂購的商品名稱。",
        ),
      ]);

      return true;

    // 상품명
    case "productName":
      await orderSession.updateField(
        lineUserId,
        "product_name",
        text,
        "size",
      );

      await line.reply(event.replyToken, [
        createTextMessage(
          "📏 請輸入商品尺寸\n\n" +
            "例如：S / M / L / XL / FREE\n\n" +
            "如果商品沒有尺寸選項，請輸入「無」。",
        ),
      ]);

      return true;

    // 사이즈
    case "size":
      await orderSession.updateField(
        lineUserId,
        "size",
        text,
        "color",
      );

      await line.reply(event.replyToken, [
        createTextMessage(
          "🎨 請輸入商品顏色\n\n" +
            "例如：Black / White / Beige",
        ),
      ]);

      return true;

    // 색상
    case "color":
      await orderSession.updateField(
        lineUserId,
        "color",
        text,
        "phone",
      );

      await line.reply(event.replyToken, [
        createTextMessage(
          "📱 請輸入聯絡電話\n\n" +
            "請輸入 09 開頭的 10 碼台灣手機號碼。\n\n" +
            "例如：0912345678",
        ),
      ]);

      return true;

    // 전화번호
    case "phone": {
      // 공백과 - 제거
      const phone = text.replace(/[\s-]/g, "");

      // 대만 휴대폰 번호:
      // 09 + 숫자 8자리 = 총 10자리
      if (!/^09\d{8}$/.test(phone)) {
        await line.reply(event.replyToken, [
          createTextMessage(
            "⚠️ 電話號碼格式不正確\n\n" +
              "請輸入 09 開頭的 10 碼台灣手機號碼。\n\n" +
              "例如：0912345678",
          ),
        ]);

        return true;
      }

      await orderSession.updateField(
        lineUserId,
        "phone",
        phone,
        "convenienceStore",
      );

      await line.reply(event.replyToken, [
        {
          type: "flex",
          altText: "選擇取貨超商",
          contents: {
            type: "bubble",

            body: {
              type: "box",
              layout: "vertical",
              spacing: "md",
              contents: [
                {
                  type: "text",
                  text: "🏪 選擇取貨超商",
                  weight: "bold",
                  size: "lg",
                },
                {
                  type: "text",
                  text: "請選擇您希望取貨的超商。",
                  size: "sm",
                  color: "#888888",
                  wrap: true,
                },
              ],
            },

            footer: {
              type: "box",
              layout: "vertical",
              spacing: "sm",
              contents: [
                {
                  type: "button",
                  style: "primary",
                  color: "#008C44",
                  action: {
                    type: "postback",
                    label: "7-ELEVEN",
                    data: "order:store:seven",
                    displayText: "7-ELEVEN",
                  },
                },
                {
                  type: "button",
                  style: "secondary",
                  action: {
                    type: "postback",
                    label: "全家 FamilyMart",
                    data: "order:store:familymart",
                    displayText: "全家 FamilyMart",
                  },
                },
              ],
            },
          },
        },
      ]);

      return true;
    }

    // 편의점은 반드시 버튼으로 선택
    case "convenienceStore":
      await line.reply(event.replyToken, [
        createTextMessage(
          "🏪 請使用上方按鈕選擇取貨超商。\n\n" +
            "目前可選擇：\n" +
            "・7-ELEVEN\n" +
            "・全家 FamilyMart",
        ),
      ]);

      return true;

    // 편의점 지점명
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

    // 최종 확인 대기
    case "confirmation":
      await line.reply(event.replyToken, [
        createTextMessage(
          "請使用訂購資料確認卡下方的按鈕完成操作。\n\n" +
            "・確認送出\n" +
            "・重新填寫\n" +
            "・取消訂購",
        ),
      ]);

      return true;

    default:
      return false;
  }
}