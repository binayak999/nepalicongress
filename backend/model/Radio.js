const mongoose = require('mongoose');

const radioSchema = new mongoose.Schema({
    engtitle:{
        type: String,
        required: true,
        unique: true
    },
    neptitle:{
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true,
        unique: true
    },
    stationId: {
        type: String,
        required: true,
        unique: true
    },
    wishlist: {
        type: Boolean,
        default:false
    },
    image:{
        type:String
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

module.exports = mongoose.model('Radio', radioSchema);