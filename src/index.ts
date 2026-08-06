import { Hono } from "hono";

import testResend from "./router/testResend";
import health from "./routes/health";
import webhook from "./routes/webhook";

const app = new Hono();

app.route("/", health);
app.route("/", webhook);
app.route("/", testResend);

export default app;
