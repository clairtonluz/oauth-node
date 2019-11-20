import { CookiesSetOptions } from "oidc-provider";

const short: CookiesSetOptions = {
  signed: true,
  httpOnly: true,
  maxAge: 600000,
};

const long: CookiesSetOptions = {
  signed: true,
  httpOnly: true,
  maxAge: 1209600000
};

const keys: Array<string | Buffer> = ['some secret key', 'and also the old rotated away some time ago', 'and one more'];

export default {
  keys,
  short,
  long,
  names: {
    interaction: '_interaction',
    resume: '_interaction_resume',
    session: '_session',
    state: '_state',
  },
};
