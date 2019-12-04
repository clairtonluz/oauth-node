import Controller from "../interfaces/Controller";
import { Router } from "express";

import { Provider } from 'oidc-provider';
import configuration from '../configurations/authorization_server';

class AuthorizationController implements Controller {
  public path = '/';
  public router = Router();
  private provider: Provider;

  constructor() {
    const issuer = process.env.PUBLIC_URL || 'http://localhost:3000';
    this.provider = new Provider(issuer, configuration);
    this.provider.proxy = true;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(this.path, this.provider.callback);
    this.router.get(`${this.path}interaction/:uid`, async (req, res) => {
      const details = await this.provider.interactionDetails(req, res);
      console.log('details', details);
    });
    // this.router.post('/interaction/:uid/login', async (req, res) => {
    //   return this.provider.interactionFinished(req, res, result); // result object below
    // });

  }
}


export default AuthorizationController;
