const mongoose = require("mongoose");

const OnlineMemberSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    required: true,
    unique: true,
    type: String,
    max: 10,
    min: 10,
  },
  workingformnumber: {
    type: String,
    unique: true,
  },
  numberMix: {
    type: String,
  },
  address: {
    type: String,
  },
  dob: {
    type: Date,
  },
  nationalId: {
    type: String,
  },
  bloodgroup: {
    type: String,
  },
  casteType: {
    type: String,
  },
  language: {
    type: String,
  },
  occupation: {
    type: String,
  },
  country: {
    type: String,
  },
  province: {
    type: String,
  },
  district: {
    type: String,
  },
  houseOfRepresentative: {
    type: String,
  },
  provinceAssembly: {
    type: String,
  },
  municipality: {
    type: String,
  },
  ward: {
    type: String,
  },
  image: {
    type: String,
  },
  nationalIdFront: {
    type: String,
  },
  nationalIdBack: {
    type: String,
  },
  paymentStatus: {
    type: Boolean,
  },
  khaltiToken: {
    type: String,
  },
  khaltiTokenNew: {
    type: String,
  },
  tole:{
    type:String
  },
  citizenshipno:{
    type:String
  },
  connectedTo:{
    type:String
  },
  approve:{
    type:Boolean
  },
  ppimage:{
    type:String
  },
  ctfimage:{
    type:String
  },
  ctbimage:{
    type:String
  },
  qr:{
    type:String
  },
  issuedDate:{
    type:Date
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

module.exports = mongoose.model("onlinemember", OnlineMemberSchema);
