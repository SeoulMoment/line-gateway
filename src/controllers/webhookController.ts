import { Context } from "hono";

import { dispatchMessage } from "../dispatchers/messageDispatcher";
import { LineService } from "../services/line";
import { EmailBinding } from "../types/email";

interface Bindings {
  LINE_CHANNEL_ACCESS_TOKEN: string;
  line_gateway_db: D1Database;
  ORDER_EMAIL: EmailBinding;
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
      c.env.ORDER_EMAIL,
    );
  }

  return c.text("OK");
}
