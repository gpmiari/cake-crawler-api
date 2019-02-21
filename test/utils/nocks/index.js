const nock = require('nock');

const nocks = {};

nocks.cleanAll = () => {
  nock.cleanAll();
};
nocks.searchSupernosso = (options = {}) => {
  const url = process.env.URL_SUPERNOSSO;
  if (options.errorMessage) {
    return nock(url)
      .post('/products/autocomplete', options.requestBody)
      .replyWithError(options.errorMessage);
  }
  return nock(url)
    .post('/products/autocomplete', options.requestBody)
    .reply(options.statusCode || 202);
};

module.exports = nocks;
