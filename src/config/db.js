const mongoose = require('mongoose');

let connectionPromise = null;

const connectDb = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    if (!connectionPromise) {
      connectionPromise = mongoose.connect(process.env.MONGODB_URI).then((connection) => {
        console.log('MongoDB connected');
        return connection;
      });
    }

    return await connectionPromise;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    connectionPromise = null;
    throw error;
  }
};

module.exports = connectDb;
