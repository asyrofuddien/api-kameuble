// Import required modules
const express = require('express');
const app = express();

// Import required routes
const userRoutes = require('./modules/users/user.routes');
const userTypeRoutes = require('./modules/userTypes/user_type.routes');

// use route
app.use('/api/users', userRoutes);
app.use('/api/userTypes', userTypeRoutes);

module.exports = app;
