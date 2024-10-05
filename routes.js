// Import required modules
const express = require('express');
const app = express();

// Import required routes
const userRoutes = require('./users/user.routes');

// use route
app.use('/api/users', userRoutes);

module.exports = app;
