const authorsService = require('./authors.service')

const getAuthors = async (req, res, next) => {
  try {
    const { currentPage = 1, pageSize = 5 } = req.query

    const authors = await authorsService.getAuthors(currentPage, pageSize)
    res.status(200).send(authors)
  } catch (e) {
    next(e)
  }
}

const getAuthorById = async (req, res, next) => {
  try {
    const { params } = req
    const author = await authorsService.getAuthorById(params.id)
    res.status(200).send(author)
  } catch (e) {
    next(e)
  }
}

const editAuthorById = async (req, res, next) => {
  try {
    const { body, params } = req
    const author = await authorsService.editAuthorById(params.id, body)
    res.status(200).send(author)
  } catch (e) {
    next(e)
  }
}

const deleteAuthorById = async (req, res, next) => {
  try {
    const { params } = req
    const author = await authorsService.deleteAuthorById(params.id)
    res.status(200).send(author)
  } catch (e) {
    next(e)
  }
}

const createAuthor = async (req, res, next) => {
  try {
    const { body } = req
    const author = await authorsService.createAuthor(body)
    res.status(201).send(author)
  } catch (e) {
    next(e)
  }
}

const getAuthorBlogPosts = async (req, res, next) => {
  try {
    const { query, params } = req
    const { currentPage = 1, pageSize = 5 } = query

    const blogPosts = await authorsService.getAuthorBlogPosts(params.id, currentPage, pageSize)
    res.status(200).send(blogPosts)
  } catch (e) {
    next(e)
  }
}

module.exports = {
  getAuthors,
  getAuthorById,
  editAuthorById,
  deleteAuthorById,
  createAuthor,
  getAuthorBlogPosts,
}
