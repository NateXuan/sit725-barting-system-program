const router = require("express").Router();
const messageController = require("../controllers/message");

router.get("/:transactionId", messageController.getMessages);

module.exports = router;
