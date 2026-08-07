import type { FlexMessage } from "../../types/line";

export function createOrderCompleteFlex(orderNumber: string): FlexMessage {
  return {
    type: "flex",
    altText: `訂購完成｜${orderNumber}`,
    contents: {
      type: "bubble",

      body: {
        type: "box",
        layout: "vertical",
        paddingAll: "24px",
        spacing: "md",
        contents: [
          // Header
          {
            type: "box",
            layout: "horizontal",
            contents: [
              {
                type: "text",
                text: "ORDER COMPLETE",
                size: "xs",
                color: "#777777",
                weight: "bold",
                flex: 1,
              },
              {
                type: "text",
                text: "DONE",
                size: "xs",
                color: "#111111",
                weight: "bold",
                align: "end",
              },
            ],
          },

          // Title
          {
            type: "text",
            text: "訂購完成",
            size: "xl",
            weight: "bold",
            color: "#111111",
            margin: "md",
          },
          {
            type: "text",
            text: "您的訂單已成功建立，感謝您的訂購。",
            size: "sm",
            color: "#555555",
            wrap: true,
          },

          {
            type: "separator",
            margin: "lg",
            color: "#E5E5E5",
          },

          // Success
          {
            type: "box",
            layout: "horizontal",
            margin: "lg",
            paddingAll: "12px",
            backgroundColor: "#F3F3F3",
            cornerRadius: "8px",
            contents: [
              {
                type: "text",
                text: "✓",
                size: "sm",
                color: "#111111",
                weight: "bold",
                flex: 0,
              },
              {
                type: "text",
                text: "訂單已成功成立",
                size: "sm",
                color: "#555555",
                weight: "bold",
                margin: "sm",
                wrap: true,
              },
            ],
          },

          // Order number
          {
            type: "box",
            layout: "vertical",
            margin: "md",
            paddingAll: "18px",
            backgroundColor: "#F8F8F8",
            cornerRadius: "12px",
            spacing: "sm",
            contents: [
              {
                type: "text",
                text: "訂單編號",
                size: "xs",
                color: "#777777",
              },
              {
                type: "text",
                text: orderNumber,
                size: "lg",
                weight: "bold",
                color: "#111111",
                wrap: true,
              },
              {
                type: "text",
                text: "請保留此訂單編號，方便後續查詢。",
                size: "xs",
                color: "#666666",
                wrap: true,
                margin: "xs",
              },
            ],
          },

          {
            type: "separator",
            margin: "lg",
            color: "#E5E5E5",
          },

          // Next step
          {
            type: "text",
            text: "NEXT STEP",
            size: "xs",
            color: "#777777",
            weight: "bold",
            margin: "md",
          },
          {
            type: "text",
            text: "完成付款",
            size: "md",
            color: "#111111",
            weight: "bold",
          },
          {
            type: "text",
            text: "請確認下一張付款資訊，並依照指定帳戶完成匯款。",
            size: "sm",
            color: "#555555",
            wrap: true,
            lineSpacing: "4px",
          },

          // 다음 카드 유도
          {
            type: "box",
            layout: "horizontal",
            margin: "md",
            contents: [
              {
                type: "text",
                text: "↓",
                size: "sm",
                color: "#111111",
                flex: 0,
              },
              {
                type: "text",
                text: "下一張卡片查看付款資訊",
                size: "sm",
                color: "#555555",
                weight: "bold",
                margin: "sm",
                wrap: true,
              },
            ],
          },
        ],
      },
    },
  };
}
