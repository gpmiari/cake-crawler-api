const { clientSupernosso, clientApoioMineiro } = require('../../client/');

const buildProduct = product => ({
  name: (product.name || product.title),
  price: product.price,
  oldPrice: (product.oldPrice || product.sPrice),
  stock: (product.stockQuantity || product.stock),
  image: (product.mainImageUrl || product.img),
  searched: new Date(),
  store: product.shop,
});

const searchProducts = async (keyword) => {
  let productsSN;
  let productsAM;

  const searchSN = await clientSupernosso.search(keyword);
  const searchAM = await clientApoioMineiro.search(keyword);

  if (searchSN.elements) {
    productsSN = searchSN.elements.reduce((acc, product) => {
      const newProduct = product;
      newProduct.shop = 'Super Nosso';
      acc.push(buildProduct(newProduct));
      return acc;
    }, []);
  }

  if (searchAM.prods) {
    productsAM = searchAM.prods.reduce((acc, product) => {
      const newProduct = product;
      newProduct.shop = 'Apoio Mineiro';
      acc.push(buildProduct(newProduct));
      return acc;
    }, []);
  }
  return productsSN.concat(productsAM);
};

module.exports = {
  searchProducts,
};
