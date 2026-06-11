const jwt = require('jsonwebtoken')
const HttpException = require('../../exceptions')
require('dotenv').config()

const publicRoutes = ['/login']

const validateAuthToken = async (req, res, next) => {
  if (publicRoutes.includes(req.path)) return next()

  try {
    const token = req.headers['authorization']

    if (!token) {
      throw new HttpException('Unauthorized', 401, 'Missing authorization token')
    }

    req.author = jwt.verify(token, process.env.JWT_SIGN_SECRET)

    next()
  } catch (e) {
    next(new HttpException('Unauthorized', 401, 'Invalid authorization token'))
  }
}

module.exports = validateAuthToken
