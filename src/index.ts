import server from './server';

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`[SERVER] Running at ${process.env.PUBLIC_URL}`);
});
