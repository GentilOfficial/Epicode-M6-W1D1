const HttpException = require('../../exceptions')
const { getAuthorById } = require('../../modules/authors/authors.service')

const checkAuthorExists = async (req, res, next) => {
  try {
    const { params } = req
    const author = await getAuthorById(params.id)

    if (!author) {
      throw new HttpException('Not found', 404, 'The requested author was not found')
    }

    next()
  } catch (e) {
    next(e)
  }
}

module.exports = checkAuthorExists
