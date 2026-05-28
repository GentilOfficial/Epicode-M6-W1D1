const express = require('express')
const authors = express.Router()
const authorsController = require('./authors.controller')

authors.get('/', authorsController.getAuthors)
authors.get('/:id', authorsController.getAuthorById)
authors.get('/:id/blogPosts', authorsController.getAuthorBlogPosts)
authors.put('/:id', authorsController.editAuthorById)
authors.delete('/:id', authorsController.deleteAuthorById)
authors.post('/', authorsController.createAuthor)

module.exports = authors
