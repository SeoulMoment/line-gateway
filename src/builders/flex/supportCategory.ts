import { SUPPORT_CATEGORY } from "../../constants/support";
import { FlexMessage } from "../../types/line";

export function createSupportCategoryFlex(): FlexMessage {
  return {
    type: "flex",
    altText: "客服分類",
    contents: {
      type: "bubble",

      body: {
        type: "box",
        layout: "vertical",
        spacing: "md",
        contents: [
          {
            type: "text",
            text: "💬 請選擇諮詢類型",
            weight: "bold",
            size: "lg",
          },
          {
            type: "text",
            wrap: true,
            color: "#666666",
            text: "為了更快速協助您，\n請先選擇本次諮詢的類型。",
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
            action: {
              type: "postback",
              label: SUPPORT_CATEGORY.PRODUCT,
              data: "support:category:product",
            },
          },
          {
            type: "button",
            action: {
              type: "postback",
              label: SUPPORT_CATEGORY.ORDER,
              data: "support:category:order",
            },
          },
          {
            type: "button",
            action: {
              type: "postback",
              label: SUPPORT_CATEGORY.DELIVERY,
              data: "support:category:delivery",
            },
          },
          {
            type: "button",
            action: {
              type: "postback",
              label: SUPPORT_CATEGORY.PAYMENT,
              data: "support:category:payment",
            },
          },
          {
            type: "button",
            action: {
              type: "postback",
              label: SUPPORT_CATEGORY.OTHER,
              data: "support:category:other",
            },
          },
        ],
      },
    },
  };
}
