import { LineMessage } from "./message";

export interface ReplyRequest {
    replyToken: string;
    messages: LineMessage[];
}