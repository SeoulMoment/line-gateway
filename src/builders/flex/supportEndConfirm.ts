import type { FlexMessage } from "../../types/line";

export function createSupportEndConfirmFlex(): FlexMessage {
  return {
    type: "flex",
    altText: "結束客服",
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
            text: "🔚 結束客服",
            size: "xl",
            weight: "bold",
          },
          {
            type: "text",
            wrap: true,
            color: "#666666",
            text: "是否要結束本次客服對話？\n\n結束後仍可再次透過「聯絡客服」重新開始聊天。",
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
              label: "繼續聊天",
              data: "support:continue",
              displayText: "繼續聊天",
            },
          },
          {
            type: "button",
            style: "primary",
            color: "#111111",
            action: {
              type: "postback",
              label: "確認結束",
              data: "support:confirm-end",
              displayText: "確認結束",
            },
          },
        ],
      },
    },
  };
}
