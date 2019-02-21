const { assert } = require('chai');
const sinon = require('sinon');
const supertest = require('supertest');
const db = require('../../../lib/db');
const nocks = require('../../utils/nocks');
const fixtures = require('../../utils/fixtures');
const app = require('../../../config');

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
    it('criar 2 notificações de tela para o usuário de cada evento e retornar 204', async () => {

    });
  });

});
