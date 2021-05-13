import { UserCreationAttributes } from '../types/user';
import { User } from '../models/user';
import { Op } from 'sequelize';

// import { Service } from 'typedi';

// @Service()
export default class UserService {
  // constructor(
  //   private userModel,
  //   private companyModel,
  //   private salaryModel) { }
  // constructor(private user: User) { }

  async getUserById(id: string) {
    try {
      const userRecord = await User.findByPk(id, { rejectOnEmpty: true });

      return userRecord;
    } catch (e) {
      throw ({ service: 'SERVICE: getUserById', ...e });
    }
  }
  async deleteUserById(id: string) {
    try {
      const userRecord = await User.update({ isDeleted: true }, {
        where: {
          id
        }
      });

      return userRecord;
    } catch (e) {
      throw ({ service: 'SERVICE: deleteUserById', ...e });
    }
  }
  async addUser(data: UserCreationAttributes) {
    try {
      const user = await User.create({ ...data, isDeleted: false });
      return user;
    } catch (e) {
      throw ({ service: 'SERVICE: addUser', ...e });
    }
  }
  async getAutoSuggestUsers(loginSubstring: string, limit: number) {
    try {
      const filteredUsers = await User.findAll({
        where: {
          login: {
            [Op.like]: `%${loginSubstring}%`
          }
        },
        limit,
        order: [
          ['login', 'ASC']
        ]
      });

      return filteredUsers;
    } catch (e) {
      throw ({ service: 'SERVICE: getAutoSuggestUsers', ...e });
    }
  }
}
