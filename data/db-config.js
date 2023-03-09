const knex = require("knex");
const configs = require("../knexfile");
const environment = process.env.node_env || "development";

module.exports = knex(configs[environment]);
