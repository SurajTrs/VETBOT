const request = require('supertest');
const app = require('../index');

describe('Health Endpoints', () => {
  test('GET /api/health should return 200', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200);
    
    expect(response.body.status).toBe('OK');
  });
  
  test('GET /api/health/ready should return readiness status', async () => {
    const response = await request(app)
      .get('/api/health/ready')
      .expect(200);
    
    expect(response.body).toHaveProperty('ready');
  });
});

describe('Chat Endpoints', () => {
  test('POST /api/chat/message should handle chat messages', async () => {
    const response = await request(app)
      .post('/api/chat/message')
      .send({
        message: 'Hello, I need help with my pet',
        sessionId: 'test-session-123'
      })
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('message');
    expect(response.body.data).toHaveProperty('sessionId');
  });
  
  test('POST /api/chat/message should validate required fields', async () => {
    await request(app)
      .post('/api/chat/message')
      .send({})
      .expect(400);
  });
});

describe('Appointment Endpoints', () => {
  test('POST /api/appointments should create appointment', async () => {
    const appointmentData = {
      sessionId: 'test-session-123',
      petOwnerName: 'John Doe',
      petName: 'Buddy',
      phoneNumber: '1234567890',
      preferredDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      preferredTime: '14:30'
    };
    
    const response = await request(app)
      .post('/api/appointments')
      .send(appointmentData)
      .expect(201);
    
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('_id');
  });
  
  test('GET /api/appointments/session/:sessionId should return appointments', async () => {
    const response = await request(app)
      .get('/api/appointments/session/test-session-123')
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});