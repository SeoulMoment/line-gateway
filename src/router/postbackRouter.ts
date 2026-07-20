import { brandCommand } from "../commands/brand";
// import { bestCommand } from "../commands/best";
// import { deliveryCommand } from "../commands/delivery";
// import { newArrivalCommand } from "../commands/newArrival";
// import { orderCommand } from "../commands/order";
// import { supportCommand } from "../commands/support";

import { CommandContext } from "../context/commandContext";
import { LineService } from "../services/line";
import type { PostbackEvent } from "../types/line/webhook";

export async function postbackRouter(
  event: PostbackEvent,
  line: LineService,
): Promise<void> {
  const context: CommandContext = {
    event,
    replyToken: event.replyToken,
    line,
  };

  switch (event.postback.data) {
    case "brand":
      await brandCommand(context);
      break;

    // case "new":
    //   await newArrivalCommand(context);
    //   break;

    // case "best":
    //   await bestCommand(context);
    //   break;

    // case "order":
    //   await orderCommand(context);
    //   break;

    // case "delivery":
    //   await deliveryCommand(context);
    //   break;

    // case "support":
    //   await supportCommand(context);
    //   break;

    default:
      console.warn("Unknown postback:", event.postback.data);
  }
}
