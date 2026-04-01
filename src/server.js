const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const connectDb = require('./config/db');
const app = require('./app');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  if (!process.env.MONGODB_URI) {
    console.error('Missing MONGODB_URI in server/.env');
    process.exit(1);
  }

  await connectDb();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
