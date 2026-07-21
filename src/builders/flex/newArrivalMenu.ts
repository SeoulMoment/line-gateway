import { FlexMessage } from "../../types/line";

export function createNewArrivalMenuFlex(): FlexMessage {
  return {
    type: "flex",
    altText: "新品",
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
            text: "🆕 新品專區",
            weight: "bold",
            size: "xl",
          },
          {
            type: "text",
            text: "最新上架的韓國商品",
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
              label: "查看新品",
              uri: "https://seoulmoment.com.tw/new",
            },
          },
        ],
      },
    },
  };
}
