export type SupportStatus = "active" | "inactive";

export interface SupportSession {
  lineUserId: string;
  status: SupportStatus;
}
