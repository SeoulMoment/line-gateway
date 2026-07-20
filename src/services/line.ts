import { LINE_API, LINE_ENDPOINT } from "../config/line";

import type { BotInfo } from "../types/line/bot";
import type { LineMessage } from "../types/line/message";
import type { RichMenuRequest, CreateRichMenuResponse } from "../types/line";

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
  async createRichMenu(body: RichMenuRequest): Promise<CreateRichMenuResponse> {
    return this.request<CreateRichMenuResponse>(
      "POST",
      LINE_ENDPOINT.RICHMENU,
      body,
    );
  }

  async deleteRichMenu(richMenuId: string): Promise<void> {
    await this.request("DELETE", `${LINE_ENDPOINT.RICHMENU}/${richMenuId}`);
  }
  async uploadRichMenuImage(
    richMenuId: string,
    image: ArrayBuffer,
  ): Promise<void> {
    const response = await fetch(
      `${LINE_API.DATA_BASE_URL}${LINE_ENDPOINT.RICHMENU}/${richMenuId}/content`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "image/png",
        },
        body: image,
      },
    );
    console.log("uploadRichMenuImage > ", process.env.LINE_RICH_MENU_ID);

    if (!response.ok) {
      const error = await response.text();
      console.log(
        "uploadRichMenuImage  fail > ",
        process.env.LINE_RICH_MENU_ID,
      );
      throw new Error(`LINE API Error (${response.status})\n${error}`);
    }
  }

  async setDefaultRichMenu(richMenuId: string): Promise<void> {
    await this.request("POST", `/user/all/richmenu/${richMenuId}`);
  }
}
