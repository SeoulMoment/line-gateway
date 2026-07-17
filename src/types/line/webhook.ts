export interface TextMessageContent {
  type: "text";
  text: string;
}

export interface UserSource {
  type: "user";
  userId: string;
}

export interface MessageEvent {
  type: "message";
  replyToken: string;
  timestamp: number;
  source: UserSource;
  message: TextMessageContent;
}

export interface FollowEvent {
  type: "follow";
  replyToken: string;
  timestamp: number;
  source: UserSource;
}

export interface PostbackEvent {
  type: "postback";
  replyToken: string;
  timestamp: number;
  source: UserSource;
  postback: {
    data: string;
  };
}

export type WebhookEvent = MessageEvent | FollowEvent | PostbackEvent;

export interface WebhookBody {
  destination: string;
  events: WebhookEvent[];
}
