const express = require('express');
const resumeController = require('../controllers/resume.controller');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/upload', auth, upload.single('resume'), resumeController.uploadResume);
router.get('/latest', auth, resumeController.getLatestResume);

module.exports = router;
