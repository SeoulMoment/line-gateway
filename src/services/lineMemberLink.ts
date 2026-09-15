export interface LineMemberLink {
  lineUserId: string;
  userId: number;
  email: string;
  nickname: string | null;
  verifiedAt: string;
  updatedAt: string;
}

interface SaveLineMemberLink {
  lineUserId: string;
  userId: number;
  email: string;
  nickname?: string | null;
}

export class LineMemberLinkService {
  constructor(private readonly db: D1Database) {}

  async get(lineUserId: string): Promise<LineMemberLink | null> {
    const result = await this.db
      .prepare(
        `
        SELECT
          line_user_id AS lineUserId,
          user_id AS userId,
          email,
          nickname,
          verified_at AS verifiedAt,
          updated_at AS updatedAt
        FROM line_member_links
        WHERE line_user_id = ?
        LIMIT 1
        `,
      )
      .bind(lineUserId)
      .first<LineMemberLink>();

    return result ?? null;
  }

  async save(data: SaveLineMemberLink): Promise<void> {
    await this.db
      .prepare(
        `
        INSERT INTO line_member_links (
          line_user_id,
          user_id,
          email,
          nickname,
          verified_at,
          updated_at
        )
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        ON CONFLICT(line_user_id) DO UPDATE SET
          user_id = excluded.user_id,
          email = excluded.email,
          nickname = excluded.nickname,
          verified_at = CURRENT_TIMESTAMP,
          updated_at = CURRENT_TIMESTAMP
        `,
      )
      .bind(data.lineUserId, data.userId, data.email, data.nickname ?? null)
      .run();
  }

  async remove(lineUserId: string): Promise<void> {
    await this.db
      .prepare(
        `
        DELETE FROM line_member_links
        WHERE line_user_id = ?
        `,
      )
      .bind(lineUserId)
      .run();
  }
}
