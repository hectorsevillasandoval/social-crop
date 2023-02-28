const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const { uploadFile } = require("../helpers/upload-file");
const {socialCropSizes} = require('../helpers/constants');

const uploadImageToCloudinary = async (req, res) => {
  try {
    const resizeOptions = {
      transformation: [
        {
          height: 400,
          width: 400,
          crop: 'fill',
          gravity: 'auto',
        },
        {
          radius: 'max',
        },
        {
          angle: 30,
        },
        {
          effect: 'trim',
        },
        {
          effect: 'cartoonify'
        },
      ],
    };
    const resizeOptions2 = {
      height: 400,
      width: 400,
      crop: 'fill',
      gravity: 'auto',
    };
    const { name, tempFilePath } = req.files.file;
    const {public_id, format} = await cloudinary.uploader.upload(tempFilePath, { quality_analysis: true });
    const profilePhotos = {};
    const cloudinaryImagesResponse = [];

    for(const [key, value] of Object.entries(socialCropSizes)){
      profilePhotos[key] = value.profile_photo;
    }

    const urlPromises = [];
    for(const value of Object.values(profilePhotos).filter(elem => elem)){
      urlPromises.push(cloudinary.url(`${public_id}.${format}`, {
        ...resizeOptions2,
        height: value.height,
        width: value.width,
      }))
    }
    console.log(urlPromises);


    return res.json(urlPromises);
  } catch (error) {
    res.status(400).json({
      msg: "Something went wrong uploading",
      error,
    });
  }
};

const uploadFileFn = async (req, res) => {
  try {
    console.log("req.files >>>", req.files); // eslint-disable-line

    const resultLog = await uploadFile(req.files.file, undefined, "users");

    return res.json({
      msg: resultLog,
    });
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
};

module.exports = {
  uploadFileFn,
  uploadImageToCloudinary
};
