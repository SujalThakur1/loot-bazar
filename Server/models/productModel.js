const mongoose = require("mongoose");
const productScheme = mongoose.Schema({
  productID: {
    type: String,
    require: true,
    unique: true,
    trim: true,
  },
  title: {
    type: String,
    require: true,
    trim: true,
  },
  price: {
    type: Number,
    require: true,
    trim: true,
  },
  description: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  image:{
    type: Object,
    require: true,
  },
  category:{
    type:String,
    require: true,
  },
checked:{
    type:Boolean,
    default: false,
  },
sold:{
  type: Number,
  default : 0,
},
},{
  timestamps: true,
});

module.exports = mongoose.model("Product", productScheme)