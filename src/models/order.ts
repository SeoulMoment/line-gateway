export type OrderPlatform = "line" | "shopee";

export interface OrderForm {
  platform?: OrderPlatform;

  // Shopee에서 이미 주문한 경우
  externalOrderId?: string;

  customerName?: string;
  productName?: string;
  size?: string;
  color?: string;
  phone?: string;

  convenienceStore?: string;
  storeName?: string;
}
