import { knex } from '../../../db/database';

export default function getUserByUsername(username) {
  return knex('users').where({ username });
}
