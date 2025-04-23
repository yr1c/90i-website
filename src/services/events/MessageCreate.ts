import { Message } from 'discord.js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { Command } from '../../interfaces/command'; 
import { ExtendedClient } from '../client';

dotenv.config();

export default {
  name: 'messageCreate',
  async execute(message: Message) {
    const prefix = process.env.BOT_PREFIX;

    if (!message.content.startsWith(prefix!) || message.author.bot) return;

    const client = message.client as ExtendedClient;

    const args = message.content.slice(prefix!.length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();

    const commandFiles = fs
      .readdirSync(path.join(__dirname, '../commands'))
      .filter(file => file.endsWith('.ts'));

    for (const file of commandFiles) {
      const command: Command = require(path.join(__dirname, '../commands', file)).default;

      if (!command.data || !command.data.name) {
        console.error(`Comando inválido em: ${file}`);
        continue;
      }

      if (commandName === command.data.name) {
        try {
          await command.execute(client, message, args);
        } catch (error) {
          console.error(error);
          message.reply('Houve um erro ao executar esse comando!');
        }
      }
    }
  },
};
