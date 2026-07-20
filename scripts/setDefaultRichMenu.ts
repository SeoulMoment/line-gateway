import dotenv from "dotenv";

dotenv.config({
  path: ".dev.vars",
});

import { LineService } from "../src/services/line";

async function main() {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN!;
  const richMenuId = process.env.LINE_RICH_MENU_ID!;

  const line = new LineService(token);

  await line.setDefaultRichMenu(richMenuId);

  console.log("Default Rich Menu set!");
}

main().catch(console.error);
