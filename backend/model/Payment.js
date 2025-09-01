const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  connectedTo: {
    type: String,
    requred: true,
  },
  userHandle: {
    type: String,
    required: true,
  },
  paymentTranObj:{
    type: Object,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentStatus:{
    type: String,
    required: true,
  },
  paymentFor: {
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

module.exports = mongoose.model("payment", PaymentSchema);
