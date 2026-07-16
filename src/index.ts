import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Seoul Moment LINE Gateway");
});

export default app;