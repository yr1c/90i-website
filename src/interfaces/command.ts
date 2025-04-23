import { Client, Message } from 'discord.js';

export interface Command {
  data: {
    name: string;
  };
  execute(client: Client, message: Message, args: string[]): Promise<void>;
}
