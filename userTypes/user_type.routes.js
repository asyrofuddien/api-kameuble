// *************** import library
const express = require('express');
const router = express.Router();

// *************** import controller
const { GetAllUserTypes } = require('./user_type.controller');

router.get('/GetAllUserType', GetAllUserTypes);

// *************** Export the router
module.exports = router;
