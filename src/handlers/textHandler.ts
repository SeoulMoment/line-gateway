import { LineService } from "../services/line";
import { MessageEvent } from "../types/webhook";

import { routeCommand } from "../router/commandRouter";

export async function textHandler(
  event: MessageEvent,
  line: LineService,
): Promise<void> {
  const userMessage = event.message.text.trim();

  await routeCommand(userMessage, event.replyToken, line);
}
