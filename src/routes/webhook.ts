import { Hono } from "hono";

import { verifySignature } from "../middleware/verifySignature";
import { LineService } from "../services/line";

const webhook = new Hono();

webhook.post(
  "/webhook",
  verifySignature,
  async (c) => {
    const body = await c.req.json();

    const line = new LineService(
      c.env.LINE_CHANNEL_ACCESS_TOKEN
    );

    for (const event of body.events) {
      if (event.type !== "message") continue;
      if (event.message.type !== "text") continue;

      await line.reply(
        event.replyToken,
        "👋 안녕하세요!\n\nSeoul Moment LINE Gateway가 정상적으로 연결되었습니다."
      );
    }

    return c.text("OK");
  }
);

export default webhook;