import bodyParser from 'body-parser';
import express from 'express';

import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

import session from 'express-session';
import sessionStore from 'connect-session-knex';
import uuid from 'uuid/v4';
import expressValidator from 'express-validator';

import passportInstance from '../lib/passport';
import { knex } from '../db/database';
import routes from './routes';
import config from '../lib/config';
import logger from '../lib/logger';


// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => 'Hello world!',
};

export function app(instance = null) {
  const appInstance = instance || express();

  const KnexSessionStore = sessionStore(session);

  const store = new KnexSessionStore({
    knex,
    createTable: true,
  });

  const sess = {
    secret: config.sessionSecretKey,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hour sessions
    },
    store,
    resave: false,
    saveUninitialized: true,
    genid: () => uuid(),
  };
  if (config.environment === 'PROD') {
    sess.cookie.secure = true;
  }

  appInstance
    .use(bodyParser.json({ limit: '5mb' }))
    .use(bodyParser.urlencoded({ extended: true, limit: '5mb' }))
    .use(expressValidator())
    .use(session(sess))
    .use(passportInstance.initialize())
    .use(passportInstance.session())
    .use('/graphql', graphqlHTTP({
      schema,
      rootValue: root,
      graphiql: true,
    }))
    .use('/', routes);
  return appInstance;
}

export function serve() {
  app().listen(config.port);

  logger.info('Server started listening on port %s', config.port);
  logger.info('Runtime environment: %s', config.environment);
}
