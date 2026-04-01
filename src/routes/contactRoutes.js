const express = require('express');
const { createMessage, getMessages } = require('../controllers/contactController');
const { protectAdmin } = require('../middleware/auth');
const validate = require('../middleware/validate');
const contactValidation = require('../validation/contactValidation');

const router = express.Router();

router.post('/', contactValidation, validate, createMessage);
router.get('/', protectAdmin, getMessages);

module.exports = router;
