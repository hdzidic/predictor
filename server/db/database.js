import knex from 'knex';
import Q from 'q';
import config from '../lib/config';
import logger from '../lib/logger';

let knexConnection;

export function connect() {
  knexConnection = knex({
    client: 'mysql',
    connection: {
      user: config.databaseUser,
      password: config.databasePassword,
      host: config.databaseHost,
      database: config.databaseName,
    },
  });

  logger.info('Knex connected to DB at %s:%s', config.databaseHost, config.databasePort);

  module.exports.knex = knexConnection;
}

export function migrate() {
  if (knexConnection) {
    knexConnection.migrate.latest({
      tableName: 'knex_migrations',
      directory: `${config.root}/db/migrations`,
    });
    logger.info('Migrated to latest DB version successfully');
  }
}

export function createDatabaseAndConnect() {
  const promises = [connect(), migrate()];

  return Q.all(promises);
}
