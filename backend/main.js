const express = require('express')
const cors = require('cors')
const initServer = require('./config/server')
require('dotenv').config()

// routes
const authorsRoutes = require('./modules/authors/authors.routes')
const blogPostsRoutes = require('./modules/blogPosts/blogPosts.routes')

// middlewares
const logger = require('./middlewares/logger')
const errorHandler = require('./middlewares/errorHandler')

// server configs
const SERVER_PORT = 4545
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING

const server = express()

server.use(express.json())
server.use(cors())

server.use(logger)

server.use('/authors', authorsRoutes)
server.use('/blogPosts', blogPostsRoutes)

server.use(errorHandler)

// server start
initServer(server, SERVER_PORT, MONGODB_CONNECTION_STRING)
