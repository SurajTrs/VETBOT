import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        console.error('API Response Error:', error);
        
        if (error.response) {
          // Server responded with error status
          throw new Error(error.response.data?.error || 'Server error occurred');
        } else if (error.request) {
          // Request made but no response received
          throw new Error('Network error - please check your connection');
        } else {
          // Something else happened
          throw new Error('An unexpected error occurred');
        }
      }
    );
  }

  async sendMessage(message, sessionId, context) {
    try {
      const response = await this.client.post('/chat/message', {
        message,
        sessionId,
        context
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getChatHistory(sessionId) {
    try {
      const response = await this.client.get(`/chat/history/${sessionId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createAppointment(appointmentData) {
    try {
      const response = await this.client.post('/appointments', appointmentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getAppointments(sessionId) {
    try {
      const response = await this.client.get(`/appointments/session/${sessionId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async checkHealth() {
    try {
      const response = await this.client.get('/health');
      return response;
    } catch (error) {
      throw error;
    }
  }
}

const apiService = new ApiService();
export default apiService;