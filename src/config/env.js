require('dotenv').config();

const APP_PORT = process.env.APP_PORT || 4000;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PWD = process.env.DB_PWD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;

module.exports = {
  APP_PORT,
  DB_NAME,
  DB_USER,
  DB_PWD,
  DB_HOST,
  DB_PORT,
  JWT_SECRET,
  JWT_EXPIRES,
};
