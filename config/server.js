const initDBConnection = require('./db')

const initServer = async (server, port, connectionString) => {
  await initDBConnection(connectionString)
  try {
    server.listen(port, () => console.log(`Server up on port ${port}`))
  } catch (e) {
    console.error('Error during server initialization', e)
    process.exit(1)
  }
}

module.exports = initServer
