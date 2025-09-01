const mongoose = require("mongoose");

const KhaltiTokenSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  khaltiToken: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("khaltitoken", KhaltiTokenSchema);
