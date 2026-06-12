const { getCommentById } = require('../../modules/comments/comments.service')
const HttpException = require('../../exceptions')

const checkBlogPostOwner = async (req, res, next) => {
  try {
    const { author, params } = req

    const comment = await getCommentById(params.blogPostId, params.commentId)

    if (!comment) {
      throw new HttpException('Not found', 404, 'The requested comment was not found')
    }

    if (author.id !== comment.author.id) {
      throw new HttpException('Access denied', 403, 'You are not allowed to edit this comment')
    }

    req.comment = comment

    next()
  } catch (e) {
    next(e)
  }
}

module.exports = checkBlogPostOwner
