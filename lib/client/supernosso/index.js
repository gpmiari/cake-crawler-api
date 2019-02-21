const request = require('request');
const { promisify } = require('util');

const search = async (query) => {
  try {
    const options = {
      url: process.env.URL_SUPERNOSSO,
      json: true,
      body: {
        "pageNumber": 0,
        "pageSize": 50,
        query
      },
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    };
    const requestPromise = promisify(request);
    const response = await requestPromise(options);
    if (response.statusCode !== 200) {
      const errorMessage = `Error ${response.statusCode} on get products SUPERNOSSO.`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
    console.info(`Get products supernosso: ${response.statusCode}`);
    return response.body;
  } catch (ex) {
    console.error(`Error on get products SUPERNOSSO: ${ex}`);
    throw ex;
  }
};

module.exports = {
  search
};
