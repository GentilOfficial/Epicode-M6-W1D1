const { getBlogPostById } = require('../../modules/blogPosts/blogPosts.service')

const checkBlogPostExists = async (req, res, next) => {
  try {
    const { params } = req
    const blogPost = await getBlogPostById(params.blogPostId)
    next()
  } catch (e) {
    next(e)
  }
}

module.exports = checkBlogPostExists
