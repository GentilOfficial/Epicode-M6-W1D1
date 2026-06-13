const multer = require('multer')
const cloudinary = require('cloudinary').v2
require('dotenv').config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = multer.memoryStorage()
const uploadToBuffer = multer({ storage })

const uploadToCloudinary = (buffer, options) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (err, res) => {
      if (err) return reject(err)
      resolve(res)
    })

    stream.end(buffer)
  })
}

const getPublicIdFromUrl = (url) => {
  if (!url.includes('res.cloudinary.com')) return null
  const parts = url.split('/')
  const fileWithExt = parts.pop()
  const folder = parts.slice(parts.indexOf('upload') + 2).join('/')
  return `${folder}/${fileWithExt.split('.')[0]}`
}

const removeFromCloudinary = async (url) => {
  const publicId = getPublicIdFromUrl(url)

  if (publicId) {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
    })
  }
}

module.exports = { uploadToBuffer, uploadToCloudinary, removeFromCloudinary }
