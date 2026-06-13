const jwt = require('jsonwebtoken')
const HttpException = require('../../exceptions')
require('dotenv').config()

const publicRoutes = [
  { path: '/login', method: 'POST' },
  { path: '/authors', method: 'POST' },
]

const validateAuthToken = async (req, res, next) => {
  const isPublicRoute = publicRoutes.some((route) => route.path === req.path && route.method === req.method)

  if (isPublicRoute) return next()

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
