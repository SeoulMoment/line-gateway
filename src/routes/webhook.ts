export class LineService {
  constructor(
    private readonly accessToken: string
  ) {}

  async reply(replyToken: string, message: string) {
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
          messages: [
            {
              type: "text",
              text: message,
            },
          ],
        }),
      }
    );
  }
}