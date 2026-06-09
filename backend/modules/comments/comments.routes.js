const express = require('express')
const comments = express.Router()
const commentsController = require('./comments.controller')
const {
  createCommentValidationSchema,
  CreateCommentSchemaValidator,
} = require('../../middlewares/comments/CreateCommentSchemaValidator')
const {
  updateCommentValidationSchema,
  UpdateCommentSchemaValidator,
} = require('../../middlewares/comments/UpdateCommentSchemaValidator')
const checkBlogPostExists = require('../../middlewares/blogPosts/checkBlogPostExists')

comments.get('/:blogPostId/comments', [checkBlogPostExists], commentsController.getComments)
comments.post(
  '/:blogPostId/comments',
  [checkBlogPostExists, createCommentValidationSchema, CreateCommentSchemaValidator],
  commentsController.createComment,
)
comments.get('/:blogPostId/comments/:commentId', [checkBlogPostExists], commentsController.getCommentById)
comments.put(
  '/:blogPostId/comments/:commentId',
  [checkBlogPostExists, updateCommentValidationSchema, UpdateCommentSchemaValidator],
  commentsController.editCommentById,
)
comments.delete('/:blogPostId/comments/:commentId', [checkBlogPostExists], commentsController.deleteCommentById)

module.exports = comments
