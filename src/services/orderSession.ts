import type { OrderPlatform, OrderSession, OrderStep } from "../models/order";

interface OrderSessionRow {
  line_user_id: string;
  platform: OrderPlatform;
  step: OrderStep;
  external_order_id: string | null;
  customer_name: string | null;
  product_name: string | null;
  size: string | null;
  color: string | null;
  phone: string | null;
  convenience_store: string | null;
  store_name: string | null;
}

export class OrderSessionService {
  constructor(private readonly db: D1Database) {}

  async create(
    lineUserId: string,
    platform: OrderPlatform,
    step: OrderStep,
  ): Promise<void> {
    await this.db
      .prepare(
        `
        INSERT INTO order_sessions (
          line_user_id,
          platform,
          step
        )
        VALUES (?, ?, ?)

        ON CONFLICT(line_user_id)
        DO UPDATE SET
          platform = excluded.platform,
          step = excluded.step,
          external_order_id = NULL,
          customer_name = NULL,
          product_name = NULL,
          size = NULL,
          color = NULL,
          phone = NULL,
          convenience_store = NULL,
          store_name = NULL,
          updated_at = CURRENT_TIMESTAMP
        `,
      )
      .bind(lineUserId, platform, step)
      .run();
  }

  async get(lineUserId: string): Promise<OrderSession | null> {
    const row = await this.db
      .prepare(
        `
        SELECT *
        FROM order_sessions
        WHERE line_user_id = ?
        `,
      )
      .bind(lineUserId)
      .first<OrderSessionRow>();

    if (!row) {
      return null;
    }

    return {
      lineUserId: row.line_user_id,
      platform: row.platform,
      step: row.step,
      externalOrderId: row.external_order_id ?? undefined,
      customerName: row.customer_name ?? undefined,
      productName: row.product_name ?? undefined,
      size: row.size ?? undefined,
      color: row.color ?? undefined,
      phone: row.phone ?? undefined,
      convenienceStore: row.convenience_store ?? undefined,
      storeName: row.store_name ?? undefined,
    };
  }

  async updateField(
    lineUserId: string,
    field: string,
    value: string,
    nextStep: OrderStep,
  ): Promise<void> {
    const allowedFields = new Set([
      "external_order_id",
      "customer_name",
      "product_name",
      "size",
      "color",
      "phone",
      "convenience_store",
      "store_name",
    ]);

    if (!allowedFields.has(field)) {
      throw new Error(`Invalid order field: ${field}`);
    }

    await this.db
      .prepare(
        `
        UPDATE order_sessions
        SET ${field} = ?,
            step = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE line_user_id = ?
        `,
      )
      .bind(value, nextStep, lineUserId)
      .run();
  }

  async delete(lineUserId: string): Promise<void> {
    await this.db
      .prepare(
        `
        DELETE FROM order_sessions
        WHERE line_user_id = ?
        `,
      )
      .bind(lineUserId)
      .run();
  }
}
