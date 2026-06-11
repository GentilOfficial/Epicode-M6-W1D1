const mongoose = require('mongoose')
const HttpException = require('../exceptions/index')

const errorHandler = (error, req, res, next) => {
  console.log(error)

  if (error instanceof HttpException) {
    return res.status(error.statusCode).send({
      code: error.statusCode,
      message: error.message,
      error: error.error,
    })
  }

  if (error instanceof mongoose.Error.CastError) {
    return res.status(404).send({
      code: 404,
      message: 'Not found',
      error: 'The requested resourse was not found',
    })
  }

  if (error instanceof mongoose.Error.ValidationError) {
    const errorsMap = Object.entries(error.errors).map((fieldError) => {
      const [field, props] = fieldError
      return { [field]: props.message }
    })

    return res.status(400).send({
      code: 400,
      message: 'Error during schema validation',
      error: errorsMap,
    })
  }

  if (error.code === 11000) {
    const fields = Object.keys(error.keyValue)

    return res.status(409).json({
      code: 409,
      message: 'Duplicated key',
      error: fields,
    })
  }

  return res.status(500).send({
    code: 500,
    message: 'Internal server error',
    error: 'An internal server error occured, try again later',
  })
}

module.exports = errorHandler
