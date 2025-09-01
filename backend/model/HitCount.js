const mongoose = require('mongoose');
const { bool, boolean } = require('@hapi/joi');

const hitCountSchema = new mongoose.Schema({
    counter:{
        type:String,
        default:"counter"
    },
    count:{
        type:Number,
        default:1065885
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

module.exports = mongoose.model('HitCount', hitCountSchema);