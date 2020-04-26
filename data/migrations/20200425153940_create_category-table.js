exports.up = function(knex) {
  return knex.schema
  .createTable('category', cat => {
    cat.increments();

    cat
      .string('name')
      .unique()
      .notNullable();
  })
  .createTable('howto_category', hc => {
    hc.primary(['howto_id', 'category_id']);
    hc.integer('howto_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('howto')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    hc.integer('category_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('category')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('howto_category')
    .dropTableIfExists('category');
};
