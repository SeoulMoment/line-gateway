// import "dotenv/config";
import dotenv from "dotenv";

dotenv.config({
  path: ".dev.vars",
});

import { LineService } from "../src/services/line";

async function main() {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN!;

  const line = new LineService(token);

  const richMenu = await line.createRichMenu({
    size: {
      width: 2500,
      height: 1686,
    },
    selected: true,
    name: "Seoul Moment Main Menu",
    chatBarText: "選單",
    areas: [
      {
        bounds: {
          x: 0,
          y: 0,
          width: 833,
          height: 843,
        },
        action: {
          type: "postback",
          data: "brand",
          displayText: "品牌館",
        },
      },
      {
        bounds: {
          x: 833,
          y: 0,
          width: 834,
          height: 843,
        },
        action: {
          type: "postback",
          data: "new",
          displayText: "新品",
        },
      },
      {
        bounds: {
          x: 1667,
          y: 0,
          width: 833,
          height: 843,
        },
        action: {
          type: "postback",
          data: "best",
          displayText: "熱銷",
        },
      },
      {
        bounds: {
          x: 0,
          y: 843,
          width: 833,
          height: 843,
        },
        action: {
          type: "postback",
          data: "order",
          displayText: "訂單",
        },
      },
      {
        bounds: {
          x: 833,
          y: 843,
          width: 834,
          height: 843,
        },
        action: {
          type: "postback",
          data: "delivery",
          displayText: "配送",
        },
      },
      {
        bounds: {
          x: 1667,
          y: 843,
          width: 833,
          height: 843,
        },
        action: {
          type: "postback",
          data: "support",
          displayText: "客服",
        },
      },
    ],
  });

  console.log("Rich Menu Created");
  console.log(richMenu);
  console.log(process.env.LINE_CHANNEL_ACCESS_TOKEN);
}

main().catch(console.error);
