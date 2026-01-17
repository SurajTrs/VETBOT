// MongoDB initialization script
db = db.getSiblingDB('vet-chatbot');

// Create collections with validation
db.createCollection('conversations', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['sessionId', 'messages'],
      properties: {
        sessionId: {
          bsonType: 'string',
          description: 'Session ID must be a string and is required'
        },
        messages: {
          bsonType: 'array',
          description: 'Messages must be an array'
        },
        context: {
          bsonType: 'object',
          description: 'Context must be an object'
        },
        isActive: {
          bsonType: 'bool',
          description: 'isActive must be a boolean'
        }
      }
    }
  }
});

db.createCollection('appointments', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['sessionId', 'petOwnerName', 'petName', 'phoneNumber', 'preferredDate', 'preferredTime'],
      properties: {
        sessionId: {
          bsonType: 'string',
          description: 'Session ID must be a string and is required'
        },
        petOwnerName: {
          bsonType: 'string',
          description: 'Pet owner name must be a string and is required'
        },
        petName: {
          bsonType: 'string',
          description: 'Pet name must be a string and is required'
        },
        phoneNumber: {
          bsonType: 'string',
          description: 'Phone number must be a string and is required'
        },
        preferredDate: {
          bsonType: 'date',
          description: 'Preferred date must be a date and is required'
        },
        preferredTime: {
          bsonType: 'string',
          description: 'Preferred time must be a string and is required'
        },
        status: {
          bsonType: 'string',
          enum: ['pending', 'confirmed', 'cancelled', 'completed'],
          description: 'Status must be one of the enum values'
        }
      }
    }
  }
});

// Create indexes for better performance
db.conversations.createIndex({ sessionId: 1 }, { unique: true });
db.conversations.createIndex({ createdAt: -1 });
db.conversations.createIndex({ 'context.userId': 1 });

db.appointments.createIndex({ sessionId: 1 });
db.appointments.createIndex({ createdAt: -1 });
db.appointments.createIndex({ preferredDate: 1 });
db.appointments.createIndex({ status: 1 });

print('Database initialized successfully!');