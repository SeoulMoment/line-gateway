import { Context, Next } from "hono";

export async function verifySignature(c: Context, next: Next) {
  // 다음 단계에서 실제 Signature 검증을 구현한다.
  await next();
}
