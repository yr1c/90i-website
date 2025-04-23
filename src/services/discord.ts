import { ExtendedClient, loadEvents, loadCommands } from './client.ts';
import dotenv from 'dotenv';
import { GatewayIntentBits } from 'discord.js';

dotenv.config();

const client = new ExtendedClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

loadEvents(client);
loadCommands(client);

export default client;
