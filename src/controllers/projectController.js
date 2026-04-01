const Project = require('../models/Project');
const { deleteUploadedFile } = require('../utils/fileCleanup');
const { normalizeProjectPayload } = require('../utils/projectPayload');

const getProjects = async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
};

const createProject = async (req, res) => {
  const payload = normalizeProjectPayload(req.body, req.file);
  const project = await Project.create(payload);
  res.status(201).json(project);
};

const updateProject = async (req, res) => {
  const existingProject = await Project.findById(req.params.id);

  if (!existingProject) {
    return res.status(404).json({ message: 'Project not found' });
  }

  const payload = normalizeProjectPayload(req.body, req.file);

  if (req.file && existingProject.image) {
    deleteUploadedFile(existingProject.image);
  }

  const project = await Project.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true
  });

  return res.json(project);
};

const deleteProject = async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  deleteUploadedFile(project.image);

  return res.json({ message: 'Project deleted successfully' });
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject
};
