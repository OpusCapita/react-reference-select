import path from 'path';
import express from 'express';

// kill itself when nodemon restarts
process.once('SIGUSR2', function() {
  gracefulShutdown(function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// create express app
const app = express();

const cwd = process.cwd();

app.use('/bundle.js', (req, res) => res.sendFile(path.resolve(cwd, './lib/client/demo/bundle.js')));
app.get('*', function(req, res) {
  res.sendFile(path.resolve(cwd, './lib/client/demo/index.html'));
});

// launch application
const host = process.env.HOST ? process.env.HOST : 'localhost';
const port = process.env.PORT ? process.env.PORT : 3000;

app.listen(port, host, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`The server is running at http://${host}:${port}/`);
});
