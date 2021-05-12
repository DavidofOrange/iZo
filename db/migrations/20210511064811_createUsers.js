
exports.up = async (knex) => {
    // Add uuid_generate_v4() to database functions
    // if it doesn't exist already.
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    return knex.schema.createTable('users', table => {
		table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
		table.text('email').notNullable().unique();
    table.text('username').notNullable().unique();
		table.text('password').notNullable();
    table.text('user_type').notNullable();
    table.text('stripe_id');
    table.timestamps(true, true);
    })
  
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};  
