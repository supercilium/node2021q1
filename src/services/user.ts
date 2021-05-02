import { UserCreationAttributes } from "../types/user";
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

  public async getUserById(id: string) {
    try {
      const userRecord = await User.findOne({
        where: {
          id: id,
        },
      });

      return userRecord;
    } catch (e) {
      throw (e);
    }
  }
  public async deleteUserById(id: string) {
    try {
      const userRecord = await User.update({ isDeleted: true }, {
        where: {
          id: id,
        },
      });

      return userRecord;
    } catch (e) {
      throw (e);
    }
  }
  public async addUser(data: UserCreationAttributes) {
    try {
      const user = await User.create({ ...data, isDeleted: false });
      return user;
    } catch (e) {
      throw (e);
    }

  }
  public async getAutoSuggestUsers(loginSubstring: string, limit: number) {
    try {
      const filteredUsers = await User.findAll({
        where: {
          login: {
            [Op.like]: `%${loginSubstring}%`,
          }
        },
        limit,
        order: [
          ['login', 'ASC'],
        ],
      });

      return filteredUsers;
    } catch (e) {
      throw (e);
    }
  };

}
