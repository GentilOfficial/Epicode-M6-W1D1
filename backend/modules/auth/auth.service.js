const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AuthorsSchema = require('../authors/authors.schema')
require('dotenv').config()

const login = async (email, password) => {
  const user = await AuthorsSchema.findOne({ email })

  if (!user) return null

  const passwordVerified = await bcrypt.compare(password, user.password)

  if (!passwordVerified) return null

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      avatar: user.avatar,
    },
    process.env.JWT_SIGN_SECRET,
    { expiresIn: '1m' },
  )

  return token
}

module.exports = { login }
