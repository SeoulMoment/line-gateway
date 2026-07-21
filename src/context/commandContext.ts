import { LineService } from "../services/line";

export interface CommandContext {
  line: LineService;
  replyToken: string;
}
