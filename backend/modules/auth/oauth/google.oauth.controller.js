const HttpException = require('../../../exceptions')
const AuthorsService = require('../../authors/authors.service')
const { generateJWT } = require('../auth.service')
require('dotenv').config()

const generateUserJWT = async (req, res, next) => {
  try {
    const { user } = req

    const author = await AuthorsService.findByGoogleIdOrCreate(user.id, {
      googleId: user.id,
      name: user.name.givenName,
      surname: user.name.familyName,
      email: user.emails[0].value,
      avatar: user.photos[0].value,
    })

    const token = encodeURIComponent(author ? generateJWT(author) : null)

    res.redirect(`${process.env.FRONTEND_HOST}/login/oauth?token=${token}`)
  } catch (e) {
    next(e)
  }
}

module.exports = { generateUserJWT }
