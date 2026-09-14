import { MEMBER_POSTBACK } from "../../constants/member";
import type { FlexMessage } from "../../types/line";

export function createPurchaseTypeFlex(): FlexMessage {
  return {
    type: "flex",
    altText: "商品購買",
    contents: {
      type: "bubble",
      hero: {
        type: "box",
        layout: "vertical",
        backgroundColor: "#06C755",
        paddingAll: "20px",
        contents: [
          {
            type: "text",
            text: "🛍 商品購買",
            color: "#FFFFFF",
            weight: "bold",
            size: "xl",
          },
          {
            type: "text",
            text: "選擇最適合您的購買方式",
            color: "#FFFFFF",
            size: "sm",
            margin: "md",
          },
        ],
      },
      body: {
        type: "box",
        layout: "vertical",
        spacing: "lg",
        contents: [
          {
            type: "text",
            text: "歡迎使用 Seoul Moment！",
            weight: "bold",
            size: "md",
          },
          {
            type: "text",
            text: "加入會員可享有更多便利服務，也可以直接以非會員身分完成本次訂單。",
            wrap: true,
            size: "sm",
            color: "#666666",
          },

          {
            type: "separator",
            margin: "lg",
          },

          {
            type: "text",
            text: "⭐ 會員購買（推薦）",
            weight: "bold",
            size: "md",
            margin: "lg",
          },
          {
            type: "text",
            text:
              "• 查看訂單紀錄\n" +
              "• 配送進度通知\n" +
              "• 快速再次購買\n" +
              "• 未來會員專屬優惠",
            wrap: true,
            size: "sm",
            color: "#555555",
            margin: "sm",
          },

          {
            type: "button",
            style: "primary",
            color: "#06C755",
            margin: "md",
            action: {
              type: "postback",
              label: "立即加入會員",
              data: MEMBER_POSTBACK.MEMBER_ORDER,
            },
          },

          {
            type: "separator",
            margin: "xl",
          },

          {
            type: "text",
            text: "👤 非會員購買",
            weight: "bold",
            size: "md",
            margin: "lg",
          },
          {
            type: "text",
            text: "• 不需註冊\n" + "• 可立即完成本次商品訂購",
            wrap: true,
            size: "sm",
            color: "#555555",
            margin: "sm",
          },

          {
            type: "button",
            style: "secondary",
            margin: "md",
            action: {
              type: "postback",
              label: "直接下單",
              data: MEMBER_POSTBACK.GUEST_ORDER,
            },
          },
        ],
      },
      footer: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "button",
            style: "link",
            action: {
              type: "postback",
              label: "稍後再說",
              data: MEMBER_POSTBACK.CANCEL_ORDER,
            },
          },
        ],
      },
    },
  };
}
