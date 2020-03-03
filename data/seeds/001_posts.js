
const bcrypt = require('bcryptjs');
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {
          id: 1, 
          user_id: 1, 
          title: 'My First Post',
          body: 'This is one of my very first trips shared on Capture!',
          img_url: 'https://images.pexels.com/photos/3375997/pexels-photo-3375997.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        },
      ]);
    });
};
