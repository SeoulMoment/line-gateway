export const MEMBER_STATE = {
  NONE: "NONE",
  WAIT_EMAIL: "WAIT_EMAIL",
  WAIT_VERIFY: "WAIT_VERIFY",
} as const;

export type MemberState = (typeof MEMBER_STATE)[keyof typeof MEMBER_STATE];

export const MEMBER_POSTBACK = {
  MEMBER_ORDER: "member:order",
  GUEST_ORDER: "guest:order",
  CANCEL_ORDER: "cancel:order",
  AGREEMENT: "member:agreement",
  DETAIL: "member:detail",
  BACK: "member:back",
  SEND_CODE: "member:send-code",
} as const;

export const MEMBER_REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  CODE: /^\d{6}$/,
} as const;
