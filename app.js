// Import required modules
const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded request body

// Enable CORS for all routes
const cors = require('cors');
app.use(cors());

// Connect database
require('./database');

// Connect swagger
require('./swaggers/swagger');

const UserLogModel = require('./modules/userLogs/user_log.model');

app.use((req, res, next) => {
  const userLogData = {
    request: `${req.method} ${req.url}`,
    api: `${req.ip}`,
    body: JSON.stringify(req.body),
  };
  if (req?.userLogin?._id) {
    userLogData.user_id = `${req?.userLogin?._id}`;
  }
  UserLogModel.create(userLogData);
  next();
});

// Import Route
const routes = require('./routes');

app.use(routes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port} 🚀`);
});
