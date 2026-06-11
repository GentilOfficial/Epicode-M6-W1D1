const { body, validationResult } = require('express-validator')
const HttpException = require('../../exceptions')

const createAuthorValidationSchema = [
  body('name')
    .notEmpty()
    .withMessage('Required name field')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name field must be at least 2 characters and no more than 50')
    .isString()
    .withMessage('Name field must be a valid string'),
  body('surname')
    .notEmpty()
    .withMessage('Required surname field')
    .isLength({ min: 2, max: 50 })
    .withMessage('Surname field must be at least 2 characters and no more than 50')
    .isString()
    .withMessage('Surname field must be a valid string'),
  body('email')
    .notEmpty()
    .withMessage('Required email field')
    .isEmail()
    .withMessage('Email field must be a valid email')
    .isLength({ max: 100 })
    .withMessage('Email field must be 50 characters or fewer'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isStrongPassword({
      minLength: 12,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      'Password must be at least 12 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol',
    ),
  body('birthday')
    .notEmpty()
    .withMessage('Required birthday field')
    .isDate()
    .withMessage('Birthday field must be a valid date'),
  body('avatar').optional().isURL().withMessage('Avatar must be a valid url'),
]

const CreateAuthorSchemaValidator = async (req, res, next) => {
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

      throw new HttpException('Invalid submitted author schema', 400, mappedErrors)
    }

    next()
  } catch (e) {
    next(e)
  }
}

module.exports = {
  createAuthorValidationSchema,
  CreateAuthorSchemaValidator,
}
