const { body } = require('express-validator');

const loginValidation = [
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('password').trim().isLength({ min: 8 }).withMessage('Password is required')
];

module.exports = loginValidation;
