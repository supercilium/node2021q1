import 'reflect-metadata'; // We need this in order to use @Decorators
import express, { urlencoded, json } from 'express';

import { usersRouter, groupRouter, userGroupRouter } from './api/routers';
import { sequelize } from './configs/sequalize';
import { loggerMiddleware, logErrorMiddleware, clientErrorHandler } from './api/middlewares/logger';
import { logger } from './configs';

const port = process.env.PORT || 3001;

const startServer = async () => {
  const app = express();
  app.use(urlencoded());
  app.use(json());
  app.use(loggerMiddleware);
  app.use('/group', groupRouter);
  app.use('/user', usersRouter);
  app.use('/user-group', userGroupRouter);

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    (err as any).status = 404;
    next(err);
  });
  app.use(logErrorMiddleware);
  app.use(clientErrorHandler);

  try {
    await sequelize.authenticate();
    sequelize.sync();
    logger.info('Connection has been established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database: ', error);
  }
  app.listen(port, () => {
    logger.info(`Example app listening at http://localhost:${port}`);
  });
};

// Unhandled promiserejection
process.on('unhandledRejection', (err) => {
  logger.error('unhandledRejection', err);
});
process.on('uncaughtException', (err) => {
  logger.error('unhandledRejection', err);
});

startServer();
