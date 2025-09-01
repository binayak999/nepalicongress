const mongoose = require('mongoose');
const { bool, boolean } = require('@hapi/joi');


const pageSchema = new mongoose.Schema({
    eng: {
        type: Object,
        required: true,
        unique:true
    },
    nep: {
        type: Object,
        required: true,
        unique:true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    images: {
        type: Array,
    },
    videos: {
        type: Array,
    },
    attachment: {
        type: Array,
    },
    externallink:{
        type:String,
    },
    status:{
        type: Boolean,
        required: true,
        default:true
    },
    status:{
        type:Boolean,
        required:true,
        default:true
    },
    position:{
        type:String,
        default:'Footer'
    },
    pageType:{
        type:String,
        default:'Dynamic'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    },
    parentPage: {
        type: String,
    }
   
})

module.exports = mongoose.model('Page', pageSchema);