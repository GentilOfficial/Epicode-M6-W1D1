const express = require('express')
const blogPosts = express.Router()
const blogPostsController = require('./blogPosts.controller')
const {
  createBlogPostValidationSchema,
  CreateBlogPostSchemaValidator,
} = require('../../middlewares/blogPosts/CreateBlogPostSchemaValidator')
const {
  updateBlogPostValidationSchema,
  UpdateBlogPostSchemaValidator,
} = require('../../middlewares/blogPosts/UpdateBlogPostSchemaValidator')
const { blogPostsCoverStorage } = require('../../middlewares/multer')
const commentsRoutes = require('../comments/comments.routes')

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

blogPosts.use('/', commentsRoutes)

module.exports = blogPosts
