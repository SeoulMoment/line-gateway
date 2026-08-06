import type { FlexMessage } from "../../types/line";

const ASSET_BASE_URL = "https://line-gateway.seoul-moment.workers.dev";

export function createSupportFlex(): FlexMessage {
  return {
    type: "flex",
    altText: "聯絡客服",
    contents: {
      type: "bubble",

      hero: {
        type: "image",
        url: `${ASSET_BASE_URL}/menu/support.webp?v=2`,
        size: "full",
        aspectRatio: "20:8",
        aspectMode: "cover",
      },

      body: {
        type: "box",
        layout: "vertical",
        spacing: "md",
        contents: [
          {
            type: "text",
            text: "聯絡客服",
            weight: "bold",
            size: "xl",
          },
          {
            type: "text",
            text: "有任何商品、訂單或配送相關問題嗎？",
            size: "sm",
            color: "#666666",
            wrap: true,
          },
          {
            type: "text",
            text: "歡迎聯絡 Seoul Moment 客服，我們會盡快協助您處理。",
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
            text: "客服時間",
            weight: "bold",
            size: "sm",
            margin: "md",
          },
          {
            type: "text",
            text: "週一至週五 10:00–18:00",
            size: "sm",
            color: "#666666",
          },
          {
            type: "text",
            text: "非客服時間收到的訊息，我們將於下一個工作日依序回覆。",
            size: "xs",
            color: "#999999",
            wrap: true,
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
              type: "uri",
              label: "聯絡 Seoul Moment",
              uri: "https://seoulmoment.com.tw/zh-TW/contact",
            },
          },
        ],
      },
    },
  };
}
