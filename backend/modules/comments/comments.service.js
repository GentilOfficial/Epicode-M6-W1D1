const CommentsSchema = require('./comments.schema')
const paginateResponse = require('../../config/pagination')
const blogPostsSchema = require('../blogPosts/blogPosts.schema')

const getComments = async (blogPostId, currentPage, pageSize) => {
  const comments = await CommentsSchema.find({ blogPost: blogPostId })
    .limit(pageSize)
    .skip((currentPage - 1) * pageSize)
    .populate('author', 'name surname email avatar')

  const totalComments = await CommentsSchema.countDocuments({ blogPost: blogPostId })

  return paginateResponse(currentPage, pageSize, totalComments, comments)
}

const getCommentById = async (blogPostId, id) => {
  return await CommentsSchema.findOne({ _id: id, blogPost: blogPostId }).populate('author', 'name surname email avatar')
}

const editCommentById = async (blogPostId, id, comment) => {
  return await CommentsSchema.findOneAndUpdate(
    { _id: id, blogPost: blogPostId },
    { ...comment, blogPost: blogPostId },
    { new: true },
  )
}

const deleteCommentById = async (blogPostId, id) => {
  const deletedComment = await CommentsSchema.findOneAndDelete({ _id: id, blogPost: blogPostId })

  if (!deletedComment) return null

  await blogPostsSchema.findByIdAndUpdate(blogPostId, { $pull: { comments: deletedComment._id } })

  return deletedComment
}

const createComment = async (blogPostId, comment) => {
  const newComment = new CommentsSchema({ ...comment, blogPost: blogPostId })
  const savedComment = await newComment.save()
  await blogPostsSchema.findByIdAndUpdate(blogPostId, { $push: { comments: savedComment._id } })
  return savedComment
}

module.exports = {
  getComments,
  getCommentById,
  editCommentById,
  deleteCommentById,
  createComment,
}
