const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
    },
    pass: {
      type: String,
      require: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    cart: {
      type: [
        {
          product: {
            type: mongoose.Schema.Types.Mixed, // to store the whole product object
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            default: 0,
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Users',userSchema)