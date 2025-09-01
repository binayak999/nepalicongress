const mongoose = require('mongoose');
const { string } = require('@hapi/joi');

const voteSchema = new mongoose.Schema({
    voteTopicId:{
        type:String,
    },
    votedFor:{
        type:Object
    },
    userId:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    passwordText:{
        type:String,
        required:true,
    },
    smsSent:{
        type:Boolean,
        required:true,
    },
    email:{
        type:String,
    },
    phone:{
        type:String,
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

module.exports = mongoose.model('VoteRun', voteSchema);