const express = require('express');
const healthController = require('../controllers/healthController');

const router = express.Router();

// Health check endpoint
router.get('/', healthController.checkHealth);

// Readiness check endpoint
router.get('/ready', healthController.checkReadiness);

module.exports = router;