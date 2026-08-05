import { BRANDS } from "../../data/brands";
import type { FlexMessage } from "../../types/line";

import { createBrandBubble } from "../components/brandBubble";

export function createBrandMenuFlex(): FlexMessage {
  return {
    type: "flex",
    altText: "品牌館",

    contents: {
      type: "carousel",
      contents: BRANDS.map(createBrandBubble),
    },
  };
}
