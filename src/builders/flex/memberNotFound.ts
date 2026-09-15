import { MEMBER_POSTBACK } from "../../constants/member";
import type { FlexMessage } from "../../types/line";

export function createMemberNotFoundFlex(): FlexMessage {
  return {
    type: "flex",
    altText: "尚未連結 LINE 會員",
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
            text: "尚未連結 LINE 會員",
            size: "xl",
            weight: "bold",
            color: "#111111",
          },
          {
            type: "text",
            text:
              "目前找不到與此 LINE 帳號連結的 Seoul Moment 會員資料。\n\n" +
              "請先使用 LINE 完成登入或會員註冊，完成帳號連結後即可使用會員訂購。",
            size: "sm",
            color: "#666666",
            wrap: true,
            lineSpacing: "4px",
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
              type: "uri",
              label: "使用 LINE 登入 / 註冊",
              uri: "https://seoulmoment.com.tw/zh-TW/login",
            },
          },
          {
            type: "button",
            style: "secondary",
            action: {
              type: "postback",
              label: "以非會員身分購買",
              data: MEMBER_POSTBACK.GUEST_ORDER,
              displayText: "以非會員身分購買",
            },
          },
        ],
      },
    },
  };
}
