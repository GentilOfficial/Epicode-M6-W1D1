const AuthorsSchema = require('./authors.schema')
const BlogPostsSchema = require('../blogPosts/blogPosts.schema')
const CommentsSchema = require('../comments/comments.schema')
const paginateResponse = require('../../config/pagination')

const getAuthors = async (currentPage, pageSize) => {
  const [authors, totalAuthors] = await Promise.all([
    AuthorsSchema.find()
      .limit(pageSize)
      .skip((currentPage - 1) * pageSize),
    AuthorsSchema.countDocuments(),
  ])

  return paginateResponse(currentPage, pageSize, totalAuthors, authors)
}

const getAuthorById = async (id) => {
  return await AuthorsSchema.findById(id)
}

const editAuthorById = async (id, author) => {
  return await AuthorsSchema.findByIdAndUpdate(id, author, { returnDocument: 'after' })
}

const deleteAuthorById = async (id) => {
  const deletedAuthor = await AuthorsSchema.findByIdAndDelete(id).lean()

  if (!deletedAuthor) return null

  const blogPostIds = await BlogPostsSchema.distinct('_id', { author: deletedAuthor._id })

  const [deletedBlogPosts, deletedComments] = await Promise.all([
    BlogPostsSchema.deleteMany({
      author: deletedAuthor._id,
    }),
    CommentsSchema.deleteMany({
      $or: [{ blogPost: { $in: blogPostIds } }, { author: deletedAuthor._id }],
    }),
  ])

  return { ...deletedAuthor, deletedBlogPosts, deletedComments }
}

const createAuthor = async (author) => {
  const newAuthor = new AuthorsSchema(author)
  const savedAuthor = await newAuthor.save()
  return savedAuthor
}

const getAuthorBlogPosts = async (id, currentPage, pageSize) => {
  const [blogPosts, totalAuthorBlogPosts] = await Promise.all([
    BlogPostsSchema.find({ author: id })
      .limit(pageSize)
      .skip((currentPage - 1) * pageSize),
    BlogPostsSchema.countDocuments({ author: id }),
  ])

  return paginateResponse(currentPage, pageSize, totalAuthorBlogPosts, blogPosts)
}

module.exports = {
  getAuthors,
  getAuthorById,
  editAuthorById,
  deleteAuthorById,
  createAuthor,
  getAuthorBlogPosts,
}
