import { brandCommand } from "../commands/brand";
import { greetingCommand } from "../commands/greeting";
import { unknownCommand } from "../commands/unknown";
import { COMMANDS } from "../constants/commands";
import { CommandContext } from "../context/commandContext";
import { LineService } from "../services/line";
import { MessageEvent } from "../types/line/webhook";

type CommandHandler = (context: CommandContext) => Promise<void>;

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
  event: MessageEvent,
  line: LineService,
): Promise<void> {
  const message = event.message.text.trim();

  const command = commandDefinitions.find((command) =>
    command.aliases.includes(message),
  );

  const context: CommandContext = {
    line,
    replyToken: event.replyToken,
  };

  if (!command) {
    await unknownCommand(context);
    return;
  }

  await command.handler(context);
}
