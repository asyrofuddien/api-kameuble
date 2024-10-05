// Import required modules
const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect database
require('./database');

// Import Route
const userRoutes = require('./users/user.route');

app.use('/api/users', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
