const mongoose = require('mongoose')
require('mongoose-type-html')

const { Types } = mongoose.Schema

const readTimeSchema = new mongoose.Schema({
  _id: false,
  value: {
    type: Types.Number,
    required: true,
  },
  unit: {
    type: Types.String,
    required: true,
    maxlength: 4,
  },
})

const BlogPost = new mongoose.Schema(
  {
    category: {
      type: Types.String,
      required: true,
      max: 25,
    },
    title: {
      type: Types.String,
      requred: true,
      max: 50,
    },
    cover: {
      type: Types.String,
      required: false,
      max: 150,
    },
    readTime: {
      type: readTimeSchema,
      required: true,
    },
    author: {
      type: Types.String,
      required: true,
      max: 100,
    },
    content: {
      type: mongoose.SchemaTypes.Html,
      sanitizehtml: true,
      required: true,
    },
  },
  { timestamps: true, strict: true },
)

module.exports = mongoose.model('blogPost', BlogPost, 'blogPosts')
