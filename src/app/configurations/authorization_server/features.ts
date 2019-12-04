import { Configuration } from "oidc-provider";

const config: Configuration = {
  features: {
    devInteractions: { enabled: false },
    introspection: { enabled: true },
    revocation: { enabled: true },
    clientCredentials: { enabled: true },
    deviceFlow: { enabled: true },
  }
};

export default config.features;
