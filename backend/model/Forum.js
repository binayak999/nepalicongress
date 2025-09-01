const mongoose = require('mongoose');
const { bool, boolean } = require('@hapi/joi');

const forumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    images: {
        type: Array,
    },
    userHandle: {
        type: String,
        required: true,
    },
    forumHandle: {
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
    replies:{
        type:Object
    }

})

module.exports = mongoose.model('Forum', forumSchema);