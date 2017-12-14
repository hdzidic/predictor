import { knex } from '../../../db/database';

export default function storeUser(user) {
  return knex('users').insert(user).returning('*');
}
