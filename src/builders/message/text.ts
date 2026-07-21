import { TextMessage } from "../../types/line/message";

export function createTextMessage(text: string): TextMessage {
  return {
    type: "text",
    text,
  };
}
