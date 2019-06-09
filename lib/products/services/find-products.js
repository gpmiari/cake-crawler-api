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

const superNossoSearch = async (keyword) => {
  const productsSupernosso = await clientSupernosso.search(keyword);
  const productsSN = productsSupernosso.elements.reduce((acc, product) => {
    const newProduct = product;
    newProduct.shop = 'Super Nosso';
    acc.push(buildProduct(newProduct));
    return acc;
  }, []);
  const productsApoio = await clientApoioMineiro.search(keyword);
  const productsAM = productsApoio.prods.reduce((acc, product) => {
    const newProduct = product;
    newProduct.shop = 'Apoio Mineiro';
    acc.push(buildProduct(newProduct));
    return acc;
  }, []);
  const products = productsSN.concat(productsAM);
  return products;
};

module.exports = {
  superNossoSearch,
};
