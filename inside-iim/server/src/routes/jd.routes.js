const express = require('express');
const analysisController = require('../controllers/analysis.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/match', auth, analysisController.matchJd);

module.exports = router;
