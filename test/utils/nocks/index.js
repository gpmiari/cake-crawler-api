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

nocks.searchApoioMineiro = (options = {}) => {
  const url = 'https://busca.apoioentrega.com/autocomplete/search';
  if (options.errorMessage) {
    return nock(url)
      .get(`?q=${options.query}&type=1&numsugestoes=5000&numprods=5000`, options.requestBody)
      .replyWithError(options.errorMessage);
  }
  return nock(url)
    .get(`?q=${options.query}&type=1&numsugestoes=5000&numprods=5000`, options.requestBody)
    .reply(options.statusCode || 200, options.responseBody || []);
};

module.exports = nocks;
