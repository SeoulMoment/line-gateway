import { BRANDS } from "../../data/brands";
import { createBrandBubble } from "../components/brandBubble";

import type { FlexMessage } from "../../types/line";

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
