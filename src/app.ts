import 'reflect-metadata'; // We need this in order to use @Decorators
import express, { urlencoded, json } from 'express';

import { usersRouter, groupRouter } from './api/routers';
import { sequelize } from './configs/sequalize';

const port = process.env.PORT || 3001;

const startServer = async () => {
  const app = express();
  app.use(urlencoded());
  app.use(json());
  app.use('/group', groupRouter);
  app.use('/user', usersRouter);

  try {
    await sequelize.authenticate();
    sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}

startServer();
