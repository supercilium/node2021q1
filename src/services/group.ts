import { Group } from '../models/group';
import { GroupCreatingInterface } from 'types';

export default class GroupService {
  public async getGroupById(id: string) {
    try {
      const groupRecord = await Group.findOne({
        where: {
          id: id,
        },
      });

      return groupRecord;
    } catch (e) {
      throw (e);
    }
  }
  public async getAllGroups() {
    try {
      const groupRecord = await Group.findAll({});

      return groupRecord;
    } catch (e) {
      throw (e);
    }
  }
  public async deleteGroupById(id: string) {
    try {
      const statusCode = await Group.destroy({
        where: {
          id: id,
        },
      });

      return statusCode;
    } catch (e) {
      throw (e);
    }
  }
  public async addGroup(data: GroupCreatingInterface) {
    try {
      const groupRecord = await Group.create({ ...data });
      return groupRecord;
    } catch (e) {
      throw (e);
    }
  }
  public async updateGroup(id: string, data: GroupCreatingInterface) {
    try {
      const groupRecord = await Group.update({ ...data }, {
        where: {
          id: id
        }
      });
      return groupRecord;
    } catch (e) {
      throw (e);
    }
  }

}
