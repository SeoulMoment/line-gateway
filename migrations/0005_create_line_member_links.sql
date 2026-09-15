CREATE TABLE IF NOT EXISTS line_member_links (
  line_user_id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  email TEXT NOT NULL,
  nickname TEXT,
  verified_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_line_member_links_user_id
ON line_member_links(user_id);

CREATE INDEX IF NOT EXISTS idx_line_member_links_email
ON line_member_links(email);