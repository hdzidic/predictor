import { knex } from '../../../db/database';

export default function saveFixtures(fixtures) {
  return knex('fixtures').insert(fixtures);
}
