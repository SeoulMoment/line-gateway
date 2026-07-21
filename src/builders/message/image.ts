import { ImageMessage } from "../../types/line";

export function createImageMessage(
  originalContentUrl: string,
  previewImageUrl: string,
): ImageMessage {
  return {
    type: "image",
    originalContentUrl,
    previewImageUrl,
  };
}
