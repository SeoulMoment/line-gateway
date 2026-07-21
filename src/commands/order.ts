import { createOrderMenuFlex } from "../builders/flex/orderMenu";
import { CommandContext } from "../context/commandContext";

export async function orderCommand(context: CommandContext): Promise<void> {
  const { line, replyToken } = context;

  await line.reply(replyToken, [createOrderMenuFlex()]);
}
