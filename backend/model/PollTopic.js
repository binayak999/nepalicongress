const mongoose = require('mongoose');

const pollTopic = new mongoose.Schema({
    pollTopicId:{
        type:String,
        unique:true,
        required:true,
    },
    nep:{
        type:Object,
        required:true
    },
    eng:{
        type:Object,
        required:true
    },

    userDetail: {
        type: Object,
    },
    votesFor:{
        type:Array
    },
  
    pollStatus:{
        type:Boolean,
        default:false
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
})

module.exports = mongoose.model('Poll', pollTopic);