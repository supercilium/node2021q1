import { Router } from 'express';
import { ParamsWithId, GroupCreatingInterface, GroupRequestSchema } from '../../types';
import { ValidatedRequest } from 'express-joi-validation';
import { groupBodyValidator } from '../middlewares/validation';
import GroupService from '../../services/group';

export const groupRouter = Router();

const groupService = new GroupService();

groupRouter.get<ParamsWithId>('/all', async (req, res) => {
  try {
    const groups = await groupService.getAllGroups();

    res.send(groups);
  } catch (e) {
    res.sendStatus(500);
  }
});

groupRouter.get<ParamsWithId>('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const group = await groupService.getGroupById(id);

    res.send(group);
  } catch (e) {
    res.sendStatus(500);
  }
});

groupRouter.delete<ParamsWithId>('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const group = await groupService.deleteGroupById(id);

    res.send({ deletedRows: group});
  } catch (e) {
    res.sendStatus(500);
  }
});

groupRouter.post<null, any, GroupCreatingInterface>(
  '/:id',
  groupBodyValidator,
  async (req: ValidatedRequest<GroupRequestSchema>, res) => {
    try {
      const { body } = req;
      const { id } = req.params;

      const user = await groupService.updateGroup(id, body)
      res.send(user);
    } catch (e) {
      res.status(500);
    }
  }
);

groupRouter.put<null, any, GroupCreatingInterface>(
  '/',
  groupBodyValidator,
  async (req: ValidatedRequest<GroupRequestSchema>, res) => {
    try {
      const { body } = req;

      const user = await groupService.addGroup(body)
      res.send(user);
    } catch (e) {
      res.status(500);
    }
  }
);
