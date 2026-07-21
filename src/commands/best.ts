import { createBestMenuFlex } from "../builders/flex/bestMenu";
import { CommandContext } from "../context/commandContext";

export async function bestCommand(context: CommandContext): Promise<void> {
  const { line, replyToken } = context;

  await line.reply(replyToken, [createBestMenuFlex()]);
}
