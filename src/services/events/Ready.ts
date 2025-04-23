import { ExtendedClient } from '../client';

export default {
  name: 'ready',
  once: true,
  async execute(client: ExtendedClient) {
    console.log(
      '\x1b[37m[\x1b[32mShard\x1b[37m, \x1b[32mClient\x1b[37m]\x1b[37m - Logged in as: \x1b[36m' +
        `${client.user?.tag}\x1b[37m!`
    );
  },
};
