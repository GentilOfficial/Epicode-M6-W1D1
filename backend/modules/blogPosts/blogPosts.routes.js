const express = require('express')
const blogPosts = express.Router()
const blogPostsController = require('./blogPosts.controller')

blogPosts.get('/', blogPostsController.getBlogPosts)
blogPosts.get('/:id', blogPostsController.getBlogPostById)
blogPosts.put('/:id', blogPostsController.editBlogPostById)
blogPosts.delete('/:id', blogPostsController.deleteBlogPostById)
blogPosts.post('/', blogPostsController.createBlogPost)

module.exports = blogPosts
