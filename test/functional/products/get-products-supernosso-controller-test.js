const { assert } = require('chai');
const sinon = require('sinon');
const supertest = require('supertest');
const db = require('../../../config/db');
const nocks = require('../../utils/nocks');
const fixtures = require('../../utils/fixtures');
const app = require('../../../config/express');

const query = 'leite';

describe('Post api/products/ testes funcionais ', () => {
  let sandbox;
  before(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(async () => {
    sandbox.restore();
    nocks.cleanAll();
    await db.dropCollections('products')
      .catch(() => {
      });
  });
  describe('Caso(s) de sucesso: Deve', () => {
    it.only('buscar os produtos com uma keyword', async () => {
      const productsFixture = fixtures.products.productsFixture.create({});
      const nockClientSuperNosso = nocks.searchSupernosso({
        requestBody: {
          pageNumber: 0,
          pageSize: 50,
          query,
        },
        responseBody: {
          elements: [
            productsFixture,
          ],
        },
      });
      const res = await supertest(app)
        .post('/api/products/')
        .send({
          keyword: query,
        })
        .set('Content-Type', 'application/json');
      assert.strictEqual(200, res.statusCode);
      assert.isTrue(nockClientSuperNosso.isDone());
    });
  });
});
