import { createOrderConfirmationFlex } from "../builders/flex/orderConfirmation";
import { createOrderInputStepFlex } from "../builders/flex/orderInputStep";
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
        createOrderInputStepFlex({
          section: "訂購人資訊",
          subtitle: "填寫訂購人的基本資料",
          step: "01 / 04",
          title: "訂購人姓名",
          description: "請輸入與 Shopee 訂單相同的真實姓名。",
          hint: "我們將使用此姓名確認您的 Shopee 訂單。",
          completed: "Shopee 訂單編號已完成",
        }),
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
        createOrderInputStepFlex({
          section: "商品資訊",
          subtitle: "填寫您要購買的商品",
          step: "02 / 04",
          title: "商品名稱",
          description: "請輸入您要訂購的商品名稱。",
          hint: "請依照商品頁面顯示的完整商品名稱填寫。",
          completed: "訂購人資訊已完成",
        }),
      ]);

      return true;

    // 상품명
    case "productName":
      await orderSession.updateField(lineUserId, "product_name", text, "size");

      await line.reply(event.replyToken, [
        createOrderInputStepFlex({
          section: "商品資訊",
          subtitle: "填寫您要購買的商品",
          step: "02 / 04",
          title: "商品尺寸",
          description: "請輸入您要訂購的尺寸。",
          hint:
            "例如：M / XL / 2 / 26 / 230 / FREE\n" +
            "請依照商品頁面標示的尺寸填寫。若無尺寸選項，請輸入「無」。",
          completed: "商品名稱已完成",
        }),
      ]);

      return true;

    // 사이즈
    case "size":
      await orderSession.updateField(lineUserId, "size", text, "color");

      await line.reply(event.replyToken, [
        createOrderInputStepFlex({
          section: "商品資訊",
          subtitle: "填寫您要購買的商品",
          step: "02 / 04",
          title: "商品顏色",
          description: "請輸入您要訂購的商品顏色。",
          hint: "例如：Black / White / Beige",
          completed: "商品尺寸已完成",
        }),
      ]);

      return true;

    // 색상
    case "color":
      await orderSession.updateField(lineUserId, "color", text, "phone");

      await line.reply(event.replyToken, [
        createOrderInputStepFlex({
          section: "聯絡資訊",
          subtitle: "填寫您的聯絡方式",
          step: "03 / 04",
          title: "聯絡電話",
          description: "請輸入 09 開頭的 10 碼台灣手機號碼。",
          hint: "例如：0912345678",
          completed: "商品資訊已完成",
        }),
      ]);

      return true;

    // 전화번호
    case "phone": {
      const phone = text.replace(/[\s-]/g, "");

      if (!/^09\d{8}$/.test(phone)) {
        await line.reply(event.replyToken, [
          createOrderInputStepFlex({
            section: "聯絡資訊",
            subtitle: "請重新確認您的聯絡方式",
            step: "03 / 04",
            title: "聯絡電話",
            description: "電話號碼格式不正確，請重新輸入。",
            hint: "請輸入 09 開頭的 10 碼台灣手機號碼。\n" + "例如：0912345678",
          }),
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
                // ORDER PROCESS + STEP
                {
                  type: "box",
                  layout: "horizontal",
                  contents: [
                    {
                      type: "text",
                      text: "ORDER PROCESS",
                      size: "xs",
                      color: "#777777",
                      weight: "bold",
                      flex: 1,
                    },
                    {
                      type: "text",
                      text: "04 / 04",
                      size: "xs",
                      color: "#111111",
                      weight: "bold",
                      align: "end",
                    },
                  ],
                },

                // 현재 섹션
                {
                  type: "text",
                  text: "取貨資訊",
                  size: "xl",
                  weight: "bold",
                  color: "#111111",
                  margin: "md",
                },
                {
                  type: "text",
                  text: "選擇您希望取貨的超商",
                  size: "sm",
                  color: "#555555",
                  wrap: true,
                },

                {
                  type: "separator",
                  margin: "lg",
                  color: "#E5E5E5",
                },

                // 이전 단계 완료
                {
                  type: "box",
                  layout: "horizontal",
                  margin: "lg",
                  paddingAll: "12px",
                  backgroundColor: "#F3F3F3",
                  cornerRadius: "8px",
                  contents: [
                    {
                      type: "text",
                      text: "✓",
                      size: "sm",
                      color: "#111111",
                      weight: "bold",
                      flex: 0,
                    },
                    {
                      type: "text",
                      text: "聯絡資訊已完成",
                      size: "sm",
                      color: "#555555",
                      margin: "sm",
                      wrap: true,
                    },
                  ],
                },

                // 7-ELEVEN
                {
                  type: "box",
                  layout: "horizontal",
                  margin: "md",
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
                          color: "#666666",
                        },
                      ],
                    },
                    {
                      type: "text",
                      text: "›",
                      size: "xl",
                      color: "#777777",
                      align: "end",
                    },
                  ],
                },

                // FamilyMart
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
                          color: "#666666",
                        },
                      ],
                    },
                    {
                      type: "text",
                      text: "›",
                      size: "xl",
                      color: "#777777",
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
          "請使用上方「訂購內容確認」卡片完成操作。\n\n" +
            "確認資料無誤後請選擇「確認訂購」。",
        ),
      ]);

      return true;

    default:
      return false;
  }
}
