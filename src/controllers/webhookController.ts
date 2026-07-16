import { Context } from "hono";

import { dispatchMessage } from "../dispatchers/messageDispatcher";

export async function webhookController(c: Context) {

    const body = await c.req.json();

    for (const event of body.events) {

        await dispatchMessage(event);

    }

    return c.text("OK");

}