import { LineService } from "../services/line";
import type { WebhookEvent } from "../types/line/webhook";

export interface CommandContext {
  event: WebhookEvent;
  replyToken: string;
  line: LineService;
}
