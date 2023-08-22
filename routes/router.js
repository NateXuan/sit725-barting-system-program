const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');

router.post('/items', controller.createItem);
router.post('/register', controller.registerUser);
router.post('/uploadProduct',
    controller.uploadProductMiddleware,
    controller.uploadProduct
);
router.delete('/products/:id', controller.deleteProduct);

module.exports = router;
