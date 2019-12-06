import Controller from "../interfaces/Controller";
import { Router, Response, Request, NextFunction } from "express";

import { Provider, InteractionResults } from 'oidc-provider';
import configuration from '../configurations/authorization_server';
import AccountService from "../services/Account.service";
import bodyParser = require("body-parser");

const parse = bodyParser.urlencoded({ extended: false });
const setNoCache = (_: Request, res: Response, next: NextFunction) => {
  res.set('Pragma', 'no-cache');
  res.set('Cache-Control', 'no-cache, no-store');
  next();
}
class AuthorizationController implements Controller {
  public path = '/';
  public router = Router();
  private provider!: Provider;

  constructor() {
    this.initProvider();
    this.initializeRoutes();
  }

  private initProvider() {
    const issuer = process.env.PUBLIC_URL;
    this.provider = new Provider(issuer!, configuration);
    this.provider.proxy = true;
    function handleClientAuthErrors(err: any, values: any[]) {
      if (err.statusCode === 401 && err.message === 'invalid_client') {
        console.log("ERROR:", err);
        console.log("VALUES", values);
        // save error details out-of-bands for the client developers, `authorization`, `body`, `client`
        // are just some details available, you can dig in ctx object for more.
      }
    }
    this.provider.on('grant.error', handleClientAuthErrors);
    this.provider.on('introspection.error', handleClientAuthErrors);
    this.provider.on('revocation.error', handleClientAuthErrors);
  }
  private initializeRoutes() {

    this.router.get(`${this.path}interaction/:uid`, setNoCache, async (req, res, next) => {
      try {
        const details = await this.provider.interactionDetails(req, res);
        console.log('see what else is available to you for interaction views', details);
        const { uid, prompt, params } = details;

        const client = await this.provider.Client.find(params.client_id);

        if (prompt.name === 'login') {
          console.log('login');
          return res.render('login', {
            client,
            uid,
            details: prompt.details,
            params,
            title: 'Login',
            flash: undefined,
          });
        }

        console.log('interaction');

        return res.render('interaction', {
          client,
          uid,
          details: prompt.details,
          params,
          title: 'Authorize',
        });
      } catch (err) {
        return next(err);
      }
    });


    this.router.post('/interaction/:uid/login', setNoCache, parse, async (req, res, next) => {
      try {
        const { uid, prompt, params } = await this.provider.interactionDetails(req, res);
        const client = await this.provider.Client.find(params.client_id);

        const accountId = await AccountService.authenticate(req.body.email, req.body.password);

        if (!accountId) {
          res.render('login', {
            client,
            uid,
            details: prompt.details,
            params: {
              ...params,
              login_hint: req.body.email,
            },
            title: 'Login',
            flash: 'Invalid email or password.',
          });
          return;
        }

        const result: InteractionResults = {
          login: {
            account: `${accountId}`,
          },
        };

        await this.provider.interactionFinished(req, res, result, { mergeWithLastSubmission: false });
      } catch (err) {
        console.log('interaction error');
        next(err);
      }
    });

    this.router.post('/interaction/:uid/confirm', setNoCache, parse, async (req, res, next) => {
      try {
        const result = {
          consent: {
            // rejectedScopes: [], // < uncomment and add rejections here
            // rejectedClaims: [], // < uncomment and add rejections here
          },
        };
        await this.provider.interactionFinished(req, res, result, { mergeWithLastSubmission: true });
      } catch (err) {
        next(err);
      }
    });

    this.router.get('/interaction/:uid/abort', setNoCache, async (req, res, next) => {
      try {
        const result = {
          error: 'access_denied',
          error_description: 'End-User aborted interaction',
        };
        await this.provider.interactionFinished(req, res, result, { mergeWithLastSubmission: false });
      } catch (err) {
        next(err);
      }
    });

    this.router.use(this.path, this.provider.callback);

  }
}


export default AuthorizationController;
