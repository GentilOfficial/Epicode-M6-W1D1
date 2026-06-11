const BlogPostsSchema = require('./blogPosts.schema')
const CommentsSchema = require('../comments/comments.schema')
const paginateResponse = require('../../config/pagination')

const getBlogPosts = async (title = '', currentPage, pageSize) => {
  const [blogPosts, totalBlogPosts] = await Promise.all([
    BlogPostsSchema.find({
      title: { $regex: title, $options: 'i' },
    })
      .limit(pageSize)
      .skip((currentPage - 1) * pageSize)
      .populate('author', 'name surname email avatar'),
    BlogPostsSchema.countDocuments({
      title: { $regex: title, $options: 'i' },
    }),
  ])

  return paginateResponse(currentPage, pageSize, totalBlogPosts, blogPosts)
}

const getBlogPostById = async (id) => {
  return await BlogPostsSchema.findById(id).populate('author', 'name surname email avatar')
}

const editBlogPostById = async (id, blogPost) => {
  return await BlogPostsSchema.findByIdAndUpdate(id, blogPost, { returnDocument: 'after' })
}

const deleteBlogPostById = async (id) => {
  const deletedBlogPost = await BlogPostsSchema.findByIdAndDelete(id).lean()

  if (!deletedBlogPost) return null

  const deletedComments = await CommentsSchema.deleteMany({ blogPost: deletedBlogPost._id })

  return { ...deletedBlogPost, deletedComments }
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
