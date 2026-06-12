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
const { uploadToBuffer } = require('../../middlewares/multer')
const checkBlogPostExists = require('../../middlewares/blogPosts/checkBlogPostExists')
const checkBlogPostOwner = require('../../middlewares/blogPosts/checkBlogPostOwner')

blogPosts.get('/', blogPostsController.getBlogPosts)
blogPosts.post('/', [createBlogPostValidationSchema, CreateBlogPostSchemaValidator], blogPostsController.createBlogPost)
blogPosts.get('/:id', blogPostsController.getBlogPostById)
blogPosts.put(
  '/:id',
  [checkBlogPostExists, checkBlogPostOwner, updateBlogPostValidationSchema, UpdateBlogPostSchemaValidator],
  blogPostsController.editBlogPostById,
)
blogPosts.put(
  '/:id/cover',
  [checkBlogPostExists, checkBlogPostOwner, uploadToBuffer.single('cover')],
  blogPostsController.uploadBlogPostCover,
)
blogPosts.delete('/:id', [checkBlogPostExists, checkBlogPostOwner], blogPostsController.deleteBlogPostById)

module.exports = blogPosts
