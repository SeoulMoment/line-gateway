import { LineService } from "../src/services/line";

async function main() {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN!;
  const line = new LineService(token);
  const bot = await line.getBotInfo();

  console.log("bot response : ", bot);
}

main().catch(console.error);
