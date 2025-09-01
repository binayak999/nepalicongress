const mongoose = require('mongoose');

const deviceSchema
 = new mongoose.Schema({
    deviceToken: {
        type: String,
        required: true,
        unique:true
    },
    deviceOf: {
        type: String,
    },
    notificationFor:{
        type:String
    },
    notifications:{
        type:Array,
    },
    email:{
        type:String,
    },
    phone:{
        type:String,
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

module.exports = mongoose.model('Devices', deviceSchema
);