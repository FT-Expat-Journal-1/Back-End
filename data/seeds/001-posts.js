
exports.seed = function(knex) {
  return knex('posts').del()
    .then(function () {
      return knex('posts').insert([
        {user_id: '1', title: 'My Trip to Italy', body: 'This is my trip to the boot of Europe', img_url: 'http://website.com/img.png'},
        {user_id: '2', title: 'I went to France', body: 'This is my trip to the France', img_url: 'http://website.com/img.png'}
      ]);
    });
};
