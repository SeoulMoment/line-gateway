import type { FlexMessage } from "../../types/line";

export function createOrderMenuFlex(): FlexMessage {
  return {
    type: "flex",
    altText: "商品訂購",
    contents: {
      type: "bubble",

      body: {
        type: "box",
        layout: "vertical",
        spacing: "md",
        contents: [
          {
            type: "text",
            text: "🛍️ 商品訂購",
            weight: "bold",
            size: "xl",
          },
          {
            type: "text",
            text: "歡迎使用 Seoul Moment 商品訂購服務",
            size: "sm",
            color: "#666666",
            wrap: true,
          },
          {
            type: "separator",
            margin: "md",
          },
          {
            type: "text",
            text: "訂購前請準備以下資料",
            weight: "bold",
            size: "sm",
            margin: "md",
          },
          {
            type: "text",
            text:
              "・購買平台 / 訂單編號\n" +
              "・訂購人姓名\n" +
              "・商品名稱\n" +
              "・尺寸 / 顏色\n" +
              "・聯絡電話\n" +
              "・超商取貨門市資訊",
            size: "sm",
            color: "#666666",
            wrap: true,
          },
          {
            type: "text",
            text: "接下來會一步一步協助您完成資料填寫。",
            size: "xs",
            color: "#999999",
            wrap: true,
            margin: "md",
          },
        ],
      },

      footer: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "button",
            style: "primary",
            color: "#111111",
            action: {
              type: "postback",
              label: "開始訂購",
              data: "order:start",
              displayText: "開始訂購",
            },
          },
        ],
      },
    },
  };
}
