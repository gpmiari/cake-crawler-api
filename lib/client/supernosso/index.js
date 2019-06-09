const request = require('request');
const { promisify } = require('util');
require('dotenv').load();
const logger = require('../../../config/logger').logger();


const search = async (query) => {
  try {
    const options = {
      url: process.env.URL_SUPERNOSSO,
      json: true,
      body: {
        pageNumber: 0,
        pageSize: 50,
        query,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    };
    const requestPromise = promisify(request);
    const response = await requestPromise(options);
    if (response.statusCode !== 200) {
      const errorMessage = `Error ${response.statusCode} on get products SUPER NOSSO.`;
      logger.error(errorMessage);
      throw new Error(errorMessage);
    }
    logger.info(`Get products SUPER NOSSO: ${response.statusCode}`);
    return response.body;
  } catch (ex) {
    logger.error(`Error on get products SUPER NOSSO: ${ex}`);
    throw ex;
  }
};

module.exports = {
  search,
};
