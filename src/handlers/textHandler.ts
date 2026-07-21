import { CommandContext } from "../context/commandContext";
import { routeCommand } from "../router/commandRouter";
import { LineService } from "../services/line";
import type { MessageEvent } from "../types/line/webhook";

export async function textHandler(
  event: MessageEvent,
  line: LineService,
): Promise<void> {
  const context: CommandContext = {
    line,
    replyToken: event.replyToken,
  };

  await routeCommand(event, line);
}
