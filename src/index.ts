import server from './server';

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.info(`[SERVER] Port expose in container ${port}`)
  console.info(`[SERVER] Running at ${process.env.PUBLIC_URL}`);
});
