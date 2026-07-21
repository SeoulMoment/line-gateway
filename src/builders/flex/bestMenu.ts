import { FlexMessage } from "../../types/line";

export function createBestMenuFlex(): FlexMessage {
  return {
    type: "flex",
    altText: "熱銷排行",
    contents: {
      type: "bubble",
      hero: {
        type: "image",
        url: "https://placehold.co/1200x630",
        size: "full",
        aspectMode: "cover",
        aspectRatio: "20:13",
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "🔥 熱銷排行",
            weight: "bold",
            size: "xl",
          },
          {
            type: "text",
            text: "看看目前最受歡迎的商品。",
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
              label: "查看熱銷",
              uri: "https://seoulmoment.com.tw/best",
            },
          },
        ],
      },
    },
  };
}
