const controllers = require('./controllers');
const validation = require('../validation');

const routes = (router) => {
    router.post('/api/products/', validation.products, controllers.postSearch);
}

module.exports = routes;

