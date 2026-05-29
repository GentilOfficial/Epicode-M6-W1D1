const mongoose = require('mongoose')

const { Schema } = mongoose

const AuthorSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    surname: {
      type: String,
      required: [true, 'Surname is required'],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 100,

      validate: {
        validator: (value) => {
          return /^\S+@\S+\.\S+$/.test(value)
        },
        message: 'Invalid email format',
      },
    },

    birthday: {
      type: Date,
      required: [true, 'Birthday is required'],

      validate: {
        validator: (value) => {
          return value < new Date()
        },
        message: 'Birthday must be in the past',
      },
    },

    avatar: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => {
          if (!value) return true

          return /^https?:\/\/.+/i.test(value)
        },
        message: 'Avatar must be a valid URL',
      },
    },
  },
  {
    timestamps: true,
    strict: true,
  },
)

AuthorSchema.index({ email: 1 }, { unique: true })

module.exports = mongoose.model('Author', AuthorSchema)
