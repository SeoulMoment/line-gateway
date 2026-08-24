import { memberTextHandler } from "./memberTextHandler";
import { routeCommand } from "../router/commandRouter";
import { SupportSessionService } from "../services/supportSession";
import { orderTextHandler } from "./orderTextHandler";

import type { MessageEvent } from "../types/line/webhook";
import type { LineService } from "../services/line";

export async function textHandler(
  event: MessageEvent,
  line: LineService,
  db: D1Database,
): Promise<void> {
  // 1. 회원가입 진행 중인지 확인
  const memberHandled = await memberTextHandler(event, line, db);

  if (memberHandled) {
    return;
  }

  // 2. 주문 진행 중인지 확인
  const handled = await orderTextHandler(event, line, db);

  if (handled) {
    return;
  }

  // 3. 고객센터 상담 중인지 확인
  const lineUserId = event.source.userId;

  if (lineUserId) {
    const support = new SupportSessionService(db);

    const isActive = await support.isActive(lineUserId);

    if (isActive) {
      // 상담 중에는 Worker가 아무 응답도 하지 않음
      return;
    }
  }

  // 4. 일반 Command 처리
  await routeCommand(event, line, db);
}
