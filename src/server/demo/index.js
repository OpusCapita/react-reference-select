import path from 'path';
import express from 'express';
import storage from 'lowdb/lib/file-async';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import webpackMiddleware from 'webpack-dev-middleware';

let componentsRoot = path.resolve(__dirname, '../../client/components');
require('@opuscapita/react-showroom-server').makeLocalScan(componentsRoot);

// create express app
const app = express();

app.disable('etag');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// enable cross origin requests
app.use(function(req, res, next) {
  // only specific/trusted hosts have to be configured
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

if (process.env.NODE_ENV === 'production') {
  app.use('/static', express.static(__dirname + '../../../build/client'));
} else {
  let webpackOptions = {
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    },
    stats: { colors: true },
    noInfo: true,
    publicPath: '/static'
  };
  app.use(webpackMiddleware(webpack(require('../../../webpack.development.config.js')), webpackOptions));
  app.use(express.static(__dirname + '/../../client/demo'));
  app.get('*', function(req, res) {
    res.sendFile(path.normalize(__dirname + '/../../client/demo/index.html'));
  });
}

// launch application
const host = process.env.HOST ? process.env.HOST : 'localhost';
const port = process.env.PORT ? process.env.PORT : 3000;

app.listen(port, host, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`The server is running at http://${host}:${port}/`);
});
