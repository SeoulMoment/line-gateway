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
        paddingAll: "22px",
        spacing: "md",
        contents: [
          {
            type: "text",
            text: "PAYMENT",
            size: "xs",
            color: "#999999",
            weight: "bold",
          },
          {
            type: "text",
            text: "付款資訊",
            size: "xl",
            weight: "bold",
            color: "#111111",
          },
          {
            type: "text",
            text: "目前提供銀行轉帳付款，請依照以下資訊完成匯款。",
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

          // 銀行資料
          {
            type: "box",
            layout: "vertical",
            margin: "lg",
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
                    text: "銀行",
                    size: "sm",
                    color: "#888888",
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
                    color: "#888888",
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
                    color: "#888888",
                    flex: 2,
                  },
                  {
                    type: "text",
                    text: "15210274358",
                    size: "sm",
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
              },
              {
                type: "box",
                layout: "horizontal",
                contents: [
                  {
                    type: "text",
                    text: "戶名",
                    size: "sm",
                    color: "#888888",
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

          // 匯款提醒
          {
            type: "box",
            layout: "vertical",
            margin: "md",
            paddingAll: "14px",
            backgroundColor: "#FFF9EC",
            cornerRadius: "10px",
            spacing: "sm",
            contents: [
              {
                type: "text",
                text: "匯款提醒",
                weight: "bold",
                size: "sm",
                color: "#8A641E",
              },
              {
                type: "text",
                text: "請使用與訂單「訂購人」相同的姓名進行匯款，以便我們核對款項。",
                size: "xs",
                color: "#755A28",
                wrap: true,
                lineSpacing: "3px",
              },
            ],
          },

          {
            type: "text",
            text: "若匯款人姓名不同，請聯絡客服並提供訂單編號、訂購人姓名及實際匯款人姓名。",
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
              type: "uri",
              label: "付款問題・聯絡客服",
              uri: "https://seoulmoment.com.tw/zh-TW/contact",
            },
          },
        ],
      },
    },
  };
}
