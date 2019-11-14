import server from './server';
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`[SERVER] Running at http://0.0.0.0:${port}`);
});
