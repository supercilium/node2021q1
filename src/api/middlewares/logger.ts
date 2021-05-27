import { logger } from '../../configs';
import { Request, Response, NextFunction } from 'express';

export const loggerMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const { body, params, query, originalUrl, method } = req;
  logger.info('Request invoked 💨', method, originalUrl, { body }, { params }, { query });
  next();
};

export const logErrorMiddleware = (err: any, req: Request, _res: Response, next: NextFunction) => {
  if (err) {
    const { body, params, query, originalUrl, method } = req;
    logger.error(`${err.message || '🔥 Error 🔥'}${err.service ? ` | ${err.service}` : ''}`, method, originalUrl, { body }, { params }, { query }, err);
    return next(err);
  }
  next();
};

export const clientErrorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err.name === 'SequelizeEmptyResultError') {
    return res.status(404).send('Not Found');
  }
  if (err.status) {
    return res.status(err.status).send(err.message);
  }
  res.status(500).send('Internal Server Error');
};
