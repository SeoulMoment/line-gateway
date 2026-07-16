import type { Env } from "../types/env";

export interface LineConfig {
  accessToken: string;
  channelSecret: string;
}

export function getLineConfig(env: Env): LineConfig {
  return {
    accessToken: env.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: env.LINE_CHANNEL_SECRET,
  };
}
