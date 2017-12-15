import { knex } from '../../../db/database';

export default function storeUser(user) {
  return knex('user').insert(user);
}
