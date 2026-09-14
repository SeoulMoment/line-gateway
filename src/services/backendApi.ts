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
    console.log("========== BACKEND API ==========");
    console.log("METHOD:", method);
    console.log("URL:", `${this.baseUrl}${path}`);
    console.log("BODY:", body);

    const response = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${this.jwt}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    console.log("STATUS:", response.status);

    const responseText = await response.text();

    console.log("RESPONSE:", responseText);

    if (!response.ok) {
      throw new Error(
        `Backend API Error (${response.status})\n${responseText}`,
      );
    }

    return JSON.parse(responseText) as T;
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
