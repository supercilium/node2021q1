import { Group } from '../models/group';
import { GroupCreatingInterface } from 'types';

export default class GroupService {
  async getGroupById(id: string) {
    try {
      const groupRecord = await Group.findByPk(id, { rejectOnEmpty: true });

      return groupRecord;
    } catch (e) {
      throw ({ service: 'SERVICE: getGroupById', parameters: { id }, ...e });
    }
  }
  async getAllGroups() {
    try {
      const groupRecord = await Group.findAll({});

      return groupRecord;
    } catch (e) {
      throw ({ service: 'SERVICE: getAllGroups', ...e });
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
      throw ({ service: 'SERVICE: deleteGroupById', parameters: { id }, ...e });
    }
  }
  async addGroup(data: GroupCreatingInterface) {
    try {
      const groupRecord = await Group.create({ ...data });
      return groupRecord;
    } catch (e) {
      throw ({ service: 'SERVICE: addGroup', parameters: { ...data }, ...e });
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
      throw ({ service: 'SERVICE: updateGroup', parameters: { ...data }, ...e });
    }
  }
}
