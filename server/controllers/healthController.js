const mongoose = require('mongoose');

class HealthController {
  async checkHealth(req, res) {
    try {
      const health = {
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV,
        version: process.env.npm_package_version || '1.0.0',
        services: {
          database: 'OK',
          ai: 'OK'
        }
      };

      // Check database connection
      if (mongoose.connection.readyState !== 1) {
        health.services.database = 'ERROR';
        health.status = 'DEGRADED';
      }

      // Check AI service (basic check)
      if (!process.env.GEMINI_API_KEY) {
        health.services.ai = 'ERROR';
        health.status = 'DEGRADED';
      }

      const statusCode = health.status === 'OK' ? 200 : 503;
      res.status(statusCode).json(health);
      
    } catch (error) {
      res.status(503).json({
        status: 'ERROR',
        timestamp: new Date().toISOString(),
        error: error.message
      });
    }
  }

  async checkReadiness(req, res) {
    try {
      // More thorough checks for readiness
      const checks = {
        database: mongoose.connection.readyState === 1,
        environment: !!process.env.GEMINI_API_KEY,
        memory: process.memoryUsage().heapUsed < 1024 * 1024 * 1024 // 1GB limit
      };

      const isReady = Object.values(checks).every(check => check);

      res.status(isReady ? 200 : 503).json({
        ready: isReady,
        checks,
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      res.status(503).json({
        ready: false,
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }
}

module.exports = new HealthController();