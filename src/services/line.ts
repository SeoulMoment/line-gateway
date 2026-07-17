import { LINE_API, LINE_ENDPOINT } from "../config/line";
import { BotInfo } from "../types/line/bot";
import type { LineMessage } from "../types/line/message";

export class LineService {
  constructor(private readonly accessToken: string) {}

  private async request<T = unknown>(
    method: string,
    endpoint: string,
    body?: unknown,
  ): Promise<T> {
    const response = await fetch(`${LINE_API.BASE_URL}${endpoint}`, {
      method,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const error = await response.text();

      throw new Error(`LINE API Error (${response.status})\n${error}`);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  }

  async reply(replyToken: string, messages: LineMessage[]): Promise<void> {
    await this.request("POST", LINE_ENDPOINT.REPLY, {
      replyToken,
      messages,
    });
  }

  // Bot 정보 조회
  async getBotInfo(): Promise<BotInfo> {
    return this.request<BotInfo>("GET", LINE_ENDPOINT.INFO);
  }

  // Rich Menu 생성
  // async createRichMenu(body: RichMenuRequest) {
  //   return this.request("POST", LINE_ENDPOINT.RICHMENU, body);
  // }

  // Rich Menu 삭제
  async deleteRichMenu(richMenuId: string) {
    return this.request("DELETE", `${LINE_ENDPOINT.RICHMENU}/${richMenuId}`);
  }
}
