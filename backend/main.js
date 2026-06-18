const express = require('express')
const cors = require('cors')
const initServer = require('./config/server')
require('dotenv').config()

// routes
const authorsRoutes = require('./modules/authors/authors.routes')
const blogPostsRoutes = require('./modules/blogPosts/blogPosts.routes')
const commentsRoutes = require('./modules/comments/comments.routes')
const authRoutes = require('./modules/auth/auth.routes')
const oauthRoutes = require('./modules/auth/oauth/oauth.routes')

// middlewares
const logger = require('./middlewares/logger')
const validateAuthToken = require('./middlewares/auth/validateAuthToken')
const errorHandler = require('./middlewares/errorHandler')

// server configs
const SERVER_PORT = process.env.PORT
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING

const server = express()

server.use(express.json())
server.use(cors())

server.use(logger)
server.use(validateAuthToken)

server.use('/', authRoutes)
server.use('/', oauthRoutes)
server.use('/authors', authorsRoutes)
server.use('/blogPosts', blogPostsRoutes)
server.use('/blogPosts', commentsRoutes)

server.use(errorHandler)

// server start
initServer(server, SERVER_PORT, MONGODB_CONNECTION_STRING)
