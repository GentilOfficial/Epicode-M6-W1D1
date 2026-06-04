const blogPostsService = require('./blogPosts.service')
const sendEmail = require('../email/index')

const getBlogPosts = async (req, res, next) => {
  try {
    const { query } = req
    const { currentPage = 1, pageSize = 5 } = query
    const blogPosts = await blogPostsService.getBlogPosts(decodeURIComponent(query.title || ''), currentPage, pageSize)
    res.status(200).send(blogPosts)
  } catch (e) {
    next(e)
  }
}

const getBlogPostById = async (req, res, next) => {
  try {
    const { params } = req
    const blogPost = await blogPostsService.getBlogPostById(params.id)
    res.status(200).send(blogPost)
  } catch (e) {
    next(e)
  }
}

const editBlogPostById = async (req, res, next) => {
  try {
    const { body, params } = req
    const blogPost = await blogPostsService.editBlogPostById(params.id, body)
    res.status(200).send(blogPost)
  } catch (e) {
    next(e)
  }
}

const uploadBlogPostCover = async (req, res, next) => {
  try {
    const { file, params } = req
    const blogPost = await blogPostsService.editBlogPostById(params.id, { cover: file.path })
    res.status(200).send(blogPost)
  } catch (e) {
    next(e)
  }
}

const deleteBlogPostById = async (req, res, next) => {
  try {
    const { params } = req
    const blogPost = await blogPostsService.deleteBlogPostById(params.id)
    res.status(200).send(blogPost)
  } catch (e) {
    next(e)
  }
}

const createBlogPost = async (req, res, next) => {
  try {
    const { body } = req
    const blogPost = await blogPostsService.createBlogPost(body)

    const emailErrors = await sendEmail(
      blogPost.author,
      'A new post has been created',
      `Your new post, titled "${blogPost.title}", it's amazing!`,
    )

    res.status(201).send({ email: emailErrors || 'Email sent successfully', blogPost })
  } catch (e) {
    next(e)
  }
}

module.exports = {
  getBlogPosts,
  getBlogPostById,
  editBlogPostById,
  uploadBlogPostCover,
  deleteBlogPostById,
  createBlogPost,
}
