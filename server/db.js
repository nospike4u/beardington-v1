const knex = require('knex');

const db = knex({
  client: 'better-sqlite3',
  connection: {
    filename: require('path').join(__dirname, '../db/beardington.sqlite3')
  },
  useNullAsDefault: true
});

module.exports = db;