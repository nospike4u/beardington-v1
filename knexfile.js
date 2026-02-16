module.exports = {
  development: {
    client: 'better-sqlite3',
    connection: {
      filename: './db/beardington.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },

  production: {
    client: 'better-sqlite3',
    connection: {
      filename: './db/beardington.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './migrations'
    }
  }
};