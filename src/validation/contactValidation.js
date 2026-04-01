const { body } = require('express-validator');

const contactValidation = [
  body('name').trim().isLength({ min: 2 }).withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('subject').trim().isLength({ min: 2 }).withMessage('Subject must be at least 2 characters'),
  body('message').trim().isLength({ min: 6 }).withMessage('Message must be at least 6 characters')
];

module.exports = contactValidation;
