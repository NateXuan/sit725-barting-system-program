const express = require("express");
const transactionDetailController = require("../controller/transactionDetail");

const router = express.Router();

router.get(
    "/transaction-detail",
    transactionDetailController.getTransactionDetail
);
router.post(
    "/transaction-detail",
    transactionDetailController.insertTransactionDetail
);
router.put(
    "/transaction-detail/:id",
    transactionDetailController.updateTransactionDetail
);
router.delete(
    "/transaction-detail/:id",
    transactionDetailController.deleteTransactionDetail
);

module.exports = router;
