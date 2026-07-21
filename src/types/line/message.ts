export interface TextMessage {
  type: "text";
  text: string;
}

export interface ImageMessage {
  type: "image";
  originalContentUrl: string;
  previewImageUrl: string;
}

export interface StickerMessage {
  type: "sticker";
  packageId: string;
  stickerId: string;
}
