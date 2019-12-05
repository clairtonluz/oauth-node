import bodyParser from 'body-parser';
import express from "express";
import helmet from 'helmet';
import morgan from 'morgan';
import Controller from "./interfaces/Controller";
import errorMiddleware from './middlewares/Error.middleware';
import assert from 'assert';
import { Sequelize } from 'sequelize';
import path from 'path';
import models from './models'

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
    this.app.set('trust proxy', true);
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.resolve(__dirname, 'views'));
  }

  private database() {
    this.db = models.sequelize;
    const { host, port, username } = this.db.config;
    this.db
      .authenticate()
      .then(() => console.log(`Database connected on
      host:${host}
      port:${port}
      username:${username}`))
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
