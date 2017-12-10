import bodyParser from 'body-parser';
import express from 'express';

import routes from './routes';
import config from '../lib/config';

export function app(instance = null) {
  instance = instance || express();

  instance
    .use(bodyParser.json({limit: '5mb'}))
    .use(bodyParser.urlencoded({ extended: true, limit: '5mb' }))
    .use('/', routes);

  return instance;
}

export function serve() {
  app().listen(config.port);

  console.log('Server started listening on port', config.port);
  console.log('Runtime environment:', process.env.NODE_ENV);
}
