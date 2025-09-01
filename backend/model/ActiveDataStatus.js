const mongoose = require('mongoose');

const ActiveDataStatusSchema
 = new mongoose.Schema({
    district:{
        type:String,
        required: true,
    },
    houseofrepresentative:{
        type:String,
        required: true,
    },
    memberType:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:true,
        required: true,
    },
    editstatus:{
        type:Boolean,
        default:true,
        required: true,
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

module.exports = mongoose.model('activedatastatus', ActiveDataStatusSchema);