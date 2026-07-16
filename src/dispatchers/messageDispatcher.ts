import { LineService } from "../services/line";
import { textHandler } from "../handlers/textHandler";

export async function dispatchMessage(event: any, line: LineService) {
  switch (event.type) {
    case "message":
      if (event.message.type === "text") {
        await textHandler(event, line);
      }

      break;

    case "follow":
      console.log("Follow");
      break;

    case "postback":
      console.log("Postback");
      break;
  }
}
