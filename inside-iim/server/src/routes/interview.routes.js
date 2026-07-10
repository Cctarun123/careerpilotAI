const express = require('express');
const interviewController = require('../controllers/interview.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/generate', auth, interviewController.generateQuestions);
router.post('/explain', auth, interviewController.explainAnswer);
router.get('/latest', auth, interviewController.getLatestSession);

module.exports = router;
