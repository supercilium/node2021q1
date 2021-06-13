import { logger } from '../../configs';
import { Router } from 'express';
import jwt from 'jsonwebtoken';

export const loginRoute = Router();

interface LoginParams {
  username: string;
  password: string;
}

const users: Record<string, { password: string }> = {
  marusel: {
    password: 'qwerty123'
  }
};

loginRoute.post<LoginParams>('/', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password || users[username].password !== password) {
    logger.error('401 - Unauthorized Error', { username });
    return res.status(401).send('Unauthorized Error');
  }

  const payload = { username };

  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFE });
  res.send(token);
});

