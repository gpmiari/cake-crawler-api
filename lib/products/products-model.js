const { ObjectId } = require('mongodb');
const db = require('../db');
const validation = require('../validation');

const PRODUCTS_COLLECTION_NAME = 'products';
const productsModels = {};

productsModels.insertMany = async (model) => {
  const result = validation.validate(model, PRODUCTS_COLLECTION_NAME);
  if (result.valid) {
    const notification = db.getCollection(PRODUCTS_COLLECTION_NAME);
    return notification.insertMany(model);
  }
  console.error(`Product is not valid: \n ${JSON.stringify(model)} - ${validation.formatErrorMessage(result)}`);
  throw new Error(validation.getErrorMessages(result));
};

module.exports = productsModels;
