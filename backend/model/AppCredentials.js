const mongoose = require("mongoose");

const appCredentialsSchema = new mongoose.Schema(
  {
    appId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    appSecret: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    status: {
      type: Boolean,
      default: true
    },
    lastUsed: {
      type: Date,
      default: Date.now
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    token: {
      type: String,
      trim: true
    },
    tokenExpiresAt: {
      type: Date
    },
    tokenStatus: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Add index for faster queries
appCredentialsSchema.index({ appId: 1 });
appCredentialsSchema.index({ token: 1 });

module.exports = mongoose.model("AppCredentials", appCredentialsSchema); 