import { knex } from '../../../db/database';

export default function getUserById(id) {
  return knex('users').where({ id });
}
