import { Context } from "hono";

import { dispatchMessage } from "../dispatchers/messageDispatcher";
import { BackendApiService } from "../services/backendApi";
import { LineService } from "../services/line";
interface Bindings {
  LINE_CHANNEL_ACCESS_TOKEN: string;
  line_gateway_db: D1Database;
  RESEND_API_KEY: string;

  BACKEND_API_URL: string;
  BACKEND_JWT: string;
}

export async function webhookController(c: Context<{ Bindings: Bindings }>) {
  const body = await c.req.json<{
    events: Parameters<typeof dispatchMessage>[0][];
  }>();

  const line = new LineService(c.env.LINE_CHANNEL_ACCESS_TOKEN);

  const backendApi = new BackendApiService(
    c.env.BACKEND_API_URL,
    c.env.BACKEND_JWT,
  );

  for (const event of body.events) {
    await dispatchMessage(
      event,
      line,
      c.env.line_gateway_db,
      c.env.RESEND_API_KEY,
      backendApi,
    );
  }

  return c.text("OK");
}
