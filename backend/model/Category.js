const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    eng: {
        type: Object,
        required: true,
        unique:true
    },
    nep: {
        type: Object,
        required: true,
        unique:true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    file: {
        type: String,
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

module.exports = mongoose.model('Category', categorySchema);