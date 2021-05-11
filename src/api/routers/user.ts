import { Router } from 'express';
import { ParamsWithFilter, ParamsWithId, UserCreationAttributes, UserRequestSchema } from '../../types';
import { ValidatedRequest } from 'express-joi-validation';
import { userBodyValidator } from '../middlewares/validation';
import UserService from '../../services/user';

export const usersRouter = Router();

const userService = new UserService();

usersRouter.get<null, any, any, ParamsWithFilter>('/filter', async (req, res) => {
  try {
    const { filter, limit } = req.query;
    const users = await userService.getAutoSuggestUsers(filter, Number(limit));

    res.send(users)
  } catch (e) {
    res.sendStatus(500);
  }
});

usersRouter.get<ParamsWithId>('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    res.send(user);
  } catch (e) {
    res.sendStatus(500);
  }
});

usersRouter.delete<ParamsWithId>('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.deleteUserById(id);

    res.send(user);
  } catch (e) {
    res.sendStatus(500);
  }
});

usersRouter.post<null, any, UserCreationAttributes>(
  '/',
  userBodyValidator,
  async (req: ValidatedRequest<UserRequestSchema>, res) => {
    try {
      const { body } = req;

      const user = await userService.addUser(body)
      res.send(user);
    } catch (e) {
      res.status(500);
    }
  });

usersRouter.put<null, any, UserCreationAttributes>(
  '/',
  userBodyValidator,
  async (req: ValidatedRequest<UserRequestSchema>, res) => {
    try {
      const { body } = req;

      const user = await userService.addUser(body)
      res.send(user);
    } catch (e) {
      res.status(500);
    }
  });
