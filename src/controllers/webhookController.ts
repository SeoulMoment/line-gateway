import { Context } from "hono";

import { dispatchMessage } from "../dispatchers/messageDispatcher";
import { LineService } from "../services/line";

interface Bindings {
  LINE_CHANNEL_ACCESS_TOKEN: string;
  line_gateway_db: D1Database;
  RESEND_API_KEY: string;
}

export async function webhookController(c: Context<{ Bindings: Bindings }>) {
  const body = await c.req.json<{
    events: Parameters<typeof dispatchMessage>[0][];
  }>();

  const line = new LineService(c.env.LINE_CHANNEL_ACCESS_TOKEN);

  for (const event of body.events) {
    await dispatchMessage(
      event,
      line,
      c.env.line_gateway_db,
      c.env.RESEND_API_KEY,
    );
  }

  return c.text("OK");
}
