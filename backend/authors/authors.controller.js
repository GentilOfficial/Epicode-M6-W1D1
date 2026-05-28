const authorsService = require('./authors.service')

const getAuthors = async (req, res) => {
  try {
    const { currentPage = 1, pageSize = 5 } = req.query

    const authors = await authorsService.getAuthors(currentPage, pageSize)
    res.status(200).send(authors)
  } catch (e) {
    res.status(500).send({
      status: 500,
      message: 'Error during authors fetch',
    })
  }
}

const getAuthorById = async (req, res) => {
  try {
    const { params } = req
    const author = await authorsService.getAuthorById(params.id)
    res.status(200).send(author)
  } catch (e) {
    res.status(500).send({
      status: 500,
      message: 'Error during author fetch',
    })
  }
}

const editAuthorById = async (req, res) => {
  try {
    const { body, params } = req
    const author = await authorsService.editAuthorById(params.id, body)
    res.status(200).send(author)
  } catch (e) {
    res.status(500).send({
      status: 500,
      message: 'Error during author creation',
    })
  }
}

const deleteAuthorById = async (req, res) => {
  try {
    const { params } = req
    const author = await authorsService.deleteAuthorById(params.id)
    res.status(200).send(author)
  } catch (e) {
    res.status(500).send({
      status: 500,
      message: 'Error during author delete',
    })
  }
}

const createAuthor = async (req, res) => {
  try {
    const { body } = req
    const author = await authorsService.createAuthor(body)
    res.status(201).send(author)
  } catch (e) {
    res.status(500).send({
      status: 500,
      message: 'Error during author creation',
    })
  }
}

const getAuthorBlogPosts = async (req, res) => {
  try {
    const { query, params } = req
    const { currentPage = 1, pageSize = 5 } = query

    const blogPosts = await authorsService.getAuthorBlogPosts(params.id, currentPage, pageSize)
    res.status(200).send(blogPosts)
  } catch (e) {
    res.status(500).send({
      status: 500,
      message: 'Error during authors fetch',
    })
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
