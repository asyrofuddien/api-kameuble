// *************** import library
const express = require('express');
const router = express.Router();

// *************** import controller
const { CreateProduct, GetAllProducts, GetOneProduct, UpdateProduct } = require('./product.controller');

const { RequireAuth } = require('../../middlewares/auth-middlewares');

router.post('/create-product', RequireAuth, CreateProduct);
router.post('/all-produtcts', GetAllProducts);
router.get('/one-produtct', GetOneProduct);
router.get('/update-produtct', RequireAuth, UpdateProduct);

// *************** Export the router
module.exports = router;
