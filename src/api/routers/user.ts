import { Router } from 'express';
import { ParamsWithFilter, ParamsWithId, UserCreationAttributes, UserRequestSchema } from '../../types';
import { ValidatedRequest } from 'express-joi-validation';
import { userBodyValidator } from '../middlewares/validation';
import { tryCatchWrapper } from '../../utils';
import { userService, deleteUserController, getFilteredUsersController, getUserController } from '../../controllers/user';

export const usersRouter = Router();

usersRouter.get<null, any, any, ParamsWithFilter>('/filter', getFilteredUsersController);

usersRouter.get<ParamsWithId>('/:id', getUserController);

usersRouter.delete<ParamsWithId>('/:id', deleteUserController);

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
