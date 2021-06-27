const environment = process.env.NODE_ENV || "development";
const config = require("../../knexfile")[environment];
knex.migrate.latest([config]);
const knex = require("knex")(config);

module.exports = knex;
