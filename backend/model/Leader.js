const mongoose = require('mongoose');
const { bool, boolean } = require('@hapi/joi');

const leaderSchema = new mongoose.Schema({
    nep: {
        type: Object,
        required: true,
    },
    eng: {
        type: Object,
        required: true,
    },
    images: {
        type: Array,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    userHandle: {
        type: String,
        required: true,
    },
    email: {
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

module.exports = mongoose.model('Leader', leaderSchema);