import { Hono } from "hono";

const webhook = new Hono();

webhook.post("/webhook", async (c) => {
  const body = await c.req.json();

  console.log(body);

  return c.text("OK");
});

export default webhook;