const mongoose = require("mongoose")

const categorySchema = mongoose.Schema(
  {
    name: {
      require: true,
      type: String,
      trim: true,
      unique: true,
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model ("Category",categorySchema)