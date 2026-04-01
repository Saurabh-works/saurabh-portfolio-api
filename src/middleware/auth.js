const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');

const protectAdmin = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await AdminUser.findById(decoded.id).select('-password');

    if (!admin) {
      return res.status(401).json({ message: 'Admin account not found' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { protectAdmin };
