const mongoose = require('mongoose');
const { bool, boolean } = require('@hapi/joi');

const lettertoleaderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required:true
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
    }

})

module.exports = mongoose.model('Lettertoleader', lettertoleaderSchema);