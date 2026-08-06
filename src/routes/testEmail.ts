import { Hono } from "hono";

type Bindings = {
  ORDER_EMAIL: SendEmail;
};

const testEmail = new Hono<{ Bindings: Bindings }>();

testEmail.get("/test-email", async (c) => {
  try {
    const result = await c.env.ORDER_EMAIL.send({
      to: "seoulmomenttw@gmail.com",

      // Email Service에 등록된 발신 도메인의 주소여야 함
      from: {
        email: "order@seoulmoment.com.tw",
        name: "Seoul Moment",
      },

      subject: "[Seoul Moment] 주문 이메일 테스트",

      text:
        "Seoul Moment 주문 시스템 테스트\n\n" +
        "Cloudflare Worker에서 발송된 테스트 이메일입니다.\n\n" +
        "이 이메일이 정상적으로 도착했다면 주문 알림 기능을 연결할 수 있습니다.\n\n" +
        "Seoul Moment\n" +
        "Automated Order System",
    });

    return c.json({
      success: true,
      messageId: result.messageId,
    });
  } catch (error) {
    console.error("Email test failed:", error);

    const message =
      error instanceof Error ? error.message : "Unknown email error";

    return c.json(
      {
        success: false,
        error: message,
      },
      500,
    );
  }
});

export default testEmail;
