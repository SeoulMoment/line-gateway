import { brandCommand } from "../commands/brand";
import { greetingCommand } from "../commands/greeting";
import { unknownCommand } from "../commands/unknown";
import { LineService } from "../services/line";
import { MessageEvent } from "../types/webhook";

export async function textHandler(
  event: MessageEvent,
  line: LineService,
): Promise<void> {
  const userMessage = event.message.text.trim();

  switch (userMessage) {
    case "안녕":
    case "안녕하세요":
      await greetingCommand(event.replyToken, line);
      break;

    case "品牌館":
      await brandCommand(event.replyToken, line);
      break;

    default:
      await unknownCommand(event.replyToken, line);
      break;
  }
}
