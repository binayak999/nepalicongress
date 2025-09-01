const { bool, boolean } = require('@hapi/joi');
const mongoose = require('mongoose');

const districtCommitteeSchema = new mongoose.Schema({
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
    sort1: {
        type: Number,
    },
    sort2: {
        type: Number,
    },
    sorts: {
        type: String,
        unique:true,
        required:true
    },
    images: {
        type: Array,
    },
    attachment: {
        type: Array,
    },
    userHandle: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
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
    status:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('DistrictCommittee', districtCommitteeSchema);