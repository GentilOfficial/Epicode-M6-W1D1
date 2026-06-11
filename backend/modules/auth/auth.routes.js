const express = require('express')
const auth = express.Router()
const AuthController = require('./auth.controller')

auth.post('/login', AuthController.login)
auth.get('/me', AuthController.loggedAuthor)

module.exports = auth
