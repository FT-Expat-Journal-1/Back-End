
exports.seed = function(knex) {
  return knex('users_posts').del()
    .then(function () {
      return knex('users_posts').insert([
        {user_id: '1', post_id: '1'},
        {user_id: '2', post_id: '1'},
        {user_id: '1', post_id: '2'},
      ]);
    });
};
