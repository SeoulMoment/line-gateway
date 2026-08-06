import { routeCommand } from "../router/commandRouter";
import type { LineService } from "../services/line";
import type { MessageEvent } from "../types/line/webhook";
import { orderTextHandler } from "./orderTextHandler";

export async function textHandler(
  event: MessageEvent,
  line: LineService,
  db: D1Database,
): Promise<void> {
  // 현재 진행 중인 주문이 있는지 먼저 확인
  const handled = await orderTextHandler(event, line, db);

  // 주문 입력으로 처리되었다면 일반 commandRouter로 보내지 않음
  if (handled) {
    return;
  }

  // 주문 진행 중이 아니라면 기존 메시지 처리
  await routeCommand(event, line);
}
