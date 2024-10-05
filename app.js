// Import required modules
const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect database
require('./database');

// Connect swagger
require('./swagger');

// Enable CORS for all routes
const cors = require('cors');
app.use(cors());

// Import Route
const userRoutes = require('./users/user.routes');

app.use('/api/users', userRoutes);

app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
