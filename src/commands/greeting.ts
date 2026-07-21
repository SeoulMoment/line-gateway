import { createTextMessage } from "../builders/message/text";
import { CommandContext } from "../context/commandContext";

export async function greetingCommand(context: CommandContext): Promise<void> {
  const { line, replyToken } = context;

  await line.reply(replyToken, [
    createTextMessage("您好！歡迎來到 Seoul Moment 👋"),
  ]);
}
