require('dotenv').config();

const {
  PORT, DB_URL, NODE_ENV, JWT_SECRET,
} = process.env;

const PORT_CONFIG = NODE_ENV === 'production' ? PORT : 3000;
const DB_CONFIG = NODE_ENV === 'production' ? DB_URL : 'mongodb://127.0.0.1:27017/bitfilmsdb';
const JWT_SECRET_CONFIG = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

module.exports = {
  PORT_CONFIG,
  DB_CONFIG,
  JWT_SECRET_CONFIG,
};
