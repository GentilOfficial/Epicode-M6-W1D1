const commentsService = require('./comments.service')
const sendEmail = require('../email/index')
const authorsSchema = require('../authors/authors.schema')
const blogPosts = require('../blogPosts/blogPosts.routes')
const blogPostsSchema = require('../blogPosts/blogPosts.schema')
const HttpException = require('../../exceptions')

const getComments = async (req, res, next) => {
  try {
    const { query, params } = req
    const { currentPage = 1, pageSize = 5 } = query
    const comments = await commentsService.getComments(params.blogPostId, currentPage, pageSize)

    res.status(200).send(comments)
  } catch (e) {
    next(e)
  }
}

const getCommentById = async (req, res, next) => {
  try {
    const { params } = req
    const comment = await commentsService.getCommentById(params.blogPostId, params.commentId)

    if (!comment) {
      throw new HttpException('Not found', 404, 'The requested comment was not found in this blogPost')
    }

    res.status(200).send(comment)
  } catch (e) {
    next(e)
  }
}

const editCommentById = async (req, res, next) => {
  try {
    const { body, params, author } = req
    const comment = await commentsService.editCommentById(params.blogPostId, params.commentId, {
      ...body,
      author: author.id,
    })

    if (!comment) {
      throw new HttpException('Not found', 404, 'The requested comment was not found in this blogPost')
    }

    res.status(200).send(comment)
  } catch (e) {
    next(e)
  }
}

const deleteCommentById = async (req, res, next) => {
  try {
    const { params } = req
    const comment = await commentsService.deleteCommentById(params.blogPostId, params.commentId)

    if (!comment) {
      throw new HttpException('Not found', 404, 'The requested comment was not found in this blogPost')
    }

    res.status(200).send(comment)
  } catch (e) {
    next(e)
  }
}

const createComment = async (req, res, next) => {
  try {
    const { body, params, author } = req
    const comment = await commentsService.createComment(params.blogPostId, { ...body, author: author.id })
    const { title } = await blogPostsSchema.findById(params.blogPostId, 'title')

    const emailErrors = await sendEmail(
      author.email,
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
