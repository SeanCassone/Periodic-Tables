const knex = require("../db/connection");
const reservations = "reservations";

function list(reservation_date) {
  return knex(reservations)
    .where({ reservation_date })
    .orderBy("reservation_time", "asc");
}

function create(newReservation) {
  return knex(reservations)
    .insert(newReservation, "*")
    .then((createdReservation) => createdReservation[0]);
}

function read(reservation_id) {
  return knex(reservations)
    .select("*")
    .where({ reservation_id: reservation_id })
    .first();
}

function update(updatedReservation) {
  return knex(reservations)
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
    .then((createdReservation) => createdReservation[0]);
}

module.exports = { list, create, read, update };
