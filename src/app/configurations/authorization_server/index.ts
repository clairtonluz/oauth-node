import { Configuration } from "oidc-provider";
import clients from './clients';
import adapter from './adapter';
import renderError from './interactions/renderError';
import cookies from './cookies';
import features from './features';
// import findAccount from './findAccount';
import jwks from './jwks';
import AccountService from '../../services/Account.service';

const configuration: Configuration = {
  features,
  formats: { AccessToken: 'jwt', ClientCredentials: 'jwt' },
  clients,
  adapter,
  findAccount: AccountService.findAccount,
  renderError,
  claims: {
    openid: ['sub'],
    email: ['email', 'email_verified'],
    phone: ['phone_number'],
    profile: ['birthdate', 'family_name', 'gender', 'given_name', 'locale', 'middle_name', 'name', 'nickname', 'picture', 'preferred_username', 'profile', 'updated_at', 'website', 'zoneinfo']
  },
  cookies,
  jwks,
};

export default configuration;
