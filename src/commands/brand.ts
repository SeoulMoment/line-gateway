import { createBrandMenuFlex } from "../builders/flex";
import { LineService } from "../services/line";

export async function brandCommand(
  replyToken: string,
  line: LineService
) {
  await line.reply(replyToken, [
    createBrandMenuFlex(),
  ]);
}