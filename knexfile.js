// Update with your config settings.
const database = {
  client: 'pg',
      connection: {
          host: 'localhost',
          database: 'dev'
      },
      migrations: {
          directory: './data/migrations'
      },
      seeds: { 
          directory: './data/seeds' 
      },
  };

module.exports = {
  development:{
    ...database,
    connection: 'postgresql://localhost/dev',
    tableName: 'knex_migrations'
  },

  testing: {
    ...database,
    connection: 'postgresql://localhost/test',
    tableName: 'knex_migrations'
  },

  production: {
    ...database,
    connection: process.env.DATABASE_URL
  }

};
