const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    userHandle: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    memberId: {
      type: String,
      // unique: true
    },
    memberPost: {
      type: String,
      // unique: true
    },
    onlineMemberId: {
      type: String,
      // unique: true
    },
    userRole: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      max: 10,
      min: 10,
    },
    password: {
      type: String,
      max: 1024,
      min: 8,
    },
    about: {
      type: String,
    },
    municipality: {
      type: String,
    },
    district: {
      type: String,
    },
    city: {
      type: String,
    },
    province: {
      type: String,
    },
    ward: {
      type: String,
    },
    nearestlandmark: {
      type: String,
    },
    address: {
      type: String,
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
    },
    otp: {
      type: Number,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    verifiedAsMember: {
      type: Number,
      required: true,
      default: false,
    },
    facebook_profile: {
      type: String,
    },
    twitter_profile: {
      type: String,
    },
    // profile_image: {
    //     type: String,
    // },
    // citizenship_front: {
    //     type: Array,
    // },
    // citizenship_back: {
    //     type: Array,
    // },
    passportphoto: {
      type: Array,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updateAt: {
      type: Date,
      default: Date.now(),
    },

    categories: {
      type: Object,
    },

    appliedMembership: {
      type: Boolean,
      default: false,
    },
    polls: {
      type: Object,
    },
    applyMemberShipFor: {
      type: String,
    },
    deleteStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
