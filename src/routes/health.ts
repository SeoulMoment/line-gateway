import { Hono } from "hono";

const Health = new Hono();

Health.get("/", (c) => {
  return c.json({
    status: "ok",
    service: "Seoul Moment LINE Gateway",
    version: "1.0.0",
  });
});

export default Health;