import type { Env } from "../types/env";

export interface LineConfig {
  accessToken: string;
  channelSecret: string;
}

export const LINE_API = {
  BASE_URL: "https://api.line.me/v2/bot",
} as const;

export const LINE_ENDPOINT = {
  REPLY: "/message/reply",
  PUSH: "/message/push",

  INFO: "/info",

  RICHMENU: "/richmenu",

  USER_PROFILE: "/profile",
} as const;

export function getLineConfig(env: Env): LineConfig {
  return {
    accessToken: env.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: env.LINE_CHANNEL_SECRET,
  };
}
