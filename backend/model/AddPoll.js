const mongoose = require('mongoose');
const { string } = require('@hapi/joi');

const pollSchema = new mongoose.Schema({
    pollTopicId:{
        type:String,
    },
    votedFor:{
        type:Array
    },
    userId:{
        type:String
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

module.exports = mongoose.model('PollRun', pollSchema);