import type { Brand } from "../../models/brand";

export function createBrandBubble(brand: Brand): Record<string, unknown> {
  return {
    type: "bubble",

    hero: {
      type: "image",
      url: brand.imageUrl,
      size: "full",
      aspectRatio: "20:13",
      aspectMode: "cover",
    },

    body: {
      type: "box",
      layout: "vertical",
      paddingAll: "20px",
      spacing: "md",
      contents: [
        {
          type: "text",
          text: "BRAND",
          size: "xs",
          color: "#999999",
          weight: "bold",
        },
        {
          type: "text",
          text: brand.name,
          weight: "bold",
          size: "xl",
          color: "#111111",
          wrap: true,
        },
        {
          type: "text",
          text: brand.description,
          wrap: true,
          size: "sm",
          color: "#666666",
          lineSpacing: "4px",
        },

        {
          type: "separator",
          margin: "lg",
          color: "#EEEEEE",
        },

        {
          type: "box",
          layout: "horizontal",
          margin: "md",
          spacing: "sm",
          flex: 0,
          contents: brand.tags.map((tag) => ({
            type: "box",
            layout: "vertical",
            backgroundColor: "#F5F5F5",
            cornerRadius: "8px",
            paddingStart: "10px",
            paddingEnd: "10px",
            paddingTop: "6px",
            paddingBottom: "6px",
            flex: 0,
            contents: [
              {
                type: "text",
                text: tag,
                size: "xs",
                color: "#666666",
                align: "center",
              },
            ],
          })),
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
            label: "查看品牌",
            uri: brand.url,
          },
        },
      ],
    },
  };
}
