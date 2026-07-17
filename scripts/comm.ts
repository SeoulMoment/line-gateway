import "dotenv/config";

const BASE_URL = "https://api.line.me/v2/bot";

const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;

if (!token) {
  throw new Error("LINE_CHANNEL_ACCESS_TOKEN is missing.");
}

export async function lineApi(path: string, options: RequestInit = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`LINE API Error ${response.status}\n${text}`);
  }

  return text ? JSON.parse(text) : null;
}
