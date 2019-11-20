import { Provider } from 'oidc-provider';
import configuration from './configuration';

const issuer = process.env.PUBLIC_URL || 'http://localhost:3000';
const oidc = new Provider(issuer, configuration);
oidc.proxy = true;

export default oidc;
