const mongoose = require('mongoose')

const { Schema } = mongoose

const CommentSchema = new Schema(
  {
    rate: {
      type: Schema.Types.Int32,
      min: 1,
      max: 5,
      default: 1,
    },
    comment: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 150,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Author',
      required: true,
    },
    blogPost: {
      type: Schema.Types.ObjectId,
      ref: 'BlogPost',
      required: true,
    },
  },
  {
    timestamps: true,
    strict: true,
  },
)

module.exports = mongoose.model('Comment', CommentSchema, 'comments')
