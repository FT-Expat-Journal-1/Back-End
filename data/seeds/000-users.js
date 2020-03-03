
exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
      {username: 'mosesin.tech', first_name: 'Moses', last_name: 'Cosme', email: 'moses@address.com', password: 'pass120'},
      {username: 'darthtomale', first_name: 'Miguel', last_name: 'Cosme', email: 'this@address.com', password: 'anotherpass'},
      {username: 'poeticpolycarp', first_name: 'Karl', last_name: 'Weezer', email: 'that@address.com', password: 'pass'}
      ]);
    });
};