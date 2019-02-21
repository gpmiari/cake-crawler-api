const productServices = require('../services');

const buildProduct = (product) => {
  return {
    name: product.name,
    price: product.price,
    oldPrice: product.oldPrice,
    stock: product.stockQuantity,
    image: product.mainImageUrl,
    searched: new Date()
  };
};

const postSearch = async (req, res) => {
  try {
    const { keyword } = req.body;
    const products = await productServices.superNossoSearch(keyword);
    if (!products) {
      console.info(`Not foun products with keyword ${keyword}`);
      return res.sendStatus(404);
    }

    const response = products.elements.reduce((acc, product) => {
      acc.push(buildProduct(product));
      return acc
    }, []);

    await productServices.insertProducts(response);

    return res.status(200).send(response);
  } catch (ex) {
    console.error(`Error on post search: ${ex}`);
    return res.sendStatus(500);
  }
};

module.exports = postSearch;
