const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
require('dotenv').config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const avatarsStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Epicode-M6-avatars',
    format: async (req, file) => 'webp',
    public_id: (req, file) => file.name,
    transformation: [
      {
        width: 300,
        height: 300,
        crop: 'fill',
      },
    ],
  },
})
const coversStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Epicode-M6-covers',
    format: async (req, file) => 'webp',
    public_id: (req, file) => file.name,
    transformation: [
      {
        width: 450,
        height: 300,
        crop: 'fill',
      },
    ],
  },
})

const authorsAvatarStorage = multer({
  storage: avatarsStorage,
})

const blogPostsCoverStorage = multer({
  storage: coversStorage,
})

module.exports = { authorsAvatarStorage, blogPostsCoverStorage }
