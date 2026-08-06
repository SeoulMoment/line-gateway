import type { Order, OrderSession, OrderStatus } from "../models/order";

interface OrderRow {
  id: number;
  order_number: string;
  line_user_id: string;
  platform: "line" | "shopee";
  external_order_id: string | null;
  customer_name: string;
  product_name: string;
  size: string;
  color: string;
  phone: string;
  convenience_store: string;
  store_name: string;
  status: OrderStatus;
  created_at: string;
}

export class OrderService {
  constructor(private readonly db: D1Database) {}

  private getTaiwanDateCode(): string {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Taipei",
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(new Date());

    const year = parts.find((part) => part.type === "year")?.value;
    const month = parts.find((part) => part.type === "month")?.value;
    const day = parts.find((part) => part.type === "day")?.value;

    if (!year || !month || !day) {
      throw new Error("Failed to generate Taiwan date.");
    }

    return `${year}${month}${day}`;
  }

  private async generateOrderNumber(): Promise<string> {
    const dateCode = this.getTaiwanDateCode();
    const prefix = `SM-${dateCode}-`;

    const latestOrder = await this.db
      .prepare(
        `
        SELECT order_number
        FROM orders
        WHERE order_number LIKE ?
        ORDER BY order_number DESC
        LIMIT 1
        `,
      )
      .bind(`${prefix}%`)
      .first<{ order_number: string }>();

    let sequence = 1;

    if (latestOrder) {
      const previousSequence = Number(
        latestOrder.order_number.split("-").at(-1),
      );

      if (Number.isFinite(previousSequence)) {
        sequence = previousSequence + 1;
      }
    }

    return `${prefix}${String(sequence).padStart(4, "0")}`;
  }

  async createFromSession(session: OrderSession): Promise<Order> {
    if (
      !session.customerName ||
      !session.productName ||
      !session.size ||
      !session.color ||
      !session.phone ||
      !session.convenienceStore ||
      !session.storeName
    ) {
      throw new Error("Order session is incomplete.");
    }

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const orderNumber = await this.generateOrderNumber();

      try {
        const row = await this.db
          .prepare(
            `
            INSERT INTO orders (
              order_number,
              line_user_id,
              platform,
              external_order_id,
              customer_name,
              product_name,
              size,
              color,
              phone,
              convenience_store,
              store_name,
              status
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
            RETURNING *
            `,
          )
          .bind(
            orderNumber,
            session.lineUserId,
            session.platform,
            session.externalOrderId ?? null,
            session.customerName,
            session.productName,
            session.size,
            session.color,
            session.phone,
            session.convenienceStore,
            session.storeName,
          )
          .first<OrderRow>();

        if (!row) {
          throw new Error("Failed to create order.");
        }

        return {
          id: row.id,
          orderNumber: row.order_number,
          lineUserId: row.line_user_id,
          platform: row.platform,
          externalOrderId: row.external_order_id ?? undefined,
          customerName: row.customer_name,
          productName: row.product_name,
          size: row.size,
          color: row.color,
          phone: row.phone,
          convenienceStore: row.convenience_store,
          storeName: row.store_name,
          status: row.status,
          createdAt: row.created_at,
        };
      } catch (error) {
        if (attempt === 4) {
          throw error;
        }
      }
    }

    throw new Error("Unable to create order.");
  }
}
