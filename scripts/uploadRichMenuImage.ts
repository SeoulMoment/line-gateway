import dotenv from "dotenv";

dotenv.config({
  path: ".dev.vars",
});

import { readFile } from "node:fs/promises";

import { LineService } from "../src/services/line";

async function main() {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN!;
  const richMenuId = process.env.LINE_RICH_MENU_ID!;

  const image = await readFile("./assets/richmenu.png");

  const line = new LineService(token);

  await line.uploadRichMenuImage(
    richMenuId,
    image.buffer.slice(image.byteOffset, image.byteOffset + image.byteLength),
  );

  console.log("Rich Menu image uploaded!");
}

main().catch(console.error);
