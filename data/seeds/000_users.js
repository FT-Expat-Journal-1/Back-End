
const bcrypt = require('bcryptjs');
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'test_user', 
          password: bcrypt.hashSync('password', 8),
          first_name: 'John',
          last_name: 'Doe',
          email: 'johndoe@gmail.com'
        },
      ]);
    });
};
