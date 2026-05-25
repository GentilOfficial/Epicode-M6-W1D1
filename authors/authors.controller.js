const authorsService = require('./authors.service')

const getAuthors = async (req, res) => {
  try {
    const authors = await authorsService.getAuthors()
    res.status(200).send({
      status: 200,
      authors,
    })
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
    res.status(200).send({
      status: 200,
      author,
    })
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
    res.status(200).send({
      status: 200,
      author,
    })
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
    res.status(200).send({
      status: 200,
      author,
    })
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
    res.status(201).send({
      status: 201,
      author,
    })
  } catch (e) {
    res.status(500).send({
      status: 500,
      message: 'Error during author creation',
    })
  }
}

module.exports = {
  getAuthors,
  getAuthorById,
  editAuthorById,
  deleteAuthorById,
  createAuthor,
}
