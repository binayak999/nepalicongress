const mongoose = require('mongoose');

const voteMultipleSchema = new mongoose.Schema({
    voteCandidateGroup:{
        type:String,
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
    votesFor:{
        type:Array
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

module.exports = mongoose.model('Votemultiple', voteMultipleSchema);