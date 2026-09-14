import { postbackHandler } from "../handlers/postbackHandler";
import { textHandler } from "../handlers/textHandler";
import { BackendApiService } from "../services/backendApi";
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
  backendApi: BackendApiService,
): Promise<void> {
  switch (event.type) {
    case "message":
      await textHandler(event as MessageEvent, line, db, backendApi);
      break;

    case "follow":
      console.log("Follow");
      break;

    case "postback":
      await postbackHandler(event as PostbackEvent, line, db, resendApiKey);
      break;
  }
}
