import type { FlexMessage } from "../../types/line";

const ASSET_BASE_URL = "https://line-gateway.seoul-moment.workers.dev";

export function createDeliveryGuideFlex(): FlexMessage {
  return {
    type: "flex",
    altText: "配送說明",
    contents: {
      type: "bubble",

      hero: {
        type: "image",
        url: `${ASSET_BASE_URL}/menu/delivery.webp?v=2`,
        size: "full",
        aspectRatio: "20:8",
        aspectMode: "cover",
      },

      body: {
        type: "box",
        layout: "vertical",
        spacing: "md",
        contents: [
          {
            type: "text",
            text: "配送說明",
            weight: "bold",
            size: "xl",
          },
          {
            type: "text",
            text: "韓國商品由 Seoul Moment 統一安排配送至台灣。",
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
            text: "🇰🇷 韓國直送",
            weight: "bold",
            size: "sm",
            margin: "md",
          },
          {
            type: "text",
            text: "商品將由韓國進行備貨及出貨，抵達台灣後安排台灣國內配送。",
            size: "sm",
            color: "#666666",
            wrap: true,
          },
          {
            type: "text",
            text: "🚚 配送時間",
            weight: "bold",
            size: "sm",
            margin: "md",
          },
          {
            type: "text",
            text: "一般約 7–14 個工作天，實際配送時間可能依韓國備貨、航班、海關及物流狀況有所調整。",
            size: "sm",
            color: "#666666",
            wrap: true,
          },
          {
            type: "text",
            text: "📦 出貨通知",
            weight: "bold",
            size: "sm",
            margin: "md",
          },
          {
            type: "text",
            text: "商品完成出貨後，我們將依訂單資訊提供相關配送通知。",
            size: "sm",
            color: "#666666",
            wrap: true,
          },
          {
            type: "text",
            text: "如有配送相關問題，歡迎透過客服與我們聯絡。",
            size: "xs",
            color: "#999999",
            wrap: true,
            margin: "lg",
          },
        ],
      },
    },
  };
}
