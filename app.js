// Import required modules
const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();

//import modul route
const route = require('./routes/routes');

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect database
require('./database');

route(app);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
