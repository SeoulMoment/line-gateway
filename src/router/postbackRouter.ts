import { createOrderPlatformMenuFlex } from "../builders/flex/orderPlatformMenu";
import { createPaymentInfoFlex } from "../builders/flex/paymentInfo";
import { bestCommand } from "../commands/best";
import { brandCommand } from "../commands/brand";
import { deliveryCommand } from "../commands/delivery";
import { newArrivalCommand } from "../commands/newArrival";
import { orderCommand } from "../commands/order";
import { supportCommand } from "../commands/support";
import type { CommandContext } from "../context/commandContext";
import type { LineService } from "../services/line";
import type { PostbackEvent } from "../types/line/webhook";
import { orderPostbackRouter } from "./orderPostbackRouter";

export async function postbackRouter(
  event: PostbackEvent,
  line: LineService,
  db: D1Database,
  resendApiKey: string,
): Promise<void> {
  const data = event.postback.data;

  const context: CommandContext = {
    line,
    replyToken: event.replyToken,
  };

  // 주문 시작
  if (data === "order:start") {
    await line.reply(event.replyToken, [createOrderPlatformMenuFlex()]);
    return;
  }

  // 결제 정보
  if (data === "payment:info") {
    await line.reply(event.replyToken, [createPaymentInfoFlex()]);
    return;
  }

  if (data === "payment:complete") {
    await line.reply(event.replyToken, [
      {
        type: "text",
        text:
          "✓ 訂購完成\n\n" +
          "感謝您的訂購！\n\n" +
          "款項確認後，我們將透過 LINE 通知您。\n\n" +
          "您可以隨時使用下方選單查看商品或聯絡客服。",
      },
    ]);

    return;
  }

  // 주문 관련 Postback
  const handled = await orderPostbackRouter(event, line, db, resendApiKey);

  if (handled) {
    return;
  }

  // 일반 Rich Menu
  switch (data) {
    case "brand":
      await brandCommand(context);
      break;

    case "new":
      await newArrivalCommand(context);
      break;

    case "best":
      await bestCommand(context);
      break;

    case "order":
      await orderCommand(context);
      break;

    case "delivery":
      await deliveryCommand(context);
      break;

    case "support":
      await supportCommand(context);
      break;

    default:
      break;
  }
}
