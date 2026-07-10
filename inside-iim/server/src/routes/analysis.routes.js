const express = require('express');
const analysisController = require('../controllers/analysis.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/score', auth, analysisController.scoreResume);
router.post('/skill-gap', auth, analysisController.getSkillGap);
router.get('/latest/:type', auth, analysisController.getLatest);

module.exports = router;
