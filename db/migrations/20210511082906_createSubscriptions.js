
exports.up = async (knex) => {
    return knex.schema.createTable('subscriptions', table => {
		table.text('id').primary();
        table.uuid('user_id')
            .unsigned()
            .references('bus_users.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
		table.uuid('bus_id')
            .unsigned()
            .references('businesses.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
		table.text('status').notNullable();
		table.timestamps(true, true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('subscriptions');
};
