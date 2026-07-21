import { FlexMessage } from "../../types/line";

export function createOrderMenuFlex(): FlexMessage {
  return {
    type: "flex",
    altText: "訂單查詢",
    contents: {
      type: "bubble",
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "📦 訂單查詢",
            weight: "bold",
            size: "xl",
          },
          {
            type: "text",
            text: "查詢您的訂單狀態與配送進度。",
            margin: "md",
            color: "#666666",
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
            action: {
              type: "uri",
              label: "查看訂單",
              uri: "https://seoulmoment.com.tw/orders",
            },
          },
        ],
      },
    },
  };
}
