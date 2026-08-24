export const SUPPORT_CATEGORY = {
  ORDER: "📦 訂單問題",
  DELIVERY: "🚚 配送問題",
  PAYMENT: "💳 付款問題",
  PRODUCT: "🛍 商品問題",
  OTHER: "💬 其他問題",
} as const;

export const SUPPORT_POSTBACK = {
  START: "support:start",
  END: "support:end",
  CONTINUE: "support:continue",
  CONFIRM_END: "support:confirm-end",

  CATEGORY: {
    PRODUCT: "support:category:product",
    ORDER: "support:category:order",
    DELIVERY: "support:category:delivery",
    PAYMENT: "support:category:payment",
    OTHER: "support:category:other",
  },
} as const;
