import { MEMBER_POSTBACK } from "../../constants/member";
import type { FlexMessage } from "../../types/line";

export function createPurchaseTypeFlex(): FlexMessage {
  return {
    type: "flex",
    altText: "購買方式",
    contents: {
      type: "bubble",
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "請選擇購買方式",
            weight: "bold",
            size: "lg",
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
              label: "🛍 會員購買",
              data: MEMBER_POSTBACK.MEMBER_ORDER,
            },
          },
          {
            type: "button",
            action: {
              type: "postback",
              label: "👤 非會員購買",
              data: MEMBER_POSTBACK.GUEST_ORDER,
            },
          },
          {
            type: "button",
            action: {
              type: "postback",
              label: "取消",
              data: MEMBER_POSTBACK.CANCEL_ORDER,
            },
          },
        ],
      },
    },
  };
}
