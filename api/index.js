const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const connectDb = require('../src/config/db');
const app = require('../src/app');

module.exports = async (req, res) => {
  await connectDb();
  return app(req, res);
};
