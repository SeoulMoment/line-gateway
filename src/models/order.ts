export type OrderPlatform = "seoulmoment" | "shopee" | "other";

export interface OrderForm {
  platform?: OrderPlatform;

  /**
   * other 선택 시 실제 플랫폼 이름
   */
  platformName?: string;

  /**
   * Shopee / 기타 외부 플랫폼 주문번호
   */
  externalOrderId?: string;

  customerName?: string;

  productName?: string;

  size?: string;

  color?: string;

  phone?: string;

  convenienceStore?: string;

  storeName?: string;
}
