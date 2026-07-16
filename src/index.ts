import { Hono } from "hono";
import health from "./routes/health";
import webhook from "./routes/webhook";

const app = new Hono();

app.route("/", health);
app.route("/", webhook);

export default app;
