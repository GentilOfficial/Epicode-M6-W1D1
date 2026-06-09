const BlogPostsSchema = require('../blogPosts/blogPosts.schema')
const AuthorsSchema = require('./authors.schema')
const paginateResponse = require('../../config/pagination')

const getAuthors = async (currentPage, pageSize) => {
  const authors = await AuthorsSchema.find()
    .limit(pageSize)
    .skip((currentPage - 1) * pageSize)

  const totalAuthors = await AuthorsSchema.countDocuments()

  return paginateResponse(currentPage, pageSize, totalAuthors, authors)
}

const getAuthorById = async (id) => {
  return await AuthorsSchema.findById(id)
}

const editAuthorById = async (id, author) => {
  return await AuthorsSchema.findByIdAndUpdate(id, author, { new: true })
}

const deleteAuthorById = async (id) => {
  const deletedUser = await AuthorsSchema.findByIdAndDelete(id)

  if (!deletedUser) return null

  await BlogPostsSchema.deleteMany({ _id: { $in: deletedUser.posts } })

  return deletedUser
}

const createAuthor = async (author) => {
  const newAuthor = new AuthorsSchema(author)
  const savedAuthor = await newAuthor.save()
  return savedAuthor
}

const getAuthorBlogPosts = async (id, currentPage, pageSize) => {
  const blogPosts = await BlogPostsSchema.find({ author: id })
    .limit(pageSize)
    .skip((currentPage - 1) * pageSize)

  const totalAuthorBlogPosts = await BlogPostsSchema.countDocuments({ author: id })

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
