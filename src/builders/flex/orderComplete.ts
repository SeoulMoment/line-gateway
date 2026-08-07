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
          {
            type: "text",
            text: "ORDER COMPLETE",
            size: "xs",
            color: "#999999",
            weight: "bold",
          },
          {
            type: "text",
            text: "訂購完成",
            size: "xl",
            weight: "bold",
            color: "#111111",
          },
          {
            type: "text",
            text: "您的訂單已成功建立。",
            size: "sm",
            color: "#666666",
            wrap: true,
          },

          {
            type: "separator",
            margin: "xl",
            color: "#EEEEEE",
          },

          {
            type: "box",
            layout: "vertical",
            margin: "lg",
            paddingAll: "16px",
            backgroundColor: "#F7F7F7",
            cornerRadius: "12px",
            spacing: "sm",
            contents: [
              {
                type: "text",
                text: "訂單已成立 ✓",
                size: "sm",
                weight: "bold",
                color: "#111111",
              },
              {
                type: "text",
                text: "訂單編號",
                size: "xs",
                color: "#888888",
                margin: "md",
              },
              {
                type: "text",
                text: orderNumber,
                size: "lg",
                weight: "bold",
                color: "#111111",
                wrap: true,
              },
            ],
          },

          {
            type: "text",
            text: "請保留您的訂單編號，方便後續查詢訂單。",
            size: "xs",
            color: "#888888",
            wrap: true,
            margin: "sm",
          },

          {
            type: "separator",
            margin: "lg",
            color: "#EEEEEE",
          },

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
                text: "NEXT STEP",
                size: "xs",
                weight: "bold",
                color: "#8A641E",
              },
              {
                type: "text",
                text: "完成付款",
                size: "sm",
                weight: "bold",
                color: "#755A28",
              },
              {
                type: "text",
                text: "請依照下一張付款資訊完成匯款。",
                size: "xs",
                color: "#755A28",
                wrap: true,
              },
            ],
          },

          {
            type: "text",
            text: "款項確認完成後，我們將再透過 LINE 通知您。",
            size: "xs",
            color: "#999999",
            wrap: true,
            margin: "sm",
          },
        ],
      },
    },
  };
}
