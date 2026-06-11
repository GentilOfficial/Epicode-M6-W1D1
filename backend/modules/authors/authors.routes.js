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

authors.get('/', authorsController.getAuthors)
authors.post('/', [createAuthorValidationSchema, CreateAuthorSchemaValidator], authorsController.createAuthor)
authors.get('/:id', authorsController.getAuthorById)
authors.put('/:id', [updateAuthorValidationSchema, UpdateAuthorSchemaValidator], authorsController.editAuthorById)
authors.put('/:id/avatar', [checkAuthorExists, uploadToBuffer.single('avatar')], authorsController.uploadAuthorAvatar)
authors.delete('/:id', authorsController.deleteAuthorById)
authors.get('/:id/blogPosts', [checkAuthorExists], authorsController.getAuthorBlogPosts)

module.exports = authors
