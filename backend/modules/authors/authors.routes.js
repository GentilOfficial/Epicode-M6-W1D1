const express = require('express')
const authors = express.Router()
const authorsController = require('./authors.controller')
const {
  createAuthorValidationSchema,
  CreateAuthorSchemaValidator,
} = require('../../middlewares/authors/CreateAuthorSchemaValidator')
const {
  updateAuthorValidationSchema,
  UpdateAuthorSchemaValidator,
} = require('../../middlewares/authors/UpdateAuthorSchemaValidator')
const { uploadToBuffer } = require('../../middlewares/multer')
const checkAuthorExists = require('../../middlewares/authors/checkAuthorExists')
const checkAuthorOwner = require('../../middlewares/authors/checkAuthorOwner')

authors.get('/', authorsController.getAuthors)
authors.post('/', [createAuthorValidationSchema, CreateAuthorSchemaValidator], authorsController.createAuthor)
authors.get('/:id', authorsController.getAuthorById)
authors.put(
  '/:id',
  [checkAuthorOwner, updateAuthorValidationSchema, UpdateAuthorSchemaValidator],
  authorsController.editAuthorById,
)
authors.put(
  '/:id/avatar',
  [checkAuthorExists, checkAuthorOwner, uploadToBuffer.single('avatar')],
  authorsController.uploadAuthorAvatar,
)
authors.delete('/:id', checkAuthorOwner, authorsController.deleteAuthorById)
authors.get('/:id/blogPosts', [checkAuthorExists], authorsController.getAuthorBlogPosts)

module.exports = authors
