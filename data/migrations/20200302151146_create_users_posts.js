
exports.up = function(knex) {
    return knex.schema.createTable('users_posts', liked => {
        liked.increments();
        liked.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        liked.integer('post_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('posts')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users_posts');
};
