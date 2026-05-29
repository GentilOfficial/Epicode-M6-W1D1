const mongoose = require('mongoose')
require('mongoose-type-html')

const { Schema } = mongoose

const readTimeSchema = new Schema(
  {
    value: {
      type: Number,
      min: 1,
      required: [true, 'Read time value is required'],
    },

    unit: {
      type: String,
      enum: ['sec', 'min', 'ore'],
      required: [true, 'Read time unit is required'],
    },
  },
  { _id: false },
)

const BlogPostSchema = new Schema(
  {
    category: {
      type: String,
      required: [true, 'Category is required'],
      minlength: 1,
      maxlength: 25,
      trim: true,
    },

    title: {
      type: String,
      required: [true, 'Title is required'],
      minlength: 3,
      maxlength: 50,
      trim: true,
    },

    cover: {
      type: String,
      validate: {
        validator: (value) => {
          if (!value) return true

          return /^https?:\/\/.+/i.test(value)
        },
        message: 'Cover must be a valid URL',
      },
    },

    readTime: {
      type: readTimeSchema,
      required: true,
    },

    author: {
      type: String,
      required: [true, 'Author is required'],
      minlength: 3,
      maxlength: 100,
      trim: true,

      validate: {
        validator: (value) => {
          return /^\S+@\S+\.\S+$/.test(value)
        },
        message: 'Author must be a valid email',
      },
    },

    content: {
      type: mongoose.SchemaTypes.Html,
      sanitizeHtml: true,
      required: [true, 'Content is required'],
    },
  },
  {
    timestamps: true,
    strict: true,
  },
)

module.exports = mongoose.model('BlogPost', BlogPostSchema)
