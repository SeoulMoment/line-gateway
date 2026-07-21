import { brandCommand } from "../commands/brand";
import { bestCommand } from "../commands/best";
import { deliveryCommand } from "../commands/delivery";
import { newArrivalCommand } from "../commands/newArrival";
import { orderCommand } from "../commands/order";
import { supportCommand } from "../commands/support";
import { PostbackContext } from "../context/postbackContext";

export async function postbackRouter(context: PostbackContext): Promise<void> {
  const action = context.event.postback.data;

  switch (action) {
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
