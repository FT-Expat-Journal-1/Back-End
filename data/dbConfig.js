const knex = require("knex");

const knexfile = require("../knexfile.js");

const env = process.env.NODE_ENV || "development";

module.exports = knex(knexfile[env]); //sets configuration based on env variable