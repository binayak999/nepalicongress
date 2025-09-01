const mongoose = require('mongoose');

const voteTopicSchema = new mongoose.Schema({
    voteTopicId:{
        type:String,
        unique:true,
        required:true,
    },
    eng:{
        type:Object,
        required:true
    },
    nep:{
        type:Object,
        required:true
    },

    numberofvoters: {
        type: Number,
        required: true,
    },
    userDetail: {
        type: Object,
    },
    votesFor:{
        type:Array
    },
    sms:{
        type:Object
    },

  
    userId: {
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
    voteStatus:{
        type:Boolean,
        default:false
    },
})

module.exports = mongoose.model('Vote', voteTopicSchema);