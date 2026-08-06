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
    altText: "訂購資料確認",
    contents: {
      type: "bubble",

      body: {
        type: "box",
        layout: "vertical",
        spacing: "md",
        contents: [
          {
            type: "text",
            text: "訂購資料確認",
            weight: "bold",
            size: "xl",
          },
          {
            type: "text",
            text: "請確認以下資料是否正確",
            size: "sm",
            color: "#888888",
          },
          {
            type: "separator",
            margin: "md",
          },

          ...rows.map((row) => ({
            type: "box",
            layout: "horizontal",
            margin: "md",
            contents: [
              {
                type: "text",
                text: row.label,
                size: "sm",
                color: "#888888",
                flex: 3,
              },
              {
                type: "text",
                text: row.value,
                size: "sm",
                color: "#222222",
                wrap: true,
                flex: 5,
              },
            ],
          })),
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
              label: "確認送出",
              data: "order:confirm",
              displayText: "確認送出訂單",
            },
          },
          {
            type: "button",
            action: {
              type: "postback",
              label: "重新填寫",
              data: "order:restart",
              displayText: "重新填寫訂購資料",
            },
          },
          {
            type: "button",
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
