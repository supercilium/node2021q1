import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../../configs';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token'];

  if (token && typeof token === 'string') {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, _decoded) => {
      if (err) {
        logger.error('403 - Forbidden Error', err);
        res.status(403).send('Forbidden Error');
      } else {
        return next();
      }
    });
  } else {
    logger.error('401 - Unauthorized Error');
    res.status(401).send('Unauthorized Error');
  }
};
