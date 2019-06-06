const app = require('./express');
const logger = require('./logger').logger();
const db = require('./db');

module.exports = {
  app,
  logger,
  db,
};
