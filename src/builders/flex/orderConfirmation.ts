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
      label: "聯絡電話",
      value: order.phone ?? "-",
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
          {
            type: "text",
            text: "ORDER SUMMARY",
            size: "xs",
            color: "#999999",
            weight: "bold",
          },
          {
            type: "text",
            text: "訂購內容確認",
            size: "xl",
            weight: "bold",
            color: "#111111",
          },
          {
            type: "text",
            text: "請確認以下訂購資訊是否正確。",
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
            spacing: "md",
            contents: rows.map((row) => ({
              type: "box",
              layout: "horizontal",
              spacing: "md",
              contents: [
                {
                  type: "text",
                  text: row.label,
                  size: "xs",
                  color: "#888888",
                  flex: 2,
                  gravity: "top",
                },
                {
                  type: "text",
                  text: row.value,
                  size: "sm",
                  color: "#111111",
                  weight: "bold",
                  wrap: true,
                  align: "end",
                  flex: 4,
                },
              ],
            })),
          },

          {
            type: "box",
            layout: "vertical",
            margin: "md",
            paddingAll: "14px",
            backgroundColor: "#FFF9EC",
            cornerRadius: "10px",
            spacing: "sm",
            contents: [
              {
                type: "text",
                text: "送出前請再次確認",
                size: "sm",
                weight: "bold",
                color: "#8A641E",
              },
              {
                type: "text",
                text: "請確認商品、尺寸、顏色及取貨門市資訊皆正確，確認後即可送出訂單。",
                size: "xs",
                color: "#755A28",
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
        spacing: "sm",
        contents: [
          {
            type: "button",
            style: "primary",
            height: "sm",
            color: "#111111",
            action: {
              type: "postback",
              label: "確認訂購",
              data: "order:confirm",
              displayText: "確認訂購",
            },
          },
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
          {
            type: "button",
            height: "sm",
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
