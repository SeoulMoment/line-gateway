import { CommandContext } from "../context/commandContext";

export async function unknownCommand(context: CommandContext): Promise<void> {
  const { line, replyToken } = context;

  await line.reply(replyToken, [
    {
      type: "text",
      text: "죄송합니다. 아직 지원하지 않는 기능입니다.",
    },
  ]);
}
