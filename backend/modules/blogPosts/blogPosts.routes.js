const express = require('express')
const blogPosts = express.Router()
const blogPostsController = require('./blogPosts.controller')
const commentsController = require('../comments/comments.controller')
const {
  createBlogPostValidationSchema,
  CreateBlogPostSchemaValidator,
} = require('../../middlewares/blogPosts/CreateBlogPostSchemaValidator')
const {
  updateBlogPostValidationSchema,
  UpdateBlogPostSchemaValidator,
} = require('../../middlewares/blogPosts/UpdateBlogPostSchemaValidator')
const {
  createCommentValidationSchema,
  CreateCommentSchemaValidator,
} = require('../../middlewares/comments/CreateCommentSchemaValidator')
const {
  updateCommentValidationSchema,
  UpdateCommentSchemaValidator,
} = require('../../middlewares/comments/UpdateCommentSchemaValidator')
const { blogPostsCoverStorage } = require('../../middlewares/multer')

blogPosts.get('/', blogPostsController.getBlogPosts)
blogPosts.get('/:id', blogPostsController.getBlogPostById)
blogPosts.put(
  '/:id',
  [updateBlogPostValidationSchema, UpdateBlogPostSchemaValidator],
  blogPostsController.editBlogPostById,
)
blogPosts.put('/:id/cover', blogPostsCoverStorage.single('cover'), blogPostsController.uploadBlogPostCover)
blogPosts.delete('/:id', blogPostsController.deleteBlogPostById)
blogPosts.post('/', [createBlogPostValidationSchema, CreateBlogPostSchemaValidator], blogPostsController.createBlogPost)

blogPosts.get('/:id/comments', commentsController.getComments)
blogPosts.post(
  '/:id/comments',
  [createCommentValidationSchema, CreateCommentSchemaValidator],
  commentsController.createComment,
)
blogPosts.get('/:id/comments/:commentId', commentsController.getCommentById)
blogPosts.put(
  '/:id/comments/:commentId',
  [updateCommentValidationSchema, UpdateCommentSchemaValidator],
  commentsController.editCommentById,
)
blogPosts.delete('/:id/comments/:commentId', commentsController.deleteCommentById)

module.exports = blogPosts
