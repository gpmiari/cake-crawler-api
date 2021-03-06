const logger = require('../../../config/logger').logger();
const productServices = require('../services');

const postSearch = async (req, res) => {
  try {
    const { keyword } = req.body;
    const products = await productServices.searchProducts(keyword);
    if (products.length === 0) {
      logger.info(`Not found products with keyword ${keyword}`);
      return res.sendStatus(404);
    }
    await productServices.insertProducts(products);
    return res.status(200).send(products);
  } catch (ex) {
    logger.error(`Error on post search: ${ex}`);
    return res.sendStatus(500);
  }
};

module.exports = postSearch;
