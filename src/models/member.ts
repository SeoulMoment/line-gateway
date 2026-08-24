import { MemberState } from "../constants/member";

export interface MemberSession {
  lineUserId: string;
  state: MemberState;
  email: string | null;
}
