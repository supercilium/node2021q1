import { sequelize } from "../configs/sequalize";

export const UserGroup = sequelize.define('UserGroup', {}, { timestamps: false, freezeTableName: true });
