require("dotenv").config();
const mongoose = require("mongoose");
const { MONGO_URI = "mongodb://localhost:27017" } = process.env;

const connectDb = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is missing");
    }
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectDb;
