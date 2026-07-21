import { createTextMessage } from "../builders/message/text";
import { CommandContext } from "../context/commandContext";

export async function deliveryCommand(context: CommandContext): Promise<void> {
  const { line, replyToken } = context;

  await line.reply(replyToken, [
    createTextMessage("🚚 韓國直送約 7~14 個工作天，最長約 21 個工作天。"),
  ]);
}
