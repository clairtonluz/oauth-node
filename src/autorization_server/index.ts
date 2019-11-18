import { Configuration, Provider } from 'oidc-provider';
import findAccount from './findAccount';

const configuration: Configuration = {
  // ... see the available options in Configuration options section
  features: {
    introspection: { enabled: true },
    revocation: { enabled: true },
    clientCredentials: { enabled: true },
    deviceFlow: { enabled: true },
    // userinfo: { enabled: true },
  },
  formats: {
    AccessToken: 'jwt',
  },
  clients: [{
    client_name: "My Application Name",
    client_id: 'web_application',
    client_secret: 'bar',
    application_type: "web",
    logo_uri: "http://pluspng.com/img-png/google-logo-png-open-2000.png",
    grant_types: ['authorization_code', 'refresh_token'],
    response_types: ['code'],
    redirect_uris: ['http://example.local:3000/autorization'],
    // + other client properties
  }, {
    client_id: 'mobile_application',
    client_secret: 'mobile_secret',
    client_name: 'Mobile Application',
    logo_uri: "http://pluspng.com/img-png/google-logo-png-open-2000.png",
    application_type: "native",
    grant_types: ['urn:ietf:params:oauth:grant-type:device_code'],
    response_types: [],
    redirect_uris: [],
    token_endpoint_auth_method: 'none',

    // + other client properties
  }, {
    client_id: 'client_id',
    client_secret: 'client_secret',
    grant_types: ['client_credentials'],
    redirect_uris: [],
    response_types: [],
  }],
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
  findAccount,
  // findById,
  // ...
};

const issuer = process.env.PUBLIC_URL || 'http://localhost:3000';
const oidc = new Provider(issuer, configuration);

// express/nodejs style application callback (req, res, next) for use with express apps, see /examples/express.js
export default oidc.callback;
