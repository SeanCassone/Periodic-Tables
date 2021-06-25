const { table } = require("../db/connection");
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

function read(table_id) {
  return knex(tables).select("*").where({ table_id: table_id }).first();
}

function update(updatedTable) {
  return knex(tables)
    .select("*")
    .where({ table_id: updatedTable.table_id })
    .update(updatedTable, "*")
    .returning("*");
}

async function destroy(table_id) {
  return knex(tables)
    .select("*")
    .where({ table_id: table_id })
    .update("reservation_id", null)
    .returning("*");
}

module.exports = { list, create, read, update, delete: destroy };
