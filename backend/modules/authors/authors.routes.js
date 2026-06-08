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
const { authorsAvatarStorage } = require('../../middlewares/multer')

authors.get('/', authorsController.getAuthors)
authors.get('/:id', authorsController.getAuthorById)
authors.get('/:id/blogPosts', authorsController.getAuthorBlogPosts)
authors.put('/:id', [updateAuthorValidationSchema, UpdateAuthorSchemaValidator], authorsController.editAuthorById)
authors.put('/:id/avatar', authorsAvatarStorage.single('avatar'), authorsController.uploadAuthorAvatar)
authors.delete('/:id', authorsController.deleteAuthorById)
authors.post('/', [createAuthorValidationSchema, CreateAuthorSchemaValidator], authorsController.createAuthor)

module.exports = authors
