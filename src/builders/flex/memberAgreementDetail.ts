import type { FlexMessage } from "../../types/line";
import { MEMBER_POSTBACK } from "../../constants/member";

export function createMemberAgreementDetailFlex(): FlexMessage {
  return {
    type: "flex",
    altText: "會員說明",
    contents: {
      type: "bubble",

      body: {
        type: "box",
        layout: "vertical",
        paddingAll: "24px",
        spacing: "lg",
        contents: [
          {
            type: "text",
            text: "MEMBER",
            size: "xs",
            color: "#999999",
            weight: "bold",
          },
          {
            type: "text",
            text: "會員資料說明",
            size: "xl",
            weight: "bold",
          },
          {
            type: "separator",
            margin: "md",
          },
          {
            type: "text",
            text: "🔒 收集資料",
            weight: "bold",
          },
          {
            type: "text",
            wrap: true,
            size: "sm",
            color: "#666666",
            text:
              "• LINE User ID\n" + "• Email\n" + "• 訂單資訊\n" + "• 配送資訊",
          },
          {
            type: "separator",
            margin: "lg",
          },
          {
            type: "text",
            text: "📦 使用目的",
            weight: "bold",
          },
          {
            type: "text",
            wrap: true,
            size: "sm",
            color: "#666666",
            text: "• 訂單處理\n" + "• 配送通知\n" + "• 客服聯繫",
          },
          {
            type: "separator",
            margin: "lg",
          },
          {
            type: "text",
            text: "🗑 保存期限",
            weight: "bold",
          },
          {
            type: "text",
            wrap: true,
            size: "sm",
            color: "#666666",
            text: "會員資料將依照相關法令及隱私權政策保存，並於不再需要時安全刪除。",
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
            style: "secondary",
            action: {
              type: "postback",
              label: "← 返回",
              data: MEMBER_POSTBACK.BACK,
            },
          },
          {
            type: "button",
            style: "primary",
            color: "#111111",
            action: {
              type: "postback",
              label: "同意並繼續",
              data: MEMBER_POSTBACK.AGREEMENT,
            },
          },
        ],
      },
    },
  };
}
