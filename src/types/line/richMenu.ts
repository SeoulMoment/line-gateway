export interface RichMenuRequest {
  size: RichMenuSize;
  selected: boolean;
  name: string;
  chatBarText: string;
  areas: RichMenuArea[];
}

export interface CreateRichMenuResponse {
  richMenuId: string;
}

export interface RichMenuSize {
  width: number;
  height: number;
}

export interface RichMenuArea {
  bounds: RichMenuBounds;
  action: RichMenuAction;
}

export type RichMenuAction = PostbackAction | MessageAction | UriAction;

export interface PostbackAction {
  type: "postback";
  data: string;
  displayText?: string;
}

export interface MessageAction {
  type: "message";
  text: string;
}

export interface UriAction {
  type: "uri";
  uri: string;
}

export interface RichMenuBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}
