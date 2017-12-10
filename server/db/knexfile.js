import config from '../lib/config';
import knex from 'knex';

export default knex({
  client: 'mysql',
  connection: {
    user: config.databaseUser,
    password: config.databasePassword,
    host: config.databaseHost,
    database: config.databaseName
  }
});
