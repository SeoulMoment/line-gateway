import type { FlexMessage } from "../../types/line";

export function createOrderPlatformMenuFlex(): FlexMessage {
  return {
    type: "flex",
    altText: "選擇訂購方式",
    contents: {
      type: "bubble",

      body: {
        type: "box",
        layout: "vertical",
        spacing: "md",
        contents: [
          {
            type: "text",
            text: "選擇訂購方式",
            weight: "bold",
            size: "xl",
          },
          {
            type: "text",
            text: "請選擇您想使用的訂購方式",
            size: "sm",
            color: "#666666",
            wrap: true,
          },
          {
            type: "separator",
            margin: "md",
          },
          {
            type: "text",
            text: "LINE 訂購",
            weight: "bold",
            size: "sm",
            margin: "md",
          },
          {
            type: "text",
            text: "直接透過 LINE 填寫商品與取貨資料，完成訂購。",
            size: "xs",
            color: "#888888",
            wrap: true,
          },
          {
            type: "text",
            text: "Shopee 訂單",
            weight: "bold",
            size: "sm",
            margin: "md",
          },
          {
            type: "text",
            text: "已經在 Shopee 下單？輸入訂單編號完成身分確認。",
            size: "xs",
            color: "#888888",
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
            color: "#111111",
            action: {
              type: "postback",
              label: "LINE 訂購",
              data: "order:platform:line",
              displayText: "LINE 訂購",
            },
          },
          {
            type: "button",
            action: {
              type: "postback",
              label: "Shopee 訂單",
              data: "order:platform:shopee",
              displayText: "Shopee 訂單",
            },
          },
        ],
      },
    },
  };
}
