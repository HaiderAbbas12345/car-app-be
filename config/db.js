const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB_URI;

// Connect and handle initial connection errors
const DB = async () => {
  // Connect to MongoDB
  try {
    const connection = await mongoose.connect(mongoUri);
    if (connection) {
      console.log(`Connected to MongoDB`);
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = DB;
