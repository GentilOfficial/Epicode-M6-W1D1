const express = require('express')
const initServer = require('./config/server')
const PORT = 4545
const DBConnectionString = 'mongodb+srv://db_user:KILTDoEpDXDLL3kr@epibooks.jedhjmj.mongodb.net/'

const authorsRoutes = require('./authors/authors.routes')

const server = express()
server.use(express.json())

initServer(server, PORT, DBConnectionString)

server.use('/', authorsRoutes)

server.get('/up', (req, res) => {
  res.status(200).send({ status: 'Server up' })
})
