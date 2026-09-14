import { routeCommand } from "../router/commandRouter";
import { BackendApiService } from "../services/backendApi";
import type { LineService } from "../services/line";
import { SupportSessionService } from "../services/supportSession";
import type { MessageEvent } from "../types/line/webhook";
import { memberTextHandler } from "./memberTextHandler";
import { orderTextHandler } from "./orderTextHandler";

export async function textHandler(
  event: MessageEvent,
  line: LineService,
  db: D1Database,
  backendApi: BackendApiService,
): Promise<void> {
  const memberHandled = await memberTextHandler(event, line, db, backendApi);

  if (memberHandled) {
    return;
  }

  const handled = await orderTextHandler(event, line, db);

  if (handled) {
    return;
  }

  const lineUserId = event.source.userId;

  if (lineUserId) {
    const support = new SupportSessionService(db);

    const isActive = await support.isActive(lineUserId);

    if (isActive) {
      return;
    }
  }

  await routeCommand(event, line, db);
}
