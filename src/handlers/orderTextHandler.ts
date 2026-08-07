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
          "ORDER · 02\n" +
            "訂購人姓名\n\n" +
            "Shopee 訂單編號已登記 ✓\n\n" +
            "請輸入與 Shopee 訂單相同的真實姓名，" +
            "以便我們確認您的訂單。",
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
          "ORDER · 商品資訊\n" +
            "商品名稱\n\n" +
            "訂購人姓名已登記 ✓\n\n" +
            "請輸入您要訂購的商品名稱。\n\n" +
            "請盡量填寫完整商品名稱，以便我們確認商品。",
        ),
      ]);

      return true;

    // 상품명
    case "productName":
      await orderSession.updateField(lineUserId, "product_name", text, "size");

      await line.reply(event.replyToken, [
        createTextMessage(
          "ORDER · 商品資訊\n" +
            "商品尺寸\n\n" +
            "商品名稱已登記 ✓\n\n" +
            "請輸入您要訂購的尺寸。\n\n" +
            "例如：S / M / L / 1 / 2 / 26 / 230 / FREE\n\n" +
            "請依照商品頁面標示的尺寸填寫。\n" +
            "若商品沒有尺寸選項，請輸入「無」。",
        ),
      ]);

      return true;

    // 사이즈
    case "size":
      await orderSession.updateField(lineUserId, "size", text, "color");

      await line.reply(event.replyToken, [
        createTextMessage(
          "ORDER · 商品資訊\n" +
            "商品顏色\n\n" +
            "尺寸已登記 ✓\n\n" +
            "請輸入您要訂購的商品顏色。\n\n" +
            "例如：Black / White / Beige",
        ),
      ]);

      return true;

    // 색상
    case "color":
      await orderSession.updateField(lineUserId, "color", text, "phone");

      await line.reply(event.replyToken, [
        createTextMessage(
          "ORDER · 聯絡資訊\n" +
            "聯絡電話\n\n" +
            "商品資訊已登記 ✓\n\n" +
            "請輸入 09 開頭的 10 碼台灣手機號碼。\n\n" +
            "例如：0912345678",
        ),
      ]);

      return true;

    // 전화번호
    case "phone": {
      const phone = text.replace(/[\s-]/g, "");

      if (!/^09\d{8}$/.test(phone)) {
        await line.reply(event.replyToken, [
          createTextMessage(
            "電話號碼格式不正確\n\n" +
              "請確認後重新輸入 09 開頭的 10 碼台灣手機號碼。\n\n" +
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
              paddingAll: "24px",
              spacing: "md",
              contents: [
                {
                  type: "text",
                  text: "ORDER",
                  size: "xs",
                  color: "#999999",
                  weight: "bold",
                },
                {
                  type: "text",
                  text: "選擇取貨超商",
                  size: "xl",
                  weight: "bold",
                  color: "#111111",
                },
                {
                  type: "text",
                  text: "聯絡電話已登記 ✓",
                  size: "xs",
                  color: "#999999",
                },
                {
                  type: "text",
                  text: "請選擇您希望取貨的超商。",
                  size: "sm",
                  color: "#666666",
                  wrap: true,
                },

                {
                  type: "separator",
                  margin: "xl",
                  color: "#EEEEEE",
                },

                {
                  type: "box",
                  layout: "horizontal",
                  margin: "lg",
                  paddingAll: "16px",
                  backgroundColor: "#F7F7F7",
                  cornerRadius: "12px",
                  alignItems: "center",
                  action: {
                    type: "postback",
                    label: "7-ELEVEN",
                    data: "order:store:seven",
                    displayText: "7-ELEVEN",
                  },
                  contents: [
                    {
                      type: "box",
                      layout: "vertical",
                      flex: 1,
                      spacing: "xs",
                      contents: [
                        {
                          type: "text",
                          text: "7-ELEVEN",
                          size: "sm",
                          weight: "bold",
                          color: "#111111",
                        },
                        {
                          type: "text",
                          text: "選擇 7-ELEVEN 門市取貨",
                          size: "xs",
                          color: "#888888",
                        },
                      ],
                    },
                    {
                      type: "text",
                      text: "›",
                      size: "xl",
                      color: "#999999",
                      align: "end",
                    },
                  ],
                },

                {
                  type: "box",
                  layout: "horizontal",
                  margin: "sm",
                  paddingAll: "16px",
                  backgroundColor: "#F7F7F7",
                  cornerRadius: "12px",
                  alignItems: "center",
                  action: {
                    type: "postback",
                    label: "全家 FamilyMart",
                    data: "order:store:familymart",
                    displayText: "全家 FamilyMart",
                  },
                  contents: [
                    {
                      type: "box",
                      layout: "vertical",
                      flex: 1,
                      spacing: "xs",
                      contents: [
                        {
                          type: "text",
                          text: "全家 FamilyMart",
                          size: "sm",
                          weight: "bold",
                          color: "#111111",
                        },
                        {
                          type: "text",
                          text: "選擇全家門市取貨",
                          size: "xs",
                          color: "#888888",
                        },
                      ],
                    },
                    {
                      type: "text",
                      text: "›",
                      size: "xl",
                      color: "#999999",
                      align: "end",
                    },
                  ],
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
          "ORDER · 取貨資訊\n\n" +
            "請使用上方選項選擇取貨超商。\n\n" +
            "目前提供：7-ELEVEN / 全家 FamilyMart",
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
          "ORDER · 訂購確認\n\n" +
            "請使用上方「訂購內容確認」卡片完成操作。\n\n" +
            "確認資料無誤後請選擇「確認訂購」。",
        ),
      ]);

      return true;

    default:
      return false;
  }
}
