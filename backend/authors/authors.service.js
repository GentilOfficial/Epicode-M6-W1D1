const BlogPostsSchema = require('../blogPosts/blogPosts.schema')
const AuthorsSchema = require('./authors.schema')

const getAuthors = async (currentPage, pageSize) => {
  const authors = await AuthorsSchema.find()
    .limit(pageSize)
    .skip((currentPage - 1) * pageSize)

  const totalAuthors = await AuthorsSchema.countDocuments()
  const totalPages = Math.ceil(totalAuthors / pageSize)

  return {
    pages: {
      current: Number(currentPage),
      size: Number(pageSize),
      totals: totalPages,
    },
    count: totalAuthors,
    authors,
  }
}

const getAuthorById = async (id) => {
  return await AuthorsSchema.findById(id)
}

const editAuthorById = async (id, author) => {
  return await AuthorsSchema.findByIdAndUpdate(id, author)
}

const deleteAuthorById = async (id) => {
  return await AuthorsSchema.findByIdAndDelete(id)
}

const createAuthor = async (author) => {
  const newAuthor = new AuthorsSchema(author)
  const savedAuthor = await newAuthor.save()
  return savedAuthor
}

const getAuthorBlogPosts = async (id, currentPage, pageSize) => {
  const { email } = await AuthorsSchema.findById(id)
  const blogPosts = await BlogPostsSchema.find({ author: email })
    .limit(pageSize)
    .skip((currentPage - 1) * pageSize)

  const totalAuthorBlogPosts = await BlogPostsSchema.countDocuments({ author: email })
  const totalPages = Math.ceil(totalAuthorBlogPosts / pageSize)

  return {
    pages: {
      current: Number(currentPage),
      size: Number(pageSize),
      totals: totalPages,
    },
    count: totalAuthorBlogPosts,
    blogPosts,
  }
}

module.exports = {
  getAuthors,
  getAuthorById,
  editAuthorById,
  deleteAuthorById,
  createAuthor,
  getAuthorBlogPosts,
}
