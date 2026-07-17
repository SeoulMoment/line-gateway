import { createBrandMenuFlex } from "../builders/flex";
import { CommandContext } from "../context/commandContext";

export async function brandCommand(context: CommandContext): Promise<void> {
  const { line, replyToken } = context;

  await line.reply(replyToken, [createBrandMenuFlex()]);
}
