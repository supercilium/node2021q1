import {
  Model,
  DataTypes,
  BelongsToManyGetAssociationsMixin,
  BelongsToManySetAssociationsMixin,
} from "sequelize";
import { GroupInterface, Permission, GroupCreatingInterface } from "../types/group";
import { sequelize } from '../configs/sequalize';
import { User } from "./user";
import { UserGroup } from "./userGroup";

export class Group extends Model<GroupInterface, GroupCreatingInterface>
  implements GroupCreatingInterface {
  public id!: string;
  public name!: string;
  public permission!: Permission[];

  public getUsers!: BelongsToManyGetAssociationsMixin<User>;
  public setUsers!: BelongsToManySetAssociationsMixin<User, string>;
}

Group.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    permission: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize,
  }
);

Group.belongsToMany(User, { through: UserGroup, onDelete: 'CASCADE', onUpdate: 'CASCADE' });
User.belongsToMany(Group, { through: UserGroup, onDelete: 'CASCADE',  onUpdate: 'CASCADE'  });
