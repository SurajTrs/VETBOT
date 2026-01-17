const appointmentService = require('../services/appointmentService');

class AppointmentController {
  async createAppointment(req, res, next) {
    try {
      const { sessionId, ...appointmentData } = req.body;
      
      const appointment = await appointmentService.createAppointment(sessionId, appointmentData);
      
      res.status(201).json({
        success: true,
        data: appointment,
        message: 'Appointment created successfully'
      });
      
    } catch (error) {
      next(error);
    }
  }

  async getAppointmentsBySession(req, res, next) {
    try {
      const { sessionId } = req.params;
      
      const appointments = await appointmentService.getAppointmentsBySession(sessionId);
      
      res.json({
        success: true,
        data: appointments
      });
      
    } catch (error) {
      next(error);
    }
  }

  async getAllAppointments(req, res, next) {
    try {
      const { page = 1, limit = 20 } = req.query;
      
      const result = await appointmentService.getAllAppointments(
        parseInt(page),
        parseInt(limit)
      );
      
      res.json({
        success: true,
        data: result.appointments,
        pagination: result.pagination
      });
      
    } catch (error) {
      next(error);
    }
  }

  async updateAppointmentStatus(req, res, next) {
    try {
      const { appointmentId } = req.params;
      const { status } = req.body;
      
      const appointment = await appointmentService.updateAppointmentStatus(appointmentId, status);
      
      if (!appointment) {
        return res.status(404).json({
          error: 'Appointment not found'
        });
      }
      
      res.json({
        success: true,
        data: appointment,
        message: 'Appointment status updated successfully'
      });
      
    } catch (error) {
      next(error);
    }
  }

  async getAppointmentStats(req, res, next) {
    try {
      const stats = await appointmentService.getAppointmentStats();
      
      res.json({
        success: true,
        data: stats
      });
      
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AppointmentController();