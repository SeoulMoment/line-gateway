import { MEMBER_POSTBACK } from "../../constants/member";
import type { FlexMessage } from "../../types/line";

export function createMemberAgreementFlex(): FlexMessage {
  return {
    type: "flex",
    altText: "會員驗證",
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
            text: "MEMBER",
            size: "xs",
            color: "#999999",
            weight: "bold",
          },

          {
            type: "text",
            text: "會員驗證",
            size: "xl",
            weight: "bold",
            color: "#111111",
          },

          {
            type: "text",
            text: "為了保障您的訂單與會員權益，首次使用 LINE 訂購前，需要完成一次 Email 驗證。",
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

          {
            type: "text",
            margin: "lg",
            size: "xs",
            color: "#888888",
            wrap: true,
            text:
              "✓ 僅需驗證一次\n" +
              "✓ 完成後即可直接使用 LINE 訂購\n" +
              "✓ 我們將依照隱私權政策保護您的個人資料",
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
              label: "同意並繼續",
              data: MEMBER_POSTBACK.AGREEMENT,
              displayText: "同意並繼續",
            },
          },
        ],
      },
    },
  };
}
