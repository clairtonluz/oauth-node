import { Configuration } from "oidc-provider";

import findAccount from './findAccount';
// import adapter from './adapter';
// import renderError from './interactions/renderError';
import cookies from './cookies';
import clients from './clients';
import features from './features';
import jwks from './jwks';


const configuration: Configuration = {
  features,
  formats: { AccessToken: 'jwt', ClientCredentials: 'jwt' },
  clients,
  // adapter,
  findAccount,
  // renderError,
  cookies,
  jwks,
};

export default configuration;
