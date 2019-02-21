const clientSupernosso = require('../../client/supernosso');

const superNossoSearch = async (keyword) => clientSupernosso.search(keyword);

module.exports = {
    superNossoSearch
}