const mongoose = require('mongoose');

const activeUserSchema = new mongoose.Schema({
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
        unique: true
    },
    subDomain: {
        type: String,
        // unique: true
    },
    phone: {
        type: String,
        max:10,
        min:10
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        max: 1024,
        min: 8
    },
    passwordShow: {
        type: String,
        max: 1024,
        min: 8
    },
    status: {
        type: Boolean,
        required: true,
        default:true
    },
    accountType:{
        type: String,
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
    tole:{
        type: String,
    },
    committeeMemberType:{
        type: String,
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

activeUserSchema.index({ email: 1, accountType: 1 }, { unique: true })
activeUserSchema.index({ phone: 1, accountType: 1 }, { unique: true })

module.exports = mongoose.model('ActiveUser', activeUserSchema);