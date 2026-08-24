import type { FlexMessage } from "../../types/line";

export function createSupportChatFlex(category: string): FlexMessage {
  return {
    type: "flex",
    altText: "客服對話",
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
            text: "CUSTOMER SERVICE",
            size: "xs",
            color: "#999999",
            weight: "bold",
          },
          {
            type: "text",
            text: "💬 已開始客服對話",
            size: "xl",
            weight: "bold",
            color: "#111111",
          },
          {
            type: "text",
            text: `諮詢類型：${category}`,
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
            type: "text",
            margin: "lg",
            wrap: true,
            color: "#444444",
            text:
              "您好 😊\n\n" +
              "請直接輸入您想詢問的內容。\n\n" +
              "客服人員將於營業時間內依序回覆您的訊息。",
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
              label: "🔚 結束聊天",
              data: "support:end",
              displayText: "結束聊天",
            },
          },
        ],
      },
    },
  };
}
