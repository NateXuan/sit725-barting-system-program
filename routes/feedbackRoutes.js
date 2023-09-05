const express = require('express');
const router = express.Router();
const feedbackController = require('../controller/feedbackController');

router.post('/feedback', feedbackController.postFeedback);

module.exports = router;
