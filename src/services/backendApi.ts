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

    if (!response.ok) {
      const error = await response.text();

      throw new Error(`Backend API Error (${response.status})\n${error}`);
    }

    return (await response.json()) as T;
  }

  async sendEmailCode(email: string) {
    return this.request("POST", "/auth/email/code", {
      email,
    });
  }

  async verifyEmail(email: string, code: string) {
    return this.request("POST", "/auth/email/verify", {
      email,
      code,
    });
  }

  async getUserInfo() {
    return this.request("GET", "/user/info");
  }
}
