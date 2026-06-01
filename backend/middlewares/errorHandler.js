const mongoose = require('mongoose')
const HttpException = require('../exceptions/index')

const errorHandler = async (error, req, res, next) => {
  if (error instanceof HttpException) {
    res.status(error.statusCode).send({
      code: error.statusCode,
      message: error.message,
      error: error.error,
    })
  }

  if (error instanceof mongoose.Error.CastError) {
    res.status(404).send({
      code: 404,
      message: 'Not found',
      error: 'The requested resourse was not found',
    })
  }

  res.status(500).send({
    code: 500,
    message: 'Internal server error',
    error: 'An internal server error occured, try again later',
  })
}

module.exports = errorHandler
