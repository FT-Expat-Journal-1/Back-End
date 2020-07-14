
exports.up = function (knex) {
    return knex.schema.createTable('users_posts', tbl => {
        //Users FK
        tbl.integer('users_id')
            .unsigned() //cannot be negative
            .notNullable() //cannot be empty
            .references('id')
            .inTable('users')

        //Posts FK
        tbl.integer('posts_id')
            .unsigned() //cannot be negative
            .notNullable() //cannot be empty
            .references('id')
            .inTable('posts')

        // the combination of the two keys becomes our primary key
        // will enforce unique combinations of ids
        tbl.primary(['users_id', 'posts_id']);
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users_posts');
};
