const { body, validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation Error',
      details: errors.array()
    });
  }
  next();
};

const chatMessageValidation = [
  body('message')
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage('Message must be between 1 and 2000 characters'),
  body('sessionId')
    .optional()
    .isUUID()
    .withMessage('Session ID must be a valid UUID'),
  body('context')
    .optional()
    .isObject()
    .withMessage('Context must be an object')
];

const appointmentValidation = [
  body('petOwnerName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Pet owner name must be between 2 and 100 characters'),
  body('petName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Pet name must be between 1 and 50 characters'),
  body('phoneNumber')
    .trim()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Valid phone number is required'),
  body('preferredDate')
    .isISO8601()
    .withMessage('Valid date is required'),
  body('preferredTime')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Valid time format required (HH:MM)')
];

module.exports = {
  validateRequest,
  chatMessageValidation,
  appointmentValidation
};