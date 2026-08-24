import { routeCommand } from "../router/commandRouter";
import type { LineService } from "../services/line";
import { SupportSessionService } from "../services/supportSession";
import type { MessageEvent } from "../types/line/webhook";
import { orderTextHandler } from "./orderTextHandler";

export async function textHandler(
  event: MessageEvent,
  line: LineService,
  db: D1Database,
): Promise<void> {
  // 1. 주문 진행 중인지 확인
  const handled = await orderTextHandler(event, line, db);

  if (handled) {
    return;
  }

  // 2. 고객센터 상담 중인지 확인
  const lineUserId = event.source.userId;

  if (lineUserId) {
    const support = new SupportSessionService(db);

    const isActive = await support.isActive(lineUserId);

    if (isActive) {
      // 상담 중에는 Worker가 아무 응답도 하지 않음
      return;
    }
  }

  // 3. 일반 Command 처리
  await routeCommand(event, line, db);
}
