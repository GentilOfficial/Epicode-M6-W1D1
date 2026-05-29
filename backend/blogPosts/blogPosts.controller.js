const blogPostsService = require('./blogPosts.service')

const getBlogPosts = async (req, res) => {
  try {
    const { query } = req
    const { currentPage = 1, pageSize = 5 } = query
    const blogPosts = await blogPostsService.getBlogPosts(decodeURIComponent(query.title || ''), currentPage, pageSize)
    res.status(200).send(blogPosts)
  } catch (e) {
    res.status(500).send({
      status: 500,
      message: 'Error during blog posts fetch',
    })
  }
}

const getBlogPostById = async (req, res) => {
  try {
    const { params } = req
    const blogPost = await blogPostsService.getBlogPostById(params.id)
    res.status(200).send(blogPost)
  } catch (e) {
    res.status(500).send({
      status: 500,
      message: 'Error during blog post fetch',
    })
  }
}

const editBlogPostById = async (req, res) => {
  try {
    const { body, params } = req
    const blogPost = await blogPostsService.editBlogPostById(params.id, body)
    res.status(200).send(blogPost)
  } catch (e) {
    res.status(500).send({
      status: 500,
      message: 'Error during blog post creation',
    })
  }
}

const deleteBlogPostById = async (req, res) => {
  try {
    const { params } = req
    const blogPost = await blogPostsService.deleteBlogPostById(params.id)
    res.status(200).send(blogPost)
  } catch (e) {
    res.status(500).send({
      status: 500,
      message: 'Error during blog post delete',
    })
  }
}

const createBlogPost = async (req, res) => {
  try {
    const { body } = req
    const blogPost = await blogPostsService.createBlogPost(body)
    res.status(201).send(blogPost)
  } catch (e) {
    res.status(500).send({
      status: 500,
      message: 'Error during blogPost creation',
    })
  }
}

module.exports = {
  getBlogPosts,
  getBlogPostById,
  editBlogPostById,
  deleteBlogPostById,
  createBlogPost,
}
