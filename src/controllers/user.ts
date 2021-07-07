import { RequestHandler } from 'express';
import { ParamsWithFilter, ParamsWithId } from '../types';
import UserService from '../services/user';
import { tryCatchWrapper } from '../utils';

export const userService = new UserService();

export const getFilteredUsersController: RequestHandler<null, any, any, ParamsWithFilter> = async (req, res, next) => {
  await tryCatchWrapper(async () => {
    const { filter, limit } = req.query;
    const users = await userService.getAutoSuggestUsers(filter, Number(limit));

    res.send(users);
  }, next);
};

export const getUserController: RequestHandler<ParamsWithId, any, any, null> =  async (req, res, next) => {
  await tryCatchWrapper(async () => {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    res.send(user);
  }, next);
};

export const deleteUserController: RequestHandler<ParamsWithId, any, any, null> =  async (req, res, next) => {
  await tryCatchWrapper(async () => {
    const { id } = req.params;
    const user = await userService.deleteUserById(id);

    res.send(user);
  }, next);
};

