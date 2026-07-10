const express = require('express');
const optimizerController = require('../controllers/optimizer.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/tailor', auth, optimizerController.tailorResume);

module.exports = router;
