const config = require('../config/settings')
const pg = require('pg')

const client = new pg.Client()
const dbConfig = {
  database: "Instathing_development", //env var: PGDATABASE // TEMPORARY
  // database: config.DEV_DB, //env var: PGDATABASE
  // user: 'foo', //env var: PGUSER
  // password: 'secret', //env var: PGPASSWORD
  // port: 5432, //env var: PGPORT
  // max: 10, // max number of clients in the pool
  // idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
}

const pool = new pg.Pool(dbConfig)

function query(query) {
  console.log(query);
  return pool.query(query)
    .catch(err => console.error(err))
    .then((result) => result.rows)
}

module.exports = {
  execute: query
}
