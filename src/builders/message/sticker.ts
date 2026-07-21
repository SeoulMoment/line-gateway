import { StickerMessage } from "../../types/line";

export function createStickerMessage(
  packageId: string,
  stickerId: string,
): StickerMessage {
  return {
    type: "sticker",
    packageId,
    stickerId,
  };
}
