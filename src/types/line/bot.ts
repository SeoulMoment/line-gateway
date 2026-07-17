import { LineMessage } from "./message";

export interface ReplyRequest {
  replyToken: string;
  messages: LineMessage[];
}

export interface BotInfo {
  userId: string;
  basicId: string;
  displayName: string;
  pictureUrl?: string;
  chatMode: "chat" | "bot";
  markAsReadMode: "auto" | "manual";
}
