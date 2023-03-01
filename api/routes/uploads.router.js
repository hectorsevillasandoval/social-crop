const { Router } = require('express')
const { check } = require('express-validator')
const validateFields = require('../middlewares/field-validator.middleware')
const { validateFile, validateType } = require('../middlewares/validate-file.middleware')
const socialCropSizes = require('../helpers/constants')

const uploadsController = require('../controllers/uploads.controller')

const router = Router()

router
  .get('/', (req, res) => {
    const { facebook } = socialCropSizes
    res.json(facebook)
  })
  .post('/',
    validateFile,
    validateType,
    validateFields,
    uploadsController.uploadImageToCloudinary)

module.exports = router
