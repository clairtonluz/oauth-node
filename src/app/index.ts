import bodyParser from 'body-parser';
import express from "express";
import helmet from 'helmet';
import morgan from 'morgan';
import Controller from "./interfaces/Controller";
import errorMiddleware from './middlewares/Error.middleware';
import assert from 'assert';
import { Sequelize } from 'sequelize';

assert(process.env.PUBLIC_URL, 'process.env.PUBLIC_URL missing');
assert(process.env.REDIS_URL, 'process.env.REDIS_URL missing');

class App {
  public app!: express.Application;
  public db!: Sequelize;
  constructor(controllers: Controller[]) {
    this.init();
    this.database();
    this.middlewares();
    this.controllers(controllers);
    this.errorHandling();
  }

  public listen() {
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.info(`[SERVER] App listening on the port ${port}`)
      console.info(`[SERVER] Public access in ${process.env.PUBLIC_URL}`);
    });
  }

  private init() {
    this.app = express();
  }

  private database() {
    this.db = new Sequelize({
      host: '172.31.4.23',
      username: 'aluno_online',
      password: 'aluno_online',
      database: 'desenvolvimento',
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
        acquire: 30000,
      },
      dialect: 'postgres' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    });

    this.db
      .authenticate()
      .then(() => console.log('Connection Database has been established successfully.'))
      .catch(err => console.error('Unable to connect to the database:', err));
  }

  private middlewares() {
    this.app.use(morgan('combined'));
    this.app.use(helmet());
    this.app.use(bodyParser.json());
  }

  private controllers(controllers: Controller[]) {
    controllers.forEach(controller => this.app.use('/', controller.router));
  }

  private errorHandling() {
    this.app.use(errorMiddleware);
  }

}

export default App;
