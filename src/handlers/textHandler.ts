import { LineService } from "../services/line";

export async function textHandler(
  event: any,
  line: LineService
) {
  const userMessage = event.message.text.trim();

  switch (userMessage) {
    case "안녕":
    case "안녕하세요":
      await line.reply(
        event.replyToken,
        "👋 안녕하세요!\n\n서울모먼트입니다.\n 오늘도 너무 고생많았어요."
      );
      break;

    default:
      await line.reply(
        event.replyToken,
        "죄송합니다.\n아직 지원하지 않는 명령입니다."
      );
  }
}