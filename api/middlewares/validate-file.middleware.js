const { allowedFileTypes, socialCropSizes } = require('../helpers/constants')

const validateFile = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json({ msg: 'No files were uploaded.' })
    return
  }

  next()
}

const validateType = (req, res, next) => {
  const { file } = req.files
  const extension = file.name.slice(file.name.lastIndexOf('.') + 1).toUpperCase()

  if (!allowedFileTypes.includes(extension)) return res.status(500).json({ msg: `Invalid file extension: ${extension}` })

  next()
}

const selectedSocialMediaNetworks = (req, res, next) => {
  const { selected_networks: socialNetworks } = req.body
  const cropThisOnes = JSON.parse(socialNetworks)

  if (!Array.isArray(cropThisOnes) || !cropThisOnes.length) return res.status(500).json({ msg: 'Please select a social network' })

  const socialMediaPicks = []

  for (const network of cropThisOnes) {
    if (!socialCropSizes[network]) continue
    socialMediaPicks.push({
      socialNetwork: network, photoSizes: socialCropSizes[network]
    })
  }

  req.socialMediaPicks = socialMediaPicks
  next()
}

module.exports = {
  validateFile,
  validateType,
  selectedSocialMediaNetworks
}
