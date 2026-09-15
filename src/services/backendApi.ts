export interface LineBotVerifyResponse {
  userId: number;
  email: string;
  nickname: string;
}

export class BackendApiService {
  constructor(
    private readonly baseUrl: string,
    private readonly jwt: string,
  ) {}

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${this.jwt}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const text = await response.text();

    if (!response.ok) {
      throw new Error(
        `Backend API Error (${response.status})${text ? `\n${text}` : ""}`,
      );
    }

    if (!text) {
      return undefined as T;
    }

    return JSON.parse(text) as T;
  }

  /**
   * LINE 회원 이메일 인증번호 발송
   *
   * Backend:
   * lineUserId -> user_sns(provider=LINE) 회원 조회
   * -> 입력 email과 회원 email 비교
   * -> 일치하면 6자리 인증번호 발송
   */
  async sendLineBotEmailCode(lineUserId: string, email: string) {
    return this.request<void>("POST", "/user/auth/line-bot/email/code", {
      lineUserId,
      email,
    });
  }

  /**
   * LINE 회원 이메일 인증번호 확인
   */
  async verifyLineBotEmail(
    lineUserId: string,
    code: string,
  ): Promise<LineBotVerifyResponse> {
    return this.request<LineBotVerifyResponse>(
      "POST",
      "/user/auth/line-bot/email/verify",
      {
        lineUserId,
        code,
      },
    );
  }
}
