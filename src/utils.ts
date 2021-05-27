import { NextFunction } from 'express';

export const tryCatchWrapper = async (cb: () => Promise<void>, next: NextFunction) => {
  try {
    await cb();
  } catch (e) {
    next(e);
  }
};
