const express = require('express');
const roadmapController = require('../controllers/roadmap.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/generate', auth, roadmapController.generateRoadmap);

module.exports = router;
