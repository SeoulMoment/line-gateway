import { createTextMessage } from "../builders/message/text";
import { CommandContext } from "../context/commandContext";

export async function newArrivalCommand(
  context: CommandContext,
): Promise<void> {
  const { line, replyToken } = context;

  await line.reply(replyToken, [
    createTextMessage("🆕 新品專區準備中，敬請期待！"),
  ]);
}
