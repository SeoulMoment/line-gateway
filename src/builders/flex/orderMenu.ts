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
            text: "商品訂購",
            size: "xl",
            weight: "bold",
            color: "#111111",
          },
          {
            type: "text",
            text: "透過 Seoul Moment LINE 即可輕鬆完成商品訂購。",
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

          {
            type: "text",
            text: "訂購前請準備",
            size: "sm",
            weight: "bold",
            color: "#333333",
            margin: "lg",
          },

          {
            type: "box",
            layout: "vertical",
            margin: "sm",
            paddingAll: "16px",
            backgroundColor: "#F7F7F7",
            cornerRadius: "12px",
            spacing: "md",
            contents: [
              {
                type: "box",
                layout: "horizontal",
                contents: [
                  {
                    type: "text",
                    text: "01",
                    size: "xs",
                    color: "#999999",
                    weight: "bold",
                    flex: 1,
                  },
                  {
                    type: "text",
                    text: "訂購人姓名",
                    size: "sm",
                    color: "#333333",
                    flex: 5,
                  },
                ],
              },
              {
                type: "box",
                layout: "horizontal",
                contents: [
                  {
                    type: "text",
                    text: "02",
                    size: "xs",
                    color: "#999999",
                    weight: "bold",
                    flex: 1,
                  },
                  {
                    type: "text",
                    text: "商品名稱・尺寸・顏色",
                    size: "sm",
                    color: "#333333",
                    flex: 5,
                    wrap: true,
                  },
                ],
              },
              {
                type: "box",
                layout: "horizontal",
                contents: [
                  {
                    type: "text",
                    text: "03",
                    size: "xs",
                    color: "#999999",
                    weight: "bold",
                    flex: 1,
                  },
                  {
                    type: "text",
                    text: "聯絡電話",
                    size: "sm",
                    color: "#333333",
                    flex: 5,
                  },
                ],
              },
              {
                type: "box",
                layout: "horizontal",
                contents: [
                  {
                    type: "text",
                    text: "04",
                    size: "xs",
                    color: "#999999",
                    weight: "bold",
                    flex: 1,
                  },
                  {
                    type: "text",
                    text: "超商取貨門市資訊",
                    size: "sm",
                    color: "#333333",
                    flex: 5,
                    wrap: true,
                  },
                ],
              },
            ],
          },

          {
            type: "text",
            text: "不用擔心，我們會一步一步引導您完成填寫。",
            size: "xs",
            color: "#999999",
            wrap: true,
            lineSpacing: "3px",
            margin: "sm",
          },
        ],
      },

      footer: {
        type: "box",
        layout: "vertical",
        paddingAll: "16px",
        paddingTop: "4px",
        contents: [
          {
            type: "button",
            style: "primary",
            height: "sm",
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
