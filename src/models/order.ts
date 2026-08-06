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

export interface OrderForm {
  platform?: OrderPlatform;

  // Shopee 주문인 경우 사용
  externalOrderId?: string;

  customerName?: string;
  productName?: string;
  size?: string;
  color?: string;
  phone?: string;
  convenienceStore?: string;
  storeName?: string;
}

export interface OrderSession extends OrderForm {
  lineUserId: string;
  platform: OrderPlatform;
  step: OrderStep;
}
