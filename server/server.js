// backend/server.js

const express = require('express');
const connectDB = require('./config/db'); // Import the DB connection
const todosRouter = require('./routes/todo');
const cors = require('cors'); // Import CORS

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse JSON bodies

// API routes
app.use('/api/todos', todosRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
