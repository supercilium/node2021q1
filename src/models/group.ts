import {
  Model,
  DataTypes,
} from "sequelize";
import { GroupInterface, Permission, GroupCreatingInterface } from "../types/group";
import { sequelize } from '../configs/sequalize';

export class Group extends Model<GroupInterface, GroupCreatingInterface>
  implements GroupCreatingInterface {
  public id!: string;
  public name!: string;
  public permission!: Permission[];
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