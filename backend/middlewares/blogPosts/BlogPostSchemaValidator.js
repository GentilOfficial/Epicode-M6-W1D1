const { body, validationResult } = require('express-validator')
const HttpException = require('../../exceptions')

const validationSchema = [
  body('category')
    .notEmpty()
    .withMessage('Required category field')
    .isLength({ min: 1, max: 25 })
    .withMessage('Category field must be at least 1 characters and no more than 25')
    .isString()
    .withMessage('Category field must be a valid string'),
  body('title')
    .notEmpty()
    .withMessage('Required title field')
    .isLength({ min: 3, max: 50 })
    .withMessage('Title field must be at least 3 characters and no more than 50')
    .isString()
    .withMessage('Title field must be a valid string'),
  body('cover').optional().isURL().withMessage('Cover must be a valid url'),
  body('readTime.value')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Read time value must be a valid integer greather or equal to 0'),
  body('readTime.unit').optional().isIn(['sec', 'min']).withMessage("Read time unit must be 'sec' or 'min'"),
  body('author')
    .notEmpty()
    .withMessage('Required author field')
    .isEmail()
    .withMessage('Author field must be a valid email')
    .isLength({ min: 3, max: 100 })
    .withMessage('Author field must be at least 3 characters and no more than 50'),
  body('content')
    .notEmpty()
    .withMessage('Required content field')
    .isString()
    .withMessage('Content field must be a valid string'),
]

const BlogPostSchemaValidator = async (req, res, next) => {
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

      throw new HttpException('Invalid submitted blogPost schema', 400, mappedErrors)
    }

    next()
  } catch (e) {
    next(e)
  }
}

module.exports = {
  validationSchema,
  BlogPostSchemaValidator,
}
