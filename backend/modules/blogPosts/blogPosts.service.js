const BlogPostsSchema = require('./blogPosts.schema')
const paginateResponse = require('../../config/pagination')

const getBlogPosts = async (title = '', currentPage, pageSize) => {
  const blogPosts = await BlogPostsSchema.find({
    title: { $regex: title, $options: 'i' },
  })
    .limit(pageSize)
    .skip((currentPage - 1) * pageSize)

  const totalBlogPosts = await BlogPostsSchema.countDocuments({
    title: { $regex: title, $options: 'i' },
  })

  return paginateResponse(currentPage, pageSize, totalBlogPosts, blogPosts)
}

const getBlogPostById = async (id) => {
  return await BlogPostsSchema.findById(id)
}

const editBlogPostById = async (id, blogPost) => {
  return await BlogPostsSchema.findByIdAndUpdate(id, blogPost)
}

const deleteBlogPostById = async (id) => {
  return await BlogPostsSchema.findByIdAndDelete(id)
}

const createBlogPost = async (blogPost) => {
  const newBlogPost = new BlogPostsSchema(blogPost)
  const savedBlogPost = await newBlogPost.save()
  return savedBlogPost
}

module.exports = {
  getBlogPosts,
  getBlogPostById,
  editBlogPostById,
  deleteBlogPostById,
  createBlogPost,
}
