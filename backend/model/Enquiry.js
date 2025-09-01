const mongoose = require("mongoose");

const EnquirySchema = new mongoose.Schema({
  phone:{
    type: String,
    required: true,
  },
  citizenshipno:{
    type: String,
    required: true,
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

module.exports = mongoose.model("enquiry", EnquirySchema);
