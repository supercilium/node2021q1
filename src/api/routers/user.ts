import { Router } from 'express';
import { ParamsWithFilter, ParamsWithId, UserCreationAttributes, UserRequestSchema } from '../../types';
import { ValidatedRequest } from 'express-joi-validation';
import { userBodyValidator } from '../middlewares/validation';
import UserService from '../../services/user';
import { tryCatchWrapper } from '../../utils';

export const usersRouter = Router();

const userService = new UserService();

usersRouter.get<null, any, any, ParamsWithFilter>('/filter', async (req, res, next) => {
  await tryCatchWrapper(async () => {
    const { filter, limit } = req.query;
    const users = await userService.getAutoSuggestUsers(filter, Number(limit));

    res.send(users);
  }, next);
});

usersRouter.get<ParamsWithId>('/:id', async (req, res, next) => {
  await tryCatchWrapper(async () => {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    res.send(user);
  }, next);
});

usersRouter.delete<ParamsWithId>('/:id', async (req, res, next) => {
  await tryCatchWrapper(async () => {
    const { id } = req.params;
    const user = await userService.deleteUserById(id);

    res.send(user);
  }, next);
});

usersRouter.post<null, any, UserCreationAttributes>(
  '/',
  userBodyValidator,
  async (req: ValidatedRequest<UserRequestSchema>, res, next) => {
    await tryCatchWrapper(async () => {
      const { body } = req;

      const user = await userService.addUser(body);

      res.send(user);
    }, next);
  });

usersRouter.put<null, any, UserCreationAttributes>(
  '/',
  userBodyValidator,
  async (req: ValidatedRequest<UserRequestSchema>, res, next) => {
    await tryCatchWrapper(async () => {
      const { body } = req;

      const user = await userService.addUser(body);

      res.send(user);
    }, next);
  });
