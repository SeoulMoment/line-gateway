import { LineService } from "../services/line";
import type { MessageEvent } from "../types/line/webhook";

export interface CommandContext {
  event: MessageEvent;
  replyToken: string;
  line: LineService;
}
