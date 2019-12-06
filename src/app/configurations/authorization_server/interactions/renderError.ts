import { ErrorOut, errors, KoaContextWithOIDC } from 'oidc-provider';

const renderError = (ctx: KoaContextWithOIDC, out: ErrorOut, _: errors.OIDCProviderError | Error) => {
  ctx.type = 'html';
  ctx.body = `<!DOCTYPE html>
  <head>
  <title>oops! something went wrong</title>
  <style>
    @import url(https://fonts.googleapis.com/css?family=Roboto:400,100);h1{font-weight:100;text-align:center;font-size:2.3em}body{font-family:Roboto,sans-serif;margin-top:25px;margin-bottom:25px}.container{padding:0 40px 10px;width:274px;background-color:#F7F7F7;margin:0 auto 10px;border-radius:2px;box-shadow:0 2px 2px rgba(0,0,0,.3);overflow:hidden}pre{white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word;margin:0 0 0 1em;text-indent:-1em}
  </style>
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
