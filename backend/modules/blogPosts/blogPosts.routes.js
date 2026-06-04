const express = require('express')
const blogPosts = express.Router()
const blogPostsController = require('./blogPosts.controller')
const { validationSchema, BlogPostSchemaValidator } = require('../../middlewares/blogPosts/BlogPostSchemaValidator')
const { blogPostsCoverStorage } = require('../../middlewares/multer')

blogPosts.get('/', blogPostsController.getBlogPosts)
blogPosts.get('/:id', blogPostsController.getBlogPostById)
blogPosts.put('/:id', blogPostsController.editBlogPostById)
blogPosts.put('/:id/cover', blogPostsCoverStorage.single('cover'), blogPostsController.uploadBlogPostCover)
blogPosts.delete('/:id', blogPostsController.deleteBlogPostById)
blogPosts.post('/', [validationSchema, BlogPostSchemaValidator], blogPostsController.createBlogPost)

module.exports = blogPosts
