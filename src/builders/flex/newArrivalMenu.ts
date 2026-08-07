import type { FlexMessage } from "../../types/line";

export function createNewArrivalMenuFlex(): FlexMessage {
  return {
    type: "flex",
    altText: "新品上市",
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
            text: "NEW ARRIVALS",
            size: "xs",
            color: "#999999",
            weight: "bold",
          },
          {
            type: "text",
            text: "新品上市",
            size: "xl",
            weight: "bold",
            color: "#111111",
          },
          {
            type: "text",
            text: "新品專區即將上線",
            size: "md",
            weight: "bold",
            color: "#333333",
            margin: "lg",
          },
          {
            type: "text",
            text: "我們正在準備更多來自韓國的時尚、美妝與生活風格商品。",
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
                text: "COMING SOON",
                size: "xs",
                weight: "bold",
                color: "#999999",
              },
              {
                type: "text",
                text: "正式上線前",
                size: "sm",
                weight: "bold",
                color: "#111111",
              },
              {
                type: "text",
                text: "您可以先前往 Seoul Moment 官方網站，查看目前販售中的精選商品。",
                size: "xs",
                color: "#777777",
                wrap: true,
                lineSpacing: "3px",
              },
            ],
          },
        ],
      },

      footer: {
        type: "box",
        layout: "vertical",
        paddingAll: "16px",
        paddingTop: "4px",
        contents: [
          {
            type: "button",
            style: "primary",
            height: "sm",
            color: "#111111",
            action: {
              type: "uri",
              label: "前往 Seoul Moment 官網",
              uri: "https://seoulmoment.com.tw/",
            },
          },
        ],
      },
    },
  };
}
