import { Hono } from "hono";

import { webhookController } from "../controllers/webhookController";
import { verifySignature } from "../middleware/verifySignature";

const webhook = new Hono();

webhook.post("/webhook", verifySignature, webhookController);

export default webhook;
