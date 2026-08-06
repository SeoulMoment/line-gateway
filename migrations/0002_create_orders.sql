CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  order_number TEXT NOT NULL UNIQUE,

  line_user_id TEXT NOT NULL,

  platform TEXT NOT NULL
    CHECK (platform IN ('line', 'shopee')),

  external_order_id TEXT,

  customer_name TEXT NOT NULL,
  product_name TEXT NOT NULL,
  size TEXT NOT NULL,
  color TEXT NOT NULL,
  phone TEXT NOT NULL,

  convenience_store TEXT NOT NULL
    CHECK (
      convenience_store IN (
        '7-ELEVEN',
        '全家 FamilyMart'
      )
    ),

  store_name TEXT NOT NULL,

  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (
      status IN (
        'pending',
        'confirmed',
        'preparing',
        'shipped',
        'completed',
        'cancelled'
      )
    ),

  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_orders_line_user_id
ON orders(line_user_id);

CREATE INDEX IF NOT EXISTS idx_orders_created_at
ON orders(created_at);

CREATE INDEX IF NOT EXISTS idx_orders_status
ON orders(status);