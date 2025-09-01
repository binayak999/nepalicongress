const mongoose = require("mongoose");

const ActiveMemberPhoneInquirySchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    presidentPhone: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "activememberphoneinquiry",
  ActiveMemberPhoneInquirySchema
);
