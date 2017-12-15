import { knex } from '../../../db/database';

export default function getUserById(id) {
  return knex('user').where({ id });
}
