const fileImageStatus = {
  INITIAL: 'INITIAL',
  READY: 'READY',
  ADDED: 'ADDED',
  UPLOADING: 'UPLOADING',
  DONE: 'DONE'
}

const dropzoneConfiguration = {
  uploadMultiple: false,
  paramName: 'photo',
  acceptedFiles: '.png,.jpg,.jpeg,.svg',
  maxFiles: 1,
  autoProcessQueue: false,
  addRemoveLinks: true,
  clickable: true,
  previewsContainer: '.previews',
  url: 'http://localhost:8081/api/v1/upload'
}

const swalAlertConfigurations = {
  ERROR: {
    title: 'Error!',
    text: 'Do you want to continue',
    icon: 'error',
    confirmButtonText: 'Continue'
  }
}

const availableSocialMediaNetworks = [
  {
    name: 'facebook',
    icon: 'fa-brands fa-facebook-f'
  },
  {
    name: 'instagram',
    icon: 'fa-brands fa-instagram'
  },
  {
    name: 'linkedin',
    icon: 'fa-brands fa-linkedin-in'
  },
  {
    name: 'pinterest',
    icon: 'fa-brands fa-pinterest-p'
  },
  {
    name: 'twitter',
    icon: 'fa-brands fa-twitter'
  },
  {
    name: 'youtube',
    icon: 'fa-brands fa-youtube'
  },
  {
    name: 'snapchat',
    icon: 'fa-brands fa-snapchat'
  }
]

export {
  fileImageStatus,
  availableSocialMediaNetworks,
  dropzoneConfiguration,
  swalAlertConfigurations
}
