const { Provider } = require('oidc-provider');

const findAccount = async (ctx: any, id: number) => {
  console.log('findAccount', ctx);
  const claims = async () => {
    return { sub: id };
  }
  return {
    accoundId: id,
    claims,
  }
}

const findById = async (ctx: any, id: number) => {
  console.log('findById', ctx);
  return {
    accountId: id,
    async claims() { return { sub: id }; },
  };
}

const configuration = {
  // ... see the available options in Configuration options section
  features: {
    introspection: { enabled: true },
    revocation: { enabled: true },
    clientCredentials: { enabled: true },
    deviceFlow: { enabled: true },
  },
  formats: {
    AccessToken: 'jwt',
  },
  clients: [{
    client_id: 'aluno_front',
    client_secret: 'bar',
    grant_types: ['authorization_code'],
    response_types: ['code'],
    redirect_uris: ['http://aluno.local/autorization'],
    // + other client properties
  }, {
    client_id: 'client_credentials',
    client_secret: 'super_secret',
    grant_types: ['client_credentials'],
    redirect_uris: [],
    response_types: [],
  }],
  claims: {
    email: ['email', 'email_verified'],
    phone: ['phone_number', 'phone_number_verified'],
    profile: ['birthdate', 'family_name', 'gender', 'given_name', 'locale', 'middle_name', 'name', 'nickname', 'picture', 'preferred_username', 'profile', 'updated_at', 'website', 'zoneinfo']
  },
  clientDefaults: {
    grant_types: ['authorization_code'],
    id_token_signed_response_alg: 'RS256',
    response_types: ['code'],
    token_endpoint_auth_method: 'client_secret_basic',
  },
  findAccount,
  findById,
  // ...
};

const oidc = new Provider('http://localhost:3000', configuration);

// express/nodejs style application callback (req, res, next) for use with express apps, see /examples/express.js
export default oidc.callback;
