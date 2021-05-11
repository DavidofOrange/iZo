const { parse } = require("pg-connection-string");

let pgParsed;

if (process.env.DATABASE_URL) {
  pgParsed = parse(process.env.DATABASE_URL);
  pgParsed.ssl = { rejectUnauthorized: false };
}

module.exports = {

  development: {
    client: 'pg',
    connection: pgParsed || process.env.DATABASE_LOCAL_URL,
    migrations: {
      directory: `${__dirname}/migrations/`,
      tableName: "knex_migrations"
    },
    seeds: {
      directory: `${__dirname}/seeds/`
    }
  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },

  // },
  
  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};
