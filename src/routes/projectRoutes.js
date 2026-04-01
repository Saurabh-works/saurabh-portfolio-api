const express = require('express');
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const { protectAdmin } = require('../middleware/auth');
const { uploadProjectImage } = require('../middleware/upload');
const validate = require('../middleware/validate');
const projectValidation = require('../validation/projectValidation');

const router = express.Router();

router.get('/', getProjects);
router.post('/', protectAdmin, uploadProjectImage.single('imageFile'), projectValidation, validate, createProject);
router.put('/:id', protectAdmin, uploadProjectImage.single('imageFile'), projectValidation, validate, updateProject);
router.delete('/:id', protectAdmin, deleteProject);

module.exports = router;
