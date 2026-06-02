const express = require('express')
const blogPosts = express.Router()
const blogPostsController = require('./blogPosts.controller')
const { validationSchema, BlogPostSchemaValidator } = require('../../middlewares/blogPosts/BlogPostSchemaValidator')

blogPosts.get('/', blogPostsController.getBlogPosts)
blogPosts.get('/:id', blogPostsController.getBlogPostById)
blogPosts.put('/:id', blogPostsController.editBlogPostById)
blogPosts.delete('/:id', blogPostsController.deleteBlogPostById)
blogPosts.post('/', [validationSchema, BlogPostSchemaValidator], blogPostsController.createBlogPost)

module.exports = blogPosts
