import type { Order } from "../models/order";

interface EmailBinding {
  send(message: {
    to: string;
    from: {
      email: string;
      name?: string;
    };
    subject: string;
    text?: string;
    html?: string;
  }): Promise<unknown>;
}

export class OrderEmailService {
  constructor(private readonly email: EmailBinding) {}

  async sendNewOrder(order: Order): Promise<void> {
    const platform = order.platform === "shopee" ? "Shopee" : "LINE";

    const shopeeOrder =
      order.platform === "shopee"
        ? `Shopee 訂單編號：${order.externalOrderId ?? "-"}\n`
        : "";

    const subject =
      `[Seoul Moment 新訂單] ${order.orderNumber} | ` +
      `${order.customerName} | ${platform}`;

    const text =
      `Seoul Moment 新訂單通知\n` +
      `────────────────────────\n\n` +
      `新的訂單已成功送出。\n\n` +
      `【訂單資訊】\n\n` +
      `訂單編號：${order.orderNumber}\n` +
      `訂購方式：${platform}\n` +
      shopeeOrder +
      `訂購日期：${order.createdAt}\n\n` +
      `【訂購人資訊】\n\n` +
      `訂購人：${order.customerName}\n` +
      `聯絡電話：${order.phone}\n\n` +
      `※ 訂購人姓名為顧客填寫之匯款帳戶實名，請於確認款項時核對。\n\n` +
      `【商品資訊】\n\n` +
      `商品名稱：${order.productName}\n` +
      `尺寸：${order.size}\n` +
      `顏色：${order.color}\n\n` +
      `【取貨資訊】\n\n` +
      `取貨超商：${order.convenienceStore}\n` +
      `取貨門市：${order.storeName}\n\n` +
      `────────────────────────\n\n` +
      `LINE User ID：\n${order.lineUserId}\n\n` +
      `請確認商品庫存、付款狀態及配送資訊後，進行後續訂單處理。\n\n` +
      `Seoul Moment\n` +
      `Automated Order System`;

    await this.email.send({
      to: "seoulmomenttw@gmail.com",

      // 반드시 Cloudflare Email Service에 온보딩한
      // seoulmoment.com.tw 발신 주소를 사용
      from: {
        email: "order@seoulmoment.com.tw",
        name: "Seoul Moment Order",
      },

      subject,
      text,
    });
  }
}
