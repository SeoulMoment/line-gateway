import type { FlexMessage } from "../../types/line";

export function createVerifyGuideFlex(): FlexMessage {
  return {
    type: "flex",
    altText: "輸入驗證碼",

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
            text: "STEP 02 / 02",
            size: "xs",
            color: "#999999",
            weight: "bold",
          },

          {
            type: "text",
            text: "Email 驗證",
            size: "xl",
            weight: "bold",
          },

          {
            type: "text",
            wrap: true,
            size: "sm",
            color: "#666666",
            text: "驗證碼已寄送至您的 Email。\n\n請直接在聊天室輸入 6 碼驗證碼。",
          },

          {
            type: "separator",
            margin: "xl",
          },

          {
            type: "text",
            margin: "lg",
            size: "xs",
            color: "#888888",
            wrap: true,
            text: "若沒有收到 Email，之後將可重新寄送驗證碼。",
          },
        ],
      },
    },
  };
}
