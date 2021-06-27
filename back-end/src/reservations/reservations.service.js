const knex = require("../db/connection");
const reservations = "reservations";

// returns a resevrvation by mobile number
function search(mobile_number) {
  return knex(reservations)
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

function list(date) {
  return knex(reservations)
    .where({ reservation_date: date })
    .whereNot({ status: "finished" })
    .orderBy("reservation_time", "asc")
    .orderBy("reservation_time");
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

function updateStatus(updatedReservation) {
  return knex(reservations)
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update({ status: updatedReservation.status }, "*")
    .then((createdReservation) => createdReservation[0]);
}

module.exports = { list, create, read, update, search, updateStatus };
