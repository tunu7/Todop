// backend/config/db.js

const mongoose = require('mongoose');
require('dotenv').config(); // Ensure you can use environment variables from .env

const connectDB = async () => {
    try {
        // Replace YOUR_CONNECTION_STRING with your actual connection string
        await mongoose.connect(process.env.MONGODB_URI, {
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
