import { Context } from "hono";

import { LineService } from "../services/line";
import { dispatchMessage } from "../dispatchers/messageDispatcher";

export async function webhookController(c: Context) {
  const body = await c.req.json();

  const line = new LineService(c.env.LINE_CHANNEL_ACCESS_TOKEN);

  for (const event of body.events) {
    await dispatchMessage(event, line);
  }

  return c.text("OK");
}
