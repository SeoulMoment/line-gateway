import { LineService } from "../services/line";

export async function greetingCommand(replyToken: string, line: LineService) {
  await line.reply(replyToken, [
    {
      type: "text",
      text: `👋 안녕하세요!

서울모먼트입니다.

무엇을 도와드릴까요?`,
    },
  ]);
}
