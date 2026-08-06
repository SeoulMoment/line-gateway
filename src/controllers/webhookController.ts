import { Context } from "hono";

import { dispatchMessage } from "../dispatchers/messageDispatcher";
import { LineService } from "../services/line";

export async function webhookController(c: Context) {
  const body = await c.req.json();

  const line = new LineService(c.env.LINE_CHANNEL_ACCESS_TOKEN);
  const db = c.env.line_gateway_db as D1Database;

  for (const event of body.events) {
    await dispatchMessage(event, line, db);
  }

  return c.text("OK");
}
