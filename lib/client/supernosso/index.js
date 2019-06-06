const request = require('request');
const { promisify } = require('util');
const logger = require('../../../config/logger').logger();


const search = async (query) => {
  try {
    const options = {
      url: 'https://www.supernossoemcasa.com.br/e-commerce/api/products/autocomplete',
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
      const errorMessage = `Error ${response.statusCode} on get products SUPERNOSSO.`;
      logger.error(errorMessage);
      throw new Error(errorMessage);
    }
    logger.info(`Get products supernosso: ${response.statusCode}`);
    return response.body;
  } catch (ex) {
    logger.error(`Error on get products SUPERNOSSO: ${ex}`);
    throw ex;
  }
};

module.exports = {
  search,
};
