import { createDeliveryGuideFlex } from "../builders/flex/deliveryMenu";
import type { CommandContext } from "../context/commandContext";

export async function deliveryCommand(context: CommandContext): Promise<void> {
  const { line, replyToken } = context;

  await line.reply(replyToken, [createDeliveryGuideFlex()]);
}
