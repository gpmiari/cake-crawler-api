const request = require('request');
const { promisify } = require('util');
require('dotenv').load();
const logger = require('../../../config/logger').logger();

const search = async (query) => {
  const url = `${process.env.URL_APOIO}?q=${query}&type=1&numsugestoes=5000&numprods=5000`;
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
      const errorMessage = `Error ${response.statusCode} on get products APOIO MINEIRO.`;
      logger.error(errorMessage);
      throw new Error(errorMessage);
    }
    logger.info(`Get products APOIO MINEIRO: ${response.statusCode}`);
    return response.body;
  } catch (ex) {
    logger.error(`Error on get products APOIO MINEIRO: ${ex}`);
    throw ex;
  }
};

module.exports = {
  search,
};
