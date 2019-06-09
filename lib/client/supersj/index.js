const request = require('request');
const { promisify } = require('util');
require('dotenv').load();
const logger = require('../../../config/logger').logger();

const search = async (query) => {
  const url = `${process.env.URL_SUPERJS}?descricao=${query}`;
  try {
    const options = {
      url,
      json: true,
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    };
    const requestPromise = promisify(request);
    const response = await requestPromise(options);
    if (response.statusCode !== 200) {
      const errorMessage = `Error ${response.statusCode} on get products SUPER JS.`;
      logger.error(errorMessage);
      throw new Error(errorMessage);
    }
    logger.info(`Get products SUPER JS: ${response.statusCode}`);
    return response.body;
  } catch (ex) {
    logger.error(`Error on get products SUPER JS: ${ex}`);
    throw ex;
  }
};

module.exports = {
  search,
};
