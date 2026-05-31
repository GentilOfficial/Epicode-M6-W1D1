const mongoose = require('mongoose')
require('mongoose-type-html')

const { Schema } = mongoose

const readTimeSchema = new Schema(
  {
    value: {
      type: Number,
      min: 1,
      required: true,
    },

    unit: {
      type: String,
      enum: ['sec', 'min', 'ore'],
      required: true,
    },
  },
  { _id: false },
)

const BlogPostSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 25,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
    },

    cover: {
      type: String,
      default: 'https://picsum.photos/600/400',
    },

    readTime: {
      type: readTimeSchema,
      required: true,
    },

    author: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
      trim: true,
    },

    content: {
      type: mongoose.SchemaTypes.Html,
      sanitizeHtml: true,
      required: true,
    },
  },
  {
    timestamps: true,
    strict: true,
  },
)

module.exports = mongoose.model('BlogPost', BlogPostSchema, 'blogPosts')
