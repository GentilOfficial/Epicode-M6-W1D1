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
      max: 150,
    },
  },
  {
    timestamps: true,
    strict: true,
  },
)

module.exports = mongoose.model('Comment', BlogPostSchema, 'comments')
