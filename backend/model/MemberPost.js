const { required } = require("@hapi/joi");
const mongoose = require("mongoose");

const MemberPostSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
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
  memberPost:{
    type: String,
    required: true,
  },
  otp:{
    type:Number,
    required: true,
  },
  userHandle:{
    type: String,
    required: true,
  },
  adminHandle:{
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("MemberPost", MemberPostSchema);
