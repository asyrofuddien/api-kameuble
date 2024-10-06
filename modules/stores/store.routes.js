// *************** import library
const express = require('express');
const router = express.Router();

// *************** import controller
const { CreateStore, GetAllStores, GetOneStore, UpdateStore } = require('./store.controller');

const { RequireAuth } = require('../../middlewares/auth-middlewares');

router.post('/create-store', RequireAuth, CreateStore);
router.post('/all-stores', GetAllStores);
router.get('/one-store', GetOneStore);
router.get('/update-store', RequireAuth, UpdateStore);

// *************** Export the router
module.exports = router;
