import { knex } from '../../../db/database';

export default function getUserByUsername(username) {
  return knex('user').where({ username });
}
