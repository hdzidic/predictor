exports.up = function (knex) {
  return knex.schema.createTable('user', function (t) {
    t.increments().primary();
    t.string('fullname').notNull();
    t.string('username').unique().notNull();
    t.string('password').notNull();
    t.string('token');
    t.boolean('isConfirmed');
    t.string('imagePath');
    t.timestamps();
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('user')
}
