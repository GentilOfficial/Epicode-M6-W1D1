const CommentsSchema = require('./comments.schema')
const paginateResponse = require('../../config/pagination')

const getComments = async (blogPostId, currentPage, pageSize) => {
  const [comments, totalComments] = await Promise.all([
    CommentsSchema.find({ blogPost: blogPostId })
      .limit(pageSize)
      .skip((currentPage - 1) * pageSize)
      .populate('author', 'name surname email avatar'),
    CommentsSchema.countDocuments({ blogPost: blogPostId }),
  ])

  return paginateResponse(currentPage, pageSize, totalComments, comments)
}

const getCommentById = async (blogPostId, id) => {
  return await CommentsSchema.findOne({ _id: id, blogPost: blogPostId }).populate('author', 'name surname email avatar')
}

const editCommentById = async (blogPostId, id, updatedComment) => {
  const { rate, comment } = updatedComment
  return await CommentsSchema.findOneAndUpdate({ _id: id, blogPost: blogPostId }, { rate, comment }, { new: true })
}

const deleteCommentById = async (blogPostId, id) => {
  return await CommentsSchema.findOneAndDelete({ _id: id, blogPost: blogPostId })
}

const createComment = async (blogPostId, updatedComment) => {
  const { rate, comment, author } = updatedComment
  const newComment = new CommentsSchema({ blogPost: blogPostId, rate, comment, author })
  const savedComment = await newComment.save()
  return savedComment
}

module.exports = {
  getComments,
  getCommentById,
  editCommentById,
  deleteCommentById,
  createComment,
}
