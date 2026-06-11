const HttpException = require('../../exceptions')
const AuthService = require('./auth.service')

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

module.exports = { login }
