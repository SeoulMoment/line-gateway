import type { FlexMessage } from "../../types/line";

interface OrderInputStepOptions {
  section: string;
  title: string;
  description: string;
  hint?: string;
  completed?: string;
}

export function createOrderInputStepFlex({
  section,
  title,
  description,
  hint,
  completed,
}: OrderInputStepOptions): FlexMessage {
  return {
    type: "flex",
    altText: title,
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
            text: "ORDER",
            size: "xs",
            color: "#999999",
            weight: "bold",
          },
          {
            type: "text",
            text: section,
            size: "xl",
            weight: "bold",
            color: "#111111",
          },

          ...(completed
            ? [
                {
                  type: "text" as const,
                  text: `${completed} ✓`,
                  size: "xs" as const,
                  color: "#999999",
                },
              ]
            : []),

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
                text: title,
                size: "sm",
                weight: "bold",
                color: "#111111",
              },
              {
                type: "text",
                text: description,
                size: "sm",
                color: "#666666",
                wrap: true,
                lineSpacing: "4px",
              },

              ...(hint
                ? [
                    {
                      type: "text" as const,
                      text: hint,
                      size: "xs" as const,
                      color: "#999999",
                      wrap: true,
                      lineSpacing: "3px",
                      margin: "sm" as const,
                    },
                  ]
                : []),
            ],
          },

          {
            type: "text",
            text: `請直接在下方聊天室輸入${title}`,
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
