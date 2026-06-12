const HttpException = require('../../exceptions')
const { getBlogPostById } = require('../../modules/blogPosts/blogPosts.service')

const checkBlogPostExists = async (req, res, next) => {
  try {
    const { params } = req
    const blogPost = await getBlogPostById(params.id || params.blogPostId)

    if (!blogPost) {
      throw new HttpException('Not found', 404, 'The requested blogPost was not found')
    }

    req.blogPost = blogPost

    next()
  } catch (e) {
    next(e)
  }
}

module.exports = checkBlogPostExists
