import { createDeliveryMenuFlex } from "../builders/flex/deliveryMenu";
import { CommandContext } from "../context/commandContext";

export async function deliveryCommand(context: CommandContext): Promise<void> {
  const { line, replyToken } = context;

  await line.reply(replyToken, [createDeliveryMenuFlex()]);
}
