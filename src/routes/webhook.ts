import { Hono } from "hono";

import { verifySignature } from "../middleware/verifySignature";
import { webhookController } from "../controllers/webhookController";

const webhook = new Hono();

webhook.post(
    "/webhook",
    verifySignature,
    webhookController
);

export default webhook;