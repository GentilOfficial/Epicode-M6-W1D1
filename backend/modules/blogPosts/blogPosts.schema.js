const mongoose = require('mongoose')
require('mongoose-type-html')

const { Schema } = mongoose

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
      value: {
        type: Number,
        min: 0,
        default: 0,
      },
      unit: {
        type: String,
        enum: ['sec', 'min'],
        default: 'sec',
      },
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Author',
      required: true,
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
