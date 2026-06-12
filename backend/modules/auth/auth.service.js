const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AuthorsSchema = require('../authors/authors.schema')
require('dotenv').config()

const generateJWT = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      avatar: user.avatar,
    },
    process.env.JWT_SIGN_SECRET,
    { expiresIn: process.env.JWT_DURATION },
  )
}

const login = async (email, password) => {
  const author = await AuthorsSchema.findOne({ email })

  if (!author) return null

  const passwordVerified = await bcrypt.compare(password, author.password)

  if (!passwordVerified) return null

  return generateJWT(author)
}

module.exports = { generateJWT, login }
