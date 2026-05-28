const mongoose = require('mongoose')

const initDBConnection = async (connectionString) => {
  try {
    await mongoose.connect(connectionString)
    console.log('DB connected successfully')
  } catch (e) {
    console.error('DB connection error', e)
    process.exit(1)
  }
}

module.exports = initDBConnection
