const express = require("express");
const transactionController = require("../controllers/transaction");

const router = express.Router();

router.get("/transaction", transactionController.getTransaction);
router.post("/transaction", transactionController.insertTransaction);
router.put("/transaction/:id", transactionController.updateTransaction);
router.delete("/transaction/:id", transactionController.deleteTransaction);

module.exports = router;
