import { Configuration } from "oidc-provider";

const config: Configuration = {
  features: {
    devInteractions: { enabled: false },
    introspection: { enabled: true },
    revocation: { enabled: true },
    clientCredentials: { enabled: true },
    encryption: { enabled: true },
    deviceFlow: { enabled: true },
    claimsParameter: { enabled: true },
    // sessionManagement: { enabled: true },

  }
};

export default config.features;
