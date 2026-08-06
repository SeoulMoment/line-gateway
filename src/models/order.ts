export type OrderPlatform = "line" | "shopee";

export type OrderStep =
  | "externalOrderId"
  | "customerName"
  | "productName"
  | "size"
  | "color"
  | "phone"
  | "convenienceStore"
  | "storeName"
  | "confirmation";

export type OrderStatus =
  "pending" | "confirmed" | "preparing" | "shipped" | "completed" | "cancelled";

export interface OrderSession {
  lineUserId: string;
  platform: OrderPlatform;
  step: OrderStep;

  externalOrderId?: string;
  customerName?: string;
  productName?: string;
  size?: string;
  color?: string;
  phone?: string;
  convenienceStore?: string;
  storeName?: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  lineUserId: string;
  platform: OrderPlatform;

  externalOrderId?: string;

  customerName: string;
  productName: string;
  size: string;
  color: string;
  phone: string;
  convenienceStore: string;
  storeName: string;

  status: OrderStatus;
  createdAt: string;
}
