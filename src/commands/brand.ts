import { createBrandMenuFlex } from "../builders/flex/brandMenu";
import { createTextMessage } from "../builders/message/text";
import { CommandContext } from "../context/commandContext";

export async function brandCommand(context: CommandContext): Promise<void> {
  const { line, replyToken } = context;

  await line.reply(replyToken, [
    createBrandMenuFlex(),
    createTextMessage("歡迎來到 Seoul Moment 品牌館 ✨"),
  ]);
}
