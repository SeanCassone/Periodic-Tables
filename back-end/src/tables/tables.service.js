const knex = require("../db/connection");
const tables = "tables";
const reservations = "reservations";

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

function update({ table_id, reservation_id }) {
  return knex.transaction((trx) => {
    return knex(reservations)
      .transacting(trx)
      .where({ reservation_id: reservation_id })
      .update({ status: "seated" })
      .then(() => {
        return knex(tables)
          .where({ table_id: table_id })
          .update({ reservation_id: reservation_id })
          .returning("*");
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
}

function destroy(table_id, reservation_id) {
  return knex.transaction((trx) => {
    return knex(reservations)
      .transacting(trx)
      .where({ reservation_id: reservation_id })
      .update({ status: "finished" })
      .then(() => {
        return knex(tables)
          .where({ table_id: table_id })
          .update({ reservation_id: null })
          .returning("*");
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
}

module.exports = { list, create, read, update, destroy };
