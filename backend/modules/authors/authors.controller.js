const authorsService = require('./authors.service')
const sendEmail = require('../email/index')
const HttpException = require('../../exceptions')

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

    if (!author) {
      throw new HttpException('Not found', 404, 'The requested author was not found')
    }

    res.status(200).send(author)
  } catch (e) {
    next(e)
  }
}

const editAuthorById = async (req, res, next) => {
  try {
    const { body, params } = req
    const author = await authorsService.editAuthorById(params.id, body)

    if (!author) {
      throw new HttpException('Not found', 404, 'The requested author was not found')
    }

    res.status(200).send(author)
  } catch (e) {
    next(e)
  }
}

const uploadAuthorAvatar = async (req, res, next) => {
  try {
    const { file, params } = req
    const author = await authorsService.editAuthorById(params.id, { avatar: file.path })

    res.status(200).send(author)
  } catch (e) {
    next(e)
  }
}

const deleteAuthorById = async (req, res, next) => {
  try {
    const { params } = req
    const author = await authorsService.deleteAuthorById(params.id)

    if (!author) {
      throw new HttpException('Not found', 404, 'The requested author was not found')
    }

    const emailErrors = await sendEmail(author.email, 'Account deleted', `Your account has been deleted.`)

    res.status(200).send({ email: emailErrors || 'Email sent successfully', author })
  } catch (e) {
    next(e)
  }
}

const createAuthor = async (req, res, next) => {
  try {
    const { body } = req
    const author = await authorsService.createAuthor(body)

    const emailErrors = await sendEmail(author.email, 'Welcome onboard!', `Welcome ${author.name}!`)

    res.status(201).send({ email: emailErrors || 'Email sent successfully', author })
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
  uploadAuthorAvatar,
  deleteAuthorById,
  createAuthor,
  getAuthorBlogPosts,
}
