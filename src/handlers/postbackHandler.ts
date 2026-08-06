import { postbackRouter } from "../router/postbackRouter";
import { LineService } from "../services/line";
import type { PostbackEvent } from "../types/line/webhook";

export async function postbackHandler(
  event: PostbackEvent,
  line: LineService,
  db: D1Database,
): Promise<void> {
  await postbackRouter(event, line, db);
}
