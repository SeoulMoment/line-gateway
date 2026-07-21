import { createTextMessage } from "../builders/message/text";
import { CommandContext } from "../context/commandContext";

export async function bestCommand(context: CommandContext): Promise<void> {
  const { line, replyToken } = context;

  await line.reply(replyToken, [
    createTextMessage("🔥 熱銷商品整理中，敬請期待！"),
  ]);
}
