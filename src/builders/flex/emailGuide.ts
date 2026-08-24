import type { FlexMessage } from "../../types/line";

export function createEmailGuideFlex(): FlexMessage {
  return {
    type: "flex",
    altText: "輸入 Email",

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
            text: "STEP 01 / 02",
            size: "xs",
            color: "#999999",
            weight: "bold",
          },

          {
            type: "text",
            text: "輸入 Email",
            size: "xl",
            weight: "bold",
          },

          {
            type: "text",
            wrap: true,
            color: "#666666",
            size: "sm",
            text: "請輸入您常用的 Email。\n\n我們將寄送驗證碼至此信箱。",
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
            text: "例如：example@gmail.com\n\n直接於聊天室輸入 Email 即可。",
          },
        ],
      },
    },
  };
}
