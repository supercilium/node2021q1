import { Router } from 'express';
import { ParamsWithId, GroupCreatingInterface, GroupRequestSchema } from '../../types';
import { ValidatedRequest } from 'express-joi-validation';
import { groupBodyValidator } from '../middlewares/validation';
import GroupService from '../../services/group';
import { tryCatchWrapper } from '../../utils';

export const groupRouter = Router();

const groupService = new GroupService();

groupRouter.get<ParamsWithId>('/all', async (_req, res, next) => {
  await tryCatchWrapper(async () => {
    const groups = await groupService.getAllGroups();
    res.send(groups);
  }, next);
});

groupRouter.get<ParamsWithId>('/:id', async (req, res, next) => {
  await tryCatchWrapper(async () => {
    const { id } = req.params;
    const group = await groupService.getGroupById(id);

    res.send(group);
  }, next);
});

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
