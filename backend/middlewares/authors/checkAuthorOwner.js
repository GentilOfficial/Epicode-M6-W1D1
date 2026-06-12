const HttpException = require('../../exceptions')

const checkAuthorOwner = async (req, res, next) => {
  try {
    const { author, params } = req
    if (author.id !== params.id) {
      throw new HttpException('Access denied', 403, 'You are not allowed to edit this author')
    }
    next()
  } catch (e) {
    next(e)
  }
}

module.exports = checkAuthorOwner
