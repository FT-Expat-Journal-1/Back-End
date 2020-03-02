
exports.up = function(knex) {
    return knex.schema.createTable('posts', posts => {
        posts.increments();
        posts.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
        posts.text('title', 128).notNullable().unique();
        posts.text('body', 128).notNullable();
        posts.text('img_url', 128);
        posts.timestamp('created_date').defaultTo(knex.fn.now()).notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('posts');
};
