import { FlexMessage } from "../types/message";

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
        contents: [
          {
            type: "text",
            text: "品牌館",
            weight: "bold",
            size: "xl",
          },
          {
            type: "text",
            text: "探索韓國品牌",
            margin: "md",
          },
        ],
      },
    },
  };
}
