const express = require('express');
const { loginAdmin, getAdminProfile } = require('../controllers/authController');
const { protectAdmin } = require('../middleware/auth');
const validate = require('../middleware/validate');
const loginValidation = require('../validation/authValidation');

const router = express.Router();

router.post('/login', loginValidation, validate, loginAdmin);
router.get('/me', protectAdmin, getAdminProfile);

module.exports = router;
