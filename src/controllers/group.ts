import { RequestHandler } from 'express';
import { tryCatchWrapper } from '../utils';
import { ParamsWithId } from '../types';
import GroupService from '../services/group';

export const groupService = new GroupService();

export const getAllGroupsController: RequestHandler<null, any, any, null> = async (_req, res, next) => {
  await tryCatchWrapper(async () => {
    const groups = await groupService.getAllGroups();
    res.send(groups);
  }, next);
};

export const getGroupController: RequestHandler<ParamsWithId, any, any, null> =  async (req, res, next) => {
  await tryCatchWrapper(async () => {
    const { id } = req.params;
    const group = await groupService.getGroupById(id);

    res.send(group);
  }, next);
};
