import { LineService } from "../services/line";
import type { PostbackEvent } from "../types/line/webhook";

export interface PostbackContext {
  event: PostbackEvent;
  replyToken: string;
  line: LineService;
}
