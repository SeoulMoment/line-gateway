import { Brand } from "../../models/brand";

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
      spacing: "md",
      contents: [
        {
          type: "text",
          text: brand.name,
          weight: "bold",
          size: "xl",
        },
        {
          type: "text",
          text: brand.description,
          wrap: true,
          size: "sm",
          color: "#666666",
        },

        ...brand.tags.map((tag) => ({
          type: "text",
          text: tag,
          size: "xs",
          color: "#00A86B",
        })),
      ],
    },

    footer: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "button",
          style: "primary",
          action: {
            type: "uri",
            label: "查看品牌",
            data: `brand:${brand.id}`,
          },
        },
      ],
    },
  };
}
