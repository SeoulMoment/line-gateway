import { COMMANDS } from "../constants/commands";

import { brandCommand } from "../commands/brand";
import { greetingCommand } from "../commands/greeting";
import { unknownCommand } from "../commands/unknown";

import { LineService } from "../services/line";

type CommandHandler = (replyToken: string, line: LineService) => Promise<void>;

interface CommandDefinition {
  aliases: readonly string[];
  handler: CommandHandler;
}

const commandDefinitions: CommandDefinition[] = [
  {
    aliases: COMMANDS.greeting,
    handler: greetingCommand,
  },
  {
    aliases: COMMANDS.brand,
    handler: brandCommand,
  },
];

export async function routeCommand(
  message: string,
  replyToken: string,
  line: LineService,
): Promise<void> {
  const command = commandDefinitions.find((command) =>
    command.aliases.includes(message),
  );

  if (!command) {
    await unknownCommand(replyToken, line);
    return;
  }

  await command.handler(replyToken, line);
}
