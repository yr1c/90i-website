import {
  Message,
  Client,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ButtonInteraction,
  MessageComponentInteraction,
  TextChannel,
  Collection,
  MessageCollector,
} from 'discord.js';
import path from 'path';
import https from 'https';
import { promises as fs } from 'fs';
import fsRegular from 'fs';

interface User {
  id: string;
}

interface UsersData {
  users: User[];
}

export default {
  data: {
    name: 'config',
  },
  async execute(client: Client, message: Message) {
    if (!(message.channel instanceof TextChannel)) {
      await message.reply('Este comando só pode ser usado em canais de texto.');
      return;
    }

    const usersFilePath = path.join(__dirname, '../../jsons/users.json');
    const assetsDirectory = path.join(__dirname, '../../../public/assets');

    const downloadFile = (url: string, filePath: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        https
          .get(url, response => {
            if (response.statusCode !== 200) {
              reject(new Error(`Failed to download: ${response.statusCode}`));
              return;
            }

            const writeStream = fsRegular.createWriteStream(filePath);
            response.pipe(writeStream);

            writeStream.on('finish', () => {
              writeStream.close();
              resolve();
            });

            writeStream.on('error', async (err: NodeJS.ErrnoException) => {
              try {
                await fs.unlink(filePath);
              } catch {
              }
              reject(err);
            });
          })
          .on('error', err => {
            reject(err);
          });
      });
    };

    const readUsersData = async (): Promise<UsersData> => {
      try {
        const data = await fs.readFile(usersFilePath, 'utf-8');
        return JSON.parse(data);
      } catch (error) {
        return { users: [] };
      }
    };

    const saveUsersData = async (data: UsersData): Promise<void> => {
      try {
        await fs.writeFile(usersFilePath, JSON.stringify(data, null, 2));
      } catch (error) {
        throw error;
      }
    };

    const embed = new EmbedBuilder()
      .setTitle('Configurações')
      .setDescription(
        'Clique nos botões abaixo para gerenciar usuários:'
      )
      .setColor('#2b2d31');

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId('add_user')
        .setLabel('Adicionar Usuário')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('remove_user')
        .setLabel('Remover Usuário')
        .setStyle(ButtonStyle.Danger),
      new ButtonBuilder()
        .setCustomId('list_users')
        .setLabel('Listar Usuários')
        .setStyle(ButtonStyle.Secondary)
    );

    const sentMessage = await message.reply({
      embeds: [embed],
      components: [row],
    });

    const filter = (i: MessageComponentInteraction) => i.user.id === message.author.id;

    const collector = sentMessage.createMessageComponentCollector({
      filter,
      time: 60000,
    });

    collector.on('collect', async (interaction: ButtonInteraction) => {
      if (interaction.customId === 'list_users') {
        const usersData = await readUsersData();
        const userDetails = usersData.users.map(user => `<@${user.id}> - ${user.id}`).join('\n');
        await interaction.reply({
          content: `**Usuários Adicionados:**\n${userDetails || 'Nenhum usuário adicionado.'}`,
          ephemeral: true,
        });
      } else if (interaction.customId === 'add_user' || interaction.customId === 'remove_user') {
        const action = interaction.customId === 'add_user' ? 'adicionar' : 'remover';
        await interaction.reply({
          content: `Digite o ID do usuário para ${action}:`,
          ephemeral: true,
        });

        const userFilter = (m: Message) => m.author.id === interaction.user.id;
        const userCollector = (message.channel as TextChannel).createMessageCollector({
          filter: userFilter,
          time: 30000,
          max: 1,
        });

        userCollector.on('collect', async (msg: Message) => {
          const userId = msg.content.trim();
          const usersData = await readUsersData();
          if (action === 'adicionar') {
            if (!usersData.users.find(user => user.id === userId)) {
              usersData.users.push({ id: userId });
              await saveUsersData(usersData);
              await interaction.followUp(`Usuário ${userId} adicionado com sucesso.`);
            } else {
              await interaction.followUp(`Usuário ${userId} já está na lista.`);
            }
          } else if (action === 'remover') {
            const index = usersData.users.findIndex(user => user.id === userId);
            if (index !== -1) {
              usersData.users.splice(index, 1);
              await saveUsersData(usersData);
              await interaction.followUp(`Usuário ${userId} removido com sucesso.`);
            } else {
              await interaction.followUp(`Usuário ${userId} não encontrado.`);
            }
          }
        });
      } else if (interaction.customId.startsWith('upload_')) {
        const fileType = interaction.customId.replace('upload_', '');
        await interaction.reply({
          content: `Envie o arquivo para substituir o ${fileType}.`,
          ephemeral: true,
        });

        const userFilter = (m: Message) =>
          m.author.id === interaction.user.id && m.attachments.size > 0;
        const fileCollector = (message.channel as TextChannel).createMessageCollector({
          filter: userFilter,
          time: 60000,
          max: 1,
        });

        fileCollector.on('collect', async (msg: Message) => {
          const attachment = msg.attachments.first();
          if (!attachment) {
            await interaction.followUp('Por favor, envie um arquivo válido.');
            return;
          }

          const allowedExtensions: { [key: string]: string[] } = {
            music: ['.mp3', '.wav', '.ogg'],
            background: ['.mp4'],
            logo: ['.png', '.svg'],
          };

          const fileExtension = path.extname(attachment.name).toLowerCase();

          if (!allowedExtensions[fileType]?.includes(fileExtension)) {
            await interaction.followUp(
              `Extensão de arquivo não permitida para ${fileType}. Extensões permitidas: ${allowedExtensions[
                fileType
              ].join(', ')}`
            );
            return;
          }

          const filePath = path.join(assetsDirectory, `${fileType}${fileExtension}`);

          try {
            try {
              await fs.unlink(filePath);
            } catch (err) {}

            await downloadFile(attachment.url, filePath);
            await interaction.followUp(`O arquivo ${fileType} foi substituído com sucesso!`);
          } catch (error) {
            console.error('Erro ao salvar arquivo:', error);
            await interaction.followUp(
              'Ocorreu um erro ao tentar salvar o arquivo. Verifique se o formato está correto e tente novamente.'
            );
          }
        });
      }
    });

    collector.on('end', () => {
      const disabledRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setCustomId('add_user')
          .setLabel('Adicionar Usuário')
          .setStyle(ButtonStyle.Primary)
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId('remove_user')
          .setLabel('Remover Usuário')
          .setStyle(ButtonStyle.Danger)
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId('list_users')
          .setLabel('Listar Usuários')
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(true)
      );

      sentMessage.edit({ components: [disabledRow] });
    });
  },
};
