import { createMemberAgreementFlex } from "../builders/flex/memberAgreement";
import { createOrderPlatformMenuFlex } from "../builders/flex/orderPlatformMenu";
import { createPaymentInfoFlex } from "../builders/flex/paymentInfo";
import { createSupportCategoryFlex } from "../builders/flex/supportCategory";
import { createSupportChatFlex } from "../builders/flex/supportChat";
import { createSupportEndConfirmFlex } from "../builders/flex/supportEndConfirm";
import { bestCommand } from "../commands/best";
import { brandCommand } from "../commands/brand";
import { deliveryCommand } from "../commands/delivery";
import { newArrivalCommand } from "../commands/newArrival";
import { orderCommand } from "../commands/order";
import { supportCommand } from "../commands/support";
import { SUPPORT_CATEGORY } from "../constants/support";
import { SupportSessionService } from "../services/supportSession";
import { orderPostbackRouter } from "./orderPostbackRouter";
import { MemberSessionService } from "../services/memberSession";
import { createEmailGuideFlex } from "../builders/flex/emailGuide";
import { MEMBER_POSTBACK, MEMBER_STATE } from "../constants/member";

import type { PostbackEvent } from "../types/line/webhook";
import type { LineService } from "../services/line";

export async function postbackRouter(
  event: PostbackEvent,
  line: LineService,
  db: D1Database,
  resendApiKey: string,
): Promise<void> {
  const data = event.postback.data;

  const context = {
    line,
    replyToken: event.replyToken,
    db,
    lineUserId: event.source.userId!,
  };

  // 주문 시작
  if (data === "order:start") {
    await line.reply(event.replyToken, [createMemberAgreementFlex()]);

    return;
  }

  // 결제 정보
  if (data === "payment:info") {
    await line.reply(event.replyToken, [createPaymentInfoFlex()]);
    return;
  }

  if (data === MEMBER_POSTBACK.AGREEMENT) {
    const member = new MemberSessionService(db);

    await member.update({
      lineUserId: event.source.userId!,
      state: MEMBER_STATE.WAIT_EMAIL,
    });

    await line.reply(event.replyToken, [createEmailGuideFlex()]);

    return;
  }

  if (data.startsWith("support:category:")) {
    const category = data.replace("support:category:", "");
    const categoryName =
      SUPPORT_CATEGORY[category as keyof typeof SUPPORT_CATEGORY] ??
      SUPPORT_CATEGORY.OTHER;

    const support = new SupportSessionService(db);

    await support.activate(event.source.userId!);

    await line.reply(event.replyToken, [createSupportChatFlex(categoryName)]);

    return;
  }

  // 고객센터 시작
  if (data === "support:start") {
    await line.reply(event.replyToken, [createSupportCategoryFlex()]);

    return;
  }

  if (data === MEMBER_POSTBACK.AGREEMENT) {
    const member = new MemberSessionService(db);

    await member.update({
      lineUserId: event.source.userId!,
      state: MEMBER_STATE.WAIT_EMAIL,
    });

    await line.reply(event.replyToken, [createEmailGuideFlex()]);

    return;
  }

  if (data === "support:end") {
    const support = new SupportSessionService(db);

    const isActive = await support.isActive(event.source.userId!);

    if (!isActive) {
      await line.reply(event.replyToken, [
        {
          type: "text",
          text: "目前沒有進行中的客服對話。",
        },
      ]);

      return;
    }

    await line.reply(event.replyToken, [createSupportEndConfirmFlex()]);

    return;
  }

  if (data === "support:continue") {
    await line.reply(event.replyToken, [
      {
        type: "text",
        text: "💬 已繼續客服對話\n\n請直接輸入您想詢問的內容。",
      },
    ]);

    return;
  }

  if (data === "support:confirm-end") {
    const support = new SupportSessionService(db);

    // TODO
    // send support closed email
    await support.deactivate(event.source.userId!);

    await line.reply(event.replyToken, [
      {
        type: "text",
        text:
          "💚 本次客服對話已結束\n\n" +
          "感謝您的來訊。\n\n" +
          "若之後還有任何問題，歡迎再次聯絡 Seoul Moment 😊",
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
