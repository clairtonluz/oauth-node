import { Configuration, Provider } from 'oidc-provider';
import findAccount from './config/findAccount';
// import adapter from './config/my_adapter_redis';
// import renderError from './config/interactions/renderError';
import cookies from './config/cookies';
import clients from './config/clients';
import features from './config/features';
import jwks from './config/jwks';

const configuration: Configuration = {
  features,
  formats: { AccessToken: 'jwt' },
  clients,
  // adapter,
  findAccount,
  // renderError,
  cookies,
  jwks,


  // claims: {
  //   email: ['email', 'email_verified'],
  //   phone: ['phone_number', 'phone_number_verified'],
  //   profile: ['birthdate', 'family_name', 'gender', 'given_name', 'locale', 'middle_name', 'name', 'nickname', 'picture', 'preferred_username', 'profile', 'updated_at', 'website', 'zoneinfo']
  // },
  // clientDefaults: {
  //   grant_types: ['authorization_code'],
  //   id_token_signed_response_alg: 'RS256',
  //   response_types: ['code'],
  //   token_endpoint_auth_method: 'client_secret_basic',
  // },
  // findById,
  // ...
};

const issuer = process.env.PUBLIC_URL || 'http://localhost:3000';
const oidc = new Provider(issuer, configuration);

// express/nodejs style application callback (req, res, next) for use with express apps, see /examples/express.js
export default oidc.callback;
