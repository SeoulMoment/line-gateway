import { bestCommand } from "../commands/best";
import { brandCommand } from "../commands/brand";
import { deliveryCommand } from "../commands/delivery";
import { newArrivalCommand } from "../commands/newArrival";
import { orderCommand } from "../commands/order";
import { supportCommand } from "../commands/support";
import { CommandContext } from "../context/commandContext";
import { LineService } from "../services/line";
import { PostbackEvent } from "../types/line/webhook";

export async function postbackRouter(
  event: PostbackEvent,
  line: LineService,
): Promise<void> {
  const context: CommandContext = {
    line,
    replyToken: event.replyToken,
  };
  if (event.postback.data === "order:start") {
    await line.reply(event.replyToken, [
      {
        type: "text",
        text: "🛍️ 開始訂購\n\n" + "首先，請選擇您的購買來源。",
      },
      {
        type: "flex",
        altText: "選擇購買平台",
        contents: {
          type: "bubble",
          body: {
            type: "box",
            layout: "vertical",
            spacing: "sm",
            contents: [
              {
                type: "text",
                text: "購買平台",
                weight: "bold",
                size: "lg",
              },
              {
                type: "text",
                text: "請選擇您購買商品的平台",
                size: "sm",
                color: "#888888",
                wrap: true,
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
                  type: "postback",
                  label: "Seoul Moment",
                  data: "order:platform:seoulmoment",
                  displayText: "Seoul Moment",
                },
              },
              {
                type: "button",
                action: {
                  type: "postback",
                  label: "Shopee",
                  data: "order:platform:shopee",
                  displayText: "Shopee",
                },
              },
              {
                type: "button",
                action: {
                  type: "postback",
                  label: "其他平台",
                  data: "order:platform:other",
                  displayText: "其他平台",
                },
              },
            ],
          },
        },
      },
    ]);

    return;
  }
  switch (event.postback.data) {
    case "brand":
      await brandCommand(context);
      break;

    case "new":
      await newArrivalCommand(context);
      break;

    case "best":
      await bestCommand(context);
      break;

    case "order":
      await orderCommand(context);
      break;

    case "delivery":
      await deliveryCommand(context);
      break;

    case "support":
      await supportCommand(context);
      break;

    default:
      break;
  }
}
