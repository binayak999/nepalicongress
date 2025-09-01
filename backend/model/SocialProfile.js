const mongoose = require('mongoose');

const SocialProfileSchema
 = new mongoose.Schema({
    socialmedia:{
        type:Array,
        required: true,
    },
    socialMediaOf:{
        type:String,
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
    updatedAt: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model('socialprofile', SocialProfileSchema);