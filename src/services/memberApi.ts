export class MemberApiService {
  constructor(
    private readonly endpoint: string,
    private readonly apiKey: string,
  ) {}

  async checkMember(lineUserId: string) {
    throw new Error("Not implemented");
  }

  async sendEmail(lineUserId: string, email: string) {
    throw new Error("Not implemented");
  }

  async verifyEmail(lineUserId: string, code: string) {
    throw new Error("Not implemented");
  }
}
