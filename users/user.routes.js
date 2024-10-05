// *************** import library
const express = require('express');
const router = express.Router();

// *************** import controller
const { RegisterUser, GetOneUser } = require('./user.controller');

router.post('/register', RegisterUser);

router.post('/:user_id', GetOneUser);

// *************** Export the router
module.exports = router;
