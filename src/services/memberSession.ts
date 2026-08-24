import type { MemberState } from "../constants/member";
import type { MemberSession } from "../models/member";

interface MemberRow {
  line_user_id: string;
  state: MemberState;
  email: string | null;
}

interface UpdateMemberSession {
  lineUserId: string;
  state: MemberState;
  email?: string | null;
}

export class MemberSessionService {
  constructor(private readonly db: D1Database) {}

  async get(lineUserId: string): Promise<MemberSession | null> {
    const row = await this.db
      .prepare(
        `
        SELECT *
        FROM member_sessions
        WHERE line_user_id = ?
      `,
      )
      .bind(lineUserId)
      .first<MemberRow>();

    if (!row) {
      return null;
    }

    return {
      lineUserId: row.line_user_id,
      state: row.state,
      email: row.email,
    };
  }

  async update({ lineUserId, state, email = null }: UpdateMemberSession) {
    await this.db
      .prepare(
        `
        INSERT INTO member_sessions
        (
          line_user_id,
          state,
          email
        )

        VALUES (?, ?, ?)

        ON CONFLICT(line_user_id)

        DO UPDATE SET

          state = excluded.state,
          email = excluded.email,
          updated_at = CURRENT_TIMESTAMP
      `,
      )
      .bind(lineUserId, state, email)
      .run();
  }

  async clear(lineUserId: string) {
    await this.db
      .prepare(
        `
        DELETE FROM member_sessions
        WHERE line_user_id = ?
      `,
      )
      .bind(lineUserId)
      .run();
  }
}
