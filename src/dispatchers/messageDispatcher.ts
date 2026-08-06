import { postbackHandler } from "../handlers/postbackHandler";
import { textHandler } from "../handlers/textHandler";
import { LineService } from "../services/line";
import {
  MessageEvent,
  PostbackEvent,
  WebhookEvent,
} from "../types/line/webhook";
export async function dispatchMessage(
  event: WebhookEvent,
  line: LineService,
  db: D1Database,
  resendApiKey: string,
): Promise<void> {
  switch (event.type) {
    case "message":
      await textHandler(event as MessageEvent, line, db);
      break;

    case "follow":
      console.log("Follow");
      break;

    case "postback":
      await postbackHandler(event as PostbackEvent, line, db, resendApiKey);
      break;
  }
}
