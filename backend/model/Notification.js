const mongoose = require('mongoose');

const notificationSchema
 = new mongoose.Schema({
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
    },
    id: {
        type: String,
    },
    image: {
        type: Object,
    },
    view:{
        type:Boolean,
        default:false
    },
    notificationGroup:{
        type:String,
    },
    notificationFor:{
        type:String,
    },
    notificationLink:{
        type:String,
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

module.exports = mongoose.model('Notification', notificationSchema
);