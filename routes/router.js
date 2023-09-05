const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');
const checkAdmin = require('../middlewares/checkAdmin');

router.post('/items', controller.createItem);
router.post('/register', controller.registerUser);
router.post('/uploadProduct',
    controller.uploadProductMiddleware,
    controller.uploadProduct
);
router.delete('/products/:id', controller.deleteProduct);
//router.post('/admin-only-route', checkAdmin, controller.adminOnlyFunction);
router.get('/admin', checkAdmin, controller.getAdminPage);

module.exports = router;
