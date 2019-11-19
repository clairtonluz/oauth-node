import { ErrorOut, errors, KoaContextWithOIDC } from 'oidc-provider';

const renderError = (ctx: KoaContextWithOIDC, out: ErrorOut, _: errors.OIDCProviderError | Error) => {
  ctx.type = 'html';
  ctx.body = `<!DOCTYPE html>
  <head>
  <title>oops! something went wrong</title>
  <style>/* css and html classes omitted for brevity, see lib/helpers/defaults.js */</style>
  </head>
  <body>
  <div>
    <h1>oops! alguma coisa está errada</h1>
    ${Object.entries(out).map(([key, value]) => `<pre><strong>${key}</strong>: ${value}</pre>`).join('')}
  </div>
  </body>
  </html>`;
}

export default renderError;
