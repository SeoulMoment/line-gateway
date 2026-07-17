export interface TextMessage {
  type: "text";
  text: string;
}

export interface FlexMessage {
  type: "flex";
  altText: string;
  contents: Record<string, unknown>;
}

export type LineMessage = TextMessage | FlexMessage;
