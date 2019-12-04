import { BuildOptions, Model, Sequelize } from "sequelize/types";

export interface User extends Model {
  readonly id: number;
  name: string,
  email: string,
  password: string,
}

export type UserStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): User;
}

const init = (sequelize: Sequelize, DataTypes: any) => {
  const User = <UserStatic>sequelize.define('User', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return User;
}

export default init;
