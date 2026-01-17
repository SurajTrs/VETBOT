const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const { appointmentValidation, validateRequest } = require('../middleware/validation');

const router = express.Router();

// Create appointment
router.post('/', appointmentValidation, validateRequest, appointmentController.createAppointment);

// Get appointments by session
router.get('/session/:sessionId', appointmentController.getAppointmentsBySession);

// Get all appointments (admin endpoint)
router.get('/', appointmentController.getAllAppointments);

// Update appointment status
router.patch('/:appointmentId/status', appointmentController.updateAppointmentStatus);

// Get appointment statistics (admin endpoint)
router.get('/stats', appointmentController.getAppointmentStats);

module.exports = router;