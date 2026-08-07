import type { OrderSession } from "../../models/order";
import type { FlexMessage } from "../../types/line";

export function createOrderConfirmationFlex(order: OrderSession): FlexMessage {
  const platform = order.platform === "shopee" ? "Shopee" : "LINE";

  const rows = [
    {
      label: "訂購方式",
      value: platform,
    },
    ...(order.platform === "shopee"
      ? [
          {
            label: "Shopee 訂單",
            value: order.externalOrderId ?? "-",
          },
        ]
      : []),
    {
      label: "訂購人",
      value: order.customerName ?? "-",
    },
    {
      label: "商品",
      value: order.productName ?? "-",
    },
    {
      label: "尺寸",
      value: order.size ?? "-",
    },
    {
      label: "顏色",
      value: order.color ?? "-",
    },
    {
      label: "聯絡電話",
      value: order.phone ?? "-",
    },
    {
      label: "取貨超商",
      value: order.convenienceStore ?? "-",
    },
    {
      label: "取貨門市",
      value: order.storeName ?? "-",
    },
  ];

  return {
    type: "flex",
    altText: "訂購內容確認",
    contents: {
      type: "bubble",

      body: {
        type: "box",
        layout: "vertical",
        paddingAll: "24px",
        spacing: "md",
        contents: [
          // Header
          {
            type: "box",
            layout: "horizontal",
            contents: [
              {
                type: "text",
                text: "ORDER SUMMARY",
                size: "xs",
                color: "#777777",
                weight: "bold",
                flex: 1,
              },
              {
                type: "text",
                text: "READY",
                size: "xs",
                color: "#111111",
                weight: "bold",
                align: "end",
              },
            ],
          },

          {
            type: "text",
            text: "訂購內容確認",
            size: "xl",
            weight: "bold",
            color: "#111111",
            margin: "md",
          },

          {
            type: "text",
            text: "最後一步，請確認以下訂購資料是否正確。",
            size: "sm",
            color: "#555555",
            wrap: true,
          },

          {
            type: "separator",
            margin: "lg",
            color: "#E5E5E5",
          },

          // 주문 과정 완료 표시
          {
            type: "box",
            layout: "horizontal",
            margin: "lg",
            paddingAll: "12px",
            backgroundColor: "#F3F3F3",
            cornerRadius: "8px",
            contents: [
              {
                type: "text",
                text: "✓",
                size: "sm",
                color: "#111111",
                weight: "bold",
                flex: 0,
              },
              {
                type: "text",
                text: "訂購資料填寫完成",
                size: "sm",
                color: "#555555",
                weight: "bold",
                margin: "sm",
                wrap: true,
              },
            ],
          },

          // 주문 정보
          {
            type: "box",
            layout: "vertical",
            margin: "md",
            paddingAll: "18px",
            backgroundColor: "#F8F8F8",
            cornerRadius: "12px",
            spacing: "md",
            contents: rows.map((row, index) => ({
              type: "box",
              layout: "horizontal",
              margin: index === 0 ? "none" : "sm",
              contents: [
                {
                  type: "text",
                  text: row.label,
                  size: "xs",
                  color: "#777777",
                  flex: 3,
                },
                {
                  type: "text",
                  text: row.value,
                  size: "sm",
                  color: "#222222",
                  weight: "bold",
                  wrap: true,
                  flex: 5,
                },
              ],
            })),
          },

          {
            type: "text",
            text: "確認無誤後，請點選下方「確認訂購」。",
            size: "xs",
            color: "#666666",
            wrap: true,
            margin: "sm",
          },
        ],
      },

      footer: {
        type: "box",
        layout: "vertical",
        paddingAll: "20px",
        paddingTop: "0px",
        spacing: "sm",
        contents: [
          // 메인 CTA
          {
            type: "button",
            style: "primary",
            color: "#111111",
            height: "sm",
            action: {
              type: "postback",
              label: "確認訂購",
              data: "order:confirm",
              displayText: "確認訂購",
            },
          },

          // 다시 작성
          {
            type: "button",
            style: "secondary",
            height: "sm",
            action: {
              type: "postback",
              label: "重新填寫",
              data: "order:restart",
              displayText: "重新填寫訂購資料",
            },
          },

          // 취소
          {
            type: "button",
            style: "link",
            height: "sm",
            color: "#888888",
            action: {
              type: "postback",
              label: "取消訂購",
              data: "order:cancel",
              displayText: "取消訂購",
            },
          },
        ],
      },
    },
  };
}
