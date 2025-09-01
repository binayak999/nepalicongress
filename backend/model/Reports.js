const mongoose = require('mongoose');
const { bool, boolean } = require('@hapi/joi');


const reportSchema = new mongoose.Schema({
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
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    },
    sort:{
        type:Number,
        default:0
    },

})

module.exports = mongoose.model('Report', reportSchema);