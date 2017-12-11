import bodyParser from 'body-parser';
import express from 'express';

import routes from './routes';
import config from '../lib/config';
import logger from '../lib/logger';

export function app(instance = null) {
  const appInstance = instance || express();

  appInstance
    .use(bodyParser.json({ limit: '5mb' }))
    .use(bodyParser.urlencoded({ extended: true, limit: '5mb' }))
    .use('/', routes);

  return appInstance;
}

export function serve() {
  app().listen(config.port);

  logger.info('Server started listening on port %s', config.port);
  logger.info('Runtime environment: %s', config.environment);
}
