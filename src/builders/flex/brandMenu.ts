import { FlexMessage } from "../../types/line";

export function createBrandMenuFlex(): FlexMessage {
  return {
    type: "flex",
    altText: "品牌館",
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
        spacing: "md",
        contents: [
          {
            type: "text",
            text: "🏷 品牌館",
            weight: "bold",
            size: "xl",
          },
          {
            type: "text",
            text: "探索 Seoul Moment 精選韓國品牌。",
            size: "sm",
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
              label: "前往品牌館",
              uri: "https://seoulmoment.com.tw/brands",
            },
          },
        ],
      },
    },
  };
}
