const mongoose = require("mongoose");

const signatureSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  province: {
    type: String,
  },
  district: {
    type: String,
  },
  englishDistrict: {
    type: String,
  },
  image: {
    type: String,
  },
  userHandle:{
    type: String,
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

module.exports = mongoose.model("signature", signatureSchema);
