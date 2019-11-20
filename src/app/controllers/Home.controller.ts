import { Request, Response, Router } from "express";
import Controller from "../interfaces/Controller";


class HomeController implements Controller {
  public path = '/';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.hello);
  }

  private hello = (_: Request, res: Response) => {
    res.send("Hello auth");
  }

}


export default HomeController;
