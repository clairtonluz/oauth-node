import { Options } from "sequelize/types";

const options: Options = {
  dialect: "sqlite",
  storage: "./database.sqlite3"
}

export default options;
