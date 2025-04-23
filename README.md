
# Meu Site Pessoal com Discord Bot

Este é um site criado usando **TypeScript**, **Express**, **EJS**, e **JavaScript**. O objetivo é permitir que os usuários criem um site pessoal para eles e seus amigos, onde é possível adicionar ou remover pessoas através de um bot do Discord.

## Tecnologias Usadas
- **TypeScript**
- **Express**
- **EJS**
- **JavaScript**
- **Discord Bot**

## Funcionalidades
- Criação de um site pessoal.
- Adicionar e remover pessoas através de um bot do Discord.
- Interface amigável para personalização e controle do site.

## Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/crynew/DiscordWebsite-Friends.git
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente no arquivo `.env`:
   - **API_KEY**: Token da sua conta para pegar as informações.
   - **BOT_TOKEN**: Token do seu bot do Discord.
   - **BOT_PREFIX**: Prefixo para o bot (ex: `!`).

   Exemplo de arquivo `.env`:
   ```
   API_KEY=// seu_token_aqui
   BOT_TOKEN=// token_do_seu_bot_aqui
   BOT_PREFIX=// prefixo_do_seu_bot_aqui
   ```

4. Inicie o servidor:
   ```bash
   npx ts-node src/server.ts
   ```

5. Acesse o site localmente em [http://localhost:3000](http://localhost:3000).

## Configuração do Bot no Discord
- Crie um bot no [Discord Developer Portal](https://discord.com/developers/applications).
- Copie o **BOT_TOKEN** e adicione-o no seu arquivo `.env`.

## Como Usar
- Após a inicialização do servidor, o bot estará pronto para adicionar ou remover pessoas no seu site via comandos no Discord.
- Use os comandos do bot com o prefixo configurado (`BOT_PREFIX`) para gerenciar os usuários no seu site.

## Licença
Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
