import {
  Model,
  DataTypes,
} from "sequelize";
import { UserInterface, UserCreationAttributes } from "types/user";
import { sequelize } from '../configs/sequalize';

export class User extends Model<UserInterface, UserCreationAttributes>
  implements UserCreationAttributes {
  public id!: string; // Note that the `null assertion` `!` is required in strict mode.
  public login!: string;
  public isDeleted!: boolean; // for nullable fields
  public age!: number; // for nullable fields
  public password!: string; // for nullable fields

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // public getUser(id: string) {
  //   sequelize.query()
  // }

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  // public getProjects!: HasManyGetAssociationsMixin<Project>; // Note the null assertions!
  // public addProject!: HasManyAddAssociationMixin<Project, number>;
  // public hasProject!: HasManyHasAssociationMixin<Project, number>;
  // public countProjects!: HasManyCountAssociationsMixin;
  // public createProject!: HasManyCreateAssociationMixin<Project>;

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  // public readonly projects?: Project[]; // Note this is optional since it's only populated when explicitly requested in code

  // public static associations: {
  //     projects: Association<User, Project>;
  // };
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  },
  {
    tableName: "users",
    sequelize, // passing the `sequelize` instance is required
  }
);