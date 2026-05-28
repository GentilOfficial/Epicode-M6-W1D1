const AuthorsSchema = require('./authors.schema')

const getAuthors = async () => {
  return await AuthorsSchema.find()
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

module.exports = {
  getAuthors,
  getAuthorById,
  editAuthorById,
  deleteAuthorById,
  createAuthor,
}
