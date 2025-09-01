const mongoose = require('mongoose');
const { bool, boolean } = require('@hapi/joi');

const forumDiscussSchema = new mongoose.Schema({
    forumHandle:{
        type:String,
        required:true,
    },
    content: {
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

module.exports = mongoose.model('ForumDiscuss', forumDiscussSchema);