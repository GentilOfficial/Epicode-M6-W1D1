const express = require('express')
const auth = express.Router()
const AuthController = require('./auth.controller')

auth.post('/login', AuthController.login)

module.exports = auth
