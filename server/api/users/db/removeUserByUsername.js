import { knex } from '../../../db/database';

export default function removeUserByUsername(username) {
  return knex('user').where({ username }).del();
}
