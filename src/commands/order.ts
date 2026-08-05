import { createTextMessage } from "../builders/message/text";
import type { CommandContext } from "../context/commandContext";

export async function orderCommand(context: CommandContext): Promise<void> {
  const { line, replyToken } = context;

  await line.reply(replyToken, [
    createTextMessage(
      "📦 訂單查詢\n\n此功能目前正在準備中，暫時尚未開放使用。\n\n如需查詢訂單狀態，歡迎直接聯絡 Seoul Moment 客服，我們會協助您確認訂單資訊。\n\n造成不便，敬請見諒 🙏",
    ),
  ]);
}
