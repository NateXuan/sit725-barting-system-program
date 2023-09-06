const express = require("express");
const transactionDetailController = require("../controllers/transactionDetail");

const router = express.Router();

router.get("/", transactionDetailController.getTransactionDetail);
router.post("/", transactionDetailController.insertTransactionDetail);
router.put("/:id", transactionDetailController.updateTransactionDetail);
router.delete("/:id", transactionDetailController.deleteTransactionDetail);

module.exports = router;
