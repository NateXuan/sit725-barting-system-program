const express = require("express");
const transactionController = require("../controllers/transaction");

const router = express.Router();

router.get("/", transactionController.getTransaction);
router.post("/", transactionController.insertTransaction);
router.put("/:id", transactionController.updateTransaction);
router.delete("/:id", transactionController.deleteTransaction);

module.exports = router;
