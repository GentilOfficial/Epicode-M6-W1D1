const BlogPostsService = require('../../modules/blogPosts/blogPosts.service')
const HttpException = require('../../exceptions')

const checkBlogPostOwner = async (req, res, next) => {
  try {
    const { author, blogPost } = req

    if (author.id !== blogPost.author.id) {
      throw new HttpException('Access denied', 403, 'You are not allowed to edit this blogPost')
    }
    next()
  } catch (e) {
    next(e)
  }
}

module.exports = checkBlogPostOwner
