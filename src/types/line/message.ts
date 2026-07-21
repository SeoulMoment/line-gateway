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

export interface FlexMessage {
  type: "flex";
  altText: string;
  contents: Record<string, unknown>;
}

/**
 * LINE에서 보낼 수 있는 모든 Message
 */
export type LineMessage =
  TextMessage | ImageMessage | StickerMessage | FlexMessage;

/**
 * 프로젝트 내부에서 Message라고도 사용할 수 있도록 alias
 */
export type Message = LineMessage;
