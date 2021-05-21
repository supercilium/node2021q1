import { sequelize } from '../configs/sequalize';
import { User, Group } from '../models';
import { Op } from 'sequelize';

export default class UserGroupService {
  async addUsersToGroup(groupId: string, userIds: string[]) {
    try {
      const result = await sequelize.transaction(async (t) => {
        const group = await Group.findOne({
          where: {
            id: groupId
          },
          transaction: t
        });

        const users = await User.findAll({
          where: {
            id: {
              [Op.in]: userIds
            }
          },
          transaction: t
        });

        await group.setUsers(users, { transaction: t });

        return group;
      });

      // const group = await Group.findOne({
      //   where: {
      //     id: groupId,
      //   },
      //   include: [
      //     {
      //       association: 'users',
      //       through: {
      //         attributes: []
      //       }
      //     }
      //   ]
      // })

      // return group;
      return result.getUsers({ joinTableAttributes: [] });
    } catch (e) {
      throw ({ service: 'SERVICE: deleteGroupById', parameters: { groupId, userIds }, ...e });
    }
  }
}
