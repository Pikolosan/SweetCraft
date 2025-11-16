const mongoose = require("mongoose");
const initData = require("./data.js");
const Sweet = require("../models/Sweet.js");

// Load environment variables
require('dotenv').config();

// Use environment variable or default
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/sweet-shop';

main()
  .then(() => {
    console.log("Connected to MongoDB");
    initDB();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to database:", MONGO_URL);
}

async function initDB() {
  try {
    await Sweet.deleteMany({});
    console.log("Cleared existing sweets");
    
    // Add owner to each sweet (you'll need to create a user first or use an existing user ID)
    const sweetData = initData.data.map((obj) => ({
      ...obj,
      owner: "673111a86512ab29681ab2aa", // Replace with actual user ID or create one
    }));
    
    await Sweet.insertMany(sweetData);
    console.log("Sweet data was initialized successfully");
    console.log(`Added ${sweetData.length} sweets to the database`);
  } catch (error) {
    console.error("Error initializing data:", error);
  } finally {
    mongoose.connection.close();
  }
}