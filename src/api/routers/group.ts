import { Router } from 'express';
import { ParamsWithId, GroupCreatingInterface, GroupRequestSchema } from '../../types';
import { ValidatedRequest } from 'express-joi-validation';
import { groupBodyValidator } from '../middlewares/validation';
import { tryCatchWrapper } from '../../utils';
import { groupService, getAllGroupsController, getGroupController } from '../../controllers/group';

export const groupRouter = Router();

groupRouter.get('/all', getAllGroupsController);

groupRouter.get<ParamsWithId>('/:id', getGroupController);

groupRouter.delete<ParamsWithId>('/:id', async (req, res, next) => {
  await tryCatchWrapper(async () => {
    const { id } = req.params;
    const group = await groupService.deleteGroupById(id);

    res.send({ deletedRows: group });
  }, next);
});

groupRouter.post<null, any, GroupCreatingInterface>(
  '/:id',
  groupBodyValidator,
  async (req: ValidatedRequest<GroupRequestSchema>, res, next) => {
    await tryCatchWrapper(async () => {
      const { body } = req;
      const { id } = req.params;

      const group = await groupService.updateGroup(id, body);

      res.send(group);
    }, next);
  }
);

groupRouter.put<null, any, GroupCreatingInterface>(
  '/',
  groupBodyValidator,
  async (req: ValidatedRequest<GroupRequestSchema>, res, next) => {
    await tryCatchWrapper(async () => {
      const { body } = req;

      const group = await groupService.addGroup(body);

      res.send(group);
    }, next);
  }
);
