const mongoose = require('mongoose');

const QRSchema
 = new mongoose.Schema({
    connectedTo:{
        type:String,
    },
    userHandle:{
        type:String,
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

module.exports = mongoose.model('qr', QRSchema);