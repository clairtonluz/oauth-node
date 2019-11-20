import bodyParser from 'body-parser';
import express from "express";
import helmet from 'helmet';
import morgan from 'morgan';
import Controller from "./interfaces/Controller";
import errorMiddleware from './middlewares/Error.middleware';

class App {
  public app: express.Application;
  constructor(controllers: Controller[]) {
    this.app = express();

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

  private database() {
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
