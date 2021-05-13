
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: '3325b376-8853-4e6a-a876-0334a4e04ded', email: 'yosh@me.com', username: 'yoshio', password: 'yosh', user_type: 'Business', stripe_id: 'cus_JTDOYSE2dVRltj'},
        {id: '6d237944-0e2d-4f33-8d0a-47354978dde1', email: 'wiru@me.com', username: 'wiru', password: 'wiru', user_type: 'Personal'},
      ]);
    });
};