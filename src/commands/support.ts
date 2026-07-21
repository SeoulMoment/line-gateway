import { createDeliveryMenuFlex } from "../builders/flex/deliveryMenu";
import { CommandContext } from "../context/commandContext";

export async function supportCommand(context: CommandContext): Promise<void> {
  const { line, replyToken } = context;

  await line.reply(replyToken, [createDeliveryMenuFlex()]);
}
