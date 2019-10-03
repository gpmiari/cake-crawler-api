const { clientSupernosso, clientApoioMineiro, clientSuperJS } = require('../../client/');

const buildProduct = (product) => ({
  name: (product.name || product.title || product.str_nom_produto),
  price: (product.price || product.mny_vlr_produto_por),
  oldPrice: (product.oldPrice || product.sPrice || product.mny_vlr_produto_de),
  stock: (product.stockQuantity || product.stock),
  image: (product.mainImageUrl || product.img || product.str_img_path_cdn),
  searched: new Date(),
  store: product.shop,
});

const searchProducts = async (keyword) => {
  let productsSN;
  let productsAM;
  let productsSJ;

  const searchSN = await clientSupernosso.search(keyword);
  const searchAM = await clientApoioMineiro.search(keyword);
  const searchSJ = await clientSuperJS.search(keyword);

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

  if (searchSJ.Produtos) {
    productsSJ = searchSJ.Produtos.reduce((acc, product) => {
      const newProduct = product;
      newProduct.shop = 'Super JS';
      acc.push(buildProduct(newProduct));
      return acc;
    }, []);
  }
  return productsSN.concat(productsAM).concat(productsSJ).sort((a, b) => {
    if (a.price < b.price) {
      return -1;
    }
    if (a.price > b.price) {
      return 1;
    }

    return 0;
  });
};

module.exports = {
  searchProducts,
};
