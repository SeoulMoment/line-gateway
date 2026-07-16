import { Hono } from "hono";

import { verifySignature } from "../middleware/verifySignature";

const webhook = new Hono();

webhook.post(
  "/webhook",
  verifySignature,
  async (c) => {

    const body = await c.req.json();

    console.log(
      JSON.stringify(body, null, 2)
    );

    return c.text("OK");
  }
);

export default webhook;