const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    gender:{
        type:String,
        required:true,
    },
    first_name:{
        type:String,
        required:true,
    },
    middle_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
        required:true,
    },
    userHandle:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
        min:10,
    },
    provinces:{
        type:Number,
        required:true,
    },
    dateofbirth:{
        type:Date,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    updateAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('User',volunteerSchema);