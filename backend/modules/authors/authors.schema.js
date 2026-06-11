const mongoose = require('mongoose')

const { Schema } = mongoose

const AuthorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    surname: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 100,
    },
    password: {
      type: String,
      required: true,
      minlength: 12,
    },
    birthday: {
      type: Date,
      required: true,
    },
    avatar: {
      type: String,
      trim: true,
      default: 'https://i.pravatar.cc/150',
    },
  },
  {
    timestamps: true,
    strict: true,
  },
)

module.exports = mongoose.model('Author', AuthorSchema, 'authors')
