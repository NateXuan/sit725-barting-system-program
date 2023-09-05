const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
//console.log("userController:", userController);

module.exports = router;
