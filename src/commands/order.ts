import { createTextMessage } from "../builders/message/text";
import { CommandContext } from "../context/commandContext";

export async function orderCommand(context: CommandContext): Promise<void> {
  const { line, replyToken } = context;

  await line.reply(replyToken, [
    createTextMessage("📦 如需查詢訂單，請輸入您的訂單編號或聯絡客服。"),
  ]);
}
