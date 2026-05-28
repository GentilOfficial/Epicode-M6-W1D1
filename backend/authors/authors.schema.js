const mongoose = require('mongoose')

const { Types } = mongoose.Schema

const Author = new mongoose.Schema(
  {
    name: {
      type: Types.String,
      required: true,
      max: 50,
    },
    surname: {
      type: Types.String,
      requred: true,
      max: 50,
    },
    email: {
      type: Types.String,
      required: true,
      unique: true,
      max: 100,
    },
    birthday: {
      type: Types.Date,
      required: true,
    },
    avatar: {
      type: Types.String,
      required: false,
      max: 150,
    },
  },
  { timestamps: true, strict: true },
)

module.exports = mongoose.model('author', Author, 'authors')
