import type { FlexMessage } from "../../types/line";

export function createOrderPlatformMenuFlex(): FlexMessage {
  return {
    type: "flex",
    altText: "選擇訂購方式",
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
            text: "選擇訂購方式",
            size: "xl",
            weight: "bold",
            color: "#111111",
          },
          {
            type: "text",
            text: "請選擇您目前需要的訂購服務。",
            size: "sm",
            color: "#666666",
            wrap: true,
            lineSpacing: "4px",
          },

          {
            type: "separator",
            margin: "xl",
            color: "#EEEEEE",
          },

          // LINE 訂購
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
              label: "LINE 訂購",
              data: "order:platform:line",
              displayText: "LINE 訂購",
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
                    text: "LINE 訂購",
                    size: "sm",
                    weight: "bold",
                    color: "#111111",
                  },
                  {
                    type: "text",
                    text: "直接填寫商品與取貨資料",
                    size: "xs",
                    color: "#888888",
                    wrap: true,
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

          // Shopee 訂單
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
              label: "Shopee 訂單",
              data: "order:platform:shopee",
              displayText: "Shopee 訂單",
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
                    text: "Shopee 訂單",
                    size: "sm",
                    weight: "bold",
                    color: "#111111",
                  },
                  {
                    type: "text",
                    text: "確認已成立的 Shopee 訂單",
                    size: "xs",
                    color: "#888888",
                    wrap: true,
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
            type: "text",
            text: "點選上方選項後，我們將引導您完成後續步驟。",
            size: "xs",
            color: "#999999",
            wrap: true,
            lineSpacing: "3px",
            margin: "sm",
          },
        ],
      },
    },
  };
}
