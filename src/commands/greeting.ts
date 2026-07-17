import { CommandContext } from "../context/commandContext";

export async function greetingCommand(context: CommandContext): Promise<void> {
  const { line, replyToken } = context;

  await line.reply(replyToken, [
    {
      type: "text",
      text: `👋 안녕하세요!

서울모먼트입니다.

무엇을 도와드릴까요?`,
    },
  ]);
}
