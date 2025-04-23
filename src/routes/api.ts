import { Router } from 'express';
import axios from 'axios';
import memoryCache from 'memory-cache';
import { promises as fs } from 'fs';
import path from 'path';

const router = Router();
const usersFilePath = path.join(__dirname, '../jsons/users.json');

interface User {
  id: string;
}

interface UsersData {
  users: User[];
}

const readUsersData = async (): Promise<UsersData> => {
  try {
    const data = await fs.readFile(usersFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler arquivo de usuários:', error);
    return { users: [] };
  }
};

router.get('/profiles', async (req, res) => {
  try {
    const usersData = await readUsersData();
    const userProfiles = await Promise.all(
      usersData.users.map(async user => {
        const profile = await fetchDiscordProfile(user.id);
        return profile;
      })
    );

    const validProfiles = userProfiles.filter(profile => profile !== null);
    res.json(validProfiles);
  } catch (error) {
    console.error('Erro ao buscar perfis:', error);
    res.status(500).send('Erro interno ao buscar os perfis.');
  }
});

const fetchDiscordProfile = async (userId: string): Promise<any> => {
  const url = `https://discord.com/api/v10/users/${userId}/profile`;

  try {
    const axiosResponse = await axios.get(url, {
      headers: {
        Authorization: process.env.API_KEY,
      },
    });
    return axiosResponse.data;
  } catch (error) {
    console.error(`Erro ao buscar perfil do Discord para usuário ${userId}:`, error);
    return null;
  }
};

export default router;
