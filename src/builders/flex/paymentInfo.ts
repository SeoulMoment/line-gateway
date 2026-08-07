import type { FlexMessage } from "../../types/line";

export function createPaymentInfoFlex(): FlexMessage {
  return {
    type: "flex",
    altText: "Seoul Moment 付款資訊",
    contents: {
      type: "bubble",

      body: {
        type: "box",
        layout: "vertical",
        paddingAll: "24px",
        spacing: "md",
        contents: [
          // Header
          {
            type: "box",
            layout: "horizontal",
            contents: [
              {
                type: "text",
                text: "PAYMENT",
                size: "xs",
                color: "#777777",
                weight: "bold",
                flex: 1,
              },
              {
                type: "text",
                text: "READY",
                size: "xs",
                color: "#111111",
                weight: "bold",
                align: "end",
              },
            ],
          },

          // Title
          {
            type: "text",
            text: "付款資訊",
            size: "xl",
            weight: "bold",
            color: "#111111",
            margin: "md",
          },
          {
            type: "text",
            text: "目前提供銀行轉帳付款，請依照以下資訊完成匯款。",
            size: "sm",
            color: "#555555",
            wrap: true,
            lineSpacing: "4px",
          },

          {
            type: "separator",
            margin: "lg",
            color: "#E5E5E5",
          },

          // Payment method
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
                text: "銀行轉帳",
                size: "sm",
                color: "#555555",
                weight: "bold",
                margin: "sm",
                wrap: true,
              },
            ],
          },

          // Bank information
          {
            type: "box",
            layout: "vertical",
            margin: "md",
            paddingAll: "18px",
            backgroundColor: "#F8F8F8",
            cornerRadius: "12px",
            spacing: "md",
            contents: [
              {
                type: "text",
                text: "BANK INFORMATION",
                size: "xs",
                color: "#777777",
                weight: "bold",
              },

              {
                type: "box",
                layout: "horizontal",
                margin: "sm",
                contents: [
                  {
                    type: "text",
                    text: "銀行",
                    size: "sm",
                    color: "#666666",
                    flex: 2,
                  },
                  {
                    type: "text",
                    text: "第一銀行",
                    size: "sm",
                    color: "#111111",
                    weight: "bold",
                    align: "end",
                    flex: 4,
                  },
                ],
              },

              {
                type: "box",
                layout: "horizontal",
                contents: [
                  {
                    type: "text",
                    text: "銀行代碼",
                    size: "sm",
                    color: "#666666",
                    flex: 2,
                  },
                  {
                    type: "text",
                    text: "007",
                    size: "sm",
                    color: "#111111",
                    weight: "bold",
                    align: "end",
                    flex: 4,
                  },
                ],
              },

              {
                type: "box",
                layout: "horizontal",
                contents: [
                  {
                    type: "text",
                    text: "帳號",
                    size: "sm",
                    color: "#666666",
                    flex: 2,
                  },
                  {
                    type: "text",
                    text: "15210274358",
                    size: "md",
                    color: "#111111",
                    weight: "bold",
                    align: "end",
                    flex: 4,
                  },
                ],
              },

              {
                type: "separator",
                color: "#E5E5E5",
                margin: "xs",
              },

              {
                type: "box",
                layout: "horizontal",
                contents: [
                  {
                    type: "text",
                    text: "戶名",
                    size: "sm",
                    color: "#666666",
                    flex: 2,
                  },
                  {
                    type: "text",
                    text: "首爾映像有限公司",
                    size: "sm",
                    color: "#111111",
                    weight: "bold",
                    align: "end",
                    flex: 4,
                    wrap: true,
                  },
                ],
              },
            ],
          },

          // Important notice
          {
            type: "box",
            layout: "vertical",
            margin: "md",
            paddingAll: "16px",
            backgroundColor: "#FFF9EC",
            cornerRadius: "10px",
            spacing: "sm",
            contents: [
              {
                type: "text",
                text: "IMPORTANT",
                size: "xs",
                color: "#8A641E",
                weight: "bold",
              },
              {
                type: "text",
                text: "匯款姓名請與訂購人相同",
                weight: "bold",
                size: "sm",
                color: "#755A28",
              },
              {
                type: "text",
                text:
                  "請使用與訂單「訂購人」相同的姓名進行匯款，" +
                  "以便我們快速核對您的款項。",
                size: "xs",
                color: "#755A28",
                wrap: true,
                lineSpacing: "3px",
              },
            ],
          },

          {
            type: "text",
            text:
              "若實際匯款人姓名不同，請聯絡客服並提供訂單編號、" +
              "訂購人姓名及實際匯款人姓名。",
            size: "xs",
            color: "#666666",
            wrap: true,
            lineSpacing: "3px",
            margin: "sm",
          },

          {
            type: "separator",
            margin: "lg",
            color: "#E5E5E5",
          },

          // After payment
          {
            type: "text",
            text: "AFTER PAYMENT",
            size: "xs",
            color: "#777777",
            weight: "bold",
            margin: "md",
          },
          {
            type: "text",
            text: "完成匯款後",
            size: "md",
            color: "#111111",
            weight: "bold",
          },
          {
            type: "text",
            text: "我們確認款項後，將再透過 LINE 通知您付款確認結果。",
            size: "sm",
            color: "#555555",
            wrap: true,
            lineSpacing: "4px",
          },
        ],
      },

      footer: {
        type: "box",
        layout: "vertical",
        paddingAll: "20px",
        paddingTop: "0px",
        spacing: "sm",
        contents: [
          {
            type: "button",
            style: "primary",
            height: "sm",
            color: "#111111",
            action: {
              type: "uri",
              label: "付款問題・聯絡客服",
              uri: "https://seoulmoment.com.tw/zh-TW/contact",
            },
          },
          {
            type: "button",
            style: "secondary",
            height: "sm",
            action: {
              type: "postback",
              label: "完成",
              data: "payment:complete",
              displayText: "完成",
            },
          },
        ],
      },
    },
  };
}
