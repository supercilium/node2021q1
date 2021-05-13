import { Group } from '../models/group';
import { GroupCreatingInterface } from 'types';
import { logger } from '../configs';

export default class GroupService {
  async getGroupById(id: string) {
    try {
      const groupRecord = await Group.findByPk(id, { rejectOnEmpty: true });

      return groupRecord;
    } catch (e) {
      logger.debug(e);
      throw (e);
    }
  }
  async getAllGroups() {
    try {
      const groupRecord = await Group.findAll({});

      return groupRecord;
    } catch (e) {
      throw (e);
    }
  }
  async deleteGroupById(id: string) {
    try {
      const statusCode = await Group.destroy({
        where: {
          id
        }
      });

      return statusCode;
    } catch (e) {
      throw (e);
    }
  }
  async addGroup(data: GroupCreatingInterface) {
    try {
      const groupRecord = await Group.create({ ...data });
      return groupRecord;
    } catch (e) {
      throw (e);
    }
  }
  async updateGroup(id: string, data: GroupCreatingInterface) {
    try {
      const groupRecord = await Group.update({ ...data }, {
        where: {
          id
        }
      });
      return groupRecord;
    } catch (e) {
      throw (e);
    }
  }
}
