
exports.up = async (knex) => {
    // Add uuid_generate_v4() to database functions
    // if it doesn't exist already.
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

	return knex.schema.createTable('businesses', table => {
		table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
		table.text('name').notNullable();
		table.text('postal_code').notNullable();
		table.text('prefecture').notNullable();
		table.text('address1').notNullable();
		table.text('address2');
		table.text('capacity_status').notNullable();
		table.float('latitude').notNullable();
		table.float('longitude').notNullable();
		table.uuid('owner_id')
            .unsigned()
            .references('users.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
		table.text('slogan');
		table.text('open_hours');
		table.text('theme');
		table.text('specials');
        table.timestamps(true, true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('businesses');
};
