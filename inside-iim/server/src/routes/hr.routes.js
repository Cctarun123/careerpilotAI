const express = require('express');
const analysisController = require('../controllers/analysis.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/feedback', auth, analysisController.getHrFeedback);

module.exports = router;
