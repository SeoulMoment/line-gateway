import { createSupportFlex } from "../builders/flex/supportMenu";
import type { CommandContext } from "../context/commandContext";

export async function supportCommand(context: CommandContext): Promise<void> {
  const { line, replyToken } = context;

  await line.reply(replyToken, [createSupportFlex()]);
}
