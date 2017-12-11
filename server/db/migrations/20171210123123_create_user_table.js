export function up(knex) {
  return knex.schema.createTable('user', (t) => {
    t.increments().primary();
    t.string('fullname').notNull();
    t.string('username').unique().notNull();
    t.string('password').notNull();
    t.string('token');
    t.boolean('isConfirmed');
    t.string('imagePath');
    t.timestamps();
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists('user');
}
