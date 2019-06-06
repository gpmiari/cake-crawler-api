const tv4 = require('tv4');
const logger = require('../../config/logger').logger();
const searchEnrtyData = require('./schemas/search-entry-data-schema');
const products = require('./schemas/product-schema');

const Validator = {};
const self = Validator;

tv4.addSchema(searchEnrtyData);
tv4.addSchema(products);

Validator.getErrorMessages = (result) => {
  const errors = [];
  result.errors.forEach((error) => {
    errors.push(error.message);
  });
  return errors;
};

Validator.formatErrorMessage = (result) => {
  const errors = self.getErrorMessages(result);
  return `${errors.join('.\n')}.`;
};

Validator.validate = (json, schemaId) => tv4.validateMultiple(json, schemaId);

Validator.products = (req, res, next) => {
  const result = self.validate(req.body, searchEnrtyData);
  if (!result.valid) {
    logger.error(self.formatErrorMessage(result));
    return res.status(400).send(self.formatErrorMessage(result));
  }
  return next();
};

module.exports = Validator;
