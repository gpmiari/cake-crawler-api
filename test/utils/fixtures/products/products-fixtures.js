const Chance = require('chance');

const chance = new Chance();

const create = (data = {}) => {
  const result = {
    name: data.name || chance.word(),
    price: data.price || chance.floating({ fixed: 2 }),
  };

  if (data.stock) {
    result.stock = data.stock;
  }

  if (data.image) {
    result.image = data.image;
  }

  if (data.searched) {
    result.searched = data.searched;
  }

  return result;
};

module.exports = {
  create,
};
