const mongoose = require("mongoose");
const { string } = require("@hapi/joi");

const circularSchema = new mongoose.Schema({
  numberMix: {
    type: String,
  },
  formNumber: {
    type: String,
  },
  dateofkriyasil: {
    type: String,
  },
  workingformnumber: {
    type: String,
    unique: true,
  },
  workingformnumberold: {
    type: String,
  },
  membername: {
    type: String,
  },
  fathermothername: {
    type: String,
  },
  husbandwifename: {
    type: String,
  },
  age: {
    type: Number,
    trim: true,
  },
  profession: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    trim: true,
  },
  region: {
    type: String,
    trim: true,
  },
  district: {
    type: String,
    trim: true,
  },
  houseofrepresentative: {
    type: String,
    trim: true,
  },
  pradeshassemblyconstituency: {
    type: String,
    trim: true,
  },
  municipality: {
    type: String,
    trim: true,
  },
  wardno: {
    type: String,
    trim: true,
  },
  inclusivegroup: {
    type: String,
    trim: true,
  },
  froRconstituencyNo: {
    type: String,
    trim: true,
  },
  savikmunicipality: {
    type: String,
    trim: true,
  },
  savikwardno: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
  },
  province: {
    type: String,
  },
  email: {
    type: String,
  },
  kaifiyat: {
    type: String,
  },
  images: {
    type: Array,
  },
  userHandle: {
    type: String,
    required: true,
  },
  memberType: {
    type: String,
    required: true,
    default: "New",
  },
  citizenshipno: {
    type: String,
  },
  nepaladdress: {
    type: String,
  },
  address: {
    type: String,
    trim: true,
  },
  subdomainStatus: {
    type: Boolean,
    default: true,
  },
  maindistrict: {
    type: String,
  },
  userName: {
    type: String,
  },
  country: {
    type: String,
  },
  fullAddress: {
    type: String,
  },
  updateduserName: {
    type: String,
  },
  deleteduserName: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  tole:{
    type: String,
  },
  dateOfIssue:{
    type: Date,
  },
  nationalId:{
    type: String,
  },
  nationalFile:{
    type: String,
  },
  image:{
    type: String,
  },
  occupation:{
    type: String,
  },
  bloodgroup:{
    type: String,
  },
  fullAddressInNepal:{
    type: String,
  },
  visible: {
    type: Boolean,
    default: true,
  },
  transferStatus:{
    type: Boolean,
    default: false,
  },
  transferCode:{
    type: String,
  },
  otp: {
    type: Number,
  },
  citizenshipno:{
    type: String,
  },
  citizenissuedistrict:{
    type: String,
  },
  fromWebsite:{
    type: Boolean,
  },
  contribution:{
    type: String,
  },
  receiptNo:{
    type: String,
  },
  nrn:{
    type: Boolean,
  },
  state:{
    type: String,
  },
  city:{
    type: String,
  },
  passportphoto:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medias",
  },
  citizenshipfront:{  
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medias",
  },
  citizenshipback:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medias",
  },
  document:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medias",
  },
  dob:{
    type: Date,
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
    default: Date.now(),
  },
});

module.exports = mongoose.model("Circular", circularSchema);
