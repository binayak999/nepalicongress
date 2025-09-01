const mongoose = require('mongoose');

const GenralConventionUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true,
    },
    email: {
        type: String,
        unique:true,
    },
    phone: {
        type: String,
        max:10,
        min:10,
        unique:true,
        required:true
    },
    userHandle: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
    },
    passwordShow:{
        type:String,
        required:true
    },
    userFor:{
        type:String,
        required:true
    },
    province:{
        type:String
    },
    district: {
        type: String,
    },
    houseofrepresentative:{
        type:String
    },
    pradeshassemblyconstituency:{
        type:String
    },
    municipality: {
        type: String,
    },
    ward: {
        type: Number,
    },
    status:{
        type:Boolean,
        default:true
    },
    createdAt: { 
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    
})

module.exports = mongoose.model('GeneralConventionUser', GenralConventionUserSchema);
