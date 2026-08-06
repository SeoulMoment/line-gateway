CREATE TABLE IF NOT EXISTS order_sessions (
  line_user_id TEXT PRIMARY KEY,

  platform TEXT NOT NULL,
  step TEXT NOT NULL,

  external_order_id TEXT,
  customer_name TEXT,
  product_name TEXT,
  size TEXT,
  color TEXT,
  phone TEXT,
  convenience_store TEXT,
  store_name TEXT,

  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);