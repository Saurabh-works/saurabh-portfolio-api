const AdminUser = require('../models/AdminUser');
const generateToken = require('../utils/generateToken');

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await AdminUser.findOne({ email: email.toLowerCase() });

  if (!admin || !(await admin.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  return res.json({
    token: generateToken({ id: admin._id }),
    admin: {
      id: admin._id,
      email: admin.email,
      name: admin.name
    }
  });
};

const getAdminProfile = async (req, res) => {
  res.json(req.admin);
};

module.exports = { loginAdmin, getAdminProfile };
