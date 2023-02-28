const { allowedFileTypes } = require('../helpers/constants');

const validateFile = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json({ msg: "No files were uploaded." });
    return;
  }

  next();
};

const validateType = (req, res, next) => {
  const {file} = req.files;
  const extension = file.name.slice( file.name.lastIndexOf('.') + 1 );

  if( ! allowedFileTypes.includes( extension ) ) res.status(500).json({ msg: `Invalid file extension` });

  next();
};

module.exports = {
  validateFile,
  validateType
};
