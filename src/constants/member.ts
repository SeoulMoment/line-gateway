export const MEMBER_STATE = {
  NONE: "NONE",
  WAIT_EMAIL: "WAIT_EMAIL",
  WAIT_VERIFY: "WAIT_VERIFY",
  REGISTERED: "REGISTERED",
} as const;

export type MemberState = (typeof MEMBER_STATE)[keyof typeof MEMBER_STATE];

export const MEMBER_POSTBACK = {
  AGREEMENT: "member:agreement",
  SEND_EMAIL: "member:send-email",
  VERIFY: "member:verify",
} as const;

export const MEMBER_REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;
