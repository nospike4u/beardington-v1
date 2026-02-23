const createServer = require('node:http');
const router = require('../server/router');

const server = createServer((req, res) => {
    res.writeHead(200, {'Content-type': 'application/json'});
    router(req, res);
});

const port = process.env.PORT || 5000;

server.listen(port, ()=> console.log(`Server running on ${port}`));

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.error('Address in use, retrying...');
    setTimeout(() => {
      server.close();
      server.listen(port, HOST);
    }, 1000);
  }
});