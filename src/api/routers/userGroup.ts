import { Router } from 'express';
import UserGroupService from '../../services/userGroup';

export const userGroupRouter = Router();

const userGroupService = new UserGroupService();

userGroupRouter.put<null, any, { groupId: string; userIds: string[] }>(
  '/',
  async (req, res) => {
    try {
      const { body } = req;

      const data = await userGroupService.addUsersToGroup(body.groupId, body.userIds);
      res.send(data);
    } catch (e) {
      res.status(500);
    }
  });
