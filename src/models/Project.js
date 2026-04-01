const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String,
      default: '/project-placeholder.svg'
    },
    liveUrl: {
      type: String,
      default: ''
    },
    githubUrl: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
