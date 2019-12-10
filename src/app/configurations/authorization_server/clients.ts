import { ClientMetadata } from 'oidc-provider';

const clients: ClientMetadata[] = [{
  client_name: "My Application Name",
  client_id: 'web_application',
  client_secret: 'bar',
  application_type: "web",
  logo_uri: "http://pluspng.com/img-png/google-logo-png-open-2000.png",
  grant_types: ['authorization_code'],
  response_types: ['code'],
  redirect_uris: ['http://example.local:3000/autorization'],
}, {
  client_id: 'device_application',
  client_secret: 'device_secret',
  client_name: 'Mobile Application',
  logo_uri: "http://pluspng.com/img-png/google-logo-png-open-2000.png",
  application_type: "native",
  scope: 'authorization_code offline_access profile',
  grant_types: ['urn:ietf:params:oauth:grant-type:device_code'],
  response_types: [],
  redirect_uris: [],
  token_endpoint_auth_method: 'none',
}, {
  client_id: 'mobile_application',
  client_secret: 'mobile_secret',
  client_name: 'Mobile Application',
  logo_uri: "http://pluspng.com/img-png/google-logo-png-open-2000.png",
  application_type: "native",
  grant_types: ['authorization_code', 'refresh_token'],
  response_types: ['code'],
  redirect_uris: ["br.com.example://"],
  scope: 'offline_access openid profile',
  token_endpoint_auth_method: 'none',
}, {
  client_id: 'client_id',
  client_secret: 'client_secret',
  grant_types: ['client_credentials'],
  redirect_uris: [],
  response_types: [],
}];

export default clients;
