//destructure Pool from pg
const { Pool } = require("pg");

//create a new Pool connection with our credentials
const pool = new Pool({
  user: "zarasultan",
  host: "localhost",
  database: "catcollector",
  password: "1234",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
