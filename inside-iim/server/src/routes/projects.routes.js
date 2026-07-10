const express = require('express');
const projectsController = require('../controllers/projects.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/suggest', auth, projectsController.suggestProjects);

module.exports = router;
