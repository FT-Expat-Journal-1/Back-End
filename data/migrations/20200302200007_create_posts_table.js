
exports.up = function(knex) {
  return knex.schema.createTable('posts', posts=>{
    //Auto Incrementing ID
    posts.increments();
    //Foreign Key
    posts.integer('user_id')
    .unsigned() //does not allow integers to be negative 
    .references('id')
    .inTable('users')
    .onUpdate('CASCADE')
    .onDelete('CASCADE')
    //Title
    posts.string('title').notNullable()
    //Body
    posts.string('body', 256).notNullable();
    //Img_URL
    posts.string('img_url').notNullable();
    //Time Stemp
    posts.timestamp('created_date').defaultTo(knex.fn.now()).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('posts');
};
