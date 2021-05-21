import { Router } from 'express';
import { tryCatchWrapper } from '../../utils';
import UserGroupService from '../../services/userGroup';

export const userGroupRouter = Router();

const userGroupService = new UserGroupService();

userGroupRouter.put<null, any, { groupId: string; userIds: string[] }>(
  '/',
  async (req, res, next) => {
    await tryCatchWrapper(async () => {
      const { body } = req;

      const data = await userGroupService.addUsersToGroup(body.groupId, body.userIds);
      res.send(data);
    }, next);
  });
