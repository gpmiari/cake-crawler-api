const productsFixture = require('./products-fixtures');
const productsModel = require('../../../../lib/products/products-model');

const productsManager = {};

productsManager.populate = async (data) => {
  const fixture = productsFixture.create(data);
  return productsManager.save(fixture);
};

productsManager.save = async data => productsModel.insertOne(data);

module.exports = productsManager;
