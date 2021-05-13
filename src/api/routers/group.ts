import { Router } from 'express';
import { ParamsWithId, GroupCreatingInterface, GroupRequestSchema } from '../../types';
import { ValidatedRequest } from 'express-joi-validation';
import { groupBodyValidator } from '../middlewares/validation';
import GroupService from '../../services/group';

export const groupRouter = Router();

const groupService = new GroupService();

groupRouter.get<ParamsWithId>('/all', async (_req, res, next) => {
  try {
    const groups = await groupService.getAllGroups();

    res.send(groups);
  } catch (e) {
    return next(e);
  }
});

groupRouter.get<ParamsWithId>('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const group = await groupService.getGroupById(id);

    res.send(group);
  } catch (e) {
    return next(e);
  }
});

groupRouter.delete<ParamsWithId>('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const group = await groupService.deleteGroupById(id);

    res.send({ deletedRows: group });
  } catch (e) {
    return next(e);
  }
});

groupRouter.post<null, any, GroupCreatingInterface>(
  '/:id',
  groupBodyValidator,
  async (req: ValidatedRequest<GroupRequestSchema>, res, next) => {
    try {
      const { body } = req;
      const { id } = req.params;

      const group = await groupService.updateGroup(id, body);

      res.send(group);
    } catch (e) {
      return next(e);
    }
  }
);

groupRouter.put<null, any, GroupCreatingInterface>(
  '/',
  groupBodyValidator,
  async (req: ValidatedRequest<GroupRequestSchema>, res, next) => {
    try {
      const { body } = req;

      const group = await groupService.addGroup(body);

      res.send(group);
    } catch (e) {
      return next(e);
    }
  }
);
