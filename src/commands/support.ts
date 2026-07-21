import { createTextMessage } from "../builders/message/text";
import { CommandContext } from "../context/commandContext";

export async function supportCommand(context: CommandContext): Promise<void> {
  const { line, replyToken } = context;

  await line.reply(replyToken, [
    createTextMessage(
      "💬 客服時間：週一～週五 10:00–18:00\n歡迎直接回覆此聊天室與我們聯繫。",
    ),
  ]);
}
