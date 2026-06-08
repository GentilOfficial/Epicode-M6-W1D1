const CommentsSchema = require('./comments.schema')
const paginateResponse = require('../../config/pagination')
const blogPostsSchema = require('../blogPosts/blogPosts.schema')

const getComments = async (currentPage, pageSize) => {
  const comments = await CommentsSchema.find()
    .limit(pageSize)
    .skip((currentPage - 1) * pageSize)

  const totalComments = await CommentsSchema.countDocuments()

  return paginateResponse(currentPage, pageSize, totalComments, comments)
}

const getCommentById = async (id) => {
  return await CommentsSchema.findById(id)
}

const editCommentById = async (id, comment) => {
  return await CommentsSchema.findByIdAndUpdate(id, comment, { new: true })
}

const deleteCommentById = async (blogPostId, id) => {
  const deletedComment = await CommentsSchema.findByIdAndDelete(id)

  if (!deletedComment) return null

  await blogPostsSchema.findByIdAndUpdate(blogPostId, { $pull: { comments: deletedComment._id } })

  return deletedComment
}

const createComment = async (blogPostId, comment) => {
  const newComment = new CommentsSchema(comment)
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
