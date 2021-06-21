const knex = require("../db/connection");
const tables = "tables";

function list() {
  return knex(tables).select("*").orderBy("table_name");
}

module.exports = { list };
