const express = require('express')
const authors = express.Router()
const authorsController = require('./authors.controller')

authors.get('/authors', authorsController.getAuthors)
authors.get('/authors/:id', authorsController.getAuthorById)
authors.put('/authors/:id', authorsController.editAuthorById)
authors.delete('/authors/:id', authorsController.deleteAuthorById)
authors.post('/authors', authorsController.createAuthor)

module.exports = authors
