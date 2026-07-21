import { FlexMessage } from "../../types/line";

export function createSupportMenuFlex(): FlexMessage {
  return {
    type: "flex",
    altText: "客服中心",
    contents: {
      type: "bubble",
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "💬 客服中心",
            weight: "bold",
            size: "xl",
          },
          {
            type: "text",
            text: "若有任何問題，歡迎聯絡我們。",
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
              label: "聯絡客服",
              uri: "https://seoulmoment.com.tw/contact",
            },
          },
        ],
      },
    },
  };
}
