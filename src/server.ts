import express from "express";
import autorizationServer from './autorization_server';

const server = express();

server.get("/hello", (_, res) => {
  res.send("Hello ts-node!");
});
server.use('/', autorizationServer);

export default server;
