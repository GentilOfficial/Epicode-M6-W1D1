const express = require('express')
const authors = express.Router()
const authorsController = require('./authors.controller')
const { validationSchema, AuthorSchemaValidator } = require('../../middlewares/authors/AuthorSchemaValidator')

authors.get('/', authorsController.getAuthors)
authors.get('/:id', authorsController.getAuthorById)
authors.get('/:id/blogPosts', authorsController.getAuthorBlogPosts)
authors.put('/:id', authorsController.editAuthorById)
authors.delete('/:id', authorsController.deleteAuthorById)
authors.post('/', [validationSchema, AuthorSchemaValidator], authorsController.createAuthor)

module.exports = authors
