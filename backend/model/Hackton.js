const mongoose = require("mongoose");

const HacktonSchema = new mongoose.Schema({
  teamEmail: {
    type: String,
  },
  teamSize: {
    type: String,
  },
  teamContact: {
    type: String,
  },
  teamContactPhoneNo: {
    type: String,
  },
  teamLeaderEmail: {
    type: String,
  },
  teamLeaderCollege: {
    type: String,
  },
  teamLeaderPlaceOfResidence: {
    type: String,
  },
  teamLeaderFullName: {
    type: String,
  },
  team2LeaderFullName: {
    type: String,
  },
  team2LeaderEmail: {
    type: String,
  },
  team2LeaderCollege: {
    type: String,
  },
  team2LeaderPlaceOfResidence: {
    type: String,
  },
  team3LeaderFullName: {
    type: String,
  },
  team3LeaderEmail: {
    type: String,
  },
  team3LeaderCollege: {
    type: String,
  },
  team3LeaderPlaceOfResidence: {
    type: String,
  },
  team4LeaderFullName: {
    type: String,
  },
  team4LeaderEmail: {
    type: String,
  },
  team4LeaderCollege: {
    type: String,
  },
  team4LeaderPlaceOfResidence: {
    type: String,
  },
  team5LeaderFullName: {
    type: String,
  },
  team5LeaderEmail: {
    type: String,
  },
  team5LeaderCollege: {
    type: String,
  },
  team5LeaderPlaceOfResidence: {
    type: String,
  },
  topic: {
    type: String,
  },
  ideaFile: {
    type: String,
  },
  challenge: {
    type: String,
  },
  whyHack: {
    type: String,
  },
  bestOn: {
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

module.exports = mongoose.model("hackton", HacktonSchema);
