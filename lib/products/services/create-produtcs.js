const productsModel = require('../products-model');

const insertProducts = products => productsModel.insertMany(products);

module.exports = {
  insertProducts,
};
