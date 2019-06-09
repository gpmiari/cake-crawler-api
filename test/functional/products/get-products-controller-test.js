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
    it('buscar os produtos com uma keyword e retornar status 200', async () => {
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
      const nockApoioMineiro = nocks.searchApoioMineiro({
        query,
        responseBody: {
          prods: [
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
      assert.strictEqual(2, res.body.length);
      assert.isTrue(nockClientSuperNosso.isDone());
      assert.isTrue(nockApoioMineiro.isDone());
    });
    it('buscar os produtos com uma keyword e encontrar em apenas um supermercado e retornar status 200', async () => {
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
      const nockApoioMineiro = nocks.searchApoioMineiro({
        query,
        responseBody: {
          prods: [],
        },
      });
      const res = await supertest(app)
        .post('/api/products/')
        .send({
          keyword: query,
        })
        .set('Content-Type', 'application/json');
      assert.strictEqual(200, res.statusCode);
      assert.strictEqual(1, res.body.length);
      assert.isTrue(nockClientSuperNosso.isDone());
      assert.isTrue(nockApoioMineiro.isDone());
    });
    it('buscar os produtos com uma keyword e não encontrar em nenhum supermercado e retornar status 404', async () => {
      const nockClientSuperNosso = nocks.searchSupernosso({
        requestBody: {
          pageNumber: 0,
          pageSize: 50,
          query,
        },
        responseBody: {
          elements: [],
        },
      });
      const nockApoioMineiro = nocks.searchApoioMineiro({
        query,
        responseBody: {
          prods: [],
        },
      });
      const res = await supertest(app)
        .post('/api/products/')
        .send({
          keyword: query,
        })
        .set('Content-Type', 'application/json');
      assert.strictEqual(404, res.statusCode);
      assert.isTrue(nockClientSuperNosso.isDone());
      assert.isTrue(nockApoioMineiro.isDone());
    });
  });
});
