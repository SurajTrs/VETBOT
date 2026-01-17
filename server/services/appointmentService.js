const Appointment = require('../models/Appointment');

class AppointmentService {
  constructor() {
    this.appointmentFields = ['petOwnerName', 'petName', 'phoneNumber', 'preferredDate', 'preferredTime'];
  }

  parseAppointmentData(messages) {
    const appointmentData = {};
    const userMessages = messages.filter(msg => msg.type === 'user');
    
    // Simple parsing logic - in production, you might want more sophisticated NLP
    userMessages.forEach(msg => {
      const content = msg.content.toLowerCase();
      
      // Extract name patterns
      if (!appointmentData.petOwnerName) {
        const nameMatch = content.match(/(?:my name is|i'm|i am)\s+([a-zA-Z\s]+)/i);
        if (nameMatch) {
          appointmentData.petOwnerName = nameMatch[1].trim();
        }
      }
      
      // Extract pet name patterns
      if (!appointmentData.petName) {
        const petMatch = content.match(/(?:pet's name is|pet is|dog is|cat is)\s+([a-zA-Z\s]+)/i);
        if (petMatch) {
          appointmentData.petName = petMatch[1].trim();
        }
      }
      
      // Extract phone number
      if (!appointmentData.phoneNumber) {
        const phoneMatch = content.match(/(\+?[\d\s\-\(\)]{10,})/);
        if (phoneMatch) {
          appointmentData.phoneNumber = phoneMatch[1].replace(/\D/g, '');
        }
      }
      
      // Extract date
      if (!appointmentData.preferredDate) {
        const dateMatch = content.match(/(\d{1,2}\/\d{1,2}\/\d{4})/);
        if (dateMatch) {
          appointmentData.preferredDate = new Date(dateMatch[1]);
        }
      }
      
      // Extract time
      if (!appointmentData.preferredTime) {
        const timeMatch = content.match(/(\d{1,2}:\d{2})/);
        if (timeMatch) {
          appointmentData.preferredTime = timeMatch[1];
        }
      }
    });
    
    return appointmentData;
  }

  getMissingFields(appointmentData) {
    return this.appointmentFields.filter(field => !appointmentData[field]);
  }

  validateAppointmentData(appointmentData) {
    const errors = [];
    
    if (!appointmentData.petOwnerName || appointmentData.petOwnerName.length < 2) {
      errors.push('Pet owner name must be at least 2 characters');
    }
    
    if (!appointmentData.petName || appointmentData.petName.length < 1) {
      errors.push('Pet name is required');
    }
    
    if (!appointmentData.phoneNumber || !/^\d{10,15}$/.test(appointmentData.phoneNumber)) {
      errors.push('Valid phone number is required');
    }
    
    if (!appointmentData.preferredDate || new Date(appointmentData.preferredDate) < new Date()) {
      errors.push('Preferred date must be in the future');
    }
    
    if (!appointmentData.preferredTime || !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(appointmentData.preferredTime)) {
      errors.push('Valid time format required (HH:MM)');
    }
    
    return errors;
  }

  async createAppointment(sessionId, appointmentData) {
    try {
      const validationErrors = this.validateAppointmentData(appointmentData);
      if (validationErrors.length > 0) {
        throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
      }

      const appointment = new Appointment({
        sessionId,
        ...appointmentData
      });

      await appointment.save();
      return appointment;
    } catch (error) {
      throw new Error(`Failed to create appointment: ${error.message}`);
    }
  }

  async getAppointmentsBySession(sessionId) {
    try {
      return await Appointment.find({ sessionId }).sort({ createdAt: -1 });
    } catch (error) {
      throw new Error(`Failed to get appointments: ${error.message}`);
    }
  }

  async updateAppointmentStatus(appointmentId, status) {
    try {
      const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
      if (!validStatuses.includes(status)) {
        throw new Error('Invalid status');
      }

      return await Appointment.findByIdAndUpdate(
        appointmentId,
        { status },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Failed to update appointment: ${error.message}`);
    }
  }

  async getAllAppointments(page = 1, limit = 20) {
    try {
      const skip = (page - 1) * limit;
      const appointments = await Appointment.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      
      const total = await Appointment.countDocuments();
      
      return {
        appointments,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw new Error(`Failed to get appointments: ${error.message}`);
    }
  }

  async getAppointmentStats() {
    try {
      const totalAppointments = await Appointment.countDocuments();
      const pendingAppointments = await Appointment.countDocuments({ status: 'pending' });
      const confirmedAppointments = await Appointment.countDocuments({ status: 'confirmed' });
      const completedAppointments = await Appointment.countDocuments({ status: 'completed' });
      const cancelledAppointments = await Appointment.countDocuments({ status: 'cancelled' });
      
      // Get appointments from last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const recentAppointments = await Appointment.countDocuments({
        createdAt: { $gte: thirtyDaysAgo }
      });
      
      return {
        total: totalAppointments,
        pending: pendingAppointments,
        confirmed: confirmedAppointments,
        completed: completedAppointments,
        cancelled: cancelledAppointments,
        recent: recentAppointments
      };
    } catch (error) {
      throw new Error(`Failed to get appointment stats: ${error.message}`);
    }
  }
}

module.exports = new AppointmentService();