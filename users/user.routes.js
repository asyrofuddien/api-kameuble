// *************** import library
const express = require('express');
const router = express.Router();

// *************** import controller
const { RegisterUser, GetOneUser, Login } = require('./user.controller');

const { RequireAuth } = require('../middlewares/auth-middlewares');

router.post('/register', RegisterUser);
router.post('/login', Login);
router.get('/:user_id', RequireAuth, GetOneUser);

// *************** Export the router
module.exports = router;
