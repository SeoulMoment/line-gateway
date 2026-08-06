import { postbackRouter } from "../router/postbackRouter";
import type { LineService } from "../services/line";
import type { EmailBinding } from "../types/email";
import type { PostbackEvent } from "../types/line/webhook";

export async function postbackHandler(
  event: PostbackEvent,
  line: LineService,
  db: D1Database,
  email: EmailBinding,
): Promise<void> {
  await postbackRouter(event, line, db, email);
}
