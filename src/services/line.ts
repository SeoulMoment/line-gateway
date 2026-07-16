export class LineService {
  constructor(
    private accessToken: string,
    private channelSecret: string
  ) {}

  async reply(replyToken: string, messages: any[]) {
    const response = await fetch(
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

    return response;
  }
}