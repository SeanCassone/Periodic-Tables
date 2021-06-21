const knex = require("../db/connection");
const tables = "tables";

function list() {
  return knex(tables).select("*").orderBy("table_name");
}

function create(newTable) {
  return knex(tables)
    .insert(newTable, "*")
    .then((createdRecords) => createdRecords[0]);
}

module.exports = { list, create };
