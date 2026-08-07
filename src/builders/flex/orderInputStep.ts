import type { FlexMessage } from "../../types/line";

interface OrderInputStepOptions {
  section: string;
  title: string;
  description: string;
  hint?: string;
  completed?: string;
  step?: string;
  subtitle?: string;
}

export function createOrderInputStepFlex({
  section,
  title,
  description,
  hint,
  completed,
  step,
  subtitle,
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
          // 상단 ORDER PROCESS + STEP
          {
            type: "box",
            layout: "horizontal",
            contents: [
              {
                type: "text",
                text: "ORDER PROCESS",
                size: "xs",
                color: "#777777",
                weight: "bold",
                flex: 1,
              },
              ...(step
                ? [
                    {
                      type: "text" as const,
                      text: step,
                      size: "xs" as const,
                      color: "#111111",
                      weight: "bold" as const,
                      align: "end" as const,
                    },
                  ]
                : []),
            ],
          },

          // 현재 섹션
          {
            type: "text",
            text: section,
            size: "xl",
            weight: "bold",
            color: "#111111",
            margin: "md",
          },

          // 현재 단계 설명
          ...(subtitle
            ? [
                {
                  type: "text" as const,
                  text: subtitle,
                  size: "sm" as const,
                  color: "#555555",
                  wrap: true,
                  margin: "xs" as const,
                },
              ]
            : []),

          {
            type: "separator",
            margin: "lg",
            color: "#E5E5E5",
          },

          // 이전 단계 완료
          ...(completed
            ? [
                {
                  type: "box" as const,
                  layout: "horizontal" as const,
                  margin: "lg" as const,
                  paddingAll: "12px",
                  backgroundColor: "#F3F3F3",
                  cornerRadius: "8px",
                  contents: [
                    {
                      type: "text" as const,
                      text: "✓",
                      size: "sm" as const,
                      color: "#111111",
                      weight: "bold" as const,
                      flex: 0,
                    },
                    {
                      type: "text" as const,
                      text: completed,
                      size: "sm" as const,
                      color: "#555555",
                      margin: "sm" as const,
                      wrap: true,
                    },
                  ],
                },
              ]
            : []),

          // 현재 입력 항목
          {
            type: "box",
            layout: "vertical",
            margin: completed ? "md" : "lg",
            paddingAll: "18px",
            backgroundColor: "#F8F8F8",
            cornerRadius: "12px",
            spacing: "md",
            contents: [
              {
                type: "text",
                text: title,
                size: "md",
                weight: "bold",
                color: "#111111",
              },
              {
                type: "text",
                text: description,
                size: "sm",
                color: "#444444",
                wrap: true,
                lineSpacing: "5px",
              },

              ...(hint
                ? [
                    {
                      type: "separator" as const,
                      margin: "sm" as const,
                      color: "#E8E8E8",
                    },
                    {
                      type: "text" as const,
                      text: hint,
                      size: "xs" as const,
                      color: "#666666",
                      wrap: true,
                      lineSpacing: "4px",
                      margin: "sm" as const,
                    },
                  ]
                : []),
            ],
          },

          // 입력 안내
          {
            type: "box",
            layout: "horizontal",
            margin: "md",
            contents: [
              {
                type: "text",
                text: "↓",
                size: "sm",
                color: "#111111",
                flex: 0,
              },
              {
                type: "text",
                text: `下方聊天室輸入${title}`,
                size: "sm",
                color: "#555555",
                weight: "bold",
                margin: "sm",
                wrap: true,
              },
            ],
          },
        ],
      },
    },
  };
}
