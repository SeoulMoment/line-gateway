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
        paddingAll: "24px",
        spacing: "md",
        contents: [
          {
            type: "text",
            text: "DELIVERY",
            size: "xs",
            color: "#999999",
            weight: "bold",
          },
          {
            type: "text",
            text: "配送說明",
            size: "xl",
            weight: "bold",
            color: "#111111",
          },
          {
            type: "text",
            text: "韓國商品由 Seoul Moment 統一安排配送至台灣。",
            size: "sm",
            color: "#666666",
            wrap: true,
            lineSpacing: "4px",
          },

          {
            type: "separator",
            margin: "xl",
            color: "#EEEEEE",
          },

          // 배송 정보 카드
          {
            type: "box",
            layout: "vertical",
            margin: "lg",
            paddingAll: "16px",
            backgroundColor: "#F7F7F7",
            cornerRadius: "12px",
            spacing: "lg",
            contents: [
              {
                type: "box",
                layout: "vertical",
                spacing: "xs",
                contents: [
                  {
                    type: "text",
                    text: "韓國直送",
                    size: "sm",
                    weight: "bold",
                    color: "#111111",
                  },
                  {
                    type: "text",
                    text: "商品於韓國完成備貨及出貨後，抵達台灣並安排國內配送。",
                    size: "xs",
                    color: "#777777",
                    wrap: true,
                    lineSpacing: "3px",
                  },
                ],
              },

              {
                type: "separator",
                color: "#E5E5E5",
              },

              {
                type: "box",
                layout: "vertical",
                spacing: "xs",
                contents: [
                  {
                    type: "text",
                    text: "預計配送時間",
                    size: "sm",
                    weight: "bold",
                    color: "#111111",
                  },
                  {
                    type: "text",
                    text: "約 7–14 個工作天",
                    size: "md",
                    weight: "bold",
                    color: "#111111",
                  },
                  {
                    type: "text",
                    text: "實際時間可能依韓國備貨、航班、海關及物流狀況有所調整。",
                    size: "xs",
                    color: "#777777",
                    wrap: true,
                    lineSpacing: "3px",
                  },
                ],
              },

              {
                type: "separator",
                color: "#E5E5E5",
              },

              {
                type: "box",
                layout: "vertical",
                spacing: "xs",
                contents: [
                  {
                    type: "text",
                    text: "出貨通知",
                    size: "sm",
                    weight: "bold",
                    color: "#111111",
                  },
                  {
                    type: "text",
                    text: "商品完成出貨後，我們將依訂單資訊提供相關配送通知。",
                    size: "xs",
                    color: "#777777",
                    wrap: true,
                    lineSpacing: "3px",
                  },
                ],
              },
            ],
          },

          // 안내
          {
            type: "box",
            layout: "vertical",
            margin: "md",
            paddingAll: "14px",
            backgroundColor: "#FFF9EC",
            cornerRadius: "10px",
            spacing: "sm",
            contents: [
              {
                type: "text",
                text: "配送提醒",
                size: "sm",
                weight: "bold",
                color: "#8A641E",
              },
              {
                type: "text",
                text: "海外配送可能因航班、海關或物流狀況產生些許延遲，敬請見諒。",
                size: "xs",
                color: "#755A28",
                wrap: true,
                lineSpacing: "3px",
              },
            ],
          },

          {
            type: "text",
            text: "如有配送相關問題，歡迎透過「聯絡客服」與我們聯繫。",
            size: "xs",
            color: "#999999",
            wrap: true,
            lineSpacing: "3px",
            margin: "sm",
          },
        ],
      },
    },
  };
}
