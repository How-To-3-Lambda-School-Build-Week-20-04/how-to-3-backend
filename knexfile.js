require('dotenv').config();

module.exports = {
  // npx knex migrate:latest
  // npx knex seed:run
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: "./data/project.db3",
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  // npx knex migrate:latest --env testing
  // npx knex seed:run --env testing
  testing: {
    client: 'sqlite3',
    connection: {
      filename: "./data/test_project.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations'
    }
  }
};