import express from "express";

const { Provider } = require('oidc-provider');
const configuration = {
  // ... see available options /docs
  clients: [{
    client_id: 'foo',
    client_secret: 'bar',
    redirect_uris: ['http://lvh.me:8080/cb'],
    // + other client properties
  }],
};


const provider = new Provider('http://localhost:3000', configuration);



const app = express();
app.use(provider.callback);
app.get("/teste", (_, res) => {
  res.send("Hello ts-node!");
});

export default app;
