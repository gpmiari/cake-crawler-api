const nock = require('nock');

const nocks = {};

nocks.cleanAll = () => {
  nock.cleanAll();
};
nocks.searchSupernosso = (options = {}) => {
  const url = 'https://www.supernossoemcasa.com.br/e-commerce/api';
  if (options.errorMessage) {
    return nock(url)
      .post('/products/autocomplete', options.requestBody)
      .replyWithError(options.errorMessage);
  }
  return nock(url)
    .post('/products/autocomplete', options.requestBody)
    .reply(options.statusCode || 200, options.responseBody || []);
};

module.exports = nocks;
