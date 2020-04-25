exports.up = function(knex) {
  return knex.schema
  .createTable('howto', howto => {
    howto.increments();

    howto
      .string('title', 256)
      .notNullable();

    howto
      .text('post')
      .notNullable();

    howto
      .timestamp('created_at', { useTz: true })
      .defaultTo(knex.fn.now());
    
    howto
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('user')
      .onUpdate('CASCADE')
      .onDelete('SET NULL');
  })

  .createTable('likes', like => {
    like.primary(['user_id', 'howto_id']);

    like
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('user')
      .onUpdate('CASCADE')
      .onDelete('SET NULL');

    like
      .integer('howto_id')
      .unsigned()
      .references('id')
      .inTable('howto')
      .onUpdate('CASCADE')
      .onDelete('SET NULL');
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('likes')
  .dropTableIfExists('howto');
};
