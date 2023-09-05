const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");

router.post(
    "/uploadProduct",
    productController.uploadProductMiddleware,
    productController.uploadProduct
);
router.delete("/products/:id", productController.deleteProduct);

module.exports = router;
