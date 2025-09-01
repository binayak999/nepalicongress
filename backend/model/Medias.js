const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    assignedTo: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    usedin: {
        type: String,
        required: true,
    },
    fileLocation: {
        type: String,
        required: true,
    },
    fileType: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
        default:true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    },
    countView: {
        type: Number,
        default: 1
    },
    sort:{
        type:Number,
        default:0
    },
})

module.exports = mongoose.model('Medias', mediaSchema);