// Import required modules
const express = require('express');
const app = express();
const port = 3000;
//import modul route
const route = require('./routes/routes');

// Middleware to parse JSON request bodies
app.use(express.json());

route(app);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
