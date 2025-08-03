const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

console.log("ENV TEST:", process.env.DB_USER, process.env.DB_PASS);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST || '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      connectTimeout: 60000
    },
    logging: console.log,
  }
);

module.exports = sequelize;
