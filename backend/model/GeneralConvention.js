const mongoose = require("mongoose");

const GeneralConvention = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  province: {
    type: String,
  },
  district: {
    type: String,
  },
  municipality: {
    type: String,
  },
  ward: {
    type: String,
  },
  file: {
    type: Array,
  },
  userHandle:{
    type:String
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("generalconvention", GeneralConvention);
