CREATE TABLE IF NOT EXISTS member_sessions (

  line_user_id TEXT PRIMARY KEY,

  state TEXT NOT NULL,

  email TEXT,

  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP

);

CREATE INDEX IF NOT EXISTS idx_member_sessions_state
ON member_sessions(state);

CREATE INDEX IF NOT EXISTS idx_member_sessions_email
ON member_sessions(email);