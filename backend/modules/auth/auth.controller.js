const HttpException = require('../../exceptions')
const AuthService = require('./auth.service')
const AuthorsService = require('../authors/authors.service')

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const token = await AuthService.login(email, password)

    if (!token) {
      throw new HttpException('Login failed', 401, 'Invalid credentials, try again')
    }

    res.status(200).send({ messange: 'Logged in successfully', token })
  } catch (e) {
    next(e)
  }
}

const loggedAuthor = async (req, res, next) => {
  try {
    const { author: jwtAuthor } = req

    const author = await AuthorsService.getAuthorById(jwtAuthor.id)

    if (!author) {
      throw new HttpException('Not found', 404, 'Author not found')
    }

    res.status(200).send({ author })
  } catch (e) {
    next(e)
  }
}

module.exports = { login, loggedAuthor }
