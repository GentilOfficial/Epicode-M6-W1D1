const commentsService = require('./comments.service')
const sendEmail = require('../email/index')
const authorsSchema = require('../authors/authors.schema')
const blogPosts = require('../blogPosts/blogPosts.routes')
const blogPostsSchema = require('../blogPosts/blogPosts.schema')

const getComments = async (req, res, next) => {
  try {
    const { query } = req
    const { currentPage = 1, pageSize = 5 } = query
    const comments = await commentsService.getComments(currentPage, pageSize)
    res.status(200).send(comments)
  } catch (e) {
    next(e)
  }
}

const getCommentById = async (req, res, next) => {
  try {
    const { params } = req
    const comment = await commentsService.getCommentById(params.commentId)
    res.status(200).send(comment)
  } catch (e) {
    next(e)
  }
}

const editCommentById = async (req, res, next) => {
  try {
    const { body, params } = req
    const comment = await commentsService.editCommentById(params.commentId, body)
    res.status(200).send(comment)
  } catch (e) {
    next(e)
  }
}

const deleteCommentById = async (req, res, next) => {
  try {
    const { params } = req
    const comment = await commentsService.deleteCommentById(params.id, params.commentId)
    res.status(200).send(comment)
  } catch (e) {
    next(e)
  }
}

const createComment = async (req, res, next) => {
  try {
    const { body, params } = req
    const comment = await commentsService.createComment(params.id, body)
    const { author, title } = await blogPostsSchema.findById(params.id, 'author title')

    const { email } = await authorsSchema.findById(author, 'email')

    const emailErrors = await sendEmail(
      email,
      'New comment',
      `A new comment has been posted on your post titled "${title}".
       Rate: ${comment.rate}
       Comment: ${comment.comment}
      `,
    )

    res.status(201).send({ email: emailErrors || 'Email sent successfully', comment })
  } catch (e) {
    next(e)
  }
}

module.exports = {
  getComments,
  getCommentById,
  editCommentById,
  deleteCommentById,
  createComment,
}
