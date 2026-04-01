const multer = require('multer');

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
    return;
  }

  cb(new Error('Only image files are allowed'));
};

const uploadProjectImage = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 3 * 1024 * 1024
  },
  fileFilter
});

module.exports = { uploadProjectImage };
