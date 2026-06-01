const express = require('express')
const cors = require('cors')
const initServer = require('./config/server')
const PORT = 4545
const DBConnectionString = 'mongodb+srv://db_user:KILTDoEpDXDLL3kr@epibooks.jedhjmj.mongodb.net/'

const authorsRoutes = require('./modules/authors/authors.routes')
const blogPostsRoutes = require('./modules/blogPosts/blogPosts.routes')
const logger = require('./middlewares/logger')
const errorHandler = require('./middlewares/errorHandler')

const server = express()
server.use(express.json())
server.use(cors())
server.use(logger)

server.use('/authors', authorsRoutes)
server.use('/blogPosts', blogPostsRoutes)

server.use(errorHandler)

initServer(server, PORT, DBConnectionString)
