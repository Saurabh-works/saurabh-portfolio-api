const { body } = require('express-validator');

const isAcceptableUrl = (value) => {
  if (!value || !value.trim()) {
    return true;
  }

  try {
    const normalized = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    new URL(normalized);
    return true;
  } catch (error) {
    return false;
  }
};

const projectValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('slug')
    .trim()
    .optional({ checkFalsy: true })
    .matches(/^[a-z0-9-]+$/)
    .withMessage('Slug must contain lowercase letters, numbers, and hyphens'),
  body('shortDescription').trim().notEmpty().withMessage('Short description is required'),
  body('liveUrl').custom(isAcceptableUrl).withMessage('Live URL must be valid'),
  body('githubUrl').custom(isAcceptableUrl).withMessage('GitHub URL must be valid')
];

module.exports = projectValidation;
