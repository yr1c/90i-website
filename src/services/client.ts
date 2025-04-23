import { Client, Collection } from 'discord.js';
import fs from 'fs';
import path from 'path';

export class ExtendedClient extends Client {
  public commands: Collection<string, any> = new Collection();
  public slashCommands: Array<any> = [];
}

export const loadEvents = (client: ExtendedClient) => {
  const eventsPath = path.join(__dirname, 'events');
  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.ts'));

  for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.default.once) {
      client.once(event.default.name, (...args) => event.default.execute(...args));
    } else {
      client.on(event.default.name, (...args) => event.default.execute(...args));
    }
  }
};

export const loadCommands = (client: ExtendedClient) => {
  const commandsPath = path.join(__dirname, 'commands');

  if (!fs.existsSync(commandsPath)) {
    console.error(`O diretório de comandos não foi encontrado: ${commandsPath}`);
    return;
  }

  fs.readdirSync(commandsPath).forEach(dir => {
    const dirPath = path.join(commandsPath, dir);

    if (!fs.lstatSync(dirPath).isDirectory()) return;

    fs.readdirSync(dirPath).forEach(subdir => {
      const subdirPath = path.join(dirPath, subdir);

      if (fs.lstatSync(subdirPath).isDirectory()) {
        const commandFiles = fs.readdirSync(subdirPath).filter(file => file.endsWith('.ts'));

        commandFiles.forEach(async file => {
          const command = await import(`./commands/${dir}/${subdir}/${file}`);

          if (dir === 'prefix') {
            const cmd = command.default;
            if (cmd.aliases) {
              cmd.aliases.forEach((alias: string) => {
                client.commands.set(alias, cmd);
              });
            }
            client.commands.set(cmd.name, cmd);
          } else {
            console.error(`O diretório de comandos nao eh valido: ${subdirPath}`);
          }
        });
      }
    });
  });
};
