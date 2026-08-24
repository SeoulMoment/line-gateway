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
        paddingAll: "20px",
        spacing: "md",
        contents: [
          {
            type: "text",
            text: "CUSTOMER SERVICE",
            size: "xs",
            color: "#999999",
            weight: "bold",
          },
          {
            type: "text",
            text: "聯絡客服",
            weight: "bold",
            size: "xl",
            color: "#111111",
          },
          {
            type: "text",
            text: "商品、訂單、付款或配送相關問題，我們都很樂意協助您。",
            size: "sm",
            color: "#666666",
            wrap: true,
            lineSpacing: "4px",
          },

          {
            type: "separator",
            margin: "lg",
            color: "#EEEEEE",
          },

          // 付款資訊快捷入口
          {
            type: "box",
            layout: "horizontal",
            margin: "lg",
            paddingAll: "14px",
            backgroundColor: "#F7F7F7",
            cornerRadius: "10px",
            alignItems: "center",
            action: {
              type: "postback",
              label: "付款資訊",
              data: "payment:info",
              displayText: "付款資訊",
            },
            contents: [
              {
                type: "box",
                layout: "vertical",
                flex: 1,
                contents: [
                  {
                    type: "text",
                    text: "付款資訊",
                    weight: "bold",
                    size: "sm",
                    color: "#111111",
                  },
                  {
                    type: "text",
                    text: "銀行轉帳・匯款說明",
                    size: "xs",
                    color: "#888888",
                    margin: "xs",
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

          // 客服時間
          {
            type: "box",
            layout: "vertical",
            margin: "lg",
            spacing: "sm",
            contents: [
              {
                type: "text",
                text: "客服時間",
                weight: "bold",
                size: "sm",
                color: "#333333",
              },
              {
                type: "text",
                text: "週一至週五  10:00–18:00",
                size: "sm",
                color: "#666666",
              },
              {
                type: "text",
                text: "非客服時間收到的訊息，將於下一個工作日依序回覆。",
                size: "xs",
                color: "#999999",
                wrap: true,
              },
            ],
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
            color: "#111111",
            action: {
              type: "postback",
              label: "開始聊天",
              data: "support:start",
            },
          },
          {
            type: "button",
            action: {
              type: "postback",
              label: "返回",
              data: "support:cancel",
            },
          },
        ],
      },
    },
  };
}
