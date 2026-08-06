import { Hono } from "hono";

type Bindings = {
  RESEND_API_KEY: string;
};

const testResend = new Hono<{ Bindings: Bindings }>();

testResend.get("/test-resend", async (c) => {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${c.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Resend 테스트용 발신 주소
        from: "Seoul Moment <onboarding@resend.dev>",
        to: ["seoulmomenttw@gmail.com"],
        subject: "[Seoul Moment] LINE 주문 시스템 테스트",
        text:
          "Seoul Moment LINE 주문 시스템 테스트입니다.\n\n" +
          "이 이메일이 정상적으로 도착했다면 Resend 이메일 발송 기능이 정상적으로 연결된 것입니다.\n\n" +
          "Seoul Moment\n" +
          "Automated Order System",
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Resend email failed:", result);

      return c.json(
        {
          success: false,
          error: result,
        },
        500,
      );
    }

    console.log("Resend email sent:", result);

    return c.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Resend test failed:", error);

    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      500,
    );
  }
});

export default testResend;
