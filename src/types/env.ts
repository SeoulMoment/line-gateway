export interface Env {
  line_gateway_db: D1Database;

  LINE_CHANNEL_ACCESS_TOKEN: string;
  LINE_CHANNEL_SECRET: string;
  LINE_RICH_MENU_ID: string;

  BACKEND_API_URL: string;
  BACKEND_JWT: string;

  RESEND_API_KEY: string;
}
