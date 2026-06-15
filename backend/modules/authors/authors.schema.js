const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
      required: function () {
        return !this.googleId
      },
      minlength: 12,
    },
    googleId: { type: String },
    birthday: {
      type: Date,
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

AuthorSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
})

module.exports = mongoose.model('Author', AuthorSchema, 'authors')
