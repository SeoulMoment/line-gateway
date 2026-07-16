import { Hono } from "hono";

const health = new Hono();

health.get("/", (c) => {
  return c.json({
    status: "ok",
    service: "Seoul Moment LINE Gateway",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

export default health;