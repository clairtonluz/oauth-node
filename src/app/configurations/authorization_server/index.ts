import { Configuration } from "oidc-provider";
import clients from './clients';
import adapter from './adapter';
import renderError from './interactions/renderError';
import cookies from './cookies';
import features from './features';
// import findAccount from './findAccount';
import jwks from './jwks';
import AccountService from '../../services/Account.service';

// const issueRefreshToken: Configuration.issueRefreshToken = async (ctx, client, code) => {
//   console.log('issueRefreshToken', client, code);
//   return client.grantTypeAllowed('refresh_token') && code.scopes.has('offline_access');
// }

const configuration: Configuration = {
  features,
  formats: { AccessToken: 'jwt', ClientCredentials: 'jwt' },
  clients,
  adapter,
  findAccount: AccountService.findAccount,
  renderError,
  scopes: ['openid', 'offline_access'],
  claims: {
    openid: ['sub'],
    email: ['email', 'email_verified'],
    phone: ['phone_number'],
    profile: ['name', 'nickname', 'picture', 'birthdate', 'gender', 'locale', 'preferred_username', 'updated_at', 'website'],
    offline_access: ['refresh_token', 'offline_access'],
  },
  cookies,
  jwks,
  issueRefreshToken: async (_, client, code) => {
    console.log('issueRefreshToken', code);
    console.log('scopes:', code.scopes);
    // return client.grantTypeAllowed('refresh_token');
    return client.grantTypeAllowed('refresh_token') && code.scopes.has('offline_access');
  }
};

export default configuration;
