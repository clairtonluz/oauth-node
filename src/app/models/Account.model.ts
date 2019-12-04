import { Model, Sequelize, DataTypes } from "sequelize/types";

class Account extends Model {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const init = (sequelize: Sequelize) => {
  Account.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      field: 'ci_aluno_portal'
    },
    username: {
      type: new DataTypes.STRING(255),
      allowNull: false,
      field: 'cd_aluno'
    },
    password: {
      type: new DataTypes.STRING(255),
      allowNull: false,
      field: 'nm_senha'
    },
  }, {
    tableName: 'academico.tb_aluno_portal',
    sequelize
  })
}

export default Account;
