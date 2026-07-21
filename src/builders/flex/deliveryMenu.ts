import { FlexMessage } from "../../types/line";

export function createDeliveryMenuFlex(): FlexMessage {
  return {
    type: "flex",
    altText: "配送資訊",
    contents: {
      type: "bubble",
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "🚚 配送資訊",
            weight: "bold",
            size: "xl",
          },
          {
            type: "text",
            text: "韓國直送約 7～14 個工作天，最長約 21 個工作天。",
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
              label: "配送說明",
              uri: "https://seoulmoment.com.tw/shipping",
            },
          },
        ],
      },
    },
  };
}
