const mongoose = require("mongoose");

const GeneralConventionElectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  province: {
    type: String,
  },
  district: {
    type: String,
  },
  houseofrepresentative: {
    type: String,
  },
  pradeshassemblyconstituency: {
    type: String,
  },
  municipality: {
    type: String,
  },
  ward: {
    type: String,
  },
  tole: {
    type: String,
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
  },

  electoralSystem: {
    type: String,
  },
  electoralProcess: {
    type: String,
  },
  inclusivegroup: {
    type: String,
  },
  remark: {
    type: String,
  },
  gender: {
    type: String,
  },
  voteCount: {
    type: Number,
  },
  userHandle: {
    type: String,
  },
  updateUseruserHandle: {
    type: String,
  },
  status: {
    type: Boolean,
  },
  deletedUserHandle: {
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
  deletedAt: {
    type: Date,
  },
});

module.exports = mongoose.model(
  "generalconventionelection",
  GeneralConventionElectionSchema
);
