const tablesData = require("./01-tables.json");

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("tables")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("tables").insert(tablesData);
    });
};
