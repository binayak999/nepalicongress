const mongoose = require('mongoose');

const AppVersionSchema = new mongoose.Schema({
  iosVersion: {
    type: String,
    required: true,
  },
  androidVersion: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model('appversion', AppVersionSchema);
