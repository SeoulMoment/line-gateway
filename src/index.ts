import { Hono } from "hono";

import health from "./routes/health";
import testEmail from "./routes/testEmail";
import webhook from "./routes/webhook";

const app = new Hono();

app.route("/", health);
app.route("/", webhook);
app.route("/", testEmail);

export default app;
