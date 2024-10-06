// Import required modules
const express = require('express');
const app = express();

// Import required routes
const userRoutes = require('./modules/users/user.routes');
const userTypeRoutes = require('./modules/userTypes/user_type.routes');
const productRoutes = require('./modules/products/product.routes');
const storeRoutes = require('./modules/stores/store.routes');

// use route
app.use('/api/users', userRoutes);
app.use('/api/userTypes', userTypeRoutes);
app.use('/api/products', productRoutes);
app.use('/api/stores', storeRoutes);

module.exports = app;
