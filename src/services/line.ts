import { LineMessage } from "../types/message";

export class LineService {
  constructor(private readonly accessToken: string) {}

  async reply(
    replyToken: string,
    messages: LineMessage[]
  ): Promise<Response> {
    return fetch(
      "https://api.line.me/v2/bot/message/reply",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          replyToken,
          messages,
        }),
      }
    );
  }
}