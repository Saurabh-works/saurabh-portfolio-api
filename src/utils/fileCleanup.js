const fs = require('fs');
const path = require('path');

const deleteUploadedFile = (filePath) => {
  if (!filePath || !filePath.startsWith('/uploads/projects/')) {
    return;
  }

  const resolvedPath = path.join(__dirname, '..', '..', filePath.replace(/^\//, ''));

  if (fs.existsSync(resolvedPath)) {
    fs.unlinkSync(resolvedPath);
  }
};

module.exports = { deleteUploadedFile };
