import Controller from "../interfaces/Controller";
import { Router } from "express";

import { Provider } from 'oidc-provider';
import configuration from '../autorization_server/configuration';

class AuthorizationController implements Controller {
  public path = '/';
  public router = Router();
  private oidc: Provider;

  constructor() {
    const issuer = process.env.PUBLIC_URL || 'http://localhost:3000';
    this.oidc = new Provider(issuer, configuration);
    this.oidc.proxy = true;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(this.path, this.oidc.callback);
  }
}


export default AuthorizationController;
