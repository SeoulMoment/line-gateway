import { textHandler } from "../handlers/textHandler";
import { postbackHandler } from "../handlers/postbackHandler";
import { LineService } from "../services/line";
import { MessageEvent, WebhookEvent } from "../types/line/webhook";

export async function dispatchMessage(
  event: WebhookEvent,
  line: LineService,
): Promise<void> {
  switch (event.type) {
    case "message":
      await textHandler(event as MessageEvent, line);
      break;

    case "follow":
      console.log("Follow");
      break;

    case "postback":
      await postbackHandler(event, line);
      break;
  }
}
