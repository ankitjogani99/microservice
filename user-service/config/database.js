const { Sequelize } = require('sequelize');
const path = require('path');
const dotenv = require('dotenv');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      connectTimeout: 60000
    },
    logging: console.log,
  }
);

module.exports = sequelize;
