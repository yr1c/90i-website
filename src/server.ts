import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import path from 'path';
import indexRoutes from './routes/index';
import apiRoutes from './routes/api';
import client from './services/discord';

client
  .login(process.env.BOT_TOKEN)
  .then(() => {
    const app = express();

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
    app.use(express.static(path.join(__dirname, '../public')));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/', indexRoutes);
    app.use('/api/', apiRoutes);

    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(
        '\x1b[37m[\x1b[32mShard\x1b[37m, \x1b[32mServer\x1b[37m]\x1b[37m - Running on: \x1b[36m' +
          `http://localhost${PORT}\x1b[37m!`
      );
    });
  })
  .catch(error => {
    console.error('Erro ao fazer login no Discord:', error);
  });
