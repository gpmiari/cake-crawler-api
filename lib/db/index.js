const { MongoClient } = require('mongodb');
const { promisify } = require('util');

const Database = {};
const self = Database;
const collections = [];

let mongoClient;

Database.connect = async (uri) => {
  try {
    console.debug('Database trying to connect.');
    mongoClient = await MongoClient.connect(uri, { useNewUrlParser: true });
    console.info('Database connected.');
  } catch (err) {
    console.error('Database failed to connect. - ', err.message);
    throw new Error(err);
  }
};

Database.getCollection = (collectionName) => {
  let collection = collections[collectionName];
  if (!collection) {
    collection = mongoClient.db().collection(collectionName);
    collections[collectionName] = collection;
  }
  return collection;
};

Database.dropCollections = async (...theArgs) => {
  const collectionsToDrop = [];
  theArgs.forEach((item) => {
    const collection = self.getCollection(item);
    if (collection) {
      collectionsToDrop.push(collection);
    }
  });
  await Promise.all(collectionsToDrop.map(async (item) => {
    const collectionDrop = item;
    collectionDrop.drop = promisify(collectionDrop.drop);
    await collectionDrop.drop();
  }));
};

Database.close = async () => {
  console.debug('Database trying to disconnect');
  if (mongoClient) {
    try {
      await mongoClient.close();
      console.info('Database disconnected');
    } catch (err) {
      console.error('Error on closing database', err);
    }
  }
};

module.exports = Database;
