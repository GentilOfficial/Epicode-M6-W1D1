const { body, validationResult } = require('express-validator')
const HttpException = require('../../exceptions')

const updateCommentValidationSchema = [
  body('rate').optional().isInt({ min: 1, max: 5 }).withMessage('Rate field must be between 1 and 5'),
  body('comment')
    .optional()
    .isLength({ min: 3, max: 150 })
    .withMessage('Comment field must be at least 3 characters and no more than 150')
    .isString()
    .withMessage('Comment field must be a valid string'),
]

const UpdateCommentSchemaValidator = async (req, res, next) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const mappedErrors = errors.errors.reduce((acc, curr) => {
        if (!acc[curr.path]) {
          acc[curr.path] = []
        }
        acc[curr.path].push(curr.msg)

        return acc
      }, {})

      throw new HttpException('Invalid submitted comment schema', 400, mappedErrors)
    }

    next()
  } catch (e) {
    next(e)
  }
}

module.exports = {
  updateCommentValidationSchema,
  UpdateCommentSchemaValidator,
}
