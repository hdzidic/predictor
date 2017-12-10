import config from '../lib/config';
import knex from 'knex';

let knexConnection;

export function connect() {
  knexConnection = knex({
    client: 'mysql',
    connection: {
      user: config.databaseUser,
      password: config.databasePassword,
      host: config.databaseHost,
      database: config.databaseName
    }
  });

  console.log('Knex connected to DB at %s:%s', config.databaseHost, config.databasePort);

  module.exports.knex = knexConnection;
}

export function migrate() {
  console.log('root', config.root);
  if (knexConnection) {
    knexConnection.migrate.latest({
      tableName: 'knex_migrations',
      directory: config.root + '/db/migrations'
    });
    console.log('Migrated to latest DB version successfully');
  }
}
