const mongoose = require('mongoose');

const subdomainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true,
    },
    nepname: {
        type: String,
        required: true,
        unique:true,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique:true,
        required: true,
    },
    phone: {
        type: String,
        max:10,
        min:10,
        unique:true,
    },
    userHandle: {
        type: String,
        required: true,
        unique:true,
    },
    userRole: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    oldPaaaword: {
        type: String,
    },
    municipality: {
        type: String,
        // required: true,
    },
    district: {
        type: String,
        required: true,
    },
    ward: {
        type: Number,
        required: true,
    },
    image:{
        type:Array,
    },
    province: {
        type: String,
        required: true,
    },
    city: {
        type: String,
    },
    address: {
        type: String,
    },
   
    posts:{
        type:Object
    },
    events:{
        type:Object
    },
    news:{
        type:Object
    },

    history:{
        type:Object
    },
    ourinspirations:{
        type:Object
    },

    pressrelease:{
        type:Object
    },
    circular:{
        type:Object
    },
    pass:{
        type:String
    },
    reports:{
        type:Object
    },
    votes:{
        type:Object
    },
    category:{
        type:String,
    },
    categoryNep:{
        type:String,
    },
    subcategory:{
        type:String,
    },
    subcategoryNep:{
        type:String,
    },
    onlinelibrary:{
        type:Object,
    },
    committee:{
        type:Object,
    },
    facebookUrl:{
        type:String
    },
    twitterUrl:{
        type:String
    },
    instagramUrl:{
        type:String
    },
    externalLink:{
        type:String
    },
    documents:{
        type:Object
    }, 
    popposts:{
        type:Object
    },
    parentSubdomain:{
        type:String
    },
    circulardocuments:{
        type:Object
    },
    hasChetra:{
        type:String
    },
    totalActiveMember:{
        type:Number
    },
    optionAction:{
        type:Boolean,
        default:false
    },
    showPublic:{
        type:Boolean,
        default:true
    },
    visible:{
        type:Boolean,
        default:true
    },
    isChetraParent:{
        type:Boolean
    },
    isNagarPalika:{
        type:Boolean
    },
    createdAt: { 
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model('Subdomain', subdomainSchema);
