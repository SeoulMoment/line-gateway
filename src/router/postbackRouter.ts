import { createOrderPlatformMenuFlex } from "../builders/flex/orderPlatformMenu";
import { bestCommand } from "../commands/best";
import { brandCommand } from "../commands/brand";
import { deliveryCommand } from "../commands/delivery";
import { newArrivalCommand } from "../commands/newArrival";
import { orderCommand } from "../commands/order";
import { supportCommand } from "../commands/support";
import type { CommandContext } from "../context/commandContext";
import type { LineService } from "../services/line";
import type { PostbackEvent } from "../types/line/webhook";
import { orderPostbackRouter } from "./orderPostbackRouter";

export async function postbackRouter(
  event: PostbackEvent,
  line: LineService,
): Promise<void> {
  const data = event.postback.data;

  const context: CommandContext = {
    line,
    replyToken: event.replyToken,
  };

  // 주문 시작
  if (data === "order:start") {
    await line.reply(event.replyToken, [createOrderPlatformMenuFlex()]);

    return;
  }

  // 주문 관련 postback
  const handled = await orderPostbackRouter(event, line);

  if (handled) {
    return;
  }

  // 일반 Rich Menu
  switch (data) {
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
