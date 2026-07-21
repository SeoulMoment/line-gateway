import { createNewArrivalMenuFlex } from "../builders/flex/newArrivalMenu";
import { CommandContext } from "../context/commandContext";

export async function newArrivalCommand(
  context: CommandContext,
): Promise<void> {
  const { line, replyToken } = context;

  await line.reply(replyToken, [createNewArrivalMenuFlex()]);
}
