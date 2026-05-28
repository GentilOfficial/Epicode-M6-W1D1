const express = require('express')
const cors = require('cors')
const initServer = require('./config/server')
const PORT = 4545
const DBConnectionString = 'mongodb+srv://db_user:KILTDoEpDXDLL3kr@epibooks.jedhjmj.mongodb.net/'

const authorsRoutes = require('./authors/authors.routes')
const blogPostsRoutes = require('./blogPosts/blogPosts.routes')

const server = express()
server.use(express.json())
server.use(cors())

initServer(server, PORT, DBConnectionString)

server.use('/authors', authorsRoutes)
server.use('/blogPosts', blogPostsRoutes)

server.get('/up', (req, res) => {
  res.status(200).send({ status: 'Server up' })
})
