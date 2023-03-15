const Sequelize = require('sequelize');
const { DB_NAME, DB_USER, DB_PWD, DB_HOST, DB_PORT } = require('../config/env');

const finance = new Sequelize(DB_NAME, DB_USER, DB_PWD, {
  dialect: 'mssql',
  host: DB_HOST,
  port: DB_PORT,
});

module.exports = finance;
