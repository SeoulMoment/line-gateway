import type { SupportSession, SupportStatus } from "../models/support";

interface SupportRow {
  line_user_id: string;
  status: SupportStatus;
}

export class SupportSessionService {
  constructor(private readonly db: D1Database) {}

  async get(lineUserId: string): Promise<SupportSession | null> {
    const row = await this.db
      .prepare(
        `
        SELECT *
        FROM support_sessions
        WHERE line_user_id = ?
      `,
      )
      .bind(lineUserId)
      .first<SupportRow>();

    if (!row) {
      return null;
    }

    return {
      lineUserId: row.line_user_id,
      status: row.status,
    };
  }

  async activate(lineUserId: string) {
    await this.db
      .prepare(
        `
        INSERT INTO support_sessions
        (line_user_id,status)

        VALUES(?,?)

        ON CONFLICT(line_user_id)

        DO UPDATE SET

        status='active',
        updated_at=CURRENT_TIMESTAMP
      `,
      )
      .bind(lineUserId, "active")
      .run();
  }

  async deactivate(lineUserId: string) {
    await this.db
      .prepare(
        `
        UPDATE support_sessions
        SET
          status='inactive',
          updated_at=CURRENT_TIMESTAMP
        WHERE line_user_id=?
      `,
      )
      .bind(lineUserId)
      .run();
  }

  async isActive(lineUserId: string) {
    const session = await this.get(lineUserId);

    return session?.status === "active";
  }
}
