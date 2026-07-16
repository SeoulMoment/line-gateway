import { LineService } from "../services/line";

export async function unknownCommand(
  replyToken: string,
  line: LineService
) {
  await line.reply(replyToken, [
    {
      type: "text",
      text: `죄송합니다.

아직 준비되지 않은 기능입니다.`,
    },
  ]);
}