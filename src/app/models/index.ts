import * as Account from './Account.model';
import { Sequelize, Model } from 'sequelize';
export interface IModel {
  init: (sequelize: Sequelize) => void,
  default: Model
}

const models: IModel[] = [
  Account,
];

export default models;
