const mongoose = require('mongoose');

const ActiveMemberSubmit
 = new mongoose.Schema({
    subdomain:{
        type:String,
        required: true,
    },
    submittedby:{
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

module.exports = mongoose.model('ActiveMemberSubmit', ActiveMemberSubmit);