export default {
  keys: ['some secret key', 'and also the old rotated away some time ago', 'and one more'],
  long: {
    signed: true,
    httpOnly: true,
    maxAge: 1209600000
  },
  names: {
    session: '_session',
    interaction: '_interaction',
    resume: '_grant',
    state: '_state'
  },
  short: {
    signed: true,
    httpOnly: true,
    maxAge: 600000
  },
};
