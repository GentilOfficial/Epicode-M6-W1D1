const BlogPostsSchema = require('./blogPosts.schema')
const paginateResponse = require('../../config/pagination')
const authorsSchema = require('../authors/authors.schema')

const getBlogPosts = async (title = '', currentPage, pageSize) => {
  const blogPosts = await BlogPostsSchema.find({
    title: { $regex: title, $options: 'i' },
  })
    .limit(pageSize)
    .skip((currentPage - 1) * pageSize)
    .populate(['author'])

  const totalBlogPosts = await BlogPostsSchema.countDocuments({
    title: { $regex: title, $options: 'i' },
  })

  return paginateResponse(currentPage, pageSize, totalBlogPosts, blogPosts)
}

const getBlogPostById = async (id) => {
  return await BlogPostsSchema.findById(id)
}

const editBlogPostById = async (id, blogPost) => {
  return await BlogPostsSchema.findByIdAndUpdate(id, blogPost, { new: true })
}

const deleteBlogPostById = async (id) => {
  const deletedBlogPost = await BlogPostsSchema.findByIdAndDelete(id)

  if (!deletedBlogPost) return null

  await authorsSchema.findByIdAndUpdate(deletedBlogPost.author, { $pull: { posts: deletedBlogPost._id } })

  return deletedBlogPost
}

const createBlogPost = async (blogPost) => {
  const newBlogPost = new BlogPostsSchema(blogPost)
  const savedBlogPost = await newBlogPost.save()
  await authorsSchema.findByIdAndUpdate(newBlogPost.author, { $push: { posts: savedBlogPost._id } })
  return savedBlogPost
}

module.exports = {
  getBlogPosts,
  getBlogPostById,
  editBlogPostById,
  deleteBlogPostById,
  createBlogPost,
}
