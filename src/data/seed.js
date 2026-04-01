require('dotenv').config();
const connectDb = require('../config/db');
const Project = require('../models/Project');
const AdminUser = require('../models/AdminUser');
const projects = require('./projects');

const seed = async () => {
  try {
    await connectDb();

    await Project.deleteMany();
    await Project.insertMany(projects);

    const existingAdmin = await AdminUser.findOne({ email: process.env.ADMIN_EMAIL });

    if (!existingAdmin) {
      await AdminUser.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        name: 'Saurabh Admin'
      });
    }

    console.log('Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
};

seed();
