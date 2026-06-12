const authorsService = require('./authors.service')
const sendEmail = require('../email/index')
const HttpException = require('../../exceptions')
const { uploadToCloudinary } = require('../../middlewares/multer')
const { generateJWT } = require('../auth/auth.service')

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

    if (!file) {
      throw new HttpException('Missing file', 400, 'No files have been uploaded')
    }

    const { secure_url } = await uploadToCloudinary(file.buffer, {
      folder: 'Epicode-M6-avatars',
      format: 'webp',
      transformation: { width: 300, height: 300, crop: 'fill' },
    })

    const author = await authorsService.editAuthorById(params.id, { avatar: secure_url })

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

    const emailErrors = await sendEmail(
      author.email,
      'Account deleted',
      `Your account, comments, blogPosts and related commentes have been deleted.`,
    )

    res.status(200).send({ email: emailErrors || 'Email sent successfully', author })
  } catch (e) {
    next(e)
  }
}

const createAuthor = async (req, res, next) => {
  try {
    const { body } = req
    const author = await authorsService.createAuthor(body)

    const token = generateJWT(author)

    const emailErrors = await sendEmail(author.email, 'Welcome onboard!', `Welcome ${author.name}!`)

    res.status(201).send({ email: emailErrors || 'Email sent successfully', author, token })
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
