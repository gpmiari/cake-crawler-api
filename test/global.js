const db = require('../config/db');
require('dotenv').config();

before(async () => {
  await db.connect(process.env.MONGO_URL_TEST)
});

after(async () => {
  await db.close();
});
